import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/auth-context"
import { LanguageProvider } from "./contexts/language-context"
import { Toaster } from "./components/ui/toaster"
import { ProtectedRoute } from "./components/ProtectedRoute"

// Pages
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import EnhancePage from "./pages/EnhancePage"
import CompatibilityPage from "./pages/CompatibilityPage"
import AssistantPage from "./pages/AssistantPage"

// Layout
import Layout from "./components/Layout"

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route
                path="enhance"
                element={
                  <ProtectedRoute>
                    <EnhancePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="compatibility"
                element={
                  <ProtectedRoute>
                    <CompatibilityPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="assistant"
                element={
                  <ProtectedRoute>
                    <AssistantPage />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
          <Toaster />
        </div>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App
