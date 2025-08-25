'use client'

import { useAuth } from '@/app/contexts/auth-context'
import { useLanguage } from '@/app/contexts/language-context'
import { Button } from '@/components/ui/button'
import { LogOut, User } from 'lucide-react'
import Link from 'next/link'

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const { t } = useLanguage()

  return (
    <nav className="border-b border-professor-gray-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-professor-blue-700 to-professor-gold-600 bg-clip-text text-transparent">
            CareerMatchAI
          </Link>

          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm text-professor-gray-600">
                  <User className="h-4 w-4" />
                  {user.username}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="flex items-center gap-1 border-professor-gray-300 text-professor-gray-700 hover:bg-professor-gray-100"
                >
                  <LogOut className="h-4 w-4" />
                  {t('logout')}
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-professor-gray-300 text-professor-gray-700 hover:bg-professor-gray-100"
              >
                <Link href="/login">{t('login')}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
