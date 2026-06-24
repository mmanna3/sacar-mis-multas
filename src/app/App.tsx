import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Menu,
  X,
  MessageCircle,
  ExternalLink,
  Shield,
  Scale,
  Car,
  Search,
  FileText,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

import imgAerial from "../imports/cars-driving-street-aerial-view.jpg";
import imgSunset from "../imports/red-car-highway-sunset-drive-motion-road.jpg";
import imgIceland from "../imports/beautiful-landscapes-iceland-while-travelling.jpg";
import logoImg from "../imports/Recurso_3_216x-8.png";

const WHATSAPP =
  "https://wa.me/5491166713389?text=Hola%2C%20quiero%20consultar%20por%20mis%20multas.";
const CONSULTA = "https://infraccionesba.gba.gob.ar/consulta-infraccion";

const slides = [
  { src: imgAerial, alt: "Vista aérea de vehículos en la calle" },
  { src: imgSunset, alt: "Auto rojo en autopista al atardecer" },
  { src: imgIceland, alt: "Libertad en la ruta" },
];

const navLinks = [
  { label: "INICIO", href: "#inicio" },
  { label: "SERVICIOS", href: "#servicios" },
  { label: "CÓMO TRABAJAMOS", href: "#como-trabajamos" },
  { label: "PREGUNTAS", href: "#preguntas" },
  { label: "CONTACTO", href: "#contacto" },
];

const services = [
  {
    Icon: Shield,
    color: "#B38800",
    colorLight: "rgba(255,194,0,0.12)",
    title: "Impugnación de fotomultas ilegales",
    desc: "Evaluamos la validez técnica y las homologaciones de los cinemómetros, detectando fallas en los procedimientos de notificación en la Provincia de Buenos Aires.",
  },
  {
    Icon: Scale,
    color: "#C8282A",
    colorLight: "rgba(200,40,42,0.1)",
    title: "Descargos administrativos y judiciales",
    desc: "Elaboramos defensas sólidas basadas en los estándares de la Constitución Nacional para lograr la nulidad del acta.",
  },
  {
    Icon: Car,
    color: "#1E7A2E",
    colorLight: "rgba(30,122,46,0.1)",
    title: "Gestión de libre deuda para trámites",
    desc: "Te ayudamos a resolver las trabas por infracciones para que puedas renovar tu licencia de conducir o transferir tu vehículo sin dolores de cabeza.",
  },
];

const steps = [
  {
    number: "01",
    Icon: Search,
    title: "Revisión sin cargo",
    desc: "Nos enviás tu patente o las actas de infracción y hacemos un diagnóstico preliminar de la situación de tu vehículo.",
  },
  {
    number: "02",
    Icon: FileText,
    title: "Análisis técnico-legal",
    desc: "Detectamos los vicios de procedimiento, la falta de requisitos formales o los plazos de prescripción vencidos.",
  },
  {
    number: "03",
    Icon: CheckCircle,
    title: "Acción estratégica",
    desc: "Diseñamos y presentamos las impugnaciones pertinentes, haciendo el seguimiento del trámite hasta obtener la resolución.",
  },
];

const faqs = [
  {
    q: "¿Cuál es el precio de su servicio?",
    a: "El precio de nuestros servicios depende de múltiples factores, tenemos que analizar el caso para hacerte el presupuesto. Comunicate con nosotros para una cotización personalizada sin cargo.",
  },
  {
    q: "¿Me conviene pagar el pago voluntario?",
    a: "El pago voluntario suele ser la salida rápida que ofrece el Estado para recaudar, pero implica reconocer la falta. Si la multa tiene errores graves de procedimiento o está vencida, tenés derecho a impugnarla y exigir su nulidad.",
  },
  {
    q: "¿Qué pasa si tengo que renovar el registro o vender el auto y tengo multas?",
    a: "Muchas jurisdicciones te impiden avanzar si registrás deudas, lo cual suele ser inconstitucional si no fuiste debidamente notificado. Nosotros nos encargamos de plantear el descargo correspondiente para destrabar tu trámite de forma legal.",
  },
  {
    q: "¿Cuánto tarda?",
    a: "El plazo para la gestión de las infracciones es variable según la jurisdicción, el juzgado interviniente y la complejidad del expediente. Para conocer la demora estimada en tu caso, consultanos.",
  },
  {
    q: "¿Cómo puedo hacer seguimiento al progreso de mi trámite?",
    a: "Vas a poder preguntarnos en todo momento el estado de tu expediente. Además, vas a poder revisarlo directamente desde la página web.",
  },
  {
    q: "¿Tengo que ir personalmente?",
    a: "No hace falta. Podemos hacer el trámite 100% online.",
  },
];

