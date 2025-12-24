import Link from 'next/link'
import { redirect } from 'next/navigation'
import {
  LayoutDashboard,
  FolderKanban,
  Receipt,
  LogOut,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const navigation = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Orders', href: '/admin/orders', icon: Receipt },
  { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?redirectTo=/admin')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect('/dashboard')
  }

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : user.email?.[0].toUpperCase() || 'A'

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-white/10 lg:bg-card/30">
          <div className="flex h-16 items-center gap-2 px-6">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="font-bold text-white text-sm">A</span>
            </div>
            <span className="font-semibold text-lg">Admin</span>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-1" aria-label="Admin">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">{profile?.full_name || 'Admin'}</p>
                <p className="text-xs text-muted-foreground">{profile?.email || user.email}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="mt-3 w-full" asChild>
              <Link href="/auth/signout">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Link>
            </Button>
          </div>
        </aside>

        <div className="flex-1">
          <header className="sticky top-0 z-40 border-b border-white/10 bg-background/80 backdrop-blur-xl">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">Admin Dashboard</span>
              </div>
              <div className="flex items-center gap-3 lg:hidden">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth/signout">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Link>
                </Button>
              </div>
            </div>
            <nav className="flex gap-2 px-6 pb-4 lg:hidden" aria-label="Admin">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                >
                  <item.icon className="h-3 w-3" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </header>

          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
