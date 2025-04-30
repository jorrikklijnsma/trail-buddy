import { TrailProvider } from './context/TrailContext';
import TrailStatus from './components/TrailStatus/TrailStatus';

function App() {
  return (
    <TrailProvider>
      <div className="flex min-h-screen flex-col bg-gray-100">
        <header className="bg-blue-800 py-6 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">TrailBuddy</h1>
            <p className="text-blue-100">Your trail companion for the perfect hiking experience</p>
          </div>
        </header>

        <main className="container mx-auto flex-grow px-4 py-8">
          <TrailStatus />
        </main>

        <footer className="bg-gray-200 py-4 text-center text-sm text-gray-600">
          <p>© 2025 Jorrik Klijnsma - Demo about AI Refactoring </p>
        </footer>
      </div>
    </TrailProvider>
  );
}

export default App;
