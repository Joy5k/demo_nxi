'use client';

import Link from 'next/link';
import { 
  Home, 
  ArrowRight,
  Frown
} from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        {/* Large 404 Number */}
        <div className="mb-8">
          <h1 className="text-[180px] md:text-[240px] font-black leading-none text-gray-200 dark:text-gray-800 select-none">
            404
          </h1>
        </div>

        {/* Icon */}
        <div className="mb-6">
          <Frown className="w-20 h-20 mx-auto text-gray-400 dark:text-gray-600" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Action Button */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#5D5FEF] hover:bg-[#4a4ddf] text-white rounded-xl font-semibold transition-colors duration-200"
          >
            <Home className="w-5 h-5" />
            Back to Home
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Quick Links */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
            Try these pages instead
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/careers"
              className="px-4 py-2 bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:border-[#5D5FEF] hover:text-[#5D5FEF] dark:hover:text-[#5D5FEF] transition-colors"
            >
              Careers
            </Link>
           
          </div>
        </div>
      </div>
    </div>
  );
}