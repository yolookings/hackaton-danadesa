"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wallet, Send, Shield, AlertCircle, CheckCircle, Clock, ArrowLeft, Plus, TrendingUp } from "lucide-react"
import Link from "next/link"
import { ethers } from "ethers"

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3" // Replace with actual deployed address
const contractABI = [
  "function salurkanDana(string memory desa, uint jumlah, string memory keterangan) public",
  "function getRiwayatDistribusi() public view returns (tuple(string desa, uint jumlah, string keterangan, uint timestamp)[])",
  "function totalDana() public view returns (uint)",
  "function admin() public view returns (address)",
  "event DanaDisalurkan(string desa, uint jumlah, string keterangan, uint timestamp)",
]

interface DistributionRecord {
  desa: string
  jumlah: ethers.BigNumber
  keterangan: string
  timestamp: ethers.BigNumber
}

export default function AdminPanel() {
  const [web3Provider, setWeb3Provider] = useState<ethers.providers.Web3Provider | null>(null)
  const [contract, setContract] = useState<ethers.Contract | null>(null)
  const [account, setAccount] = useState<string>("")
  const [isConnected, setIsConnected] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [txHash, setTxHash] = useState<string>("")
  const [distributions, setDistributions] = useState<DistributionRecord[]>([])

  // Form state
  const [formData, setFormData] = useState({
    desa: "",
    jumlah: "",
    keterangan: "",
  })

  useEffect(() => {
    connectWallet()
  }, [])

  useEffect(() => {
    if (contract && account) {
      checkAdminStatus()
      loadDistributions()
    }
  }, [contract, account])

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        const contractInstance = new ethers.Contract(contractAddress, contractABI, signer)

        setWeb3Provider(provider)
        setContract(contractInstance)
        setAccount(address)
        setIsConnected(true)
      } catch (error) {
        console.error("Error connecting wallet:", error)
      }
    }
  }

  const checkAdminStatus = async () => {
    if (contract && account) {
      try {
        const adminAddress = await contract.admin()
        setIsAdmin(adminAddress.toLowerCase() === account.toLowerCase())
      } catch (error) {
        console.error("Error checking admin status:", error)
      }
    }
  }

  const loadDistributions = async () => {
    if (contract) {
      try {
        const riwayat = await contract.getRiwayatDistribusi()
        setDistributions(riwayat)
      } catch (error) {
        console.error("Error loading distributions:", error)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contract || !isAdmin) return

    setIsLoading(true)
    setTxHash("")

    try {
      const jumlahWei = ethers.utils.parseEther(formData.jumlah)
      const tx = await contract.salurkanDana(formData.desa, jumlahWei, formData.keterangan)
      setTxHash(tx.hash)

      // Wait for transaction confirmation
      await tx.wait()

      // Reload data
      await loadDistributions()

      // Reset form
      setFormData({ desa: "", jumlah: "", keterangan: "" })
    } catch (error) {
      console.error("Error distributing funds:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount: ethers.BigNumber) => {
    const ethAmount = ethers.utils.formatEther(amount)
    const rupiah = Number.parseFloat(ethAmount) * 15000000 // Assuming 1 ETH = 15M IDR for demo
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(rupiah)
  }

  const formatDate = (timestamp: ethers.BigNumber) => {
    return new Date(timestamp.toNumber() * 1000).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="text-center">
            <Wallet className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>Please connect your MetaMask wallet to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={connectWallet} className="w-full">
              Connect MetaMask
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="text-center">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You are not authorized to access this admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button variant="outline" className="w-full bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-600">Blockchain Fund Distribution</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="default" className="bg-green-100 text-green-800">
                <Shield className="w-3 h-3 mr-1" />
                Admin: {account.slice(0, 6)}...{account.slice(-4)}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Distribution Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5 text-blue-600" />
                  <span>Distribute Village Funds</span>
                </CardTitle>
                <CardDescription>Create a new fund distribution record on the blockchain</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="desa">Village Name</Label>
                    <Input
                      id="desa"
                      value={formData.desa}
                      onChange={(e) => setFormData({ ...formData, desa: e.target.value })}
                      placeholder="e.g., Desa Makmur, Kec. Sejahtera"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jumlah">Amount (ETH)</Label>
                    <Input
                      id="jumlah"
                      type="number"
                      step="0.001"
                      value={formData.jumlah}
                      onChange={(e) => setFormData({ ...formData, jumlah: e.target.value })}
                      placeholder="0.1"
                      required
                    />
                    <p className="text-xs text-gray-500">Amount in ETH (will be converted to IDR for display)</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="keterangan">Description</Label>
                    <Textarea
                      id="keterangan"
                      value={formData.keterangan}
                      onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                      placeholder="e.g., Road construction project phase 1"
                      rows={3}
                      required
                    />
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Processing Transaction...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Distribute Funds
                      </>
                    )}
                  </Button>
                </form>

                {txHash && (
                  <Alert className="mt-4">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Transaction submitted! Hash:
                      <code className="ml-1 text-xs bg-gray-100 px-1 rounded">
                        {txHash.slice(0, 10)}...{txHash.slice(-8)}
                      </code>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Statistics */}
          <div className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span>Distribution Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{distributions.length}</div>
                  <div className="text-sm text-gray-600">Total Distributions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {distributions.length > 0
                      ? formatCurrency(
                          distributions.reduce((sum, dist) => sum.add(dist.jumlah), ethers.BigNumber.from(0)),
                        )
                      : "Rp 0"}
                  </div>
                  <div className="text-sm text-gray-600">Total Distributed</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Blockchain Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Network:</span>
                  <Badge variant="outline">Localhost</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Contract:</span>
                  <code className="text-xs bg-gray-100 px-1 rounded">
                    {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}
                  </code>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                    Connected
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Distributions */}
        <Card className="mt-8 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Recent Distributions</CardTitle>
            <CardDescription>Latest fund distributions recorded on blockchain</CardDescription>
          </CardHeader>
          <CardContent>
            {distributions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No distributions recorded yet</div>
            ) : (
              <div className="space-y-4">
                {distributions
                  .slice()
                  .reverse()
                  .map((dist, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{dist.desa}</h3>
                          <p className="text-sm text-gray-600">{dist.keterangan}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">{formatCurrency(dist.jumlah)}</div>
                          <div className="text-xs text-gray-500">{formatDate(dist.timestamp)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
