import { WorkerProfile, JobType } from './auth';

const firstNames = ['Ahmed', 'Sofia', 'Karim', 'Leila', 'Omar', 'Nadia', 'Youssef', 'Amina', 'Hassan', 'Fatima', 'Mehdi', 'Sara'];
const lastNames = ['Benali', 'Mansouri', 'Hadj', 'Boudiaf', 'Khelifi', 'Amrani', 'Ferhat', 'Zidane', 'Cherif', 'Bouzid', 'Rahmani', 'Belkacem'];
const jobTypes: JobType[] = ['plumber', 'electrician', 'decorator', 'pharmacist'];

export const seedMockWorkers = (): WorkerProfile[] => {
  const existing = localStorage.getItem('hcm_workers');
  if (existing) {
    const parsed = JSON.parse(existing);
    if (parsed.length > 0) return parsed;
  }

  const workers: WorkerProfile[] = Array.from({ length: 16 }, (_, i) => ({
    id: `mock-${i}`,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    email: `worker${i}@example.com`,
    role: 'worker' as const,
    phone: `+213 ${Math.floor(500000000 + Math.random() * 100000000)}`,
    jobType: jobTypes[i % jobTypes.length],
    experienceYears: Math.floor(1 + Math.random() * 15),
    price: Math.floor(15 + Math.random() * 85),
    rating: Math.round((2.5 + Math.random() * 2.5) * 10) / 10,
  }));

  localStorage.setItem('hcm_workers', JSON.stringify(workers));
  return workers;
};
