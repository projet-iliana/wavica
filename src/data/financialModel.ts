export interface FinancialYearData {
  year: number;
  label: string;
  b2cUsersActive: number;
  b2cUsersPaying: number;
  b2bClubs: number;
  b2bEmployees: number;
  revenueB2C: number;
  revenueB2B2C: number;
  revenueB2B: number;
  revenueTotal: number;
  cogs: number; // Hosting, music licensing, API costs
  grossProfit: number;
  grossMarginPercent: number;
  opexRD: number; // R&D, IA engineers, data science
  opexSalesMarketing: number; // Ads, B2B sales reps
  opexAdminLegal: number; // Legal, compliance CNIL, office, accounting
  opexTotal: number;
  ebitda: number;
  ebitdaMarginPercent: number;
  netIncome: number;
  cashBalance: number;
  headcount: number;
}

export interface SimulationParams {
  b2cMonthlyPrice: number; // default 9.99
  b2cConversionRate: number; // default 5.5% (0.055)
  cacB2C: number; // default 18
  churnRateMonthly: number; // default 3.8% (0.038)
  b2bClubPriceMonthly: number; // default 299
  growthMultiplier: number; // 0.8 to 1.5
}

export const BASELINE_FINANCIALS: FinancialYearData[] = [
  {
    year: 2026,
    label: "2026 (Q4 - Lancement & Pilote)",
    b2cUsersActive: 850,
    b2cUsersPaying: 55,
    b2bClubs: 2,
    b2bEmployees: 0,
    revenueB2C: 4800,
    revenueB2B2C: 3600,
    revenueB2B: 0,
    revenueTotal: 8400,
    cogs: 1800,
    grossProfit: 6600,
    grossMarginPercent: 78.5,
    opexRD: 65000,
    opexSalesMarketing: 18000,
    opexAdminLegal: 22000,
    opexTotal: 105000,
    ebitda: -98400,
    ebitdaMarginPercent: -1171,
    netIncome: -98400,
    cashBalance: 480000, // Post-amorçage
    headcount: 3,
  },
  {
    year: 2027,
    label: "2027 (Déploiement France & Sud)",
    b2cUsersActive: 18500,
    b2cUsersPaying: 1100,
    b2bClubs: 18,
    b2bEmployees: 1200,
    revenueB2C: 131800,
    revenueB2B2C: 64500,
    revenueB2B: 72000,
    revenueTotal: 268300,
    cogs: 37500,
    grossProfit: 230800,
    grossMarginPercent: 86.0,
    opexRD: 145000,
    opexSalesMarketing: 85000,
    opexAdminLegal: 48000,
    opexTotal: 278000,
    ebitda: -47200,
    ebitdaMarginPercent: -17.6,
    netIncome: -47200,
    cashBalance: 320000,
    headcount: 5,
  },
  {
    year: 2028,
    label: "2028 (Rentabilité & Expansion UE)",
    b2cUsersActive: 82000,
    b2cUsersPaying: 5400,
    b2bClubs: 65,
    b2bEmployees: 6500,
    revenueB2C: 647000,
    revenueB2B2C: 233000,
    revenueB2B: 390000,
    revenueTotal: 1270000,
    cogs: 152000,
    grossProfit: 1118000,
    grossMarginPercent: 88.0,
    opexRD: 290000,
    opexSalesMarketing: 260000,
    opexAdminLegal: 95000,
    opexTotal: 645000,
    ebitda: 473000,
    ebitdaMarginPercent: 37.2,
    netIncome: 355000,
    cashBalance: 780000,
    headcount: 9,
  },
  {
    year: 2029,
    label: "2029 (Échelle Internationale)",
    b2cUsersActive: 240000,
    b2cUsersPaying: 16800,
    b2bClubs: 160,
    b2bEmployees: 22000,
    revenueB2C: 2014000,
    revenueB2B2C: 574000,
    revenueB2B: 1320000,
    revenueTotal: 3908000,
    cogs: 430000,
    grossProfit: 3478000,
    grossMarginPercent: 89.0,
    opexRD: 680000,
    opexSalesMarketing: 750000,
    opexAdminLegal: 210000,
    opexTotal: 1640000,
    ebitda: 1838000,
    ebitdaMarginPercent: 47.0,
    netIncome: 1378000,
    cashBalance: 2450000,
    headcount: 16,
  },
  {
    year: 2030,
    label: "2030 (Leader Européen Neuro-Recovery)",
    b2cUsersActive: 520000,
    b2cUsersPaying: 39000,
    b2bClubs: 340,
    b2bEmployees: 58000,
    revenueB2C: 4676000,
    revenueB2B2C: 1220000,
    revenueB2B: 3480000,
    revenueTotal: 9376000,
    cogs: 985000,
    grossProfit: 8391000,
    grossMarginPercent: 89.5,
    opexRD: 1350000,
    opexSalesMarketing: 1650000,
    opexAdminLegal: 420000,
    opexTotal: 3420000,
    ebitda: 4971000,
    ebitdaMarginPercent: 53.0,
    netIncome: 3728000,
    cashBalance: 6800000,
    headcount: 27,
  },
];

