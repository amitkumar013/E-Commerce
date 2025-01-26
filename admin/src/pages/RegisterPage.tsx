"use client"

import { useState } from "react"
//import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  //const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      role: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    // try {
    //   // Simulating API call
    //   await new Promise((resolve) => setTimeout(resolve, 2000))
    //   console.log("Form submitted:", formData)
    //   router.push("/register-success")
    // } catch (error) {
    //   setError("An error occurred. Please try again.")
    // } finally {
    //   setIsLoading(false)
    // }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <div className="flex justify-center">
            <Icons.user className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">Enter your details below to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userName" className="flex items-center gap-2">
                <Icons.userName className="h-4 w-4" />
                Username
              </Label>
              <div className="relative">
                <Icons.userName className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="userName"
                  name="userName"
                  type="text"
                  required
                  value={formData.userName}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Icons.email className="h-4 w-4" />
                Email
              </Label>
              <div className="relative">
                <Icons.email className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Icons.password className="h-4 w-4" />
                Password
              </Label>
              <div className="relative">
                <Icons.password className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <Icons.eyeOpen className="h-5 w-5" /> : <Icons.eyeClosed className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                <Icons.confirmPassword className="h-4 w-4" />
                Confirm Password
              </Label>
              <div className="relative">
                <Icons.confirmPassword className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? (
                    <Icons.eyeOpen className="h-5 w-5" />
                  ) : (
                    <Icons.eyeClosed className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role" className="flex items-center gap-2">
                <Icons.role className="h-4 w-4" />
                Role
              </Label>
              <Select name="role" value={formData.role} onValueChange={handleRoleChange}>
                <SelectTrigger className="pl-10 relative">
                  <Icons.role className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Log in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

