// Quick Supabase connection test
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://wzgmrvknfgjevdunmbwk.supabase.co'
const supabaseKey = 'sb_publishable_9LXlWxJ5L0y3nHEXw9968g_W0cJ6PIq'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n')

  try {
    // Test 1: Check connection
    console.log('1️⃣ Testing basic connection...')
    const { data: healthCheck, error: healthError } = await supabase
      .from('products')
      .select('count')
      .limit(1)

    if (healthError) {
      console.log('❌ Connection failed:', healthError.message)
      return
    }
    console.log('✅ Connection successful!\n')

    // Test 2: Check if products table exists and has data
    console.log('2️⃣ Checking products table...')
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('name, price_usd, category')
      .limit(5)

    if (productsError) {
      console.log('❌ Products table error:', productsError.message)
      console.log('   → You need to run the products table migration\n')
    } else {
      console.log(`✅ Products table exists! Found ${products.length} products:`)
      products.forEach(p => {
        console.log(`   - ${p.name} ($${p.price_usd}) [${p.category}]`)
      })
      console.log('')
    }

    // Test 3: Check profiles table
    console.log('3️⃣ Checking profiles table...')
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)

    if (profilesError) {
      console.log('❌ Profiles table error:', profilesError.message)
      console.log('   → You need to run the profiles table migration\n')
    } else {
      console.log('✅ Profiles table exists!\n')
    }

    // Test 4: Check orders table
    console.log('4️⃣ Checking orders table...')
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('count')
      .limit(1)

    if (ordersError) {
      console.log('❌ Orders table error:', ordersError.message)
      console.log('   → You need to run the orders table migration\n')
    } else {
      console.log('✅ Orders table exists!\n')
    }

    // Test 5: Check intake_forms table
    console.log('5️⃣ Checking intake_forms table...')
    const { data: intakeForms, error: intakeError } = await supabase
      .from('intake_forms')
      .select('count')
      .limit(1)

    if (intakeError) {
      console.log('❌ Intake forms table error:', intakeError.message)
      console.log('   → You need to run the intake_forms table migration\n')
    } else {
      console.log('✅ Intake forms table exists!\n')
    }

    // Test 6: Check projects table
    console.log('6️⃣ Checking projects table...')
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('count')
      .limit(1)

    if (projectsError) {
      console.log('❌ Projects table error:', projectsError.message)
      console.log('   → You need to run the projects table migration\n')
    } else {
      console.log('✅ Projects table exists!\n')
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('✨ Supabase setup test complete!\n')

  } catch (error) {
    console.log('❌ Unexpected error:', error.message)
  }
}

testConnection()
