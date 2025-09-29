import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Rocket, Eye, EyeOff, Mail, Lock, User, Building2, Users, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { userAPI, handleAPIError } from "../services/api";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "adopter"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUserTypeChange = (value) => {
    setFormData(prev => ({
      ...prev,
      userType: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      // Prepare data for the API call - matching backend format
      const signupData = {
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        role: formData.userType
      };

      console.log("Sending signup data:", signupData);

      // Make the API call to the signup endpoint
      const response = await userAPI.signup(signupData);

      console.log("Signup successful:", response);
      
      // Handle successful signup
      if (response.message) {
        // Persist auth context for subsequent pages
        try {
          if (response.fullName) localStorage.setItem('userName', response.fullName);
          if (response.role) localStorage.setItem('userRole', response.role);
          localStorage.setItem('isLoggedIn', 'true');
        } catch {}
        
        // Show success message briefly before redirecting
        setError(""); // Clear any previous errors
        setIsLoading(false);
        
        // Show success message
        const successMessage = formData.userType === 'adopter' 
          ? "Account created successfully! Redirecting to startup feed..." 
          : "Account created successfully! Redirecting to dashboard...";
        
        // Create a temporary success element
        const successDiv = document.createElement('div');
        successDiv.className = 'bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4';
        successDiv.textContent = successMessage;
        
        // Insert success message
        const form = document.querySelector('form');
        form.insertBefore(successDiv, form.firstChild);
        
        // Redirect based on user type after a brief delay
        setTimeout(() => {
          console.log('Redirecting user type:', formData.userType);
          if (formData.userType === 'adopter') {
            // Redirect adopters to the dedicated startups feed page with user name
            console.log('Redirecting adopter to startups feed page...');
            const userName = formData.firstName;
            localStorage.setItem('userName', userName);
            window.location.href = `/startups-feed?name=${encodeURIComponent(userName)}`;
          } else if (formData.userType === 'founder') {
            // Redirect founders to their dashboard
            console.log('Redirecting founder to dashboard...');
            const userName = formData.firstName;
            localStorage.setItem('userName', userName);
            window.location.href = '/founder-dashboard';
          } else {
            // Redirect to login for any other type
            console.log('Redirecting to login...');
            window.location.href = '/login';
          }
        }, 1500); // 1.5 second delay to show success message
      } else {
        setError(response.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      const errorInfo = handleAPIError(error);
      setError(errorInfo.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-50/30 blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 shadow-xl">
              <Rocket className="h-8 w-8 text-white" />
            </div>
            <span className="text-4xl font-bold text-gray-900">FirstUsers</span>
          </div>
          <p className="text-gray-600 text-lg">Join our community of innovators and early adopters.</p>
        </div>

        {/* Signup Card */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-8">
            <CardTitle className="text-3xl font-bold text-center text-gray-900">
              Create Account
            </CardTitle>
            <CardDescription className="text-center text-gray-600 text-lg">
              Start your journey with us today
            </CardDescription>
          </CardHeader>
           <CardContent>
             <form onSubmit={handleSubmit} className="space-y-8">
               {/* Error Message */}
               {error && (
                 <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                   {error}
                 </div>
               )}
              {/* User Type Selection */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-900">I am a:</Label>
                <RadioGroup
                  value={formData.userType}
                  onValueChange={handleUserTypeChange}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="relative">
                    <RadioGroupItem value="adopter" id="adopter" className="peer sr-only" />
                    <Label
                      htmlFor="adopter"
                      className={`flex flex-col items-center justify-center w-full h-24 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                        formData.userType === "adopter"
                          ? "border-blue-500 bg-blue-50 shadow-lg"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <Users className={`h-8 w-8 mb-2 ${
                        formData.userType === "adopter" ? "text-blue-600" : "text-gray-400"
                      }`} />
                      <span className={`font-semibold ${
                        formData.userType === "adopter" ? "text-blue-600" : "text-gray-600"
                      }`}>
                        Early Adopter
                      </span>
                      <span className={`text-sm ${
                        formData.userType === "adopter" ? "text-blue-500" : "text-gray-500"
                      }`}>
                        Discover startups
                      </span>
                    </Label>
                  </div>
                  <div className="relative">
                    <RadioGroupItem value="founder" id="founder" className="peer sr-only" />
                    <Label
                      htmlFor="founder"
                      className={`flex flex-col items-center justify-center w-full h-24 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                        formData.userType === "founder"
                          ? "border-blue-500 bg-blue-50 shadow-lg"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <Building2 className={`h-8 w-8 mb-2 ${
                        formData.userType === "founder" ? "text-blue-600" : "text-gray-400"
                      }`} />
                      <span className={`font-semibold ${
                        formData.userType === "founder" ? "text-blue-600" : "text-gray-600"
                      }`}>
                        Startup Founder
                      </span>
                      <span className={`text-sm ${
                        formData.userType === "founder" ? "text-blue-500" : "text-gray-500"
                      }`}>
                        Launch your startup
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="firstName" className="text-base font-semibold text-gray-700">
                    First Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="lastName" className="text-base font-semibold text-gray-700">
                    Last Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-base font-semibold text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <Label htmlFor="password" className="text-base font-semibold text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-12 pr-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-3">
                <Label htmlFor="confirmPassword" className="text-base font-semibold text-gray-700">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-12 pr-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  required
                />
                <Label htmlFor="terms" className="text-base text-gray-600 leading-relaxed">
                  I agree to the{" "}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

               {/* Signup Button */}
               <Button
                 type="submit"
                 disabled={isLoading}
                 className="w-full h-16 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold text-xl transition-all duration-300 hover:shadow-xl rounded-xl"
               >
                 {isLoading ? "Creating Account..." : "Create Account"}
               </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
                </div>
              </div>

              {/* Social Signup Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="h-14 border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-xl text-base font-semibold"
                >
                  <svg className="h-6 w-6 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-14 border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-xl text-base font-semibold"
                >
                  <svg className="h-6 w-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                  Twitter
                </Button>
              </div>

              {/* Sign In Link */}
              <div className="text-center">
                <p className="text-gray-600 text-lg">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 hover:text-blue-700 font-bold"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 font-semibold text-lg transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;