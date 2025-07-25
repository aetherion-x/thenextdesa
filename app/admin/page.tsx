"use client"

import { useState } from "react";
import AdminDemographics from "@/components/admin/admin-demographics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Users, BarChart3, Settings } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
              onClick={() => setIsAuthenticated(false)}
            >
              Keluar
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <div className="flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium text-blue-600">
              <Users className="w-4 h-4 mr-2" />
              Data Kependudukan
            </div>
            <div className="flex items-center px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-not-allowed">
              <BarChart3 className="w-4 h-4 mr-2" />
              Data APBD (Coming Soon)
            </div>
            <div className="flex items-center px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-not-allowed">
              <Settings className="w-4 h-4 mr-2" />
              Pengaturan (Coming Soon)
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <AdminDemographics />
      </main>
    </div>
  );
}
