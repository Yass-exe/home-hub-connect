import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Search, SlidersHorizontal } from 'lucide-react';
import { WorkerProfile, JobType } from '@/lib/auth';
import { seedMockWorkers } from '@/lib/mockWorkers';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const jobTypeLabels: Record<JobType, string> = {
  plumber: 'Plumber',
  electrician: 'Electrician',
  decorator: 'Decorator',
  pharmacist: 'Pharmacist',
};

const jobTypeColors: Record<JobType, string> = {
  plumber: 'bg-primary/10 text-primary',
  electrician: 'bg-yellow-100 text-yellow-700',
  decorator: 'bg-purple-100 text-purple-700',
  pharmacist: 'bg-green-100 text-green-700',
};

const Discover = () => {
  const [workers, setWorkers] = useState<WorkerProfile[]>([]);
  const [search, setSearch] = useState('');
  const [jobFilter, setJobFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setWorkers(seedMockWorkers());
  }, []);

  const filtered = useMemo(() => {
    let result = [...workers];
    if (search) result = result.filter(w => w.name.toLowerCase().includes(search.toLowerCase()));
    if (jobFilter !== 'all') result = result.filter(w => w.jobType === jobFilter);

    switch (sortBy) {
      case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
    }
    return result;
  }, [workers, search, jobFilter, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-6">
        {/* Search Bar */}
        <div className="mb-6 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search workers by name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon" onClick={() => setShowFilters(f => !f)} className="lg:hidden">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <aside className={`w-64 shrink-0 space-y-4 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <Card>
              <CardContent className="space-y-4 p-4">
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Job Type</Label>
                  <Select value={jobFilter} onValueChange={setJobFilter}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="plumber">Plumber</SelectItem>
                      <SelectItem value="electrician">Electrician</SelectItem>
                      <SelectItem value="decorator">Decorator</SelectItem>
                      <SelectItem value="pharmacist">Pharmacist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Sort By</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name (A→Z)</SelectItem>
                      <SelectItem value="rating">Rating (High→Low)</SelectItem>
                      <SelectItem value="price-low">Price (Low→High)</SelectItem>
                      <SelectItem value="price-high">Price (High→Low)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Worker Grid */}
          <div className="flex-1">
            <p className="mb-4 text-sm text-muted-foreground">{filtered.length} workers found</p>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map(worker => (
                  <motion.div
                    key={worker.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                      <CardContent className="p-5">
                        <div className="mb-3 flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-foreground">{worker.name}</h3>
                            <Badge variant="secondary" className={`mt-1 ${jobTypeColors[worker.jobType]}`}>
                              {jobTypeLabels[worker.jobType]}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 rounded-lg bg-muted px-2 py-1">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold">{worker.rating}</span>
                          </div>
                        </div>
                        <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                          <span>{worker.experienceYears} yrs experience</span>
                          <span className="text-lg font-bold text-foreground">${worker.price}/hr</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">View Profile</Button>
                          <Button size="sm" className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">Contact</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Discover;
