import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Save, RefreshCw } from "lucide-react";
import { 
  getDemographicData, 
  updatePopulationData, 
  updateReligionData, 
  updateJobData, 
  updateEducationData,
  DemographicData,
  PopulationData,
  ReligionData,
  JobData,
  EducationData
} from "@/lib/demographic-service";
import { toast } from "@/hooks/use-toast";

export default function AdminDemographics() {
  const [demographicData, setDemographicData] = useState<DemographicData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Local state untuk editing
  const [editPopulation, setEditPopulation] = useState<PopulationData>({
    total: 0,
    male: 0,
    female: 0,
    lastUpdated: new Date()
  });
  
  const [editReligions, setEditReligions] = useState<ReligionData[]>([]);
  const [editJobs, setEditJobs] = useState<JobData[]>([]);
  const [editEducation, setEditEducation] = useState<EducationData[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getDemographicData();
      if (data) {
        setDemographicData(data);
        setEditPopulation(data.population);
        setEditReligions([...data.religions]);
        setEditJobs([...data.jobs]);
        setEditEducation([...data.education]);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Gagal memuat data kependudukan",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSavePopulation = async () => {
    try {
      setSaving(true);
      const success = await updatePopulationData(editPopulation);
      if (success) {
        toast({
          title: "Berhasil",
          description: "Data populasi berhasil disimpan",
        });
        await loadData();
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan data populasi",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveReligions = async () => {
    try {
      setSaving(true);
      const success = await updateReligionData(editReligions);
      if (success) {
        toast({
          title: "Berhasil",
          description: "Data agama berhasil disimpan",
        });
        await loadData();
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan data agama",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveJobs = async () => {
    try {
      setSaving(true);
      const success = await updateJobData(editJobs);
      if (success) {
        toast({
          title: "Berhasil",
          description: "Data pekerjaan berhasil disimpan",
        });
        await loadData();
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan data pekerjaan",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveEducation = async () => {
    try {
      setSaving(true);
      const success = await updateEducationData(editEducation);
      if (success) {
        toast({
          title: "Berhasil",
          description: "Data pendidikan berhasil disimpan",
        });
        await loadData();
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan data pendidikan",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const addNewJob = () => {
    setEditJobs([...editJobs, { pekerjaan: "", laki: 0, perempuan: 0 }]);
  };

  const removeJob = (index: number) => {
    setEditJobs(editJobs.filter((_, i) => i !== index));
  };

  const updateJob = (index: number, field: keyof JobData, value: string | number) => {
    const newJobs = [...editJobs];
    newJobs[index] = { ...newJobs[index], [field]: value };
    setEditJobs(newJobs);
  };

  const addNewEducation = () => {
    setEditEducation([...editEducation, { level: "", count: 0 }]);
  };

  const removeEducation = (index: number) => {
    setEditEducation(editEducation.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, field: keyof EducationData, value: string | number) => {
    const newEducation = [...editEducation];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setEditEducation(newEducation);
  };

  const updateReligion = (index: number, field: keyof ReligionData, value: string | number) => {
    const newReligions = [...editReligions];
    newReligions[index] = { ...newReligions[index], [field]: value };
    setEditReligions(newReligions);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="animate-spin h-8 w-8 mx-auto mb-4" />
          <p>Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Admin - Data Kependudukan</h1>
          <p className="text-muted-foreground">
            Kelola data kependudukan desa
          </p>
        </div>
        <Button onClick={loadData} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {demographicData && (
        <div className="mb-4">
          <Badge variant="secondary">
            Terakhir diperbarui: {demographicData.lastUpdated.toLocaleString('id-ID')}
          </Badge>
        </div>
      )}

      <Tabs defaultValue="population" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="population">Data Populasi</TabsTrigger>
          <TabsTrigger value="religion">Data Agama</TabsTrigger>
          <TabsTrigger value="jobs">Data Pekerjaan</TabsTrigger>
          <TabsTrigger value="education">Data Pendidikan</TabsTrigger>
        </TabsList>

        <TabsContent value="population">
          <Card>
            <CardHeader>
              <CardTitle>Data Populasi</CardTitle>
              <CardDescription>
                Kelola data jumlah penduduk berdasarkan jenis kelamin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="total">Total Penduduk</Label>
                  <Input
                    id="total"
                    type="number"
                    value={editPopulation.total}
                    onChange={(e) => setEditPopulation({
                      ...editPopulation,
                      total: parseInt(e.target.value) || 0
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="male">Laki-laki</Label>
                  <Input
                    id="male"
                    type="number"
                    value={editPopulation.male}
                    onChange={(e) => setEditPopulation({
                      ...editPopulation,
                      male: parseInt(e.target.value) || 0
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="female">Perempuan</Label>
                  <Input
                    id="female"
                    type="number"
                    value={editPopulation.female}
                    onChange={(e) => setEditPopulation({
                      ...editPopulation,
                      female: parseInt(e.target.value) || 0
                    })}
                  />
                </div>
              </div>
              <Button onClick={handleSavePopulation} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Menyimpan..." : "Simpan Data Populasi"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="religion">
          <Card>
            <CardHeader>
              <CardTitle>Data Agama</CardTitle>
              <CardDescription>
                Kelola data penduduk berdasarkan agama
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {editReligions.map((religion, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                  <div>
                    <Label htmlFor={`religion-name-${index}`}>Nama Agama</Label>
                    <Input
                      id={`religion-name-${index}`}
                      value={religion.name}
                      onChange={(e) => updateReligion(index, 'name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`religion-count-${index}`}>Jumlah</Label>
                    <Input
                      id={`religion-count-${index}`}
                      type="number"
                      value={religion.count}
                      onChange={(e) => updateReligion(index, 'count', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`religion-icon-${index}`}>Icon Class</Label>
                    <Input
                      id={`religion-icon-${index}`}
                      value={religion.icon}
                      onChange={(e) => updateReligion(index, 'icon', e.target.value)}
                      placeholder="fas fa-mosque"
                    />
                  </div>
                </div>
              ))}
              <Button onClick={handleSaveReligions} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Menyimpan..." : "Simpan Data Agama"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <CardTitle>Data Pekerjaan</CardTitle>
              <CardDescription>
                Kelola data penduduk berdasarkan jenis pekerjaan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-h-96 overflow-y-auto space-y-4">
                {editJobs.map((job, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                    <div className="md:col-span-2">
                      <Label htmlFor={`job-name-${index}`}>Jenis Pekerjaan</Label>
                      <Input
                        id={`job-name-${index}`}
                        value={job.pekerjaan}
                        onChange={(e) => updateJob(index, 'pekerjaan', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`job-male-${index}`}>Laki-laki</Label>
                      <Input
                        id={`job-male-${index}`}
                        type="number"
                        value={job.laki}
                        onChange={(e) => updateJob(index, 'laki', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="flex items-end space-x-2">
                      <div className="flex-1">
                        <Label htmlFor={`job-female-${index}`}>Perempuan</Label>
                        <Input
                          id={`job-female-${index}`}
                          type="number"
                          value={job.perempuan}
                          onChange={(e) => updateJob(index, 'perempuan', parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => removeJob(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <Button onClick={addNewJob} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Pekerjaan
                </Button>
                <Button onClick={handleSaveJobs} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Menyimpan..." : "Simpan Data Pekerjaan"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle>Data Pendidikan</CardTitle>
              <CardDescription>
                Kelola data penduduk berdasarkan tingkat pendidikan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {editEducation.map((edu, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                  <div className="md:col-span-2">
                    <Label htmlFor={`edu-level-${index}`}>Tingkat Pendidikan</Label>
                    <Input
                      id={`edu-level-${index}`}
                      value={edu.level}
                      onChange={(e) => updateEducation(index, 'level', e.target.value)}
                    />
                  </div>
                  <div className="flex items-end space-x-2">
                    <div className="flex-1">
                      <Label htmlFor={`edu-count-${index}`}>Jumlah</Label>
                      <Input
                        id={`edu-count-${index}`}
                        type="number"
                        value={edu.count}
                        onChange={(e) => updateEducation(index, 'count', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => removeEducation(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="flex space-x-2">
                <Button onClick={addNewEducation} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Tingkat Pendidikan
                </Button>
                <Button onClick={handleSaveEducation} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Menyimpan..." : "Simpan Data Pendidikan"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
