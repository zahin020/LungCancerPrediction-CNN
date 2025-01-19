'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Heart, Calendar, TreesIcon as Lungs } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

export default function ProgressTrackingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [appointmentDate, setAppointmentDate] = useState('')
  const [appointmentReason, setAppointmentReason] = useState('')
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

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Appointment Scheduled",
      description: `Your appointment has been scheduled for ${appointmentDate}.`,
    })
    setAppointmentDate('')
    setAppointmentReason('')
  }

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  }

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    hover: { 
      scale: 1.05, 
      boxShadow: "0px 0px 8px rgb(59, 130, 246)",
      transition: { duration: 0.3 } 
    }
  }

  const floatingCellVariants = {
    animate: {
      y: ["0%", "100%"],
      opacity: [0.7, 0],
      transition: {
        y: { duration: 10, ease: "linear", repeat: Infinity },
        opacity: { duration: 10, ease: "linear", repeat: Infinity },
      }
    }
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-purple-900 text-white flex flex-col relative overflow-hidden"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      {/* Interactive Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <motion.div 
          className="absolute inset-0"
          animate={{
            backgroundPosition: `${mousePosition.x / 5}px ${mousePosition.y / 5}px`
          }}
          style={{
            backgroundImage: 'url("/cell-pattern.svg")',
            backgroundSize: '200px 200px',
          }}
        />
        {[...Array(20)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-4 h-4 bg-blue-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-5%`,
            }}
            variants={floatingCellVariants}
            animate="animate"
            custom={index}
          />
        ))}
      </div>

      <header className="bg-black/60 backdrop-blur-md shadow-lg py-4 px-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.h1 
            className="text-2xl font-bold text-blue-400"
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
              className="text-blue-300 hover:text-blue-200 hover:bg-blue-800/50"
              onClick={() => router.push('/patient-dashboard')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </motion.div>
        </div>
      </header>

      <main className="flex-grow p-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-8">
          <motion.h2 
            className="text-4xl font-bold text-blue-300 mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Health Management
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {/* Healthcare Tips */}
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="bg-blue-900/30 backdrop-blur-md border-blue-400/50 overflow-hidden h-full">
                <CardHeader className="bg-blue-800/50 text-white p-6">
                  <CardTitle className="text-2xl font-semibold flex items-center">
                    <Heart className="mr-2 h-6 w-6 text-blue-300" />
                    Healthcare Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <ul className="list-disc list-inside text-blue-100 space-y-2">
                    {[
                      "Maintain a balanced diet rich in fruits and vegetables",
                      "Exercise regularly, aiming for at least 30 minutes a day",
                      "Get adequate sleep, 7-9 hours per night",
                      "Stay hydrated by drinking plenty of water",
                      "Avoid smoking and limit alcohol consumption",
                      "Practice stress-reduction techniques like meditation"
                    ].map((tip, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: 0.2 + index * 0.1 }}
                      >
                        {tip}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Appointment Scheduling */}
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="bg-blue-900/30 backdrop-blur-md border-blue-400/50 overflow-hidden h-full">
                <CardHeader className="bg-blue-800/50 text-white p-6">
                  <CardTitle className="text-2xl font-semibold flex items-center">
                    <Calendar className="mr-2 h-6 w-6 text-blue-300" />
                    Schedule Appointment
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <form onSubmit={handleAppointmentSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="appointment-date" className="text-blue-200">Preferred Date</Label>
                      <Input
                        id="appointment-date"
                        type="date"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        required
                        className="bg-blue-800/50 text-white border-blue-400/50 focus:border-blue-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="appointment-reason" className="text-blue-200">Reason for Visit</Label>
                      <Textarea
                        id="appointment-reason"
                        value={appointmentReason}
                        onChange={(e) => setAppointmentReason(e.target.value)}
                        required
                        className="bg-blue-800/50 text-white border-blue-400/50 focus:border-blue-300"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300">
                      Schedule Appointment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Lung Cancer Symptoms */}
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="bg-blue-900/30 backdrop-blur-md border-blue-400/50 overflow-hidden h-full">
                <CardHeader className="bg-blue-800/50 text-white p-6">
                  <CardTitle className="text-2xl font-semibold flex items-center">
                    <Lungs className="mr-2 h-6 w-6 text-blue-300" />
                    Lung Cancer Symptoms
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <ul className="list-disc list-inside text-blue-100 space-y-2">
                    {[
                      "Persistent cough that worsens over time",
                      "Coughing up blood or rust-colored sputum",
                      "Chest pain that worsens with deep breathing or coughing",
                      "Hoarseness or changes in voice",
                      "Shortness of breath or wheezing",
                      "Recurring respiratory infections",
                      "Unexplained weight loss or fatigue"
                    ].map((symptom, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: 0.2 + index * 0.1 }}
                      >
                        {symptom}
                      </motion.li>
                    ))}
                  </ul>
                  <motion.p 
                    className="text-sm text-blue-200 mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    If you experience any of these symptoms, please consult with your healthcare provider immediately.
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <footer className="bg-black/60 backdrop-blur-md shadow-lg mt-auto py-4 px-6 relative z-10">
        <motion.div 
          className="max-w-7xl mx-auto text-center text-blue-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          © 2025 CancerCare Health Management. All rights reserved.
        </motion.div>
      </footer>
    </motion.div>
  )
}

