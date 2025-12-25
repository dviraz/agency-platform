'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Building,
  Target,
  Users,
  Calendar,
  CheckCircle,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createClient } from '@/lib/supabase/client'

const steps = [
  { id: 1, name: 'Business Info', icon: Building },
  { id: 2, name: 'Project Details', icon: Target },
  { id: 3, name: 'Target Audience', icon: Users },
  { id: 4, name: 'Timeline', icon: Calendar },
  { id: 5, name: 'Review', icon: CheckCircle },
]

const intakeSchema = z.object({
  // Step 1: Business Info
  business_name: z.string().min(1, 'Business name is required'),
  industry: z.string().min(1, 'Industry is required'),
  website_url: z.string().url().optional().or(z.literal('')),
  contact_person: z.string().min(1, 'Contact person is required'),
  contact_email: z.string().email('Valid email is required'),
  contact_phone: z.string().optional(),
  // Step 2: Project Details
  project_goals: z.string().min(10, 'Please describe your goals'),
  project_description: z.string().min(10, 'Please describe your project'),
  // Step 3: Target Audience
  target_audience: z.string().min(5, 'Please describe your target audience'),
  geographic_focus: z.string().optional(),
  age_range: z.string().optional(),
  customer_pain_points: z.string().optional(),
  // Step 4: Timeline
  desired_start_date: z.string().optional(),
  deadline: z.string().optional(),
  budget_expectations: z.string().optional(),
  additional_notes: z.string().optional(),
})

type IntakeFormData = z.infer<typeof intakeSchema>

interface IntakeFormProps {
  orderId: string
  initialData?: Partial<IntakeFormData>
  initialStep?: number
}

