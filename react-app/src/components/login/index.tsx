import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../reducers/auth";
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Eye, EyeOff, Key, Lock } from "lucide-react"


export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, error, user } = useSelector((state: any) => state.authReducer)

  const [userInfo, setUserInfo] = useState({
    name: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [keyInserted, setKeyInserted] = useState(false)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [keyBroken, setKeyBroken] = useState(false)

  const handleChange = (fieldName: any, value: any) => {
    setUserInfo({ ...userInfo, [fieldName]: value })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setKeyBroken(false)

    try {
      await dispatch(login(userInfo.name, userInfo.password) as any)
      console.log("result", token, user, error)
    } catch (err) {
      console.error("Login error:", err)
    }

    setIsLoading(false)
  }

  // Handle authentication state changes
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setIsSuccess(true)

      // Start key animation
      setTimeout(() => {
        setKeyInserted(true)
      }, 500)

      // Navigate after animation completes
      setTimeout(() => {
        navigate("/dashboard")
      }, 3000)
    }
  }, [user, navigate])

  // Handle authentication errors
  useEffect(() => {
    if (error) {
      const newAttempts = loginAttempts + 1
      setLoginAttempts(newAttempts)

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
  }, [error, loginAttempts])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Key and Keyhole Animation */}
        <div className="flex justify-center mb-8 relative h-24">
          <div className="relative">
            {/* Keyhole Background */}
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden transition-colors duration-500 ${error && !keyBroken ? "bg-red-700 animate-pulse" : keyBroken ? "bg-gray-900" : "bg-gray-800"
                }`}
            >
              {/* Keyhole Shape */}
              <div className="w-3 h-8 bg-gray-900 rounded-full relative">
                <div className="w-5 h-5 bg-gray-900 rounded-full absolute -top-1 -left-1"></div>
              </div>

              {/* Success Glow Effect */}
              {isSuccess && <div className="absolute inset-0 bg-green-400 rounded-full animate-pulse opacity-30"></div>}

              {/* Error Glow Effect */}
              {error && !keyBroken && (
                <div className="absolute inset-0 bg-red-400 rounded-full animate-pulse opacity-30"></div>
              )}
            </div>

            {/* Key */}
            <div
              className={`absolute top-1/2 transition-all duration-1000 ease-in-out key-shake ${keyBroken ? "opacity-50" : ""
                }`}
              style={{
                left: keyInserted ? "10px" : "-60px",
                transform: `translateY(-50%) ${keyInserted ? "rotate(90deg)" : "rotate(0deg)"}`,
                zIndex: keyInserted ? 10 : 5,
              }}
            >
              <Key
                className={`w-12 h-12 transition-colors duration-500 ${isSuccess
                  ? "text-green-500 drop-shadow-lg"
                  : keyBroken
                    ? "text-gray-400"
                    : error
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
              />

              {/* Broken key effect */}
              {keyBroken && (
                <div className="absolute top-0 left-6 w-1 h-8 bg-gray-600 transform rotate-45 opacity-70"></div>
              )}
            </div>

            {/* Key Shine Effect */}
            {keyInserted && <div className="absolute inset-0 bg-yellow-300 rounded-full animate-ping opacity-20"></div>}
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle
              className={`text-2xl font-bold transition-colors duration-300 ${isSuccess ? "text-green-600" : error ? "text-red-600" : "text-gray-800"
                }`}
            >
              {isSuccess ? "Access Granted!" : keyBroken ? "Access Denied!" : error ? "Login Failed!" : "Secure Login"}
            </CardTitle>
            <CardDescription className={error ? "text-red-500" : ""}>
              {isSuccess
                ? `Welcome back! ${user.name} Key inserted successfully...`
                : keyBroken
                  ? "Your key is broken. Try Again!!"
                  : error
                    ? typeof error === "string"
                      ? error
                      : "Authentication failed. Please try again."
                    : "Enter your credentials to unlock your account"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {!isSuccess ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Username</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your username"
                    value={userInfo.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={userInfo.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      required
                      className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
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

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Forgot password?
                  </a>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Authenticating...</span>
                    </div>
                  ) : (
                    "Unlock Access"
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock
                    className={`w-8 h-8 transition-colors duration-500 ${keyInserted ? "text-green-600" : "text-gray-400"}`}
                  />
                </div>
                <p className="text-green-600 font-medium">
                  {keyInserted ? "Key Inserted Successfully!" : "Login Successful!"}
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

        {/* {keyBroken && (
          <div className="text-center py-4">
            <Button
              onClick={() => {
                setKeyBroken(false)
                setLoginAttempts(0)
                setUserInfo({ name: "", password: "" })
              }}
              variant="outline"
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              Get New Key
            </Button>
          </div>
        )} */}

        {!isSuccess && <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            {"Don't have an account? "}
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
              Sign up here
            </a>
          </p>
        </div>}
      </div>
    </div>
  )
}