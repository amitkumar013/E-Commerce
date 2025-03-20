import type React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AtSign,
  Camera,
  Check,
  Eye,
  EyeOff,
  Lock,
  Phone,
  Save,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/authContext";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const { auth, setAuth } = useAuth();

  //-----Get User Data-----
  useEffect(() => {
    const { userName, email, password } = auth?.user;
    setUserName(userName);
    setEmail(email);
    setPassword(password);
  }, [auth?.user]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      setSaveSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="mt-16 container mx-auto px-4 py-8 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold">My Profile</h1>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="relative overflow-hidden">
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded-md flex items-center gap-2"
            >
              <Check className="h-4 w-4" />
              <span>Profile updated successfully</span>
            </motion.div>
          )}

          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your profile details and account information
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              {/* Profile Picture */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center justify-center mb-6"
              >
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-primary/20">
                    <AvatarImage src="/placeholder.svg" alt="Profile picture" />
                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                      {userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-primary text-primary-foreground hover:bg-primary/90"
                    type="button"
                    disabled={!isEditing}
                  >
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Change profile picture</span>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {isEditing ? "Click to upload a new photo" : ""}
                </p>
              </motion.div>

              <Separator />

              {/* Name */}
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Full Name
                </Label>
                <Input
                  id="userName"
                  name="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value) }
                  disabled={!isEditing}
                  className="disabled:opacity-70"
                />
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <AtSign className="h-4 w-4 text-primary" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value) }
                  disabled={!isEditing}
                  className="disabled:opacity-70"
                />
              </motion.div>

              {/* Phone */}
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value) }
                  disabled={!isEditing}
                  className="disabled:opacity-70"
                />
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={isEditing ? password : password}
                    onChange={(e) => setPassword(e.target.value) }
                    disabled={!isEditing}
                    className="disabled:opacity-70 pr-10"
                  />
                  {isEditing && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  )}
                </div>
                {isEditing && (
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 8 characters long
                  </p>
                )}
              </motion.div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6">
            {isEditing ? (
              <>
                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </span>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => setIsEditing(false)}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                type="button"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center text-sm text-muted-foreground"
      >
        <p>Last updated: March 10, 2025</p>
      </motion.div>
    </div>
  );
}
