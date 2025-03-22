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
import { Icons } from "@/components/ui/icons";
import axios from "axios";
import { useAuth } from "@/context/authContext";
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { auth, setAuth } = useAuth();
  const URI = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${URI}/api/v1/users/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.accessToken,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));

        toast.success(res.data.message);

        navigate("/");
      } else{
        toast.error(res.data.message);
        setError("Invalid email or password");
      }
    } catch (error) {
      toast.error("Invalid email or password");
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-lg">
        <CardHeader className="text-center">
          <Icons.user className="h-12 w-12 text-primary mx-auto" />
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription className="text-gray-600">
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLoginSubmit}>
          <CardContent className="p-6">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="flex items-center gap-2">
                  Email
                </Label>
                <div className="relative">
                  <Icons.email className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="flex items-center gap-2">
                  Password
                </Label>
                <div className="relative">
                  <Icons.password className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col p-6">
            <Button className="w-full bg-primary text-white py-2 rounded-md" type="submit" disabled={isLoading}>
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <p className="text-sm text-gray-600 text-center mt-4">
              Don't have an account?{" "}
              <Link to="/auth/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
