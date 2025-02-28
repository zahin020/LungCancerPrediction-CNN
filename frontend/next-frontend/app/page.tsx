"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion} from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { HeartPulse, Dna, TrendingUp, Microscope, Phone, Mail, MapPin, Menu, Brain, Activity, Link } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function HomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const homeRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const researchRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  // const { scrollYProgress } = useScroll()
  // const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  const handleSignIn = () => {
    setIsLoading(true)
    router.push("/role-selection")
  }

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    const sections = [homeRef, aboutRef, researchRef, contactRef]
    sections.forEach((section) => {
      if (section.current) {
        observer.observe(section.current)
      }
    })

    return () => {
      sections.forEach((section) => {
        if (section.current) {
          observer.unobserve(section.current)
        }
      })
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-black text-white overflow-x-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900/20 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent pointer-events-none" />

      <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.span
              className="text-2xl font-bold tracking-wider text-blue-500"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              CancerCare
            </motion.span>
            <div className="hidden md:flex space-x-6">
              {["home", "about", "research", "contact"].map((section) => (
                <motion.button
                  key={section}
                  onClick={() =>
                    scrollToSection(
                      section === "home"
                        ? homeRef
                        : section === "about"
                          ? aboutRef
                          : section === "research"
                            ? researchRef
                            : contactRef,
                    )
                  }
                  className={`px-4 py-2 text-lg font-medium border border-blue-500/50 rounded-md hover:bg-blue-500/20 transition-colors ${
                    activeSection === section ? "text-blue-500 border-blue-500" : "text-white border-transparent"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </motion.button>
              ))}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleSignIn}
                  disabled={isLoading}
                  className="bg-blue-500 text-white hover:bg-blue-600 border border-blue-400"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </motion.div>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-black text-white">
                <div className="flex flex-col space-y-4 mt-8">
                  {["home", "about", "research", "contact"].map((section) => (
                    <motion.button
                      key={section}
                      onClick={() =>
                        scrollToSection(
                          section === "home"
                            ? homeRef
                            : section === "about"
                              ? aboutRef
                              : section === "research"
                                ? researchRef
                                : contactRef,
                        )
                      }
                      className="text-left hover:text-blue-500 transition-colors"
                      whileHover={{ scale: 1.05, x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </motion.button>
                  ))}
                  <Button
                    variant="outline"
                    onClick={handleSignIn}
                    disabled={isLoading}
                    className="bg-blue-500 text-white hover:bg-blue-600"
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section
          id="home"
          ref={homeRef}
          className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden"
        >
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-blue-500/20" />
          <div className="container mx-auto px-6 relative z-30">
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 text-center text-white"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Cancer<span className="text-blue-500">Care</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-center text-gray-300 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Pioneering Lung Cancer Detection and Compassionate Care with Cutting-edge AI Technology
            </motion.p>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <FeatureCard icon={HeartPulse} title="Compassionate Care" />
              <FeatureCard icon={Dna} title="Genetic Analysis" />
              <FeatureCard icon={TrendingUp} title="AI-Driven Insights" />
              <FeatureCard icon={Microscope} title="Advanced Diagnostics" />
            </motion.div>
          </div>
        </section>

        {/* About Us Section */}
        <section
          id="about"
          ref={aboutRef}
          className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden"
        >
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-blue-500/20" />
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.h2
              className="text-4xl font-bold text-blue-500 mb-8 text-center"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              About CancerCare
            </motion.h2>
            <div className="space-y-6 text-gray-300">
              {[
                "CancerCare is at the forefront of lung cancer detection and treatment. Our mission is to empower healthcare professionals with cutting-edge AI technology and foster collaboration among experts to provide the best possible care for cancer patients.",
                "We envision a world where early detection and personalized treatment plans significantly improve the outcomes for lung cancer patients. By combining advanced technology with compassionate care, we aim to transform the landscape of cancer management.",
                "Our diverse team of oncologists, radiologists, AI specialists, and healthcare innovators ensures that we're always at the cutting edge of cancer care, providing the most effective solutions for healthcare professionals and their patients.",
              ].map((text, index) => (
                <motion.p
                  key={index}
                  className="text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </div>
        </section>

        {/* Research/Team Section */}
        <section
          id="research"
          ref={researchRef}
          className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden"
        >
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-blue-500/20" />
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.h2
              className="text-4xl font-bold text-blue-500 mb-8 text-center"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Our Research Team
            </motion.h2>
            <motion.p
              className="text-lg leading-relaxed text-gray-300 text-center mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Meet our dedicated team of experts working at the intersection of healthcare and technology, pushing the
              boundaries of innovation in cancer detection and treatment.
            </motion.p>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-blue-500/30 transition-all duration-300 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/10">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src="/team/ai-developer.jpeg"
                      alt="AI Developer"
                      width={400}
                      height={400}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">AI Developer</h3>
                    <p className="text-gray-300 mb-4">
                      Specializing in developing advanced AI models for cancer prediction and analysis using machine
                      learning algorithms.
                    </p>
                    <div className="flex items-center text-blue-300/70 text-sm">
                      <Brain className="w-4 h-4 mr-2" />
                      <span>AI Model Development</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-blue-500/30 transition-all duration-300 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/10">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src="/team/iot-developer.jpeg"
                      alt="IoT Developer"
                      width={400}
                      height={400}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">IoT Developer</h3>
                    <p className="text-gray-300 mb-4">
                      Creating innovative IoT systems for real-time heart rate monitoring and health data analysis.
                    </p>
                    <div className="flex items-center text-blue-300/70 text-sm">
                      <Activity className="w-4 h-4 mr-2" />
                      <span>IoT Health Systems</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-blue-500/30 transition-all duration-300 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/10">
                  <div className="aspect-square overflow-hidden bg-blue-900/20">
                    <Image
                      src="/team/blockchain-developer.jpeg"
                      alt="Blockchain Developer"
                      width={400}
                      height={400}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">Blockchain Developer</h3>
                    <p className="text-gray-300 mb-4">
                      Implementing secure blockchain solutions for medical data management and patient privacy.
                    </p>
                    <div className="flex items-center text-blue-300/70 text-sm">
                      <Link className="w-4 h-4 mr-2" />
                      <span>Blockchain Integration</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          ref={contactRef}
          className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden"
        >
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-blue-500/20" />
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.h2
              className="text-4xl font-bold text-blue-500 mb-8 text-center"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Contact Us
            </motion.h2>
            <motion.p
              className="text-lg text-gray-300 text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              We are here to answer any questions you may have about CancerCare. Please fill out the form below, and
              we will get back to you as soon as possible.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900 border-blue-500">
                <CardContent className="p-6">
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                        Name
                      </label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="mt-1 w-full bg-gray-800 text-white border-gray-700"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                        Email
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="mt-1 w-full bg-gray-800 text-white border-gray-700"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        className="mt-1 w-full bg-gray-800 text-white border-gray-700"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-blue-500 mb-6">Other Ways to Reach Us</h3>
              <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 text-gray-300">
                <div className="flex items-center justify-center">
                  <Phone className="mr-2 text-blue-500" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center justify-center">
                  <Mail className="mr-2 text-blue-500" />
                  <span>info@cancercare.com</span>
                </div>
                <div className="flex items-center justify-center">
                  <MapPin className="mr-2 text-blue-500" />
                  <span>123 Healthcare Ave, Medical City, MC 12345</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-black/50 backdrop-blur-sm py-6 relative z-10 border-t border-blue-500/20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500">© 2025 CancerCare. All rights reserved.</p>
          <div className="mt-2">
            <a href="#" className="text-blue-500 hover:text-blue-400 mx-2 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-400 mx-2 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card className="bg-gray-900/50 backdrop-blur-sm hover:bg-gray-800/50 transition-colors border-blue-500">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Icon className="text-4xl text-blue-500 mb-4" />
          <h3 className="font-semibold text-white">{title}</h3>
        </CardContent>
      </Card>
    </motion.div>
  )
}

