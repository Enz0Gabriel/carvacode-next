'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Globe,
  LayoutDashboard,
  Smartphone,
  Server,
  Database,
  Rocket,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/button';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const services = [
    {
      icon: Globe,
      title: 'Sites e landing pages',
      description: 'Sites institucionais e páginas de conversão rápidos, responsivos e com boa estrutura básica de SEO.',
      features: ['Next.js', 'React', 'Tailwind', 'SEO'],
      color: 'from-primary-blue to-primary-blue-glow',
    },
    {
      icon: LayoutDashboard,
      title: 'Sistemas web personalizados',
      description: 'Painéis administrativos e sistemas sob medida para o fluxo de trabalho do seu negócio.',
      features: ['Dashboards', 'Autenticação', 'Relatórios', 'Multiusuário'],
      color: 'from-primary-blue-glow to-primary-blue',
    },
    {
      icon: Smartphone,
      title: 'Aplicações mobile',
      description: 'Apps para Android e iOS com uma base de código, integrados ao seu backend.',
      features: ['React Native', 'iOS & Android', 'Layout adaptável'],
      color: 'from-accent-coral to-warm-orange',
    },
    {
      icon: Server,
      title: 'APIs e backend',
      description: 'APIs REST bem estruturadas, autenticação e regras de negócio pensadas para uso real.',
      features: ['Node.js', 'REST APIs', 'Autenticação', 'TypeScript'],
      color: 'from-warm-orange to-accent-coral',
    },
    {
      icon: Database,
      title: 'Banco de dados e integrações',
      description: 'Modelagem de banco relacional e integração com serviços externos que seu projeto usa.',
      features: ['PostgreSQL', 'Prisma', 'Integrações', 'Webhooks'],
      color: 'from-primary-blue to-accent-coral',
    },
    {
      icon: Rocket,
      title: 'Deploy, manutenção e evolução',
      description: 'Publicamos em VPS/nuvem e podemos manter e evoluir o projeto ao longo do tempo.',
      features: ['Docker', 'Linux/VPS', 'CI/CD', 'Manutenção'],
      color: 'from-accent-coral to-primary-blue',
    },
  ];

  return (
    <section id="services" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(39,166,217,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-block px-4 py-2 bg-primary-blue/10 border border-primary-blue/20 rounded-full text-primary-blue text-sm font-medium mb-4"
            >
              Nossos serviços
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              <span className="text-foreground">Desenvolvimento </span>
              <span className="text-gradient-primary">completo</span>
              {' '}
              <br className="hidden md:block" />
              <span className="text-foreground">para seu </span>
              <span className="text-gradient-accent">produto digital</span>
            </motion.h2>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                className="group relative"
              >
                <div className="glass-card p-8 rounded-2xl h-full hover:shadow-elegant transition-all duration-500 relative overflow-hidden">
                  {/* Gradient Border */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-gradient-primary transition-all duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-primary-blue/10 text-primary-blue text-xs font-medium rounded-full border border-primary-blue/20"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Learn More Link */}
                  <button
                    type="button"
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center text-primary-blue group-hover:text-accent-coral transition-colors duration-300 font-medium cursor-pointer"
                  >
                    <span className="text-sm">Falar sobre isso</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center"
          >
            <div className="glass-card p-8 md:p-12 rounded-2xl max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="text-foreground">Tem um </span>
                <span className="text-gradient-accent">projeto em mente?</span>
              </h3>

              <p className="text-muted-foreground mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
                Conte pra gente o que você precisa construir. Respondemos rápido,
                sem compromisso e com possíveis próximos passos.
              </p>
              
              <Button
                variant="cta"
                size="xl"
                onClick={() => {
                  const message = encodeURIComponent('Olá! Gostaria de conversar sobre meu projeto digital.');
                  window.open(`https://wa.me/5511959766136?text=${message}`, '_blank');
                }}
                className="group"
              >
                Vamos conversar
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
