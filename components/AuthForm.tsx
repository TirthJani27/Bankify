"use client";
import { z } from "zod";

import React, { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { authFormSchema } from "@/lib/utils";
import CustomFormField from "./CustomFormField";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/actions/user.actions";

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(type);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (type === "sign-in") {
        const res = await signIn({data:{
          email:data.email,
          password: data.password
        }});
        if (res) {
          setUser(res);
          router.push("/");
        }
      }
      if (type === "sign-up") {
        const newUser = await signUp(data);
        setUser(newUser);
      }
    } catch {
      console.log("Error");
    } finally {
      console.log(data);
      setIsLoading(false);
    }
  };
  return (
    <section className="flex min-h-screen max-w-[420px] flex-col align-middle justify-center gap-5 mx-10 py-10 md:gap-8">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Logo"
          ></Image>
          <h1 className="text-[#101828] 2xl:text-[26px] font-ibm-plex-serif text-[26px] font-bold text-black-1 max-xl:hidden">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-[24px] lg:text-[36px] font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-[16px] font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4"></div>
      ) : (
        <>
          {" "}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomFormField
                      control={form.control}
                      label="First Name"
                      name="firstName"
                      placeholder="John"
                      type={""}
                    />
                    <CustomFormField
                      control={form.control}
                      label="Last Name"
                      name="lastName"
                      placeholder="Doe"
                      type={""}
                    />
                  </div>
                  <CustomFormField
                    control={form.control}
                    label="Address"
                    name="address1"
                    placeholder="Enter your specific address"
                    type={""}
                  />
                  <CustomFormField
                    control={form.control}
                    label="City"
                    name="city"
                    placeholder="Enter your city"
                    type={""}
                  />
                  <div className="flex gap-4">
                    <CustomFormField
                      control={form.control}
                      label="State"
                      name="state"
                      placeholder="Example: GJ"
                      type={""}
                    />
                    <CustomFormField
                      control={form.control}
                      label="Postal Code"
                      name="postalCode"
                      placeholder="Example: 360001"
                      type={""}
                    />
                  </div>
                  <div
                    className="
                  flex gap-4"
                  >
                    <CustomFormField
                      control={form.control}
                      label="Date of birth"
                      name="dateOfBirth"
                      placeholder="YYYY-MM-DD"
                      type={""}
                    />
                    <CustomFormField
                      control={form.control}
                      label="SSN"
                      name="ssn"
                      placeholder="Example: 1234"
                      type={""}
                    />
                  </div>
                </>
              )}
              <CustomFormField
                control={form.control}
                label="Email"
                name="email"
                placeholder="Enter Your Email"
                type={""}
              />
              <CustomFormField
                type="password"
                control={form.control}
                label="Password"
                name="password"
                placeholder="Enter Your password"
              />
              <div className="flex flex-col gap-4">
                <Button
                  disabled={isLoading}
                  style={{
                    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                    background:
                      "linear-gradient(90deg, #0179FE 0%, #4893FF 100%)",
                    border: "1px solid #0179FE",
                  }}
                  className="cursor-pointer text-16 rounded-lg border border-bankGradient bg-bank-gradient font-semibold text-white"
                  type="submit"
                >
                  {isLoading ? (
                    <span className="flex gap-1.5 align-middle justify-center items-center">
                      <Loader2 size={20} className="animate-spin"></Loader2>
                      Loading...
                    </span>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex align-middle items-center justify-center gap-1">
            <p className="text-[14px] font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              style={{
                color: "#4893FF",
              }}
              className=" text-14 cursor-pointer font-medium "
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
