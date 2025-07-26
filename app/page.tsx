"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { MapPin, Search, TrendingUp, Users, Wallet, Eye, Filter } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    id: 1,
    name: "Pembangunan Jalan Desa Makmur",
    location: "Desa Makmur, Kec. Sejahtera",
    totalFund: 250000000,
    usedFund: 175000000,
    progress: 70,
    status: "Dalam Progres",
    category: "Infrastruktur",
  },
  {
    id: 2,
    name: "Renovasi Balai Desa Harmoni",
    location: "Desa Harmoni, Kec. Damai",
    totalFund: 150000000,
    usedFund: 150000000,
    progress: 100,
    status: "Selesai",
    category: "Fasilitas Publik",
  },
  {
    id: 3,
    name: "Program Pelatihan UMKM",
    location: "Desa Berkah, Kec. Maju",
    totalFund: 75000000,
    usedFund: 30000000,
    progress: 40,
    status: "Dalam Progres",
    category: "Pemberdayaan",
  },
  {
    id: 4,
    name: "Sistem Irigasi Pertanian",
    location: "Desa Subur, Kec. Tani",
    totalFund: 300000000,
    usedFund: 90000000,
    progress: 30,
    status: "Dalam Progres",
    category: "Pertanian",
  },
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function PublicDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  const totalProjects = projects.length
  const totalFunds = projects.reduce((sum, project) => sum + project.totalFund, 0)
  const totalUsedFunds = projects.reduce((sum, project) => sum + project.usedFund, 0)
  const averageProgress = Math.round(projects.reduce((sum, project) => sum + project.progress, 0) / projects.length)
  const completedProjects = projects.filter((p) => p.status === "Selesai").length

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Transparansi Dana Desa</h1>
                <p className="text-sm text-gray-600">Sistem Monitoring Berbasis Blockchain</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Cari proyek atau lokasi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Proyek</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalProjects}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                {completedProjects} selesai
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Dana</CardTitle>
              <Wallet className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalFunds)}</div>
              <p className="text-xs text-gray-600 mt-1">Dialokasikan untuk {totalProjects} proyek</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Dana Terpakai</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalUsedFunds)}</div>
              <p className="text-xs text-gray-600 mt-1">
                {Math.round((totalUsedFunds / totalFunds) * 100)}% dari total alokasi
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Rata-rata Progress</CardTitle>
              <MapPin className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{averageProgress}%</div>
              <Progress value={averageProgress} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Interactive Map Placeholder */}
          <Card className="lg:col-span-2 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>Peta Sebaran Proyek</span>
              </CardTitle>
              <CardDescription>Visualisasi lokasi proyek dana desa di seluruh Indonesia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=600')] bg-cover bg-center opacity-20"></div>
                <div className="relative z-10 text-center">
                  <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Peta Interaktif</h3>
                  <p className="text-gray-600 max-w-md">
                    Klik pada pin lokasi untuk melihat detail proyek di setiap desa
                  </p>
                </div>
                {/* Sample location pins */}
                <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              </div>
            </CardContent>
          </Card>

          {/* Project Statistics */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Statistik Proyek</CardTitle>
              <CardDescription>Ringkasan status proyek berdasarkan kategori</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Infrastruktur</span>
                  <Badge variant="secondary">1 proyek</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Fasilitas Publik</span>
                  <Badge variant="secondary">1 proyek</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pemberdayaan</span>
                  <Badge variant="secondary">1 proyek</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pertanian</span>
                  <Badge variant="secondary">1 proyek</Badge>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium text-gray-900 mb-3">Status Kemajuan</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Selesai</span>
                    <span className="font-medium text-green-600">{completedProjects}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Dalam Progres</span>
                    <span className="font-medium text-blue-600">{totalProjects - completedProjects}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects List */}
        <Card className="mt-8 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Daftar Proyek Dana Desa</CardTitle>
            <CardDescription>Klik pada proyek untuk melihat detail alokasi dan pencairan dana</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {project.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={project.status === "Selesai" ? "default" : "secondary"}>{project.status}</Badge>
                      <p className="text-sm text-gray-600 mt-1">{project.category}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Total Alokasi</p>
                      <p className="font-semibold text-gray-900">{formatCurrency(project.totalFund)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Dana Terpakai</p>
                      <p className="font-semibold text-gray-900">{formatCurrency(project.usedFund)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Progress</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={project.progress} className="flex-1" />
                        <span className="text-sm font-medium">{project.progress}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Link href={`/project/${project.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Lihat Detail
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
