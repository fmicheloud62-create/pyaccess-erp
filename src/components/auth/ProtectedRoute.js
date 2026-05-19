"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import {
  getSession,
} from "../../lib/authStorage";

export default function ProtectedRoute({
  children,
  allowedRoles = [],
}) {

  const router = useRouter();

  useEffect(() => {

    const session =
      getSession();

    if (!session) {

      router.push("/");

      return;
    }

    if (
      allowedRoles.length > 0 &&
      !allowedRoles.includes(
        session.role
      )
    ) {

      router.push(
        "/dashboard"
      );
    }

  }, []);

  return children;
}