'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Phone, Mail, MessageCircle, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';

const Contact: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    toast({
      title: 'Mensagem enviada!',
      description: 'Obrigado pelo contato. Responderemos em breve!'
    });

    setFormData({
      name: '',
      email: '',
      project: '',
      budget: '',
      message: ''
    });

    setIsSubmitting(false);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Olá! Meu nome é ${formData.name || '[Seu Nome]'}. Gostaria de conversar sobre meu projeto: ${
        formData.project || '[Descrição do projeto]'
      }. Orçamento estimado: ${formData.budget || '[Valor aproximado]'}`
    );
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden"
      style={{
        backgroundColor: '#0b1115',
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
        backgroundPosition: '0 0, 0 0'
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.6 }}
        >
          {/* Cabeçalho */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ delay: 0.08, duration: 0.45 }}
              className="inline-block px-4 py-2 bg-white/3 border border-white/6 rounded-full text-primary-blue text-sm font-medium mb-4"
            >
              Vamos Conversar
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: 0.16, duration: 0.5 }}
              className="text-3xl md:text-4xl font-extrabold mb-6 text-white leading-tight"
            >
              <span>Pronto para </span>
              <span className="text-gradient-primary">transformar</span>
              <br />
              <span>sua </span>
              <span className="text-gradient-accent">ideia</span>
              <span> em realidade?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ delay: 0.24, duration: 0.45 }}
              className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed"
            >
              Agende uma consultoria gratuita ou preencha o formulário abaixo.
              Vamos descobrir juntos como podemos ajudar seu projeto a decolar.
            </motion.p>
          </div>

          {/* Grid principal */}
          <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-stretch">
            {/* Coluna esquerda - Formulário */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.34, duration: 0.5 }}
              className="flex"
            >
              <div
                className="flex flex-col w-full rounded-2xl p-6 md:p-8"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.03)',
                  boxShadow: '0 14px 30px rgba(2,6,23,0.5)',
                  backdropFilter: 'blur(4px)'
                }}
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Mail className="w-6 h-6 text-primary-blue" />
                  Conte-nos sobre seu projeto
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                  {/* Inputs */}
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Nome *</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Seu nome completo"
                        required
                        style={{ background: 'transparent', borderColor: 'rgba(255,255,255,0.06)' }}
                        className="text-white placeholder:text-white/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Email *</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="seu@email.com"
                        required
                        style={{ background: 'transparent', borderColor: 'rgba(255,255,255,0.06)' }}
                        className="text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>

                  {/* Projeto */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-white/70 mb-2">Tipo de projeto</label>
                    <select
                      name="project"
                      value={formData.project}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-md text-white"
                      style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <option value="" disabled>
                        Selecione o tipo de projeto
                      </option>
                      <option value="website">Website/Landing Page</option>
                      <option value="ecommerce">E-commerce</option>
                      <option value="webapp">Aplicação Web</option>
                      <option value="mobile">App Mobile</option>
                      <option value="api">API/Backend</option>
                      <option value="consultoria">Consultoria</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>

                  {/* Orçamento */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-white/70 mb-2">Orçamento estimado</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-md text-white"
                      style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <option value="" disabled>
                        Selecione a faixa de orçamento
                      </option>
                      <option value="5k-15k">R$ 5.000 - R$ 15.000</option>
                      <option value="15k-30k">R$ 15.000 - R$ 30.000</option>
                      <option value="30k-50k">R$ 30.000 - R$ 50.000</option>
                      <option value="50k+">R$ 50.000+</option>
                      <option value="nao-definido">Ainda não definido</option>
                    </select>
                  </div>

                  {/* Mensagem */}
                  <div className="mb-6 flex-1">
                    <label className="block text-sm font-medium text-white/70 mb-2">Detalhes do projeto</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Conte mais sobre seu projeto, objetivos, prazos, funcionalidades desejadas..."
                      rows={6}
                      style={{ background: 'transparent', borderColor: 'rgba(255,255,255,0.06)' }}
                      className="w-full h-full resize-none text-white placeholder:text-white/50"
                    />
                  </div>

                  {/* Botão */}
                  <div>
                    <Button
                      type="submit"
                      variant="cta"
                      size="lg"
                      className="w-full rounded-full px-6 py-3 font-semibold shadow-lg mt-10"
                      disabled={isSubmitting}
                      style={{
                        background: 'linear-gradient(90deg,#ff8a4b 0%, #ff5e3a 100%)',
                        color: 'white'
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Enviar Mensagem
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Coluna direita */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.42, duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              {/* Card WhatsApp */}
              <div
                className="rounded-2xl p-6 flex flex-col justify-between h-full"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.03)',
                  boxShadow: '0 14px 30px rgba(2,6,23,0.5)',
                  backdropFilter: 'blur(4px)'
                }}
              >
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-accent-coral" />
                  Prefere conversar agora?
                </h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  Agende uma consultoria gratuita via WhatsApp. Resposta rápida e atendimento personalizado.
                </p>
                <Button onClick={handleWhatsAppClick} variant="coral" size="xl" className="w-full mt-auto">
                  Chamar no WhatsApp
                </Button>
              </div>

              {/* Card contato */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.03)',
                  boxShadow: '0 14px 30px rgba(2,6,23,0.5)',
                  backdropFilter: 'blur(4px)'
                }}
              >
                <h3 className="text-xl font-bold text-white mb-6">Outras formas de contato</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-blue/10 rounded-xl flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary-blue" />
                    </div>
                    <div>
                      <p className="text-white font-medium">(11) 99999-9999</p>
                      <p className="text-white/60 text-sm">Ligação ou WhatsApp</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent-coral/10 rounded-xl flex items-center justify-center">
                      <Mail className="w-5 h-5 text-accent-coral" />
                    </div>
                    <div>
                      <p className="text-white font-medium">contato@carvacode.com</p>
                      <p className="text-white/60 text-sm">Resposta em até 24h</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card benefícios */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.03)',
                  boxShadow: '0 14px 30px rgba(2,6,23,0.5)',
                  backdropFilter: 'blur(4px)'
                }}
              >
                <h3 className="text-xl font-bold text-white mb-6">Por que escolher a CarvaCode?</h3>
                <div className="space-y-4">
                  {[
                    'Consultoria inicial gratuita',
                    'Orçamento transparente sem surpresas',
                    'Acompanhamento durante todo o projeto',
                    'Suporte pós-entrega incluso'
                  ].map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: 12 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
                      transition={{ delay: 0.5 + index * 0.06, duration: 0.36 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-accent-coral flex-shrink-0" />
                      <span className="text-white/80">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
