import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, ArrowLeft, CheckCircle, Clock, Hash, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const DesignDetailPage = () => {
  const { id } = useParams();

  // Mock design data
  const design = {
    id,
    title: "Brand Identity Design",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop",
    uploadDate: "2025-01-15",
    status: "verified",
    similarity: 98,
    blockchainHash: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3",
    transactionHash: "0x8f5e9c4a2b7d6e1f0c3a5b8d9e2f7a4c6b8d0e3a5",
    verificationTime: "2025-01-15 14:32:18",
    fileSize: "2.4 MB",
    dimensions: "1920x1080",
    format: "PNG",
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
          className="max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Preview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300"
            >
              <img
                src={design.image}
                alt={design.title}
                className="w-full rounded-xl shadow-2xl"
              />
              <div className="flex gap-3 mt-4">
                <Button
                  variant="outline"
                  className="flex-1 border-white/20 bg-white/5 hover:bg-white/10 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-white/20 bg-white/5 hover:bg-white/10 text-white"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  {design.title}
                </h1>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Blockchain Verified</span>
                </div>
              </div>

              {/* Similarity Score */}
              <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4 text-white">Similarity Analysis</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Uniqueness Score</span>
                  <span className="text-2xl font-bold text-green-400">{design.similarity}%</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${design.similarity}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-green-500 to-cyan-500"
                  />
                </div>
              </div>

              {/* File Info */}
              <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4 text-white">File Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Upload Date</span>
                    <span className="text-white font-medium">{design.uploadDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">File Size</span>
                    <span className="text-white font-medium">{design.fileSize}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Dimensions</span>
                    <span className="text-white font-medium">{design.dimensions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Format</span>
                    <span className="text-white font-medium">{design.format}</span>
                  </div>
                </div>
              </div>

              {/* Blockchain Verification */}
              <div className="backdrop-blur-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4 text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-purple-400" />
                  Blockchain Verification
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center text-gray-400 text-sm mb-1">
                      <Hash className="w-4 h-4 mr-2" />
                      Contract Address
                    </div>
                    <code className="text-xs text-purple-400 break-all bg-white/5 px-3 py-2 rounded-lg block">
                      {design.blockchainHash}
                    </code>
                  </div>
                  <div>
                    <div className="flex items-center text-gray-400 text-sm mb-1">
                      <Hash className="w-4 h-4 mr-2" />
                      Transaction Hash
                    </div>
                    <code className="text-xs text-purple-400 break-all bg-white/5 px-3 py-2 rounded-lg block">
                      {design.transactionHash}
                    </code>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    Verified on {design.verificationTime}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DesignDetailPage;
