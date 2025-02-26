import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

export default function DashboardLayout() {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Toaster />
            <Outlet />
          </main>
           <Footer/>
        </div>
      </body>
    </html>
  )
}
