import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Receipt, ArrowRight, ExternalLink } from 'lucide-react'

const statusColors: Record<string, string> = {
  pending: 'bg-gray-500/20 text-gray-400',
  payment_processing: 'bg-yellow-500/20 text-yellow-500',
  payment_completed: 'bg-green-500/20 text-green-500',
  payment_failed: 'bg-red-500/20 text-red-500',
  intake_pending: 'bg-blue-500/20 text-blue-400',
  intake_completed: 'bg-cyan-500/20 text-cyan-400',
  in_progress: 'bg-purple-500/20 text-purple-400',
  completed: 'bg-green-500/20 text-green-500',
  cancelled: 'bg-red-500/20 text-red-400',
}

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  payment_processing: 'Processing',
  payment_completed: 'Paid',
  payment_failed: 'Failed',
  intake_pending: 'Intake Pending',
  intake_completed: 'Intake Done',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

export const metadata = {
  title: 'Orders',
  description: 'View your order history',
}

export default async function OrdersPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground mt-1">View your order history and receipts.</p>
      </div>

      {/* Orders list */}
      {!orders || orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Receipt className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No orders yet</h3>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              Your order history will appear here after you make a purchase.
            </p>
            <Button asChild>
              <Link href="/#services">Browse Services</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {orders.map((order) => (
                <div key={order.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{order.product_id}</h3>
                        <Badge variant="secondary" className={statusColors[order.status]}>
                          {statusLabels[order.status]}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Order ID: {order.id}</p>
                        <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
                        {order.paypal_order_id && (
                          <p>PayPal ID: {order.paypal_order_id}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        ${order.amount_usd?.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">USD</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5">
                    {order.status === 'intake_pending' && (
                      <Button size="sm" asChild>
                        <Link href={`/intake/${order.id}`}>
                          Complete Intake Form
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    {order.paypal_order_id && (
                      <Button variant="ghost" size="sm" asChild>
                        <a
                          href={`https://www.paypal.com/activity/payment/${order.paypal_order_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Receipt
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
