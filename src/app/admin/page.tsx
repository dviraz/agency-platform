import { createAdminClient } from '@/lib/supabase/admin'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FolderKanban, Receipt, TrendingUp } from 'lucide-react'
import { Order, Project } from '@/types/database'

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin overview for revenue, projects, and orders.',
}

export default async function AdminPage() {
  const supabase = createAdminClient()

  const { data: orders } = await supabase
    .from('orders')
    .select('amount_usd, status')

  const { data: projects } = await supabase
    .from('projects')
    .select('status')

  const totalRevenue = ((orders as unknown as Order[]) || [])
    .filter((order) => order.status === 'payment_completed')
    .reduce((sum: number, order) => sum + (order.amount_usd || 0), 0)

  const activeProjects = ((projects as unknown as Project[]) || []).filter((project) =>
    ['discovery', 'in_progress', 'review', 'revisions'].includes(project.status as string)
  )

  const pendingOrders = ((orders as unknown as Order[]) || []).filter((order) =>
    ['pending', 'payment_processing'].includes(order.status as string)
  )

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Overview</h1>
        <p className="text-muted-foreground mt-1">
          Monitor revenue, project delivery, and order volume.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Completed payments
            </p>
          </CardContent>
        </Card>

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
              In progress or under review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Orders
            </CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting payment or processing
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
