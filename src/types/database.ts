export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type ProductCategory =
  | 'service_tier'
  | 'advertising'
  | 'seo'
  | 'social_media'
  | 'web_development'
  | 'branding'

export type OrderStatus =
  | 'pending'
  | 'payment_processing'
  | 'payment_completed'
  | 'payment_failed'
  | 'intake_pending'
  | 'intake_completed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'

export type ProjectStatus =
  | 'not_started'
  | 'discovery'
  | 'in_progress'
  | 'review'
  | 'revisions'
  | 'completed'
  | 'on_hold'
  | 'cancelled'

export type UserRole = 'client' | 'admin'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  company_name: string | null
  phone: string | null
  role: UserRole
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  category: ProductCategory
  price_usd: number
  features: Json
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  product_id: string
  paypal_order_id: string | null
  paypal_capture_id: string | null
  amount_usd: number
  payment_status: string | null
  payment_completed_at: string | null
  status: OrderStatus
  created_at: string
  updated_at: string
  deleted_at: string | null
  // Joined data
  product?: Product
  profile?: Profile
}

export interface IntakeForm {
  id: string
  order_id: string
  user_id: string
  // Basic Info (Step 1)
  business_name: string | null
  industry: string | null
  website_url: string | null
  contact_person: string | null
  contact_email: string | null
  contact_phone: string | null
  // Project Details (Step 2)
  project_goals: string | null
  project_description: string | null
  key_requirements: Json
  competitors: Json
  // Target Audience (Step 3)
  target_audience: string | null
  geographic_focus: string | null
  age_range: string | null
  customer_pain_points: string | null
  // Timeline & Budget (Step 4)
  desired_start_date: string | null
  deadline: string | null
  budget_expectations: string | null
  additional_notes: string | null
  // Metadata
  is_completed: boolean
  current_step: number
  completed_at: string | null
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  order_id: string
  user_id: string
  project_name: string
  status: ProjectStatus
  progress_percentage: number
  started_at: string | null
  estimated_completion_date: string | null
  completed_at: string | null
  description: string | null
  deliverables: Json
  milestones: Json
  notes: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
  // Joined data
  order?: Order
  updates?: ProjectUpdate[]
}

export interface ProjectUpdate {
  id: string
  project_id: string
  title: string
  description: string | null
  update_type: 'milestone' | 'status_change' | 'general' | 'revision_request' | null
  created_by_admin: boolean
  created_at: string
}

// Database helper types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at' | 'updated_at'>
        Update: Partial<Omit<Profile, 'id'>>
      }
      products: {
        Row: Product
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Product, 'id'>>
      }
      orders: {
        Row: Order
        Insert: Omit<Order, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Order, 'id'>>
      }
      intake_forms: {
        Row: IntakeForm
        Insert: Omit<IntakeForm, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<IntakeForm, 'id'>>
      }
      projects: {
        Row: Project
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Project, 'id'>>
      }
      project_updates: {
        Row: ProjectUpdate
        Insert: Omit<ProjectUpdate, 'id' | 'created_at'>
        Update: Partial<Omit<ProjectUpdate, 'id'>>
      }
    }
  }
}
