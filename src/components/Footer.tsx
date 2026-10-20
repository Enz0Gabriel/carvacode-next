'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Mail, MessageCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import logo from '../assets/logo.svg'
import Image from 'next/image'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      icon: Mail,
      href: 'mailto:carvacodebr@gmail.com',
      label: 'Email',
      color: 'hover:text-accent-coral',
    },
  ]

  const quickLinks = [
    { label: 'Sobre', href: '#about' },
    { label: 'Serviços', href: '#services' },
    { label: 'Tecnologias', href: '#tecnologias' },
    { label: 'Contato', href: '#contact' },
  ]

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      element?.scrollIntoView({ behavior: 'smooth' })
    } else if (href.startsWith('mailto:')) {
      window.location.href = href
    } else {
      window.open(href, '_blank')
    }
  }

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Olá! Gostaria de marcar uma conversa inicial sobre meu projeto.')
    window.open(`https://wa.me/5511959766136?text=${message}`, '_blank')
  }

  return (
    <footer className="relative overflow-hidden bg-bg-deep-start">
      {/* Dark base overlay (por baixo) — escurece fortemente o footer */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: '',
        }}
      />

      {/* Grid pattern VISÍVEL por cima do overlay (mantendo o grid quadriculado) */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* Gradient/Blobs sutis por cima do grid (opcionais, não escondem o grid) */}
      <div
        aria-hidden
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none z-15 bg-primary-blue/5"
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none z-15 bg-accent-coral/5"
      />

      {/* Conteúdo do Footer (acima das layers de background) */}
      <div className="container mx-auto px-4 relative z-20">
        {/* Main Footer Content */}
        <div className="py-16 border-b border-white/8">
          <div className="grid lg:grid-cols-4 gap-12 text-center lg:text-left">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
                <Image src={logo} alt="" aria-hidden="true" className="h-10 w-auto" />
                <span className="brand-wordmark text-2xl" aria-label="CarvaCode">
                  <span className="brand-wordmark-carva">Carva</span>
                  <span className="brand-wordmark-code">Code</span>
                </span>
              </div>

              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                Equipe técnica enxuta que desenvolve sites, sistemas e apps sob medida, do frontend
                ao deploy.
              </p>

              <Button
                variant="cta"
                size="lg"
                onClick={handleWhatsAppClick}
                className="group cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Falar com a equipe
              </Button>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <h3 className="text-white font-semibold mb-6">Navegação</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-white/70 hover:text-white transition-colors duration-300 link-underline-white cursor-pointer"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h3 className="text-white font-semibold mb-6">Contato</h3>
              <div className="space-y-3">
                <p className="text-white/70">
                  <span className="text-white font-medium">WhatsApp:</span>
                  <br />
                  (11) 95976-6136
                </p>
                <p className="text-white/70">
                  <span className="text-white font-medium">Email:</span>
                  <br />
                  carvacodebr@gmail.com
                </p>
                <p className="text-white/70">
                  <span className="text-white font-medium">Horário:</span>
                  <br />
                  Seg-Sex 9h às 18h
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1 text-white/60 text-sm max-w-xs sm:max-w-none"
            >
              <span>© {currentYear} CarvaCode. Feito com</span>
              <Heart className="w-4 h-4 text-accent-coral animate-pulse flex-shrink-0" />
              <span>para impulsionar seu negócio.</span>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex items-center gap-4"
            >
              {socialLinks.map((social) => (
                <motion.button
                  key={social.label}
                  onClick={() => handleLinkClick(social.href)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center text-white/60 ${social.color} transition-all duration-300`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
