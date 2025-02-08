"use client"

import React, { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Page() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const { data: session} = useSession()
  const router = useRouter()

  useEffect(()=> {
    if (session) {
      router.replace('/')
    }
  })

  // Signin function to handle real login logic
  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous messages
    setErrorMessage('');
    setSuccessMessage('');

    if (isLogin) {
      // Login Logic
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Login failed, please try again.');
        }

        // Store JWT token
        localStorage.setItem('token', data.token);

        const result = await signIn("credentials", {
          redirect: false, 
          email: email,
          password: password,
        });

        setSuccessMessage('Login successful!');
        // Redirect to another page if needed, e.g.:
        // window.location.href = '/dashboard';
      } catch (error: any) {
        setErrorMessage(error.message || 'An error occurred during login.');
      }
    } else {
      // Register Logic
      if (password !== confirmpassword) {
        setErrorMessage("Passwords don't match.");
        return;
      }

      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Registration failed, please try again.');
        }

        setSuccessMessage('Registration successful! Please log in.');
      } catch (error: any) {
        setErrorMessage(error.message || 'An error occurred during registration.');
      }
    }
  };

  const handleGoogleLogin = () => {
    console.log('Logging in with Google...');
    // Google login logic (use Firebase or OAuth library here)
  };

  const changeRegister = () => {
    setIsLogin(!isLogin);
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      

      {isLogin ? (
        // Login Form
        <div className="border-b-2 border-r-2 rounded-2xl border-SC6 shadow-lg shadow-SC6 h-auto w-[400px] p-6 bg-gray-800">
          <h1 className="text-white font-bold w-fit mx-auto text-4xl mt-5">Login</h1>

          <form onSubmit={handleSignin} className="mt-8 flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-md bg-gray-700 text-white outline-none border border-gray-600 focus:border-SC6"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded-md bg-gray-700 text-white outline-none border border-gray-600 focus:border-SC6"
              required
            />

            <button
              type="submit"
              className="mt-4 bg-SC6 w-fit px-6 text-white font-bold py-1.5 rounded-md hover:bg-SC4 transition-all"
            >
              Sign In
            </button>
          </form>

          <div className="mt-4 flex flex-col">
            <button onClick={changeRegister} className="text-white text-start hover:text-gray-300 duration-100">
              Don't have an account?
            </button>
            <button className="text-white text-start hover:text-gray-300 duration-100">Forget Password?</button>
            {errorMessage && (
              <div className="w-full text-red-500 text-start">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="w-full text-green-500 text-start">{successMessage}</div>
            )}
          </div>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-600"></div>
            <span className="px-2 text-gray-400 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-600"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 bg-white text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-200 duration-100 w-full"
          >
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </button>
        </div>
      ) : (
        // Register Form
        <div className="border-b-2 border-r-2 rounded-2xl border-blue-400 shadow-lg shadow-blue-400 h-auto w-[400px] p-6 bg-gray-800">
          <h1 className="text-white font-bold w-fit mx-auto text-4xl mt-5">Register</h1>

          <form onSubmit={handleSignin} className="mt-8 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 rounded-md bg-gray-700 text-white outline-none border border-gray-600 focus:border-blue-400"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-md bg-gray-700 text-white outline-none border border-gray-600 focus:border-blue-400"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded-md bg-gray-700 text-white outline-none border border-gray-600 focus:border-blue-400"
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-2 rounded-md bg-gray-700 text-white outline-none border border-gray-600 focus:border-blue-400"
              required
            />

            <button
              type="submit"
              className="mt-4 bg-blue-400 w-fit px-6 text-white font-bold py-1.5 rounded-md hover:bg-blue-600 duration-100"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-4 flex flex-col">
            <button onClick={changeRegister} className="text-white text-start hover:text-gray-300 duration-100">
              Do you already have an account?
            </button>
            {errorMessage && (
              <div className="w-full text-red-500 text-start">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="w-full text-green-500 text-start">{successMessage}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
