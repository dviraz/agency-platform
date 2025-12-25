import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

/**
 * GET /api/projects/[id]
 * Get project details by project ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params;
    const cookieStore = await cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    // Create Supabase client with user's session
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: {
          cookie: cookieStore.toString(),
        },
      },
    });

    // Get project with related data
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        order:orders!inner(
          id,
          amount_usd,
          product:products(
            id,
            name,
            category
          )
        ),
        project_updates(
          id,
          title,
          description,
          update_type,
          created_at
        )
      `)
      .eq('id', projectId)
      .order('created_at', { foreignTable: 'project_updates', ascending: false })
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/projects/[id]
 * Update project details (admin only in production, but flexible for now)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    // Use service role for updates (in production, verify admin role first)
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const body = await request.json();

    // Remove fields that shouldn't be updated directly
    const updateData = { ...body };
    delete updateData.id;
    delete updateData.order_id;
    delete updateData.user_id;
    delete updateData.created_at;

    // Always update the timestamp
    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('projects')
      .update(updateData)
      .eq('id', projectId)
      .select()
      .single();

    if (error) {
      console.error('Error updating project:', error);
      return NextResponse.json(
        { error: 'Failed to update project' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Project update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
