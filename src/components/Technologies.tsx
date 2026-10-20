'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const techs = [
  { name: 'TypeScript', category: 'Linguagem' },
  { name: 'JavaScript', category: 'Linguagem' },
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'React Native', category: 'Mobile' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'REST APIs', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Banco de dados' },
  { name: 'Prisma', category: 'ORM' },
  { name: 'Docker', category: 'Infraestrutura' },
  { name: 'Linux / VPS', category: 'Infraestrutura' },
  { name: 'Git / GitHub', category: 'Ferramentas' },
];

const Technologies: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="tecnologias" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary-blue/10 border border-primary-blue/20 rounded-full text-primary-blue text-sm font-medium mb-4">
              Nossa stack
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-foreground">Tecnologias que </span>
              <span className="text-gradient-primary">usamos no dia a dia</span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ferramentas modernas e consolidadas no mercado, do frontend ao
              deploy — as mesmas que usamos no dia a dia em projetos reais.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {techs.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ delay: 0.05 * index, duration: 0.4 }}
                className="glass-card rounded-xl px-5 py-4 flex items-center gap-3"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-primary-blue to-accent-coral flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground leading-tight">{tech.name}</p>
                  <p className="text-xs text-muted-foreground">{tech.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;
