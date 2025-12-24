import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata = {
  title: 'Privacy Policy',
  description: 'Agency privacy policy.',
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24">
        <div className="mx-auto max-w-4xl px-6 py-12 space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
            <p className="text-muted-foreground mt-2">
              This policy explains how Agency collects, uses, and protects your information.
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <p className="text-muted-foreground">
              We collect information you provide directly, such as name, email address,
              company details, and project requirements. We may also collect usage data
              when you interact with our website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">2. How We Use Information</h2>
            <p className="text-muted-foreground">
              We use your information to deliver services, communicate project updates,
              process payments, and improve our offerings. We do not sell your data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">3. Data Sharing</h2>
            <p className="text-muted-foreground">
              We only share data with trusted service providers required to fulfill
              our services, such as payment processors and email providers. These partners
              are contractually obligated to protect your data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">4. Data Security</h2>
            <p className="text-muted-foreground">
              We implement reasonable security measures to protect your information.
              However, no method of transmission or storage is completely secure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">5. Your Rights</h2>
            <p className="text-muted-foreground">
              You may request access, correction, or deletion of your data. Contact us to
              submit a privacy request or ask questions about your data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">6. Policy Updates</h2>
            <p className="text-muted-foreground">
              We may update this policy from time to time. Any updates will be posted on
              this page with the revised date.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
