import LoginForm from "@/components/auth/LoginForm"
import { Suspense } from "react"

export default function LoginPage() {
  return (
    <main className="min-h-screen grid place-items-center p-4">
      <Suspense fallback={<p>Loading...</p>}>
        <LoginForm />
      </Suspense>
    </main>
  )
}


