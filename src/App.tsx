/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Header, ViewMode } from "./components/Header";
import { SlideDeck } from "./components/SlideDeck";
import { AppDashboards } from "./components/AppDashboards";
import { DossierView } from "./components/DossierView";
import { FinancialCalculator } from "./components/FinancialCalculator";
import { GmailShareModal } from "./components/GmailShareModal";
import { generateAndDownloadPptx } from "./utils/pptxExport";
import { ShieldCheck, Sparkles, Building2 } from "lucide-react";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>("deck");
  const [isGmailModalOpen, setIsGmailModalOpen] = useState(false);

  const handleDownloadPptx = async () => {
    await generateAndDownloadPptx();
  };

  const handleOpenGmail = () => {
    setIsGmailModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#060B18] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Header bar adhering strictly to Top Bar Contract */}
      <Header
        currentView={currentView}
        onSelectView={setCurrentView}
        onDownloadPptx={handleDownloadPptx}
        onOpenGmail={handleOpenGmail}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {currentView === "deck" && (
          <SlideDeck
            onOpenCalculator={() => setCurrentView("calculator")}
            onOpenDossier={() => setCurrentView("dossier")}
            onOpenDashboards={() => setCurrentView("dashboards")}
            onDownloadPptx={handleDownloadPptx}
            onOpenGmail={handleOpenGmail}
          />
        )}

        {currentView === "dashboards" && <AppDashboards />}

        {currentView === "dossier" && (
          <DossierView
            onDownloadPptx={handleDownloadPptx}
            onOpenGmail={handleOpenGmail}
          />
        )}

        {currentView === "calculator" && <FinancialCalculator />}
      </main>

      {/* Gmail Share & Outreach Modal */}
      <GmailShareModal
        isOpen={isGmailModalOpen}
        onClose={() => setIsGmailModalOpen(false)}
        onDownloadPptx={handleDownloadPptx}
      />

      {/* Institutional Footer */}
      <footer className="no-print mt-auto border-t border-slate-900/80 bg-[#040812] py-6 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold tracking-wider text-white">
              WAVICA 2.0
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300">Active Intervention Layer pour Wearables</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Conforme CNIL / RGPD (Données de bien-être)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Écosystème French Tech Côte d'Azur & Monaco</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Éligible Bourse French Tech & JEI / CIR</span>
            </span>
          </div>

          <div className="text-[11px] text-slate-300 font-mono">
            Passeport Talent France · Septembre 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
