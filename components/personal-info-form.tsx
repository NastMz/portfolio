"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { updatePersonalInfoAction } from "@/app/portfolio-actions"
import type { PersonalInfo } from "@/lib/portfolio-db"
import { User } from "lucide-react"

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo
}

export function PersonalInfoForm({ personalInfo }: PersonalInfoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    const result = await updatePersonalInfoAction(formData)

    if (result.error) {
      setError(result.error)
    } else {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }

    setIsSubmitting(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>Personal Information</span>
        </CardTitle>
        <CardDescription>Update your personal details and contact information</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" defaultValue={personalInfo.name} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input id="title" name="title" defaultValue={personalInfo.title} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" defaultValue={personalInfo.description} rows={3} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" defaultValue={personalInfo.location} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Input id="availability" name="availability" defaultValue={personalInfo.availability} required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" defaultValue={personalInfo.email} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub URL</Label>
              <Input id="github" name="github" type="url" defaultValue={personalInfo.github} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input id="linkedin" name="linkedin" type="url" defaultValue={personalInfo.linkedin} required />
            </div>
          </div>

          {error && <div className="text-sm text-red-600 bg-red-50 dark:bg-red-950/50 p-3 rounded-md">{error}</div>}
          {success && (
            <div className="text-sm text-green-600 bg-green-50 dark:bg-green-950/50 p-3 rounded-md">
              Personal information updated successfully!
            </div>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Updating..." : "Update Personal Info"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
