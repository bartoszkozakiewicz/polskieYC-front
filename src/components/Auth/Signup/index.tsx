"use client";
import Link from "next/link";
import React from "react";
import GoogleSigninButton from "../GoogleSigninButton";
import SignupWithPassword from "../SignupWithPassword";

export default function Signup() {
  return (
    <>
      <div>
        <SignupWithPassword />
      </div>

      <div className="mt-6 text-center">
        <p>
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-primary">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
