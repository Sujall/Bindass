// components/ProtectedRoute.jsx
"use client";

import { getUserRole } from "@/api/apiClient";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const router = useRouter();

  useEffect(() => {
    const role = getUserRole();

    if (!role || !allowedRoles.includes(role)) {
      router.replace("/unauthorized"); // or "/login"
    }
  }, []);

  return <div>{children}</div>;
};

export default ProtectedRoute;
