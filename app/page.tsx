// import React, { FormEvent, useState } from "react";
"use client";
import React, { FormEvent, useState } from "react";
// import { register } from "./appwrite";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Navbar from "@/components/navbar";

export default function SignUp() {
  const router = useRouter();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  interface Account {
    $id: string; // Adjust the type of $id based on the actual type
  }
  const handleSignup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      alert("Email is required.");
      return;
    }

    if (!password) {
      alert("Password is required.");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    Swal.fire({
      text: "Successfully Signup Complete!",
      confirmButtonColor: "#1677ff",
    });

    // register(email, password).then((account: Account) =>
    //   alert(`Successfully created account with ID: ${account.$id}`)
    // );
  };

  const handleLoginNavigation = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    router.replace("/login");
  };
  return (
    <>
      <div className="flex flex-col items-center">
        <h1
          className="mt-12 font-semibold text-2xl"
          style={{ textAlign: "center" }}
        >
          Signup
        </h1>
        <form className="form mt-6" onSubmit={handleSignup}>
          <div>
            <label className="mr-4" htmlFor="email">
              Email
            </label>
            <input
              required
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "250px",
                padding: "4px",
                border: "solid",
                borderColor: "#1677ff",
              }}
            />
          </div>
          <div style={{ paddingTop: "12px" }}>
            <label className="mr-4" htmlFor="password">
              Password
            </label>
            <input
              required
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "250px",
                padding: "4px",
                border: "solid",
                borderColor: "#1677ff",
              }}
            />
          </div>
          <div className="flex flex-row justify-center mt-2">
            <button
              className="text-white mr-2 rounded-md"
              style={{ backgroundColor: "#1677ff", padding: "10px" }}
              type={"submit"}
            >
              Sign up
            </button>
            <button
              className="rounded-md text-white"
              type={"button"}
              onClick={handleLoginNavigation}
              style={{
                backgroundColor: "#1677ff",
                padding: "10px",

                color: "#fff",
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
