import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata = {
  title: 'Terms of Service',
  description: 'Agency terms of service.',
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24">
        <div className="mx-auto max-w-4xl px-6 py-12 space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Terms of Service</h1>
            <p className="text-muted-foreground mt-2">
              These terms outline the rules and regulations for using Agency services.
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing or using our services, you agree to be bound by these terms
              and all applicable laws and regulations. If you do not agree, you may not
              use our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">2. Services and Deliverables</h2>
            <p className="text-muted-foreground">
              We provide marketing, advertising, and digital services as described on
              our website or in written proposals. Specific deliverables, timelines, and
              responsibilities are defined per project and may vary.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">3. Payments and Billing</h2>
            <p className="text-muted-foreground">
              Payments are due according to the agreed schedule. Late payments may result
              in project delays or service suspension. All fees are non-refundable unless
              explicitly stated otherwise.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">4. Client Responsibilities</h2>
            <p className="text-muted-foreground">
              Clients agree to provide timely feedback, content, and approvals. Delays in
              client responses may impact delivery timelines.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">5. Intellectual Property</h2>
            <p className="text-muted-foreground">
              Upon full payment, clients receive rights to the final deliverables.
              We retain the right to showcase work in our portfolio unless otherwise agreed.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">6. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              Agency is not liable for indirect, incidental, or consequential damages
              arising from the use of our services. Our total liability is limited to the
              amount paid for the specific service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">7. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We may update these terms periodically. Continued use of our services
              indicates acceptance of the updated terms.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
