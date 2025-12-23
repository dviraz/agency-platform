# Next.js Agency Platform - Complete Implementation Guide

## 📝 Original Requirements

### What You Asked For:
> "Build a full-stack Next.js agency platform. It needs a landing page with 3 service tiers. Use Supabase for Auth and to store order data. Integrate PayPal so clients can pay in USD. After payment, redirect them to a multi-step intake form. Finally, create a private dashboard where the client can log in to see the status of their marketing project. Make the design look like a high-end Silicon Valley agency."

### Your Configuration Choices:

**1. Service Tiers & Products**
- ✅ **Base Service Tiers**: Starter ($2,500), Growth ($7,500), Enterprise ($15,000)
- ✅ **Custom Products**: Google Ads, Facebook/Instagram Ads, SEO services (each with different price points)
- Rationale: Flexibility to offer both package deals and à la carte services

**2. Technology Stack**
- ✅ **Next.js App Router** (Modern Next.js 13+ with React Server Components)
- ✅ **TypeScript** (Type safety and better developer experience)
- Rationale: Latest features, better performance, fewer bugs

**3. Services Offered**
Your agency will offer:
- ✅ Social Media Marketing
- ✅ SEO & Content Marketing
- ✅ Web Design & Development
- ✅ Branding & Design
- ✅ Google Ads campaigns
- ✅ Facebook/Instagram Ads

### Core User Flow:
1. **Landing Page** → Client browses services
2. **Service Selection** → Choose tier or custom product
3. **PayPal Payment** → Pay in USD
4. **Multi-Step Intake Form** → Gather project details (auto-save)
5. **Client Dashboard** → View project status, timeline, updates

---

## 🎯 Project Overview

Building a premium full-stack agency platform with:
- **Frontend**: Next.js 14+ with App Router, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Authentication)
- **Payments**: PayPal integration for USD transactions
- **Design**: High-end Silicon Valley aesthetic

### Service Offerings
**Service Tiers:**
- Starter - $2,500
- Growth - $7,500
- Enterprise - $15,000

**Custom Products:**
- Google Ads campaigns
- Facebook/Instagram Ads
- SEO services
- Social Media Marketing
- Web Design & Development
- Branding & Design

---

## 📋 Prerequisites

### Required Software
- Node.js 18+ (check with `node --version`)
- npm 9+ (check with `npm --version`)
- Git
- Code editor (VS Code recommended)

### Required Accounts
1. **Supabase Account** - https://supabase.com (free tier available)
2. **PayPal Developer Account** - https://developer.paypal.com (for sandbox testing)
3. **Vercel Account** - https://vercel.com (for deployment, optional)

---

## 🚀 Phase 1: Project Setup

### Step 1.1: Initialize Next.js Project

```bash
# Navigate to your project directory
cd "C:\Users\Dvir\Projects\New Site"

# Initialize Next.js with TypeScript and Tailwind
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
```

