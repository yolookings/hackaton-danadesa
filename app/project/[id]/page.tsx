"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  ExternalLink,
  FileText,
  MapPin,
  Shield,
  Wallet,
  AlertCircle,
  ImageIcon,
} from "lucide-react"
import Link from "next/link"

const projectData = {
  id: 1,
  name: "Pembangunan Jalan Desa Makmur",
  location: "Desa Makmur, Kec. Sejahtera, Kab. Maju",
  description:
    "Proyek pembangunan jalan sepanjang 2.5 km untuk meningkatkan akses transportasi dan perekonomian masyarakat desa.",
  totalFund: 250000000,
  usedFund: 175000000,
  progress: 70,
  status: "Dalam Progres",
  category: "Infrastruktur",
  startDate: "2024-01-15",
  targetEndDate: "2024-06-30",
  contractor: "CV. Bangun Jaya",
  projectManager: "Ir. Budi Santoso",
}

const fundAllocations = [
  {
    id: 1,
    category: "Material Konstruksi",
    allocated: 150000000,
    used: 120000000,
    percentage: 60,
  },
  {
    id: 2,
    category: "Tenaga Kerja",
    allocated: 60000000,
    used: 35000000,
    percentage: 24,
  },
  {
    id: 3,
    category: "Peralatan & Sewa",
    allocated: 25000000,
    used: 15000000,
    percentage: 10,
  },
  {
    id: 4,
    category: "Administrasi & Lainnya",
    allocated: 15000000,
    used: 5000000,
    percentage: 6,
  },
]

const disbursementHistory = [
  {
    id: 1,
    date: "2024-01-20",
    amount: 75000000,
    phase: "Tahap 1 - Persiapan",
    status: "Approved",
    txHash: "0x1a2b3c4d5e6f7890abcdef1234567890",
    approver: "Smart Contract",
    documents: ["kontrak_kerja.pdf", "rab_detail.pdf"],
  },
  {
    id: 2,
    date: "2024-03-15",
    amount: 100000000,
    phase: "Tahap 2 - Pelaksanaan",
    status: "Approved",
    txHash: "0x2b3c4d5e6f7890abcdef1234567890ab",
    approver: "Smart Contract",
    documents: ["progress_report_1.pdf", "foto_kemajuan_1.jpg", "kwitansi_material.pdf"],
  },
  {
    id: 3,
    date: "2024-05-10",
    amount: 75000000,
    phase: "Tahap 3 - Penyelesaian",
    status: "Pending",
    txHash: "-",
    approver: "Menunggu Verifikasi",
    documents: [],
  },
]

