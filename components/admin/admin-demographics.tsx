import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, RefreshCw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  getPopulationData,
  getReligionsData,
  getJobsData,
  getEducationData,
  updatePopulationData,
  updateReligionsData,
  updateJobsData,
  updateEducationData,
  subscribeToPopulationData,
  subscribeToReligionsData,
  subscribeToJobsData,
  subscribeToEducationData,
  PopulationData,
  ReligionData,
  JobData,
  EducationData,
  initializeDemographicData
} from "@/lib/demographic-service";

interface AdminDemographicsProps {
  onBack: () => void;
}

export default function AdminDemographics({ onBack }: AdminDemographicsProps) {
  const [populationData, setPopulationData] = useState<PopulationData | null>(null);
  const [religionsData, setReligionsData] = useState<ReligionData[]>([]);
  const [jobsData, setJobsData] = useState<JobData[]>([]);
  const [educationData, setEducationData] = useState<EducationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("population");
  const [successMessages, setSuccessMessages] = useState({
    population: false,
    religion: false,
    jobs: false,
    education: false,
  });

  useEffect(() => {
    loadData();
    
    // Subscribe to real-time updates
    const unsubscribePopulation = subscribeToPopulationData(setPopulationData);
    const unsubscribeReligions = subscribeToReligionsData(setReligionsData);
    const unsubscribeJobs = subscribeToJobsData(setJobsData);
    const unsubscribeEducation = subscribeToEducationData(setEducationData);

    return () => {
      unsubscribePopulation();
      unsubscribeReligions();
      unsubscribeJobs();
      unsubscribeEducation();
    };
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setSuccessMessages({
        population: false,
        religion: false,
        jobs: false,
        education: false,
      });
      
      const [population, religions, jobs, education] = await Promise.all([
        getPopulationData(),
        getReligionsData(),
        getJobsData(),
        getEducationData()
      ]);

      setPopulationData(population);
      setReligionsData(religions);
      setJobsData(jobs);
      setEducationData(education);

      // Initialize if no data exists
      if (!population && religions.length === 0 && jobs.length === 0 && education.length === 0) {
        await initializeDemographicData();
      }
    } catch (error) {
      console.error('Error loading demographic data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePopulationSave = async () => {
    if (!populationData) return;
    
    try {
      const success = await updatePopulationData(populationData.male, populationData.female);
      if (success) {
        setSuccessMessages(prev => ({ ...prev, population: true }));
        setTimeout(() => setSuccessMessages(prev => ({ ...prev, population: false })), 3000);
      }
    } catch (error) {
      console.error('Error saving population data:', error);
    }
  };

  const handleReligionSave = async () => {
    try {
      const success = await updateReligionsData(religionsData);
      if (success) {
        setSuccessMessages(prev => ({ ...prev, religion: true }));
        setTimeout(() => setSuccessMessages(prev => ({ ...prev, religion: false })), 3000);
      }
    } catch (error) {
      console.error('Error saving religion data:', error);
    }
  };

  const handleJobSave = async () => {
    try {
      const success = await updateJobsData(jobsData);
      if (success) {
        setSuccessMessages(prev => ({ ...prev, jobs: true }));
        setTimeout(() => setSuccessMessages(prev => ({ ...prev, jobs: false })), 3000);
      }
    } catch (error) {
      console.error('Error saving job data:', error);
    }
  };

  const handleEducationSave = async () => {
    try {
      const success = await updateEducationData(educationData);
      if (success) {
        setSuccessMessages(prev => ({ ...prev, education: true }));
        setTimeout(() => setSuccessMessages(prev => ({ ...prev, education: false })), 3000);
      }
    } catch (error) {
      console.error('Error saving education data:', error);
    }
  };

  const updatePopulation = (field: keyof PopulationData, value: number) => {
    if (!populationData) return;
    
    setPopulationData({
      ...populationData,
      [field]: value,
      total: field === 'male' ? value + populationData.female : populationData.male + value
    });
  };

  const updateReligion = (index: number, field: keyof ReligionData, value: string | number) => {
    const updated = [...religionsData];
    updated[index] = { ...updated[index], [field]: value };
    setReligionsData(updated);
  };

  const updateJob = (index: number, field: keyof JobData, value: string | number) => {
    const updated = [...jobsData];
    updated[index] = { ...updated[index], [field]: value };
    setJobsData(updated);
  };

  const updateEducation = (index: number, field: keyof EducationData, value: string | number) => {
    const updated = [...educationData];
    updated[index] = { ...updated[index], [field]: value };
    setEducationData(updated);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Kependudukan</h1>
          <p className="text-gray-600 dark:text-gray-400">Kelola data demografis desa</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={loadData} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
        </div>
      </div>

      <Tabs 
        value={activeTab} 
        onValueChange={(value) => {
          setActiveTab(value);
        }} 
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="population">Populasi</TabsTrigger>
          <TabsTrigger value="religion">Agama</TabsTrigger>
          <TabsTrigger value="jobs">Pekerjaan</TabsTrigger>
          <TabsTrigger value="education">Pendidikan</TabsTrigger>
        </TabsList>

        <TabsContent value="population">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Data Populasi</CardTitle>
                  <CardDescription>Kelola data jumlah penduduk berdasarkan jenis kelamin</CardDescription>
                </div>
                <Button onClick={handlePopulationSave} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Simpan
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {successMessages.population && (
                <div className="p-3 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg">
                  <p className="text-green-800 dark:text-green-200 flex items-center">
                    <span className="mr-2">✓</span>
                    Data populasi berhasil disimpan!
                  </p>
                </div>
              )}
              
              {populationData && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="male">Laki-laki</Label>
                    <Input
                      id="male"
                      type="number"
                      value={populationData.male}
                      onChange={(e) => updatePopulation('male', parseInt(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="female">Perempuan</Label>
                    <Input
                      id="female"
                      type="number"
                      value={populationData.female}
                      onChange={(e) => updatePopulation('female', parseInt(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Total</Label>
                    <Input
                      value={populationData.total}
                      disabled
                      className="mt-1 bg-gray-100 dark:bg-gray-800"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="religion">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Data Agama</CardTitle>
                  <CardDescription>Kelola data penduduk berdasarkan agama</CardDescription>
                </div>
                <Button onClick={handleReligionSave} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Simpan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {successMessages.religion && (
                <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg">
                  <p className="text-green-800 dark:text-green-200 flex items-center">
                    <span className="mr-2">✓</span>
                    Data agama berhasil disimpan!
                  </p>
                </div>
              )}
              
              <div className="grid gap-4">
                {religionsData.map((religion, index) => (
                  <div key={religion.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                    <div>
                      <Label htmlFor={`religion-name-${index}`}>Nama Agama</Label>
                      <Input
                        id={`religion-name-${index}`}
                        value={religion.name}
                        onChange={(e) => updateReligion(index, 'name', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`religion-count-${index}`}>Jumlah</Label>
                      <Input
                        id={`religion-count-${index}`}
                        type="number"
                        value={religion.count}
                        onChange={(e) => updateReligion(index, 'count', parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`religion-icon-${index}`}>Icon</Label>
                      <Input
                        id={`religion-icon-${index}`}
                        value={religion.icon}
                        onChange={(e) => updateReligion(index, 'icon', e.target.value)}
                        className="mt-1"
                        placeholder="fa-moon"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Data Pekerjaan</CardTitle>
                  <CardDescription>Kelola data penduduk berdasarkan jenis pekerjaan</CardDescription>
                </div>
                <Button onClick={handleJobSave} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Simpan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {successMessages.jobs && (
                <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg">
                  <p className="text-green-800 dark:text-green-200 flex items-center">
                    <span className="mr-2">✓</span>
                    Data pekerjaan berhasil disimpan!
                  </p>
                </div>
              )}
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {jobsData.map((job, index) => (
                  <div key={job.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                    <div>
                      <Label htmlFor={`job-name-${index}`}>Jenis Pekerjaan</Label>
                      <Input
                        id={`job-name-${index}`}
                        value={job.pekerjaan}
                        onChange={(e) => updateJob(index, 'pekerjaan', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`job-male-${index}`}>Laki-laki</Label>
                      <Input
                        id={`job-male-${index}`}
                        type="number"
                        value={job.laki}
                        onChange={(e) => updateJob(index, 'laki', parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`job-female-${index}`}>Perempuan</Label>
                      <Input
                        id={`job-female-${index}`}
                        type="number"
                        value={job.perempuan}
                        onChange={(e) => updateJob(index, 'perempuan', parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Data Pendidikan</CardTitle>
                  <CardDescription>Kelola data penduduk berdasarkan tingkat pendidikan</CardDescription>
                </div>
                <Button onClick={handleEducationSave} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Simpan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {successMessages.education && (
                <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg">
                  <p className="text-green-800 dark:text-green-200 flex items-center">
                    <span className="mr-2">✓</span>
                    Data pendidikan berhasil disimpan!
                  </p>
                </div>
              )}
              
              <div className="grid gap-4">
                {educationData.map((education, index) => (
                  <div key={education.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                    <div>
                      <Label htmlFor={`education-level-${index}`}>Tingkat Pendidikan</Label>
                      <Input
                        id={`education-level-${index}`}
                        value={education.level}
                        onChange={(e) => updateEducation(index, 'level', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`education-count-${index}`}>Jumlah</Label>
                      <Input
                        id={`education-count-${index}`}
                        type="number"
                        value={education.count}
                        onChange={(e) => updateEducation(index, 'count', parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
