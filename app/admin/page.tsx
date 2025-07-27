"use client"

import { useState } from "react";
import AdminDemographics from "@/components/admin/admin-demographics";
import AdminBudget from "@/components/admin/admin-budget";
import AdminBumdes from "@/components/admin/admin-bumdes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Users, BarChart3, Store } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'demographics' | 'budget' | 'bumdes'>('dashboard');

  // Untuk demo, password sederhana. Di production sebaiknya gunakan sistem auth yang lebih robust
  const ADMIN_PASSWORD = "admin123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Password salah!");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    setCurrentPage('dashboard');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Lock className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <CardTitle>Admin Dashboard</CardTitle>
            <CardDescription>
              Masukkan password untuk mengakses dashboard admin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password admin"
                  required
                />
                {error && (
                  <p className="text-sm text-red-600 mt-1">{error}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Masuk
              </Button>
            </form>
            <div className="mt-4 text-xs text-gray-500 text-center">
              Demo: password = "admin123"
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentPage === 'demographics') {
    return <AdminDemographics onBack={() => setCurrentPage('dashboard')} />;
  }

  if (currentPage === 'budget') {
    return <AdminBudget onBack={() => setCurrentPage('dashboard')} />;
  }

  if (currentPage === 'bumdes') {
    return <AdminBumdes onBack={() => setCurrentPage('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <BarChart3 className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Kelola data website desa
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
            >
              Keluar
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Dashboard Cards */}
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Demographics Card */}
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentPage('demographics')}>
              <CardHeader>
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <CardTitle>Data Kependudukan</CardTitle>
                    <CardDescription>
                      Kelola data populasi, agama, pekerjaan, dan pendidikan
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                  Kelola Data
                  <span className="ml-2">→</span>
                </div>
              </CardContent>
            </Card>

            {/* Budget Card */}
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentPage('budget')}>
              <CardHeader>
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-4">
                    <CardTitle>Data APBD</CardTitle>
                    <CardDescription>
                      Kelola data anggaran pendapatan dan belanja desa
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-green-600 dark:text-green-400 font-medium">
                  Kelola Data
                  <span className="ml-2">→</span>
                </div>
              </CardContent>
            </Card>

            {/* BUMDes Card */}
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentPage('bumdes')}>
              <CardHeader>
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <Store className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="ml-4">
                    <CardTitle>Data BUMDes</CardTitle>
                    <CardDescription>
                      Kelola data Badan Usaha Milik Desa dan upload foto
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-orange-600 dark:text-orange-400 font-medium">
                  Kelola Data
                  <span className="ml-2">→</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Penduduk</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      2,847
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">APBD 2024</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      2.1M
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <Store className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Unit BUMDes</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      5
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Data Terbaru</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      Hari ini
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Aksi Cepat</CardTitle>
              <CardDescription>Kelola data desa dengan mudah</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="h-16 flex flex-col items-center justify-center"
                  onClick={() => setCurrentPage('demographics')}
                >
                  <Users className="w-5 h-5 mb-2" />
                  <span>Update Kependudukan</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-16 flex flex-col items-center justify-center"
                  onClick={() => setCurrentPage('budget')}
                >
                  <BarChart3 className="w-5 h-5 mb-2" />
                  <span>Kelola APBD</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-16 flex flex-col items-center justify-center"
                  onClick={() => setCurrentPage('bumdes')}
                >
                  <Store className="w-5 h-5 mb-2" />
                  <span>Manajemen BUMDes</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