Answer the prompts:
- ✅ TypeScript
- ✅ ESLint
- ✅ Tailwind CSS
- ✅ `src/` directory
- ✅ App Router
- ✅ Import alias (@/*)

### Step 1.2: Install Dependencies

```bash
# Supabase
npm install @supabase/supabase-js @supabase/ssr

# PayPal
npm install @paypal/react-paypal-js @paypal/checkout-server-sdk

# UI & Utilities
npm install clsx tailwind-merge framer-motion lucide-react

# Form Handling
npm install react-hook-form zod @hookform/resolvers

# Email & Notifications (Hostinger SMTP)
npm install nodemailer
npm install -D @types/nodemailer

# Date Utilities
npm install date-fns

# Tailwind Plugins
npm install -D @tailwindcss/forms @tailwindcss/typography

# Initialize shadcn/ui
npx shadcn-ui@latest init
```

### Step 1.3: Create Environment Variables

Create `.env.local` in the root directory:

```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase (get these from your Supabase project settings)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# PayPal (get these from PayPal Developer Dashboard)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AYxxxxxxxxxxx
PAYPAL_CLIENT_SECRET=ELxxxxxxxxxxx
PAYPAL_MODE=sandbox

# Email (Hostinger SMTP)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=your-email@yourdomain.com
SMTP_PASSWORD=your-password
EMAIL_FROM="Agency Name <your-email@yourdomain.com>"
```

Create `.env.example` for documentation:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_CLIENT_SECRET=your_paypal_client_secret_here
PAYPAL_MODE=sandbox

# Email (Hostinger SMTP)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=your-email@yourdomain.com
SMTP_PASSWORD=your-password
EMAIL_FROM="Agency Name <your-email@yourdomain.com>"
```

Update `.gitignore`:

```gitignore
# Environment variables
.env.local
.env.production.local
.env.development.local
.env.test.local
```

### Step 1.4: Configure Tailwind CSS

Update `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cal-sans)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

export default config
```

Update `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 10%;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --background: 0 0% 10%;
      --foreground: 0 0% 98%;
    }
  }

  body {
    @apply bg-neutral-50 text-neutral-900 antialiased;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

---

## 🏗️ Phase 1.5: Core UI & Shared Logic

### Step 1.5.1: Setup shadcn/ui Components
Install essential components for the "Silicon Valley" look:
```bash
npx shadcn-ui@latest add button card input label dialog tabs toast skeleton
```

### Step 1.5.2: Shared Validations (Zod)
Create `src/lib/validations/index.ts` to share schemas between client and server:
- `ProfileSchema`
- `OrderSchema`
- `IntakeFormSchema`

### Step 1.5.3: Global Middleware
Create `src/middleware.ts` to handle:
- Auth session refreshing
- Protected route redirects (`/dashboard`, `/checkout`, `/intake`)
- Admin-only route protection (`/admin`)

### Step 1.5.4: Email Utility (Nodemailer)
Create `src/lib/email.ts` to handle transactional emails via Hostinger SMTP:
```typescript
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});
```

---

## 🗄️ Phase 2: Supabase Setup

### Step 2.1: Create Supabase Project

1. Go to https://supabase.com
2. Click "New Project"
3. Choose organization (or create one)
4. Enter project details:
   - Name: "agency-platform"
   - Database Password: (save this securely)
   - Region: Choose closest to your users
5. Click "Create new project"
6. Wait 2-3 minutes for setup

### Step 2.2: Get Supabase Credentials

1. Go to Project Settings → API
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`
3. Update your `.env.local` file

### Step 2.3: Run Database Migrations

Go to Supabase Dashboard → SQL Editor → New Query

**Migration 1: Profiles Table**

```sql
-- Create profiles table that extends auth.users
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'client' CHECK (role IN ('client', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call function on user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

Click "Run" ✅

**Migration 2: Products Table**

```sql
-- Create product category enum
CREATE TYPE product_category AS ENUM (
  'service_tier',
  'advertising',
  'seo',
  'social_media',
  'web_development',
  'branding'
);

-- Create products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category product_category NOT NULL,
  price_usd DECIMAL(10, 2) NOT NULL,
  features JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public read access for active products
CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  USING (is_active = true);
```

Click "Run" ✅

**Migration 3: Orders Table**

```sql
-- Create order status enum
CREATE TYPE order_status AS ENUM (
  'pending',
  'payment_processing',
  'payment_completed',
  'payment_failed',
  'intake_pending',
  'intake_completed',
  'in_progress',
  'completed',
  'cancelled'
);

-- Create orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) NOT NULL,

  -- Payment details
  paypal_order_id TEXT UNIQUE,
  paypal_capture_id TEXT,
  amount_usd DECIMAL(10, 2) NOT NULL,
  payment_status TEXT,
  payment_completed_at TIMESTAMP WITH TIME ZONE,

  -- Order tracking
  status order_status DEFAULT 'pending',

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update orders"
  ON orders FOR UPDATE
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Indexes for performance
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_paypal_order_id ON orders(paypal_order_id);
```

Click "Run" ✅

**Migration 4: Intake Forms Table**

```sql
-- Create intake forms table
CREATE TABLE intake_forms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE UNIQUE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

  -- Basic Info (Step 1)
  business_name TEXT,
  industry TEXT,
  website_url TEXT,
  contact_person TEXT,
  contact_email TEXT,
  contact_phone TEXT,

  -- Project Details (Step 2)
  project_goals TEXT,
  project_description TEXT,
  key_requirements JSONB DEFAULT '[]'::jsonb,
  competitors JSONB DEFAULT '[]'::jsonb,

  -- Target Audience (Step 3)
  target_audience TEXT,
  geographic_focus TEXT,
  age_range TEXT,
  customer_pain_points TEXT,

  -- Timeline & Budget (Step 4)
  desired_start_date DATE,
  deadline DATE,
  budget_expectations TEXT,
  additional_notes TEXT,

  -- Metadata
  is_completed BOOLEAN DEFAULT false,
  current_step INTEGER DEFAULT 1,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE intake_forms ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own intake forms"
  ON intake_forms FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own intake forms"
  ON intake_forms FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own intake forms"
  ON intake_forms FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all intake forms"
  ON intake_forms FOR SELECT
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Index
CREATE INDEX idx_intake_forms_order_id ON intake_forms(order_id);
```

Click "Run" ✅

**Migration 5: Projects Table**

```sql
-- Create project status enum
CREATE TYPE project_status AS ENUM (
  'not_started',
  'discovery',
  'in_progress',
  'review',
  'revisions',
  'completed',
  'on_hold',
  'cancelled'
);

-- Create projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE UNIQUE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

  -- Project info
  project_name TEXT NOT NULL,
  status project_status DEFAULT 'not_started',
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),

  -- Timeline
  started_at TIMESTAMP WITH TIME ZONE,
  estimated_completion_date DATE,
  completed_at TIMESTAMP WITH TIME ZONE,

  -- Details
  description TEXT,
  deliverables JSONB DEFAULT '[]'::jsonb,
  milestones JSONB DEFAULT '[]'::jsonb,
  notes TEXT,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own projects"
  ON projects FOR SELECT
  USING (auth.uid() = user_id OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Indexes
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);

-- Project Updates/Timeline
CREATE TABLE project_updates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,

  title TEXT NOT NULL,
  description TEXT,
  update_type TEXT, -- 'milestone', 'status_change', 'general', 'revision_request'
  created_by_admin BOOLEAN DEFAULT true,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE project_updates ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view updates for their projects"
  ON project_updates FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_updates.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can create project updates"
  ON project_updates FOR INSERT
  WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Index
CREATE INDEX idx_project_updates_project_id ON project_updates(project_id);
```

Click "Run" ✅

**Migration 6: Storage Setup**

```sql
-- Create a bucket for client assets
INSERT INTO storage.buckets (id, name, public) VALUES ('client-assets', 'client-assets', false);

-- Policy: Users can upload their own assets
CREATE POLICY "Users can upload assets"
  ON storage.objects FOR INSERT
  WITH CHECK (auth.uid() = owner);

-- Policy: Users can view their own assets
CREATE POLICY "Users can view own assets"
  ON storage.objects FOR SELECT
  USING (auth.uid() = owner OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
```

Click "Run" ✅

### Step 2.4: Seed Products Data

```sql
-- Insert Service Tiers
INSERT INTO products (name, slug, description, category, price_usd, features) VALUES
('Starter', 'starter', 'Perfect for small businesses getting started', 'service_tier', 2500.00,
  '["Custom website design", "Up to 5 pages", "Mobile responsive", "Basic SEO optimization", "30 days support", "2 rounds of revisions"]'::jsonb),

('Growth', 'growth', 'Ideal for growing businesses ready to scale', 'service_tier', 7500.00,
  '["Everything in Starter", "Up to 15 pages", "Advanced SEO package", "Content management system", "E-commerce integration", "90 days support", "Unlimited revisions", "Social media setup"]'::jsonb),

('Enterprise', 'enterprise', 'Complete solution for established businesses', 'service_tier', 15000.00,
  '["Everything in Growth", "Unlimited pages", "Custom web application", "Advanced integrations", "Dedicated account manager", "1 year support", "Priority support", "Monthly strategy calls", "Performance optimization", "Security audit"]'::jsonb);

-- Insert Advertising Products
INSERT INTO products (name, slug, description, category, price_usd, features) VALUES
('Google Ads - Starter Campaign', 'google-ads-starter', 'Launch your first Google Ads campaign with professional setup', 'advertising', 1500.00,
  '["Campaign strategy & setup", "Keyword research (up to 50 keywords)", "Ad copywriting (5 ad variations)", "30 days management", "Weekly performance reports"]'::jsonb),

('Google Ads - Professional Campaign', 'google-ads-pro', 'Comprehensive Google Ads management for serious growth', 'advertising', 3500.00,
  '["Multi-campaign setup", "Advanced keyword research (200+ keywords)", "A/B testing & optimization", "90 days management", "Daily monitoring", "Conversion tracking setup", "Landing page recommendations"]'::jsonb),

('Facebook & Instagram Ads - Starter', 'meta-ads-starter', 'Get started with social media advertising on Meta platforms', 'advertising', 1200.00,
  '["Audience research & targeting", "Ad creative design (3 variations)", "Campaign setup & launch", "30 days management", "Bi-weekly reports"]'::jsonb),

('Facebook & Instagram Ads - Professional', 'meta-ads-pro', 'Advanced Meta advertising with retargeting and optimization', 'advertising', 3000.00,
  '["Everything in Starter", "Retargeting campaigns", "10+ ad creative variations", "Pixel setup & custom events", "90 days management", "A/B testing", "Lookalike audiences"]'::jsonb);

-- Insert SEO Products
INSERT INTO products (name, slug, description, category, price_usd, features) VALUES
('Local SEO Package', 'seo-local', 'Dominate local search results in your area', 'seo', 2000.00,
  '["Google Business Profile optimization", "Local keyword optimization", "Citation building (25 listings)", "Review management strategy", "On-page SEO (up to 10 pages)", "3 months support"]'::jsonb),

('National SEO Package', 'seo-national', 'Comprehensive SEO for nationwide visibility', 'seo', 5000.00,
  '["Complete technical SEO audit", "Keyword research (100+ keywords)", "On-page optimization (unlimited pages)", "Link building strategy", "Content optimization", "Competitor analysis", "6 months support", "Monthly ranking reports"]'::jsonb);

-- Insert Social Media Products
INSERT INTO products (name, slug, description, category, price_usd, features) VALUES
('Social Media Management - Basic', 'social-media-basic', 'Professional social media presence across 2 platforms', 'social_media', 1800.00,
  '["2 social platforms", "12 posts per month", "Content calendar", "Basic graphics design", "Community management", "Monthly analytics report"]'::jsonb),

('Social Media Management - Premium', 'social-media-premium', 'Comprehensive social media marketing across all platforms', 'social_media', 4000.00,
  '["4+ social platforms", "30 posts per month", "Advanced content strategy", "Professional graphics & video", "Influencer outreach", "Community management", "Paid social integration", "Weekly analytics reports"]'::jsonb);

-- Insert Web Development Products
INSERT INTO products (name, slug, description, category, price_usd, features) VALUES
('Custom Web Design', 'web-design-custom', 'Bespoke website design tailored to your brand', 'web_development', 5000.00,
  '["Custom design mockups", "Responsive development", "CMS integration", "Up to 20 pages", "Contact forms", "SEO ready", "60 days support", "Training session"]'::jsonb),

('Web Application Development', 'web-app-development', 'Custom web application built to your specifications', 'web_development', 12000.00,
  '["Custom functionality", "User authentication", "Database design", "API development", "Admin dashboard", "Testing & QA", "6 months support", "Scalable architecture"]'::jsonb);

-- Insert Branding Products
INSERT INTO products (name, slug, description, category, price_usd, features) VALUES
('Brand Identity - Starter', 'branding-starter', 'Essential branding package for new businesses', 'branding', 2500.00,
  '["Logo design (3 concepts)", "Color palette", "Typography selection", "Business card design", "Brand guidelines (basic)", "3 revisions", "Final files in all formats"]'::jsonb),

('Complete Brand Identity', 'branding-complete', 'Comprehensive branding for established businesses', 'branding', 6000.00,
  '["Logo design (5 concepts)", "Complete brand strategy", "Color & typography system", "Marketing collateral (business cards, letterhead, etc.)", "Social media templates", "Brand guidelines (comprehensive)", "Unlimited revisions", "Brand workshop session"]'::jsonb);
```

Click "Run" ✅

---

## 📁 Phase 3: Project Structure & Core Files

### Directory Structure

Create this folder structure in `src/`:

```
src/
├── app/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── landing/
│   ├── auth/
│   ├── checkout/
│   ├── intake/
│   └── dashboard/
├── lib/
│   ├── supabase/
│   ├── paypal/
│   ├── utils/
│   └── constants/
├── hooks/
└── types/
```

### Create Core Library Files

The implementation will include 40+ files. Here are the most critical ones to create first:

#### 1. `src/lib/utils/cn.ts`
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

#### 2. `src/lib/supabase/client.ts`
```typescript
import { createBrowserClient as createClient } from '@supabase/ssr'

export function createBrowserClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

#### 3. `src/lib/supabase/server.ts`
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle error
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle error
          }
        },
      },
    }
  )
}
```

Continue with the remaining 37+ files following the plan structure...

---

## 💳 Phase 7: PayPal Integration (CRITICAL)

### Step 7.1: Get PayPal Credentials

1. Go to https://developer.paypal.com
2. Log in (or create account)
3. Go to "Dashboard" → "My Apps & Credentials"
4. Under "Sandbox", click "Create App"
5. Name: "Agency Platform Sandbox"
6. Copy:
   - **Client ID** → `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
   - **Secret** → `PAYPAL_CLIENT_SECRET`
7. Update `.env.local`

### Key Payment Flow Files

The payment system requires these critical API routes:

- `src/app/api/paypal/create-order/route.ts`
- `src/app/api/paypal/capture-order/route.ts`
- `src/app/api/paypal/webhook/route.ts` (CRITICAL: For reliability)
- `src/app/checkout/[productId]/page.tsx`

### Reliability & Idempotency
- **Webhooks**: Listen for `PAYMENT.CAPTURE.COMPLETED` to update order status even if the user closes the browser.
- **Idempotency**: Use the PayPal Order ID as a unique key in the database to prevent duplicate project creation.
- **Email Confirmation**: Trigger a "Payment Received" email via **Nodemailer (Hostinger SMTP)** immediately after successful capture.

---

## 📈 Phase 8: SEO & Performance

### Step 8.1: Dynamic Metadata
- Implement `generateMetadata` in `src/app/services/[slug]/page.tsx` for SEO-optimized titles and descriptions.
- Set up `sitemap.ts` and `robots.ts`.

### Step 8.2: Performance Optimization
- Use `next/image` for all agency assets.
- Implement "Skeleton" loading states for the dashboard using shadcn/ui.
- Optimize font loading with `next/font`.

---

## 🎨 Design System

### Design Direction: Dark + Aceternity Effects
Inspired by: Linear, Vercel, Stripe, Raycast

### Color Palette (Dark Theme)
- **Background**: #0a0a0a (near black)
- **Surface**: #171717 (card backgrounds)
- **Border**: #262626 (subtle borders)
- **Primary**: #3b82f6 → #8b5cf6 (blue to purple gradient)
- **Accent**: #22d3ee (cyan glow effects)
- **Text Primary**: #fafafa (white)
- **Text Secondary**: #a1a1aa (muted)

### Typography
- **Headings**: Cal Sans or Inter (bold, large)
- **Body**: Inter (clean, readable)
- **Hero text**: 4xl-6xl with gradient effects

### Aceternity UI Components to Use
- **Spotlight** - Hero section hover effect
- **Meteors** - Background animation
- **Bento Grid** - Services layout
- **3D Card Effect** - Pricing cards
- **Text Generate Effect** - Hero headline
- **Moving Border** - CTA buttons
- **Background Beams** - Section dividers
- **Infinite Moving Cards** - Testimonials

### Animation Philosophy
- Subtle but impressive
- Performance-optimized (GPU accelerated)
- Trigger on scroll/hover
- 60fps smooth animations

### Key UI Patterns
- Large hero with animated background
- Bento grid for service showcase
- Glassmorphism cards with blur
- Gradient text for headlines
- Glowing buttons on hover
- Smooth page transitions

---

## ✅ IMPLEMENTATION STATUS

### Completed Components

#### ✅ Phase 1-6: Core Setup & Database
- [x] Next.js project initialized with TypeScript
- [x] All dependencies installed
- [x] Supabase database schema created
- [x] Products seeded into database
- [x] Authentication configured
- [x] Protected routes middleware implemented

#### ✅ Phase 7: PayPal Integration
- [x] `/api/paypal/create-order` - Creates PayPal order
- [x] `/api/paypal/capture-order` - Captures payment
- [x] `/api/paypal/webhook` - **CRITICAL: Handles webhook events for reliability**
  - Processes PAYMENT.CAPTURE.COMPLETED events
  - Updates order status even if user closes browser
  - Creates intake form automatically
  - Sends payment confirmation email via Hostinger SMTP

#### ✅ Phase 8: API Routes
- [x] `/api/intake` - Create new intake form
- [x] `/api/intake/[orderId]` - Get and update intake form (auto-save)
- [x] `/api/projects/[id]` - Get and update project details

#### ✅ Core Libraries & Utilities
- [x] Email utility with Nodemailer (Hostinger SMTP)
- [x] Payment confirmation email template
- [x] Project update email template
- [x] Supabase client/server setup
- [x] Middleware for auth protection

#### ✅ UI Components
- [x] Landing page with hero, services, process, CTA
- [x] Service tiers and products grid
- [x] Authentication forms (login/signup)
- [x] Checkout page with PayPal integration
- [x] Multi-step intake form with auto-save
- [x] Dashboard with projects and orders
- [x] Aceternity UI effects (spotlight, meteors, bento grid, etc.)

---

## 📋 NEXT STEPS TO GO LIVE

### 1. Environment Configuration
Create `.env.local` with all required variables:
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_secret
PAYPAL_MODE=sandbox
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=your-email@yourdomain.com
SMTP_PASSWORD=your-password
EMAIL_FROM="Agency Name <your-email@yourdomain.com>"
```

### 2. Run Database Migrations
Execute all SQL migrations from Phase 2 in your Supabase SQL Editor:
1. Profiles table + trigger
2. Products table
3. Orders table
4. Intake forms table
5. Projects table + project_updates table
6. Storage bucket setup
7. Seed products data

### 3. Configure PayPal Webhook
1. Go to PayPal Developer Dashboard
2. Navigate to your app → Webhooks
3. Add webhook URL: `https://yourdomain.com/api/paypal/webhook`
4. Subscribe to event: `PAYMENT.CAPTURE.COMPLETED`
5. Test with PayPal sandbox

### 4. Install Dependencies & Run
```bash
cd agency-platform
npm install
npm run dev
```

### 5. Test Complete Flow
- [ ] User can sign up and log in
- [ ] Products display on landing page
- [ ] Can select product and go to checkout
- [ ] PayPal payment works (sandbox)
- [ ] Webhook processes payment
- [ ] Email sent after payment
- [ ] Intake form created and accessible
- [ ] Can fill and save intake form
- [ ] Dashboard shows orders and projects
- [ ] Protected routes redirect to login

---

## 🚀 Deployment Checklist

### Deploy to Vercel
```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy
vercel --prod
```

### Post-Deployment
1. **Update Environment Variables in Vercel**
   - Add all `.env.local` variables to Vercel project settings
   - Update `NEXT_PUBLIC_APP_URL` to production URL

2. **Configure PayPal Webhook for Production**
   - Update webhook URL to production domain
   - Switch `PAYPAL_MODE` to `live` when ready
   - Use live PayPal credentials

3. **Test Email Delivery**
   - Verify Hostinger SMTP credentials work in production
   - Send test email to confirm deliverability

4. **Verify Supabase RLS Policies**
   - Test that users can only see their own data
   - Verify protected routes work correctly

---

## 🧪 Testing Checklist

### Payment Flow
- [ ] Can create PayPal order
- [ ] Payment redirects correctly
- [ ] Order status updates in database
- [ ] Intake form is created after payment

### Authentication
- [ ] Sign up creates profile
- [ ] Login works
- [ ] Protected routes redirect to login
- [ ] Logout clears session

### Dashboard
- [ ] Projects display correctly
- [ ] Status badges show right colors
- [ ] Order history loads

---

## 🚀 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables in Vercel
Add all variables from `.env.local` to Vercel:
1. Go to Vercel Dashboard
2. Select project → Settings → Environment Variables
3. Add each variable

### Post-Deployment
1. Update `NEXT_PUBLIC_APP_URL` to your production URL
2. Configure PayPal webhook URL
3. Test payment flow in production
4. Switch `PAYPAL_MODE` to `live` when ready

---

## 📚 Next Steps After Launch

1. **Admin Dashboard UI** - Full interface for managing client projects and updates.
2. **Live Chat** - Real-time messaging using Supabase Realtime.
3. **Client Portal Enhancements** - File versioning and revision request tracking.
4. **Advanced Analytics** - Integration with Google Analytics 4 or Plausible.
5. **Automated Reporting** - Weekly PDF reports generated for clients.

---

## 🆘 Common Issues & Solutions

### Issue: Supabase connection fails
**Solution**: Check that env variables are correct and project is active

### Issue: PayPal sandbox not working
**Solution**: Verify sandbox account has test funds, check credentials

### Issue: Build fails
**Solution**: Run `npm install` again, check for TypeScript errors

### Issue: Protected routes not working
**Solution**: Check middleware.ts is in root, verify auth cookies

---

## 📞 Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **PayPal Developer**: https://developer.paypal.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

---

**Built with ❤️ using Next.js, Supabase, and PayPal**
