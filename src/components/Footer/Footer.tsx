// components/Footer.tsx
'use client';

import Link from 'next/link';
import { 
 
  Heart, 
  Twitter, 
  Github, 
  Linkedin, 
  Mail,
  ExternalLink,
  Sparkles
} from 'lucide-react';

// Types
interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface FooterProps {
  companyName?: string;
  year?: number;
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  className?: string;
}

const Footer = ({
  companyName = 'YourBrand',
  year = new Date().getFullYear(),
  sections = defaultSections,
  socialLinks = defaultSocialLinks,
  className = ''
}: FooterProps) => {





  return (
    <footer className={`relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden ${className}`}>
    
      
  

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4 group">
              <div className="relative">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-75 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {companyName}
              </span>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              Building the future with innovative solutions. Creating amazing experiences that make a difference.
            </p>

            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300 group hover:scale-110 hover:shadow-lg ${social.color}`}
                >
                  <social.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation sections */}
          {sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4 relative inline-block">
                {section.title}
                <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
              </h3>
              
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="flex items-center text-gray-400 hover:text-white transition-all duration-300 group hover:translate-x-1"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
                      </span>
                      {link.external && (
                        <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter section with animation */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-xl font-semibold text-white mb-2 flex items-center justify-center lg:justify-start">
                Stay updated with our latest news
                <Sparkles className="h-5 w-5 text-yellow-400 ml-2 animate-pulse" />
              </h3>
              <p className="text-gray-400 max-w-2xl">
                Join our newsletter to receive updates on new features and products.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 flex-1 min-w-0"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Subscribe</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center text-gray-400 text-sm">
            <span>© {year} {companyName}. All rights reserved.</span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1 animate-pulse" /> and Next.js
            </span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors duration-300">
              Cookies
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
};

// Default sections
const defaultSections: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'API', href: '/api', external: true },
      { label: 'Documentation', href: '/docs' },
      { label: 'Releases', href: '/releases' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Community', href: '/community' },
      { label: 'Guides', href: '/guides' },
      { label: 'Tutorials', href: '/tutorials' },
      { label: 'Support', href: '/support' },
    ],
  },
];

// Default social links
const defaultSocialLinks: SocialLink[] = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/yourbrand',
    icon: Twitter,
    color: 'hover:text-blue-400'
  },
  {
    name: 'GitHub',
    href: 'https://github.com/yourbrand',
    icon: Github,
    color: 'hover:text-gray-300'
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/yourbrand',
    icon: Linkedin,
    color: 'hover:text-blue-400'
  },
  {
    name: 'Email',
    href: 'mailto:hello@yourbrand.com',
    icon: Mail,
    color: 'hover:text-red-400'
  },
];

export default Footer;