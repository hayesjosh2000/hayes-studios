import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Globe, 
  Share2, 
  TrendingUp, 
  BarChart3, 
  ArrowRight, 
  Menu, 
  X,
  Workflow,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Mail,
  Instagram,
  Music2,
  Zap,
  ShieldCheck,
  Search,
  Layers,
  Activity,
  Phone,
  MapPin,
  Plus
} from 'lucide-react';

const LOGO_URL = "https://i.ibb.co/GfPmzg1P/Untitled-design-5.png";
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSd0-VWWrlnZSfI_A3cIwiK4PCvD0_n8QZpb5fYHCq7SYbvWFQ/viewform?usp=dialog";

const BrandLogo = ({ size = "w-10 h-10", zoom = "scale-125" }) => (
  <div className={`${size} flex items-center justify-center relative overflow-visible`}>
    <img 
      src={LOGO_URL} 
      alt="Hayes Studios HS Logo" 
      className={`w-full h-full object-contain ${zoom} transition-transform duration-300`}
      style={{ display: 'block' }}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "https://via.placeholder.com/150/0D1015/2DD4BF?text=HS";
      }}
    />
  </div>
);

// High-performance 3D Sphere Animation
const InteractiveSphere = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const particleCount = 280;
    const radius = 220;
    let rotationX = 0;
    let rotationY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    class Particle3D {
      constructor() {
        this.phi = Math.acos(-1 + (Math.random() * 2));
        this.theta = Math.random() * Math.PI * 2;
        this.size = Math.random() * 1.2 + 0.4;
      }

      project() {
        const x = radius * Math.sin(this.phi) * Math.cos(this.theta);
        const y = radius * Math.sin(this.phi) * Math.sin(this.theta);
        const z = radius * Math.cos(this.phi);

        const rotX = x * Math.cos(rotationY) - z * Math.sin(rotationY);
        const rotZ = x * Math.sin(rotationY) + z * Math.cos(rotationY);
        const finalY = y * Math.cos(rotationX) - rotZ * Math.sin(rotationX);
        const finalZ = y * Math.sin(rotationX) + rotZ * Math.cos(rotationX);

        const perspective = 1000 / (1000 - finalZ);
        const px = rotX * perspective + canvas.width / 2;
        const py = finalY * perspective + canvas.height / 2;

        return { px, py, opacity: (finalZ + radius) / (radius * 2), size: this.size * perspective };
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle3D());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rotationX += (targetRotationX - rotationX) * 0.05;
      rotationY += (targetRotationY - rotationY) * 0.05;
      targetRotationY += 0.0012;
      targetRotationX += 0.0006;

      particles.forEach(p => {
        const { px, py, opacity, size } = p.project();
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45, 212, 191, ${opacity * 0.4})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full pointer-events-none" />;
};

const HeroBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = 1.2;
        this.density = (Math.random() * 20) + 1;
      }
      draw() {
        ctx.fillStyle = 'rgba(45, 212, 191, 0.2)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 15;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 15;
          }
        }
      }
    }

    const init = () => {
      particles = [];
      const numberOfParticles = (canvas.width * canvas.height) / 12000;
      for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-50 pointer-events-none" />;
};

