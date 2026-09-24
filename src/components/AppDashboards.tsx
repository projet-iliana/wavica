import { useState, useEffect } from "react";
import {
  Activity,
  Heart,
  Brain,
  Moon,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Building2,
  Users,
  ChevronRight,
  Info,
  Sliders,
  Radio,
  CheckCircle2,
  Volume2,
  TrendingUp,
} from "lucide-react";
import { Logo } from "./Logo";

type DashboardTab = "cockpit" | "player" | "b2b_console";

export function AppDashboards() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("cockpit");

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(142); // 2m 22s
  const [selectedPreset, setSelectedPreset] = useState("vagal_432");
  const [simulatedHrv, setSimulatedHrv] = useState(64);
  const [showThayerExplainer, setShowThayerExplainer] = useState(false);

  // Audio timer simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackTime((prev) => (prev < 480 ? prev + 1 : 0));
        // Simulate biofeedback upward trend
        setSimulatedHrv((prev) => Math.min(72, prev + (Math.random() > 0.4 ? 1 : 0)));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const soundPresets = [
    {
      id: "vagal_432",
      title: "Régulation Vagale Ventrale",
      frequency: "432 Hz Harmonie & Alpha 10 Hz",
      duration: "8 min",
      target: "Bascule parasympathique immédiate",
      category: "Récupération Rapide",
    },
    {
      id: "focus_alpha",
      title: "Cohérence Corticale & Clarté",
      frequency: "Battements Isochrones 12 Hz",
      duration: "12 min",
      target: "Focus sans surmenage nerveux",
      category: "Performance Cognitive",
    },
    {
      id: "nsdr_theta",
      title: "Repos Profond & Décharge Allostatique",
      frequency: "Fréquences Thêta 5.5 Hz + Bruit Rose",
      duration: "15 min",
      target: "Dissipation de la fatigue cumulative",
      category: "Restauration Système",
    },
    {
      id: "respiratory_01",
      title: "Résonance Cœur-Poumon",
      frequency: "Rythme 0.1 Hz (6 respirations/min)",
      duration: "6 min",
      target: "Synchronisation baroréflexe",
      category: "Cohérence Cardiaque",
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner Aligned with Logo Palette */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#060B18] via-[#0A1633] to-[#0E1E42] border border-cyan-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-gradient-to-br from-[#0052FF]/20 via-[#00B4D8]/20 to-[#00E5C9]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-gradient-to-r from-blue-600/30 to-cyan-500/30 border border-cyan-400/40 rounded-full text-[11px] font-bold tracking-wider text-cyan-300 uppercase flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3 h-3 text-cyan-300" />
                Démonstrateur Interactif · Interface WAVICA 2.0
              </span>
              <span className="hidden sm:inline-flex px-2.5 py-0.5 bg-slate-900 border border-slate-700/80 rounded-full text-[10px] text-slate-300 font-mono">
                v1.0.4-MVP
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
              Aperçu des Dashboards de l'Application
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Explorez en direct les 3 écrans maîtres de WAVICA : le Cockpit Biométrique individuel N-of-1, le Lecteur d'Intervention Neuro-Acoustique active et la Console Partenaire B2B2C Clubs VIP.
            </p>
          </div>

          {/* Telemetry quick device status */}
          <div className="flex items-center gap-3 bg-slate-950/80 border border-cyan-500/30 p-3 rounded-2xl text-xs backdrop-blur-md">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center font-bold text-white text-xs ring-2 ring-slate-950">
                A
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-xs">Membre VIP Monaco #104</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="text-[10px] text-slate-400 flex items-center gap-2">
                <span>Oura Ring Gen 3 (86%)</span>
                <span>•</span>
                <span>Apple Watch Ultra 2 (91%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Segmented Dashboard Navigation */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-slate-800/80 pt-4">
          <button
            onClick={() => setActiveTab("cockpit")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "cockpit"
                ? "bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#00D2B4] text-slate-950 shadow-lg shadow-cyan-500/25"
                : "bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>1. Cockpit Biométrique & IA N-of-1</span>
          </button>

          <button
            onClick={() => setActiveTab("player")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "player"
                ? "bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#00D2B4] text-slate-950 shadow-lg shadow-cyan-500/25"
                : "bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>2. Lecteur d'Intervention Neuro-Acoustique</span>
          </button>

          <button
            onClick={() => setActiveTab("b2b_console")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "b2b_console"
                ? "bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#00D2B4] text-slate-950 shadow-lg shadow-cyan-500/25"
                : "bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>3. Console B2B2C Monaco & Clubs VIP</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: COCKPIT BIOMÉTRIQUE & MODÈLE D'INTÉGRATION NEUROVISCÉRALE (THAYER)
          ========================================================================= */}
      {activeTab === "cockpit" && (
        <div className="space-y-6 animate-fadeIn">
          {/* 4 Core Physiological Telemetry Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric 1: HRV / VRC */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 hover:border-cyan-400/50 transition-all shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all" />
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-cyan-400" />
                  VRC Actuelle (RMSSD)
                </span>
                <span className="px-2 py-0.5 bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold rounded-full">
                  +18% vs Baseline
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white font-display">64</span>
                <span className="text-xs text-slate-400 font-mono">ms</span>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
                <span>Moyenne glissante 28j :</span>
                <span className="font-mono text-white font-bold">54 ms</span>
              </div>
            </div>

            {/* Metric 2: Tonus Vagal (Julian Thayer Index) */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-blue-500/30 hover:border-blue-400/50 transition-all shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all" />
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-blue-400" />
                  Index Tonus Vagal
                </span>
                <span className="px-2 py-0.5 bg-blue-950/70 border border-blue-500/40 text-blue-300 text-[10px] font-bold rounded-full">
                  Modèle Thayer
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white font-display">88</span>
                <span className="text-xs text-slate-400 font-mono">/ 100</span>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
                <span>Régulation autonome :</span>
                <span className="font-semibold text-emerald-400">Flexibilité Optimale</span>
              </div>
            </div>

            {/* Metric 3: Charge Allostatique (McEwen) */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-teal-500/30 hover:border-teal-400/50 transition-all shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-xl group-hover:bg-teal-500/20 transition-all" />
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-teal-400" />
                  Charge Allostatique
                </span>
                <span className="px-2 py-0.5 bg-slate-800 text-teal-300 text-[10px] font-bold rounded-full">
                  Faible / Repos
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white font-display">1.8</span>
                <span className="text-xs text-slate-400 font-mono">/ 5.0</span>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
                <span>Statut d'usure :</span>
                <span className="text-teal-300 font-medium">Réserve Reconstituée</span>
              </div>
            </div>

            {/* Metric 4: Sommeil Récupérateur */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-indigo-500/30 hover:border-indigo-400/50 transition-all shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-all" />
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Moon className="w-4 h-4 text-indigo-400" />
                  Sommeil & Phases
                </span>
                <span className="px-2 py-0.5 bg-indigo-950/70 border border-indigo-500/40 text-indigo-300 text-[10px] font-bold rounded-full">
                  Score 91%
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white font-display">8h12</span>
                <span className="text-xs text-slate-400 font-mono">sommeil</span>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
                <span>Profond + Paradoxal :</span>
                <span className="font-mono text-white font-bold">3h53 (47%)</span>
              </div>
            </div>
          </div>

          {/* Master Section: Visualizing the 5th Scientific Pillar - Neurovisceral Integration (Thayer) */}
          <div className="p-6 rounded-3xl bg-slate-900/95 border border-cyan-500/40 shadow-xl space-y-4 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-xl text-slate-950">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                    Circuit d'Intégration Neuroviscérale (Modèle du Dr. Julian Thayer)
                    <span className="px-2 py-0.5 bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[10px] rounded-full font-sans">
                      Pilier Scientifique #5
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Comment le cortex préfrontal contrôle le système autonome via le nerf vague, et pourquoi la VRC (HRV) est le biomarqueur maître
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowThayerExplainer(!showThayerExplainer)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold rounded-xl transition-colors shrink-0"
              >
                <Info className="w-3.5 h-3.5" />
                <span>{showThayerExplainer ? "Masquer détails scientifiques" : "Comprendre l'assise scientifique"}</span>
              </button>
            </div>

            {/* Interactive Loop Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-3">
              {/* Step 1: Prefrontal Cortex */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-400/50 transition-all text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/40 text-blue-300 mx-auto flex items-center justify-center font-bold">
                  1
                </div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Cortex Préfrontal (PFC)
                </h4>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Siège des fonctions exécutives, de l'inhibition du stress et de l'adaptation cognitive.
                </p>
                <div className="pt-2 text-[10px] font-mono text-cyan-400">
                  Réseau Central Autonome (CAN)
                </div>
              </div>

              {/* Step 2: Vagus Nerve (The biological cable) */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/40 transition-all text-center space-y-2 relative">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400 text-cyan-300 mx-auto flex items-center justify-center font-bold shadow-md shadow-cyan-500/20 animate-pulse">
                  2
                </div>
                <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                  Nerf Vague (X)
                </h4>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Pont de communication bidirectionnel reliant le cerveau aux organes viscéraux régulateurs.
                </p>
                <div className="pt-2 text-[10px] font-mono text-emerald-400">
                  Frein Vagal Ventral
                </div>
              </div>

              {/* Step 3: Heart & HRV / VRC (The real-time readout) */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-400/50 transition-all text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-teal-950/80 border border-teal-500/40 text-teal-300 mx-auto flex items-center justify-center font-bold">
                  3
                </div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Variabilité Cardiaque (VRC)
                </h4>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Reflet milliseconde par milliseconde du tonus vagal et de la flexibilité autonome de l'individu.
                </p>
                <div className="pt-2 text-[10px] font-mono text-teal-400">
                  Biomarqueur Dynamique Maître
                </div>
              </div>

              {/* Step 4: WAVICA Active Acoustic Intervention */}
              <div className="p-4 rounded-2xl bg-gradient-to-b from-[#061833] to-[#08244D] border border-cyan-400 text-center space-y-2 shadow-lg shadow-cyan-500/10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-400 text-slate-950 mx-auto flex items-center justify-center font-bold">
                  4
                </div>
                <h4 className="text-xs font-bold text-cyan-200 uppercase tracking-wider">
                  Stimulation WAVICA
                </h4>
                <p className="text-[11px] text-slate-200 leading-snug">
                  Stimulation acoustique ciblée (432 Hz + ondes Alpha) qui ré-active instantanément la boucle vagale.
                </p>
                <div className="pt-2 text-[10px] font-mono text-cyan-300 font-bold">
                  Boucle Fermée N-of-1
                </div>
              </div>
            </div>

            {/* Collapsible Scientific Deep Dive Card */}
            {showThayerExplainer && (
              <div className="p-4 bg-slate-950 border border-cyan-500/30 rounded-2xl text-xs space-y-2 animate-fadeIn text-slate-300 leading-relaxed">
                <div className="font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Pourquoi l'Intégration Neuroviscérale (Julian Thayer) est capitale pour WAVICA 2.0 :</span>
                </div>
                <p>
                  <strong>1. Fondement Théorique :</strong> Les recherches du Dr. Julian Thayer ont démontré que le cortex préfrontal exerce un contrôle inhibiteur tonique sur les structures sous-corticales via le nerf vague. Une VRC (HRV) élevée témoigne d'une capacité supérieure de régulation émotionnelle, de résistance au stress et de plasticité cognitive.
                </p>
                <p>
                  <strong>2. Pourquoi la VRC est le biomarqueur dynamique clé :</strong> Contrairement à la fréquence cardiaque moyenne qui réagit grossièrement, la VRC capte en temps réel les micro-fluctuations du frein vagal. WAVICA l'utilise pour identifier la dérive de la charge allostatique avant tout signe clinique.
                </p>
                <p>
                  <strong>3. L'action acoustique prouvée :</strong> L'entraînement bio-acoustique (fréquences harmoniques, battements isochrones, cohérence 0.1 Hz) stimule les voies afférentes du nerf vague et réinitialise la boucle neuroviscérale en moins de 10 minutes.
                </p>
              </div>
            )}
          </div>

          {/* Longitudinal 28-Day N-of-1 Baseline Curve */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  Dynamique Physiologique N-of-1 & Détection d'Anomalie (28 Jours)
                </h3>
                <p className="text-xs text-slate-400">
                  Comparaison de la VRC journalière face à la moyenne glissante personnelle (aucun seuil arbitraire de population)
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-3 h-1 bg-cyan-400 rounded-full" />
                  VRC Quotidienne (ms)
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-3 h-0.5 bg-slate-500 dashed" />
                  Baseline 28j (54 ms)
                </span>
              </div>
            </div>

            {/* Visual SVG Chart */}
            <div className="h-48 w-full relative pt-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 700 150">
                {/* Safe Baseline Corridor (48ms to 60ms) */}
                <rect x="20" y="55" width="660" height="40" fill="#06B6D4" fillOpacity="0.08" rx="6" />
                <line x1="20" y1="75" x2="680" y2="75" stroke="#475569" strokeWidth="1" strokeDasharray="4,4" />

                {/* Simulated 28-day data points curve */}
                <path
                  d="M 20 80 
                     Q 60 70, 100 85 
                     T 180 95 
                     T 260 110 
                     T 340 60 
                     T 420 50 
                     T 500 85 
                     T 580 40 
                     T 660 30"
                  fill="none"
                  stroke="url(#chart-grad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Point of Anomaly Intervention (Day 14 - Drop in HRV) */}
                <circle cx="260" cy="110" r="5" fill="#F43F5E" />
                <text x="260" y="132" textAnchor="middle" fill="#FDA4AF" fontSize="10" fontFamily="monospace">
                  Alerte Allostatique (J14)
                </text>

                {/* Point of Recovery Surge post WAVICA acoustic protocol (Day 28) */}
                <circle cx="660" cy="30" r="6" fill="#00E5C9" className="animate-ping" />
                <circle cx="660" cy="30" r="5" fill="#00E5C9" />
                <text x="640" y="20" textAnchor="end" fill="#00E5C9" fontSize="10" fontWeight="bold" fontFamily="monospace">
                  Aujourd'hui : +18% (64 ms)
                </text>

                <defs>
                  <linearGradient id="chart-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0052FF" />
                    <stop offset="40%" stopColor="#F43F5E" />
                    <stop offset="70%" stopColor="#00B4D8" />
                    <stop offset="100%" stopColor="#00E5C9" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-3">
              <span>J -28 : Début du suivi</span>
              <span>J -14 : Dérive de fatigue détectée (Session 432 Hz déclenchée)</span>
              <span className="text-cyan-300 font-bold">J 0 : Restauration complète du tonus vagal</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: LECTEUR D'INTERVENTION NEURO-ACOUSTIQUE ACTIVE (SESSION EN DIRECT)
          ========================================================================= */}
      {activeTab === "player" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Col: Interactive Player & Waveform */}
            <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-slate-900/95 border border-cyan-500/30 shadow-2xl space-y-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold rounded-full flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    Protocole Neuro-Acoustique Actif
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Sortie Spatial Audio Hi-Res 24-bit
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                  {soundPresets.find((p) => p.id === selectedPreset)?.title}
                </h2>
                <p className="text-xs text-cyan-300 font-mono mt-1">
                  {soundPresets.find((p) => p.id === selectedPreset)?.frequency}
                </p>
              </div>

              {/* Animated Waveform Visualizer using the Logo Gradient */}
              <div className="py-6 px-4 bg-slate-950/80 rounded-2xl border border-slate-800 relative overflow-hidden">
                <div className="flex items-center justify-center gap-1.5 h-24">
                  {Array.from({ length: 36 }).map((_, i) => {
                    const height = isPlaying
                      ? 20 + Math.sin(i * 0.4 + playbackTime * 0.8) * 35 + Math.cos(i * 0.2) * 20
                      : 12 + Math.sin(i * 0.3) * 10;
                    return (
                      <div
                        key={i}
                        className="w-1.5 rounded-full transition-all duration-150 bg-gradient-to-t from-[#0052FF] via-[#00B4D8] to-[#00E5C9]"
                        style={{ height: `${Math.max(8, height)}px` }}
                      />
                    );
                  })}
                </div>

                {/* Progress bar */}
                <div className="mt-4 space-y-1">
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-300 rounded-full transition-all"
                      style={{ width: `${(playbackTime / 480) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>{formatTime(playbackTime)}</span>
                    <span>8:00</span>
                  </div>
                </div>
              </div>

              {/* Player Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setPlaybackTime(0)}
                  className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-2xl transition-colors"
                  title="Recommencer"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-8 py-3.5 bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#00D2B4] hover:opacity-90 text-slate-950 font-bold rounded-2xl shadow-xl shadow-cyan-500/25 transition-all flex items-center gap-2 text-sm"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5 fill-current" />
                      <span>Mettre en Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-current" />
                      <span>Lancer la Session Active</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-2 rounded-2xl text-xs text-slate-300">
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono">Volume adaptatif</span>
                </div>
              </div>
            </div>

            {/* Right Col: Live Biofeedback & Protocols Library */}
            <div className="space-y-4">
              {/* Real-time Biofeedback Widget */}
              <div className="p-5 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                    Biofeedback Temps Réel
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-[10px] rounded-full font-mono">
                    En direct
                  </span>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">VRC mesurée (RMSSD) :</span>
                    <span className="text-xl font-bold font-mono text-emerald-400">
                      {simulatedHrv} ms
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Gain vagal depuis début :</span>
                    <span className="text-xs font-bold text-cyan-300">
                      +{simulatedHrv - 54} ms (Régulation active)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Fréquence cardiaque :</span>
                    <span className="text-xs font-mono text-white">52 bpm (Repos)</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 italic leading-snug">
                  *Selon le modèle d'intégration neuroviscérale de Thayer, la hausse du RMSSD pendant la stimulation acoustique confirme le rétablissement de l'inhibition préfrontale sur le nœud sinusal.
                </p>
              </div>

              {/* Protocol selector list */}
              <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Bibliothèque de Protocoles Propriétaires
                </h4>
                <div className="space-y-2">
                  {soundPresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setSelectedPreset(preset.id);
                        setPlaybackTime(0);
                      }}
                      className={`w-full text-left p-3 rounded-2xl transition-all border ${
                        selectedPreset === preset.id
                          ? "bg-gradient-to-r from-blue-950/80 to-cyan-950/80 border-cyan-400 shadow-md"
                          : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{preset.title}</span>
                        <span className="text-[10px] font-mono text-cyan-400">{preset.duration}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{preset.target}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: CONSOLE B2B2C MONACO ATHLETIC CLUB & CORPORATE WELLNESS
          ========================================================================= */}
      {activeTab === "b2b_console" && (
        <div className="space-y-6 animate-fadeIn">
          {/* B2B Partner Stats Bar */}
          <div className="p-6 rounded-3xl bg-slate-900/95 border border-cyan-500/30 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-indigo-600 to-cyan-500 rounded-2xl text-white">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    Monaco Athletic & Longevity Club — Hub Partenaire
                  </h3>
                  <p className="text-xs text-slate-400">
                    Supervision agrégée de la cohorte VIP · Respect strict de l'anonymisation RGPD & CNIL
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold rounded-full flex items-center gap-1.5 self-start sm:self-auto">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Pilote B2B2C Actif (Monaco / Riviera)
              </span>
            </div>

            {/* 4 B2B KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Membres VIP Suivis</span>
                <span className="text-2xl font-black text-white font-display">28</span>
                <span className="text-[10px] text-cyan-400 block mt-1">100% équipés Oura / Apple</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Taux de Complétion</span>
                <span className="text-2xl font-black text-emerald-400 font-display">94.8 %</span>
                <span className="text-[10px] text-slate-400 block mt-1">Sessions de 8 à 15 min</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Alertes Surmenage Évitées</span>
                <span className="text-2xl font-black text-cyan-300 font-display">14</span>
                <span className="text-[10px] text-slate-400 block mt-1">Désamorçage pré-burnout</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Gain Moyen VRC (HRV)</span>
                <span className="text-2xl font-black text-teal-300 font-display">+16.4 %</span>
                <span className="text-[10px] text-slate-400 block mt-1">Sur 6 semaines de test</span>
              </div>
            </div>
          </div>

          {/* Anonymized Cohort Table */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              État de la Cohorte Pilote (Échantillon Représentatif)
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono">
                    <th className="py-3 px-3">Identifiant Anonyme</th>
                    <th className="py-3 px-3">Wearable Connecté</th>
                    <th className="py-3 px-3">Baseline VRC</th>
                    <th className="py-3 px-3">VRC Aujourd'hui</th>
                    <th className="py-3 px-3">Statut Autonome</th>
                    <th className="py-3 px-3">Dernière Intervention</th>
                    <th className="py-3 px-3">Adhésion Service</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-white">#VIP-MCO-101</td>
                    <td className="py-3 px-3">Oura Ring Gen 3</td>
                    <td className="py-3 px-3 font-mono">48 ms</td>
                    <td className="py-3 px-3 font-mono text-emerald-400 font-bold">58 ms (+21%)</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded-full text-[10px]">Optimal</span>
                    </td>
                    <td className="py-3 px-3 text-slate-400">Régulation Vagale 432 Hz</td>
                    <td className="py-3 px-3 text-cyan-400 font-bold">98%</td>
                  </tr>

                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-white">#VIP-MCO-102</td>
                    <td className="py-3 px-3">Apple Watch Ultra 2</td>
                    <td className="py-3 px-3 font-mono">62 ms</td>
                    <td className="py-3 px-3 font-mono text-amber-300 font-bold">54 ms (-13%)</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 bg-amber-950 text-amber-300 rounded-full text-[10px]">Légère Fatigue</span>
                    </td>
                    <td className="py-3 px-3 text-slate-400">Repos Profond NSDR 15m</td>
                    <td className="py-3 px-3 text-cyan-400 font-bold">92%</td>
                  </tr>

                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-white">#VIP-MCO-103</td>
                    <td className="py-3 px-3">Garmin Epix Pro</td>
                    <td className="py-3 px-3 font-mono">51 ms</td>
                    <td className="py-3 px-3 font-mono text-emerald-400 font-bold">60 ms (+17%)</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded-full text-[10px]">Optimal</span>
                    </td>
                    <td className="py-3 px-3 text-slate-400">Cohérence Alpha 12 Hz</td>
                    <td className="py-3 px-3 text-cyan-400 font-bold">96%</td>
                  </tr>

                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-white">#VIP-MCO-104</td>
                    <td className="py-3 px-3">Oura + Apple Watch</td>
                    <td className="py-3 px-3 font-mono">54 ms</td>
                    <td className="py-3 px-3 font-mono text-emerald-400 font-bold">64 ms (+18%)</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded-full text-[10px]">Optimal</span>
                    </td>
                    <td className="py-3 px-3 text-slate-400">Régulation Vagale 432 Hz</td>
                    <td className="py-3 px-3 text-cyan-400 font-bold">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
