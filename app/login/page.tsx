// src/LoginPage.tsx
"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button, Form, Spin } from "antd";
import Swal from "sweetalert2";
const Home: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    password: "",
    userType: "admin", // Default to Employee
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    const { userType, email, password, userName } = formData;

    if (!email || !password || !userName) {
      alert("All fields are required.");
      return;
    }

    // Mock authentication - Replace this with your actual authentication logic
    Swal.fire({
      text: "Successfully Login Complete!",
      confirmButtonColor: "#1677ff",
    });
    localStorage.setItem("token", userType);
    console.log("🚀 ~ file: page.tsx:45 ~ handleSubmit ~ userType:", userType);

    // Redirect to another page
    if (userType === "student" || userType === "admin") {
      router.push(`/dashboard/${email}`);
    } else {
      router.push(`/welcome/${email}`);
    }
  };

  return (
    <div className="flex flex-col items-center mt-12">
      <h1 className="text-2xl text-center">Login</h1>
      <form
        className="mt-6 flex flex-col  items-center"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="mr-2" htmlFor="userName">
            Name:
          </label>
          <input
            className="rounded-md"
            style={{
              width: "250px",
              padding: "4px",
              border: "solid",
              borderColor: "#1677ff",
            }}
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-2">
          <label className="mr-2" htmlFor="email">
            Email:
          </label>
          <input
            className="rounded-md "
            style={{
              width: "250px",
              padding: "4px",
              border: "solid",
              borderColor: "#1677ff",
            }}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-2">
          <label className="mr-2" htmlFor="password">
            Password:
          </label>
          <input
            className="rounded-md"
            style={{
              width: "250px",
              padding: "4px",
              border: "solid",
              borderColor: "#1677ff",
            }}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-2">
          <label className="mr-2" htmlFor="userType">
            User Type:
          </label>
          <select
            className="rounded-md"
            style={{
              width: "250px",
              padding: "4px",
              border: "solid",
              borderColor: "#1677ff",
            }}
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
          >
            <option value="admin">Admin</option>
            <option value="student">Student</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          className="text-white rounded-md mt-6 w-32 "
          style={{ backgroundColor: "#1677ff", padding: "10px" }}
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Home;
