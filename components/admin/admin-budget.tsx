import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  RevenueData, 
  ExpenditureData, 
  BudgetSummary,
  getRevenueData,
  getExpenditureData,
  getBudgetSummary,
  updateRevenueData,
  updateExpenditureData,
  subscribeToRevenueData,
  subscribeToExpenditureData,
  subscribeToBudgetSummary,
  initializeBudgetData
} from '@/lib/budget-service';

interface AdminBudgetProps {
  onBack: () => void;
}

export default function AdminBudget({ onBack }: AdminBudgetProps) {
  const [activeTab, setActiveTab] = useState('revenue');
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [expenditureData, setExpenditureData] = useState<ExpenditureData[]>([]);
  const [budgetSummary, setBudgetSummary] = useState<BudgetSummary | null>(null);
  const [currentYear, setCurrentYear] = useState(2024);
  const [loading, setLoading] = useState(true);
  const [successMessages, setSuccessMessages] = useState({
    revenue: false,
    expenditure: false,
  });

  useEffect(() => {
    loadData();
    
    // Subscribe to real-time updates
    const unsubscribeRevenue = subscribeToRevenueData(currentYear, setRevenueData);
    const unsubscribeExpenditure = subscribeToExpenditureData(currentYear, setExpenditureData);
    const unsubscribeSummary = subscribeToBudgetSummary(currentYear, setBudgetSummary);

    return () => {
      unsubscribeRevenue();
      unsubscribeExpenditure();
      unsubscribeSummary();
    };
  }, [currentYear]);

  const loadData = async () => {
    try {
      setLoading(true);
      setSuccessMessages({
        revenue: false,
        expenditure: false,
      });
      
      const [revenue, expenditure, summary] = await Promise.all([
        getRevenueData(currentYear),
        getExpenditureData(currentYear),
        getBudgetSummary(currentYear)
      ]);

      setRevenueData(revenue);
      setExpenditureData(expenditure);
      setBudgetSummary(summary);

      // Initialize if no data exists
      if (revenue.length === 0 && expenditure.length === 0) {
        await initializeBudgetData(currentYear);
      }
    } catch (error) {
      console.error('Error loading budget data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRevenueChange = (index: number, field: keyof RevenueData, value: string | number) => {
    const updated = [...revenueData];
    if (field === 'amount') {
      updated[index] = { ...updated[index], [field]: Number(value) };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setRevenueData(updated);
  };

  const handleExpenditureChange = (index: number, field: keyof ExpenditureData, value: string | number) => {
    const updated = [...expenditureData];
    if (field === 'amount') {
      updated[index] = { ...updated[index], [field]: Number(value) };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setExpenditureData(updated);
  };

  const handleSaveRevenue = async () => {
    try {
      const success = await updateRevenueData(currentYear, revenueData);
      if (success) {
        setSuccessMessages(prev => ({ ...prev, revenue: true }));
        setTimeout(() => setSuccessMessages(prev => ({ ...prev, revenue: false })), 3000);
      }
    } catch (error) {
      console.error('Error saving revenue data:', error);
    }
  };

  const handleSaveExpenditure = async () => {
    try {
      const success = await updateExpenditureData(currentYear, expenditureData);
      if (success) {
        setSuccessMessages(prev => ({ ...prev, expenditure: true }));
        setTimeout(() => setSuccessMessages(prev => ({ ...prev, expenditure: false })), 3000);
      }
    } catch (error) {
      console.error('Error saving expenditure data:', error);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin APBD</h1>
          <p className="text-gray-600 dark:text-gray-400">Kelola data Anggaran Pendapatan dan Belanja Desa</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={loadData} variant="outline">
            <i className="fas fa-sync-alt mr-2"></i>
            Refresh
          </Button>
          <Button onClick={onBack} variant="outline">
            <i className="fas fa-arrow-left mr-2"></i>
            Kembali
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      {budgetSummary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <i className="fas fa-arrow-up text-green-600 dark:text-green-400 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Pendapatan</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(budgetSummary.totalRevenue)}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                <i className="fas fa-arrow-down text-red-600 dark:text-red-400 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Belanja</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {formatCurrency(budgetSummary.totalExpenditure)}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${budgetSummary.surplus >= 0 ? 'bg-blue-100 dark:bg-blue-900' : 'bg-orange-100 dark:bg-orange-900'}`}>
                <i className={`fas ${budgetSummary.surplus >= 0 ? 'fa-plus' : 'fa-minus'} ${budgetSummary.surplus >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'} text-xl`}></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {budgetSummary.surplus >= 0 ? 'Surplus' : 'Defisit'}
                </p>
                <p className={`text-2xl font-bold ${budgetSummary.surplus >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>
                  {formatCurrency(Math.abs(budgetSummary.surplus))}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <TabsTrigger 
            value="revenue"
            className="relative data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm hover:bg-green-50 hover:text-green-600 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-green-400 dark:hover:bg-gray-700 dark:hover:text-green-400 transition-all duration-200 font-medium"
          >
            <i className="fas fa-arrow-up mr-2"></i>
            Pendapatan
            {activeTab === "revenue" && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-green-600 dark:bg-green-400 rounded-full"></div>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="expenditure"
            className="relative data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm hover:bg-green-50 hover:text-green-600 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-green-400 dark:hover:bg-gray-700 dark:hover:text-green-400 transition-all duration-200 font-medium"
          >
            <i className="fas fa-arrow-down mr-2"></i>
            Belanja
            {activeTab === "expenditure" && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-green-600 dark:bg-green-400 rounded-full"></div>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="revenue">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Data Pendapatan</h3>
              <Button onClick={handleSaveRevenue} className="bg-green-600 hover:bg-green-700">
                <i className="fas fa-save mr-2"></i>
                Simpan
              </Button>
            </div>
            
            {successMessages.revenue && (
              <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg">
                <p className="text-green-800 dark:text-green-200">
                  <i className="fas fa-check-circle mr-2"></i>
                  Data pendapatan berhasil disimpan!
                </p>
              </div>
            )}

            <div className="space-y-4">
              {revenueData.map((item, index) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                  <div>
                    <Label htmlFor={`revenue-name-${index}`}>Jenis Pendapatan</Label>
                    <Input
                      id={`revenue-name-${index}`}
                      value={item.name}
                      onChange={(e) => handleRevenueChange(index, 'name', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`revenue-amount-${index}`}>Jumlah (Rp)</Label>
                    <Input
                      id={`revenue-amount-${index}`}
                      type="number"
                      value={item.amount}
                      onChange={(e) => handleRevenueChange(index, 'amount', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="expenditure">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Data Belanja</h3>
              <Button onClick={handleSaveExpenditure} className="bg-green-600 hover:bg-green-700">
                <i className="fas fa-save mr-2"></i>
                Simpan
              </Button>
            </div>
            
            {successMessages.expenditure && (
              <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg">
                <p className="text-green-800 dark:text-green-200">
                  <i className="fas fa-check-circle mr-2"></i>
                  Data belanja berhasil disimpan!
                </p>
              </div>
            )}

            <div className="space-y-4">
              {expenditureData.map((item, index) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                  <div>
                    <Label htmlFor={`expenditure-name-${index}`}>Jenis Belanja</Label>
                    <Input
                      id={`expenditure-name-${index}`}
                      value={item.name}
                      onChange={(e) => handleExpenditureChange(index, 'name', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`expenditure-amount-${index}`}>Jumlah (Rp)</Label>
                    <Input
                      id={`expenditure-amount-${index}`}
                      type="number"
                      value={item.amount}
                      onChange={(e) => handleExpenditureChange(index, 'amount', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
