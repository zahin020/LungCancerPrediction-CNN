'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react'
import { makePrediction } from './api/predictionService'

type FormData = {
  YELLOW_FINGERS: number;
  ANXIETY: number;
  PEER_PRESSURE: number;
  CHRONIC_DISEASE: number;
  FATIGUE: number;
  ALLERGY: number;
  WHEEZING: number;
  ALCOHOL_CONSUMING: number;
  COUGHING: number;
  DIFFICULTY_SWALLOWING: number;
  CHEST_PAIN: number;
  ANXYELFIN: number;
  SWALLOWING_DIFFICULTY: number;
  name?: string;
  email?: string;
  dob?: string;
  gender?: string;
  medicalHistory?: string;
};

const questions = [
  { key: 'YELLOW_FINGERS', text: 'Do you have yellow fingers?' },
  { key: 'ANXIETY', text: 'Do you experience anxiety?' },
  { key: 'PEER_PRESSURE', text: 'Do you feel peer pressure?' },
  { key: 'CHRONIC_DISEASE', text: 'Do you have any chronic diseases?' },
  { key: 'FATIGUE', text: 'Do you often feel fatigue?' },
  { key: 'ALLERGY', text: 'Do you have any allergies?' },
  { key: 'WHEEZING', text: 'Do you experience wheezing?' },
  { key: 'ALCOHOL_CONSUMING', text: 'Do you consume alcohol?' },
  { key: 'COUGHING', text: 'Do you have a persistent cough?' },
  { key: 'DIFFICULTY_SWALLOWING', text: 'Do you have difficulty swallowing?' },
  { key: 'CHEST_PAIN', text: 'Do you experience chest pain?' },
  { key: 'ANXYELFIN', text: 'Do you have anxiety and yellow fingers at the same time?' },
  { key: 'SWALLOWING_DIFFICULTY', text: 'Do you have swallowing difficulty?' },
]

