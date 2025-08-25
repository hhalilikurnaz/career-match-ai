"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../contexts/auth-context"
import { useLanguage } from "../contexts/language-context"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Alert, AlertDescription } from "../components/ui/alert"
import { Loader2, LogIn, ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        navigate("/enhance")
      } else {
        setError("Geçersiz email veya şifre")
      }
    } catch (err) {
      setError("Giriş yapılırken bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-professor-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-professor-blue-700 hover:text-professor-blue-800 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Ana Sayfaya Dön
          </Link>
        </div>

        <Card className="shadow-xl border-professor-gray-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-professor-gray-900">Giriş Yap</CardTitle>
            <CardDescription className="text-professor-gray-600">CareerMatchAI hesabınıza giriş yapın</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-professor-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-professor-gray-300 focus:border-professor-blue-500"
                  placeholder="ornek@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-professor-gray-700">
                  Şifre
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-professor-gray-300 focus:border-professor-blue-500"
                  placeholder="••••••••"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-professor-blue-700 hover:bg-professor-blue-800 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Giriş yapılıyor...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    {t("loginButton")}
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-professor-gray-600">
                Hesabınız yok mu?{" "}
                <Link to="/register" className="text-professor-blue-700 hover:text-professor-blue-800 font-medium">
                  Hesap oluşturun
                </Link>
              </p>
            </div>

            <div className="mt-6 p-4 bg-professor-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-professor-blue-900 mb-2">Demo Hesap Bilgileri:</h3>
              <p className="text-sm text-professor-blue-700">
                Email: test@example.com
                <br />
                Şifre: user123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
