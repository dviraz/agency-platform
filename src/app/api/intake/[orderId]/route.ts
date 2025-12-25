import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/lib/supabase/server';

// Use service role for server-side operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Helper to verify user owns the order
 */
async function verifyOrderOwnership(orderId: string) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Unauthorized', status: 401 };
  }

  // Check if user is admin or owns the order
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  const isAdmin = profile?.role === 'admin';

  const { data: order } = await supabaseAdmin
    .from('orders')
    .select('user_id')
    .eq('id', orderId)
    .single();

  if (!order) {
    return { error: 'Order not found', status: 404 };
  }

  if (!isAdmin && order.user_id !== user.id) {
    return { error: 'Forbidden', status: 403 };
  }

  return { userId: user.id, isAdmin };
}

/**
 * GET /api/intake/[orderId]
 * Get intake form by order ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;

    // Verify ownership
    const authResult = await verifyOrderOwnership(orderId);
    if ('error' in authResult) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('intake_forms')
      .select('*')
      .eq('order_id', orderId)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Intake form not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching intake form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/intake/[orderId]
 * Update intake form (auto-save functionality)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;

    // Verify ownership before allowing update
    const authResult = await verifyOrderOwnership(orderId);
    if ('error' in authResult) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const body = await request.json();

    // Remove fields that shouldn't be updated directly
    const updateData = { ...body };
    delete updateData.id;
    delete updateData.order_id;
    delete updateData.user_id;
    delete updateData.created_at;

    // Always update the timestamp
    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from('intake_forms')
      .update(updateData)
      .eq('order_id', orderId)
      .select()
      .single();

    if (error) {
      console.error('Error updating intake form:', error);
      return NextResponse.json(
        { error: 'Failed to update intake form' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Intake form update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
