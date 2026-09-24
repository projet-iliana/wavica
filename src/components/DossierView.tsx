import { BASELINE_FINANCIALS, UNIT_ECONOMICS } from "../data/financialModel";
import { RevenueEbitdaChart, RevenueStreamsBreakdown, UnitEconomicsOverview } from "./InteractiveCharts";
import { Logo } from "./Logo";
import {
  Printer,
  Download,
  Building2,
  Award,
  ShieldCheck,
  TrendingUp,
  Cpu,
  HeartPulse,
  Users,
  CheckCircle,
  FileCheck,
  Mail,
} from "lucide-react";

interface DossierViewProps {
  onDownloadPptx?: () => void;
  onOpenGmail?: () => void;
}

export function DossierView({ onDownloadPptx, onOpenGmail }: DossierViewProps = {}) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 print:p-0 print:space-y-6">
      {/* Top action toolbar (Hidden when printing) */}
      <div className="no-print bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 sticky top-4 z-40 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-950/80 border border-teal-500/40 rounded-lg text-teal-400">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white font-display">
              Dossier Exécutif & Business Plan Passeport Talent
            </h2>
            <p className="text-xs text-slate-400">
              Format officiel structuré pour la Préfecture (Titre de séjour) & les Investisseurs Seed
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onDownloadPptx && (
            <button
              onClick={onDownloadPptx}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold rounded-xl transition-all border border-slate-700"
              title="Télécharger la présentation en fichier PowerPoint (.pptx)"
            >
              <Download className="w-3.5 h-3.5 text-teal-400" />
              <span>Télécharger PPTX</span>
            </button>
          )}

          {onOpenGmail && (
            <button
              onClick={onOpenGmail}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-medium rounded-xl transition-all border border-slate-700"
              title="Partager par e-mail avec Gmail"
            >
              <Mail className="w-3.5 h-3.5 text-red-400" />
              <span>Partager (Gmail)</span>
            </button>
          )}

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md shadow-teal-500/20"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimer / PDF</span>
          </button>
        </div>
      </div>

      {/* Main Printable Document Card */}
      <div className="bg-slate-900/90 dark-card-print border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl text-slate-200 print:border-none print:shadow-none print:p-0">
        {/* Cover / Document Header */}
        <div className="border-b border-slate-800 print:border-slate-300 pb-8 text-center space-y-4">
          <Logo size="lg" showTagline={true} className="mx-auto" />

          <div className="pt-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400 print:text-teal-700 bg-teal-950/60 print:bg-slate-100 border border-teal-800/80 print:border-slate-300 px-3 py-1 rounded-full">
              Dossier Économique & Financier d'Entreprise Innovante
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white print:text-slate-950 tracking-tight font-display mt-3">
              WAVICA 2.0 — Business Plan Exécutif
            </h1>
            <p className="text-sm sm:text-base text-slate-300 print:text-slate-700 mt-2 font-light">
              Plateforme d'intelligence artificielle de dynamique physiologique individuelle, récupération neuro-acoustique adaptative et motivation comportementale.
            </p>
          </div>

          {/* Legal and Administrative Badge Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 max-w-3xl mx-auto text-left">
            <div className="p-3 bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-400 block uppercase font-mono">Structure Juridique</span>
              <span className="text-xs font-bold text-white print:text-slate-900 block mt-0.5">SASU en France</span>
              <span className="text-[10px] text-teal-400 print:text-teal-700">RCS Côte d'Azur (06)</span>
            </div>
            <div className="p-3 bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-400 block uppercase font-mono">Dispositif Visé</span>
              <span className="text-xs font-bold text-white print:text-slate-900 block mt-0.5">Passeport Talent</span>
              <span className="text-[10px] text-teal-400 print:text-teal-700">Projet Économique Innovant</span>
            </div>
            <div className="p-3 bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-400 block uppercase font-mono">Stade de Développement</span>
              <span className="text-xs font-bold text-white print:text-slate-900 block mt-0.5">MVP Testé v1.0</span>
              <span className="text-[10px] text-teal-400 print:text-teal-700">Pilote Monaco en cours</span>
            </div>
            <div className="p-3 bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-400 block uppercase font-mono">Besoin de Financement</span>
              <span className="text-xs font-bold text-white print:text-slate-900 block mt-0.5">600 000 € Seed</span>
              <span className="text-[10px] text-teal-400 print:text-teal-700">+ Bourse French Tech</span>
            </div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <section className="pt-8 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 print:border-slate-300 pb-2">
            <Award className="w-5 h-5 text-teal-400 print:text-teal-700" />
            <h2 className="text-xl font-bold text-white print:text-slate-900 font-display">
              1. Synthèse Exécutive & Proposition de Valeur
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-slate-300 print:text-slate-800">
            <strong>WAVICA 2.0</strong> est une plateforme logicielle d'intelligence artificielle pionnière qui crée une couche d'intervention active (<em>Active Intervention Layer</em>) au-dessus de l'écosystème mondial des appareils connectés grand public (Apple Watch, Oura Ring, Garmin, Withings, Fitbit).
          </p>
          <p className="text-sm leading-relaxed text-slate-300 print:text-slate-800">
            Alors que les capteurs biométriques actuels se limitent à une mesure passive et anxiogène des données (chute de VRC / HRV, fragmentation du sommeil, scores de fatigue), l'utilisateur reste démuni sans plan d'action immédiat. <strong>WAVICA comble cette rupture fondamentale :</strong>
          </p>
          <div className="p-4 bg-slate-950/80 print:bg-slate-100 border-l-4 border-teal-400 print:border-teal-700 rounded-r-xl text-xs sm:text-sm text-slate-200 print:text-slate-900 font-medium">
            Données biométriques brutes → Détection d'écart individuel (N-of-1) → Micro-intervention ciblée (neuro-acoustique, respiration, repos) → Évaluation de l'impact à J+3 → Affinement continu du modèle personnel.
          </div>
        </section>

        {/* Section 2: Innovation & Scientific Foundation */}
        <section className="pt-8 space-y-4 page-break-inside-avoid">
          <div className="flex items-center gap-2 border-b border-slate-800 print:border-slate-300 pb-2">
            <Cpu className="w-5 h-5 text-teal-400 print:text-teal-700" />
            <h2 className="text-xl font-bold text-white print:text-slate-900 font-display">
              2. Caractère Innovant & Validation Scientifique
            </h2>
          </div>
          <p className="text-sm text-slate-300 print:text-slate-800 leading-relaxed">
            L'innovation brevetable de WAVICA ne réside pas dans une simple piste sonore ou un conseil universel, mais dans la création d'un moteur d'apprentissage continu N-of-1 reposant sur des bases neuro-physiologiques reconnues :
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-200 rounded-xl">
              <h3 className="text-sm font-bold text-cyan-300 print:text-teal-800 mb-1">
                1. Théorie Polyvagale (Dr. Stephen Porges)
              </h3>
              <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
                Stimulation sélective du complexe vagal ventral par des harmoniques et timbres acoustiques calibrés, déclenchant le réflexe de sécurité neuroceptionnelle et la bascule parasympathique régénératrice.
              </p>
            </div>
            <div className="p-4 bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-200 rounded-xl">
              <h3 className="text-sm font-bold text-cyan-300 print:text-teal-800 mb-1">
                2. Charge Allostatique & VRC (Dr. Bruce McEwen)
              </h3>
              <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
                Mesure du coût biologique cumulatif du stress chronique ; la dérive de la baseline VRC (HRV) permet d'identifier l'usure physiologique avant l'apparition de symptômes d'épuisement ou de surmenage.
              </p>
            </div>
            <div className="p-4 bg-slate-950/60 print:bg-slate-50 border border-cyan-500/40 print:border-slate-200 rounded-xl md:col-span-2 bg-gradient-to-r from-blue-950/20 to-cyan-950/20">
              <h3 className="text-sm font-bold text-cyan-300 print:text-teal-800 mb-1 flex items-center justify-between">
                <span>3. Modèle d'Intégration Neuroviscérale (Dr. Julian Thayer) — PILIER MAÎTRE</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-cyan-950 border border-cyan-400 text-cyan-300 rounded">Biomarqueur Clé</span>
              </h3>
              <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
                Le cortex préfrontal et le système nerveux autonome sont interconnectés via le nerf vague ; la variabilité de la fréquence cardiaque (HRV / VRC) est le reflet direct et en temps réel de cette boucle de régulation, et la stimulation acoustique adaptative module activement ce circuit. 
                <strong className="text-white print:text-slate-900 ml-1">Apport décisif au projet :</strong> cette théorie relie la VRC à la régulation par le nerf vague et démontre scientifiquement pourquoi la VRC est le biomarqueur maître de la dynamique d'adaptation individuelle.
              </p>
            </div>
            <div className="p-4 bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-200 rounded-xl">
              <h3 className="text-sm font-bold text-cyan-300 print:text-teal-800 mb-1">
                4. Entraînement Cérébral & Fréquences Alpha/Thêta
              </h3>
              <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
                Synchronisation des oscillations neuronales via fréquences de résonance (432 Hz, battements isochrones Alpha 10 Hz et Thêta 6 Hz) favorisant la cohérence corticale et la récupération profonde.
              </p>
            </div>
            <div className="p-4 bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-200 rounded-xl">
              <h3 className="text-sm font-bold text-cyan-300 print:text-teal-800 mb-1">
                5. Méthodologie N-of-1 (Single-Subject Experimental Design)
              </h3>
              <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
                Chaque utilisateur est son propre groupe témoin. Le système compare l'individu à sa propre moyenne glissante (7 à 28 jours), éliminant les biais et erreurs des normes de population standardisées.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Existing Assets & MVP */}
        <section className="pt-8 space-y-4 page-break-inside-avoid">
          <div className="flex items-center gap-2 border-b border-slate-800 print:border-slate-300 pb-2">
            <CheckCircle className="w-5 h-5 text-teal-400 print:text-teal-700" />
            <h2 className="text-xl font-bold text-white print:text-slate-900 font-display">
              3. Actifs Déjà Développés & Avancement Opérationnel
            </h2>
          </div>
          <p className="text-sm text-slate-300 print:text-slate-800 leading-relaxed">
            Contrairement à un simple projet conceptuel, WAVICA dispose d'actifs tangibles déjà finalisés, minimisant les risques d'exécution :
          </p>

          <table className="w-full text-xs text-left border-collapse border border-slate-800 print:border-slate-300">
            <thead>
              <tr className="bg-slate-800/80 print:bg-slate-200 text-slate-200 print:text-slate-900">
                <th className="p-2.5 border border-slate-700 print:border-slate-300">Actif Développé</th>
                <th className="p-2.5 border border-slate-700 print:border-slate-300">Description Technique</th>
                <th className="p-2.5 border border-slate-700 print:border-slate-300">Statut Réel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 print:divide-slate-300 text-slate-300 print:text-slate-800">
              <tr>
                <td className="p-2.5 font-bold text-teal-300 print:text-teal-800 border border-slate-800 print:border-slate-300">
                  Application Mobile MVP
                </td>
                <td className="p-2.5 border border-slate-800 print:border-slate-300">
                  Intégrations natives Oura API et Apple HealthKit pour l'ingestion automatique de la VRC et du sommeil.
                </td>
                <td className="p-2.5 font-semibold text-emerald-400 print:text-emerald-700 border border-slate-800 print:border-slate-300">
                  Fonctionnel & Déployé (Test fermé)
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-teal-300 print:text-teal-800 border border-slate-800 print:border-slate-300">
                  Catalogue Neuro-Acoustique
                </td>
                <td className="p-2.5 border border-slate-800 print:border-slate-300">
                  Plus de 40 heures de compositions sonores adaptatives créées avec des musiciens et compositeurs partenaires.
                </td>
                <td className="p-2.5 font-semibold text-emerald-400 print:text-emerald-700 border border-slate-800 print:border-slate-300">
                  Actif Propriétaire Détenu
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-teal-300 print:text-teal-800 border border-slate-800 print:border-slate-300">
                  Partenariat Pilote Monaco
                </td>
                <td className="p-2.5 border border-slate-800 print:border-slate-300">
                  Protocole de test B2B2C auprès de 25 membres VIP de clubs athlétiques premium en Principauté de Monaco.
                </td>
                <td className="p-2.5 font-semibold text-amber-400 print:text-amber-700 border border-slate-800 print:border-slate-300">
                  LOI en cours de signature
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-teal-300 print:text-teal-800 border border-slate-800 print:border-slate-300">
                  Conformité CNIL & RGPD
                </td>
                <td className="p-2.5 border border-slate-800 print:border-slate-300">
                  Traitement Edge AI local sur le téléphone. Qualification en "données de bien-être" sans contrainte HDS.
                </td>
                <td className="p-2.5 font-semibold text-emerald-400 print:text-emerald-700 border border-slate-800 print:border-slate-300">
                  Audit Juridique Réalisé
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Section 4: Unit Economics & Financial Projections */}
        <section className="pt-8 space-y-6 page-break-after">
          <div className="flex items-center gap-2 border-b border-slate-800 print:border-slate-300 pb-2">
            <TrendingUp className="w-5 h-5 text-teal-400 print:text-teal-700" />
            <h2 className="text-xl font-bold text-white print:text-slate-900 font-display">
              4. Modèle Économique & Compte de Résultat Prévisionnel (2026–2030)
            </h2>
          </div>

          <div className="no-print">
            <UnitEconomicsOverview />
          </div>

          <p className="text-sm text-slate-300 print:text-slate-800 leading-relaxed">
            Le modèle d'affaires combine une formule d'abonnement grand public (B2C Freemium / Premium à 9,99 €/mois et Pro à 14,99 €/mois) et un volet B2B2C récurrent sous forme de licence pour clubs de sport de prestige (299 €/mois par établissement) ainsi qu'une offre B2B pour le bien-être des collaborateurs en entreprise.
          </p>

          {/* Full Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse border border-slate-800 print:border-slate-300 font-mono">
              <thead>
                <tr className="bg-slate-800 print:bg-slate-200 text-slate-200 print:text-slate-900">
                  <th className="p-2.5 border border-slate-700 print:border-slate-300 font-sans">Indicateur (k€)</th>
                  <th className="p-2.5 border border-slate-700 print:border-slate-300 text-right">2026</th>
                  <th className="p-2.5 border border-slate-700 print:border-slate-300 text-right">2027</th>
                  <th className="p-2.5 border border-slate-700 print:border-slate-300 text-right">2028 (Pivot)</th>
                  <th className="p-2.5 border border-slate-700 print:border-slate-300 text-right">2029</th>
                  <th className="p-2.5 border border-slate-700 print:border-slate-300 text-right">2030</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 print:divide-slate-300 text-slate-300 print:text-slate-800">
                <tr>
                  <td className="p-2 border border-slate-800 print:border-slate-300 font-sans">CA B2C Abonnements</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">4,8 k€</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">131,8 k€</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">647,0 k€</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">2 014 k€</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">4 676 k€</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-800 print:border-slate-300 font-sans">CA B2B2C Clubs & Partenaires</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">3,6 k€</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">64,5 k€</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">233,0 k€</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">574 k€</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">1 220 k€</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-800 print:border-slate-300 font-sans">CA B2B Corporate</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">0 k€</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">72,0 k€</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">390,0 k€</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">1 320 k€</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">3 480 k€</td>
                </tr>
                <tr className="font-bold bg-teal-950/40 print:bg-slate-100 text-teal-300 print:text-teal-900">
                  <td className="p-2.5 border border-slate-700 print:border-slate-300 font-sans">CHIFFRE D'AFFAIRES TOTAL</td>
                  <td className="p-2.5 text-right border border-slate-700 print:border-slate-300">8,4 k€</td>
                  <td className="p-2.5 text-right border border-slate-700 print:border-slate-300">268,3 k€</td>
                  <td className="p-2.5 text-right border border-slate-700 print:border-slate-300">1 270,0 k€</td>
                  <td className="p-2.5 text-right border border-slate-700 print:border-slate-300">3 908 k€</td>
                  <td className="p-2.5 text-right border border-slate-700 print:border-slate-300">9 376 k€</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-800 print:border-slate-300 font-sans">Marge Brute (%)</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">78,5 %</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">86,0 %</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">88,0 %</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">89,0 %</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">89,5 %</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-800 print:border-slate-300 font-sans">Total OpEx (R&D, Sales, Admin)</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">105 k€</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">278 k€</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">645 k€</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">1 640 k€</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">3 420 k€</td>
                </tr>
                <tr className="font-bold bg-slate-800/80 print:bg-slate-200">
                  <td className="p-2.5 border border-slate-700 print:border-slate-300 font-sans">EBITDA</td>
                  <td className="p-2.5 text-right border border-slate-700 print:border-slate-300 text-rose-400 print:text-rose-700">-98,4 k€</td>
                  <td className="p-2.5 text-right border border-slate-700 print:border-slate-300 text-rose-400 print:text-rose-700">-47,2 k€</td>
                  <td className="p-2.5 text-right border border-slate-700 print:border-slate-300 text-emerald-400 print:text-emerald-700">+473,0 k€</td>
                  <td className="p-2.5 text-right border border-slate-700 print:border-slate-300 text-emerald-400 print:text-emerald-700">+1 838 k€</td>
                  <td className="p-2.5 text-right border border-slate-700 print:border-slate-300 text-emerald-400 print:text-emerald-700">+4 971 k€</td>
                </tr>
                <tr className="font-bold bg-slate-950 print:bg-slate-100 text-teal-300 print:text-teal-900">
                  <td className="p-2.5 border border-slate-700 print:border-slate-300 font-sans">RÉSULTAT NET</td>
                  <td className="p-2.5 text-right border border-slate-700 print:border-slate-300 text-rose-400 print:text-rose-700">-98,4 k€</td>
                  <td className="p-2.5 text-right border border-slate-700 print:border-slate-300 text-rose-400 print:text-rose-700">-47,2 k€</td>
                  <td className="p-2.5 text-right border border-slate-700 print:border-slate-300 text-emerald-400 print:text-emerald-700">+355,0 k€</td>
                  <td className="p-2.5 text-right border border-slate-700 print:border-slate-300 text-emerald-400 print:text-emerald-700">+1 378 k€</td>
                  <td className="p-2.5 text-right border border-slate-700 print:border-slate-300 text-emerald-400 print:text-emerald-700">+3 728 k€</td>
                </tr>
                <tr className="text-indigo-300 print:text-indigo-900 font-bold">
                  <td className="p-2 border border-slate-800 print:border-slate-300 font-sans">Salariés ETP en France</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">3</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">5</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">9</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">16</td>
                  <td className="p-2 text-right border border-slate-800 print:border-slate-300">27</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-950/80 print:bg-slate-50 border border-slate-800 print:border-slate-200 rounded-xl text-xs space-y-1">
            <span className="font-bold text-white print:text-slate-900 block">
              Démonstration du Seuil de Rentabilité (Break-Even) :
            </span>
            <p className="text-slate-300 print:text-slate-700 leading-relaxed">
              Le point mort financier est atteint au 18ème mois d'activité (T2 2028) avec un volume de 5 400 utilisateurs payants et 65 clubs partenaires. Dès lors, la société génère une marge d'EBITDA supérieure à 37%, garantissant l'indépendance financière et la capacité d'autofinancement des recrutements sur le territoire français.
            </p>
          </div>
        </section>

        {/* Section 5: Justification for French Talent Visa (Passeport Talent) */}
        <section className="pt-8 space-y-4 page-break-inside-avoid">
          <div className="flex items-center gap-2 border-b border-slate-800 print:border-slate-300 pb-2">
            <ShieldCheck className="w-5 h-5 text-teal-400 print:text-teal-700" />
            <h2 className="text-xl font-bold text-white print:text-slate-900 font-display">
              5. Justification d'Éligibilité au Passeport Talent (France)
            </h2>
          </div>
          <p className="text-sm text-slate-300 print:text-slate-800 leading-relaxed">
            Ce document est soumis aux autorités préfectorales compétentes pour l'obtention et le renouvellement du titre de séjour <strong>« Passeport Talent — Création d'entreprise / Porteur de projet économique innovant »</strong> (Article L. 421-16 et suivants du CESEDA).
          </p>

          <div className="space-y-3">
            <div className="p-4 bg-slate-950/60 print:bg-slate-50 border-l-4 border-teal-400 print:border-teal-700 rounded-r-xl">
              <h3 className="text-sm font-bold text-white print:text-slate-900">
                1. Investissement Réel & Structure d'Accueil en France
              </h3>
              <p className="text-xs text-slate-300 print:text-slate-700 mt-1 leading-relaxed">
                Constitution d'une SASU immatriculée auprès du Greffe du Tribunal de Commerce de Grasse / Nice, avec compte bancaire professionnel français doté du capital requis pour couvrir les charges d'exploitation initiales.
              </p>
            </div>

            <div className="p-4 bg-slate-950/60 print:bg-slate-50 border-l-4 border-teal-400 print:border-teal-700 rounded-r-xl">
              <h3 className="text-sm font-bold text-white print:text-slate-900">
                2. Reconnaissance du Caractère Innovant par les Organismes Publics
              </h3>
              <p className="text-xs text-slate-300 print:text-slate-700 mt-1 leading-relaxed">
                Le projet répond aux critères de la French Tech et prépare le dépôt d'un dossier <strong>Bourse French Tech</strong> auprès de Bpifrance PACA (subvention d'amorçage jusqu'à 30 000 €) ainsi que la demande du statut <strong>Jeune Entreprise Innovante (JEI)</strong> et du <strong>Crédit d'Impôt Recherche (CIR)</strong>.
              </p>
            </div>

            <div className="p-4 bg-slate-950/60 print:bg-slate-50 border-l-4 border-teal-400 print:border-teal-700 rounded-r-xl">
              <h3 className="text-sm font-bold text-white print:text-slate-900">
                3. Création Durable d'Emplois Hautement Qualifiés en France
              </h3>
              <p className="text-xs text-slate-300 print:text-slate-700 mt-1 leading-relaxed">
                Le plan de développement prévoit la création de <strong>27 emplois en CDI d'ici 2030</strong> sur le territoire français, avec un accent fort sur les compétences en intelligence artificielle, acoustique comportementale et ingénierie mobile, valorisant le bassin d'emploi technologique de Sophia Antipolis.
              </p>
            </div>

            <div className="p-4 bg-slate-950/60 print:bg-slate-50 border-l-4 border-teal-400 print:border-teal-700 rounded-r-xl">
              <h3 className="text-sm font-bold text-white print:text-slate-900">
                4. Ancrage Territorial & Rayonnement Économique Régional
              </h3>
              <p className="text-xs text-slate-300 print:text-slate-700 mt-1 leading-relaxed">
                L'implantation sur la Côte d'Azur offre un point de départ stratégique idéal : proximité immédiate avec la clientèle haut de gamme et les complexes athlétiques de la Principauté de Monaco, tout en bénéficiant de l'écosystème de recherche de l'Université Côte d'Azur et d'Inria Sophia Antipolis.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Funding Allocation & Seed Round */}
        <section className="pt-8 space-y-4 page-break-inside-avoid">
          <div className="flex items-center gap-2 border-b border-slate-800 print:border-slate-300 pb-2">
            <Building2 className="w-5 h-5 text-teal-400 print:text-teal-700" />
            <h2 className="text-xl font-bold text-white print:text-slate-900 font-display">
              6. Tour de Table Seed & Répartition des Fonds (600 000 €)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-200 rounded-xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 print:text-teal-700">
                Affectation du Capital
              </span>
              <ul className="text-xs text-slate-300 print:text-slate-800 space-y-1.5">
                <li>• <strong>40% (240 k€) :</strong> Ingénierie IA & Data Science (salaires R&D France)</li>
                <li>• <strong>30% (180 k€) :</strong> Déploiement commercial B2B2C & Marketing</li>
                <li>• <strong>15% (90 k€) :</strong> Production neuro-acoustique propriétaire</li>
                <li>• <strong>8% (50 k€) :</strong> Propriété intellectuelle & Conformité RGPD</li>
                <li>• <strong>7% (40 k€) :</strong> Trésorerie de sécurité opérationnelle</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-200 rounded-xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 print:text-emerald-700">
                Effet de Levier Bpifrance & Non-Dilutif
              </span>
              <p className="text-xs text-slate-300 print:text-slate-800 leading-relaxed">
                Le bouclage de ce tour d'amorçage de 600 k€ permettra de solliciter en contrepartie jusqu'à <strong>250 000 € de financements non-dilutifs</strong> (Prêt d'Amorçage Investissement Bpifrance et subvention French Tech), portant le budget opérationnel global à 850 000 €.
              </p>
            </div>
          </div>
        </section>

        {/* Official Signature block for the French authorities */}
        <div className="pt-10 border-t border-slate-800 print:border-slate-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-xs text-slate-400 print:text-slate-700">
          <div>
            <p className="font-semibold text-slate-200 print:text-slate-900">
              Fait pour valoir ce que de droit,
            </p>
            <p>Nice / Sophia Antipolis (Alpes-Maritimes), France</p>
            <p className="mt-1 font-mono text-[10px]">
              Dossier soumis pour le renouvellement du Titre de Séjour Passeport Talent
            </p>
          </div>
          <div className="p-4 border border-dashed border-slate-700 print:border-slate-400 rounded-xl w-60 text-center">
            <span className="text-[10px] uppercase font-mono block text-slate-500">
              Signature & Cachet de la Direction
            </span>
            <div className="h-12 flex items-center justify-center font-display italic text-teal-400 print:text-teal-800 text-sm">
              WAVICA France SASU
            </div>
            <span className="text-[9px] text-slate-500 block">Présidence du Conseil</span>
          </div>
        </div>
      </div>
    </div>
  );
}
