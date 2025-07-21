import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContexts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import LoginRedirect from "./pages/LoginRedirect";
import Unauthorized from "./pages/Unauthorized";
import DeveloperDashboard from "./pages/DashboardDeveloper";
import AnalystDashboard from "./pages/DashboardAnalyst";
import TesterDashboard from "./pages/DashboardTester";
import ProductOwnerDashboard from "./pages/DashboardPO";
import RoleBasedRoute from "./components/RoleBasedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login-redirect" element={<LoginRedirect />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* 👇 Yetki korumalı rotalar */}
            <Route
              path="/dashboard/developer"
              element={
                <RoleBasedRoute allowedRoles={["developer"]}>
                  <DeveloperDashboard />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/dashboard/analyst"
              element={
                <RoleBasedRoute allowedRoles={["analyst"]}>
                  <AnalystDashboard />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/dashboard/tester"
              element={
                <RoleBasedRoute allowedRoles={["tester"]}>
                  <TesterDashboard />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/dashboard/po"
              element={
                <RoleBasedRoute allowedRoles={["product_owner"]}>
                  <ProductOwnerDashboard />
                </RoleBasedRoute>
              }
            />

            {/* Yakalanmayan route varsa */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
