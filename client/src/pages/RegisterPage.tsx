import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from "axios";
import { useAuth } from "@/context/authContext";
import toast from "react-hot-toast";

export default function RegisterPage() {
    const [userName, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [error] = useState("");
    const { auth, setAuth } = useAuth();
    const [role, setRole] = useState("user");

    const navigate = useNavigate();

    const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const URI = import.meta.env.VITE_BACKEND_URL;
      const res = await axios.post(`${URI}/api/v1/users/register`, {
        userName,
        email,
        password,
        phone,
        role,
      });
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.accessToken,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        toast.success(res.data.message)
        navigate("/auth/login");
        setName("");
        setEmail("");
        setPassword("");
        setRole("user");
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      toast.error("An error occurred while registering");
    }
    };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleRegisterSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={userName}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Enter password"
                  type="password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Phone No</Label>
                <Input
                  id="phone"
                  placeholder="Enter phone number"
                  type="tel"
                  value={phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <p className="text-sm text-muted-foreground text-center p-3">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-primary hover:underline">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
