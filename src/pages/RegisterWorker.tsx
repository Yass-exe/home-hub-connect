import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth, JobType } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const RegisterWorker = () => {
  const navigate = useNavigate();
  const { registerWorker } = useAuth();
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '',
    jobType: '' as JobType, experienceYears: '',
    price: '', diplomaName: '', cvName: '', certificateNames: [] as string[],
  });

  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.jobType) { toast.error('Please select a job type'); return; }
    const success = registerWorker({
      name: form.name, email: form.email, password: form.password,
      phone: form.phone, role: 'worker', jobType: form.jobType,
      experienceYears: parseInt(form.experienceYears) || 0,
      price: parseFloat(form.price) || 0,
      diplomaName: form.diplomaName, cvName: form.cvName,
      certificateNames: form.certificateNames,
    });
    if (success) {
      toast.success('Worker account created!');
      navigate('/worker-dashboard');
    } else {
      toast.error('Email already in use');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Worker Account</CardTitle>
            <CardDescription>Set up your professional profile</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Personal Info */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={form.name} onChange={e => set('name', e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" value={form.phone} onChange={e => set('phone', e.target.value)} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={e => set('email', e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={form.password} onChange={e => set('password', e.target.value)} required minLength={6} />
              </div>

              {/* Work Info */}
              <div className="border-t pt-4">
                <p className="mb-3 text-sm font-semibold text-foreground">Work Information</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Job Type</Label>
                    <Select value={form.jobType} onValueChange={v => set('jobType', v)}>
                      <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plumber">Plumber</SelectItem>
                        <SelectItem value="electrician">Electrician</SelectItem>
                        <SelectItem value="decorator">Decorator</SelectItem>
                        <SelectItem value="pharmacist">Pharmacist</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exp">Years of Experience</Label>
                    <Input id="exp" type="number" min="0" value={form.experienceYears} onChange={e => set('experienceYears', e.target.value)} required />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="price">Price per Hour ($)</Label>
                  <Input id="price" type="number" min="1" step="0.5" value={form.price} onChange={e => set('price', e.target.value)} required />
                </div>
              </div>

              {/* Documents */}
              <div className="border-t pt-4">
                <p className="mb-3 text-sm font-semibold text-foreground">Credentials (Optional)</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="diploma">Diploma</Label>
                    <Input id="diploma" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => set('diplomaName', e.target.files?.[0]?.name || '')} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cv">CV</Label>
                    <Input id="cv" type="file" accept=".pdf" onChange={e => set('cvName', e.target.files?.[0]?.name || '')} />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="certs">Certificates</Label>
                  <Input id="certs" type="file" accept=".pdf,.jpg,.jpeg,.png" multiple onChange={e => {
                    const names = Array.from(e.target.files || []).map(f => f.name);
                    setForm(f => ({ ...f, certificateNames: names }));
                  }} />
                </div>
              </div>

              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Create Worker Account</Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <button onClick={() => navigate('/login')} className="font-semibold text-primary hover:underline">Sign in</button>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterWorker;
