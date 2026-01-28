import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { CertificateProvider } from "@/context/CertificateContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StudentVerify from "./pages/StudentVerify";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UploadCertificates from "./pages/admin/UploadCertificates";
import CertificateDesigner from "./pages/admin/CertificateDesigner";
import AllocateCertificates from "./pages/admin/AllocateCertificates";
import ProtectedRoute from "./components/ProtectedRoute";
// Layout
import { AdminLayout } from "@/components/layout/AdminLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CertificateProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/verify" element={<StudentVerify />} />
              
              {/* Auth Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/register" element={<AdminRegister />} />
              
              {/* Admin Routes (Protected) */}
             <Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  }
>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="upload" element={<UploadCertificates />} />
                <Route path="design" element={<CertificateDesigner />} />
                <Route path="allocate" element={<AllocateCertificates />} />
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CertificateProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
