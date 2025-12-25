import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  FolderKanban,
  Receipt,
  Clock,
  ArrowRight,
  TrendingUp,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'

const statusColors: Record<string, string> = {
  not_started: 'bg-gray-500',
  discovery: 'bg-blue-500',
  in_progress: 'bg-yellow-500',
  review: 'bg-purple-500',
  revisions: 'bg-orange-500',
  completed: 'bg-green-500',
  on_hold: 'bg-red-500',
  cancelled: 'bg-gray-500',
}

const statusLabels: Record<string, string> = {
  not_started: 'Not Started',
  discovery: 'Discovery',
  in_progress: 'In Progress',
  review: 'Under Review',
  revisions: 'Revisions',
  completed: 'Completed',
  on_hold: 'On Hold',
  cancelled: 'Cancelled',
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  // Get stats
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

  const { data: pendingIntakes } = await supabase
    .from('intake_forms')
    .select('*, orders(id)')
    .eq('user_id', user?.id)
    .eq('is_completed', false)

  const activeProjects = projects?.filter(p =>
    ['discovery', 'in_progress', 'review', 'revisions'].includes(p.status)
  ) || []

  const completedProjects = projects?.filter(p => p.status === 'completed') || []

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here&apos;s an overview of your projects.</p>
      </div>

      {/* Pending intake forms alert */}
      {pendingIntakes && pendingIntakes.length > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex items-start gap-4">
          <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-medium text-yellow-500">Action Required</h3>
            <p className="text-sm text-muted-foreground mt-1">
              You have {pendingIntakes.length} pending intake form{pendingIntakes.length > 1 ? 's' : ''} to complete.
            </p>
          </div>
          <Button size="sm" asChild>
            <Link href={`/intake/${pendingIntakes[0].order_id}`}>
              Complete Form
            </Link>
          </Button>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Projects
            </CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedProjects.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Projects delivered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              All time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Investment
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${orders?.reduce((sum, o) => sum + (o.amount_usd || 0), 0).toLocaleString() || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              USD total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Active Projects</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/projects">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {activeProjects.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FolderKanban className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium mb-2">No active projects</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Get started by purchasing a service to begin your first project.
              </p>
              <Button asChild>
                <Link href="/#services">Browse Services</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeProjects.slice(0, 3).map((project) => (
              <Card key={project.id} className="hover:border-white/20 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{project.project_name}</CardTitle>
                    <Badge
                      variant="secondary"
                      className={`${statusColors[project.status]} text-white`}
                    >
                      {statusLabels[project.status]}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {project.description || 'No description'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span>{project.progress_percentage}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                        style={{ width: `${project.progress_percentage}%` }}
                      />
                    </div>
                  </div>

                  {project.estimated_completion_date && (
                    <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Est. completion: {new Date(project.estimated_completion_date).toLocaleDateString()}</span>
                    </div>
                  )}

                  <Button variant="ghost" size="sm" className="mt-4 w-full" asChild>
                    <Link href={`/dashboard/projects/${project.id}`}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Recent orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/orders">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {!orders || orders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Receipt className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium mb-2">No orders yet</h3>
              <p className="text-sm text-muted-foreground text-center">
                Your order history will appear here.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium">{order.product_id}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${order.amount_usd?.toLocaleString()}</p>
                      <Badge
                        variant="secondary"
                        className={
                          order.status === 'payment_completed'
                            ? 'bg-green-500/20 text-green-500'
                            : order.status === 'payment_failed'
                            ? 'bg-red-500/20 text-red-500'
                            : 'bg-yellow-500/20 text-yellow-500'
                        }
                      >
                        {order.status?.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
