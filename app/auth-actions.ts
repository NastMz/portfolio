"use server"

import { createSession, deleteSession, validateCredentials } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  if (!username || !password) {
    return { error: "Username and password are required" }
  }

  if (!validateCredentials(username, password)) {
    return { error: "Invalid username or password" }
  }

  await createSession(username, "admin")
  redirect("/dashboard")
}

export async function logoutAction() {
  await deleteSession()
  redirect("/login")
}
