'use client'

import { useState } from 'react'
import { useAuth } from '../contexts/auth-context'
import { useLanguage } from '../contexts/language-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Navbar } from '../components/navbar'
import { useRouter } from 'next/navigation'
import { LogIn } from 'lucide-react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (login(username, password)) {
      router.push('/enhance')
    } else {
      setError(t('invalidCredentials'))
    }
  }

  return (
    <div className="min-h-screen bg-professor-gray-50">
      <Navbar />
      
      <main className="max-w-md mx-auto px-4 py-12">
        <Card className="border-professor-gray-200 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-professor-blue-700 rounded-full">
                <LogIn className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-professor-gray-900">{t('login')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-professor-gray-700">{t('username')}</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="testuser"
                  required
                  className="border-professor-gray-300 focus:border-professor-blue-500"
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="text-professor-gray-700">{t('password')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="123456"
                  required
                  className="border-professor-gray-300 focus:border-professor-blue-500"
                />
              </div>
              
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <Button type="submit" className="w-full bg-professor-blue-700 hover:bg-professor-blue-800 text-white shadow-md">
                {t('loginButton')}
              </Button>
            </form>
            
            <div className="mt-4 p-3 bg-professor-gray-100 rounded-lg text-sm text-professor-gray-600 border border-professor-gray-200">
              <p><strong>{t('demoCredentials')}:</strong></p>
              <p>Username: testuser</p>
              <p>Password: 123456</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
