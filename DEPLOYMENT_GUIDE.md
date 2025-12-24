# 🚀 Deployment Guide - Agency Platform

## ✅ What's Already Done

- ✅ Code pushed to GitHub: https://github.com/dviraz/agency-platform
- ✅ Vercel project connected
- ✅ TypeScript build errors fixed
- ✅ Tests passing (16/17 - 94%)

---

## 🔧 Vercel Environment Variables Setup

Your build is currently failing because environment variables aren't configured in Vercel. Follow these steps:

### **Step 1: Access Vercel Settings**

1. Go to https://vercel.com/dashboard
2. Click on your **agency-platform** project
3. Navigate to **Settings** → **Environment Variables**

### **Step 2: Add All Variables**

Copy and paste each variable below. For each one:
- Click **Add New**
- Enter the **Name** and **Value**
- Select **Production**, **Preview**, AND **Development**
- Click **Save**

```bash
# App Configuration
NEXT_PUBLIC_APP_URL
# Value: https://your-project-name.vercel.app (update after first deployment)

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL
# Value: https://wzgmrvknfgjevdunmbwk.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
# Value: sb_publishable_9LXlWxJ5L0y3nHEXw9968g_W0cJ6PIq

SUPABASE_SERVICE_ROLE_KEY
# Value: sb_secret_0XfpCrpTf4_Re5dpOYR6BA_qliMCMGE

# PayPal Configuration (Sandbox)
NEXT_PUBLIC_PAYPAL_CLIENT_ID
# Value: AZ24SnDHS43UBqL667aU4isJW5orh9eLyqlP1zfXNxfLD5K87FHO4HACpLNb-VUo0-ejahD4ixU15sOj

PAYPAL_CLIENT_SECRET
# Value: EPJqWNwhiv-un5-nZXOoVblFTkyIGUNWOU67ok04WgA2Kj02FVvvQhL8lBCi_1x6_ctPBEAeNKgHw1za

PAYPAL_MODE
# Value: sandbox

# Email Configuration (Hostinger SMTP)
SMTP_HOST
# Value: smtp.hostinger.com

SMTP_PORT
# Value: 465

SMTP_USER
# Value: dvir@synergyx.pro

SMTP_PASSWORD
# Value: hZzeyi8Ya2pvD

EMAIL_FROM
# Value: "SynergyX Agency <dvir@synergyx.pro>"
```

### **Step 3: Redeploy**

After adding all variables:
1. Go back to **Deployments** tab
2. Find the latest failed deployment
3. Click the **•••** menu → **Redeploy**
4. Wait 2-3 minutes for build to complete

---

## 🔐 Security Notes

### **Sensitive Data**
Your `.env.local` file contains sensitive credentials and is properly excluded from Git via `.gitignore`. Never commit it to the repository.

### **PayPal Sandbox vs Live**
- Currently using **sandbox mode** for testing
- When ready for production:
  1. Get live PayPal credentials from https://developer.paypal.com
  2. Update `PAYPAL_MODE` to `live`
  3. Update PayPal client ID and secret

---

## 📋 Post-Deployment Checklist

Once your site is live, complete these tasks:

### **1. Update App URL**
- [ ] Copy your Vercel deployment URL (e.g., `https://agency-platform-xyz.vercel.app`)
- [ ] Update `NEXT_PUBLIC_APP_URL` in Vercel environment variables
- [ ] Redeploy

### **2. Configure PayPal Webhook**
- [ ] Go to https://developer.paypal.com
- [ ] Navigate to your app → **Webhooks**
- [ ] Click **Add Webhook**
- [ ] Webhook URL: `https://your-domain.vercel.app/api/paypal/webhook`
- [ ] Events to subscribe to: `PAYMENT.CAPTURE.COMPLETED`
- [ ] Click **Save**

### **3. Test Payment Flow**
- [ ] Visit your live site
- [ ] Create a test account
- [ ] Select a service tier
- [ ] Complete PayPal sandbox payment
- [ ] Verify email confirmation received
- [ ] Check order appears in dashboard
- [ ] Verify intake form is accessible

### **4. Test Email Delivery**
- [ ] Make a test purchase
- [ ] Check inbox for payment confirmation
- [ ] Verify email appears professional
- [ ] Check spam folder if not received

### **5. Verify Database**
- [ ] Go to Supabase dashboard
- [ ] Check orders table has test data
- [ ] Verify RLS policies working (can't access other users' data)

---

## 🌐 Custom Domain (Optional)

To add a custom domain:

1. **In Vercel:**
   - Settings → Domains
   - Add your domain (e.g., `synergyx.pro`)

2. **Update DNS:**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or use Vercel nameservers

3. **Update Environment Variables:**
   - Change `NEXT_PUBLIC_APP_URL` to your custom domain
   - Update PayPal webhook URL to custom domain

---

## 🔄 Going Live with PayPal

When ready to accept real payments:

### **Step 1: Get Live Credentials**
1. Go to https://developer.paypal.com
2. Switch to **Live** mode (toggle in top right)
3. Create a new app or switch existing app to live
4. Copy **Live** Client ID and Secret

### **Step 2: Update Vercel Variables**
```bash
PAYPAL_MODE=live
NEXT_PUBLIC_PAYPAL_CLIENT_ID=<your-live-client-id>
PAYPAL_CLIENT_SECRET=<your-live-secret>
```

### **Step 3: Update Webhook**
- Add webhook for **live** mode with your production URL
- Subscribe to `PAYMENT.CAPTURE.COMPLETED`

### **Step 4: Test with Small Amount**
- Make a real purchase with small amount ($1)
- Verify payment processes correctly
- Check email, database, and dashboard

---

## 📊 Monitoring & Analytics

### **Vercel Analytics**
- Automatically enabled on your project
- View at: https://vercel.com/dviraz/agency-platform/analytics

### **Supabase Monitoring**
- Database stats: https://supabase.com/dashboard/project/wzgmrvknfgjevdunmbwk
- Monitor: API calls, database size, active connections

### **Recommended Additions**
- [ ] Add Google Analytics
- [ ] Set up error tracking (Sentry)
- [ ] Configure uptime monitoring
- [ ] Set up email alerts for failed payments

---

## 🐛 Troubleshooting

### **Build Fails**
- Check all environment variables are set
- Verify values don't have extra quotes or spaces
- Check Vercel build logs for specific errors

### **Supabase Connection Issues**
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check anon key and service role key
- Test connection at Supabase dashboard

### **PayPal Not Loading**
- Verify `NEXT_PUBLIC_PAYPAL_CLIENT_ID` is set
- Check browser console for errors
- Ensure using correct mode (sandbox/live)

### **Emails Not Sending**
- Test SMTP credentials locally first
- Check Hostinger email quota
- Verify firewall not blocking port 465
- Check spam folder

### **Database Errors**
- Verify all migrations ran successfully
- Check RLS policies in Supabase
- Ensure service role key has proper permissions

---

## 📞 Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **PayPal Developer**: https://developer.paypal.com/docs
- **GitHub Repo**: https://github.com/dviraz/agency-platform

---

## 🎯 Current Status

- ✅ **GitHub**: Latest code pushed
- ⚠️ **Vercel**: Waiting for environment variables
- ✅ **Supabase**: Database configured and working
- ✅ **PayPal**: Sandbox credentials configured
- ✅ **Email**: SMTP credentials configured
- ✅ **Tests**: 16/17 passing (94%)

**Next Action**: Add environment variables in Vercel and redeploy!

---

**Once deployed, your agency platform will be live at:** `https://your-project.vercel.app` 🚀
