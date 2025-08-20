"use client"

import { useState } from "react"
import { ElementForm } from "@/components/element-form"
import { ElementList } from "@/components/element-list"
import type { Element } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Settings, Plus, BarChart3, Component, FileText, Zap } from "lucide-react"

interface DashboardContentProps {
  initialElements: Element[]
}

export function DashboardContent({ initialElements }: DashboardContentProps) {
  const [elements] = useState<Element[]>(initialElements)
  const [editingElement, setEditingElement] = useState<Element | null>(null)
  const [showForm, setShowForm] = useState(false)

  const handleEdit = (element: Element) => {
    setEditingElement(element)
    setShowForm(true)
  }

  const handleFormSuccess = () => {
    setEditingElement(null)
    setShowForm(false)
    // The page will automatically revalidate due to server actions
  }

  const stats = {
    total: elements.length,
    active: elements.filter((e) => e.status === "active").length,
    development: elements.filter((e) => e.status === "development").length,
    components: elements.filter((e) => e.type === "component").length,
    pages: elements.filter((e) => e.type === "page").length,
    features: elements.filter((e) => e.type === "feature").length,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>
          <Button
            onClick={() => {
              setEditingElement(null)
              setShowForm(!showForm)
            }}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Element
          </Button>
        </div>
      </header>

      <div className="container mx-auto py-8 space-y-8">
        {/* Page Title */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter">Element Management</h2>
          <p className="text-muted-foreground">
            Manage your application elements, components, and features from this dashboard.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Elements</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                {stats.active} active, {stats.development} in development
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Components</CardTitle>
              <Component className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.components}</div>
              <p className="text-xs text-muted-foreground">Reusable UI components</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pages</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pages}</div>
              <p className="text-xs text-muted-foreground">Application pages</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Features</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.features}</div>
              <p className="text-xs text-muted-foreground">Application features</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form Section */}
          {showForm && (
            <div className="lg:col-span-1">
              <ElementForm element={editingElement || undefined} onSuccess={handleFormSuccess} />
            </div>
          )}

          {/* Elements List */}
          <div className={showForm ? "lg:col-span-1" : "lg:col-span-2"}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Elements</h3>
                <div className="flex space-x-2">
                  <Badge variant="secondary">{elements.length} total</Badge>
                </div>
              </div>
              <ElementList elements={elements} onEdit={handleEdit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
