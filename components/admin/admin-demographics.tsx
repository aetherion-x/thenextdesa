import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, RefreshCw, Users, Heart, Briefcase, GraduationCap } from "lucide-react";
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
      jumlah: field === 'male' ? value + populationData.female : populationData.male + value
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Kependudukan</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Kelola data demografis desa 
          </p>
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
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <TabsTrigger 
            value="population"
            className="relative data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm hover:bg-green-50 hover:text-green-600 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-green-400 dark:hover:bg-gray-700 dark:hover:text-green-400 transition-all duration-200 font-medium"
          >
            <Users className="w-4 h-4 mr-2" />
            Populasi
            {activeTab === "population" && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-green-600 dark:bg-green-400 rounded-full"></div>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="religion"
            className="relative data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm hover:bg-green-50 hover:text-green-600 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-green-400 dark:hover:bg-gray-700 dark:hover:text-green-400 transition-all duration-200 font-medium"
          >
            <Heart className="w-4 h-4 mr-2" />
            Agama
            {activeTab === "religion" && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-green-600 dark:bg-green-400 rounded-full"></div>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="jobs"
            className="relative data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm hover:bg-green-50 hover:text-green-600 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-green-400 dark:hover:bg-gray-700 dark:hover:text-green-400 transition-all duration-200 font-medium"
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Pekerjaan
            {activeTab === "jobs" && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-green-600 dark:bg-green-400 rounded-full"></div>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="education"
            className="relative data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm hover:bg-green-50 hover:text-green-600 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-green-400 dark:hover:bg-gray-700 dark:hover:text-green-400 transition-all duration-200 font-medium"
          >
            <GraduationCap className="w-4 h-4 mr-2" />
            Pendidikan
            {activeTab === "education" && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-green-600 dark:bg-green-400 rounded-full"></div>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="population" className="mt-6 animate-in fade-in-50 duration-200">
          <Card className="border-l-4 border-l-green-600 dark:border-l-green-400 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-green-700 dark:text-green-300">Data Populasi</CardTitle>
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
                    <Label>Jumlah</Label>
                    <Input
                      value={populationData.jumlah}
                      disabled
                      className="mt-1 bg-gray-100 dark:bg-gray-800"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="religion" className="mt-6 animate-in fade-in-50 duration-200">
          <Card className="border-l-4 border-l-green-600 dark:border-l-green-400 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-green-700 dark:text-green-300">Data Agama</CardTitle>
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
                  <div key={religion.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                    <div>
                      <Label htmlFor={`religion-agama-${index}`}>Agama</Label>
                      <Input
                        id={`religion-agama-${index}`}
                        value={religion.agama}
                        onChange={(e) => updateReligion(index, 'agama', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`religion-laki-${index}`}>Laki-laki</Label>
                      <Input
                        id={`religion-laki-${index}`}
                        type="number"
                        value={religion.laki}
                        onChange={(e) => {
                          const laki = parseInt(e.target.value) || 0;
                          updateReligion(index, 'laki', laki);
                          updateReligion(index, 'jumlah', laki + religion.perempuan);
                        }}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`religion-perempuan-${index}`}>Perempuan</Label>
                      <Input
                        id={`religion-perempuan-${index}`}
                        type="number"
                        value={religion.perempuan}
                        onChange={(e) => {
                          const perempuan = parseInt(e.target.value) || 0;
                          updateReligion(index, 'perempuan', perempuan);
                          updateReligion(index, 'jumlah', religion.laki + perempuan);
                        }}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`religion-jumlah-${index}`}>Jumlah</Label>
                      <Input
                        id={`religion-jumlah-${index}`}
                        type="number"
                        value={religion.jumlah}
                        disabled
                        className="mt-1 bg-gray-100 dark:bg-gray-800"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="mt-6 animate-in fade-in-50 duration-200">
          <Card className="border-l-4 border-l-green-600 dark:border-l-green-400 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-green-700 dark:text-green-300">Data Pekerjaan</CardTitle>
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
                  <div key={job.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                    <div>
                      <Label htmlFor={`job-name-${index}`}>Pekerjaan</Label>
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
                        onChange={(e) => {
                          const laki = parseInt(e.target.value) || 0;
                          updateJob(index, 'laki', laki);
                          updateJob(index, 'jumlah', laki + job.perempuan);
                        }}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`job-female-${index}`}>Perempuan</Label>
                      <Input
                        id={`job-female-${index}`}
                        type="number"
                        value={job.perempuan}
                        onChange={(e) => {
                          const perempuan = parseInt(e.target.value) || 0;
                          updateJob(index, 'perempuan', perempuan);
                          updateJob(index, 'jumlah', job.laki + perempuan);
                        }}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`job-jumlah-${index}`}>Jumlah</Label>
                      <Input
                        id={`job-jumlah-${index}`}
                        type="number"
                        value={job.jumlah}
                        disabled
                        className="mt-1 bg-gray-100 dark:bg-gray-800"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="mt-6 animate-in fade-in-50 duration-200">
          <Card className="border-l-4 border-l-green-600 dark:border-l-green-400 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-green-700 dark:text-green-300">Data Pendidikan</CardTitle>
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
                  <div key={education.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                    <div>
                      <Label htmlFor={`education-level-${index}`}>Tingkat Pendidikan</Label>
                      <Input
                        id={`education-level-${index}`}
                        value={education.tingkat_pendidikan}
                        onChange={(e) => updateEducation(index, 'tingkat_pendidikan', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`education-laki-${index}`}>Laki-laki</Label>
                      <Input
                        id={`education-laki-${index}`}
                        type="number"
                        value={education.laki}
                        onChange={(e) => {
                          const laki = parseInt(e.target.value) || 0;
                          updateEducation(index, 'laki', laki);
                          updateEducation(index, 'jumlah', laki + education.perempuan);
                        }}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`education-perempuan-${index}`}>Perempuan</Label>
                      <Input
                        id={`education-perempuan-${index}`}
                        type="number"
                        value={education.perempuan}
                        onChange={(e) => {
                          const perempuan = parseInt(e.target.value) || 0;
                          updateEducation(index, 'perempuan', perempuan);
                          updateEducation(index, 'jumlah', education.laki + perempuan);
                        }}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`education-jumlah-${index}`}>Jumlah</Label>
                      <Input
                        id={`education-jumlah-${index}`}
                        type="number"
                        value={education.jumlah}
                        disabled
                        className="mt-1 bg-gray-100 dark:bg-gray-800"
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