export default function MedicalProfilePage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    YELLOW_FINGERS: -1,
    ANXIETY: -1,
    PEER_PRESSURE: -1,
    CHRONIC_DISEASE: -1,
    FATIGUE: -1,
    ALLERGY: -1,
    WHEEZING: -1,
    ALCOHOL_CONSUMING: -1,
    COUGHING: -1,
    DIFFICULTY_SWALLOWING: -1,
    CHEST_PAIN: -1,
    ANXYELFIN: -1,
    SWALLOWING_DIFFICULTY: -1,
    name: '',
    email: '',
    dob: '',
    gender: '',
    medicalHistory: ''
  });
  const [isLoading, setIsLoading] = useState(false)
  const [prediction, setPrediction] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [currentSection, setCurrentSection] = useState('personal')
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: questions.map(q => q.key).includes(name) ? (value === 'yes' ? 1 : 0) : value,
    }))
  }

  const handleSubmit = async () => {
    // Check if all questions are answered
    const allAnswered = Object.values(formData).every(value => value !== -1);
    if (!allAnswered) {
      setError('Please answer all questions before submitting.');
      return;
    }

    setIsLoading(true)
    setError(null)
    try {
      const result = await makePrediction(formData)
      setPrediction(result)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to make prediction. Please try again.')
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    setScrollProgress((scrollTop / (scrollHeight - clientHeight)) * 100)
  }

  const progress = (Object.keys(formData).filter(key => 
    questions.map(q => q.key).includes(key) && formData[key as keyof FormData] !== -1
  ).length / questions.length) * 100;

  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const pageVariants = {
    initial: { opacity: 0, x: "-100%" },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: "100%" }
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-900 flex flex-col">
      <header className="bg-black/60 backdrop-blur-md shadow-lg py-4 px-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.h1 
            className="text-3xl font-bold text-blue-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            CancerCare
          </motion.h1>
          <Button 
            variant="ghost" 
            className="text-blue-300 hover:text-blue-200"
            onClick={() => router.push('/patient-dashboard')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-start p-4 md:p-8 overflow-hidden">
        <motion.div 
          className="w-full max-w-4xl bg-black/30 backdrop-blur-md rounded-lg shadow-xl overflow-hidden border border-blue-500/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-6 md:p-8">
            <motion.h2 
              className="text-3xl font-bold text-blue-400 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Medical Profile & Risk Assessment
            </motion.h2>
            <AnimatePresence mode='wait'>
              {currentSection === 'personal' && (
                <motion.div
                  key="personal"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <section className="space-y-6">
                    <h3 className="text-2xl font-semibold text-blue-300">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-blue-200">Full Name</Label>
                        <Input id="name" placeholder="John Doe" onChange={(e) => handleChange('name', e.target.value)} className="bg-blue-900/20 border-blue-500/30 text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-blue-200">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" onChange={(e) => handleChange('email', e.target.value)} className="bg-blue-900/20 border-blue-500/30 text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dob" className="text-blue-200">Date of Birth</Label>
                        <Input id="dob" type="date" onChange={(e) => handleChange('dob', e.target.value)} className="bg-blue-900/20 border-blue-500/30 text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender" className="text-blue-200">Gender</Label>
                        <Input id="gender" placeholder="Male/Female/Other" onChange={(e) => handleChange('gender', e.target.value)} className="bg-blue-900/20 border-blue-500/30 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="medical-history" className="text-blue-200">Medical History</Label>
                      <Textarea id="medical-history" placeholder="Please enter any relevant medical history..." onChange={(e) => handleChange('medicalHistory', e.target.value)} className="bg-blue-900/20 border-blue-500/30 text-white" />
                    </div>
                    <Button 
                      onClick={() => setCurrentSection('assessment')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg mt-4"
                    >
                      Continue to Risk Assessment
                    </Button>
                  </section>
                </motion.div>
              )}
              {currentSection === 'assessment' && (
                <motion.div
                  key="assessment"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <section className="space-y-6">
                    <h3 className="text-2xl font-semibold text-blue-300">Risk Assessment Questionnaire</h3>
                    <ScrollArea className="h-[60vh]" onScroll={handleScroll}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {questions.map(({ key, text }, index) => (
                          <motion.div 
                            key={key} 
                            className="space-y-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <Label htmlFor={key} className="text-blue-200">{text}</Label>
                            <RadioGroup
                              id={key}
                              onValueChange={(value) => handleChange(key, value)}
                              className="flex space-x-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id={`${key}-yes`} className="border-blue-500" />
                                <Label htmlFor={`${key}-yes`} className="text-blue-200">Yes</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id={`${key}-no`} className="border-blue-500" />
                                <Label htmlFor={`${key}-no`} className="text-blue-200">No</Label>
                              </div>
                            </RadioGroup>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-blue-300">Questionnaire Progress</span>
                        <span className="text-sm font-medium text-blue-400">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="w-full" />
                      <Button 
                        onClick={handleSubmit} 
                        disabled={progress < 100 || isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg"
                      >
                        {isLoading ? "Processing..." : "Analyze Risk"}
                      </Button>
                    </div>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {prediction && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8 p-6 bg-blue-900/30 border border-blue-500/30 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="text-green-400 w-6 h-6" />
                    <h4 className="text-xl font-semibold text-blue-300">Prediction Result</h4>
                  </div>
                  <p className="text-blue-200 mt-2">{prediction}</p>
                </motion.div>
              )}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8 p-6 bg-red-900/30 border border-red-500/30 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="text-red-400 w-6 h-6" />
                    <h4 className="text-xl font-semibold text-red-300">Error</h4>
                  </div>
                  <p className="text-red-200 mt-2">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>

      <footer className="bg-black/60 backdrop-blur-md shadow-lg py-4 px-6 mt-auto">
        <div className="max-w-7xl mx-auto text-center text-blue-300">
          © 2023 CancerCare. All rights reserved.
        </div>
      </footer>

      <motion.div 
        className="fixed top-0 left-0 h-1 bg-blue-500"
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.2 }}
      />
    </div>
  )
}
