'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Play } from 'lucide-react';

// Carrega o wrapper (ThreeDemo.tsx) dinamicamente — SSR desativado
const ThreeDemo = dynamic(() => import('./ThreeDemo'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      {/* placeholder com token azul */}
      <div className="animate-pulse w-40 h-40 rounded-full bg-primary-blue-10" />
    </div>
  ),
});

// Hook simples para detectar WebGL
function isWebGLAvailable(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    const canvas = document.createElement('canvas');
    return !!(
      (window as any).WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

// Hook para IntersectionObserver (lazy load)
function useOnScreen<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return { ref, isIntersecting };
}

const Hero: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const [enable3D, setEnable3D] = useState(false);
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  // detecta prefer-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  // Intersection hook para o container 3D
  const { ref: threeRef, isIntersecting } = useOnScreen<HTMLDivElement>({
    root: null,
    rootMargin: '200px',
    threshold: 0.1,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWebglSupported(isWebGLAvailable());
    }

    const timer = setTimeout(() => setShowTooltip(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isIntersecting && webglSupported) {
      setEnable3D(true);
    }
  }, [isIntersecting, webglSupported]);

  // Handlers
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      'Olá! Gostaria de agendar uma consultoria gratuita para meu projeto.'
    );
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  const handlePortfolioClick = () => {
    const element = document.querySelector('#portfolio');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollDown = () => {
    const element = document.querySelector('#about');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const chooseQuality = () => {
    if (typeof window === 'undefined') return 'low';
    return window.innerWidth < 768 ? 'low' : 'high';
  };

  return (
    <section className="relative min-h-screen hero-gradient overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8 lg:pr-8"
          >
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-primary-blue-10 border border-primary-blue-dark rounded-full text-primary-blue text-sm font-medium mb-6">
                🚀 Consultoria Especializada
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight"
            >
              <div className="leading-tight">
                <span className="text-white">
                  Consultoria em 
                </span>
                <br />
                <span className="text-primary-blue">desenvolvimento web</span>
                <span className="text-white">&nbsp;e&nbsp;</span>
                <span className="text-accent-coral">apps</span>
              </div>

              
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xl text-white/80 leading-relaxed max-w-2xl"
            >
              Transformamos ideias em produtos digitais escaláveis
            </motion.p>

            {/* Feature list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-4 text-white/70"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: 'var(--color-primary-blue)' }}
                />
                <span>Experiência técnica</span>
              </div>

              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: 'var(--color-warm-orange)' }}
                />
                <span>Entregas ágeis</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                <span>Integração mobile/web</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button
                variant="cta"
                size="xl"
                onClick={handleWhatsAppClick}
                className="group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Agendar consultoria grátis
              </Button>

              <Button
                variant="glass"
                size="xl"
                onClick={handlePortfolioClick}
                className="group"
              >
                Ver portfólio
                <ArrowDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-sm text-white/60 italic pt-6"
            >
              Tecnologia que potencializa seu produto — animações interativas e
              desempenho otimizado
            </motion.p>
          </motion.div>

          {/* Right content: 3D demo area */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative h-[500px] lg:h-[600px]"
          >
            {/* background blur */}
            <div className="absolute inset-0 rounded-full blur-3xl bg-primary-blue-20" />

            {/* Container referenciado para observer */}
            <div
              ref={threeRef}
              className="relative z-10 w-full h-full flex items-center justify-center"
            >
              {webglSupported === false && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white/70 text-center px-4">
                    <p className="mb-2 font-semibold">
                      Visualização 3D indisponível
                    </p>
                    <p className="text-sm">
                      Seu dispositivo ou navegador não suporta WebGL.
                    </p>
                  </div>
                </div>
              )}

              

              {!enable3D && (
                <div className="w-full h-full rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-black/20 to-transparent">
                  <div className="max-w-xs text-center text-white/60">
                    <div className="h-48 w-48 mx-auto mb-4 rounded-full bg-primary-blue-10 animate-pulse" />
                    <p className="mb-3 font-medium">Animação interativa</p>

                    {webglSupported && (
                      <button
                        onClick={() => setEnable3D(true)}
                        className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/8 text-white text-sm"
                      >
                        Ativar visualização 3D
                      </button>
                    )}
                  </div>
                </div>
              )}

              {enable3D && webglSupported && (
                <ThreeDemo className="relative z-10 w-full h-full" />
              )}

              

            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <button
            onClick={handleScrollDown}
            className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 group"
          >
            <span className="text-sm">Explore mais</span>
            <ArrowDown className="w-6 h-6 animate-bounce group-hover:text-primary-blue transition-colors" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;