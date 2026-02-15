import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import RoleSelect from './RoleSelect';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(user.role === 'worker' ? '/worker-dashboard' : '/discover', { replace: true });
    }
  }, [user, navigate]);

  if (user) return null;
  return <RoleSelect />;
};

export default Index;
