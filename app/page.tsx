"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Code2,
  Database,
  Server,
  Cloud,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  MapPin,
  Calendar,
  Zap,
  Globe,
  Users,
  TrendingUp,
  Award,
  Coffee,
  Rocket,
  Shield,
  Activity,
  BarChart3,
  Clock,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function Portfolio() {
  const technicalSkills = {
    "Languages & Runtime": [
      { name: "Node.js", experience: "5+ years", projects: "25+ projects", icon: "🟢" },
      { name: "Python", experience: "4+ years", projects: "20+ projects", icon: "🐍" },
      { name: "Go", experience: "2+ years", projects: "8+ projects", icon: "🔵" },
      { name: "Java", experience: "3+ years", projects: "15+ projects", icon: "☕" },
    ],
    Databases: [
      { name: "PostgreSQL", experience: "5+ years", projects: "Production scale", icon: "🐘" },
      { name: "MongoDB", experience: "4+ years", projects: "High-volume apps", icon: "🍃" },
      { name: "Redis", experience: "3+ years", projects: "Caching & sessions", icon: "🔴" },
      { name: "ClickHouse", experience: "2+ years", projects: "Analytics systems", icon: "📊" },
    ],
    "Cloud & DevOps": [
      { name: "AWS", experience: "4+ years", projects: "Multi-region deployments", icon: "☁️" },
      { name: "Docker", experience: "5+ years", projects: "Container orchestration", icon: "🐳" },
      { name: "Kubernetes", experience: "3+ years", projects: "Production clusters", icon: "⚙️" },
      { name: "Terraform", experience: "2+ years", projects: "Infrastructure as code", icon: "🏗️" },
    ],
    "Architecture & APIs": [
      { name: "Microservices", experience: "4+ years", projects: "Enterprise systems", icon: "🔗" },
      { name: "REST APIs", experience: "6+ years", projects: "100+ endpoints", icon: "🌐" },
      { name: "GraphQL", experience: "3+ years", projects: "Real-time apps", icon: "📡" },
      { name: "Event-Driven", experience: "3+ years", projects: "Message queues", icon: "⚡" },
    ],
  }

  const stats = [
    { label: "Years Experience", value: "6+", icon: Calendar, color: "text-blue-600 dark:text-blue-400" },
    { label: "Projects Completed", value: "50+", icon: CheckCircle, color: "text-green-600 dark:text-green-400" },
    { label: "APIs Built", value: "100+", icon: Globe, color: "text-purple-600 dark:text-purple-400" },
    { label: "Daily Requests Handled", value: "10M+", icon: Activity, color: "text-orange-600 dark:text-orange-400" },
  ]

  const projects = [
    {
      title: "E-commerce API Platform",
      description:
        "Scalable microservices architecture handling 10M+ requests daily with real-time inventory management and payment processing.",
      tech: ["Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
      metrics: [
        { label: "Uptime", value: "99.9%", icon: Shield },
        { label: "Response Time", value: "<200ms", icon: Zap },
        { label: "Daily Users", value: "500K+", icon: Users },
      ],
      github: "#",
      demo: "#",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      title: "Real-time Analytics Engine",
      description:
        "High-performance data processing pipeline using Apache Kafka and ClickHouse for real-time business intelligence.",
      tech: ["Python", "Kafka", "ClickHouse", "Kubernetes"],
      metrics: [
        { label: "Data Processed", value: "1TB/day", icon: BarChart3 },
        { label: "Processing Speed", value: "10K/sec", icon: TrendingUp },
        { label: "Accuracy", value: "99.8%", icon: Award },
      ],
      github: "#",
      demo: "#",
      gradient: "from-green-500 to-teal-600",
    },
    {
      title: "Authentication Service",
      description:
        "OAuth 2.0 and JWT-based authentication microservice with multi-tenant support and advanced security features.",
      tech: ["Go", "PostgreSQL", "Redis", "Docker"],
      metrics: [
        { label: "Active Users", value: "500K+", icon: Users },
        { label: "Security Score", value: "A+", icon: Shield },
        { label: "Login Speed", value: "<100ms", icon: Clock },
      ],
      github: "#",
      demo: "#",
      gradient: "from-orange-500 to-red-600",
    },
  ]

  const experience = [
    {
      title: "Senior Backend Engineer",
      company: "TechCorp Inc.",
      period: "2022 - Present",
      location: "San Francisco, CA",
      achievements: [
        "Led migration to microservices architecture, reducing deployment time by 60%",
        "Optimized database queries resulting in 40% performance improvement",
        "Mentored 5 junior developers and established code review processes",
      ],
      color: "border-l-blue-500",
    },
    {
      title: "Backend Developer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      location: "Remote",
      achievements: [
        "Built scalable API infrastructure serving 1M+ daily active users",
        "Implemented CI/CD pipelines reducing bug reports by 50%",
        "Designed and developed real-time notification system",
      ],
      color: "border-l-green-500",
    },
    {
      title: "Software Engineer",
      company: "DevSolutions",
      period: "2018 - 2020",
      location: "New York, NY",
      achievements: [
        "Developed RESTful APIs and GraphQL endpoints",
        "Integrated third-party payment systems and APIs",
        "Optimized application performance and database operations",
      ],
      color: "border-l-purple-500",
    },
  ]

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <div className="relative">
                <Code2 className="h-8 w-8 text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <span className="font-bold text-lg">Alex Johnson</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="#about" className="transition-colors hover:text-primary">
              About
            </Link>
            <Link href="#skills" className="transition-colors hover:text-primary">
              Skills
            </Link>
            <Link href="#projects" className="transition-colors hover:text-primary">
              Projects
            </Link>
            <Link href="#experience" className="transition-colors hover:text-primary">
              Experience
            </Link>
            <Link href="#contact" className="transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10">
              <Link href="https://github.com" target="_blank">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10">
              <Link href="https://linkedin.com" target="_blank">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent dark:from-primary/5" />
        <div className="container relative py-32 md:py-40">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl" />
              <div className="relative bg-background border-2 border-primary/20 rounded-full p-6 shadow-2xl dark:shadow-primary/10">
                <Server className="h-16 w-16 text-primary" />
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                Backend Developer
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
                Building scalable, high-performance server-side applications and APIs that power modern web experiences.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="text-center border-0 bg-background/50 backdrop-blur shadow-lg dark:bg-background/20 dark:shadow-primary/5"
                >
                  <CardContent className="pt-6">
                    <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center space-x-2">
                <Coffee className="h-4 w-4 text-primary" />
                <span>Available for hire</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg"
              >
                <Link href="#projects">
                  <Rocket className="h-4 w-4 mr-2" />
                  View Projects
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-primary/20 hover:bg-primary/5 bg-transparent"
              >
                <Link href="#contact">Get In Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">About Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                I'm a passionate backend developer with over 6 years of experience building robust, scalable server-side
                applications. I specialize in designing and implementing high-performance APIs, microservices
                architectures, and distributed systems that can handle millions of requests per day.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                My expertise spans across multiple programming languages and technologies, with a strong focus on
                cloud-native solutions, database optimization, and system architecture.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="px-3 py-1 bg-primary/10 text-primary border-primary/20">
                  <Code2 className="h-3 w-3 mr-1" />
                  Clean Code
                </Badge>
                <Badge
                  variant="secondary"
                  className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                >
                  <Database className="h-3 w-3 mr-1" />
                  Database Expert
                </Badge>
                <Badge
                  variant="secondary"
                  className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                >
                  <Cloud className="h-3 w-3 mr-1" />
                  Cloud Native
                </Badge>
                <Badge
                  variant="secondary"
                  className="px-3 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
                >
                  <Users className="h-3 w-3 mr-1" />
                  Team Lead
                </Badge>
              </div>
            </div>

            <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-0 shadow-lg dark:from-primary/10 dark:to-secondary/10">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Performance Optimization</div>
                    <div className="text-sm text-muted-foreground">40% average improvement</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="font-semibold">System Reliability</div>
                    <div className="text-sm text-muted-foreground">99.9% uptime achieved</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="font-semibold">Team Leadership</div>
                    <div className="text-sm text-muted-foreground">Mentored 15+ developers</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-gradient-to-br from-muted/30 to-background dark:from-muted/10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Technical Expertise</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
            <p className="text-muted-foreground mt-4">Real-world experience with production systems</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {Object.entries(technicalSkills).map(([category, skills]) => (
              <Card
                key={category}
                className="p-6 hover:shadow-lg transition-all duration-300 dark:hover:shadow-primary/5 border-border/50"
              >
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-2 h-8 bg-gradient-to-b from-primary to-secondary rounded-full" />
                    <span>{category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors dark:bg-muted/20 dark:hover:bg-muted/30"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{skill.icon}</span>
                        <div>
                          <div className="font-semibold">{skill.name}</div>
                          <div className="text-sm text-muted-foreground">{skill.experience}</div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                        {skill.projects}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Key Achievements */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border-blue-200 dark:border-blue-800/50">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Database Optimization</h3>
              <p className="text-sm text-muted-foreground">
                Reduced query response times from seconds to milliseconds across multiple production systems
              </p>
            </Card>

            <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 border-green-200 dark:border-green-800/50">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Scalability Expert</h3>
              <p className="text-sm text-muted-foreground">
                Architected systems handling millions of concurrent users with auto-scaling capabilities
              </p>
            </Card>

            <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 border-purple-200 dark:border-purple-800/50">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Security Focus</h3>
              <p className="text-sm text-muted-foreground">
                Implemented enterprise-grade security measures including OAuth, JWT, and data encryption
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 dark:hover:shadow-primary/10 border-border/50"
              >
                <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="group-hover:text-primary transition-colors">{project.title}</CardTitle>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10"
                      >
                        <Link href={project.github} target="_blank">
                          <Github className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10"
                      >
                        <Link href={project.demo} target="_blank">
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs border-primary/20 hover:bg-primary/5">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="text-center">
                        <metric.icon className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                        <div className="text-sm font-semibold">{metric.value}</div>
                        <div className="text-xs text-muted-foreground">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-gradient-to-br from-muted/30 to-background dark:from-muted/10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Work Experience</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary" />

            <div className="space-y-12">
              {experience.map((job, index) => (
                <div key={index} className="relative flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-background border-4 border-primary/20 rounded-full flex items-center justify-center shadow-lg dark:shadow-primary/10">
                    <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full" />
                  </div>

                  <Card
                    className={`flex-1 border-l-4 ${job.color} hover:shadow-lg transition-shadow dark:hover:shadow-primary/5 border-border/50`}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          <CardDescription className="text-base font-medium text-primary">
                            {job.company}
                          </CardDescription>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <div className="font-medium">{job.period}</div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{job.location}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {job.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start space-x-3">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-16">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Let's Build Something Amazing</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6" />
            <p className="text-muted-foreground text-lg">
              I'm always interested in discussing new opportunities, challenging projects, or just connecting with
              fellow developers.
            </p>
          </div>

          <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-0 shadow-lg dark:from-primary/10 dark:to-secondary/10">
            <div className="flex justify-center space-x-4 mb-8">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg"
              >
                <Link href="mailto:alex.johnson@email.com">
                  <Mail className="h-5 w-5 mr-2" />
                  Send Email
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-primary/20 hover:bg-primary/5 bg-transparent"
              >
                <Link href="https://linkedin.com" target="_blank">
                  <Linkedin className="h-5 w-5 mr-2" />
                  LinkedIn
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-primary/20 hover:bg-primary/5 bg-transparent"
              >
                <Link href="https://github.com" target="_blank">
                  <Github className="h-5 w-5 mr-2" />
                  GitHub
                </Link>
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>Usually responds within 24 hours</p>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 dark:bg-muted/10 border-border/50">
        <div className="container py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center space-x-2">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="font-semibold">Alex Johnson</span>
            </div>
            <p className="text-sm text-muted-foreground">Built with Next.js, Tailwind CSS, and lots of ☕ © 2024</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
