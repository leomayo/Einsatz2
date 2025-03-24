"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold text-indigo-600">Einsatz</Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="font-medium hover:text-indigo-600">
            Home
          </Link>
          <Link href="/freelancers" className="font-medium hover:text-indigo-600">
            Freelancers Zoeken
          </Link>
          <Link href="/categories" className="font-medium hover:text-indigo-600">
            Categorieën
          </Link>
          <Link href="/how-it-works" className="font-medium hover:text-indigo-600">
            Hoe Werkt Het
          </Link>
        </nav>
        
        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-4">
          <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-full">
            Inloggen
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-full">
            Aanmelden
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Link 
              href="/" 
              className="py-2 px-4 font-medium hover:bg-indigo-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/freelancers" 
              className="py-2 px-4 font-medium hover:bg-indigo-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Freelancers Zoeken
            </Link>
            <Link 
              href="/categories" 
              className="py-2 px-4 font-medium hover:bg-indigo-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Categorieën
            </Link>
            <Link 
              href="/how-it-works" 
              className="py-2 px-4 font-medium hover:bg-indigo-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Hoe Werkt Het
            </Link>
            
            <div className="pt-3 flex flex-col gap-2">
              <button className="py-2 text-center w-full text-indigo-600 border border-indigo-600 rounded-lg font-medium">
                Inloggen
              </button>
              <button className="py-2 text-center w-full text-white bg-indigo-600 rounded-lg font-medium">
                Aanmelden
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 