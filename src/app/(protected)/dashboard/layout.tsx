import { AppSidebar } from '@/components/layouts/app-sidebar'
import Header from '@/components/layouts/Header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

const DashboardLayout = ({children}:{children: React.ReactNode}) => {
  return (
     <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header/>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout