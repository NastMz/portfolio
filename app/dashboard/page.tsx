import { Suspense } from "react"
import { fetchPortfolioData } from "@/app/portfolio-actions"
import { PersonalInfoForm } from "@/components/personal-info-form"
import { SkillsManager } from "@/components/skills-manager"
import { ProjectsManager } from "@/components/projects-manager"
import { ExperienceManager } from "@/components/experience-manager"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, User, Code2, Briefcase, FolderOpen, BarChart3 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogoutButton } from "@/components/logout-button"

function DashboardSkeleton() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-96" />
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default async function DashboardPage() {
  const portfolioData = await fetchPortfolioData()

  const stats = {
    skills: portfolioData.skills.length,
    projects: portfolioData.projects.length,
    experience: portfolioData.experience.length,
    categories: [...new Set(portfolioData.skills.map((s) => s.category))].length,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Portfolio Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/">View Live Portfolio</Link>
            </Button>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8">
        <div className="space-y-2 mb-8">
          <h2 className="text-3xl font-bold tracking-tighter">Portfolio Content Manager</h2>
          <p className="text-muted-foreground">
            Update your portfolio content - changes appear immediately on your live site.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Code2 className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{stats.skills}</div>
                  <div className="text-sm text-muted-foreground">Skills</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FolderOpen className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">{stats.projects}</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">{stats.experience}</div>
                  <div className="text-sm text-muted-foreground">Jobs</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold">{stats.categories}</div>
                  <div className="text-sm text-muted-foreground">Categories</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Suspense fallback={<DashboardSkeleton />}>
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Personal Info</span>
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex items-center space-x-2">
                <Code2 className="h-4 w-4" />
                <span>Skills ({stats.skills})</span>
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center space-x-2">
                <FolderOpen className="h-4 w-4" />
                <span>Projects ({stats.projects})</span>
              </TabsTrigger>
              <TabsTrigger value="experience" className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4" />
                <span>Experience ({stats.experience})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <PersonalInfoForm personalInfo={portfolioData.personalInfo} />
            </TabsContent>

            <TabsContent value="skills">
              <SkillsManager skills={portfolioData.skills} />
            </TabsContent>

            <TabsContent value="projects">
              <ProjectsManager projects={portfolioData.projects} />
            </TabsContent>

            <TabsContent value="experience">
              <ExperienceManager experience={portfolioData.experience} />
            </TabsContent>
          </Tabs>
        </Suspense>
      </div>
    </div>
  )
}
