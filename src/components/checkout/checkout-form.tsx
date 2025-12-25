'use client'

import { useState, useEffect } from 'react'
import { Check, Shield, Clock, Headphones, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PayPalButton } from '@/components/checkout/paypal-button'
import { PRODUCTS, Product } from '@/lib/constants/products'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

interface CheckoutFormProps {
  initialProduct: {
    name: string
    price: number
    description: string
    features: readonly string[] | string[]
    slug: string
  }
}

const RECOMMENDED_ADDONS = [
  'seo-local',
  'branding-starter',
  'google-ads-starter',
  'meta-ads-starter'
]

export function CheckoutForm({ initialProduct }: CheckoutFormProps) {
  const [selectedAddons, setSelectedAddons] = useState<Product[]>([])
  const [guestEmail, setGuestEmail] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)
    }
    checkAuth()
  }, [])

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setIsEmailValid(emailRegex.test(guestEmail))
  }, [guestEmail])

  const addons = PRODUCTS.filter(p =>
    RECOMMENDED_ADDONS.includes(p.slug) && p.slug !== initialProduct.slug
  )

  const canCheckout = isAuthenticated || isEmailValid

  const toggleAddon = (addon: Product) => {
    setSelectedAddons(prev => 
      prev.find(a => a.slug === addon.slug)
        ? prev.filter(a => a.slug !== addon.slug)
        : [...prev, addon]
    )
  }

  const totalPrice = initialProduct.price + selectedAddons.reduce((sum, a) => sum + a.price, 0)
  const allProductSlugs = [initialProduct.slug, ...selectedAddons.map(a => a.slug)]

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Product details */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{initialProduct.name}</h1>
        <p className="text-muted-foreground mb-6">{initialProduct.description}</p>

        <div className="space-y-4 mb-8">
          {initialProduct.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-1 bg-blue-500/10 rounded-full p-1">
                <Check className="h-3 w-3 text-blue-400" />
              </div>
              <span className="text-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            Recommended Add-ons
            <span className="text-xs font-normal bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full">
              Optional
            </span>
          </h2>
          <div className="grid gap-4">
            {addons.map((addon) => {
              const isSelected = selectedAddons.find(a => a.slug === addon.slug)
              return (
                <div
                  key={addon.slug}
                  onClick={() => toggleAddon(addon)}
                  className={cn(
                    "group relative p-4 rounded-xl border transition-all duration-300 cursor-pointer",
                    isSelected 
                      ? "bg-blue-500/5 border-blue-500/50 ring-1 ring-blue-500/50" 
                      : "bg-card/50 border-white/10 hover:border-white/20"
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm group-hover:text-blue-400 transition-colors">
                        {addon.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {addon.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm">${addon.price.toLocaleString()}</div>
                      <div className={cn(
                        "text-[10px] mt-1 font-medium uppercase tracking-wider",
                        isSelected ? "text-blue-400" : "text-muted-foreground"
                      )}>
                        {isSelected ? 'Added' : 'Add'}
                      </div>
                    </div>
                    <div className={cn(
                      "flex items-center justify-center w-6 h-6 rounded-full border transition-all duration-300",
                      isSelected 
                        ? "bg-blue-500 border-blue-500 text-white" 
                        : "border-white/20 text-muted-foreground group-hover:border-white/40"
                    )}>
                      {isSelected ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="bg-card/50 border border-white/10 rounded-xl p-3 mb-2 flex justify-center">
              <Shield className="h-5 w-5 text-blue-400" />
            </div>
            <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Secure</div>
          </div>
          <div className="text-center">
            <div className="bg-card/50 border border-white/10 rounded-xl p-3 mb-2 flex justify-center">
              <Clock className="h-5 w-5 text-purple-400" />
            </div>
            <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Fast</div>
          </div>
          <div className="text-center">
            <div className="bg-card/50 border border-white/10 rounded-xl p-3 mb-2 flex justify-center">
              <Headphones className="h-5 w-5 text-cyan-400" />
            </div>
            <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Support</div>
          </div>
        </div>
      </div>

      {/* Checkout card */}
      <div className="lg:sticky lg:top-12 h-fit">
        <div className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{initialProduct.name}</span>
              <span className="font-medium">${initialProduct.price.toLocaleString()}</span>
            </div>

            {selectedAddons.map(addon => (
              <div key={addon.slug} className="flex justify-between text-sm animate-in fade-in slide-in-from-top-1">
                <span className="text-muted-foreground">{addon.name}</span>
                <span className="font-medium">${addon.price.toLocaleString()}</span>
              </div>
            ))}

            <div className="pt-4 border-t border-white/10 flex justify-between items-end">
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Amount</div>
                <div className="text-3xl font-bold text-gradient">${totalPrice.toLocaleString()}</div>
              </div>
              <div className="text-xs text-muted-foreground mb-1">USD</div>
            </div>
          </div>

          {!isAuthenticated && (
            <div className="mb-6">
              <Label htmlFor="guest-email" className="text-sm font-medium mb-2 block">
                Email Address
              </Label>
              <Input
                id="guest-email"
                type="email"
                placeholder="your@email.com"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="bg-background/50 border-white/10"
              />
              <p className="text-xs text-muted-foreground mt-2">
                We'll create an account for you and send order details to this email.
              </p>
            </div>
          )}

          <div className="space-y-4">
            {canCheckout ? (
              <PayPalButton
                productSlug={initialProduct.slug}
                addonSlugs={selectedAddons.map(a => a.slug)}
                guestEmail={!isAuthenticated ? guestEmail : undefined}
              />
            ) : (
              <Button disabled className="w-full">
                Enter email to continue
              </Button>
            )}
            <p className="text-[10px] text-center text-muted-foreground">
              By completing your purchase, you agree to our Terms of Service and Privacy Policy.
              Payments are securely processed by PayPal.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
