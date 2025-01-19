'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowLeft, UserCircle, Stethoscope, Activity, Users, Brain } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function RoleSelectionPage() {
  const router = useRouter()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleRoleSelection = (role: 'patient' | 'clinician') => {
    if (role === 'patient') {
      router.push('/patient-dashboard')
    } else {
      router.push('/upload-form')
    }
  }

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col relative overflow-hidden">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-br from-black to-blue-900"
        style={{
          backgroundPosition: `calc(50% + ${mousePosition.x * 0.02}px) calc(50% + ${mousePosition.y * 0.02}px)`,
          transition: 'background-position 0.2s ease-out',
        }}
      >
        <div className="absolute inset-0 opacity-20">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
      </div>

      <header className="w-full bg-black/60 backdrop-blur-md shadow-lg p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image src="/logo-placeholder.svg" alt="CancerCare Logo" width={40} height={40} />
            <h1 className="text-2xl font-bold text-blue-400">CancerCare</h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button 
              variant="ghost" 
              className="flex items-center text-blue-400 hover:text-blue-300 hover:bg-blue-900/50 transition-all duration-300"
              onClick={() => router.push('/')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </motion.div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-6xl">
          <motion.h2 
            className="text-5xl font-bold text-center text-blue-400 mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Choose Your Path
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <RoleCard
              title="Patient"
              description="Access your health journey"
              icon={UserCircle}
              color="blue"
              features={[
                { text: "View your medical profile", icon: Activity },
                // { text: "Track treatment progress", icon: ClipboardList },
                { text: "Connect with your care team", icon: Users }
              ]}
              onSelect={() => handleRoleSelection('patient')}
            />
            <RoleCard
              title="Clinician"
              description="Empower your practice"
              icon={Stethoscope}
              color="blue"
              features={[
                { text: "Analyze medical images", icon: Brain },
                { text: "Use AI-powered diagnostics", icon: Activity },
                // { text: "Manage patient care plans", icon: ClipboardList }
              ]}
              onSelect={() => handleRoleSelection('clinician')}
            />
          </div>
        </div>
      </main>

      <footer className="w-full bg-black/60 backdrop-blur-md shadow-lg p-4 mt-8 relative z-10">
        <motion.div 
          className="max-w-7xl mx-auto text-center text-blue-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          © 2025 CancerCare. All rights reserved.
        </motion.div>
      </footer>
    </div>
  )
}

interface RoleCardProps {
  title: string
  description: string
  icon: React.ElementType
  color: string
  features: { text: string; icon: React.ElementType }[]
  onSelect: () => void
}

function RoleCard({ title, description, icon: Icon, features, onSelect }: RoleCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card 
        className="bg-blue-900/20 backdrop-blur-md border-blue-400/50 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/20"
        onClick={onSelect}
      >
        <CardContent className="p-6">
          <motion.div 
            className="flex items-center mb-4"
            initial={false}
            animate={isHovered ? { y: -10 } : { y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-10 h-10 text-blue-400 mr-3" />
            <div>
              <h3 className="text-2xl font-bold text-blue-400">{title}</h3>
              <p className="text-blue-300">{description}</p>
            </div>
          </motion.div>
          <ul className="space-y-3">
            <AnimatePresence>
              {features.map((feature, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center text-blue-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <feature.icon className="w-5 h-5 mr-2 text-blue-400" />
                  {feature.text}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </CardContent>
        <CardFooter className="bg-blue-400/10 p-4">
          <motion.span 
            className="text-blue-300 font-semibold"
            initial={false}
            animate={isHovered ? { x: 10 } : { x: 0 }}
            transition={{ duration: 0.3 }}
          >
            Select Role →
          </motion.span>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

