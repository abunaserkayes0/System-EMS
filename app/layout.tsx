"use client";
import NavBar from "@/components/navbar";
import React from "react";
import { Inter } from "next/font/google";
import { usePathname, redirect } from "next/navigation";
import StyledComponentsRegistry from "../lib/AntdRegistry";
import "./globals.css";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const getUserStatus = (token: string) => {
  if (token === "admin") {
    return "admin";
  } else if (token === "student") {
    return "student";
  } else {
    return "other";
  }
};

const checkIfAnyValueExists = (
  array: string[],
  inputString: string
): boolean => {
  return array.some((value) => inputString.includes(value));
};

const getRequiredStatus = (pathname: string) => {
  const employeeProtectedRoutes = ["dashboard", "student_list"];

  const supervisorProtectedRoutes = ["welcome"];

  if (checkIfAnyValueExists(employeeProtectedRoutes, pathname)) {
    return "admin";
  } else if (checkIfAnyValueExists(supervisorProtectedRoutes, pathname)) {
    return "student";
  } else {
    return "other";
  }
};

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function ({ children }: { children: React.ReactNode }) {
  const [showNavbar, setShowNavbar] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [menuMode, setMenuMode] = useState("inline");
  const pathName = usePathname();
  const toggleMenuMode = () => {
    setMenuMode((prevMode) =>
      prevMode === "inline" ? "horizontal" : "inline"
    );
  };

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    console.log("🚀 ~ file: layout.tsx:80 ~ checkAuth ~ token:", token);

    const userStatus = !!token ? getUserStatus(token) : "other";
    console.log(
      "🚀 ~ file: layout.tsx:83 ~ checkAuth ~ userStatus:",
      userStatus
    );
    if (userStatus == "admin" || userStatus == "student") {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }

    if (userStatus !== "admin") {
      const requiredStatus = getRequiredStatus(pathName);

      if (userStatus !== requiredStatus || userStatus === "other") {
        if (userStatus === "other") {
          redirect("/");
        } else {
          redirect("/error");
        }
      }
    } else {
      setIsOwner(true);
    }
  };

  useEffect(() => {
    if (pathName != "/" && pathName != "/login".toString()) {
      checkAuth();
    } else {
      setShowNavbar(false);
    }
  }, [pathName]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          {showNavbar && (
            <NavBar
              menuMode={menuMode}
              setMenuMode={setMenuMode}
              isOwner={isOwner}
            ></NavBar>
          )}
          {/* {children} */}
          <div className="w-full flex justify-center">
            <div className=" w-72 h-full"></div>
            <div className="w-full relative">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
