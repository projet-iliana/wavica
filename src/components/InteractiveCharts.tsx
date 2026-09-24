import { useState } from "react";
import { FinancialYearData } from "../data/financialModel";

interface ChartProps {
  data: FinancialYearData[];
}

export function RevenueEbitdaChart({ data }: ChartProps) {
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  const maxVal = Math.max(...data.map((d) => d.revenueTotal), 10000000);
  const minVal = -200000;
  const range = maxVal - minVal;

  const chartHeight = 240;
  const chartWidth = 620;
  const paddingX = 60;
  const paddingY = 30;
  const innerWidth = chartWidth - paddingX * 2;
  const innerHeight = chartHeight - paddingY * 2;

  const getY = (val: number) => {
    const norm = (val - minVal) / range;
    return chartHeight - paddingY - norm * innerHeight;
  };

  const zeroY = getY(0);

  // Coordinates for lines
  const pointsRev = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * innerWidth;
    const y = getY(d.revenueTotal);
    return { x, y, data: d };
  });

  const pointsEbitda = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * innerWidth;
    const y = getY(d.ebitda);
    return { x, y, data: d };
  });

  const pathRev = pointsRev.reduce((acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), "");
  const pathEbitda = pointsEbitda.reduce((acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), "");

  // Area under revenue
  const areaRev = `${pathRev} L ${pointsRev[pointsRev.length - 1].x} ${zeroY} L ${pointsRev[0].x} ${zeroY} Z`;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-slate-800 pb-3">
        <div>
          <h4 className="text-base font-semibold text-white tracking-wide">
            Trajectoire Chiffre d'Affaires & EBITDA (2026 – 2030)
          </h4>
          <p className="text-xs text-slate-400">
            Démonstration de la montée en puissance et du passage au seuil de rentabilité
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-teal-400 inline-block" />
            <span className="text-slate-300 font-medium">Chiffre d'Affaires</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-400 inline-block" />
            <span className="text-slate-300 font-medium">EBITDA</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-amber-400 inline-block" />
            <span className="text-amber-300 font-medium">Seuil de Rentabilité (Q2 2028)</span>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-auto max-h-[300px] overflow-visible"
        >
          {/* Grid lines */}
          {[0, 2500000, 5000000, 7500000, 10000000].map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={chartWidth - paddingX}
                  y2={y}
                  stroke="#334155"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 10}
                  y={y + 4}
                  fill="#94a3b8"
                  fontSize="10"
                  textAnchor="end"
                  className="font-mono"
                >
                  {(val / 1000000).toFixed(val === 0 ? 0 : 1)} M€
                </text>
              </g>
            );
          })}

          {/* Zero baseline */}
          <line
            x1={paddingX}
            y1={zeroY}
            x2={chartWidth - paddingX}
            y2={zeroY}
            stroke="#64748b"
            strokeWidth="1.5"
          />

          {/* Revenue gradient area */}
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="ebitdaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          <path d={areaRev} fill="url(#revGrad)" />

          {/* Lines */}
          <path
            d={pathRev}
            fill="none"
            stroke="#2dd4bf"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d={pathEbitda}
            fill="none"
            stroke="#34d399"
            strokeWidth="3"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Break-even annotation line */}
          {pointsEbitda[2] && (
            <g>
              <line
                x1={pointsEbitda[2].x}
                y1={zeroY - 45}
                x2={pointsEbitda[2].x}
                y2={pointsEbitda[2].y}
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <circle
                cx={pointsEbitda[2].x}
                cy={pointsEbitda[2].y}
                r="6"
                fill="#f59e0b"
                stroke="#1e293b"
                strokeWidth="2"
              />
              <rect
                x={pointsEbitda[2].x - 65}
                y={zeroY - 55}
                width="130"
                height="22"
                rx="4"
                fill="#78350f"
                stroke="#d97706"
                strokeWidth="1"
              />
              <text
                x={pointsEbitda[2].x}
                y={zeroY - 40}
                fill="#fef3c7"
                fontSize="10"
                fontWeight="600"
                textAnchor="middle"
              >
                Break-Even (Rentabilité)
              </text>
            </g>
          )}

          {/* Data Points */}
          {pointsRev.map((p) => {
            const isHovered = hoveredYear === p.data.year;
            return (
              <g
                key={`rev-${p.data.year}`}
                onMouseEnter={() => setHoveredYear(p.data.year)}
                onMouseLeave={() => setHoveredYear(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 7 : 5}
                  fill="#0f766e"
                  stroke="#2dd4bf"
                  strokeWidth="2.5"
                  className="transition-all duration-200"
                />
                <text
                  x={p.x}
                  y={p.y - 12}
                  fill="#f0fdfa"
                  fontSize={isHovered ? "12" : "10"}
                  fontWeight="bold"
                  textAnchor="middle"
                  className="font-mono pointer-events-none drop-shadow"
                >
                  {p.data.revenueTotal >= 1000000
                    ? `${(p.data.revenueTotal / 1000000).toFixed(2)}M€`
                    : `${(p.data.revenueTotal / 1000).toFixed(0)}k€`}
                </text>
                <text
                  x={p.x}
                  y={chartHeight - 8}
                  fill={isHovered ? "#38bdf8" : "#94a3b8"}
                  fontSize="11"
                  fontWeight="600"
                  textAnchor="middle"
                  className="font-mono"
                >
                  {p.data.year}
                </text>
              </g>
            );
          })}

          {pointsEbitda.map((p) => {
            const isHovered = hoveredYear === p.data.year;
            return (
              <g
                key={`ebitda-${p.data.year}`}
                onMouseEnter={() => setHoveredYear(p.data.year)}
                onMouseLeave={() => setHoveredYear(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 6 : 4}
                  fill="#065f46"
                  stroke="#34d399"
                  strokeWidth="2"
                />
                <text
                  x={p.x}
                  y={p.y + 16}
                  fill="#a7f3d0"
                  fontSize="9"
                  fontWeight="600"
                  textAnchor="middle"
                  className="font-mono pointer-events-none"
                >
                  {p.data.ebitda >= 0 ? "+" : ""}
                  {p.data.ebitda >= 1000000
                    ? `${(p.data.ebitda / 1000000).toFixed(2)}M€`
                    : `${(p.data.ebitda / 1000).toFixed(0)}k€`}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Year Detail Box */}
      {hoveredYear && (
        <div className="mt-3 p-3 bg-slate-800/80 rounded-lg border border-slate-700 flex flex-wrap items-center justify-between text-xs animate-fadeIn">
          {(() => {
            const yearInfo = data.find((d) => d.year === hoveredYear);
            if (!yearInfo) return null;
            return (
              <>
                <span className="font-semibold text-white">Année {yearInfo.year} :</span>
                <span>
                  CA Total :{" "}
                  <strong className="text-teal-400">
                    {yearInfo.revenueTotal.toLocaleString()} €
                  </strong>
                </span>
                <span>
                  Marge Brute :{" "}
                  <strong className="text-emerald-400">
                    {yearInfo.grossMarginPercent}% ({yearInfo.grossProfit.toLocaleString()} €)
                  </strong>
                </span>
                <span>
                  EBITDA :{" "}
                  <strong className={yearInfo.ebitda >= 0 ? "text-emerald-400" : "text-rose-400"}>
                    {yearInfo.ebitda.toLocaleString()} € ({yearInfo.ebitdaMarginPercent}%)
                  </strong>
                </span>
                <span>
                  Effectif Salarié France :{" "}
                  <strong className="text-indigo-400">{yearInfo.headcount} ETP</strong>
                </span>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}

export function RevenueStreamsBreakdown({ data }: ChartProps) {
  const current = data[data.length - 1]; // 2030 projections

  const streams = [
    {
      name: "Abonnements B2C (Premium / Pro)",
      value: current.revenueB2C,
      color: "bg-teal-500",
      textColor: "text-teal-400",
      desc: "9,99 € – 14,99 € / mois · Rétention forte",
      percent: ((current.revenueB2C / current.revenueTotal) * 100).toFixed(1),
    },
    {
      name: "B2B Entreprises & Corporate",
      value: current.revenueB2B,
      color: "bg-indigo-500",
      textColor: "text-indigo-400",
      desc: "Prévention santé & bien-être au travail",
      percent: ((current.revenueB2B / current.revenueTotal) * 100).toFixed(1),
    },
    {
      name: "B2B2C Clubs Fitness Premium",
      value: current.revenueB2B2C,
      color: "bg-emerald-500",
      textColor: "text-emerald-400",
      desc: "Monaco, Riviera & chaîne de clubs VIP (299€/mois)",
      percent: ((current.revenueB2B2C / current.revenueTotal) * 100).toFixed(1),
    },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl text-slate-200">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div>
          <h4 className="text-base font-semibold text-white tracking-wide">
            Mix Produits & Diversification des Revenus (2030)
          </h4>
          <p className="text-xs text-slate-400">
            Une triple source de revenus équilibrée garantissant la résilience du modèle
          </p>
        </div>
        <span className="text-xs font-mono font-semibold text-teal-400 bg-teal-950/60 border border-teal-800/60 px-2.5 py-1 rounded">
          CA Année 5 : {(current.revenueTotal / 1000000).toFixed(2)} M€
        </span>
      </div>

      {/* Stacked Bar */}
      <div className="h-6 w-full rounded-md overflow-hidden flex bg-slate-800 mb-5">
        {streams.map((s, i) => (
          <div
            key={i}
            style={{ width: `${s.percent}%` }}
            className={`${s.color} hover:opacity-90 transition-all relative group cursor-pointer`}
            title={`${s.name}: ${s.percent}%`}
          />
        ))}
      </div>

      {/* Detailed cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {streams.map((s, i) => (
          <div key={i} className="p-3.5 rounded-lg bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-bold uppercase tracking-wider ${s.textColor}`}>
                {s.percent} % du CA
              </span>
              <span className="font-mono text-sm font-semibold text-white">
                {(s.value / 1000000).toFixed(2)} M€
              </span>
            </div>
            <p className="text-sm font-medium text-slate-100">{s.name}</p>
            <p className="text-xs text-slate-400 mt-1">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function UnitEconomicsOverview() {
  const metrics = [
    {
      label: "Coût d'Acquisition Client (CAC)",
      value: "18 €",
      benchmark: "Benchmark Santé : 35-50 €",
      desc: "Optimisé grâce au canal d'acquisition prescripteur des clubs de fitness partenaires.",
      status: "optimal",
    },
    {
      label: "Valeur Vie Client (LTV)",
      value: "380 €",
      benchmark: "Durée moyenne rétention : 38 mois",
      desc: "Basé sur 9,99 €/mois avec une attrition mensuelle faible de 3,5%.",
      status: "optimal",
    },
    {
      label: "Ratio LTV / CAC",
      value: "21,1x",
      benchmark: "Seuil d'excellence VC : > 3,0x",
      desc: "Modèle à très fort effet de levier financier et rentabilité unitaire exceptionnelle.",
      status: "highlight",
    },
    {
      label: "Délai de Récupération (Payback)",
      value: "1,8 mois",
      benchmark: "Standard SaaS : < 12 mois",
      desc: "Le coût d'acquisition est amorti en moins de 2 mois d'abonnement actif.",
      status: "optimal",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {metrics.map((m, i) => (
        <div
          key={i}
          className={`p-4 rounded-xl border ${
            m.status === "highlight"
              ? "bg-teal-950/40 border-teal-500/60 shadow-lg shadow-teal-950/20"
              : "bg-slate-900/80 border-slate-800"
          }`}
        >
          <span className="text-xs text-slate-400 font-medium block mb-1">{m.label}</span>
          <div className="flex items-baseline gap-2 mb-1">
            <span
              className={`text-2xl font-extrabold tracking-tight font-display ${
                m.status === "highlight" ? "text-teal-300" : "text-white"
              }`}
            >
              {m.value}
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 block mb-2">{m.benchmark}</span>
          <p className="text-xs text-slate-300 leading-relaxed">{m.desc}</p>
        </div>
      ))}
    </div>
  );
}
