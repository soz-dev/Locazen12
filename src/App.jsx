import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from '@/pages/PageNotFound';
import ScrollToTop from '@/components/ScrollToTop';
import Home from '@/pages/Home';
import Admin from '@/pages/Admin';

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/locazen-admin" element={
            sessionStorage.getItem("locazen_admin") === "true"
              ? <Admin />
              : <Navigate to="/" replace />
          } />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App
