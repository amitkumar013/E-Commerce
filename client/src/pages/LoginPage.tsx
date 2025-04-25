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
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error] = useState("");
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const URI = import.meta.env.VITE_BACKEND_URL;
      const res = await axios.post(`${URI}/api/v1/users/login`, {
        email,
        password,
      });
      if (res?.data?.success) {
        const { token, loggedInUser } = res.data.data;
  
        const authData = { token, user: loggedInUser };
  
        setAuth(authData);
  
        localStorage.setItem("auth", JSON.stringify(authData));
  
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLoginSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col">
            <Button className="w-full" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <p className="text-sm text-muted-foreground text-center p-3">
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


// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import axios from "axios";
// import { useAuth } from "@/context/authContext";
// import toast from "react-hot-toast";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error] = useState("");
//   const { auth, setAuth } = useAuth();

//   const navigate = useNavigate();

//   const handleLoginSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const URI = import.meta.env.VITE_BACKEND_URL;
//       const res = await axios.post(`${URI}/users/login`, {
//         email,
//         password,
//       });
//       if (res && res.data.success) {
//         setAuth({
//           ...auth,
//           user: res.data.user,
//           token: res.data.accessToken,
//         });
//         localStorage.setItem("auth", JSON.stringify(res.data));
//         navigate("/");
//       }  
//     } catch (error) {
//       toast.error("Invalid email or password");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <Card className="w-full max-w-sm mx-auto">
//         <CardHeader>
//           <CardTitle>Login</CardTitle>
//           <CardDescription>
//             Enter your credentials to access your account.
//           </CardDescription>
//         </CardHeader>
//         <form onSubmit={handleLoginSubmit}>
//           <CardContent>
//             <div className="grid w-full items-center gap-4">
//               <div className="flex flex-col space-y-1.5">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="name@example.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   autoComplete="email"
//                 />
//               </div>
//               <div className="flex flex-col space-y-1.5">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   autoComplete="current-password"
//                 />
//               </div>
//             </div>
//           </CardContent>

//           <CardFooter className="flex flex-col">
//             <Button className="w-full" type="submit">
//               Sign In
//             </Button>
//             {error && (
//               <Alert variant="destructive" className="mt-4">
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}

//             <p className="text-sm text-muted-foreground text-center p-3">
//               Don't have an account?{" "}
//               <Link to="/auth/register" className="text-primary hover:underline">
//                 Sign up
//               </Link>
//             </p>
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//   );
// }
