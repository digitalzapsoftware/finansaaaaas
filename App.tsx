
import React, { useState, useEffect, useCallback } from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  CreditCard, 
  Smartphone, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Users, 
  Layout, 
  Mail, 
  PieChart, 
  Globe, 
  Copy, 
  Play, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Instagram,
  Youtube,
  ChevronLeft,
  Bot,
  MessageSquare,
  Workflow,
  BookOpen,
  TrendingUp,
  Palette,
  Send,
  Sparkles,
  SmartphoneIcon,
  Monitor,
  Search,
  Bell,
  User,
  Plus,
  LogOut,
  ChevronRight as ChevronRightIcon
} from 'lucide-react';

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {children}
    </div>
  );
};

const ImageSlider = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-full group overflow-hidden rounded-xl">
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => (
          <div key={idx} className="min-w-full h-full">
            <img 
              src={img} 
              alt={`Slide ${idx + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-green-500 hover:text-white text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-green-500 hover:text-white text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${currentIndex === idx ? 'bg-green-500 w-4' : 'bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  );
};

const useSmoothScroll = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return scrollTo;
};

const Navbar = ({ onScroll }: { onScroll: (id: string) => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 flex items-center justify-center bg-green-500 rounded-lg shadow-lg shadow-green-500/20">
            <TrendingUp size={24} className="text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">FinanSaaS Pro</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <button onClick={() => onScroll('funcionalidades')} className="hover:text-green-600 transition-colors">Funcionalidades</button>
          <button onClick={() => onScroll('dashboard')} className="hover:text-green-600 transition-colors">Interface</button>
          <button onClick={() => onScroll('oportunidade')} className="hover:text-green-600 transition-colors">Oportunidade</button>
          <button onClick={() => onScroll('faq')} className="hover:text-green-600 transition-colors">FAQ</button>
        </div>
        <button 
          onClick={() => onScroll('checkout')} 
          className="bg-gradient-primary px-6 py-2.5 rounded-full font-bold text-white hover:opacity-90 transition-all shadow-lg shadow-green-500/20 hidden sm:block"
        >
          Garantir Acesso
        </button>
      </div>
    </div>
  </nav>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
      >
        <span className="text-lg font-bold text-slate-800 group-hover:text-green-600 transition-colors">{question}</span>
        {isOpen ? <ChevronUp className="text-green-500" /> : <ChevronDown className="text-slate-400" />}
      </button>
      {isOpen && (
        <div className="pb-6 text-slate-600 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const scrollTo = useSmoothScroll();
  const [simName, setSimName] = useState('FinanSaaS Pro');
  const [simColor, setSimColor] = useState('#22c55e');

  const systemImages = [
    "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1504868584819-f8e90526ef49?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1504868584819-f8e90526ef49?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200"
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden text-slate-900">
      <Navbar onScroll={scrollTo} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-green-500/5 blur-[120px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 border border-green-100 text-sm font-bold mb-8 uppercase tracking-widest">
              LANCE SUA PRÓPRIA PLATAFORMA HOJE
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-slate-900">
              Tenha Seu Próprio SaaS: <br /> 
              <span className="text-gradient">Código-Fonte e Revenda Ilimitada</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-4xl mx-auto mb-12 leading-relaxed px-2">
              Pare de pagar mensalidades. Acesse a tecnologia <span className="highlight">White-Label completa</span> com Agente de IA e automações. Receba 100% do código para <span className="font-bold text-green-600">uso próprio ou para lucrar alto revendendo</span> como se fosse seu.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 px-4">
              <button 
                onClick={() => scrollTo('checkout')} 
                className="btn-pulse w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-primary text-white font-bold text-lg hover:scale-105 transition-transform shadow-2xl shadow-green-500/40 flex items-center justify-center gap-2"
              >
                Garantir Código + Licença <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => scrollTo('funcionalidades')} 
                className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 font-bold text-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
              >
                Ver Recursos do Sistema
              </button>
            </div>
          </FadeIn>

          {/* Video Section */}
          <FadeIn delay={200}>
            <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-black group">
              <div className="aspect-video relative overflow-hidden">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/yu4L4sK5YUY"
                  title="Apresentação FinanSaaS Pro"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Main Features Grid */}
      <section id="funcionalidades" className="py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-slate-900">Tecnologia de <span className="text-gradient">Próxima Geração</span></h2>
            <p className="text-slate-600 max-w-2xl mx-auto px-2">O sistema mais robusto do mercado, pronto para ser a espinha dorsal do seu negócio ou da sua nova software house.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: <Bot size={28} />, label: "INTELIGÊNCIA ARTIFICIAL", title: "Agente Financeiro IA", text: "Insights de elite e análise estratégica de negócios em tempo real integrada." },
              { icon: <Workflow size={28} />, label: "AUTOMAÇÃO N8N", title: "Automações & N8N", text: "Fluxos de trabalho inteligentes e integrações complexas prontas para escalar." },
              { icon: <MessageSquare size={28} />, label: "WHATSAPP BOT", title: "Conexão WhatsApp", text: "Transforme conversas em dados financeiros automáticos via API Oficial." },
              { icon: <BookOpen size={28} />, label: "ADMINISTRAÇÃO", title: "Livro Caixa Completo", text: "Gestão completa de fluxo e auditoria com visão clara de todas as transações." },
              { icon: <PieChart size={28} />, label: "INDICADORES", title: "Dashboard de Métricas", text: "Acompanhe MRR, Churn e faturamento real em um painel profissional." },
              { icon: <Palette size={28} />, label: "PERSONALIZAÇÃO", title: "White Label Total", text: "Troque logos, cores e domínios. Um SaaS 100% seu para vender com sua marca." }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-green-300 transition-all hover:bg-white hover:shadow-xl group">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-green-500 group-hover:text-white">
                  {feature.icon}
                </div>
                <span className="text-[10px] font-bold tracking-widest text-green-600 mb-2 block uppercase">{feature.label}</span>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Stats */}
      <section className="py-16 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-gradient mb-2">45%</div>
              <div className="text-slate-500 text-xs sm:text-sm uppercase tracking-widest font-bold">Crescimento Médio</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-gradient mb-2">98%</div>
              <div className="text-slate-500 text-xs sm:text-sm uppercase tracking-widest font-bold">Satisfação Clientes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-gradient mb-2">24h</div>
              <div className="text-slate-500 text-xs sm:text-sm uppercase tracking-widest font-bold">Time-to-Market</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-gradient mb-2">R$ 50k</div>
              <div className="text-slate-500 text-xs sm:text-sm uppercase tracking-widest font-bold">Economia Tech</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interface Mockup Slider */}
      <section id="dashboard" className="py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-green-600 font-bold tracking-widest text-xs uppercase mb-4 block">Tecnologia 100% Responsiva</span>
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight text-slate-900">Interface de <span className="text-gradient">Alta Performance</span></h2>
            <p className="text-slate-600 max-w-2xl mx-auto px-2">Visualize cada detalhe do faturamento em um painel projetado para clareza e velocidade de decisão.</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="glass-card rounded-[2rem] p-2 sm:p-4 border border-slate-200 shadow-3xl bg-slate-50/50">
                <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl h-[400px] sm:h-[600px] flex flex-col">
                  <div className="flex border-b border-white/5 p-3 items-center gap-3 bg-slate-950">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    </div>
                    <div className="bg-white/5 px-3 py-1 rounded text-[10px] text-white/40 font-mono">app.finansaaspro.com.br</div>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <ImageSlider images={systemImages} />
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Agent Spotlight */}
      <section className="py-16 sm:py-24 relative bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="text-green-600 font-bold tracking-widest text-sm uppercase mb-4 block">Diferencial Premium</span>
            <h2 className="text-3xl sm:text-5xl font-bold mb-8 leading-tight text-slate-900">Seu SaaS já nasce com <br /> <span className="text-gradient">Inteligência Artificial</span></h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Esqueça apenas números frios. Com o agente de IA integrado ao FinanSaaS, seus clientes recebem insights automáticos sobre a saúde do negócio. É o diferencial tecnológico que permite cobrar tickets mais altos.
            </p>
            <div className="space-y-4">
              {[
                "Análises financeiras automatizadas",
                "Leitura de dados em linguagem natural",
                "Apoio estratégico na tomada de decisão"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={16} className="text-green-600" />
                  </div>
                  <span className="font-bold text-slate-800">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Chat Preview */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-4 sm:p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-6 px-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                        <Bot size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-sm text-slate-900">Agente FinanSaaS</p>
                        <p className="text-[10px] text-green-600 font-bold animate-pulse uppercase tracking-wider">Online agora</p>
                    </div>
                </div>
                <Sparkles size={18} className="text-green-500" />
            </div>
            
            <div className="space-y-4 h-[350px] overflow-y-auto mb-6 px-2 custom-scrollbar">
                <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-100 text-sm max-w-[85%] text-slate-700">
                    Olá! Sou o assistente de IA do FinanSaaS. Como posso ajudar com sua gestão financeira hoje?
                </div>
                <div className="bg-green-500 p-4 rounded-2xl rounded-tr-none border border-green-600 text-sm max-w-[85%] ml-auto text-right text-white">
                    O que é MRR e como o FinanSaaS calcula?
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-100 text-sm max-w-[85%] text-slate-700">
                    MRR (Monthly Recurring Revenue) é sua receita mensal recorrente. Eu calculo somando todos os seus planos ativos menos o churn do período. Quer que eu analise seu faturamento deste mês?
                </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-2 flex items-center gap-2">
                <input type="text" placeholder="Pergunte algo sobre sua gestão..." className="bg-transparent border-none focus:ring-0 text-sm flex-1 px-3 outline-none text-slate-900" readOnly />
                <button className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white hover:scale-105 transition-transform shadow-lg shadow-green-500/20">
                    <Send size={18} />
                </button>
            </div>
          </div>
        </div>
      </section>

      {/* Business Opportunity & White Label Simulator */}
      <section id="oportunidade" className="py-16 sm:py-24 bg-green-50/30">
        <div className="max-w-[1400px] mx-auto px-4 grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-32">
                <span className="text-green-600 font-bold tracking-widest text-sm uppercase mb-4 block">Oportunidade de Negócio</span>
                <h2 className="text-3xl sm:text-5xl font-bold mb-8 leading-tight text-slate-900">Seja Dono da Tecnologia + <br /> <span className="text-gradient">Lucro de Revenda 100% Seu</span></h2>
                
                {/* Simulator Controls */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl mb-8">
                    <div className="text-center mb-6">
                        <span className="text-[10px] font-bold tracking-widest text-green-600 uppercase block mb-1">Simulador White-Label</span>
                        <h3 className="text-lg font-bold text-slate-900">Personalize seu Sistema</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Nome da Sua Marca</label>
                            <input 
                                type="text" 
                                value={simName} 
                                onChange={(e) => setSimName(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-500 transition-colors text-slate-900 font-semibold"
                                placeholder="Digite o nome da marca..."
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Cor de Identidade</label>
                            <div className="flex gap-2.5 flex-wrap">
                                {['#22c55e', '#3b82f6', '#10b981', '#f43f5e', '#8b5cf6', '#0ea5e9'].map(color => (
                                    <button 
                                        key={color}
                                        onClick={() => setSimColor(color)}
                                        className={`w-9 h-9 rounded-xl border-2 transition-all ${simColor === color ? 'scale-110 border-slate-900 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {[
                        { title: "Código-Fonte Completo", desc: "Acesso total aos arquivos do sistema." },
                        { title: "White-Label Vitalício", desc: "Sua marca, suas regras, sem mensalidades." },
                        { title: "Revenda Ilimitada", desc: "Venda para quantos clientes quiser e lucre 100%." }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-3">
                            <CheckCircle2 className="text-green-600 flex-shrink-0" size={18} />
                            <div>
                                <p className="font-bold text-sm text-slate-900">{item.title}</p>
                                <p className="text-[11px] text-slate-600">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-8">
                {/* Advanced Mockup Inspired by Image */}
                <div className="bg-white p-2 rounded-[2.5rem] border border-slate-200 shadow-3xl overflow-hidden">
                    <div className="bg-[#f8fafc] rounded-[2rem] overflow-hidden flex h-[550px] sm:h-[650px] shadow-inner border border-slate-100">
                        {/* Sidebar */}
                        <div className="w-[180px] sm:w-[220px] bg-[#0f172a] h-full flex flex-col p-4 flex-shrink-0">
                            <div className="flex items-center gap-2 mb-8 px-2">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: simColor }}>
                                    <TrendingUp size={16} className="text-white" />
                                </div>
                                <span className="font-bold text-white text-sm truncate">{simName}</span>
                            </div>
                            
                            <div className="space-y-1 flex-1">
                                <div className="p-3 rounded-xl flex items-center gap-3 text-white transition-all shadow-lg" style={{ backgroundColor: simColor }}>
                                    <Layout size={18} />
                                    <span className="text-xs font-bold">Dashboard</span>
                                </div>
                                {[
                                    { icon: <Workflow size={18} />, label: "Transações" },
                                    { icon: <MessageSquare size={18} />, label: "WhatsApp Bot" },
                                    { icon: <Bot size={18} />, label: "Agente IA" },
                                    { icon: <Zap size={18} />, label: "Automações" },
                                    { icon: <Palette size={18} />, label: "White Label" }
                                ].map((item, i) => (
                                    <div key={i} className="p-3 rounded-xl flex items-center gap-3 text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
                                        {item.icon}
                                        <span className="text-xs font-semibold">{item.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-auto space-y-4">
                                <div className="bg-[#1e293b] p-3 rounded-xl border border-white/5">
                                    <p className="text-[9px] font-bold text-orange-400 mb-1 uppercase tracking-wider">Status WhatsApp</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                                        <span className="text-[10px] text-white font-medium">Desconectado</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-slate-400 px-2 py-2 cursor-pointer hover:text-white transition-all">
                                    <LogOut size={16} />
                                    <span className="text-xs font-semibold">Encerrar Sessão</span>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 flex flex-col overflow-hidden">
                            {/* Header */}
                            <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 flex-shrink-0">
                                <div className="relative max-w-xs w-full">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                                    <div className="h-9 bg-[#f1f5f9] rounded-full border border-slate-200 w-full pl-9 pr-4 text-[10px] text-slate-400 flex items-center">
                                        Buscar em {simName}...
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-9 h-9 rounded-full bg-[#f1f5f9] border border-slate-200 flex items-center justify-center text-slate-500 relative">
                                        <Bell size={16} />
                                        <div className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-green-500 rounded-full border border-white" />
                                    </div>
                                    <div className="flex items-center gap-2 bg-[#f1f5f9] py-1 px-1.5 pr-4 rounded-full border border-slate-200">
                                        <div className="w-7 h-7 bg-[#0f172a] rounded-full flex items-center justify-center text-white">
                                            <User size={14} />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-bold text-slate-900 leading-none mb-0.5">Eduardo Mendes</p>
                                            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Sócio Fundador</p>
                                        </div>
                                    </div>
                                </div>
                            </header>

                            {/* Dashboard Body */}
                            <div className="flex-1 p-6 overflow-y-auto bg-slate-50/30">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h2 className="text-xl font-extrabold text-[#0f172a] mb-1">Seu Negócio em Números</h2>
                                        <p className="text-[10px] text-slate-500 italic font-medium">Dados em tempo real alimentados por IA e integrações n8n.</p>
                                    </div>
                                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-bold text-[11px] shadow-lg transition-transform hover:scale-105" style={{ backgroundColor: simColor }}>
                                        <Plus size={14} /> Registrar Movimento
                                    </button>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                    {[
                                        { label: "FATURAMENTO (MRR)", value: "R$ 20.500", detail: "↑ 24.8% ESTE MÊS", detailColor: "text-green-500" },
                                        { label: "BURN RATE (SAÍDAS)", value: "R$ 14.200", detail: "CUSTO OPERACIONAL CONTROLADO", detailColor: "text-red-400" },
                                        { label: "MARGEM DE LUCRO", value: "30.7%", detail: "ALTAMENTE ESCALÁVEL", featured: true },
                                        { label: "CHURN RATE", value: "1.8%", detail: "SAÚDE DA BASE: OK", detailColor: "text-blue-500", icon: <Users size={12} /> }
                                    ].map((stat, i) => (
                                        <div 
                                            key={i} 
                                            className={`p-4 rounded-2xl border transition-all ${stat.featured ? 'text-white shadow-xl' : 'bg-white border-slate-100 shadow-sm'}`}
                                            style={stat.featured ? { backgroundColor: simColor } : {}}
                                        >
                                            <p className={`text-[8px] font-black uppercase tracking-widest mb-2 ${stat.featured ? 'text-white/80' : 'text-slate-400'}`}>{stat.label}</p>
                                            <p className="text-xl font-extrabold mb-1">{stat.value}</p>
                                            <div className="flex items-center gap-1">
                                                {stat.icon && stat.icon}
                                                <p className={`text-[7px] font-black uppercase ${stat.featured ? 'text-white' : stat.detailColor}`}>{stat.detail}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Charts Row */}
                                <div className="grid lg:grid-cols-12 gap-6">
                                    <div className="lg:col-span-8 bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm">
                                        <div className="flex items-center justify-between mb-6">
                                            <p className="text-xs font-extrabold text-slate-900">Performance Financeira</p>
                                            <div className="flex gap-3">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: simColor }} />
                                                    <span className="text-[8px] font-bold text-slate-400">Entradas</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                                    <span className="text-[8px] font-bold text-slate-400">Saídas</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-40 w-full relative">
                                            <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                                                <path d="M0,80 Q50,75 100,85 T200,88 T300,82 T400,20" fill="none" stroke={simColor} strokeWidth="3" strokeLinecap="round" />
                                                <path d="M0,80 Q50,75 100,85 T200,88 T300,82 T400,20 L400,100 L0,100 Z" fill={`url(#gradient-${simColor.replace('#','')})`} opacity="0.1" />
                                                <path d="M0,90 Q80,95 160,80 T320,85 T400,60" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4" />
                                                <defs>
                                                    <linearGradient id={`gradient-${simColor.replace('#','')}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                                        <stop offset="0%" style={{ stopColor: simColor, stopOpacity: 1 }} />
                                                        <stop offset="100%" style={{ stopColor: simColor, stopOpacity: 0 }} />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
                                                {['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov'].map(m => (
                                                    <span key={m} className="text-[8px] font-bold text-slate-300">{m}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-4 bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm flex flex-col items-center">
                                        <p className="text-xs font-extrabold text-slate-900 self-start mb-6">Mix de Receita</p>
                                        <div className="relative w-28 h-28 mb-6">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle cx="56" cy="56" r="48" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                                                <circle cx="56" cy="56" r="48" fill="none" stroke={simColor} strokeWidth="12" strokeDasharray="301.59" strokeDashoffset="105.5" strokeLinecap="round" />
                                                <circle cx="56" cy="56" r="48" fill="none" stroke="#3b82f6" strokeWidth="12" strokeDasharray="301.59" strokeDashoffset="240.5" strokeLinecap="round" />
                                                <circle cx="56" cy="56" r="48" fill="none" stroke="#f59e0b" strokeWidth="12" strokeDasharray="301.59" strokeDashoffset="270.5" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                        <div className="w-full bg-[#f8fafc] p-2 rounded-xl flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: simColor }} />
                                                <span className="text-[8px] font-bold text-slate-600">Recorrência (MRR)</span>
                                            </div>
                                            <span className="text-[8px] font-black" style={{ color: simColor }}>65%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Simulator Info Footer */}
                    <div className="bg-slate-900 py-3 px-6 flex items-center justify-between">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                            <Sparkles size={12} className="text-yellow-400" /> Sistema 100% White-Label
                        </p>
                        <p className="text-[10px] text-slate-500 italic font-medium">Domínio atual: app.{simName.toLowerCase().replace(/\s/g, '')}.com.br</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-slate-900">Para Quem é o <span className="text-gradient">FinanSaaS?</span></h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Ideal para quem quer empreender no mundo do software sem precisar começar do absoluto zero.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: <Zap />, title: "Empreendedores", desc: "Lance seu MVP em tempo recorde e foque no marketing." },
              { icon: <Users />, title: "Agências", desc: "Ofereça valor agregado para seus clientes de consultoria." },
              { icon: <BookOpen />, title: "Contadores", desc: "Modernize sua entrega com um sistema financeiro premium." },
              { icon: <Smartphone />, title: "Desenvolvedores", desc: "Economize centenas de horas de desenvolvimento base." },
              { icon: <Youtube />, title: "Produtores Digitais", desc: "Crie uma nova fonte de receita recorrente para sua audiência." },
              { icon: <PieChart />, title: "Investidores", desc: "Uma base sólida para criar um ecossistema de SaaS." }
            ].map((target, i) => (
              <div key={i} className="bg-white border border-slate-100 p-6 sm:p-10 rounded-3xl text-center hover:bg-slate-50 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {target.icon}
                </div>
                <h3 className="font-bold text-lg mb-3 text-slate-900">{target.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{target.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-16 sm:py-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/5 blur-[100px] rounded-full" />
            <div className="relative flex flex-col items-center gap-4">
                <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-3xl w-full max-w-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <Monitor size={40} className="text-green-500" />
                        <h4 className="font-bold text-xl uppercase tracking-tighter italic text-slate-900">Desktop View</h4>
                    </div>
                    <div className="space-y-4">
                        <div className="h-4 bg-slate-50 rounded w-full" />
                        <div className="h-4 bg-slate-50 rounded w-5/6" />
                        <div className="grid grid-cols-3 gap-2 mt-4">
                            <div className="h-12 bg-green-50 rounded-lg" />
                            <div className="h-12 bg-slate-50 rounded-lg" />
                            <div className="h-12 bg-slate-50 rounded-lg" />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-3xl w-48 -mt-16 ml-32 rotate-6">
                    <div className="flex justify-center mb-6">
                        <SmartphoneIcon size={32} className="text-green-500" />
                    </div>
                    <div className="space-y-3">
                        <div className="h-2 bg-slate-50 rounded w-full" />
                        <div className="h-2 bg-slate-50 rounded w-full" />
                        <div className="h-10 bg-green-50 rounded-lg mt-2" />
                    </div>
                </div>
            </div>
          </div>
          <div>
            <span className="text-green-600 font-bold tracking-widest text-sm uppercase mb-4 block">Tecnologia & Escala</span>
            <h2 className="text-3xl sm:text-5xl font-bold mb-8 leading-tight text-slate-900">Arquitetura Pensada <br /> <span className="text-gradient">para Escalar</span></h2>
            <div className="grid gap-6">
                {[
                    { icon: <Bot size={20} />, title: "Agente de IA Integrado", text: "O sistema já vem com IA treinada para análise financeira." },
                    { icon: <PieChart size={20} />, title: "Dashboard Moderno", text: "Visualização profissional de MRR, Churn e faturamento." },
                    { icon: <Palette size={20} />, title: "White-Label Total", text: "Troque logos, cores e nomes em segundos." },
                    { icon: <Workflow size={20} />, title: "Integração com n8n", text: "Automações inteligentes prontas para escalar seu negócio." },
                    { icon: <Users size={20} />, title: "Multi-Usuário", text: "Estrutura pronta para times e níveis de permissão." },
                    { icon: <Smartphone size={20} />, title: "Código-Fonte Completo", text: "Receba 100% do código para editar como quiser." }
                ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-center group">
                        <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-all shadow-sm">
                            {item.icon}
                        </div>
                        <div>
                            <p className="font-bold text-sm text-slate-900">{item.title}</p>
                            <p className="text-xs text-slate-500">{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="checkout" className="py-16 sm:py-24 relative overflow-hidden px-4 bg-slate-50/50">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-xs font-bold mb-4 inline-block uppercase tracking-widest">Oferta Exclusiva de Lançamento</span>
            <h2 className="text-3xl sm:text-6xl font-extrabold mb-6 text-slate-900">Acesse agora por <br /> <span className="text-gradient">um preço simbólico</span></h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium">Acesso vitalício ao código-fonte, licença de revenda ilimitada e toda a inteligência do FinanSaaS.</p>
          </div>

          <div className="max-w-2xl mx-auto bg-white border border-slate-100 rounded-[3rem] p-8 sm:p-16 relative shadow-3xl">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-primary text-white font-black py-2 px-10 rounded-full shadow-lg uppercase tracking-widest text-sm">ACESSO TOTAL + REVENDA</div>
            
            <div className="text-center mb-10">
                <h3 className="text-2xl font-bold mb-2 text-slate-900">FinanSaaS Premium</h3>
                <p className="text-slate-500 text-sm mb-6">Tudo que você precisa para seu próprio SaaS.</p>
                <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl font-bold text-slate-900">R$</span>
                    <span className="text-7xl sm:text-9xl font-black text-gradient">19,90</span>
                </div>
                <p className="text-green-600 font-bold mt-4 tracking-widest uppercase">Pagamento Único • Sem Mensalidades</p>
            </div>

            <div className="space-y-4 mb-12">
              {[
                "Código-Fonte 100% Editável",
                "Direito de Revenda Ilimitado",
                "White-Label Total (Troca de Marca)",
                "Agente de IA Integrado",
                "Dashboard Financeiro Completo",
                "Integração n8n Pronta",
                "Atualizações Vitalícias"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={12} />
                  </div>
                  <span className="text-slate-700 font-bold">{item}</span>
                </div>
              ))}
            </div>

            <button 
              className="btn-pulse w-full bg-gradient-primary py-6 rounded-2xl text-white font-black text-2xl active:scale-[0.98] transition-all shadow-2xl shadow-green-500/40 flex items-center justify-center gap-4 group uppercase"
            >
              Garantir Meu Acesso Agora <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </button>
            <p className="text-center text-slate-500 mt-8 text-sm font-semibold flex items-center justify-center gap-3">
                <ShieldCheck size={20} className="text-green-600" /> Pagamento seguro via PerfectPay. Entrega imediata no seu e-mail.
            </p>
            <div className="flex justify-center gap-6 mt-8 opacity-60">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_Pix_Brasil.png" className="h-4" alt="PIX" />
            </div>
          </div>
          <p className="text-center text-slate-500 mt-8 text-sm italic font-medium">Garantia incondicional de 7 dias. Não gostou? Devolvemos seu dinheiro.</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-slate-900">Dúvidas <span className="text-gradient">Frequentes</span></h2>
          <div className="space-y-1">
            <FAQItem question="O código fonte é realmente meu?" answer="Sim! Ao adquirir, você recebe o repositório completo do sistema para baixar, modificar e instalar onde quiser. A licença é vitalícia e 100% sua." />
            <FAQItem question="Posso instalar em quantos domínios quiser?" answer="Exatamente. Nossa licença permite instalações ilimitadas. Você pode criar um ecossistema completo de SaaS para diferentes nichos usando a mesma base." />
            <FAQItem question="Quais tecnologias são utilizadas?" answer="O FinanSaaS Pro utiliza uma stack robusta com PHP moderno, Node.js para integrações de IA, banco de dados relacional e integrações nativas com APIs n8n e WhatsApp." />
            <FAQItem question="O treinamento está incluso?" answer="Com certeza! Preparamos uma área de membros exclusiva ensinando passo a passo como realizar a instalação, configurar seu servidor e personalizar sua marca em minutos." />
            <FAQItem question="Como funciona o suporte?" answer="Oferecemos suporte prioritário via WhatsApp para ajudar em qualquer dúvida técnica ou de configuração que possa surgir durante o seu início." />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                        <TrendingUp size={24} />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-slate-900">FinanSaaS Pro</span>
                </div>
                <p className="text-slate-500 max-w-sm leading-relaxed mb-8 font-medium">A base tecnológica completa para o seu próximo grande negócio digital. Gestão financeira inteligente, automatizada e pronta para ser sua ou para revender.</p>
                <div className="flex gap-6 text-slate-400">
                    <a href="#" className="hover:text-green-600 transition-colors"><Instagram size={24} /></a>
                    <a href="#" className="hover:text-green-600 transition-colors"><Youtube size={24} /></a>
                </div>
            </div>
            <div>
                <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-400">Plataforma</h5>
                <ul className="space-y-4 text-slate-500 text-sm font-bold">
                    <li><button onClick={() => scrollTo('funcionalidades')} className="hover:text-green-600 transition-colors text-left">Funcionalidades</button></li>
                    <li><button onClick={() => scrollTo('dashboard')} className="hover:text-green-600 transition-colors text-left">Interface</button></li>
                    <li><button onClick={() => scrollTo('oportunidade')} className="hover:text-green-600 transition-colors text-left">Oportunidade</button></li>
                    <li><button onClick={() => scrollTo('faq')} className="hover:text-green-600 transition-colors text-left">FAQ</button></li>
                    <li><button onClick={() => scrollTo('checkout')} className="hover:text-green-600 transition-colors text-left">Preço</button></li>
                </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-sm font-medium">&copy; 2026 FinanSaaS Pro - Todos os direitos reservados.</p>
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck size={14} className="text-green-500" />
                <span>Ambiente 100% Seguro</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
