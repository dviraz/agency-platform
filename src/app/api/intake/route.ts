import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/lib/supabase/server';

// Use service role for server-side operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * POST /api/intake
 * Create a new intake form (usually done automatically after payment)
 */
export async function POST(request: NextRequest) {
  try {
    // Verify authenticated user
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { order_id } = body;

    // Use authenticated user's ID, not from request body
    const user_id = user.id;

    if (!order_id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify the order belongs to the authenticated user
    const { data: order } = await supabaseAdmin
      .from('orders')
      .select('user_id')
      .eq('id', order_id)
      .single();

    if (!order || order.user_id !== user_id) {
      return NextResponse.json(
        { error: 'Order not found or does not belong to user' },
        { status: 403 }
      );
    }

    // Check if intake form already exists
    const { data: existing } = await supabaseAdmin
      .from('intake_forms')
      .select('id')
      .eq('order_id', order_id)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Intake form already exists', id: existing.id },
        { status: 400 }
      );
    }

    // Get user profile for default values
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('email, full_name, company_name, phone')
      .eq('id', user_id)
      .single();

    // Create intake form
    const { data, error } = await supabaseAdmin
      .from('intake_forms')
      .insert({
        order_id,
        user_id,
        contact_email: profile?.email,
        contact_person: profile?.full_name,
        business_name: profile?.company_name,
        contact_phone: profile?.phone,
        current_step: 1,
        is_completed: false,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating intake form:', error);
      return NextResponse.json(
        { error: 'Failed to create intake form' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error('Intake form creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
