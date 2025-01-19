'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { UserCircle, LineChart, ArrowLeft, FileText, Activity, Calendar, MessageSquare, LucideIcon } from 'lucide-react'
// import { useEffect, useState } from 'react'

interface ProfileItemProps {
  icon: LucideIcon;
  text: string;
}

function ProfileItem({ icon: Icon, text }: ProfileItemProps) {
  return (
    <motion.div 
      className="flex items-center space-x-3 text-gray-300"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Icon className="h-5 w-5 text-blue-400" />
      <span>{text}</span>
    </motion.div>
  );
}

export default function PatientDashboardPage() {
  const router = useRouter()
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // useEffect(() => {
  //   const handleMouseMove = (e: MouseEvent) => {
  //     setMousePosition({ x: e.clientX, y: e.clientY })
  //   }
  //   window.addEventListener('mousemove', handleMouseMove)
  //   return () => window.removeEventListener('mousemove', handleMouseMove)
  // }, [])

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"
          style={{
            backgroundSize: '400% 400%',
            animation: 'gradientAnimation 15s ease infinite',
          }}
        />
      </div>

      <header className="bg-black/60 backdrop-blur-md shadow-lg py-4 px-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.h1 
            className="text-2xl font-bold text-blue-500"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            CancerCare
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button 
              variant="ghost" 
              className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/50"
              onClick={() => router.push('/role-selection')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Role Selection
            </Button>
          </motion.div>
        </div>
      </header>

      <main className="flex-grow p-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-6">
          <motion.h2 
            className="text-3xl font-bold text-blue-500 mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Patient Dashboard
          </motion.h2>
          <motion.div {...fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardCard
              title="Medical Profile"
              icon={UserCircle}
              items={[
                { icon: FileText, text: "Personal Information" },
                { icon: Activity, text: "Medical History" },
                { icon: MessageSquare, text: "Risk Analysis" },
                { icon: Calendar, text: "Allergies and Conditions" },
              ]}
              buttonText="Access Medical Profile"
              onClick={() => router.push('/medical-profile')}
            />
            <DashboardCard
              title="Progress Tracking"
              icon={LineChart}
              items={[
                { icon: Activity, text: "Healthcare Tips" },
                { icon: LineChart, text: "Treatment Progress" },
                { icon: Calendar, text: "Appointment Schedule" },
                { icon: FileText, text: "Lung Cancer Symptoms" },
              ]}
              buttonText="View Progress Tracking"
              onClick={() => router.push('/progress-tracking')}
            />
          </motion.div>
        </div>
      </main>

      <footer className="bg-black/60 backdrop-blur-md shadow-lg mt-auto py-4 px-6 relative z-10">
        <motion.div 
          className="max-w-7xl mx-auto text-center text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          © 2025 CancerCare Patient Dashboard. All rights reserved.
        </motion.div>
      </footer>
    </div>
  )
}

interface DashboardCardProps {
  title: string;
  icon: LucideIcon;
  items: { icon: LucideIcon; text: string }[];
  buttonText: string;
  onClick: () => void;
}

function DashboardCard({ title, icon: Icon, items, buttonText, onClick }: DashboardCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className="bg-gray-900/30 backdrop-blur-sm border-blue-500/50 overflow-hidden h-full flex flex-col">
        <CardHeader className="bg-blue-900/30 text-white p-6">
          <CardTitle className="text-2xl font-semibold flex items-center">
            <Icon className="mr-2 h-6 w-6 text-blue-400" />
            {title}
          </CardTitle>
          <CardDescription className="text-blue-200 mt-2">
            Manage your {title.toLowerCase()}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4 flex-grow">
          {items.map((item, index) => (
            <ProfileItem key={index} icon={item.icon} text={item.text} />
          ))}
        </CardContent>
        <motion.div
          className="p-6 bg-blue-900/20"
          whileHover={{ backgroundColor: 'rgba(30, 64, 175, 0.3)' }}
        >
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors py-6" 
            size="lg"
            onClick={onClick}
          >
            {buttonText}
          </Button>
        </motion.div>
      </Card>
    </motion.div>
  )
}
