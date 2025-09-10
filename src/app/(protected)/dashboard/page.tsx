import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/MainDashboard/Header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const MainDashboardPage = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header/>
        <section className="min-h-screen p-4"></section>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default MainDashboardPage


