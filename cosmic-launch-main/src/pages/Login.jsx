import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Rocket, Eye, EyeOff, Mail, Lock, Github, Linkedin, AlertCircle, Zap, Users, TrendingUp, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { userAPI, handleAPIError } from "../services/api";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [focusedField, setFocusedField] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log("Login attempt:", formData);

      // Make the API call to the login endpoint
      const response = await userAPI.login(formData);

      console.log("Login successful:", response);
      
      // Handle successful login
      if (response.message) {
        // Store user information
        const { fullName, role } = response;
        localStorage.setItem('userName', fullName);
        localStorage.setItem('userRole', role);
        localStorage.setItem('isLoggedIn', 'true');
        
        // Show success message briefly before redirecting
        setError(""); // Clear any previous errors
        setIsLoading(false);
        
        // Show success message
        const successMessage = "Login successful! Redirecting...";
        
        // Create a temporary success element
        const successDiv = document.createElement('div');
        successDiv.className = 'bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4';
        successDiv.textContent = successMessage;
        
        // Insert success message
        const form = document.querySelector('form');
        form.insertBefore(successDiv, form.firstChild);
        
        // Redirect based on user role after a brief delay
        setTimeout(() => {
          console.log('Redirecting user role:', role);
          if (role === 'adopter') {
            // Redirect adopters to the startups feed page
            console.log('Redirecting adopter to startups feed page...');
            window.location.href = `/startups-feed?name=${encodeURIComponent(fullName)}`;
          } else if (role === 'founder') {
            // Redirect founders to their dashboard
            console.log('Redirecting founder to dashboard...');
            window.location.href = '/founder-dashboard';
          } else {
            // Redirect to home for any other role
            console.log('Redirecting to home...');
            window.location.href = '/';
          }
        }, 1500); // 1.5 second delay to show success message
      } else {
        setError(response.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorInfo = handleAPIError(error);
      setError(errorInfo.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-sky-50 to-white font-['Inter',sans-serif]">
      {/* Left Panel - Content Section with Enhanced Design */}
      <div className="hidden lg:flex lg:w-3/5 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 relative overflow-hidden">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating Abstract Shapes */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-3xl animate-float" />
          <div className="absolute top-40 right-32 w-96 h-96 bg-gradient-to-br from-white/5 to-white/10 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute bottom-32 left-16 w-80 h-80 bg-gradient-to-br from-white/8 to-white/3 rounded-full blur-3xl animate-float-slow" />
          
          {/* Floating Stars and Sparkles */}
          <div className="absolute top-32 left-1/3 text-white/20 animate-bounce">
            <Star className="h-6 w-6" />
          </div>
          <div className="absolute top-1/2 right-1/4 text-white/15 animate-bounce delay-300">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="absolute bottom-1/3 left-1/4 text-white/20 animate-bounce delay-700">
            <Star className="h-5 w-5" />
          </div>
          
          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse delay-500" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-24 py-20 text-white">
          {/* Logo and Brand */}
          <div className="mb-16 animate-fade-in">
            <div className="flex items-center space-x-5 mb-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm shadow-2xl border border-white/20">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              <span className="text-4xl font-semibold text-white">LaunchMatch</span>
            </div>
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Zap className="h-4 w-4 mr-3 text-indigo-300" />
              <span className="text-sm font-medium tracking-wider text-slate-200">CONNECT & LAUNCH</span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="mb-16 animate-fade-in-up">
            <h1 className="text-5xl font-semibold leading-tight mb-8 text-white">
              Where startups meet early adopters.
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
              Connect innovative startups with passionate early adopters. Discover groundbreaking products before they hit the mainstream and help shape the future of technology. 
              <span className="text-white font-medium"> Your next favorite product is waiting to be discovered.</span>
            </p>
          </div>

          {/* Feature Points */}
          <div className="space-y-10 animate-fade-in-up delay-200">
            <div className="flex items-start space-x-6 group hover:transform hover:translate-x-1 transition-all duration-300">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm shadow-lg border border-white/20 group-hover:bg-white/15 transition-all duration-300">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl mb-3 text-white">Launch with confidence</h3>
                <p className="text-slate-300 leading-relaxed font-normal">Submit your startup and get matched with early adopters who are excited to try new products and provide valuable feedback</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-6 group hover:transform hover:translate-x-1 transition-all duration-300">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm shadow-lg border border-white/20 group-hover:bg-white/15 transition-all duration-300">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl mb-3 text-white">Discover before everyone else</h3>
                <p className="text-slate-300 leading-relaxed font-normal">Be the first to try innovative products, get exclusive access, and help shape the next generation of startups</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-6 group hover:transform hover:translate-x-1 transition-all duration-300">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm shadow-lg border border-white/20 group-hover:bg-white/15 transition-all duration-300">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl mb-3 text-white">Build meaningful connections</h3>
                <p className="text-slate-300 leading-relaxed font-normal">Connect startups with their ideal early adopters through our smart matching system and community-driven approach</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Modern Login Form */}
      <div className="flex-1 lg:w-2/5 bg-white flex items-center justify-center p-8 relative">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-indigo-100/30 to-purple-100/30 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-32 right-32 w-48 h-48 bg-gradient-to-br from-sky-100/40 to-indigo-100/40 rounded-full blur-2xl animate-float" />
        </div>
        
        <div className="w-full max-w-md relative z-10">
          {/* Mobile Logo (visible on small screens) */}
          <div className="lg:hidden text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 shadow-xl">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-semibold text-slate-800">LaunchMatch</span>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-white border border-slate-200/60 rounded-2xl shadow-2xl p-6 animate-fade-in-up">
            {/* Login Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-xl shadow-lg mb-4">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">
                Sign in to LaunchMatch
              </h2>
              <p className="text-slate-600 font-normal text-sm">Welcome back! Please sign in to continue</p>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <Button
                type="button"
                variant="outline"
                className="w-full h-10 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 rounded-lg font-normal text-slate-700 transition-all duration-300 hover:shadow-md group text-sm"
              >
                <svg className="w-4 h-4 mr-2 group-hover:scale-105 transition-transform duration-300" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full h-10 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 rounded-lg font-normal text-slate-700 transition-all duration-300 hover:shadow-md group text-sm"
              >
                <Github className="w-4 h-4 mr-2 group-hover:scale-105 transition-transform duration-300" />
                Continue with GitHub
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full h-10 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 rounded-lg font-normal text-slate-700 transition-all duration-300 hover:shadow-md group text-sm"
              >
                <Linkedin className="w-4 h-4 mr-2 group-hover:scale-105 transition-transform duration-300" />
                Continue with LinkedIn
              </Button>
            </div>

            {/* Divider */}
            <div className="relative mb-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-white text-slate-500 font-normal">or continue with email</span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-shake">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                    <p className="text-red-700 text-sm font-normal">{error}</p>
                  </div>
                </div>
              )}

              {/* Email Field with Floating Label */}
              <div className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors duration-300" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField("")}
                    className="w-full h-11 pl-10 pr-4 pt-5 pb-2 border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 bg-white hover:border-slate-400 peer placeholder-transparent text-slate-700 text-sm"
                    placeholder="Email"
                    required
                  />
                  <Label
                    htmlFor="email"
                    className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                      focusedField === "email" || formData.email
                        ? "top-2 text-xs text-indigo-600 font-medium"
                        : "top-1/2 -translate-y-1/2 text-slate-500 font-normal"
                    }`}
                  >
                    Email address
                  </Label>
                </div>
              </div>

              {/* Password Field with Floating Label */}
              <div className="space-y-3">
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors duration-300" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField("")}
                    className="w-full h-11 pl-10 pr-12 pt-5 pb-2 border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 bg-white hover:border-slate-400 peer placeholder-transparent text-slate-700 text-sm"
                    placeholder="Password"
                    required
                  />
                  <Label
                    htmlFor="password"
                    className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                      focusedField === "password" || formData.password
                        ? "top-2 text-xs text-indigo-600 font-medium"
                        : "top-1/2 -translate-y-1/2 text-slate-500 font-normal"
                    }`}
                  >
                    Password
                  </Label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-normal hover:underline transition-colors duration-300"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg disabled:cursor-not-allowed text-sm"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-slate-600 font-normal text-sm">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition-colors duration-300"
                >
                  Sign up
                </Link>
              </p>
            </div>

            {/* Security Badge */}
            <div className="text-center mt-4">
              <div className="inline-flex items-center space-x-2 text-xs text-slate-500">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="font-normal">Secured with enterprise-grade encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;