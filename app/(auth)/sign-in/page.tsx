"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validateForm } from "@/lib/utils";
import { signIn } from "@/services";
import Swal from "sweetalert2";
import Link from "next/link";

const SignIn = () => {
  const [credential, setCredential] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validationRules = {
    username: {
      required: true,
      message: "Username is required",
    },
    password: {
      required: true,
      message: "Password is required",
      //   pattern: {
      //     value: /\S+@\S+\.\S+/,
      //     message: "Email is invalid",
      //   },
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm({
      form: credential,
      validationRules,
    });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      const auth = await signIn(credential.username, credential.password);

      if (auth?.success) {
        Swal.fire({
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            window.location.assign("/");
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: auth.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <div className="h-screen relative w-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 md:w-1/3 w-full p-5">
        <p className="text-white font-bold text-2xl">Sign in</p>
        <div>
          <Input
            placeholder="Username"
            className="bg-white"
            onChange={(e) =>
              setCredential((prev) => ({ ...prev, username: e.target.value }))
            }
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-2">{errors.username}</p>
          )}
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            className="bg-white"
            onChange={(e) =>
              setCredential((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-2">{errors.password}</p>
          )}
        </div>
        <Button className="bg-success hover:bg-green300" onClick={handleSubmit}>
          Sign in
        </Button>
        <p className="text-xs text-right text-white">
          Doesn't have account?
          <Link href="/sign-up" className="text-success hover:text-green300">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
