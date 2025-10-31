import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Upload, Search, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const ComparePage = () => {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [similarityScore, setSimilarityScore] = useState(0);

  const handleFileSelect = (fileNum: 1 | 2, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (fileNum === 1) {
        setFile1(file);
      } else {
        setFile2(file);
      }
    }
  };

  const handleCompare = async () => {
    if (!file1 || !file2) {
      toast.error("Please select both files to compare");
      return;
    }

    setIsScanning(true);
    setScanComplete(false);

    // Simulate AI comparison
    setTimeout(() => {
      const score = Math.floor(Math.random() * 40) + 60; // Random score between 60-100
      setSimilarityScore(score);
      setIsScanning(false);
      setScanComplete(true);
      
      if (score >= 90) {
        toast.error("High similarity detected!");
      } else if (score >= 70) {
        toast("Moderate similarity detected", { icon: "⚠️" });
      } else {
        toast.success("Low similarity - designs appear unique");
      }
    }, 3000);
  };

  const getSimilarityColor = (score: number) => {
    if (score >= 90) return "text-red-400";
    if (score >= 70) return "text-yellow-400";
    return "text-green-400";
  };

  const getSimilarityStatus = (score: number) => {
    if (score >= 90) return { text: "High Risk", icon: AlertCircle, colorClass: "text-red-400" };
    if (score >= 70) return { text: "Moderate Risk", icon: AlertCircle, colorClass: "text-yellow-400" };
    return { text: "Unique Design", icon: CheckCircle, colorClass: "text-green-400" };
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-slate-950/80 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                DesignGuard
              </span>
            </Link>
            <Link to="/dashboard">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent text-center">
            Compare Designs
          </h1>
          <p className="text-gray-400 text-center mb-12">
            Upload two designs to check for similarities using AI
          </p>

          {/* Upload Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[1, 2].map((num) => {
              const file = num === 1 ? file1 : file2;
              return (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, x: num === 1 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: num * 0.1 }}
                  className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-4 text-white text-center">
                    Design {num}
                  </h3>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(num as 1 | 2, e)}
                    className="hidden"
                    id={`file-${num}`}
                  />

                  {!file ? (
                    <label htmlFor={`file-${num}`}>
                      <div className="cursor-pointer border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-purple-500/50 transition-all duration-300">
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: num * 0.5 }}
                          className="inline-flex p-4 rounded-full bg-purple-500/10 mb-4"
                        >
                          <Upload className="w-8 h-8 text-purple-400" />
                        </motion.div>
                        <p className="text-gray-400">Click to upload</p>
                      </div>
                    </label>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-white font-medium truncate">{file.name}</p>
                        <p className="text-sm text-gray-400 mt-1">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <label htmlFor={`file-${num}`}>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full border-white/20 bg-white/5 hover:bg-white/10 text-white"
                        >
                          <span>Change File</span>
                        </Button>
                      </label>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Compare Button */}
          <Button
            onClick={handleCompare}
            disabled={!file1 || !file2 || isScanning}
            className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white border-0 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/80 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-8"
          >
            {isScanning ? (
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                <span>Analyzing Designs...</span>
              </div>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Compare Designs
              </>
            )}
          </Button>

          {/* Scanning Animation */}
          {isScanning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-12 mb-8"
            >
              <div className="relative h-32 overflow-hidden rounded-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10">
                <motion.div
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"
                />
              </div>
              <p className="text-center text-gray-400 mt-4">
                AI is analyzing design patterns, colors, and compositions...
              </p>
            </motion.div>
          )}

          {/* Results */}
          {scanComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-center text-white">
                Comparison Results
              </h3>

              {/* Circular Gauge */}
              <div className="flex justify-center mb-6">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-white/10"
                    />
                    <motion.circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 88}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - similarityScore / 100) }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className={getSimilarityColor(similarityScore)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-5xl font-bold ${getSimilarityColor(similarityScore)}`}>
                      {similarityScore}%
                    </span>
                    <span className="text-sm text-gray-400">Similarity</span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="text-center">
                {(() => {
                  const status = getSimilarityStatus(similarityScore);
                  const StatusIcon = status.icon;
                  return (
                    <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                      <StatusIcon className={`w-5 h-5 ${status.colorClass}`} />
                      <span className={`font-medium ${status.colorClass}`}>
                        {status.text}
                      </span>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ComparePage;
