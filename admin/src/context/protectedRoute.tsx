import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const token = auth ? JSON.parse(auth).token : null;

    if (!token) {
      toast.error("Please login to access this page.");
      navigate("/auth/login");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) return null;

  return <>{children}</>;
}