const ProcessStepRow = ({ step, index, total }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className="relative mb-24 md:mb-40 last:mb-0">
      {index < total - 1 && (
        <div className="absolute left-[27px] md:left-1/2 top-14 w-[2px] h-full bg-gradient-to-b from-teal-500/40 via-teal-500/10 to-transparent md:-translate-x-1/2 hidden md:block" />
      )}

      <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-center gap-8 md:gap-20`}>
        <div className="w-full md:w-[45%] flex justify-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-teal-500/10 blur-[60px] rounded-full scale-0 group-hover:scale-100 transition-transform duration-700" />
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-[#0D1015] border border-white/10 flex items-center justify-center text-teal-400 shadow-2xl overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent" />
               {React.cloneElement(step.icon, { className: "w-10 h-10 md:w-14 md:h-14 relative z-10 group-hover:scale-110 transition-transform duration-500" })}
               <div className="absolute bottom-2 right-2 text-[10px] font-black text-white/5 uppercase tracking-widest">{step.number}</div>
            </div>
            <div className="absolute -inset-4 border border-teal-500/5 rounded-[2.5rem] animate-[spin_10s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="absolute left-7 md:left-1/2 top-0 md:-translate-x-1/2 flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-teal-500 shadow-[0_0_15px_rgba(45,212,191,0.6)] z-20" />
            <div className="w-[1px] h-full bg-teal-500/20 absolute top-4 hidden md:block" />
        </div>

        <div className={`w-full md:w-[45%] text-left ${isEven ? 'md:text-left' : 'md:text-right'}`}>
          <div className={`flex flex-col ${isEven ? 'md:items-start' : 'md:items-end'}`}>
            <span className="text-teal-400 font-bold uppercase tracking-[0.4em] text-[10px] mb-4">Step {step.number}</span>
            <h3 className="text-3xl md:text-5xl font-semibold text-white mb-6 tracking-tight">{step.title}</h3>
            <p className={`text-gray-500 text-lg leading-relaxed mb-8 max-w-md ${!isEven && 'md:ml-auto'}`}>
              {step.desc}
            </p>
            <div className={`flex flex-wrap gap-2 ${!isEven && 'md:justify-end'}`}>
              {step.tags.map((tag, t) => (
                <span key={t} className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-[9px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-teal-400 transition-all">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [view, setView] = useState('home'); 
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const lastScrollY = useRef(0);

  const allServices = useMemo(() => [
    {
      id: 'automation',
      icon: <Workflow className="w-8 h-8" />,
      title: "Automation",
      shortDesc: "We turn repetitive tasks into smart automations, helping your business save time.",
      fullDesc: "Our automation workflows are designed to eliminate human error and free up your team for high-value tasks. We specialize in connecting disparate software into one unified flow.",
      capabilities: ["Custom API Integrations", "CRM Automation", "Data Pipeline Architecture", "Internal Tooling"],
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 'websites',
      icon: <Globe className="w-8 h-8" />,
      title: "Websites",
      shortDesc: "Strategic, conversion-focused websites designed to communicate your value clearly.",
      fullDesc: "We don't just build sites; we build digital sales machines optimized for user intent and conversion. Fast, responsive, and SEO-ready.",
      capabilities: ["UI/UX Design", "Headless CMS Solutions", "E-commerce Optimization", "Performance Audits"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 'social-content',
      icon: <Share2 className="w-8 h-8" />,
      title: "Social Content",
      shortDesc: "Scroll-stopping content that reflects your brand and drives real engagement.",
      fullDesc: "High-fidelity visual assets and copy tailored for specific platform algorithms to maximize your reach and brand authority.",
      capabilities: ["Short-form Video Production", "Brand Photography", "Visual Storytelling", "Copywriting"],
      image: "https://images.unsplash.com/photo-1493119508027-2b584f234d6c?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 'social-growth',
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Social Growth",
      shortDesc: "Proven strategies to increase reach, engagement, and followers.",
      fullDesc: "Sustainable growth through community building and algorithmic alignment. We focus on quality metrics that lead to revenue.",
      capabilities: ["Organic Reach Strategy", "Community Management", "Influencer Partnerships", "Growth Audits"],
      image: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 'analytics',
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics",
      shortDesc: "Smarter decision-making through optimized digital performance tracking.",
      fullDesc: "Data without insight is noise. We set up tracking frameworks that tell you exactly why customers convert and where they drop off.",
      capabilities: ["GA4 Implementation", "Custom Dashboards", "Conversion Rate Optimization", "Customer Attribution"],
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=800"
    }
  ], []);

  const projects = useMemo(() => [
    {
      label: "Project 01",
      title: "Hayes Studios – Digital Growth Platform",
      desc: "A conversion-focused website and lead capture system built to demonstrate how structured digital systems generate consistent enquiries for small businesses.",
      tags: ["Website Design", "Lead Capture System", "Conversion Structure", "Analytics Setup"],
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200"
    },
    {
      label: "Project 02",
      title: "Local Retail Business – Website & Enquiry System",
      desc: "In-progress build focused on transforming a traditional local business into a structured online presence designed to drive enquiries and support long-term growth.",
      tags: ["Website Build", "Content Structure", "Enquiry Funnel", "Performance Tracking"],
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200"
    },
    {
      label: "Project 03",
      title: "Social Content Framework – Growth Model",
      desc: "A structured content system designed to help small businesses maintain consistent visibility while turning attention into measurable customer enquiries.",
      tags: ["Content Strategy", "Short-Form Video", "Brand Positioning", "Engagement Growth"],
      image: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&q=80&w=1200"
    },
    {
      label: "Project 04",
      title: "Analytics & Reporting – Unified Growth Tracking",
      desc: "A custom performance dashboard consolidating website and social metrics into one streamlined view to support smarter business decisions.",
      tags: ["GA4 Setup", "Dashboard Build", "Performance Reporting", "Conversion Insights"],
      image: "https://i.ibb.co/66ngJYK/2323.jpg",
      objectPos: "object-top"
    }
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 50);
      lastScrollY.current = currentScroll;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    let slideTimer;
    if (isAutoPlaying) {
      slideTimer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % projects.length);
      }, 6000);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (slideTimer) clearInterval(slideTimer);
    };
  }, [projects.length, isAutoPlaying]);

  const handleNavigate = (newView) => {
    if (view === newView) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setView(newView);
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const nextSlide = (e) => {
    e?.stopPropagation();
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = (e) => {
    e?.stopPropagation();
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const processSteps = [
    { 
      number: "01", 
      title: "Discovery", 
      desc: "We understand your business, goals, and current online presence to identify where growth is being lost.",
      icon: <Search className="w-6 h-6" />,
      tags: ["Website & Social Review", "Business Goals", "Customer Journey"]
    },
    { 
      number: "02", 
      title: "Build", 
      desc: "We design and implement the right website, content, and systems to generate consistent enquiries.",
      icon: <Layers className="w-6 h-6" />,
      tags: ["Website Design", "Content Structure", "Lead Capture Setup"]
    },
    { 
      number: "03", 
      title: "Optimise", 
      desc: "We track performance, refine the strategy, and improve results over time.",
      icon: <Activity className="w-6 h-6" />,
      tags: ["Analytics Setup", "Conversion Improvements", "Ongoing Support"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0C10] text-gray-200 selection:bg-teal-500/30 font-sans antialiased overflow-x-hidden">
      <style>
        {`
          @keyframes slide-mask-reveal {
            from { transform: translateY(110%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes letter-pop {
            0% { transform: translateY(20px); opacity: 0; filter: blur(10px); }
            100% { transform: translateY(0); opacity: 1; filter: blur(0); }
          }
          @keyframes teal-glow-pulse {
            0%, 100% { text-shadow: 0 0 0px transparent; }
            50% { text-shadow: 0 0 20px rgba(45, 212, 191, 0.4); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); filter: blur(10px); }
            to { opacity: 1; transform: translateY(0); filter: blur(0); }
          }
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes orb-float {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-30px) scale(1.05); }
          }
          .animate-mask-line { 
            animation: slide-mask-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
          }
          .animate-letter {
            display: inline-block;
            animation: letter-pop 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
          }
          .animate-in { 
            animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
            opacity: 0; 
          }
          .glow-scale {
            animation: teal-glow-pulse 4s ease-in-out infinite;
          }
          .text-gradient {
            background: linear-gradient(to bottom right, #fff 40%, rgba(255,255,255,0.4));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .glass-card {
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.05);
          }
          .marquee-container {
            display: flex;
            width: fit-content;
            animation: marquee 30s linear infinite;
          }
          .line-mask {
            display: block;
            overflow: hidden;
            padding-bottom: 0.25em;
            margin-bottom: -0.25em;
            line-height: 1.25;
          }
        `}
      </style>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 h-20 transition-all duration-500 ${scrolled || view !== 'home' ? 'bg-[#0A0C10]/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-full">
          <div className="flex items-center space-x-4 group cursor-pointer" onClick={() => handleNavigate('home')}>
            <BrandLogo size="w-10 h-10" zoom="scale-[1.3]" />
            <div className="flex flex-col -space-y-1">
              <span className="text-lg font-semibold tracking-tight text-white group-hover:text-teal-400 transition-colors">Hayes Studios</span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-gray-500">Systems & Design</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-10 text-[10px] font-bold uppercase tracking-[0.2em]">
            <button onClick={() => scrollToSection('expertise')} className="text-gray-400 hover:text-teal-400 transition-colors">Services</button>
            <button onClick={() => scrollToSection('portfolio')} className="text-gray-400 hover:text-teal-400 transition-colors">Portfolio</button>
            <button onClick={() => scrollToSection('process')} className="text-gray-400 hover:text-teal-400 transition-colors">Process</button>
            
            <button 
              onClick={() => scrollToSection('start-project')}
              className="px-6 py-2.5 rounded-xl bg-teal-500 text-black font-bold hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/20 transform active:scale-95"
            >
              Contact me
            </button>
          </div>
          
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0A0C10] flex flex-col justify-center items-center space-y-8 animate-in">
          <button onClick={() => scrollToSection('expertise')} className="text-2xl font-bold uppercase tracking-widest text-white">Services</button>
          <button onClick={() => scrollToSection('portfolio')} className="text-2xl font-bold uppercase tracking-widest text-white">Portfolio</button>
          <button onClick={() => scrollToSection('process')} className="text-2xl font-bold uppercase tracking-widest text-white">Process</button>
          <button onClick={() => scrollToSection('start-project')} className="text-2xl font-bold uppercase tracking-widest text-teal-400">
             Start a Project
          </button>
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-white"><X size={32} /></button>
        </div>
      )}

      {view === 'home' && (
        <main>
          {/* HERO */}
          <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <HeroBackground />
            </div>
            
            <div 
              className="absolute top-[10%] right-[-5%] w-[60%] h-[80%] opacity-50 hidden lg:block pointer-events-none z-0" 
              style={{ animation: 'orb-float 15s ease-in-out infinite' }}
            >
              <InteractiveSphere />
            </div>

            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-teal-500/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none z-0" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pointer-events-none">
              <div className="max-w-4xl">
                <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 animate-in" style={{animationDelay: '0.1s'}}>
                  <div className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                  <p className="text-teal-400 font-bold tracking-[0.3em] uppercase text-[10px]">WEBSITES • CONTENT • SYSTEMS</p>
                </div>
                
                <h1 className="text-4xl md:text-[5rem] font-semibold text-white leading-[1.1] mb-8 tracking-tighter">
                  <span className="line-mask">
                    <span className="inline-block animate-mask-line text-gradient" style={{ animationDelay: '0.2s' }}>
                      We Help Small
                    </span>
                  </span>
                  <span className="line-mask">
                    <span className="inline-block animate-mask-line text-gradient" style={{ animationDelay: '0.35s' }}>
                      Businesses Grow
                    </span>
                  </span>
                  <span className="line-mask">
                    <span className="inline-block animate-mask-line text-teal-400 italic glow-scale" style={{ animationDelay: '0.5s' }}>
                      {"Online.".split("").map((char, i) => (
                        <span 
                          key={i} 
                          className="animate-letter" 
                          style={{ animationDelay: `${0.5 + (i * 0.08)}s` }}
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-10 max-w-xl animate-in" style={{animationDelay: '0.9s'}}>
                  Websites, content and smart systems designed to generate consistent enquiries.
                </p>
                
                {/* BUTTONS MATCHED TO SCREENSHOT */}
                <div className="flex flex-col sm:flex-row items-center gap-6 animate-in relative z-30 pointer-events-auto" style={{animationDelay: '1.1s'}}>
                  <button 
                    onClick={() => scrollToSection('expertise')} 
                    className="group bg-[#FFFFFF] text-[#0A0C10] font-black px-12 py-6 rounded-full transition-all uppercase text-[10px] tracking-[0.2em] flex items-center justify-center hover:scale-105 cursor-pointer active:scale-95 h-16 min-w-[240px]"
                  >
                    Explore Services <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  
                  <button 
                    onClick={() => scrollToSection('start-project')} 
                    className="flex items-center justify-center space-x-3 px-10 py-6 rounded-2xl bg-[#1CB8A1] text-[#0A0C10] font-black hover:bg-[#2DD4BF] hover:scale-105 transition-all shadow-[0_0_20px_rgba(28,184,161,0.4)] group transform active:scale-95 cursor-pointer h-16 min-w-[240px]"
                  >
                    <span className="tracking-[0.2em] uppercase text-[10px]">Start a Project</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0A0C10] to-transparent z-10 pointer-events-none" />
          </section>

          {/* Trust Bar */}
          <div className="py-10 border-y border-white/5 bg-[#0D1015]/50 overflow-hidden relative">
            <div className="marquee-container flex space-x-12 items-center text-gray-600 font-bold text-[9px] uppercase tracking-[0.5em] whitespace-nowrap">
              <span className="flex items-center px-4"><ShieldCheck className="mr-2 w-4 h-4 text-teal-500/40"/> High Performance Systems</span>
              <span className="flex items-center px-4"><Zap className="mr-2 w-4 h-4 text-teal-500/40"/> Rapid Implementation</span>
              <span className="flex items-center px-4"><Workflow className="mr-2 w-4 h-4 text-teal-500/40"/> Automation Architecture</span>
              <span className="flex items-center px-4"><Globe className="mr-2 w-4 h-4 text-teal-500/40"/> Global Infrastructure</span>
              <span className="flex items-center px-4"><ShieldCheck className="mr-2 w-4 h-4 text-teal-500/40"/> High Performance Systems</span>
            </div>
          </div>

          {/* EXPERTISE */}
          <section id="expertise" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
              <div className="mb-14">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="w-10 h-[2px] bg-teal-500"></span>
                  <p className="text-teal-400 font-bold uppercase tracking-[0.4em] text-[10px]">Capabilities</p>
                </div>
                <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-tight">Our Expertise</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allServices.map((service) => (
                  <div 
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className="group p-8 rounded-[2rem] bg-white/[0.01] border border-white/5 hover:border-teal-500/20 hover:bg-white/[0.03] transition-all duration-500 cursor-pointer flex flex-col min-h-[340px]"
                  >
                    <div className="mb-8 w-14 h-14 rounded-2xl bg-teal-500/5 flex items-center justify-center text-teal-500/70 group-hover:text-teal-400 transition-all">
                      {React.cloneElement(service.icon, { className: "w-7 h-7" })}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{service.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">{service.shortDesc}</p>
                    <div className="flex items-center text-teal-400/60 font-bold text-[9px] uppercase tracking-[0.2em] group-hover:text-teal-400 transition-colors">
                      Learn More <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                ))}
                
                <div 
                  className="group p-8 rounded-[2rem] bg-teal-500/[0.03] border border-teal-500/20 hover:bg-teal-500/10 transition-all duration-500 cursor-default flex flex-col min-h-[340px] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Plus className="w-24 h-24 text-teal-400 animate-pulse" />
                  </div>
                  <div className="mb-8 w-14 h-14 rounded-2xl bg-teal-500/20 flex items-center justify-center text-teal-400 transition-all">
                    <Plus className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-teal-400 mb-3 tracking-tight">More to come</h3>
                  <p className="text-teal-500/60 text-sm leading-relaxed mb-8 flex-grow">
                    Our lab is constantly evolving. We're currently developing specialized services in proprietary AI integration and advanced growth systems.
                  </p>
                  <div className="flex items-center text-teal-400/80 font-bold text-[9px] uppercase tracking-[0.2em]">
                    Expanding our ecosystem <div className="ml-2 w-1 h-1 rounded-full bg-teal-400 animate-ping" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PORTFOLIO / WORK */}
          <section id="portfolio" className="py-32 bg-[#0D1015] border-y border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                <div className="w-full lg:w-3/5 relative">
                  <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden bg-[#13171F] border border-white/5 shadow-2xl">
                    {projects.map((project, index) => (
                      <div 
                        key={index}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}
                      >
                        <div className="w-full h-full relative">
                           <img 
                            src={project.image} 
                            className={`w-full h-full object-cover transition-all duration-1000 ${project.objectPos || 'object-center'}`}
                            alt={project.title} 
                            loading="eager"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1015]/80 via-transparent to-transparent z-20" />
                      </div>
                    ))}
                    
                    <div className="absolute bottom-10 right-10 flex space-x-3 z-30">
                      <button onClick={prevSlide} className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-white hover:bg-teal-500 hover:text-black transition-all shadow-xl group/btn">
                        <ChevronLeft size={24} className="group-hover/btn:scale-110 transition-transform" />
                      </button>
                      <button onClick={nextSlide} className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-white hover:bg-teal-500 hover:text-black transition-all shadow-xl group/btn">
                        <ChevronRight size={24} className="group-hover/btn:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="w-full lg:w-2/5 relative z-10">
                  <div className="flex items-center space-x-4 mb-8">
                    <span className="w-10 h-[2px] bg-teal-500"></span>
                    <p className="text-teal-400 font-bold uppercase tracking-[0.4em] text-[10px]">PORTFOLIO</p>
                  </div>
                  <div className="relative min-h-[350px]">
                    {projects.map((project, index) => (
                      <div key={index} className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                        <p className="text-teal-500/80 font-bold text-[9px] uppercase tracking-[0.3em] mb-3">{project.label}</p>
                        <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-6 leading-tight">{project.title}</h2>
                        <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-md">{project.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 text-[8px] font-bold text-teal-400/90 uppercase tracking-[0.15em] hover:bg-teal-500/10 transition-colors">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center space-x-3 pt-10 mt-10 border-t border-white/5">
                    {projects.map((_, i) => (
                      <button key={i} onClick={() => { setIsAutoPlaying(false); setCurrentSlide(i); }} className={`h-1.5 transition-all duration-500 rounded-full ${i === currentSlide ? 'w-10 bg-teal-500' : 'w-2.5 bg-white/10 hover:bg-white/30'}`} />
                    ))}
                  </div>
                  <div className="mt-8">
                    <h3 className="text-white text-xl font-semibold tracking-tight">Selected Projects</h3>
                    <p className="text-gray-500 text-sm mt-2">Founding projects and strategic builds designed to generate measurable growth.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* DEPLOYMENT STRATEGY */}
          <section id="process" className="py-32 relative bg-[#0A0C10] overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2DD4BF 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-teal-500/10 to-transparent hidden md:block" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="text-center mb-32 max-w-2xl mx-auto">
                <div className="inline-flex items-center space-x-3 mb-6">
                  <div className="w-12 h-[1px] bg-teal-500/50" />
                  <p className="text-teal-400 font-bold uppercase tracking-[0.5em] text-[10px]">Framework</p>
                  <div className="w-12 h-[1px] bg-teal-500/50" />
                </div>
                <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter leading-[0.95] mb-6">
                  Our <span className="text-teal-500 italic">Deployment</span> Strategy
                </h2>
                <p className="text-gray-500 text-lg">Linear progress for compounding results.</p>
              </div>
              
              <div className="relative">
                {processSteps.map((step, i) => (
                  <ProcessStepRow 
                    key={i} 
                    step={step} 
                    index={i} 
                    total={processSteps.length} 
                  />
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section id="start-project" className="py-32 relative bg-[#0A0C10] overflow-hidden border-t border-white/5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-teal-500/[0.02] blur-[150px] rounded-full" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">
                <div className="flex flex-col h-full">
                  <div className="animate-in mb-12">
                    <h2 className="text-6xl md:text-8xl font-semibold text-white tracking-tighter mb-8 text-gradient">Let's talk systems.</h2>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                      Whether you're looking to automate, scale your content, or build a high-converting site, we're ready to help.
                    </p>
                  </div>
                  
                  <div className="flex-grow" />

                  <div className="space-y-4 max-w-md animate-in" style={{animationDelay: '0.2s'}}>
                    <div className="flex items-center space-x-5 group p-6 rounded-2xl bg-white/[0.02] border border-white/5 transition-all">
                      <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-black transition-all">
                        <Mail size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[8px] font-bold text-gray-600 uppercase tracking-widest mb-0.5">Email us</p>
                        <p className="text-white font-medium">hayesstudio26@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-5 group p-6 rounded-2xl bg-white/[0.02] border border-white/5 transition-all">
                      <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-black transition-all">
                        <Phone size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[8px] font-bold text-gray-600 uppercase tracking-widest mb-0.5">Call / WhatsApp</p>
                        <p className="text-white font-medium">+44 78523 81040</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-5 group p-6 rounded-2xl bg-white/[0.02] border border-white/5 transition-all">
                      <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-black transition-all">
                        <MapPin size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[8px] font-bold text-gray-600 uppercase tracking-widest mb-0.5">Location</p>
                        <p className="text-white font-medium">Leeds, United Kingdom</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="animate-in flex" style={{animationDelay: '0.4s'}}>
                  <div className="w-full p-10 md:p-14 rounded-[3.5rem] bg-white/[0.02] border border-white/5 relative overflow-hidden flex flex-col">
                    <div className="absolute top-10 right-10 text-teal-500/20">
                      <Zap size={48} />
                    </div>
                    
                    <h3 className="text-4xl font-bold text-white mb-8">Work with us.</h3>
                    <p className="text-gray-400 mb-10 leading-relaxed text-lg">
                      Our 3-step framework ensures we're the perfect fit for your vision. Fill out our briefing form and we'll get back to you within 24-48 hours.
                    </p>
                    
                    <div className="space-y-6 mb-12 flex-grow">
                      <div className="flex items-center space-x-4">
                        <div className="w-6 h-6 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400">
                          <CheckCircle2 size={16} />
                        </div>
                        <p className="text-gray-300 font-medium">Complimentary 30-min discovery audit</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-6 h-6 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400">
                          <CheckCircle2 size={16} />
                        </div>
                        <p className="text-gray-300 font-medium">Custom technical roadmap proposal</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-6 h-6 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400">
                          <CheckCircle2 size={16} />
                        </div>
                        <p className="text-gray-300 font-medium">Dedicated engineer-led project lead</p>
                      </div>
                    </div>
                    
                    <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center space-x-4 bg-teal-500 hover:bg-teal-400 text-black font-bold py-6 rounded-3xl transition-all duration-500 shadow-2xl shadow-teal-500/20 group">
                      <span className="uppercase text-[11px] tracking-[0.3em] font-black">Let's get started</span>
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-blur-xl bg-[#0A0C10]/80">
          <div className="absolute inset-0" onClick={() => setSelectedService(null)} />
          <div className="relative w-full max-w-5xl bg-[#12161D] rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl animate-in">
            <button onClick={() => setSelectedService(null)} className="absolute top-8 right-8 z-10 p-3 text-white/50 hover:text-white transition-colors"><X size={28} /></button>
            <div className="flex flex-col lg:flex-row h-full">
              <div className="lg:w-1/2 aspect-square lg:aspect-auto overflow-hidden">
                <img src={selectedService.image} className="w-full h-full object-cover" alt={selectedService.title} />
              </div>
              <div className="lg:w-1/2 p-14 flex flex-col justify-center">
                <div className="text-teal-500 mb-8">{selectedService.icon}</div>
                <h2 className="text-4xl font-bold text-white mb-8 tracking-tight">{selectedService.title}</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-10">{selectedService.fullDesc}</p>
                <button onClick={() => { setSelectedService(null); scrollToSection('start-project'); }} className="mt-12 py-5 px-10 rounded-full bg-teal-500 text-black font-bold uppercase text-[10px] tracking-widest hover:bg-teal-400 transition-colors">
                  Inquire about this service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-20 bg-[#0A0C10] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-12">
            <div className="flex items-center space-x-4 cursor-pointer" onClick={() => handleNavigate('home')}>
              <BrandLogo size="w-12 h-12" zoom="scale-125" />
              <div className="flex flex-col -space-y-1">
                <span className="text-xl font-bold tracking-tight text-white uppercase">Hayes Studios</span>
                <span className="text-[9px] uppercase tracking-[0.4em] text-gray-500">Established 2024</span>
              </div>
            </div>
            <div className="flex items-center space-x-8 text-[9px] uppercase tracking-[0.4em] text-gray-600">
              <a href="#" className="hover:text-teal-500 transition-colors flex items-center"><Instagram size={14} className="mr-2"/> IG</a>
              <a href="#" className="hover:text-teal-500 transition-colors flex items-center"><Music2 size={14} className="mr-2"/> TT</a>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 text-[9px] uppercase tracking-[0.4em] text-gray-600">
            <p>© 2024 Hayes Studios Limited. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;