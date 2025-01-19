'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, AlertCircle, FileImage, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [result, setResult] = useState<{ prediction: string, probability: number } | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select an image file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a lung image before uploading.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Dynamically determine the host (localhost or IP) of the frontend
      const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  
      // Construct the backend API URL using the dynamically detected host
      const apiUrl = `http://${host}:5000/upload`;
  
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1));
          setUploadProgress(percentCompleted);
        },
      });

      const { prediction, probability } = response.data;
      setResult({ prediction, probability });
      toast({
        title: "Analysis complete",
        description: "Your lung image has been successfully analyzed.",
        variant: "default",
      });
    } catch {
      toast({
        title: "Analysis failed",
        description: "There was an error processing your lung image. Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-purple-900 text-white flex flex-col">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: 'url("/lung-cells-bg.svg")',
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      <header className="bg-black/60 backdrop-blur-md shadow-lg py-4 px-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.h1 
            className="text-2xl font-bold text-blue-400"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Lung Cancer Image Analysis
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button 
              variant="ghost" 
              className="text-blue-300 hover:text-blue-200 hover:bg-blue-800/50"
              onClick={() => router.push('/role-selection')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Role Selection
            </Button>
          </motion.div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl"
        >
          <Card className="bg-blue-900/30 backdrop-blur-md border-blue-400/50 overflow-hidden">
            <CardContent className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Label htmlFor="image-upload" className="text-lg font-semibold text-blue-300">Select Lung Image</Label>
                  <div className="flex items-center space-x-4">
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button
                      onClick={() => document.getElementById('image-upload')?.click()}
                      variant="outline"
                      className="w-full py-8 text-lg font-semibold text-blue-300 border-2 border-blue-400/50 hover:bg-blue-800/50 transition-colors duration-300"
                    >
                      <FileImage className="w-6 h-6 mr-2" />
                      Choose File
                    </Button>
                  </div>
                  {file && (
                    <p className="text-sm text-blue-300 font-medium mt-2">
                      Selected file: {file.name}
                    </p>
                  )}
                  <p className="text-sm text-blue-300">
                    Accepted formats: JPEG, PNG, DICOM (for CT scans)
                  </p>
                </motion.div>
                <AnimatePresence>
                  {preview ? (
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Label className="text-lg font-semibold text-blue-300">Image Preview</Label>
                      <div className="relative aspect-square w-full border-2 border-blue-400/50 rounded-lg overflow-hidden bg-black/30">
                        <Image
                          src={preview || "/placeholder.svg"}
                          alt="Lung image preview"
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="flex items-center justify-center w-full h-64 border-2 border-blue-400/50 border-dashed rounded-lg bg-blue-900/30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-center">
                        <FileImage className="mx-auto h-16 w-16 text-blue-400" />
                        <p className="mt-2 text-sm text-blue-300">No image selected</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    onClick={handleUpload}
                    disabled={!file || isUploading}
                    className="w-full py-8 text-xl font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-6 w-6" />
                        Analyze Lung Image
                      </>
                    )}
                  </Button>
                </motion.div>
                <AnimatePresence>
                  {isUploading && (
                    <motion.div 
                      className="w-full space-y-2"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Progress value={uploadProgress} className="w-full h-2" />
                      <p className="text-center text-sm text-blue-300">
                        {uploadProgress}% complete
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {result && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Alert className={`${
                        result.prediction.toLowerCase().includes('malignant') 
                          ? 'bg-red-900/50 border-red-400/50 text-red-100' 
                          : 'bg-green-900/50 border-green-400/50 text-green-100'
                      }`}>
                        <AlertCircle className={`h-5 w-5 ${
                          result.prediction.toLowerCase().includes('malignant')
                            ? 'text-red-300'
                            : 'text-green-300'
                        }`} />
                        <AlertTitle className="text-lg font-semibold mb-2">
                          Analysis Result
                        </AlertTitle>
                        <AlertDescription>
                          <p><strong>Prediction:</strong> {result.prediction}</p>
                          <p><strong>Probability:</strong> {(result.probability * 100).toFixed(2)}%</p>
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <footer className="bg-black/60 backdrop-blur-md shadow-lg mt-auto py-4 px-6 relative z-10">
        <motion.div 
          className="max-w-7xl mx-auto text-center text-blue-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          © 2025 CancerCare Lung Image Analysis. All rights reserved.
        </motion.div>
      </footer>
    </div>
  );
};

export default UploadForm;

