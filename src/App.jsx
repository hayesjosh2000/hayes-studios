import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Globe, 
  Share2, 
  TrendingUp, 
  BarChart3, 
  ArrowRight, 
  ChevronRight, 
  Menu, 
  X,
  CheckCircle2,
  Workflow,
  Search,
  Hammer,
  LineChart
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tealAccent = "#2DD4BF"; // Tailwind teal-400

  const services = [
    {
      icon: <Workflow className="w-6 h-6" style={{ color: tealAccent }} />,
      title: "Automation",
      desc: "We turn repetitive tasks into smart automations, helping your business save time, improve efficiency, and operate more smoothly."
    },
    {
      icon: <Globe className="w-6 h-6" style={{ color: tealAccent }} />,
      title: "Websites",
      desc: "We create strategic, conversion-focused websites designed to communicate your value clearly and turn visitors into customers."
    },
    {
      icon: <Share2 className="w-6 h-6" style={{ color: tealAccent }} />,
      title: "Social Media Content",
      desc: "We design and create scroll-stopping social media content that reflects your brand, connects with your audience, and drives real engagement."
    },
    {
      icon: <TrendingUp className="w-6 h-6" style={{ color: tealAccent }} />,
      title: "Social Media Growth",
      desc: "We implement proven growth strategies to increase reach, engagement, and followers — building a strong and active online presence."
    },
    {
      icon: <BarChart3 className="w-6 h-6" style={{ color: tealAccent }} />,
      title: "Analytics & Data",
      desc: "We collect and analyse data to support smarter decision-making and optimise digital performance."
    }
  ];

  const steps = [
    { 
      number: "01", 
      title: "Discover", 
      desc: "Understand your goals, systems, and challenges",
      icon: <Search className="w-5 h-5" />
    },
    { 
      number: "02", 
      title: "Build", 
      desc: "Design, automate, and structure with intention",
      icon: <Hammer className="w-5 h-5" />
    },
    { 
      number: "03", 
      title: "Optimise", 
      desc: "Refine, improve, and support long-term growth",
      icon: <LineChart className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0C10] text-gray-200 selection:bg-teal-500/30 font-sans antialiased">
      {/* Custom Styles */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease forwards;
          }
        `}
      </style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A0C10]/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center">
              <span className="text-black font-bold text-xs">HS</span>
            </div>
            <span className="text-xl font-medium tracking-tight text-white">Hayes Studios</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-10 text-sm font-medium tracking-wide">
            <a href="#" className="hover:text-teal-400 transition-colors">Services</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Process</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Experience</a>
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2 rounded-full transition-all">
              Get in Touch
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-52 md:pb-40 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-teal-500/5 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <p className="text-teal-400 font-medium tracking-[0.2em] uppercase text-xs mb-6 opacity-0 animate-fadeInUp">
              Built on 10+ years of IT experience
            </p>
            <h1 className="text-5xl md:text-7xl font-semibold text-white leading-[1.1] mb-8 tracking-tight">
              Digital systems and design that help businesses grow.
            </h1>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl">
              We help brands build a stronger online presence through content, websites, automation, and smart strategy.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <button className="bg-teal-500 hover:bg-teal-400 text-[#0A0C10] font-bold px-8 py-4 rounded-full transition-all transform hover:scale-105">
                View Services
              </button>
              <button className="group flex items-center text-white font-medium hover:text-teal-400 transition-colors">
                Start a Project <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Positioning */}
      <section className="py-24 border-y border-white/5 bg-[#0D1015]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <h2 className="text-3xl md:text-4xl font-medium text-white leading-tight">
              More than marketing. <br />
              <span className="text-gray-500">Thoughtful digital solutions.</span>
            </h2>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                Hayes Studios combines technical expertise with creative thinking to help businesses operate more efficiently and show up more confidently online.
              </p>
              <p>
                Every solution is built with intention — from the systems behind the scenes to the visuals your audience sees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-medium text-white mb-4">Our Services</h2>
              <p className="text-gray-400 text-lg">A cohesive approach to your digital ecosystem.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div key={idx} className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-teal-500/30 transition-all duration-500 hover:bg-white/[0.04]">
                <div className="mb-6 p-3 w-fit rounded-lg bg-teal-500/10 group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                <h3 className="text-xl font-medium text-white mb-4">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Difference */}
      <section className="py-32 bg-gradient-to-b from-[#0A0C10] to-[#0D1015]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#13171F] rounded-3xl p-8 md:p-16 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="max-w-3xl relative z-10">
              <h2 className="text-3xl md:text-5xl font-medium text-white mb-8">
                Built with strategy. <br />
                Designed with purpose.
              </h2>
              <div className="space-y-8">
                <p className="text-xl text-gray-300 leading-relaxed">
                  With a background in IT and a passion for design, Hayes Studios bridges the gap between technical systems and creative execution.
                </p>
                
                <div className="grid sm:grid-cols-3 gap-6">
                  {[
                    "Clearer processes",
                    "Smarter workflows",
                    "Stronger foundations"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                      <span className="text-sm font-medium text-gray-300 uppercase tracking-wider">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-12">
                  <div className="text-gray-500 italic">No unnecessary complexity.</div>
                  <div className="text-gray-500 italic">No generic solutions.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Visual Process Section */}
      <section className="py-32 bg-[#0A0C10] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-6">A clear, structured approach.</h2>
            <div className="h-1 w-20 bg-teal-500 mx-auto rounded-full" />
          </div>

          <div className="relative">
            {/* Desktop Connector Line */}
            <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 z-0" />
            
            <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative z-10">
              {steps.map((step, idx) => (
                <div key={idx} className="group text-center">
                  <div className="relative mb-10 inline-block">
                    {/* Outer Pulse effect */}
                    <div className="absolute inset-0 bg-teal-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100" />
                    
                    {/* Step Icon Circle */}
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#13171F] border-2 border-white/10 flex items-center justify-center relative z-10 group-hover:border-teal-400 transition-all duration-500 shadow-2xl">
                      <div className="flex flex-col items-center">
                        <div className="text-teal-400 mb-2">
                           {step.icon}
                        </div>
                        <span className="text-white text-sm font-bold tracking-tighter">{step.number}</span>
                      </div>
                    </div>

                    {/* Arrow Indicator for next step (mobile) */}
                    {idx < steps.length - 1 && (
                      <div className="md:hidden mt-8 flex justify-center">
                         <ChevronRight className="rotate-90 text-teal-500/40 w-8 h-8" />
                      </div>
                    )}
                  </div>

                  <div className="max-w-[280px] mx-auto">
                    <h3 className="text-2xl font-medium text-white mb-4 group-hover:text-teal-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24 pt-12 border-t border-white/5 text-center">
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-teal-500/5 rounded-full border border-teal-500/10">
              <CheckCircle2 size={18} className="text-teal-400" />
              <span className="text-gray-300 text-sm font-medium tracking-wide">
                Simple, transparent, and built around your business.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Authority & Experience */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-16 items-center">
            <div className="md:col-span-2">
              <div className="aspect-square rounded-2xl bg-[#13171F] border border-white/5 flex items-center justify-center relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Cpu size={80} className="text-teal-400/50" />
              </div>
            </div>
            <div className="md:col-span-3">
              <h2 className="text-4xl font-medium text-white mb-8">Experience you can rely on.</h2>
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                <p>
                  With over 10 years working in IT, Hayes Studios brings a deep understanding of systems, technology, and problem-solving into every project.
                </p>
                <p>
                  That technical foundation allows us to build digital solutions that are not only visually strong — but reliable, scalable, and efficient.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications & Case Study Teaser */}
      <section className="py-32 bg-[#0D1015]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <h2 className="text-3xl font-medium text-white mb-8">Designed for businesses that value clarity.</h2>
              <p className="text-gray-400 mb-8">Hayes Studios works best with businesses that want:</p>
              <ul className="space-y-4">
                {["Clear systems", "Professional presentation", "Long-term digital foundations", "Thoughtful, strategic support"].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-teal-400/10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-10 text-teal-400/80 font-medium italic">If you value quality over quick fixes, you’re in the right place.</p>
            </div>
            <div className="flex flex-col justify-center border-l border-white/5 pl-0 md:pl-20">
              <h2 className="text-3xl font-medium text-white mb-6">Built to work — not just to look good.</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Every project is designed with purpose, whether it's a website, automation workflow, or content system.
              </p>
              <div className="p-8 rounded-xl bg-white/[0.03] border border-dashed border-white/10 text-center">
                <span className="text-gray-500 uppercase tracking-widest text-xs font-semibold">View case studies coming soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-teal-500/5 blur-[120px] rounded-full" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-6xl font-medium text-white mb-6">Let's build something that works.</h2>
          <p className="text-xl text-gray-400 mb-12">Design, systems, and strategy — thoughtfully combined.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            <button className="bg-teal-500 hover:bg-teal-400 text-[#0A0C10] font-bold px-10 py-4 rounded-full transition-all w-full sm:w-auto">
              Get in Touch
            </button>
            <button className="text-white hover:text-teal-400 transition-colors flex items-center">
              View Services <ChevronRight className="ml-1 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="flex items-center space-x-2 mb-6 md:mb-0">
            <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">HS</span>
            </div>
            <span className="text-white font-medium">Hayes Studios</span>
          </div>
          <div className="flex space-x-8 mb-6 md:mb-0">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
          <p>© 2024 Hayes Studios. All rights reserved.</p>
        </div>
      </footer>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0A0C10] flex flex-col p-8 md:hidden">
          <div className="flex justify-between items-center mb-16">
            <span className="text-xl font-medium text-white">Hayes Studios</span>
            <button onClick={() => setIsMenuOpen(false)}><X size={32} className="text-white" /></button>
          </div>
          <div className="flex flex-col space-y-8 text-3xl font-medium">
            <a href="#" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#" onClick={() => setIsMenuOpen(false)}>Process</a>
            <a href="#" onClick={() => setIsMenuOpen(false)}>Experience</a>
            <a href="#" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;