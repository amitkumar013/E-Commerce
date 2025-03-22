import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  User,
  AtSign,
  Phone,
  Lock,
  Camera,
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
import { useAuth } from "@/context/authContext";
import toast from "react-hot-toast";
import axios from "axios";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { auth, setAuth } = useAuth();
  const URI = import.meta.env.VITE_BACKEND_URL;
  const [profile, setProfile] = useState({
    userName: auth?.user?.userName || "",
    email: auth?.user?.email || "",
    password: "",
    phone: auth?.user?.phone || "",
  });

  // Load user data into state
  useEffect(() => {
    if (auth?.user) {
      setProfile({
        userName: auth.user.userName || "",
        email: auth.user.email || "",
        password: "",
        phone: auth.user.phone || "",
      });
    }
  }, [auth?.user]);

  const handleChange = (e: any) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSaving(true);

      try {
        const response = await axios.patch(
          `${URI}/api/v1/users/update-profile`,
          profile,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );

        if (response.data?.error) {
          toast.error("Error updating user profile");
        } else if (!response.data?.data) {
          toast.error("Updated user data not received!");
        } else {
          const updatedAuth = {
            token: auth?.token,
            user: response.data.data,
          };

          setAuth(updatedAuth);
          localStorage.setItem("auth", JSON.stringify(updatedAuth));

          toast.success("User profile updated successfully!");
        }
      } catch (error) {
        toast.error("Error updating user");
      } finally {
        setIsSaving(false);
        setIsEditing(false);
      }
    },
    [profile, auth?.token]
  );

  return (
    <div className="mt-16 container mx-auto px-4 py-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h1 className="text-3xl font-bold">My Profile</h1>
      </motion.div>
      <Card>
        <CardHeader className="text-center">
          <div className="relative mx-auto w-24 h-24">
            <Avatar className="w-full h-full border-4 border-gray-200">
              <AvatarImage src="/placeholder.svg" alt="Profile" />
              <AvatarFallback>{profile.userName.charAt(0)}</AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button
                size="icon"
                variant="outline"
                className="absolute bottom-1 right-1 h-8 w-8"
                disabled
              >
                <Camera className="h-4 w-4" />
              </Button>
            )}
          </div>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Edit your profile details</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            Full Name
          </Label>
          <Input
            id="userName"
            name="userName"
            value={profile.userName}
            onChange={handleChange}
            disabled={!isEditing}
            className="disabled:opacity-70"
          />

          <Label htmlFor="email" className="flex items-center gap-2">
            <AtSign className="h-4 w-4 text-primary" />
            Email Address
          </Label>
          <Input
            name="email"
            value={profile.email}
            onChange={handleChange}
            disabled={true}
            className="opacity-70 cursor-not-allowed"
          />

          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" />
            Phone Number
          </Label>
          <Input
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            disabled={!isEditing}
            pattern="/^\+91[6-9]\d{9}$/.test(v)"
            maxLength={10}
            className="border border-gray-300 p-2 rounded-md"
          />

          <Label htmlFor="password" className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-primary" />
            Password
          </Label>
          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              value={profile.password}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {isEditing && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between pt-4">
          {isEditing ? (
            <>
              <Button
                type="submit"
                onClick={handleUpdate}
                disabled={isSaving}
                className="bg-primary text-white"
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={isSaving}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-primary text-white"
            >
              Edit Profile
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
