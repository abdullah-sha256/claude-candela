import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CONTACT_EMAIL } from '@/data/collections'

/**
 * Static-site inquiry form.
 *
 * There is no backend, so this composes a pre-filled email in the visitor's
 * own mail client rather than posting anywhere. To collect submissions
 * server-side instead, point `action` at Formspree / Netlify Forms and drop
 * the onSubmit handler.
 */
export function InquiryForm() {
  const [sent, setSent] = React.useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const get = (k: string) => String(data.get(k) ?? '').trim()

    const body = [
      `Business: ${get('business')}`,
      `Contact: ${get('name')}`,
      `Email: ${get('email')}`,
      `Location: ${get('location')}`,
      `Store type: ${get('storeType') || '—'}`,
      '',
      get('message') || 'Please send the current wholesale line sheet.',
    ].join('\n')

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `Wholesale enquiry — ${get('business') || 'New stockist'}`
    )}&body=${encodeURIComponent(body)}`

    // Wholesale pricing gate: MSRP is shown by default; submitting this form
    // is what reveals the wholesale figures throughout the page (and on
    // future visits). See the `.wholesale-figure` rules in global.css and
    // the unlock check in Layout.astro's <head>.
    try {
      localStorage.setItem('wholesaleUnlocked', '1')
      document.documentElement.classList.add('wholesale-unlocked')
    } catch {}

    setSent(true)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <div className="grid gap-2">
        <Label htmlFor="business">Business name</Label>
        <Input id="business" name="business" required autoComplete="organization" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="name">Your name</Label>
        <Input id="name" name="name" required autoComplete="name" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="location">City / Province</Label>
        <Input id="location" name="location" placeholder="Toronto, ON" required />
      </div>

      <div className="grid gap-2 sm:col-span-2">
        <Label htmlFor="storeType">Store type</Label>
        <Input
          id="storeType"
          name="storeType"
          placeholder="Gift shop, boutique, florist, museum shop…"
        />
      </div>

      <div className="grid gap-2 sm:col-span-2">
        <Label htmlFor="message">Anything else?</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Collections you're interested in, timing, or questions about the programme."
        />
      </div>

      <div className="sm:col-span-2">
        <Button type="submit" variant="accent" size="lg" className="w-full sm:w-auto">
          Request the line sheet
        </Button>
        <p aria-live="polite" className="mt-3 text-sm text-espresso-soft">
          {sent
            ? `Your mail app should have opened with the message ready to send. If it didn't, email ${CONTACT_EMAIL} directly. Wholesale pricing is now unlocked throughout the page.`
            : 'Opens a pre-filled email in your mail app — nothing is submitted from this page. Submitting also unlocks wholesale pricing above.'}
        </p>
      </div>
    </form>
  )
}
