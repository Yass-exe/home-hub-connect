import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Wrench } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const RoleSelect = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl space-y-8 text-center"
      >
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Home<span className="text-primary">Chores</span>
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">Your trusted marketplace for home services</p>
        </div>

        <div>
          <p className="mb-6 text-xl font-semibold text-foreground">Continue as:</p>
          <div className="grid gap-6 sm:grid-cols-2">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Card
                className="cursor-pointer border-2 border-transparent transition-colors hover:border-primary hover:shadow-lg"
                onClick={() => navigate('/register/user')}
              >
                <CardContent className="flex flex-col items-center gap-4 p-8">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">User</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Find and hire trusted workers</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Card
                className="cursor-pointer border-2 border-transparent transition-colors hover:border-accent hover:shadow-lg"
                onClick={() => navigate('/register/worker')}
              >
                <CardContent className="flex flex-col items-center gap-4 p-8">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/10">
                    <Wrench className="h-10 w-10 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Worker</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Offer your professional services</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="font-semibold text-primary hover:underline">
            Sign in
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default RoleSelect;
