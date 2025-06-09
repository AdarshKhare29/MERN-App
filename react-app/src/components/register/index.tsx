import React, { useEffect, useState } from "react";
// import { login } from "../../reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../reducers/auth";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Eye, EyeOff, Key, UserPlus, CheckCircle, Lock } from "lucide-react"

const getErrorMessage = (error: any) => {
  if (typeof error === "string") {
    return error
  }

  // Handle different API error types
  if (error?.message) {
    return error.message
  }

  if (error?.response?.data?.message) {
    return error.response.data.message
  }

  if (error?.response?.status === 409) {
    return "Email already exists. Please use a different email."
  }

  if (error?.response?.status === 400) {
    return "Invalid input. Please check your information."
  }

  if (error?.response?.status === 500) {
    return "Server error. Please try again later."
  }

  return "Registration failed. Please try again."
}

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, error, user } = useSelector((state: any) => state.auth)

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [keyCreated, setKeyCreated] = useState(false)
  const [signupAttempts, setSignupAttempts] = useState(0)
  const [keyBroken, setKeyBroken] = useState(false)

  const handleChange = (fieldName: any, value: any) => {
    setUserInfo({ ...userInfo, [fieldName]: value })
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setKeyBroken(false)

    try {
      await dispatch(register(userInfo.name, userInfo.email, userInfo.password) as any)
      console.log("result", token, user, error)
    } catch (err) {
      console.error("Signup error:", err)
      // Error will be handled by the useEffect watching the error state
    } finally {
      setIsLoading(false)
    }
  }

  // Handle authentication state changes
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setIsSuccess(true)

      // Start key creation animation
      setTimeout(() => {
        setKeyCreated(true)
      }, 500)

      // Navigate after animation completes
      setTimeout(() => {
        navigate("/dashboard")
      }, 3500)
    }
  }, [user, navigate])

  // Handle authentication errors
  useEffect(() => {
    if (error) {
      const newAttempts = signupAttempts + 1
      setSignupAttempts(newAttempts)

      if (newAttempts >= 3) {
        setKeyBroken(true)
      }

      // Trigger shake animation
      const keyElement = document.querySelector(".key-shake")
      if (keyElement) {
        keyElement.classList.add("animate-shake")
        setTimeout(() => {
          keyElement.classList.remove("animate-shake")
        }, 600)
      }
    }
  }, [error, signupAttempts])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Key Creation Animation */}
        <div className="flex justify-center mb-8 relative h-24">
          <div className="relative">
            {/* Key Holder/Base */}
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden transition-colors duration-500 ${error && !keyBroken
                ? "bg-red-700 animate-pulse"
                : keyBroken
                  ? "bg-gray-900"
                  : isSuccess
                    ? "bg-green-700"
                    : "bg-gray-700"
                }`}
            >
              {/* Key Holder Shape */}
              <Lock className="w-8 h-8 text-gray-300" />

              {/* Success Glow Effect */}
              {isSuccess && <div className="absolute inset-0 bg-green-400 rounded-full animate-pulse opacity-30"></div>}

              {/* Error Glow Effect */}
              {error && !keyBroken && (
                <div className="absolute inset-0 bg-red-400 rounded-full animate-pulse opacity-30"></div>
              )}

              {/* Loading Glow Effect */}
              {isLoading && <div className="absolute inset-0 bg-blue-400 rounded-full animate-pulse opacity-20"></div>}
            </div>

            {/* Key Being Created */}
            <div
              className={`absolute top-1/2 transition-all duration-1000 ease-in-out key-shake ${keyBroken ? "opacity-50" : ""
                }`}
              style={{
                left: keyCreated ? "10px" : "-60px",
                transform: `translateY(-50%) ${keyCreated ? "rotate(0deg) scale(1.1)" : "rotate(-15deg) scale(0.9)"}`,
                zIndex: keyCreated ? 10 : 5,
              }}
            >
              <Key
                className={`w-12 h-12 transition-colors duration-500 ${isSuccess
                  ? "text-green-500 drop-shadow-lg"
                  : keyBroken
                    ? "text-gray-400"
                    : error
                      ? "text-red-500"
                      : isLoading
                        ? "text-blue-500"
                        : "text-gray-400"
                  }`}
              />

              {/* Broken key effect */}
              {keyBroken && (
                <div className="absolute top-0 left-6 w-1 h-8 bg-gray-600 transform rotate-45 opacity-70"></div>
              )}
            </div>

            {/* Key Creation Shine Effect */}
            {keyCreated && <div className="absolute inset-0 bg-green-300 rounded-full animate-ping opacity-20"></div>}
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle
              className={`text-2xl font-bold transition-colors duration-300 ${isSuccess ? "text-green-600" : error ? "text-red-600" : "text-gray-800"
                }`}
            >
              {isSuccess
                ? "Account Created!"
                : keyBroken
                  ? "Registration Failed!"
                  : error
                    ? "Sign Up Failed!"
                    : "Create Account"}
            </CardTitle>
            <CardDescription className={error ? "text-red-500" : ""}>
              {isSuccess
                ? "Welcome! Your access key has been generated..."
                : keyBroken
                  ? "Too many failed attempts. Please try again later."
                  : error
                    ? getErrorMessage(error)
                    : "Join us and explore what’s possible."}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {!isSuccess ? (
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={userInfo.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                    className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={userInfo.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                    className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={userInfo.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      required
                      className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-green-500"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" required className="rounded border-gray-300" />
                  <span className="text-gray-600">
                    I agree to the{" "}
                    <a href="#" className="text-green-600 hover:text-green-800 transition-colors">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-green-600 hover:text-green-800 transition-colors">
                      Privacy Policy
                    </a>
                  </span>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <UserPlus className="w-4 h-4" />
                      <span>Create Account</span>
                    </div>
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-green-600 font-medium">
                  {keyCreated ? "Your Access Key is Ready!" : "Account Created Successfully!"}
                </p>
                <div className="mt-4 flex justify-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        {error && !isSuccess && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0"></div>
              <p className="text-sm text-red-700 font-medium">{getErrorMessage(error)}</p>
            </div>
            {signupAttempts > 1 && <p className="text-xs text-red-600 mt-1">Attempt {signupAttempts} of 3</p>}
          </div>
        )}

        {keyBroken && (
          <div className="text-center py-4">
            <Button
              onClick={() => {
                setKeyBroken(false)
                setSignupAttempts(0)
                setUserInfo({ name: "", email: "", password: "" })
              }}
              variant="outline"
              className="text-green-600 border-green-600 hover:bg-green-50"
            >
              Try Again
            </Button>
          </div>
        )}

        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 hover:text-green-800 font-medium transition-colors">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
export default Register;
