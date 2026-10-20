'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Phone, Mail, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M20.46 3.49A11.84 11.84 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.31-1.65a11.86 11.86 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.8 11.8 0 0 0-3.49-8.42Zm-8.41 18.3h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.87 9.87 0 0 1-1.51-5.27c0-5.45 4.44-9.88 9.89-9.88a9.83 9.83 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.89-9.88 9.89Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
  </svg>
);

const Contact: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar mensagem');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        project: '',
        budget: '',
        message: ''
      });
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Olá! Meu nome é ${formData.name || '[Seu Nome]'}. Gostaria de conversar sobre meu projeto: ${
        formData.project || '[Descrição do projeto]'
      }. Orçamento estimado: ${formData.budget || '[Valor aproximado]'}`
    );
    window.open(`https://wa.me/5511959766136?text=${message}`, '_blank');
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
              Vamos conversar
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: 0.16, duration: 0.5 }}
              className="text-3xl md:text-4xl font-extrabold mb-6 text-white leading-tight"
            >
              <span>Vamos </span>
              <span className="text-gradient-primary">conversar</span>
              {' '}
              <br className="hidden md:block" />
              <span>sobre seu </span>
              <span className="text-gradient-accent">projeto</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ delay: 0.24, duration: 0.45 }}
              className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed"
            >
              Preencha o formulário ou chame no WhatsApp. Respondemos rápido,
              com uma ideia dos próximos passos e sem compromisso.
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

                  {/* Telefone */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-white/70 mb-2">Telefone/WhatsApp *</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(11) 90000-0000"
                      required
                      style={{ background: 'transparent', borderColor: 'rgba(255,255,255,0.06)' }}
                      className="text-white placeholder:text-white/50"
                    />
                  </div>

                  {/* Projeto */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-white/70 mb-2">Tipo de projeto</label>
                    <select
                      name="project"
                      value={formData.project}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-md text-white"
                      style={{ backgroundColor: '#0f151a', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <option value="" disabled style={{ backgroundColor: '#0f151a', color: 'white' }}>
                        Selecione o tipo de projeto
                      </option>
                      <option value="website" style={{ backgroundColor: '#0f151a', color: 'white' }}>Website/Landing Page</option>
                      <option value="ecommerce" style={{ backgroundColor: '#0f151a', color: 'white' }}>E-commerce</option>
                      <option value="webapp" style={{ backgroundColor: '#0f151a', color: 'white' }}>Aplicação Web</option>
                      <option value="mobile" style={{ backgroundColor: '#0f151a', color: 'white' }}>App Mobile</option>
                      <option value="api" style={{ backgroundColor: '#0f151a', color: 'white' }}>API/Backend</option>
                      <option value="consultoria" style={{ backgroundColor: '#0f151a', color: 'white' }}>Consultoria</option>
                      <option value="outro" style={{ backgroundColor: '#0f151a', color: 'white' }}>Outro</option>
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
                      style={{ backgroundColor: '#0f151a', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <option value="" disabled style={{ backgroundColor: '#0f151a', color: 'white' }}>
                        Selecione a faixa de orçamento
                      </option>
                      <option value="5k-15k" style={{ backgroundColor: '#0f151a', color: 'white' }}>R$ 5.000 - R$ 15.000</option>
                      <option value="15k-30k" style={{ backgroundColor: '#0f151a', color: 'white' }}>R$ 15.000 - R$ 30.000</option>
                      <option value="30k-50k" style={{ backgroundColor: '#0f151a', color: 'white' }}>R$ 30.000 - R$ 50.000</option>
                      <option value="50k+" style={{ backgroundColor: '#0f151a', color: 'white' }}>R$ 50.000+</option>
                      <option value="nao-definido" style={{ backgroundColor: '#0f151a', color: 'white' }}>Ainda não definido</option>
                    </select>
                  </div>

                  {/* Mensagem */}
                  <div className="mb-6 flex-1">
                    <label className="block text-sm font-medium text-white/70 mb-2">Detalhes do projeto *</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Conte mais sobre seu projeto, objetivos, prazos, funcionalidades desejadas..."
                      rows={6}
                      required
                      minLength={10}
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
                          Enviar mensagem
                        </>
                      )}
                    </Button>

                    {submitStatus === 'success' && (
                      <p className="mt-4 flex items-center gap-2 text-sm text-emerald-400">
                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                        Mensagem enviada! Responderemos em breve.
                      </p>
                    )}
                    {submitStatus === 'error' && (
                      <p className="mt-4 flex items-center gap-2 text-sm text-red-400">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        Não foi possível enviar. Tente novamente ou fale pelo WhatsApp.
                      </p>
                    )}
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
                  Fale direto com quem desenvolve. Resposta rápida e atendimento pessoal, sem robô.
                </p>
                <Button onClick={handleWhatsAppClick} variant="coral" size="xl" className="w-full mt-auto">
                  <WhatsAppIcon className="mr-2 h-5 w-5" />
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
                      <p className="text-white font-medium">(11) 95976-6136</p>
                      <p className="text-white/60 text-sm">Ligação ou WhatsApp</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent-coral/10 rounded-xl flex items-center justify-center">
                      <Mail className="w-5 h-5 text-accent-coral" />
                    </div>
                    <div>
                      <p className="text-white font-medium">carvacodebr@gmail.com</p>
                      <p className="text-white/60 text-sm">Resposta em até 1 dia útil</p>
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
                    'Primeira conversa sem compromisso',
                    'Orçamento transparente, sem surpresas',
                    'Contato direto com quem desenvolve',
                    'Manutenção e evolução após a entrega'
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