export function IntakeForm({ orderId, initialData, initialStep = 1 }: IntakeFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const shouldReduceMotion = useReducedMotion()
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<IntakeFormData>({
    resolver: zodResolver(intakeSchema),
    defaultValues: initialData,
  })

  const formData = watch()

  const saveProgress = useCallback(async () => {
    setIsSaving(true)
    try {
      const { error } = await supabase
        .from('intake_forms')
        .update({
          ...formData,
          current_step: currentStep,
          updated_at: new Date().toISOString(),
        })
        .eq('order_id', orderId)

      if (error) throw error
    } catch (error) {
      console.error('Save error:', error)
    } finally {
      setIsSaving(false)
    }
  }, [formData, currentStep, orderId, supabase])

  // Auto-save on data change (debounced)
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentStep < 5) {
        saveProgress()
      }
    }, 2000)

    return () => clearTimeout(timeout)
  }, [formData, currentStep, saveProgress])

  const validateStep = async (step: number): Promise<boolean> => {
    const stepFields: Record<number, (keyof IntakeFormData)[]> = {
      1: ['business_name', 'industry', 'contact_person', 'contact_email'],
      2: ['project_goals', 'project_description'],
      3: ['target_audience'],
      4: [],
    }
    
    const fieldsToValidate = stepFields[step] || []

    if (fieldsToValidate.length === 0) return true

    const result = await trigger(fieldsToValidate)
    return result
  }

  const handleNext = async () => {
    const isValid = await validateStep(currentStep)
    if (isValid && currentStep < 5) {
      await saveProgress()
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: IntakeFormData) => {
    setIsSubmitting(true)
    try {
      // Update intake form as completed
      const { error: intakeError } = await supabase
        .from('intake_forms')
        .update({
          ...data,
          is_completed: true,
          completed_at: new Date().toISOString(),
          current_step: 5,
        })
        .eq('order_id', orderId)

      if (intakeError) throw intakeError

      // Update order status
      await supabase
        .from('orders')
        .update({ status: 'intake_completed' })
        .eq('id', orderId)

      toast.success('Intake form submitted successfully!')
      router.push('/dashboard')
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to submit form'
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  currentStep > step.id
                    ? 'bg-green-500 border-green-500'
                    : currentStep === step.id
                    ? 'border-primary bg-primary/10'
                    : 'border-white/10'
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5 text-white" />
                ) : (
                  <step.icon
                    className={`h-5 w-5 ${
                      currentStep === step.id ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  />
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-full h-1 mx-2 ${
                    currentStep > step.id ? 'bg-green-500' : 'bg-white/10'
                  }`}
                  style={{ width: '60px' }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((step) => (
            <span
              key={step.id}
              className={`text-xs ${
                currentStep === step.id ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {step.name}
            </span>
          ))}
        </div>
      </div>

      {/* Auto-save indicator */}
      {isSaving && (
        <div className="fixed bottom-4 right-4 bg-card border border-white/10 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Saving...
        </div>
      )}

      {/* Form content */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            >
              {/* Step 1: Business Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Business Information</h2>
                  <p className="text-muted-foreground">Tell us about your business</p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="business_name">Business Name *</Label>
                      <Input
                        id="business_name"
                        {...register('business_name')}
                        placeholder="Acme Inc."
                        aria-describedby={errors.business_name ? 'business_name-error' : undefined}
                        aria-invalid={!!errors.business_name}
                      />
                      {errors.business_name && (
                        <p id="business_name-error" className="text-sm text-destructive">
                          {errors.business_name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry *</Label>
                      <Input
                        id="industry"
                        {...register('industry')}
                        placeholder="Technology, Healthcare, etc."
                        aria-describedby={errors.industry ? 'industry-error' : undefined}
                        aria-invalid={!!errors.industry}
                      />
                      {errors.industry && (
                        <p id="industry-error" className="text-sm text-destructive">
                          {errors.industry.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website_url">Website URL (optional)</Label>
                    <Input
                      id="website_url"
                      {...register('website_url')}
                      placeholder="https://example.com"
                      aria-describedby={errors.website_url ? 'website_url-error' : undefined}
                      aria-invalid={!!errors.website_url}
                    />
                    {errors.website_url && (
                      <p id="website_url-error" className="text-sm text-destructive">
                        {errors.website_url.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contact_person">Contact Person *</Label>
                      <Input
                        id="contact_person"
                        {...register('contact_person')}
                        placeholder="John Doe"
                        aria-describedby={errors.contact_person ? 'contact_person-error' : undefined}
                        aria-invalid={!!errors.contact_person}
                      />
                      {errors.contact_person && (
                        <p id="contact_person-error" className="text-sm text-destructive">
                          {errors.contact_person.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact_email">Email *</Label>
                      <Input
                        id="contact_email"
                        {...register('contact_email')}
                        type="email"
                        placeholder="john@example.com"
                        aria-describedby={errors.contact_email ? 'contact_email-error' : undefined}
                        aria-invalid={!!errors.contact_email}
                      />
                      {errors.contact_email && (
                        <p id="contact_email-error" className="text-sm text-destructive">
                          {errors.contact_email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact_phone">Phone (optional)</Label>
                    <Input id="contact_phone" {...register('contact_phone')} placeholder="+1 (234) 567-890" />
                  </div>
                </div>
              )}

              {/* Step 2: Project Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Project Details</h2>
                  <p className="text-muted-foreground">Tell us about your project goals</p>

                  <div className="space-y-2">
                    <Label htmlFor="project_goals">Project Goals *</Label>
                    <Textarea
                      id="project_goals"
                      {...register('project_goals')}
                      placeholder="What do you want to achieve with this project?"
                      rows={4}
                      aria-describedby={errors.project_goals ? 'project_goals-error' : undefined}
                      aria-invalid={!!errors.project_goals}
                    />
                    {errors.project_goals && (
                      <p id="project_goals-error" className="text-sm text-destructive">
                        {errors.project_goals.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project_description">Project Description *</Label>
                    <Textarea
                      id="project_description"
                      {...register('project_description')}
                      placeholder="Describe your project in detail..."
                      rows={6}
                      aria-describedby={errors.project_description ? 'project_description-error' : undefined}
                      aria-invalid={!!errors.project_description}
                    />
                    {errors.project_description && (
                      <p id="project_description-error" className="text-sm text-destructive">
                        {errors.project_description.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Target Audience */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Target Audience</h2>
                  <p className="text-muted-foreground">Who are your ideal customers?</p>

                  <div className="space-y-2">
                    <Label htmlFor="target_audience">Target Audience *</Label>
                    <Textarea
                      id="target_audience"
                      {...register('target_audience')}
                      placeholder="Describe your ideal customers..."
                      rows={4}
                      aria-describedby={errors.target_audience ? 'target_audience-error' : undefined}
                      aria-invalid={!!errors.target_audience}
                    />
                    {errors.target_audience && (
                      <p id="target_audience-error" className="text-sm text-destructive">
                        {errors.target_audience.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="geographic_focus">Geographic Focus</Label>
                      <Input id="geographic_focus" {...register('geographic_focus')} placeholder="Local, National, Global" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age_range">Age Range</Label>
                      <Input id="age_range" {...register('age_range')} placeholder="25-45" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customer_pain_points">Customer Pain Points</Label>
                    <Textarea
                      id="customer_pain_points"
                      {...register('customer_pain_points')}
                      placeholder="What problems do your customers face?"
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Timeline */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Timeline & Budget</h2>
                  <p className="text-muted-foreground">When do you need this completed?</p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="desired_start_date">Desired Start Date</Label>
                      <Input id="desired_start_date" {...register('desired_start_date')} type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Deadline</Label>
                      <Input id="deadline" {...register('deadline')} type="date" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget_expectations">Budget Expectations</Label>
                    <Input id="budget_expectations" {...register('budget_expectations')} placeholder="What's your monthly marketing budget?" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additional_notes">Additional Notes</Label>
                    <Textarea
                      id="additional_notes"
                      {...register('additional_notes')}
                      placeholder="Anything else we should know?"
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Review */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Review & Submit</h2>
                  <p className="text-muted-foreground">Please review your information before submitting</p>

                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h3 className="font-medium mb-2">Business Info</h3>
                      <p className="text-sm text-muted-foreground">
                        {formData.business_name} - {formData.industry}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formData.contact_person} - {formData.contact_email}
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4">
                      <h3 className="font-medium mb-2">Project Goals</h3>
                      <p className="text-sm text-muted-foreground">{formData.project_goals}</p>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4">
                      <h3 className="font-medium mb-2">Target Audience</h3>
                      <p className="text-sm text-muted-foreground">{formData.target_audience}</p>
                    </div>

                    {(formData.desired_start_date || formData.deadline) && (
                      <div className="bg-white/5 rounded-lg p-4">
                        <h3 className="font-medium mb-2">Timeline</h3>
                        <p className="text-sm text-muted-foreground">
                          {formData.desired_start_date && `Start: ${formData.desired_start_date}`}
                          {formData.desired_start_date && formData.deadline && ' - '}
                          {formData.deadline && `Deadline: ${formData.deadline}`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            {currentStep < 5 ? (
              <Button type="button" onClick={handleNext}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Form
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
