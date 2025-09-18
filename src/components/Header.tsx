'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import logo from '../assets/logo.svg';
import Image from 'next/image';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#about', label: 'Sobre' },
    { href: '#services', label: 'Serviços' },
    { href: '#portfolio', label: 'Portfólio' },
    { href: '#testimonials', label: 'Depoimentos' },
    { href: '#contact', label: 'Contato' },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-bg-deep-start/95 backdrop-blur-lg border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <Image src={logo} alt="CarvaCode" className="h-8 w-auto" />
            <span className="text-xl font-bold text-primary-blue">
              CarvaCode
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`text-sm font-medium link-underline cursor-pointer transition-colors duration-300 
                  ${isScrolled ? 'text-white hover:text-primary-blue' : 'text-white/90 hover:text-primary-blue'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              className="cursor-pointer"
              variant="hero"
              size="lg"
              onClick={() =>
                window.open(
                  'https://wa.me/5511999999999?text=Olá! Gostaria de agendar uma consultoria gratuita.',
                  '_blank'
                )
              }
            >
              Agendar Consultoria
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-primary-blue transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? 0 : -20,
        }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 z-40 bg-bg-deep-start/98 backdrop-blur-lg ${
          isMobileMenuOpen ? 'block' : 'hidden'
        } md:hidden`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 px-4">
          {navItems.map((item, index) => (
            <motion.button
              key={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                y: isMobileMenuOpen ? 0 : 20,
              }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleNavClick(item.href)}
              className="text-2xl font-semibold text-white hover:text-primary-blue cursor-pointer transition-colors duration-300"
            >
              {item.label}
            </motion.button>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : 20,
            }}
            transition={{ delay: 0.6 }}
            className="pt-8"
          >
            <Button
              className="cursor-pointer"
              variant="cta"
              size="xl"
              onClick={() => {
                window.open(
                  'https://wa.me/5511999999999?text=Olá! Gostaria de agendar uma consultoria gratuita.',
                  '_blank'
                );
                setIsMobileMenuOpen(false);
              }}
            >
              Agendar Consultoria Grátis
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Header;
