import Features from "@/components/hero/Features"
import Footer from "@/components/layouts/Footer"
import Hero from "@/components/hero/Hero"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <Features />
      <Footer />
    </main>
  )
}


