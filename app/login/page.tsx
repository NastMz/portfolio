import { LoginForm } from "@/components/login-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"
import { isAuthenticated } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  // Redirect if already authenticated
  if (await isAuthenticated()) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/50">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Portfolio Admin</CardTitle>
            <CardDescription>Sign in to access the portfolio dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>

        {/* Development credentials info */}
        {process.env.NODE_ENV === "development" && (
          <Card className="mt-4 border-orange-200 bg-orange-50 dark:bg-orange-950/50 dark:border-orange-800">
            <CardContent className="pt-6">
              <div className="text-sm text-orange-800 dark:text-orange-200">
                <p className="font-semibold mb-2">Development Mode - Default Credentials:</p>
                <p>
                  Username: <code className="bg-orange-100 dark:bg-orange-900 px-1 rounded">admin</code>
                </p>
                <p>
                  Password: <code className="bg-orange-100 dark:bg-orange-900 px-1 rounded">admin123</code>
                </p>
                <p className="text-xs mt-2 opacity-75">Change these in production via environment variables</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
