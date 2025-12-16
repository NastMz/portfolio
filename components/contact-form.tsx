"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Send } from "lucide-react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ContactFormProps {
  children: React.ReactNode
}

export function ContactForm({ children }: ContactFormProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const tf = useTranslations('Contact.Form')

  // Dynamic schema with translations
  const formSchema = z.object({
    name: z.string().min(2, { message: tf('errors.name') }),
    email: z.string().email({ message: tf('errors.email') }),
    subject: z.string().min(5, { message: tf('errors.subject') }),
    message: z.string().min(10, { message: tf('errors.message') }),
    botcheck: z.boolean().optional(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const apiKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
      
      if (!apiKey) {
         toast.error("Missing API Key. Please check .env.local")
         return
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: apiKey,
          ...values,
          botcheck: false
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success(tf("success"))
        form.reset()
        setOpen(false)
      } else {
        throw new Error(data.message || "Failed to send message")
      }
    } catch (error) {
      toast.error(tf("error"))
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{tf('title')}</DialogTitle>
          <DialogDescription>
            {tf('description')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">{tf('name')}</Label>
            <Input
              id="name"
              placeholder={tf('namePlaceholder')}
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{tf('email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={tf('emailPlaceholder')}
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">{tf('subject')}</Label>
            <Input
              id="subject"
              placeholder={tf('subjectPlaceholder')}
              {...form.register("subject")}
            />
            {form.formState.errors.subject && (
              <p className="text-sm text-destructive">{form.formState.errors.subject.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">{tf('message')}</Label>
            <Textarea
              id="message"
              placeholder={tf('messagePlaceholder')}
              className="min-h-[100px]"
              {...form.register("message")}
            />
            {form.formState.errors.message && (
              <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
            )}
          </div>

          {/* Honeypot field - hidden from users but visible to bots */}
          <input type="checkbox" className="hidden" style={{ display: 'none' }} {...form.register("botcheck")} tabIndex={-1} autoComplete="off" />

          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {tf('sending')}
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  {tf('send')}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
