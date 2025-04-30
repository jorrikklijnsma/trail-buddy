import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <header className="border-b border-slate-200 bg-white p-4 shadow dark:border-slate-700 dark:bg-slate-800 dark:text-white">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold">./</h1>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        {children}
      </main>
      
      <footer className="grow-1 border-t border-slate-200 bg-white p-4 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
        <div className="container mx-auto">
          © {new Date().getFullYear()} Your Project. All rights reserved.
        </div>
      </footer>
    </div>
  );
}