export function calculateProjectedFinancials(params: SimulationParams): FinancialYearData[] {
  return BASELINE_FINANCIALS.map((base) => {
    const mult = params.growthMultiplier;
    const payingRatio = params.b2cConversionRate / 0.055;
    const priceRatio = params.b2cMonthlyPrice / 9.99;
    const clubPriceRatio = params.b2bClubPriceMonthly / 299;

    const b2cUsersActive = Math.round(base.b2cUsersActive * mult);
    const b2cUsersPaying = Math.round(b2cUsersActive * params.b2cConversionRate);
    const b2bClubs = Math.round(base.b2bClubs * mult);
    const b2bEmployees = Math.round(base.b2bEmployees * mult);

    const revenueB2C = Math.round(b2cUsersPaying * params.b2cMonthlyPrice * 12);
    const revenueB2B2C = Math.round(b2bClubs * params.b2bClubPriceMonthly * 12);
    const revenueB2B = Math.round(b2bEmployees * 6 * 12); // Average €6/employee/mo
    const revenueTotal = revenueB2C + revenueB2B2C + revenueB2B;

    const cogs = Math.round(revenueTotal * (1 - base.grossMarginPercent / 100));
    const grossProfit = revenueTotal - cogs;
    const grossMarginPercent = revenueTotal > 0 ? Number(((grossProfit / revenueTotal) * 100).toFixed(1)) : 80;

    // Adjust marketing based on CAC and paying users acquired
    const adjustedMarketing = Math.round(base.opexSalesMarketing * (params.cacB2C / 18) * mult);
    const opexTotal = base.opexRD + adjustedMarketing + base.opexAdminLegal;
    const ebitda = grossProfit - opexTotal;
    const ebitdaMarginPercent = revenueTotal > 0 ? Number(((ebitda / revenueTotal) * 100).toFixed(1)) : 0;
    const netIncome = ebitda > 0 ? Math.round(ebitda * 0.75) : ebitda; // 25% corporate tax in France

    return {
      ...base,
      b2cUsersActive,
      b2cUsersPaying,
      b2bClubs,
      b2bEmployees,
      revenueB2C,
      revenueB2B2C,
      revenueB2B,
      revenueTotal,
      cogs,
      grossProfit,
      grossMarginPercent,
      opexSalesMarketing: adjustedMarketing,
      opexTotal,
      ebitda,
      ebitdaMarginPercent,
      netIncome,
    };
  });
}

export const UNIT_ECONOMICS = {
  cacB2C: 18, // €15-20
  ltvB2C: 380, // €300-500
  ratioLtvCac: 21.1, // LTV / CAC
  paybackMonths: 1.8, // 1.8 months to recover CAC
  conversionFreeToPaid: "5.5%",
  monthlyChurn: "3.5%",
  averageRevenuePerUserMonthly: "10.45 €",
  grossMarginTarget: "88%",
  breakEvenTimeline: "Q2 2028 (Mois 18 post-amorçage)",
  fundingRequired: "600 000 €",
  coFinancingBpifrance: "250 000 € (Bourse French Tech + PIA)",
};
