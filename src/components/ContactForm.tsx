import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import {
  enquiryTypes,
  submitEnquiry,
  validateEnquiry,
  type Enquiry,
  type EnquiryErrors,
  type EnquiryType,
} from '../lib/enquiry'
import { ease } from '../lib/motion'
import { cn } from '../lib/utils'
import { Button } from './Button'

const emptyEnquiry: Enquiry = { name: '', email: '', phone: '', company: '', type: '', location: '', message: '' }

/** Field order used to focus the first invalid field after a failed submit. */
const fieldOrder: (keyof Enquiry)[] = ['name', 'email', 'phone', 'company', 'type', 'location', 'message']

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function ContactForm({ initialType }: { initialType?: EnquiryType }) {
  const [values, setValues] = useState<Enquiry>({ ...emptyEnquiry, type: initialType ?? '' })
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const id = useId()

  const update = <K extends keyof Enquiry>(key: K, value: Enquiry[K]) => {
    setValues((v) => ({ ...v, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const found = validateEnquiry(values)
    setErrors(found)
    const firstInvalid = fieldOrder.find((key) => found[key])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus('sending')
    try {
      await submitEnquiry(values)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const fieldProps = (key: keyof Enquiry) => ({
    id: `${id}-${key}`,
    name: key,
    value: values[key],
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${id}-${key}-error` : undefined,
  })

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === 'sent' ? (
        <motion.div
          key="sent"
          role="status"
          className="flex min-h-[28rem] flex-col items-start justify-center border border-ink/15 p-8 md:p-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="flex size-12 items-center justify-center bg-bronze text-ink">
            <Check aria-hidden strokeWidth={1.5} className="size-5" />
          </span>
          <h2 className="display display-3 mt-8">Thank you{values.name ? `, ${values.name.split(' ')[0]}` : ''}.</h2>
          <p className="mt-4 max-w-md leading-relaxed text-concrete">
            Your enquiry has been received. We’ll review the details and be in touch.
          </p>
          <Button
            variant="text"
            className="mt-10"
            onClick={() => {
              setValues({ ...emptyEnquiry, type: initialType ?? '' })
              setStatus('idle')
            }}
          >
            Send another enquiry
          </Button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          noValidate
          onSubmit={onSubmit}
          aria-label="Enquiry form"
          className="grid gap-x-8 gap-y-10 md:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <fieldset className="md:col-span-2">
            <legend className="eyebrow text-concrete">
              Enquiry type <span className="text-bronze-deep">*</span>
            </legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {enquiryTypes.map((type) => {
                const checked = values.type === type.value
                return (
                  <label
                    key={type.value}
                    className={cn(
                      'relative flex h-11 cursor-pointer items-center border px-4 text-[0.8rem] font-medium transition-colors duration-300',
                      'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-bronze',
                      checked ? 'border-ink bg-ink text-paper' : 'border-ink/20 hover:border-ink',
                    )}
                  >
                    <input
                      type="radio"
                      name="type"
                      aria-describedby={errors.type ? `${id}-type-error` : undefined}
                      value={type.value}
                      checked={checked}
                      onChange={() => update('type', type.value)}
                      className="sr-only"
                    />
                    {type.label}
                  </label>
                )
              })}
            </div>
            <FieldError id={`${id}-type-error`} message={errors.type} />
          </fieldset>

          <Field label="Name" htmlFor={`${id}-name`} required error={errors.name} errorId={`${id}-name-error`}>
            <input {...fieldProps('name')} type="text" autoComplete="name" required onChange={(e) => update('name', e.target.value)} className={inputClass} />
          </Field>
          <Field label="Email" htmlFor={`${id}-email`} required error={errors.email} errorId={`${id}-email-error`}>
            <input {...fieldProps('email')} type="email" autoComplete="email" required onChange={(e) => update('email', e.target.value)} className={inputClass} />
          </Field>
          <Field label="Phone" htmlFor={`${id}-phone`} error={errors.phone} errorId={`${id}-phone-error`}>
            <input {...fieldProps('phone')} type="tel" autoComplete="tel" onChange={(e) => update('phone', e.target.value)} className={inputClass} />
          </Field>
          <Field label="Company" htmlFor={`${id}-company`}>
            <input {...fieldProps('company')} type="text" autoComplete="organization" onChange={(e) => update('company', e.target.value)} className={inputClass} />
          </Field>
          <Field label="Location of land / project" htmlFor={`${id}-location`} className="md:col-span-2">
            <input {...fieldProps('location')} type="text" autoComplete="address-level2" onChange={(e) => update('location', e.target.value)} className={inputClass} />
          </Field>
          <Field label="Message" htmlFor={`${id}-message`} required error={errors.message} errorId={`${id}-message-error`} className="md:col-span-2">
            <textarea
              {...fieldProps('message')}
              rows={5}
              required
              onChange={(e) => update('message', e.target.value)}
              className={cn(inputClass, 'h-auto resize-y py-3')}
            />
          </Field>

          <div className="flex flex-col gap-6 md:col-span-2 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-concrete">
              <span className="text-bronze-deep">*</span> Required fields
            </p>
            <Button type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
            </Button>
          </div>
          {status === 'error' && (
            <p role="alert" className="text-sm text-red-800 md:col-span-2">
              Something went wrong sending your enquiry. Please try again.
            </p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  )
}

const inputClass =
  'block h-12 w-full border-0 border-b border-ink/25 bg-transparent px-0 text-base text-ink transition-colors placeholder:text-ink/35 hover:border-ink/50 focus:border-bronze focus:ring-0 aria-invalid:border-red-700'

type FieldProps = {
  label: string
  htmlFor: string
  required?: boolean
  error?: string
  errorId?: string
  className?: string
  children: ReactNode
}

function Field({ label, htmlFor, required, error, errorId, className, children }: FieldProps) {
  return (
    <div className={cn('group', className)}>
      <label htmlFor={htmlFor} className="eyebrow text-concrete transition-colors group-focus-within:text-bronze-deep">
        {label} {required && <span className="text-bronze-deep">*</span>}
      </label>
      <div className="mt-1">{children}</div>
      {errorId && <FieldError id={errorId} message={error} />}
    </div>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <p id={id} className="mt-2 min-h-5 text-sm text-red-800" aria-live="polite">
      {message}
    </p>
  )
}
