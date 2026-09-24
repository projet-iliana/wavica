import { useState } from "react";
import { Logo } from "./Logo";
import {
  Presentation,
  FileText,
  Calculator,
  Download,
  Mail,
  Loader2,
  Activity,
} from "lucide-react";

export type ViewMode = "deck" | "dashboards" | "dossier" | "calculator";

interface HeaderProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  onDownloadPptx: () => Promise<void>;
  onOpenGmail: () => void;
}

export function Header({
  currentView,
  onSelectView,
  onDownloadPptx,
  onOpenGmail,
}: HeaderProps) {
  const [isExportingPptx, setIsExportingPptx] = useState(false);

  const handleExportPptx = async () => {
    try {
      setIsExportingPptx(true);
      await onDownloadPptx();
    } catch (err) {
      console.error("Erreur lors de l'export PPTX:", err);
    } finally {
      setIsExportingPptx(false);
    }
  };

  return (
    <header className="no-print sticky top-0 z-50 bg-[#060B18]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Zone 1: Logo Wordmark & Graphic Wave */}
        <div 
          onClick={() => onSelectView("deck")}
          className="cursor-pointer transition-transform hover:opacity-95"
        >
          <Logo size="sm" showTagline={false} />
        </div>

        {/* Zone 2: Navigation Segmented Controls with Brand Colors */}
        <nav className="flex items-center gap-1 sm:gap-1.5 bg-slate-900/95 p-1 rounded-2xl border border-slate-800 shadow-inner">
          <button
            onClick={() => onSelectView("deck")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              currentView === "deck"
                ? "bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#00D2B4] text-slate-950 shadow-md shadow-cyan-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Pitch Deck (16 Slides)</span>
            <span className="md:hidden">Deck</span>
          </button>

          <button
            onClick={() => onSelectView("dashboards")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              currentView === "dashboards"
                ? "bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#00D2B4] text-slate-950 shadow-md shadow-cyan-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Dashboards de l'App</span>
            <span className="md:hidden">Dashboards</span>
          </button>

          <button
            onClick={() => onSelectView("dossier")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              currentView === "dossier"
                ? "bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#00D2B4] text-slate-950 shadow-md shadow-cyan-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Dossier Passeport Talent</span>
            <span className="md:hidden">Dossier</span>
          </button>

          <button
            onClick={() => onSelectView("calculator")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              currentView === "calculator"
                ? "bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#00D2B4] text-slate-950 shadow-md shadow-cyan-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Simulateur Financier</span>
            <span className="md:hidden">Finance</span>
          </button>
        </nav>

        {/* Zone 3: Export & Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Download PPTX Presentation Button */}
          <button
            onClick={handleExportPptx}
            disabled={isExportingPptx}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 hover:from-blue-600/30 hover:to-cyan-500/30 border border-cyan-400/40 text-cyan-300 hover:text-white text-xs font-bold rounded-xl transition-all shadow-sm"
            title="Télécharger la présentation PowerPoint professionnelle (.pptx)"
          >
            {isExportingPptx ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5 text-cyan-400" />
            )}
            <span className="hidden lg:inline">Télécharger PPTX</span>
            <span className="lg:hidden">PPTX</span>
          </button>

          {/* Send via Gmail Button */}
          <button
            onClick={onOpenGmail}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white text-xs font-semibold rounded-xl transition-all shadow-sm"
            title="Partager la synthèse exécutive par e-mail (Gmail)"
          >
            <Mail className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Partager</span>
          </button>
        </div>
      </div>
    </header>
  );
}