const testimonials = [
  {
    name: "María G.",
    initials: "MG",
    avatarColor: "#25D366",
    time: "10:42",
    message: "Un gusto trabajar con ustedes, ¡gracias!",
    offset: "md:mb-10",
  },
  {
    name: "Carlos M.",
    initials: "CM",
    avatarColor: "#128C7E",
    time: "14:15",
    message: "Realmente me salvaron, no sé cómo iba a renovar el registro y poder trabajar sin su ayuda.",
    offset: "",
  },
  {
    name: "Roberto A.",
    initials: "RA",
    avatarColor: "#075E54",
    time: "09:33",
    message: "Gracias por la sinceridad en el trabajo, no iba a poder resolver todas las multas yo solo, ¡saludos!",
    offset: "md:mb-6",
  },
];

const stats = [
  { target: 500, label: "DESCARGOS PRESENTADOS" },
  { target: 300, label: "MULTAS RESUELTAS" },
  { target: 200, label: "CLIENTES SATISFECHOS" },
];

function useCountUp(target: number, duration: number, triggered: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [triggered, target, duration]);
  return count;
}

const display: React.CSSProperties = { fontFamily: "'Barlow Condensed', sans-serif" };

function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      style={{ ...display, letterSpacing: "0.3em" }}
      className={`text-[13px] font-bold uppercase block mb-3 ${dark ? "text-[#FFC200]" : "text-[#8C6500]"}`}
    >
      {children}
    </span>
  );
}

