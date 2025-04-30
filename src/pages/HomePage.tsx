import { Button } from '@/components/ui/Button';
import { MainLayout } from '@/components/layout/MainLayout';

export function HomePage() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-3xl py-8 text-center">
        <h1 className="mb-6 text-4xl font-bold text-slate-900 dark:text-white">Welcome to ./</h1>
        
        <p className="mb-8 text-lg text-slate-700 dark:text-slate-300">
          This project has used a starter template for your new React project with TypeScript and Tailwind CSS.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" size="lg">
            Get Started
          </Button>
          
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <FeatureCard
            title="Feature One"
            description="Description of your amazing feature and what it does for users."
          />
          
          <FeatureCard
            title="Feature Two"
            description="Another great feature that makes your application special."
          />
          
          <FeatureCard
            title="Feature Three"
            description="One more feature to complete the trio of awesome functionality."
          />
        </div>
      </div>
    </MainLayout>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  );
}