"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password, role);
      router.push("/dashboard");
    } catch (err) {
      // Avoid console.error to prevent the Next.js dev overlay
      const errorMsg = err.response?.data?.message || "Registration failed.";
      alert(errorMsg);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800">
        <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>
        <p className="text-center text-zinc-500 dark:text-zinc-400 mb-8">Join us to get started</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent border-zinc-300 dark:border-zinc-700"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent border-zinc-300 dark:border-zinc-700"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent border-zinc-300 dark:border-zinc-700"
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent border-zinc-300 dark:border-zinc-700"
          >
            <option value="user" className="text-black">User</option>
            <option value="admin" className="text-black">Admin</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors mt-2"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-6 text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
}
