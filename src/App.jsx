import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from './sections';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './utils/ScrollToTop';
import { CurrencyProvider } from './contexts/CurrencyContext';

const App = () => {
  return (
    <CurrencyProvider>
      <div className="min-h-screen bg-background text-text font-sans">
        <ScrollToTop />
        <header>
          <Navbar />
        </header>

        <main>
          {/* This component will render all the toast notifications */}
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
          <Outlet />
        </main>

        <Footer />
      </div>
    </CurrencyProvider>
  );
};

export default App;