import { revalidatePath } from 'next/cache'
import { createAdminClient, verifyAdminRole } from '@/lib/supabase/admin'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

const orderStatuses = [
  'pending',
  'payment_processing',
  'payment_completed',
  'payment_failed',
  'intake_pending',
  'intake_completed',
  'in_progress',
  'completed',
  'cancelled',
] as const

export const metadata = {
  title: 'Admin Orders',
  description: 'Manage orders and update statuses.',
}

async function updateOrderStatus(formData: FormData) {
  'use server'

  // Verify admin role before proceeding
  await verifyAdminRole()

  const orderId = formData.get('orderId')?.toString()
  const status = formData.get('status')?.toString()

  if (!orderId || !status) return

  const supabase = createAdminClient()

  await supabase
    .from('orders')
    // @ts-ignore - Supabase generated types are overly restrictive for dynamic status updates
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', orderId)

  revalidatePath('/admin/orders')
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: { status?: string }
}) {
  const statusFilter = searchParams.status ?? 'all'
  const supabase = createAdminClient()

  let ordersQuery = supabase
    .from('orders')
    .select('id, created_at, status, amount_usd, product_id, user_id')
    .order('created_at', { ascending: false })

  if (statusFilter !== 'all') {
    ordersQuery = ordersQuery.eq('status', statusFilter)
  }

  const { data: orders } = await ordersQuery

  // @ts-ignore - Supabase type inference issue
  const userIds = Array.from(new Set((orders || []).map((order) => order.user_id)))
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name, email')
    .in('id', userIds.length ? userIds : ['00000000-0000-0000-0000-000000000000'])

  const profileMap = new Map(
    // @ts-ignore - Supabase type inference issue
    (profiles || []).map((profile) => [profile.id, profile])
  )

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Order Management</h1>
        <p className="text-muted-foreground mt-1">
          Review all orders and update payment or fulfillment status.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form method="get" className="flex flex-wrap items-end gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Filter by status</Label>
              <select
                id="status"
                name="status"
                defaultValue={statusFilter}
                aria-label="Filter orders by status"
                className="h-9 w-48 rounded-md border border-white/10 bg-transparent px-3 text-sm text-foreground"
              >
                <option value="all">All statuses</option>
                {orderStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit" variant="secondary">
              Apply
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {(orders || []).map((order: any) => {
          const profile: any = profileMap.get(order.user_id)
          return (
            <Card key={order.id}>
              <CardContent className="p-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-mono text-sm">{order.id}</p>
                  <p className="mt-3 text-sm text-muted-foreground">Customer</p>
                  <p className="text-sm">
                    {profile?.full_name || profile?.email || order.user_id}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">Product</p>
                  <p className="text-sm">{order.product_id}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="text-lg font-semibold">${order.amount_usd?.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
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
                    {order.status.replace(/_/g, ' ')}
                  </Badge>
                </div>

                <form action={updateOrderStatus} className="flex flex-col gap-2">
                  <input type="hidden" name="orderId" value={order.id} />
                  <Label htmlFor={`status-${order.id}`}>Update status</Label>
                  <select
                    id={`status-${order.id}`}
                    name="status"
                    defaultValue={order.status}
                    aria-label="Update order status"
                    className="h-9 w-52 rounded-md border border-white/10 bg-transparent px-3 text-sm text-foreground"
                  >
                    {orderStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                  <Button type="submit" size="sm">
                    Save
                  </Button>
                </form>
              </CardContent>
            </Card>
          )
        })}
        {!orders?.length && (
          <Card>
            <CardContent className="p-10 text-center text-muted-foreground">
              No orders match this filter.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
