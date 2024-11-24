import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to MediChain</h1>
      <p className="text-xl text-center mb-12 max-w-2xl">
        Ensuring the authenticity and traceability of medicines through blockchain technology.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/verify">
          <Button className="w-full text-lg py-6">Verify Medicine</Button>
        </Link>
        <Link to="/add">
          <Button className="w-full text-lg py-6" variant="outline">Add Medicine</Button>
        </Link>
        <Link to="/supply-chain">
          <Button className="w-full text-lg py-6" variant="secondary">View Supply Chain</Button>
        </Link>
        <Link to="/login">
          <Button className="w-full text-lg py-6" variant="ghost">Login</Button>
        </Link>
      </div>
    </div>
  )
}

