import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Scan, Lock, Zap, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-pink-600/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-cyan-600/30 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 backdrop-blur-2xl bg-slate-950/80 border-b border-white/10"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                DesignGuard
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white border-0 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 transition-all duration-300 hover:scale-105">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-8"
          >
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                Protect Your Designs
              </span>
              <br />
              <span className="text-white">With AI-Powered Detection</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Upload your designs and detect plagiarism instantly using advanced AI algorithms
              and blockchain verification. Secure your creative work today.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white border-0 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/80 transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
                >
                  Start Protecting Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/20 bg-white/5 backdrop-blur-xl hover:bg-white/10 text-white text-lg px-8 py-6 hover:scale-105 transition-all duration-300"
                >
                  View Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to protect your creative work
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Scan className="w-8 h-8" />,
                title: "AI-Powered Detection",
                description: "Advanced machine learning algorithms scan millions of designs instantly",
                bgColor: "bg-purple-500/10",
                textColor: "text-purple-400",
              },
              {
                icon: <Lock className="w-8 h-8" />,
                title: "Blockchain Verified",
                description: "Immutable proof of ownership stored on the blockchain",
                bgColor: "bg-pink-500/10",
                textColor: "text-pink-400",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Real-Time Scanning",
                description: "Get results in seconds with our high-performance infrastructure",
                bgColor: "bg-cyan-500/10",
                textColor: "text-cyan-400",
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "99.9% Accuracy",
                description: "Industry-leading precision in plagiarism detection",
                bgColor: "bg-purple-500/10",
                textColor: "text-purple-400",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Legal Protection",
                description: "Generate legal reports for copyright claims",
                bgColor: "bg-pink-500/10",
                textColor: "text-pink-400",
              },
              {
                icon: <Scan className="w-8 h-8" />,
                title: "Batch Processing",
                description: "Upload and scan multiple designs simultaneously",
                bgColor: "bg-cyan-500/10",
                textColor: "text-cyan-400",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative p-8 rounded-2xl backdrop-blur-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-cyan-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className={`inline-flex p-3 rounded-xl ${feature.bgColor} ${feature.textColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-3xl backdrop-blur-2xl bg-gradient-to-br from-purple-900/50 via-pink-900/50 to-purple-900/50 border border-white/20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 animate-gradient-x" />
            <div className="relative text-center space-y-6">
              <h2 className="text-4xl font-bold text-white">
                Ready to Protect Your Work?
              </h2>
              <p className="text-xl text-gray-300">
                Join thousands of designers securing their creative assets
              </p>
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-white text-purple-900 hover:bg-gray-100 text-lg px-10 py-6 hover:scale-105 transition-all duration-300 shadow-2xl"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10 backdrop-blur-xl bg-slate-950/80">
        <div className="container mx-auto text-center text-gray-400">
          <p>© 2025 DesignGuard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
