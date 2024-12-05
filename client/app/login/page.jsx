"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PenLine, Loader2 } from 'lucide-react'

export default function SignupForm() {
   
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLoggedIn = false;

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/profile");
    }
  }, [isLoggedIn, router]);

  const validateForm = () => {
    let errors = {};
    if (!formData.email) {
      errors.email = "* Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "* Email is invalid";
    } else if (verifyDb.test(formData.email)) {
      errors.email = "* Email is invalid";
    }
    if (!formData.password) {
      errors.password = "* Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "* Password must be at least 8 characters";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(
        formData.password
      )
    ) {
      errors.password =
        "* Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    } else if (verifyDb.test(formData.password)) {
      errors.password = "* Passwords is invalid";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Sing in successfully", formData);
        alert("You sing in your account successfully!");
        router.push("/profile");
      } catch (error) {
        console.error("Error signing in:", error);
        alert("An error occurred during signin");
      }
    }
    setIsSubmitting(false);
  };

  return (
    
    <div className="min-h-screen  flex items-center justify-center  bg-black  sm:px-6 lg:px-8  ">
      <div className=" w-[350px] items-center justify-center bg-white rounded-xl    pl-2">
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto m-4">
            <PenLine className="w-6 h-6 text-primary" />
          </div>
        <div>
          <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
            Login
          </h2>
        </div>
        <form className="mt-8 space-y-6 " onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px ">
            <div>
              <label htmlFor="email" className="sr-only bg-black bg-opacity-0">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="bg-black bg-opacity-0 relative block w-72 px-3 py-2 border-b border-black placeholder-black text-black focus:outline-none focus:ring-red-600 duration-500 focus:border-red-600 focus:z-10 sm:text-sm m-4 "
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className=" bg-red-600 bg-opacity-40  text-sm text-red-600 border-2 rounded-md px-2 border-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="sr-only bg-black bg-opacity-0"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="bg-black bg-opacity-0 relative block w-72 px-3 py-2 border-b border-black placeholder-black text-black focus:outline-none focus:ring-red-600 duration-500 focus:border-red-600 focus:z-10 sm:text-sm m-4 "
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="ml-2 mr-32 bg-red-600 bg-opacity-40  text-sm text-red-600 border-2 rounded-md px-2 border-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative w-72 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600  focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-red-600 m-4 bgbutton  ${(isSubmitting === true)?'bg-red-700' : 'bg-red-600' } `}
              >
                {isSubmitting ? (
                    
                  <>
                    Signing in...
                    <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                  </>
                  
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
