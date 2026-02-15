import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, DollarSign, FileText, Shield } from 'lucide-react';
import { useAuth, WorkerProfile } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const WorkerDashboard = () => {
  const { user, updateWorkerProfile } = useAuth();
  const navigate = useNavigate();
  const worker = user as WorkerProfile;

  const [price, setPrice] = useState(worker?.price?.toString() || '');
  const [diplomaName, setDiplomaName] = useState(worker?.diplomaName || '');
  const [cvName, setCvName] = useState(worker?.cvName || '');
  const [certNames, setCertNames] = useState<string[]>(worker?.certificateNames || []);

  if (!user || user.role !== 'worker') {
    navigate('/');
    return null;
  }

  const handlePriceSave = () => {
    const p = parseFloat(price);
    if (p > 0) {
      updateWorkerProfile({ price: p });
      toast.success('Price updated!');
    }
  };

  const jobLabel = worker.jobType.charAt(0).toUpperCase() + worker.jobType.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-4xl py-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <h1 className="text-2xl font-bold text-foreground">Worker Dashboard</h1>

          {/* Profile Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="h-5 w-5 text-primary" /> Profile Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground">Name</p>
                  <p className="font-semibold text-foreground">{worker.name}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground">Job Type</p>
                  <p className="font-semibold text-foreground">{jobLabel}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground">Rating</p>
                  <p className="flex items-center gap-1 font-semibold text-foreground">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {worker.rating}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground">Active Price</p>
                  <p className="text-lg font-bold text-primary">${worker.price}/hr</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="h-5 w-5 text-primary" /> Pricing Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="price">Price per Hour ($)</Label>
                  <Input id="price" type="number" min="1" step="0.5" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <Button onClick={handlePriceSave}>Update Price</Button>
              </div>
            </CardContent>
          </Card>

          {/* Credentials */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-primary" /> Credentials & Trust
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Diploma</Label>
                  <Input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => {
                    const name = e.target.files?.[0]?.name || '';
                    setDiplomaName(name);
                    updateWorkerProfile({ diplomaName: name });
                    if (name) toast.success('Diploma uploaded');
                  }} />
                  {diplomaName && <p className="text-xs text-muted-foreground">📄 {diplomaName}</p>}
                </div>
                <div className="space-y-2">
                  <Label>CV</Label>
                  <Input type="file" accept=".pdf" onChange={e => {
                    const name = e.target.files?.[0]?.name || '';
                    setCvName(name);
                    updateWorkerProfile({ cvName: name });
                    if (name) toast.success('CV uploaded');
                  }} />
                  {cvName && <p className="text-xs text-muted-foreground">📄 {cvName}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Certificates</Label>
                <Input type="file" accept=".pdf,.jpg,.jpeg,.png" multiple onChange={e => {
                  const names = Array.from(e.target.files || []).map(f => f.name);
                  setCertNames(names);
                  updateWorkerProfile({ certificateNames: names });
                  if (names.length) toast.success(`${names.length} certificate(s) uploaded`);
                }} />
                {certNames.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {certNames.map((n, i) => (
                      <span key={i} className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">📄 {n}</span>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default WorkerDashboard;
