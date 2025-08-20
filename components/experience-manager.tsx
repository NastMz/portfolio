"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { addExperienceAction, updateExperienceAction, deleteExperienceAction } from "@/app/portfolio-actions"
import type { Experience } from "@/lib/portfolio-db"
import { Briefcase, Plus, Edit, Trash2, MapPin, Calendar } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ExperienceManagerProps {
  experience: Experience[]
}

const colorOptions = [
  { value: "border-l-blue-500", label: "Blue", color: "bg-blue-500" },
  { value: "border-l-green-500", label: "Green", color: "bg-green-500" },
  { value: "border-l-purple-500", label: "Purple", color: "bg-purple-500" },
  { value: "border-l-red-500", label: "Red", color: "bg-red-500" },
  { value: "border-l-orange-500", label: "Orange", color: "bg-orange-500" },
  { value: "border-l-teal-500", label: "Teal", color: "bg-teal-500" },
]

export function ExperienceManager({ experience }: ExperienceManagerProps) {
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)

    const result = editingExperience
      ? await updateExperienceAction(editingExperience.id, formData)
      : await addExperienceAction(formData)

    if (result.success) {
      setEditingExperience(null)
      setShowForm(false)
    }

    setIsSubmitting(false)
  }

  const handleDelete = async (id: string) => {
    await deleteExperienceAction(id)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>Work Experience</span>
              </CardTitle>
              <CardDescription>Manage your professional work history and achievements</CardDescription>
            </div>
            <Button
              onClick={() => {
                setEditingExperience(null)
                setShowForm(!showForm)
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </div>
        </CardHeader>

        {showForm && (
          <CardContent className="border-t">
            <form action={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Senior Backend Engineer"
                    defaultValue={editingExperience?.title}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="TechCorp Inc."
                    defaultValue={editingExperience?.company}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="period">Period</Label>
                  <Input
                    id="period"
                    name="period"
                    placeholder="2022 - Present"
                    defaultValue={editingExperience?.period}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="San Francisco, CA"
                    defaultValue={editingExperience?.location}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Timeline Color</Label>
                  <Select name="color" defaultValue={editingExperience?.color} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${option.color}`} />
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="achievements">Key Achievements (one per line)</Label>
                <Textarea
                  id="achievements"
                  name="achievements"
                  rows={5}
                  placeholder="Led migration to microservices architecture, reducing deployment time by 60%&#10;Optimized database queries resulting in 40% performance improvement&#10;Mentored 5 junior developers and established code review processes"
                  defaultValue={editingExperience?.achievements.join("\n")}
                  required
                />
              </div>

              <div className="flex space-x-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : editingExperience ? "Update Experience" : "Add Experience"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingExperience(null)
                    setShowForm(false)
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        )}
      </Card>

      {/* Experience Timeline */}
      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div key={exp.id} className="relative flex items-start space-x-6">
            {/* Timeline Line */}
            {index < experience.length - 1 && <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-border" />}

            {/* Timeline Dot */}
            <div className="flex-shrink-0 w-16 h-16 bg-background border-4 border-primary/20 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full" />
            </div>

            {/* Experience Card */}
            <Card className={`flex-1 border-l-4 ${exp.color} hover:shadow-lg transition-shadow`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{exp.title}</CardTitle>
                    <CardDescription className="text-base font-medium text-primary">{exp.company}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span className="font-medium">{exp.period}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingExperience(exp)
                        setShowForm(true)
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Experience</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this work experience? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(exp.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {experience.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No work experience yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Add your professional experience to build your career timeline.
            </p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Job
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