const evidenceDocuments = [
  {
    id: 1,
    name: "Kontrak Kerja Proyek",
    type: "PDF",
    size: "2.4 MB",
    uploadDate: "2024-01-20",
    ipfsHash: "QmX1Y2Z3A4B5C6D7E8F9G0H1I2J3K4L5M6N7O8P9Q0R1S2T",
    category: "Kontrak",
  },
  {
    id: 2,
    name: "RAB Detail Proyek",
    type: "PDF",
    size: "1.8 MB",
    uploadDate: "2024-01-20",
    ipfsHash: "QmA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W",
    category: "Perencanaan",
  },
  {
    id: 3,
    name: "Foto Progress Minggu 1",
    type: "JPG",
    size: "3.2 MB",
    uploadDate: "2024-02-01",
    ipfsHash: "QmB2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X",
    category: "Dokumentasi",
  },
  {
    id: 4,
    name: "Kwitansi Pembelian Material",
    type: "PDF",
    size: "0.8 MB",
    uploadDate: "2024-02-15",
    ipfsHash: "QmC3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y",
    category: "Keuangan",
  },
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function ProjectDetail() {
  const [activeTab, setActiveTab] = useState("overview")

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
                  Kembali ke Dashboard
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Detail Proyek</h1>
                <p className="text-sm text-gray-600">Audit & Transparansi Dana</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Shield className="w-3 h-3 mr-1" />
                Blockchain Verified
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Header */}
        <Card className="mb-8 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{projectData.name}</CardTitle>
                <CardDescription className="text-base mb-4">{projectData.description}</CardDescription>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {projectData.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(projectData.startDate)} - {formatDate(projectData.targetEndDate)}
                  </div>
                  <div className="flex items-center">
                    <Wallet className="w-4 h-4 mr-1" />
                    {formatCurrency(projectData.totalFund)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Badge variant={projectData.status === "Selesai" ? "default" : "secondary"} className="mb-2">
                  {projectData.status}
                </Badge>
                <div className="text-sm text-gray-600">
                  <p>Kontraktor: {projectData.contractor}</p>
                  <p>PM: {projectData.projectManager}</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{formatCurrency(projectData.totalFund)}</div>
                <div className="text-sm text-gray-600">Total Alokasi</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{formatCurrency(projectData.usedFund)}</div>
                <div className="text-sm text-gray-600">Dana Terpakai</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{projectData.progress}%</div>
                <div className="text-sm text-gray-600">Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {formatCurrency(projectData.totalFund - projectData.usedFund)}
                </div>
                <div className="text-sm text-gray-600">Sisa Dana</div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progress Keseluruhan</span>
                <span className="text-sm text-gray-600">{projectData.progress}%</span>
              </div>
              <Progress value={projectData.progress} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="overview">Ringkasan</TabsTrigger>
            <TabsTrigger value="allocation">Alokasi Dana</TabsTrigger>
            <TabsTrigger value="disbursement">Riwayat Pencairan</TabsTrigger>
            <TabsTrigger value="documents">Dokumen Bukti</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Informasi Proyek</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Kategori:</span>
                      <p className="font-medium">{projectData.category}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <p className="font-medium">{projectData.status}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Mulai:</span>
                      <p className="font-medium">{formatDate(projectData.startDate)}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Target Selesai:</span>
                      <p className="font-medium">{formatDate(projectData.targetEndDate)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Pihak Terlibat</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-600">Kontraktor:</span>
                      <p className="font-medium">{projectData.contractor}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Project Manager:</span>
                      <p className="font-medium">{projectData.projectManager}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Sistem Verifikasi:</span>
                      <p className="font-medium flex items-center">
                        <Shield className="w-4 h-4 mr-1 text-green-600" />
                        Smart Contract Blockchain
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="allocation" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Rincian Alokasi Dana</CardTitle>
                <CardDescription>Pembagian dana berdasarkan kategori penggunaan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {fundAllocations.map((allocation) => (
                    <div key={allocation.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-gray-900">{allocation.category}</h3>
                        <Badge variant="outline">{allocation.percentage}%</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Dialokasikan</p>
                          <p className="font-semibold text-gray-900">{formatCurrency(allocation.allocated)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Terpakai</p>
                          <p className="font-semibold text-green-600">{formatCurrency(allocation.used)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Sisa</p>
                          <p className="font-semibold text-blue-600">
                            {formatCurrency(allocation.allocated - allocation.used)}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Penggunaan</span>
                          <span>{Math.round((allocation.used / allocation.allocated) * 100)}%</span>
                        </div>
                        <Progress value={(allocation.used / allocation.allocated) * 100} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disbursement" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Histori Pencairan Dana</CardTitle>
                <CardDescription>Jejak waktu pencairan dana dengan verifikasi blockchain</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {disbursementHistory.map((disbursement, index) => (
                    <div key={disbursement.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              disbursement.status === "Approved" ? "bg-green-100" : "bg-yellow-100"
                            }`}
                          >
                            {disbursement.status === "Approved" ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <Clock className="w-5 h-5 text-yellow-600" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{disbursement.phase}</h3>
                            <p className="text-sm text-gray-600">{formatDate(disbursement.date)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">{formatCurrency(disbursement.amount)}</div>
                          <Badge variant={disbursement.status === "Approved" ? "default" : "secondary"}>
                            {disbursement.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Transaction Hash:</span>
                          <p className="font-mono text-xs break-all">{disbursement.txHash}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Disetujui oleh:</span>
                          <p className="font-medium">{disbursement.approver}</p>
                        </div>
                      </div>

                      {disbursement.documents.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <span className="text-sm text-gray-600">Dokumen terkait:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {disbursement.documents.map((doc, docIndex) => (
                              <Badge key={docIndex} variant="outline" className="text-xs">
                                <FileText className="w-3 h-3 mr-1" />
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Dokumen Bukti & Evidence</CardTitle>
                <CardDescription>Semua dokumen disimpan di IPFS untuk transparansi dan immutability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {evidenceDocuments.map((document) => (
                    <div
                      key={document.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            {document.type === "PDF" ? (
                              <FileText className="w-5 h-5 text-blue-600" />
                            ) : (
                              <ImageIcon className="w-5 h-5 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm">{document.name}</h3>
                            <p className="text-xs text-gray-600">{document.category}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {document.type}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-xs text-gray-600 mb-3">
                        <div className="flex justify-between">
                          <span>Ukuran:</span>
                          <span>{document.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Upload:</span>
                          <span>{formatDate(document.uploadDate)}</span>
                        </div>
                        <div>
                          <span>IPFS Hash:</span>
                          <p className="font-mono text-xs break-all mt-1 bg-gray-50 p-1 rounded">{document.ipfsHash}</p>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Lihat
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <h4 className="font-medium text-blue-900 mb-1">Tentang IPFS Storage</h4>
                      <p className="text-blue-700">
                        Semua dokumen disimpan menggunakan InterPlanetary File System (IPFS) yang memastikan dokumen
                        tidak dapat diubah atau dihapus, memberikan transparansi penuh dalam audit proyek.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
