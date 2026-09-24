import { useState, useEffect, useCallback } from "react";
import { SLIDES, SlideData } from "../data/presentationData";
import { BASELINE_FINANCIALS, UNIT_ECONOMICS } from "../data/financialModel";
import { RevenueEbitdaChart, RevenueStreamsBreakdown, UnitEconomicsOverview } from "./InteractiveCharts";
import { Logo } from "./Logo";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  List,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  FileText,
  Volume2,
  Activity,
  CheckCircle2,
  HelpCircle,
  Download,
  Mail,
  Brain,
  Heart,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Building2,
  Users,
  Radio,
  Sliders,
  ExternalLink,
} from "lucide-react";

interface SlideDeckProps {
  onOpenCalculator: () => void;
  onOpenDossier: () => void;
  onOpenDashboards?: () => void;
  onDownloadPptx?: () => void;
  onOpenGmail?: () => void;
}

export function SlideDeck({
  onOpenCalculator,
  onOpenDossier,
  onOpenDashboards,
  onDownloadPptx,
  onOpenGmail,
}: SlideDeckProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  // Interactive state inside slides
  const [miniDashboardTab, setMiniDashboardTab] = useState<"cockpit" | "player" | "b2b">("cockpit");
  const [miniPlaying, setMiniPlaying] = useState(false);
  const [activeSciencePillar, setActiveSciencePillar] = useState<number>(3); // Default to Thayer Neurovisceral

  const slide = SLIDES[currentSlideIndex];
  const totalSlides = SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "Escape") {
        setShowDrawer(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col justify-between select-none animate-fadeIn">
      {/* Slide Navigation Header Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#081126]/90 border-b border-cyan-500/20 rounded-t-3xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Logo size="sm" showTagline={false} />
          <div className="h-4 w-px bg-slate-700 hidden sm:block" />
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 hidden sm:inline">
            {slide.category}
          </span>
          <span className="text-xs text-slate-400 font-mono hidden md:inline">
            Slide {slide.slideNumber} / {totalSlides}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Sommaire Drawer */}
          <button
            onClick={() => setShowDrawer(!showDrawer)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors"
          >
            <List className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Sommaire</span>
          </button>

          {/* Quick Dashboards App trigger */}
          {onOpenDashboards && (
            <button
              onClick={onOpenDashboards}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">Dashboards App</span>
            </button>
          )}

          {/* Passeport Talent Notes Toggle */}
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-colors ${
              showNotes
                ? "bg-cyan-950 border border-cyan-400 text-cyan-300 shadow-sm"
                : "text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Notes Visa Talent / VC</span>
          </button>

          {/* PPTX download button */}
          {onDownloadPptx && (
            <button
              onClick={onDownloadPptx}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#00D2B4] hover:opacity-95 rounded-xl transition-all shadow-md shadow-cyan-500/20"
              title="Télécharger la présentation en fichier PowerPoint (.pptx)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PPTX</span>
            </button>
          )}

          {/* Gmail share button */}
          {onOpenGmail && (
            <button
              onClick={onOpenGmail}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors"
              title="Envoyer la présentation par Gmail"
            >
              <Mail className="w-3.5 h-3.5 text-rose-400" />
              <span>Gmail</span>
            </button>
          )}

          {/* Fullscreen button */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Plein écran"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Main Slide Presentation Stage */}
      <div className="relative flex-1 bg-gradient-to-b from-[#060B18] via-[#081226] to-[#0A1633] p-6 sm:p-10 flex flex-col justify-center border-x border-cyan-500/20 overflow-hidden min-h-[580px]">
        {/* Subtle Ambient Radial Glows in Logo Colors */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#0052FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#00E5C9]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Slide 1: Cover Slide */}
        {slide.id === "cover" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto w-full relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-950/80 to-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{slide.badge}</span>
              </div>

              <div>
                <Logo size="hero" showTagline={true} className="items-start mb-6" />
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display leading-[1.2]">
                  L'Intelligence Active de la Récupération Neuro-Acoustique
                </h1>
                <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed font-light max-w-xl">
                  {slide.subtitle}
                </p>
              </div>

              {slide.callout && (
                <div className="p-4 rounded-2xl bg-[#09142E]/90 border-l-4 border-cyan-400 text-xs text-slate-300 leading-relaxed shadow-xl">
                  <div className="font-bold text-white mb-1 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    {slide.callout.title}
                  </div>
                  {slide.callout.content}
                </div>
              )}

              {/* Metrics bar */}
              {slide.metrics && (
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {slide.metrics.map((m, i) => (
                    <div key={i} className="p-3 bg-slate-950/80 border border-slate-800 rounded-2xl">
                      <span className="text-[11px] text-slate-400 block">{m.label}</span>
                      <span className="text-lg sm:text-xl font-extrabold text-white font-mono block">
                        {m.value}
                      </span>
                      <span className="text-[10px] text-cyan-400 block mt-0.5">{m.detail}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2 text-[11px] text-slate-400 italic">
                {slide.talentVisaContext}
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl group">
                <img
                  src={slide.heroImage}
                  alt="WAVICA Wearable Biometrics"
                  className="w-full h-80 lg:h-96 object-cover transform transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-cyan-500/30 text-xs">
                  <span className="font-bold text-cyan-300 block mb-0.5">
                    Couplage Biométrique Oura & Apple HealthKit
                  </span>
                  <span className="text-slate-300 text-[11px]">
                    Mesure continue VRC (HRV), sommeil profond, fréquence au repos
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Slide 6: SCIENTIFIC FOUNDATION - THE 5 PILLARS WITH JULIAN THAYER FOCUS */}
        {slide.id === "acoustic-science" && (
          <div className="max-w-6xl mx-auto w-full space-y-6 relative z-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                {slide.category} · Slide {slide.slideNumber}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                {slide.title}
              </h2>
              <p className="text-sm text-slate-300 mt-1 max-w-3xl">{slide.subtitle}</p>
            </div>

            {/* Scientific Pillars Layout: 5 Interlocking Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Pillar 1: Polyvagal */}
              <div 
                onClick={() => setActiveSciencePillar(1)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  activeSciencePillar === 1 
                    ? "bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/20" 
                    : "bg-slate-950/80 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-cyan-300">1. Théorie Polyvagale</span>
                  <span className="text-[10px] text-slate-400 font-mono">Porges</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Stimulation sélective du complexe vagal ventral par des plages de fréquences et timbres spécifiques pour activer la branche parasympathique et désamorcer le surmenage sympathique.
                </p>
              </div>

              {/* Pillar 2: Allostatic Load */}
              <div 
                onClick={() => setActiveSciencePillar(2)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  activeSciencePillar === 2 
                    ? "bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/20" 
                    : "bg-slate-950/80 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-cyan-300">2. Charge Allostatique</span>
                  <span className="text-[10px] text-slate-400 font-mono">McEwen</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Mesure du coût biologique cumulatif du stress chronique ; la dérive de la baseline VRC permet d'intervenir préventivement avant l'apparition de l'épuisement ou du surmenage.
                </p>
              </div>

              {/* Pillar 4: Brainwave Entrainment */}
              <div 
                onClick={() => setActiveSciencePillar(4)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  activeSciencePillar === 4 
                    ? "bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/20" 
                    : "bg-slate-950/80 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-cyan-300">4. Ondes Cérébrales & 432 Hz</span>
                  <span className="text-[10px] text-slate-400 font-mono">Bio-Acoustique</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Synchronisation des oscillations neuronales (Alpha 8-12 Hz, Thêta 4-7 Hz) par battements isochrones pour stabiliser la cohérence corticale et la récupération profonde.
                </p>
              </div>
            </div>

            {/* MASTER HIGHLIGHT CARD: PILLAR 3 - NEUROVISCERAL INTEGRATION (THAYER) */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#06132D] via-[#091D45] to-[#0A1633] border-2 border-cyan-400/80 shadow-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-500/30 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gradient-to-br from-blue-600 via-cyan-400 to-teal-400 rounded-xl text-slate-950 font-bold">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white font-display flex items-center gap-2">
                      3. Modèle d'Intégration Neuroviscérale (Dr. Julian Thayer)
                      <span className="px-2 py-0.5 bg-cyan-950 border border-cyan-400 text-cyan-300 text-[10px] rounded-full font-mono">
                        PILIER MAÎTRE DE LA DYNAMIQUE
                      </span>
                    </h3>
                    <p className="text-xs text-cyan-200">
                      Cortex préfrontal ↔ Nerf Vague ↔ Cœur / VRC ↔ Moteur Acoustique WAVICA
                    </p>
                  </div>
                </div>

                <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 self-start sm:self-auto">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Validation Neurobiologique Établie</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-200 leading-relaxed">
                <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  <strong className="text-white block font-display">
                    • Mécanisme Neurobiologique :
                  </strong>
                  <p>
                    Le <strong>cortex préfrontal</strong> et le <strong>système nerveux autonome</strong> sont directement reliés par le <strong>nerf vague</strong> au sein du réseau central autonome (CAN). La <strong>variabilité de la fréquence cardiaque (HRV / VRC)</strong> est le reflet direct et en temps réel de cette boucle de régulation.
                  </p>
                </div>

                <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-cyan-500/30">
                  <strong className="text-cyan-300 block font-display">
                    • Pourquoi c'est capital pour WAVICA 2.0 :
                  </strong>
                  <p>
                    Cette théorie <strong>relie formellement la VRC à la régulation par le nerf vague</strong> et explique scientifiquement <strong>pourquoi la VRC est le biomarqueur maître de la dynamique d'adaptation</strong>. La stimulation acoustique adaptative WAVICA cible directement ce circuit pour restaurer le frein vagal.
                  </p>
                </div>
              </div>

              {/* Pillar 5: N-of-1 methodology */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-300 bg-slate-950/40 p-3 rounded-xl border border-slate-800/80 gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">5. Méthodologie N-of-1 (Single-Subject Design) :</span>
                  <span>Chaque utilisateur est son propre témoin comparé à ses moyennes glissantes (7 à 28 jours).</span>
                </div>
                <span className="text-cyan-400 font-mono text-[11px] shrink-0">Boucle fermée continue</span>
              </div>
            </div>
          </div>
        )}

        {/* Slide 7: APPLICATION DASHBOARDS DEMONSTRATOR SLIDE */}
        {slide.id === "app-dashboards-slide" && (
          <div className="max-w-6xl mx-auto w-full space-y-5 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                  {slide.category} · Slide {slide.slideNumber}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                  {slide.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">{slide.subtitle}</p>
              </div>

              {onOpenDashboards && (
                <button
                  onClick={onOpenDashboards}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#00D2B4] text-slate-950 text-xs font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20 shrink-0"
                >
                  <Activity className="w-4 h-4" />
                  <span>Ouvrir l'Espace Dashboards Complet</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* In-Slide Mini Dashboard Switcher */}
            <div className="bg-slate-900/90 border border-cyan-500/30 rounded-3xl p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMiniDashboardTab("cockpit")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      miniDashboardTab === "cockpit"
                        ? "bg-gradient-to-r from-[#0052FF] to-[#00B4D8] text-white shadow-md"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    1. Cockpit Biométrique
                  </button>
                  <button
                    onClick={() => setMiniDashboardTab("player")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      miniDashboardTab === "player"
                        ? "bg-gradient-to-r from-[#0052FF] to-[#00B4D8] text-white shadow-md"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    2. Lecteur Neuro-Acoustique
                  </button>
                  <button
                    onClick={() => setMiniDashboardTab("b2b")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      miniDashboardTab === "b2b"
                        ? "bg-gradient-to-r from-[#0052FF] to-[#00B4D8] text-white shadow-md"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    3. Console B2B Monaco
                  </button>
                </div>

                <span className="text-[11px] font-mono text-cyan-400 hidden sm:inline">
                  Interactive Preview
                </span>
              </div>

              {/* Sub-view 1: Cockpit preview */}
              {miniDashboardTab === "cockpit" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400 block">VRC (HRV) Actuelle</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-black text-white">64</span>
                      <span className="text-xs text-slate-400 font-mono">ms</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 block mt-1">+18% vs Baseline (54 ms)</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400 block">Index Tonus Vagal (Thayer)</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-black text-cyan-300">88</span>
                      <span className="text-xs text-slate-400 font-mono">/ 100</span>
                    </div>
                    <span className="text-[10px] text-cyan-400 block mt-1">Couplage préfrontal optimal</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400 block">Charge Allostatique (McEwen)</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-black text-teal-300">1.8</span>
                      <span className="text-xs text-slate-400 font-mono">/ 5.0</span>
                    </div>
                    <span className="text-[10px] text-teal-400 block mt-1">Réserve nerveuse rétablie</span>
                  </div>
                </div>
              )}

              {/* Sub-view 2: Player preview */}
              {miniDashboardTab === "player" && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 flex items-center justify-between gap-4 animate-fadeIn">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setMiniPlaying(!miniPlaying)}
                      className="p-3 bg-gradient-to-r from-blue-600 to-cyan-400 text-slate-950 rounded-2xl font-bold shadow-md"
                    >
                      {miniPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                    </button>
                    <div>
                      <h4 className="text-xs font-bold text-white">Régulation Vagale Ventrale (432 Hz + Alpha 10 Hz)</h4>
                      <p className="text-[11px] text-cyan-400 font-mono">Durée : 8:00 · Spatial Audio 24-bit</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-emerald-400 font-bold">+14 ms VRC en direct</span>
                  </div>
                </div>
              )}

              {/* Sub-view 3: B2B Monaco preview */}
              {miniDashboardTab === "b2b" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fadeIn">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                    <span className="text-slate-400 block">Membres VIP Monaco</span>
                    <span className="text-xl font-bold text-white mt-1 block">28 Actifs</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                    <span className="text-slate-400 block">Taux de Complétion</span>
                    <span className="text-xl font-bold text-emerald-400 mt-1 block">94.8 %</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                    <span className="text-slate-400 block">Alertes Évitées</span>
                    <span className="text-xl font-bold text-cyan-300 mt-1 block">14 Cas Prévenus</span>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300 pt-1">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <strong className="text-white block mb-1">Architecture N-of-1</strong>
                Apprentissage continu de la dynamique de chaque utilisateur.
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <strong className="text-white block mb-1">Intervention Active</strong>
                Action sonore immédiate en moins de 30 secondes après l'alerte.
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <strong className="text-white block mb-1">Monétisation B2B2C</strong>
                Console club en marque blanche déployée auprès des VIP Monaco.
              </div>
            </div>
          </div>
        )}

        {/* Slide 12: Financial Projections with integrated Chart */}
        {slide.id === "financial-projections" && (
          <div className="max-w-6xl mx-auto w-full space-y-6 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                  {slide.category} · Slide {slide.slideNumber}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display">
                  {slide.title}
                </h2>
                <p className="text-sm text-slate-300 mt-1 max-w-3xl">{slide.subtitle}</p>
              </div>
              <button
                onClick={onOpenCalculator}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#00D2B4] text-slate-950 text-xs font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20 shrink-0"
              >
                <TrendingUp className="w-4 h-4" />
                Ouvrir le Simulateur Interactif
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7">
                <RevenueEbitdaChart data={BASELINE_FINANCIALS} />
              </div>
              <div className="lg:col-span-5 space-y-3">
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
                  <h4 className="text-sm font-bold text-white mb-2 font-display">
                    Points Saillants du P&L (2026-2030)
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold mt-0.5">•</span>
                      <span>
                        <strong className="text-white">Croissance du CA :</strong> Passage de 268 k€ en 2027 à 9,38 M€ en 2030, porté par le mix B2C, B2B2C et B2B corporate.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold mt-0.5">•</span>
                      <span>
                        <strong className="text-white">Marge Brute Exceptionnelle (88-89%) :</strong> Modèle logiciel SaaS avec infrastructure Edge AI et droits musicaux propriétaires.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold mt-0.5">•</span>
                      <span>
                        <strong className="text-white">Seuil de Rentabilité (Break-Even) :</strong> Atteint dès Q2 2028 (+473 k€ d'EBITDA), assurant l'autonomie financière de l'entreprise.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold mt-0.5">•</span>
                      <span>
                        <strong className="text-white">Création d'Emplois en France :</strong> Montée en puissance de 3 salariés (2026) à 27 salariés en 2030 (Région Sud / Sophia Antipolis).
                      </span>
                    </li>
                  </ul>
                </div>

                {slide.callout && (
                  <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-xs text-cyan-200">
                    <span className="font-bold block text-white mb-1">
                      {slide.callout.title}
                    </span>
                    {slide.callout.content}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Slide 13: Unit Economics */}
        {slide.id === "unit-economics" && (
          <div className="max-w-6xl mx-auto w-full space-y-6 relative z-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                {slide.category} · Slide {slide.slideNumber}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display">
                {slide.title}
              </h2>
              <p className="text-sm text-slate-300 mt-1 max-w-3xl">{slide.subtitle}</p>
            </div>

            <UnitEconomicsOverview />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {slide.bulletPoints?.map((bp, i) => (
                <div key={i} className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
                  <h4 className="text-sm font-bold text-white mb-1.5 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{bp.title}</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{bp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Generic Content Slide (with optional image, table, bullets, callout) */}
        {slide.id !== "cover" &&
          slide.id !== "acoustic-science" &&
          slide.id !== "app-dashboards-slide" &&
          slide.id !== "financial-projections" &&
          slide.id !== "unit-economics" && (
            <div className="max-w-6xl mx-auto w-full space-y-6 relative z-10">
              {/* Header */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                  {slide.category} · Slide {slide.slideNumber}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-3xl leading-relaxed">
                  {slide.subtitle}
                </p>
              </div>

              {/* Layout with Image if available */}
              {slide.heroImage ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    {slide.bulletPoints && (
                      <div className="space-y-3">
                        {slide.bulletPoints.map((bp, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/30 transition-colors"
                          >
                            <h4 className="text-sm font-bold text-cyan-300 mb-1 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-cyan-400" />
                              {bp.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                              {bp.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="lg:col-span-5">
                    <div className="rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl relative group">
                      <img
                        src={slide.heroImage}
                        alt={slide.title}
                        className="w-full h-72 sm:h-80 object-cover transform transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>
              ) : (
                /* No image layout: Table or Multi-column Bullets */
                <div className="space-y-4">
                  {/* Table view if provided */}
                  {slide.tableData && (
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-800/90 text-slate-200 border-b border-slate-700">
                            {slide.tableData.headers.map((h, i) => (
                              <th key={i} className="py-3 px-4 font-bold font-display">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {slide.tableData.rows.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-800/60 transition-colors">
                              {row.map((cell, j) => (
                                <td
                                  key={j}
                                  className={`py-3 px-4 ${
                                    j === 0
                                      ? "font-semibold text-cyan-300 font-sans"
                                      : "text-slate-300"
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Bullet points if provided without image */}
                  {slide.bulletPoints && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {slide.bulletPoints.map((bp, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/30 transition-all"
                        >
                          <h4 className="text-sm font-bold text-cyan-300 mb-1.5 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                            <span>{bp.title}</span>
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {bp.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Metrics bar */}
                  {slide.metrics && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      {slide.metrics.map((m, i) => (
                        <div
                          key={i}
                          className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl"
                        >
                          <span className="text-xs text-slate-400 block">{m.label}</span>
                          <span className="text-2xl font-extrabold text-white font-mono block mt-1">
                            {m.value}
                          </span>
                          <span className="text-xs text-cyan-400 block mt-1">{m.detail}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Callout box */}
                  {slide.callout && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 to-cyan-950/60 border border-cyan-500/30 text-xs text-slate-200 shadow-md">
                      <span className="font-bold text-cyan-300 block mb-1">
                        {slide.callout.title}
                      </span>
                      {slide.callout.content}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
      </div>

      {/* Slide Navigation Footer & Progress */}
      <div className="px-6 py-4 bg-[#081126]/90 border-t border-cyan-500/20 rounded-b-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Progress Bar with Logo Gradient */}
        <div className="w-full sm:w-1/3 flex items-center gap-3">
          <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#00D2B4] transition-all duration-300"
              style={{
                width: `${((currentSlideIndex + 1) / totalSlides) * 100}%`,
              }}
            />
          </div>
          <span className="text-xs font-mono text-cyan-300 font-bold whitespace-nowrap">
            {currentSlideIndex + 1} / {totalSlides}
          </span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              currentSlideIndex === 0
                ? "text-slate-600 bg-slate-900 border border-slate-800 cursor-not-allowed"
                : "text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 shadow-sm"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Précédent</span>
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlideIndex === totalSlides - 1}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              currentSlideIndex === totalSlides - 1
                ? "text-slate-600 bg-slate-900 border border-slate-800 cursor-not-allowed"
                : "text-slate-950 bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#00D2B4] hover:opacity-90 shadow-md shadow-cyan-500/20"
            }`}
          >
            <span>Suivant</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Speaker / Talent Visa Notes Modal */}
      {showNotes && (
        <div className="mt-4 p-5 rounded-2xl bg-[#081226] border border-cyan-500/30 text-xs space-y-3 animate-fadeIn shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-white uppercase tracking-wider">
                Notes d'Explication & Précisions Visa Talent (Préfecture & DREETS)
              </span>
            </div>
            <button
              onClick={() => setShowNotes(false)}
              className="text-slate-400 hover:text-white"
            >
              Fermer
            </button>
          </div>
          <p className="text-slate-300 leading-relaxed">
            {slide.talentVisaContext ||
              "Ce slide démontre la rigueur scientifique et la viabilité économique du projet WAVICA. La société SASU en création en France valorise les actifs existants (40h de catalogue audio, moteur N-of-1, pilote Monaco) et assure l'autonomie financière dès 2028."}
          </p>
        </div>
      )}

      {/* Slide Drawer / Quick Navigation Index */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-[#081226] border-l border-cyan-500/30 h-full p-6 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base font-display">
                Sommaire du Pitch Deck (16 Slides)
              </h3>
              <button
                onClick={() => setShowDrawer(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 bg-slate-800 rounded-lg"
              >
                Fermer
              </button>
            </div>

            <div className="space-y-2">
              {SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setCurrentSlideIndex(idx);
                    setShowDrawer(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl transition-all border ${
                    currentSlideIndex === idx
                      ? "bg-gradient-to-r from-blue-950 to-cyan-950 border-cyan-400 text-white"
                      : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 mb-0.5">
                    <span>SLIDE {s.slideNumber}</span>
                    <span className="text-slate-500">{s.category}</span>
                  </div>
                  <div className="text-xs font-bold">{s.title}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
