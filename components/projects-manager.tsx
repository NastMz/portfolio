"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { addProjectAction, updateProjectAction, deleteProjectAction } from "@/app/portfolio-actions"
import type { Project } from "@/lib/portfolio-db"
import { FolderOpen, Plus, Edit, Trash2, ExternalLink, Github } from "lucide-react"
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

interface ProjectsManagerProps {
  projects: Project[]
}

const gradientOptions = [
  { value: "from-blue-500 to-purple-600", label: "Blue to Purple" },
  { value: "from-green-500 to-teal-600", label: "Green to Teal" },
  { value: "from-orange-500 to-red-600", label: "Orange to Red" },
  { value: "from-purple-500 to-pink-600", label: "Purple to Pink" },
  { value: "from-indigo-500 to-blue-600", label: "Indigo to Blue" },
]

export function ProjectsManager({ projects }: ProjectsManagerProps) {
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)

    // Format metrics as JSON string
    const metricsData = [
      {
        label: formData.get("metric1_label") as string,
        value: formData.get("metric1_value") as string,
        icon: formData.get("metric1_icon") as string,
      },
      {
        label: formData.get("metric2_label") as string,
        value: formData.get("metric2_value") as string,
        icon: formData.get("metric2_icon") as string,
      },
      {
        label: formData.get("metric3_label") as string,
        value: formData.get("metric3_value") as string,
        icon: formData.get("metric3_icon") as string,
      },
    ].filter((metric) => metric.label && metric.value)

    // Add metrics as JSON string to formData
    formData.set("metrics", JSON.stringify(metricsData))

    const result = editingProject
      ? await updateProjectAction(editingProject.id, formData)
      : await addProjectAction(formData)

    if (result.success) {
      setEditingProject(null)
      setShowForm(false)
    }

    setIsSubmitting(false)
  }

  const handleDelete = async (id: string) => {
    await deleteProjectAction(id)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <FolderOpen className="h-5 w-5" />
                <span>Projects Management</span>
              </CardTitle>
              <CardDescription>Manage your portfolio projects and showcase your work</CardDescription>
            </div>
            <Button
              onClick={() => {
                setEditingProject(null)
                setShowForm(!showForm)
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </div>
        </CardHeader>

        {showForm && (
          <CardContent className="border-t">
            <form action={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h4 className="font-semibold">Project Details</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input id="title" name="title" defaultValue={editingProject?.title} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      rows={3}
                      defaultValue={editingProject?.description}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-4">
                <h4 className="font-semibold">Technology Stack</h4>
                <div className="space-y-2">
                  <Label htmlFor="tech">Technologies (comma-separated)</Label>
                  <Input
                    id="tech"
                    name="tech"
                    placeholder="Node.js, PostgreSQL, Redis, Docker, AWS"
                    defaultValue={editingProject?.tech.join(", ")}
                    required
                  />
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-4">
                <h4 className="font-semibold">Project Metrics</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="space-y-2 p-4 border rounded-lg">
                      <h5 className="font-medium">Metric {num}</h5>
                      <div className="space-y-2">
                        <Input
                          name={`metric${num}_label`}
                          placeholder="Label (e.g., Uptime)"
                          defaultValue={editingProject?.metrics[num - 1]?.label}
                        />
                        <Input
                          name={`metric${num}_value`}
                          placeholder="Value (e.g., 99.9%)"
                          defaultValue={editingProject?.metrics[num - 1]?.value}
                        />
                        <Input
                          name={`metric${num}_icon`}
                          placeholder="Icon (e.g., Shield)"
                          defaultValue={editingProject?.metrics[num - 1]?.icon}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links and Styling */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub URL</Label>
                  <Input id="github" name="github" type="url" defaultValue={editingProject?.github} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="demo">Demo URL</Label>
                  <Input id="demo" name="demo" type="url" defaultValue={editingProject?.demo} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gradient">Color Gradient</Label>
                  <Select name="gradient" defaultValue={editingProject?.gradient} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gradient" />
                    </SelectTrigger>
                    <SelectContent>
                      {gradientOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : editingProject ? "Update Project" : "Add Project"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingProject(null)
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

      {/* Projects List */}
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.id} className="group hover:shadow-lg transition-shadow">
            <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="mt-2 line-clamp-2">{project.description}</CardDescription>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingProject(project)
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
                        <AlertDialogTitle>Delete Project</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{project.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(project.id)}
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
              <div className="space-y-4">
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  {project.metrics.map((metric, i) => (
                    <div key={i}>
                      <div className="font-semibold">{metric.value}</div>
                      <div className="text-muted-foreground text-xs">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* Links */}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Demo
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Add your first project to showcase your work on your portfolio.
            </p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Project
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
