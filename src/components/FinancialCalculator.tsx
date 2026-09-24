import { useState, useMemo } from "react";
import {
  SimulationParams,
  calculateProjectedFinancials,
  UNIT_ECONOMICS,
} from "../data/financialModel";
import { RevenueEbitdaChart, RevenueStreamsBreakdown } from "./InteractiveCharts";
import { RefreshCw, TrendingUp, DollarSign, Award, Users } from "lucide-react";

export function FinancialCalculator() {
  const defaultParams: SimulationParams = {
    b2cMonthlyPrice: 9.99,
    b2cConversionRate: 0.055,
    cacB2C: 18,
    churnRateMonthly: 0.038,
    b2bClubPriceMonthly: 299,
    growthMultiplier: 1.0,
  };

  const [params, setParams] = useState<SimulationParams>(defaultParams);
  const [selectedScenario, setSelectedScenario] = useState<"prudent" | "realiste" | "ambitieux">("realiste");

  const handleScenarioChange = (scenario: "prudent" | "realiste" | "ambitieux") => {
    setSelectedScenario(scenario);
    if (scenario === "prudent") {
      setParams({
        b2cMonthlyPrice: 8.99,
        b2cConversionRate: 0.04,
        cacB2C: 22,
        churnRateMonthly: 0.045,
        b2bClubPriceMonthly: 249,
        growthMultiplier: 0.8,
      });
    } else if (scenario === "realiste") {
      setParams(defaultParams);
    } else {
      setParams({
        b2cMonthlyPrice: 11.99,
        b2cConversionRate: 0.07,
        cacB2C: 16,
        churnRateMonthly: 0.03,
        b2bClubPriceMonthly: 349,
        growthMultiplier: 1.25,
      });
    }
  };

  const projectedData = useMemo(() => {
    return calculateProjectedFinancials(params);
  }, [params]);

  const year2028 = projectedData[2]; // Pivot year
  const year2030 = projectedData[4]; // Mature year

  // Dynamic LTV based on user price and churn
  const computedLtv = Math.round(params.b2cMonthlyPrice / params.churnRateMonthly);
  const computedLtvCacRatio = (computedLtv / params.cacB2C).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950/60 border border-teal-800/80 px-2.5 py-1 rounded">
                Simulateur Financier Dynamique
              </span>
              <span className="text-xs text-slate-400 font-mono">Modèle Quinquennal 2026 – 2030</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight font-display">
              Hypothèses Économiques & Sensibilité du Modèle
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Ajustez les leviers opérationnels pour observer en temps réel l'impact sur le seuil de rentabilité (Break-Even), la marge d'EBITDA et les flux de trésorerie prévisionnels.
            </p>
          </div>

          {/* Scenario quick selectors */}
          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => handleScenarioChange("prudent")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedScenario === "prudent"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Scénario Prudent
            </button>
            <button
              onClick={() => handleScenarioChange("realiste")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedScenario === "realiste"
                  ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Scénario Réaliste
            </button>
            <button
              onClick={() => handleScenarioChange("ambitieux")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedScenario === "ambitieux"
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Scénario Ambitieux
            </button>
            <button
              onClick={() => {
                setParams(defaultParams);
                setSelectedScenario("realiste");
              }}
              title="Réinitialiser"
              className="p-1.5 text-slate-400 hover:text-teal-400 transition-colors ml-1"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          {/* Price B2C */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-medium text-slate-300">Prix Abonnement B2C</label>
              <span className="font-mono text-sm font-bold text-teal-400">
                {params.b2cMonthlyPrice.toFixed(2)} € / mois
              </span>
            </div>
            <input
              type="range"
              min="6.99"
              max="16.99"
              step="0.5"
              value={params.b2cMonthlyPrice}
              onChange={(e) =>
                setParams({ ...params, b2cMonthlyPrice: parseFloat(e.target.value) })
              }
              className="w-full accent-teal-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>6,99 €</span>
              <span>Défaut : 9,99 €</span>
              <span>16,99 €</span>
            </div>
          </div>

          {/* Conversion Free -> Paid */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-medium text-slate-300">Conversion Freemium → Payant</label>
              <span className="font-mono text-sm font-bold text-teal-400">
                {(params.b2cConversionRate * 100).toFixed(1)} %
              </span>
            </div>
            <input
              type="range"
              min="0.02"
              max="0.10"
              step="0.005"
              value={params.b2cConversionRate}
              onChange={(e) =>
                setParams({ ...params, b2cConversionRate: parseFloat(e.target.value) })
              }
              className="w-full accent-teal-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>2,0 %</span>
              <span>Standard : 5,5 %</span>
              <span>10,0 %</span>
            </div>
          </div>

          {/* CAC B2C */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-medium text-slate-300">Coût d'Acquisition (CAC)</label>
              <span className="font-mono text-sm font-bold text-teal-400">{params.cacB2C} €</span>
            </div>
            <input
              type="range"
              min="10"
              max="35"
              step="1"
              value={params.cacB2C}
              onChange={(e) => setParams({ ...params, cacB2C: parseInt(e.target.value) })}
              className="w-full accent-teal-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>10 €</span>
              <span>Prévu : 18 €</span>
              <span>35 €</span>
            </div>
          </div>

          {/* Club Price */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-medium text-slate-300">Tarif B2B2C Club VIP</label>
              <span className="font-mono text-sm font-bold text-teal-400">
                {params.b2bClubPriceMonthly} € / mois
              </span>
            </div>
            <input
              type="range"
              min="199"
              max="499"
              step="20"
              value={params.b2bClubPriceMonthly}
              onChange={(e) =>
                setParams({ ...params, b2bClubPriceMonthly: parseInt(e.target.value) })
              }
              className="w-full accent-teal-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>199 €</span>
              <span>Base : 299 €</span>
              <span>499 €</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <TrendingUp className="w-4 h-4 text-teal-400" />
            <span>Chiffre d'Affaires 2030</span>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {(year2030.revenueTotal / 1000000).toFixed(2)} M€
          </div>
          <span className="text-[11px] text-teal-400">
            Marge brute {year2030.grossMarginPercent}%
          </span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>EBITDA 2030 (Année 5)</span>
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {(year2030.ebitda / 1000000).toFixed(2)} M€
          </div>
          <span className="text-[11px] text-slate-400">
            Marge nette estimée {year2030.ebitdaMarginPercent}%
          </span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Ratio LTV / CAC</span>
          </div>
          <div className="text-2xl font-black text-amber-300 font-mono">
            {computedLtvCacRatio}x
          </div>
          <span className="text-[11px] text-slate-400">
            LTV calculée : {computedLtv} € (CAC : {params.cacB2C} €)
          </span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <Users className="w-4 h-4 text-indigo-400" />
            <span>Création d'Emplois (France)</span>
          </div>
          <div className="text-2xl font-black text-indigo-300 font-mono">
            {year2030.headcount} Salariés
          </div>
          <span className="text-[11px] text-slate-400">
            Ingénieurs IA, Acousticiens & Sales
          </span>
        </div>
      </div>

      {/* Interactive Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueEbitdaChart data={projectedData} />
        <RevenueStreamsBreakdown data={projectedData} />
      </div>

      {/* Comprehensive P&L Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white font-display">
              Compte de Résultat Prévisionnel Quinquennal (P&L en k€)
            </h3>
            <p className="text-xs text-slate-400">
              Chiffres synchronisés avec vos paramètres de simulation
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Devise : Euro (€) · Normes comptables françaises
          </span>
        </div>

        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono text-[11px]">
              <th className="py-3 px-3">Ligne Budgétaire</th>
              {projectedData.map((d) => (
                <th key={d.year} className="py-3 px-3 text-right">
                  {d.year}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {/* Revenue breakdown */}
            <tr className="bg-slate-950/40">
              <td className="py-2.5 px-3 font-sans font-medium text-slate-300">
                Abonnements B2C (Free → Premium)
              </td>
              {projectedData.map((d) => (
                <td key={d.year} className="py-2.5 px-3 text-right text-slate-300">
                  {(d.revenueB2C / 1000).toFixed(1)} k€
                </td>
              ))}
            </tr>
            <tr className="bg-slate-950/40">
              <td className="py-2.5 px-3 font-sans font-medium text-slate-300">
                B2B2C Partenariats Clubs VIP (Monaco / FR)
              </td>
              {projectedData.map((d) => (
                <td key={d.year} className="py-2.5 px-3 text-right text-slate-300">
                  {(d.revenueB2B2C / 1000).toFixed(1)} k€
                </td>
              ))}
            </tr>
            <tr className="bg-slate-950/40">
              <td className="py-2.5 px-3 font-sans font-medium text-slate-300">
                B2B Offres Corporate & Entreprises
              </td>
              {projectedData.map((d) => (
                <td key={d.year} className="py-2.5 px-3 text-right text-slate-300">
                  {(d.revenueB2B / 1000).toFixed(1)} k€
                </td>
              ))}
            </tr>

            {/* Total Revenue */}
            <tr className="bg-teal-950/30 font-bold border-t border-b border-teal-900/50">
              <td className="py-3 px-3 font-sans text-teal-300">
                CHIFFRE D'AFFAIRES CONSOLIDÉ (CA)
              </td>
              {projectedData.map((d) => (
                <td key={d.year} className="py-3 px-3 text-right text-teal-300 text-sm">
                  {(d.revenueTotal / 1000).toFixed(1)} k€
                </td>
              ))}
            </tr>

            {/* COGS & Gross Profit */}
            <tr>
              <td className="py-2.5 px-3 font-sans text-slate-400">
                Coûts Directs / Hébergement & Droits Sonores (COGS)
              </td>
              {projectedData.map((d) => (
                <td key={d.year} className="py-2.5 px-3 text-right text-slate-400">
                  -{(d.cogs / 1000).toFixed(1)} k€
                </td>
              ))}
            </tr>
            <tr className="font-semibold text-emerald-300">
              <td className="py-2.5 px-3 font-sans">
                Marge Brute d'Exploitation (%)
              </td>
              {projectedData.map((d) => (
                <td key={d.year} className="py-2.5 px-3 text-right">
                  {(d.grossProfit / 1000).toFixed(1)} k€ ({d.grossMarginPercent}%)
                </td>
              ))}
            </tr>

            {/* OpEx */}
            <tr>
              <td className="py-2 px-3 font-sans text-slate-400">
                • Recherche & Développement IA (R&D)
              </td>
              {projectedData.map((d) => (
                <td key={d.year} className="py-2 px-3 text-right text-slate-400">
                  -{(d.opexRD / 1000).toFixed(1)} k€
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-2 px-3 font-sans text-slate-400">
                • Ventes & Marketing (Acquisition B2C & B2B)
              </td>
              {projectedData.map((d) => (
                <td key={d.year} className="py-2 px-3 text-right text-slate-400">
                  -{(d.opexSalesMarketing / 1000).toFixed(1)} k€
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-2 px-3 font-sans text-slate-400">
                • Frais Généraux, Juridique CNIL & Administratif
              </td>
              {projectedData.map((d) => (
                <td key={d.year} className="py-2 px-3 text-right text-slate-400">
                  -{(d.opexAdminLegal / 1000).toFixed(1)} k€
                </td>
              ))}
            </tr>

            {/* EBITDA */}
            <tr className="bg-slate-800/80 font-bold border-t border-slate-700">
              <td className="py-3 px-3 font-sans text-white">EBITDA (Résultat Opérationnel)</td>
              {projectedData.map((d) => (
                <td
                  key={d.year}
                  className={`py-3 px-3 text-right text-sm ${
                    d.ebitda >= 0 ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {(d.ebitda / 1000).toFixed(1)} k€
                </td>
              ))}
            </tr>

            {/* Net Income */}
            <tr className="bg-slate-950 font-bold">
              <td className="py-3 px-3 font-sans text-teal-300">RÉSULTAT NET COMPTABLE</td>
              {projectedData.map((d) => (
                <td
                  key={d.year}
                  className={`py-3 px-3 text-right text-sm ${
                    d.netIncome >= 0 ? "text-teal-300" : "text-rose-400"
                  }`}
                >
                  {(d.netIncome / 1000).toFixed(1)} k€
                </td>
              ))}
            </tr>

            {/* Jobs in France */}
            <tr className="border-t border-slate-800 text-indigo-300">
              <td className="py-2.5 px-3 font-sans font-semibold">
                Effectif Salarié en France (Création d'emplois)
              </td>
              {projectedData.map((d) => (
                <td key={d.year} className="py-2.5 px-3 text-right font-bold">
                  {d.headcount} ETP
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* Notes for Investor / French Visa inspector */}
        <div className="mt-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <span>
            ℹ️ <strong>Note Méthodologique :</strong> Impôt sur les sociétés (IS) calculé au taux standard de 25% dès l'exercice bénéficiaire 2028.
          </span>
          <span className="text-teal-400 font-medium">
            Seuil de rentabilité (Break-Even) atteint avec marge de sécurité au cours de l'exercice 2028.
          </span>
        </div>
      </div>
    </div>
  );
}
