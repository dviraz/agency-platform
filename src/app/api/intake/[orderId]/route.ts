import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use service role for server-side operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
    const body = await request.json();

    // Remove fields that shouldn't be updated directly
    const { id, order_id, user_id, created_at, ...updateData } = body;

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
