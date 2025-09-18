'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle, Clock, Trophy, Users } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { icon: Trophy, label: 'Projetos Entregues', value: '50+' },
    { icon: Users, label: 'Clientes Satisfeitos', value: '30+' },
    { icon: Clock, label: 'Anos de Experiência', value: '8+' },
    { icon: CheckCircle, label: 'Taxa de Sucesso', value: '98%' },
  ];

  const differentials = [
    {
      title: 'Experiência Técnica Sólida',
      description: 'Mais de 8 anos desenvolvendo soluções web e mobile com as tecnologias mais modernas do mercado.',
    },
    {
      title: 'Entregas Ágeis',
      description: 'Metodologia ágil garantindo entregas rápidas sem comprometer a qualidade do seu projeto.',
    },
    {
      title: 'Integração Mobile/Web',
      description: 'Especialistas em criar ecossistemas digitais completos que funcionam perfeitamente em todas as plataformas.',
    },
    {
      title: 'Suporte Completo',
      description: 'Acompanhamento desde a concepção até o deploy e manutenção contínua do seu produto.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
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
              Sobre a CarvaCode
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              <span className="text-foreground">Transformamos </span>
              <span className="text-primary-blue">ideias complexas</span>
              <br />
              <span className="text-foreground">em </span>
              <span className="text-accent-coral">soluções digitais</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Somos uma consultoria especializada em desenvolvimento web e aplicativos móveis, 
              focada em criar produtos digitais que realmente impactam os resultados do seu negócio. 
              Nossa abordagem combina experiência técnica com visão estratégica.
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-primary-blue rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gradient-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Differentials */}
          <div className="grid lg:grid-cols-2 gap-8">
            {differentials.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                className="glass-card p-8 rounded-2xl hover:shadow-card transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent-coral rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;