function GlassCardLight({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl transition-all duration-300 ${className}`}
      style={{
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(20px) saturate(1.5)",
        WebkitBackdropFilter: "blur(20px) saturate(1.5)",
        border: "1px solid rgba(255,255,255,0.85)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.95)",
      }}
    >
      {children}
    </div>
  );
}

function StatCounter({ target, label, triggered }: { target: number; label: string; triggered: boolean }) {
  const count = useCountUp(target, 2000, triggered);
  return (
    <div className="flex flex-col items-center gap-3 px-8 py-10">
      <div
        style={display}
        className="font-black leading-none text-[#FFC200]"
      >
        <span className="text-[clamp(3.5rem,8vw,6rem)]">+{count}</span>
      </div>
      <div
        style={{ ...display, letterSpacing: "0.2em" }}
        className="text-[13px] font-bold text-white/60 text-center"
      >
        {label}
      </div>
    </div>
  );
}

function StatsBanner({ visible }: { visible: boolean }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#111111" }}
    >
      {/* Glow de fondo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 120% at 50% 50%, rgba(255,194,0,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map(({ target, label }) => (
            <StatCounter key={label} target={target} label={label} triggered={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsVisible(true); observer.disconnect(); } },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#111111] overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          background: scrolled ? "rgba(249,247,242,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.08)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-18 py-3">

            <a href="#inicio" className="flex items-center">
              <img
                src={logoImg}
                alt="Sacar mis multas"
                className="h-11 w-auto"
                style={{ filter: scrolled ? "none" : "invert(1)" }}
              />
            </a>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={display}
                  className={`text-[14px] font-bold tracking-[0.18em] transition-colors ${
                    scrolled
                      ? "text-[#444444] hover:text-[#111111]"
                      : "text-white/80 hover:text-white drop-shadow-sm"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                style={display}
                className="bg-[#FFC200] text-[#111111] px-5 py-2.5 text-[14px] font-black tracking-[0.15em] hover:bg-[#111111] hover:text-[#FFC200] transition-all duration-200 rounded-sm"
              >
                CONSULTÁ AHORA
              </a>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 ${scrolled ? "text-[#111111]" : "text-white"}`}
              aria-label="Menú"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className="md:hidden px-5 py-6 flex flex-col gap-5 border-t"
            style={{
              background: "rgba(249,247,242,0.97)",
              backdropFilter: "blur(16px)",
              borderColor: "rgba(0,0,0,0.08)",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={display}
                className="text-[16px] font-bold tracking-[0.2em] text-[#444444] hover:text-[#111111] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              style={display}
              className="bg-[#FFC200] text-[#111111] py-3 text-[15px] font-black tracking-[0.2em] text-center rounded-sm mt-2"
            >
              CONSULTÁ AHORA
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO / CAROUSEL ── */}
      <section id="inicio" className="relative h-screen min-h-[600px] overflow-hidden bg-[#111111]">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: i === currentSlide ? 1 : 0,
              transition: "opacity 1200ms ease-in-out",
            }}
          >
            <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover" />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/80" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-5 text-center">
          <div
            style={{ ...display, letterSpacing: "0.3em" }}
            className="mb-5 inline-flex items-center gap-2 border border-[#FFC200]/40 px-5 py-2 rounded-full text-[#FFC200] text-[13px] font-bold"
          >
            ESTUDIO JURÍDICO · PROVINCIA DE BUENOS AIRES
          </div>

          <h1 style={display} className="font-black leading-none tracking-tight text-white mb-6">
            <span className="block text-[clamp(4rem,14vw,10rem)]">SACAR</span>
            <span className="block text-[clamp(4rem,14vw,10rem)] text-[#FFC200]">MIS MULTAS</span>
          </h1>

          <p className="max-w-2xl text-white/75 text-[17px] md:text-lg leading-relaxed mb-10">
            Estudio jurídico especializado en resolver tus infracciones de tránsito de forma ágil y eficiente.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              style={display}
              className="inline-flex items-center gap-2 justify-center bg-[#FFC200] text-[#111111] px-9 py-4 font-black text-[18px] tracking-[0.15em] hover:bg-white transition-all duration-200"
            >
              <MessageCircle size={20} />
              CONSULTÁ AHORA
            </a>
            <a
              href={CONSULTA}
              target="_blank"
              rel="noopener noreferrer"
              style={display}
              className="inline-flex items-center gap-2 justify-center border-2 border-white/50 text-white px-9 py-4 font-black text-[18px] tracking-[0.15em] hover:border-[#FFC200] hover:text-[#FFC200] transition-all duration-200"
            >
              <ExternalLink size={20} />
              VER TUS MULTAS
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-[3px] rounded-full transition-all duration-400 ${
                i === currentSlide ? "w-8 bg-[#FFC200]" : "w-2 bg-white/30"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── SERVICIOS  ·  fondo amarillo pálido ── */}
      <section id="servicios" className="relative py-28 overflow-hidden" style={{ background: "#FFFBEC" }}>
        <div
          className="absolute top-0 left-1/3 w-[600px] h-[600px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(255,194,0,0.18) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(200,40,42,0.08) 0%, transparent 65%)",
            filter: "blur(50px)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-2">
            <SectionLabel>Nuestros Servicios</SectionLabel>
          </div>
          <h2
            style={display}
            className="font-black text-[clamp(3rem,9vw,6rem)] text-[#111111] text-center leading-none mb-6"
          >
            SERVICIOS
          </h2>
          <p className="text-center text-[#555555] max-w-3xl mx-auto mb-16 text-[16px] leading-relaxed">
            El sistema está diseñado para que pagues rápido a través del &ldquo;pago voluntario&rdquo;, muchas veces
            ocultando faltas graves en los procedimientos que vuelven a la multa nula. Nosotros analizamos tu caso a
            fondo para ofrecerte la mejor estrategia legal.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {services.map(({ Icon, color, colorLight, title, desc }, i) => (
              <GlassCardLight key={i} className="p-8 hover:shadow-xl hover:-translate-y-1 cursor-default">
                <div
                  className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl"
                  style={{ background: colorLight, border: `1px solid ${color}30` }}
                >
                  <Icon size={26} style={{ color }} />
                </div>
                <h3 style={display} className="font-bold text-[20px] text-[#111111] mb-3 leading-tight">
                  {title}
                </h3>
                <p className="text-[#555555] text-[15px] leading-relaxed">
                  {desc}
                </p>
                <div
                  className="mt-6 h-[2px] w-12 rounded-full"
                  style={{ background: color }}
                />
              </GlassCardLight>
            ))}
          </div>
        </div>
      </section>

      {/* ── ESTADÍSTICAS  ·  fondo oscuro ── */}
      <div ref={statsRef}>
        <StatsBanner visible={statsVisible} />
      </div>

      {/* ── CÓMO TRABAJAMOS  ·  fondo gris claro ── */}
      <section id="como-trabajamos" className="relative py-28 overflow-hidden" style={{ background: "#F0F1F4" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(255,194,0,0.1) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-2">
            <SectionLabel>El Proceso</SectionLabel>
          </div>
          <h2
            style={display}
            className="font-black text-[clamp(2.5rem,8vw,5.5rem)] text-[#111111] text-center leading-none mb-6"
          >
            ¿CÓMO TRABAJAMOS?
          </h2>
          <p className="text-center text-[#555555] max-w-xl mx-auto mb-16 text-[16px] leading-relaxed">
            Queremos que el proceso sea lo menos estresante posible para vos. Lo resolvemos en tres pasos simples.
          </p>

          <div className="flex flex-col md:flex-row md:items-stretch gap-5 md:gap-0">
            {steps.flatMap(({ number, Icon, title, desc }, i) => {
              const card = (
                <div key={`step-${i}`} className="flex-1 min-w-0">
                  <GlassCardLight className="p-8 hover:shadow-xl hover:-translate-y-1 cursor-default h-full">
                    <div
                      style={{ ...display, color: "rgba(255,194,0,0.25)" }}
                      className="font-black text-7xl leading-none mb-4 select-none"
                    >
                      {number}
                    </div>
                    <div className="mb-4">
                      <Icon size={26} style={{ color: "#B38800" }} />
                    </div>
                    <h3 style={display} className="font-bold text-[20px] text-[#111111] mb-3 leading-tight">
                      {title}
                    </h3>
                    <p className="text-[#555555] text-[15px] leading-relaxed">{desc}</p>
                  </GlassCardLight>
                </div>
              );

              if (i === steps.length - 1) return [card];

              return [
                card,
                <div
                  key={`arrow-${i}`}
                  className="hidden md:flex items-center justify-center shrink-0 px-2"
                  aria-hidden
                >
                  <ArrowRight size={20} className="text-[#B38800]/50" />
                </div>,
              ];
            })}
          </div>
        </div>
      </section>

      {/* ── PREGUNTAS FRECUENTES  ·  fondo amarillo pálido ── */}
      <section id="preguntas" className="py-28" style={{ background: "#FFFBEC" }}>
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-2">
            <SectionLabel>Dudas Comunes</SectionLabel>
          </div>
          <h2
            style={display}
            className="font-black text-[clamp(2.5rem,8vw,5rem)] text-[#111111] text-center leading-none mb-16"
          >
            PREGUNTAS<br />FRECUENTES
          </h2>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(0,0,0,0.07)",
                  boxShadow: openFaq === i ? "0 4px 20px rgba(0,0,0,0.08)" : "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-white/60 transition-colors"
                >
                  <span style={display} className="font-bold text-[18px] text-[#111111] leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={20}
                    style={{
                      color: "#B38800",
                      flexShrink: 0,
                      transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 300ms ease",
                    }}
                  />
                </button>
                <div
                  className="overflow-hidden"
                  style={{
                    maxHeight: openFaq === i ? "400px" : "0px",
                    opacity: openFaq === i ? 1 : 0,
                    transition: "max-height 320ms ease, opacity 250ms ease",
                  }}
                >
                  <p className="px-6 pb-5 text-[#555555] text-[15px] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS  ·  fondo gris claro ── */}
      <section className="py-28 overflow-hidden" style={{ background: "#F0F1F4" }}>
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-2">
            <SectionLabel>Lo que dicen nuestros clientes</SectionLabel>
          </div>
          <h2
            style={display}
            className="font-black text-[clamp(2.5rem,7vw,5rem)] text-[#111111] text-center leading-none mb-16"
          >
            CLIENTES<br />SATISFECHOS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:items-end">
            {testimonials.map(({ name, initials, avatarColor, time, message, offset }, i) => (
              <div key={i} className={`flex flex-col ${offset}`}>
                {/* Avatar row */}
                <div className="flex items-center gap-2 mb-2 px-1">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[12px] font-black flex-shrink-0"
                    style={{ background: avatarColor }}
                  >
                    {initials}
                  </div>
                  <span
                    style={{ ...display, color: avatarColor }}
                    className="font-bold text-[15px]"
                  >
                    {name}
                  </span>
                </div>

                {/* Bubble */}
                <div className="relative">
                  {/* Tail at top-left */}
                  <div
                    className="absolute -top-[1px] -left-[6px] w-3 h-3"
                    style={{
                      background: "white",
                      clipPath: "polygon(100% 0, 100% 100%, 0 0)",
                      filter: "drop-shadow(-1px -1px 0px rgba(0,0,0,0.04))",
                    }}
                  />
                  <div
                    className="bg-white rounded-2xl rounded-tl-sm px-4 py-3.5"
                    style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06)" }}
                  >
                    <p className="text-[15px] text-[#222222] leading-relaxed">
                      {message}
                    </p>
                    {/* Footer: time + checkmarks */}
                    <div className="flex items-center justify-end gap-1 mt-2">
                      <span className="text-[11px] text-[#AAAAAA]">{time}</span>
                      {/* Double blue tick (leído) */}
                      <svg width="18" height="12" viewBox="0 0 18 12" fill="none" className="flex-shrink-0">
                        <path d="M1 6L5 10L12 1" stroke="#53BDEB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 6L10 10L17 1" stroke="#53BDEB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTO  ·  fondo amarillo marca ── */}
      <section id="contacto" className="relative py-28 overflow-hidden" style={{ background: "#FFC200" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(255,255,255,0.25) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-8 text-center">
          <div className="mb-2">
            <span
              style={{ ...display, letterSpacing: "0.3em" }}
              className="text-[13px] font-bold uppercase text-[#6B4700]"
            >
              Hablemos
            </span>
          </div>
          <h2
            style={display}
            className="font-black text-[clamp(3rem,10vw,6.5rem)] text-[#111111] leading-none mb-6"
          >
            CONTACTO
          </h2>
          <p className="text-[#3D2800] max-w-2xl mx-auto mb-3 text-[17px] leading-relaxed">
            ¿Tenés una infracción de tránsito en Provincia de Buenos Aires y no sabés cómo resolverla?
            No dejes que afecten tu bolsillo ni tus derechos.
          </p>
          <p
            style={{ ...display, letterSpacing: "0.25em" }}
            className="text-[13px] font-bold text-[#6B4700] mb-12"
          >
            SOLICITÁ TU PRESUPUESTO SIN COSTO
          </p>

          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            style={display}
            className="inline-flex items-center gap-3 justify-center bg-[#111111] text-white px-10 py-5 font-black text-[20px] tracking-[0.15em] hover:bg-white hover:text-[#111111] transition-all duration-200 shadow-xl"
          >
            <MessageCircle size={24} />
            ENVIAR MI CASO POR WHATSAPP
          </a>

          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "PROCESO", value: "100% Online" },
              { label: "CONSULTA INICIAL", value: "Sin costo" },
              { label: "ZONA", value: "Pcia. de Buenos Aires" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl p-6"
                style={{
                  background: "rgba(0,0,0,0.08)",
                  border: "1px solid rgba(0,0,0,0.1)",
                }}
              >
                <div
                  style={{ ...display, letterSpacing: "0.25em" }}
                  className="text-[12px] font-bold text-[#6B4700] mb-2"
                >
                  {label}
                </div>
                <p className="text-[#111111] text-[16px] font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHATSAPP FLOTANTE ── */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full"
        style={{
          background: "#25D366",
          boxShadow: "0 4px 20px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        {/* Pulse ring */}
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{ background: "rgba(37,211,102,0.35)", animationDuration: "2s" }}
        />
        {/* WhatsApp logo SVG */}
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="w-8 h-8 relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 2C8.268 2 2 8.268 2 16c0 2.442.655 4.73 1.8 6.7L2 30l7.5-1.768A13.932 13.932 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 4.5C9.596 4.5 4.5 9.596 4.5 16c0 2.19.613 4.238 1.678 5.978l.28.454-1.16 4.27 4.39-1.148.44.261A11.463 11.463 0 0016 27.5c6.404 0 11.5-5.096 11.5-11.5S22.404 4.5 16 4.5zm-4.47 6.61c.19-.005.398.003.594.453.224.518.71 1.738.773 1.865.063.127.104.275.02.443-.083.168-.125.273-.247.42-.123.148-.258.33-.368.443-.123.125-.251.26-.108.51.143.25.636 1.049 1.365 1.699.938.836 1.73 1.095 1.978 1.217.248.122.393.102.538-.062.148-.164.627-.733.795-.985.168-.252.335-.21.566-.126.23.084 1.463.69 1.713.815.25.126.416.189.478.294.062.105.062.607-.145 1.193-.207.586-1.207 1.144-1.648 1.179-.44.035-.453.35-2.854-.649-2.876-1.202-4.688-4.147-4.829-4.338-.14-.19-1.147-1.525-1.147-2.908 0-1.383.724-2.062.98-2.344.257-.282.56-.352.747-.357z"
            fill="#25D366"
          />
        </svg>
      </a>

      {/* ── FOOTER ── */}
      <footer className="bg-[#111111] py-8">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={logoImg} alt="Sacar mis multas" className="h-9 w-auto" style={{ filter: "invert(1)" }} />
          <p className="text-white/30 text-[13px] text-center">
            Estudio jurídico especializado en infracciones de tránsito · Provincia de Buenos Aires
          </p>
          <p className="text-white/20 text-[13px]">
            © {new Date().getFullYear()} Sacar mis Multas
          </p>
        </div>
      </footer>
    </div>
  );
}
