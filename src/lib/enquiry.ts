import { site } from '../config/site'

export const enquiryTypes = [
  { value: 'general', label: 'General Enquiry' },
  { value: 'landowner', label: 'Landowner Enquiry' },
  { value: 'partnership', label: 'Partnership Enquiry' },
  { value: 'project', label: 'Project Enquiry' },
  { value: 'career', label: 'Career / Professional Enquiry' },
] as const

export type EnquiryType = (typeof enquiryTypes)[number]['value']

export type Enquiry = {
  name: string
  email: string
  phone: string
  company: string
  type: EnquiryType | ''
  location: string
  message: string
}

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>

export const isEnquiryType = (value: string | null): value is EnquiryType =>
  enquiryTypes.some((t) => t.value === value)

export function validateEnquiry(values: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (values.phone.trim() && !/^[+()\d\s-]{7,20}$/.test(values.phone.trim()))
    errors.phone = 'Please enter a valid phone number.'
  if (!values.type) errors.type = 'Please choose an enquiry type.'
  if (values.message.trim().length < 10) errors.message = 'Please tell us a little more (at least 10 characters).'
  return errors
}

/**
 * Sends an enquiry to `site.enquiryEndpoint` as JSON.
 * Until an endpoint is configured, resolves without sending (see README).
 */
export async function submitEnquiry(values: Enquiry): Promise<void> {
  if (!site.enquiryEndpoint) return

  const response = await fetch(site.enquiryEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(values),
  })
  if (!response.ok) throw new Error(`Enquiry failed with status ${response.status}`)
}
