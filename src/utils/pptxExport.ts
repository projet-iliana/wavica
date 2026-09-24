import pptxgen from "pptxgenjs";
import { SLIDES } from "../data/presentationData";
import { BASELINE_FINANCIALS, UNIT_ECONOMICS } from "../data/financialModel";

/**
 * Generates and downloads a complete, professional, non-interactive PowerPoint (.pptx)
 * containing all 15 slides of the WAVICA 2.0 Pitch Deck & Business Plan in French.
 */
export async function generateAndDownloadPptx(): Promise<void> {
  const pres = new pptxgen();

  pres.layout = "LAYOUT_16x9";
  pres.author = "WAVICA France SASU";
  pres.company = "WAVICA France";
  pres.title = "WAVICA 2.0 — Pitch Deck & Business Plan Exécutif";
  pres.subject = "Présentation d'investissement Seed (600 k€) & Dossier Passeport Talent France";

  // Palette definition matching WAVICA logo
  const C_BG = "060B18"; // Deep navy background from logo
  const C_CARD = "0E1B38"; // Rich card surface
  const C_CARD_BORDER = "182B56"; // Card border with navy blue tint
  const C_TEAL = "00B4D8"; // Electric cyan from ribbon
  const C_TEAL_LIGHT = "00E5C9"; // Radiant turquoise from ribbon
  const C_BLUE = "0052FF"; // Vibrant cobalt blue from ribbon
  const C_EMERALD = "10B981";
  const C_AMBER = "F59E0B";
  const C_ROSE = "F43F5E";
  const C_WHITE = "FFFFFF";
  const C_SLATE_LIGHT = "CBD5E1";
  const C_SLATE_MUTED = "94A3B8";

  // Helper to add standard header and footer to every content slide
  const addHeaderAndFooter = (
    slide: any,
    category: string,
    title: string,
    subtitle: string,
    slideNum: number
  ) => {
    // Top background
    slide.background = { color: C_BG };

    // Brand logo text top-left
    slide.addText("WAVICA", {
      x: 0.8,
      y: 0.35,
      w: 1.8,
      h: 0.3,
      fontSize: 16,
      bold: true,
      color: C_WHITE,
      fontFace: "Arial",
      charSpacing: 3,
    });

    // Category badge
    slide.addText(category.toUpperCase(), {
      x: 2.7,
      y: 0.35,
      w: 4.5,
      h: 0.3,
      fontSize: 9,
      bold: true,
      color: C_TEAL,
      fontFace: "Arial",
      charSpacing: 2,
    });

    // Slide Title
    slide.addText(title, {
      x: 0.8,
      y: 0.75,
      w: 11.5,
      h: 0.5,
      fontSize: 22,
      bold: true,
      color: C_WHITE,
      fontFace: "Arial",
    });

    // Subtitle
    if (subtitle) {
      slide.addText(subtitle, {
        x: 0.8,
        y: 1.25,
        w: 11.5,
        h: 0.35,
        fontSize: 11,
        color: C_SLATE_LIGHT,
        fontFace: "Arial",
      });
    }

    // Bottom horizontal separator line
    slide.addShape(pres.ShapeType.line, {
      x: 0.8,
      y: 7.0,
      w: 11.7,
      h: 0,
      line: { color: C_CARD_BORDER, width: 1 },
    });

    // Bottom footer text
    slide.addText("WAVICA 2.0 · Active Intervention Layer · Dossier d'Investissement & Passeport Talent France", {
      x: 0.8,
      y: 7.05,
      w: 9.0,
      h: 0.3,
      fontSize: 9,
      color: C_SLATE_MUTED,
      fontFace: "Arial",
    });

    // Slide number
    slide.addText(`${slideNum} / 16`, {
      x: 10.5,
      y: 7.05,
      w: 2.0,
      h: 0.3,
      fontSize: 9,
      align: "right",
      color: C_SLATE_MUTED,
      fontFace: "Arial",
    });
  };

  // -------------------------------------------------------------
  // SLIDE 1: COVER
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    slide.background = { color: C_BG };

    // Decorative gradient accent box
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 1.0,
      w: 3.5,
      h: 0.3,
      fill: { color: "083344" },
      line: { color: C_TEAL, width: 1 },
    });
    slide.addText("ACTIVE INTERVENTION LAYER POUR WEARABLES", {
      x: 0.9,
      y: 1.02,
      w: 3.3,
      h: 0.26,
      fontSize: 8,
      bold: true,
      color: C_TEAL_LIGHT,
      fontFace: "Arial",
      charSpacing: 1.5,
    });

    // Main Logo and Title
    slide.addText("WAVICA 2.0", {
      x: 0.8,
      y: 1.5,
      w: 10.0,
      h: 1.1,
      fontSize: 52,
      bold: true,
      color: C_WHITE,
      fontFace: "Arial",
      charSpacing: 4,
    });

    slide.addText("YOUR HEALTH · YOUR FUTURE", {
      x: 0.85,
      y: 2.5,
      w: 6.0,
      h: 0.3,
      fontSize: 12,
      bold: true,
      color: C_TEAL,
      fontFace: "Arial",
      charSpacing: 4,
    });

    slide.addText(
      "Plateforme IA de dynamique physiologique individuelle, récupération acoustique adaptative et motivation comportementale",
      {
        x: 0.8,
        y: 2.95,
        w: 10.5,
        h: 0.7,
        fontSize: 15,
        color: C_SLATE_LIGHT,
        fontFace: "Arial",
      }
    );

    // Callout box
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8,
      y: 3.8,
      w: 11.7,
      h: 1.1,
      fill: { color: C_CARD },
      line: { color: C_TEAL, width: 1 },
      rectRadius: 0.1,
    });

    slide.addText("STATUT DU PROJET · SEPTEMBRE 2026", {
      x: 1.0,
      y: 3.95,
      w: 11.3,
      h: 0.25,
      fontSize: 10,
      bold: true,
      color: C_TEAL,
      fontFace: "Arial",
    });

    slide.addText(
      "MVP opérationnel v1.0 développé · Catalogue audio propriétaire finalisé · Pilote Monaco en phase de lancement · Enregistrement SASU en France (Écosystème French Tech Côte d'Azur / Sophia Antipolis).",
      {
        x: 1.0,
        y: 4.25,
        w: 11.3,
        h: 0.5,
        fontSize: 11,
        color: C_SLATE_LIGHT,
        fontFace: "Arial",
      }
    );

    // Key metrics boxes
    const coverMetrics = [
      { label: "STADE", value: "MVP Testé", detail: "Oura & Apple Health intégrés" },
      { label: "MODÈLE", value: "B2C & B2B2C", detail: "Abonnement + Partenariats Clubs" },
      { label: "TOUR DE TABLE", value: "600 000 €", detail: "Levée Seed + Levier Bpifrance" },
    ];

    coverMetrics.forEach((m, idx) => {
      const xPos = 0.8 + idx * 4.0;
      slide.addShape(pres.ShapeType.roundRect, {
        x: xPos,
        y: 5.1,
        w: 3.7,
        h: 1.2,
        fill: { color: C_CARD },
        line: { color: C_CARD_BORDER, width: 1 },
        rectRadius: 0.1,
      });

      slide.addText(m.label, {
        x: xPos + 0.2,
        y: 5.2,
        w: 3.3,
        h: 0.2,
        fontSize: 9,
        color: C_SLATE_MUTED,
        fontFace: "Arial",
      });

      slide.addText(m.value, {
        x: xPos + 0.2,
        y: 5.45,
        w: 3.3,
        h: 0.45,
        fontSize: 18,
        bold: true,
        color: C_WHITE,
        fontFace: "Arial",
      });

      slide.addText(m.detail, {
        x: xPos + 0.2,
        y: 5.95,
        w: 3.3,
        h: 0.25,
        fontSize: 9,
        color: C_TEAL,
        fontFace: "Arial",
      });
    });

    slide.addText(
      "Dossier présenté pour la recherche d'investisseurs Seed & la demande de titre de séjour Passeport Talent (Création d'entreprise innovante)",
      {
        x: 0.8,
        y: 6.7,
        w: 11.7,
        h: 0.3,
        fontSize: 9,
        italic: true,
        color: C_SLATE_MUTED,
        fontFace: "Arial",
      }
    );
  }

  // -------------------------------------------------------------
  // SLIDE 2: EXECUTIVE SUMMARY
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    addHeaderAndFooter(slide, "Résumé Exécutif", "Synthèse Stratégique & Thèse d'Investissement", "Transformer les données biométriques passives en actions concrètes de régénération nerveuse", 2);

    const pillars = [
      {
        title: "La Rupture Active (Active Intervention Layer)",
        desc: "WAVICA ne concurrence pas les montres connectées (Apple Watch, Oura, Garmin). Elle s'intègre au-dessus d'elles pour combler le vide critique entre la mesure d'une anomalie et l'action de récupération personnalisée.",
      },
      {
        title: "Intelligence Personnalisée N-of-1",
        desc: "Fini les conseils génériques basés sur des moyennes statistiques. WAVICA apprend la physiologie, la psychologie et la réactivité propre à chaque individu via une boucle fermée d'apprentissage.",
      },
      {
        title: "Positionnement Non-Médical & Vélocité Réglementaire",
        desc: "Classé comme produit numérique de bien-être (données de bien-être CNIL/RGPD). Pas d'obstacle HDS ni d'autorisation ANSM, permettant un time-to-market immédiat tout en conservant une validation scientifique rigoureuse.",
      },
      {
        title: "Implantation Stratégique en France",
        desc: "Création d'une SASU innovante sur la Côte d'Azur (Sophia Antipolis / Nice), éligible Bourse French Tech Bpifrance, CIR et statut Jeune Entreprise Innovante (JEI), avec déploiement pilote à Monaco.",
      },
    ];

    pillars.forEach((p, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const xPos = 0.8 + col * 5.95;
      const yPos = 1.8 + row * 2.1;

      slide.addShape(pres.ShapeType.roundRect, {
        x: xPos,
        y: yPos,
        w: 5.75,
        h: 1.95,
        fill: { color: C_CARD },
        line: { color: C_CARD_BORDER, width: 1 },
        rectRadius: 0.1,
      });

      slide.addText(`0${idx + 1}. ${p.title}`, {
        x: xPos + 0.25,
        y: yPos + 0.15,
        w: 5.25,
        h: 0.35,
        fontSize: 12,
        bold: true,
        color: C_TEAL_LIGHT,
        fontFace: "Arial",
      });

      slide.addText(p.desc, {
        x: xPos + 0.25,
        y: yPos + 0.55,
        w: 5.25,
        h: 1.25,
        fontSize: 10,
        color: C_SLATE_LIGHT,
        fontFace: "Arial",
      });
    });

    // Bottom KPIs
    const bottomKpis = [
      { label: "MARCHÉ TOTAL (TAM 2030)", value: "500 Mds $" },
      { label: "MARGE BRUTE CIBLE", value: "88 %" },
      { label: "SEUIL DE RENTABILITÉ", value: "Mois 18 (Q2 2028)" },
      { label: "EMPLOIS EN FRANCE", value: "27 Salariés (2030)" },
    ];

    bottomKpis.forEach((k, idx) => {
      const xPos = 0.8 + idx * 3.0;
      slide.addText(`${k.label} : `, {
        x: xPos,
        y: 6.3,
        w: 2.8,
        h: 0.2,
        fontSize: 8,
        color: C_SLATE_MUTED,
        fontFace: "Arial",
      });
      slide.addText(k.value, {
        x: xPos,
        y: 6.5,
        w: 2.8,
        h: 0.35,
        fontSize: 13,
        bold: true,
        color: C_WHITE,
        fontFace: "Arial",
      });
    });
  }

  // -------------------------------------------------------------
  // SLIDE 3: PROBLEM - LE PARADOXE DU MONITORING PASSIF
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    addHeaderAndFooter(slide, "Problématique de Marché", "Le Paradoxe du Monitoring Passif", "Les utilisateurs ont accès à une abondance de données, mais restent démunis face à l'action", 3);

    const problems = [
      {
        title: "L'impasse des scores bruts",
        desc: "Les wearables mesurent avec précision le sommeil, la VRC (HRV), le rythme de repos et la température. Pourtant, lorsque l'utilisateur constate une chute de son score de récupération, aucune solution personnalisée ne lui est proposée.",
      },
      {
        title: "Les questions quotidiennes sans réponse",
        desc: "Qu'est-ce qui a changé par rapport à mon habitude ? Est-ce une anomalie ponctuelle ou un schéma répétitif ? Que puis-je faire aujourd'hui en 5 minutes avec peu d'énergie ? Comment savoir si cette action a réellement fonctionné sur moi ?",
      },
      {
        title: "L'échec des applications de méditation classiques",
        desc: "Les applications traditionnelles (Calm, Headspace) proposent des catalogues statiques et impersonnels. Elles ignorent tout du contexte biologique réel de l'utilisateur et souffrent d'une perte d'engagement rapide (taux d'attrition élevé).",
      },
    ];

    problems.forEach((p, idx) => {
      const xPos = 0.8 + idx * 4.0;
      slide.addShape(pres.ShapeType.roundRect, {
        x: xPos,
        y: 1.8,
        w: 3.75,
        h: 3.2,
        fill: { color: C_CARD },
        line: { color: C_CARD_BORDER, width: 1 },
        rectRadius: 0.1,
      });

      slide.addText(`0${idx + 1}`, {
        x: xPos + 0.25,
        y: 2.0,
        w: 1.0,
        h: 0.35,
        fontSize: 18,
        bold: true,
        color: C_TEAL,
        fontFace: "Arial",
      });

      slide.addText(p.title, {
        x: xPos + 0.25,
        y: 2.4,
        w: 3.25,
        h: 0.6,
        fontSize: 12,
        bold: true,
        color: C_WHITE,
        fontFace: "Arial",
      });

      slide.addText(p.desc, {
        x: xPos + 0.25,
        y: 3.05,
        w: 3.25,
        h: 1.8,
        fontSize: 10,
        color: C_SLATE_LIGHT,
        fontFace: "Arial",
      });
    });

    // Callout at bottom
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8,
      y: 5.25,
      w: 11.7,
      h: 1.45,
      fill: { color: "083344" },
      line: { color: C_TEAL, width: 1 },
      rectRadius: 0.1,
    });

    slide.addText("LE CHAÎNON MANQUANT FERMÉ PAR WAVICA", {
      x: 1.0,
      y: 5.4,
      w: 11.3,
      h: 0.25,
      fontSize: 10,
      bold: true,
      color: C_TEAL_LIGHT,
      fontFace: "Arial",
    });

    slide.addText(
      "Données Biométriques → Compréhension Individuelle → Micro-Intervention Ciblée → Évaluation d'Impact → Personnalisation Continue (N-of-1)",
      {
        x: 1.0,
        y: 5.75,
        w: 11.3,
        h: 0.5,
        fontSize: 13,
        bold: true,
        color: C_WHITE,
        fontFace: "Arial",
      }
    );
  }

  // -------------------------------------------------------------
  // SLIDE 4: SOLUTION - ACTIVE INTERVENTION LAYER
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    addHeaderAndFooter(slide, "Solution WAVICA 2.0", "L'Active Intervention Layer", "Un assistant d'apprentissage adaptatif en boucle fermée fondé sur la réaction biologique réelle", 4);

    const solutionSteps = [
      {
        title: "1. Ingestion Non-Invasive",
        desc: "Connexion directe aux API Oura Ring, Apple HealthKit et Garmin pour capter la baseline physiologique individuelle (moyennes glissantes 7 à 28 jours).",
      },
      {
        title: "2. Détection d'Écart de Dynamique",
        desc: "Identification précoce des dérives physiologiques propres à l'individu sans dramatisation ni vocabulaire anxiogène de diagnostic médical.",
      },
      {
        title: "3. Micro-Interventions Ciblées",
        desc: "Sélection instantanée parmi 5 formats : audio adaptatif, respirations guidées, micro-mouvements, réinitialisation cognitive ou repos profond NSDR.",
      },
      {
        title: "4. Modèle N-of-1 Évolutif",
        desc: "Chaque session alimente le modèle de réponse individuelle (Personal Recovery Response Model) pour affiner la pertinence des futures recommandations.",
      },
    ];

    solutionSteps.forEach((s, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const xPos = 0.8 + col * 5.95;
      const yPos = 1.8 + row * 2.2;

      slide.addShape(pres.ShapeType.roundRect, {
        x: xPos,
        y: yPos,
        w: 5.75,
        h: 2.05,
        fill: { color: C_CARD },
        line: { color: C_CARD_BORDER, width: 1 },
        rectRadius: 0.1,
      });

      slide.addText(s.title, {
        x: xPos + 0.25,
        y: yPos + 0.2,
        w: 5.25,
        h: 0.35,
        fontSize: 12,
        bold: true,
        color: C_TEAL_LIGHT,
        fontFace: "Arial",
      });

      slide.addText(s.desc, {
        x: xPos + 0.25,
        y: yPos + 0.6,
        w: 5.25,
        h: 1.3,
        fontSize: 10,
        color: C_SLATE_LIGHT,
        fontFace: "Arial",
      });
    });

    slide.addText(
      "Philosophie centrale : WAVICA ne juge pas, ne compare pas à une moyenne abstraite et apprend ce qui fonctionne spécifiquement pour chaque individu.",
      {
        x: 0.8,
        y: 6.4,
        w: 11.7,
        h: 0.35,
        fontSize: 10,
        italic: true,
        color: C_SLATE_MUTED,
        fontFace: "Arial",
      }
    );
  }

  // -------------------------------------------------------------
  // SLIDE 5: AI & NEURO-GUIDE
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    addHeaderAndFooter(slide, "Technologie & IA", "WAVICA Neuro-Guide & Moteur IA N-of-1", "Une architecture hybride unissant analyse physiologique, contexte subjectif et IA empathique", 5);

    const tableRows = [
      [
        { text: "Dimension Analysée", options: { bold: true, fill: { color: "1E293B" }, color: C_WHITE } },
        { text: "Paramètres Traités par l'Algorithme", options: { bold: true, fill: { color: "1E293B" }, color: C_WHITE } },
        { text: "Valeur Ajoutée WAVICA", options: { bold: true, fill: { color: "1E293B" }, color: C_WHITE } },
      ],
      [
        { text: "Sommeil & Rythmes", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "Durée, régularité, architecture des phases (REM/Profond)" },
        { text: "Détection d'écart par rapport à l'historique personnel" },
      ],
      [
        { text: "Biométrie Cardiaque", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "HRV (VRC), fréquence au repos, tendances de récupération" },
        { text: "Indicateur non-invasif de charge allostatique" },
      ],
      [
        { text: "Activité & Charge", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "Pas quotidiens, charge d'entraînement, micro-mouvements" },
        { text: "Corrélation entre dépense d'énergie et besoin de repos" },
      ],
      [
        { text: "Contexte Utilisateur", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "Charge de travail, déplacements, décalage horaire, notes" },
        { text: "Interprétation contextuelle de la baisse de vitalité" },
      ],
      [
        { text: "Historique de Réaction", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "Taux de complétion, feedback subjectif, recheck à J+3" },
        { text: "Apprentissage continu des formats d'intervention les plus efficaces" },
      ],
    ];

    slide.addTable(tableRows, {
      x: 0.8,
      y: 1.8,
      w: 11.7,
      colW: [2.5, 4.6, 4.6],
      border: { color: C_CARD_BORDER, pt: 1 },
      fill: { color: C_CARD },
      color: C_SLATE_LIGHT,
      fontSize: 9.5,
      rowH: 0.45,
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8,
      y: 5.15,
      w: 11.7,
      h: 1.55,
      fill: { color: "083344" },
      line: { color: C_TEAL, width: 1 },
      rectRadius: 0.1,
    });

    slide.addText("DIFFÉRENCIATEUR CLÉ DE L'INTELLIGENCE ARTIFICIELLE WAVICA", {
      x: 1.0,
      y: 5.3,
      w: 11.3,
      h: 0.25,
      fontSize: 10,
      bold: true,
      color: C_TEAL_LIGHT,
      fontFace: "Arial",
    });

    slide.addText(
      "Contrairement aux modèles LLM génériques qui hallucinent des diagnostics médicaux, le Neuro-Guide combine des règles déterministes physiologiques et une IA explicable. Il ne promet pas de traitement médical mais guide vers des micro-actions sécurisées et mesure scientifiquement leur pertinence.",
      {
        x: 1.0,
        y: 5.6,
        w: 11.3,
        h: 0.9,
        fontSize: 10,
        color: C_WHITE,
        fontFace: "Arial",
      }
    );
  }

  // -------------------------------------------------------------
  // SLIDE 6: SCIENTIFIC FOUNDATION & 5 PILLARS (THAYER FOCUS)
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    addHeaderAndFooter(slide, "Fondements Scientifiques", "Les 5 Piliers Scientifiques & Régulation Neuroviscérale", "Une assise neuro-physiologique rigoureuse unissant cortex préfrontal, nerf vague et biométrie VRC", 6);

    // Pillar 1: Polyvagal
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8,
      y: 1.7,
      w: 3.7,
      h: 2.1,
      fill: { color: C_CARD },
      line: { color: C_CARD_BORDER, width: 1 },
      rectRadius: 0.1,
    });
    slide.addText("1. Théorie Polyvagale (Porges)", {
      x: 0.95,
      y: 1.85,
      w: 3.4,
      h: 0.3,
      fontSize: 10.5,
      bold: true,
      color: C_TEAL_LIGHT,
      fontFace: "Arial",
    });
    slide.addText("Stimulation sélective du complexe vagal ventral par des plages de fréquences et timbres spécifiques pour activer la branche parasympathique et désamorcer le surmenage sympathique.", {
      x: 0.95,
      y: 2.2,
      w: 3.4,
      h: 1.45,
      fontSize: 9,
      color: C_SLATE_LIGHT,
      fontFace: "Arial",
    });

    // Pillar 2: Allostatic load
    slide.addShape(pres.ShapeType.roundRect, {
      x: 4.8,
      y: 1.7,
      w: 3.7,
      h: 2.1,
      fill: { color: C_CARD },
      line: { color: C_CARD_BORDER, width: 1 },
      rectRadius: 0.1,
    });
    slide.addText("2. Charge Allostatique (McEwen)", {
      x: 4.95,
      y: 1.85,
      w: 3.4,
      h: 0.3,
      fontSize: 10.5,
      bold: true,
      color: C_TEAL_LIGHT,
      fontFace: "Arial",
    });
    slide.addText("Mesure du coût biologique cumulatif du stress chronique ; la dérive de la baseline VRC (HRV) permet d'identifier l'usure physiologique avant l'apparition de l'épuisement ou du surmenage.", {
      x: 4.95,
      y: 2.2,
      w: 3.4,
      h: 1.45,
      fontSize: 9,
      color: C_SLATE_LIGHT,
      fontFace: "Arial",
    });

    // Pillar 4: Brainwave & 432 Hz
    slide.addShape(pres.ShapeType.roundRect, {
      x: 8.8,
      y: 1.7,
      w: 3.7,
      h: 2.1,
      fill: { color: C_CARD },
      line: { color: C_CARD_BORDER, width: 1 },
      rectRadius: 0.1,
    });
    slide.addText("4. Ondes Cérébrales & 432 Hz", {
      x: 8.95,
      y: 1.85,
      w: 3.4,
      h: 0.3,
      fontSize: 10.5,
      bold: true,
      color: C_TEAL_LIGHT,
      fontFace: "Arial",
    });
    slide.addText("Synchronisation des oscillations neuronales (Alpha 8-12 Hz, Thêta 4-7 Hz) par battements isochrones et fréquences harmoniques pour stabiliser la cohérence corticale et la récupération profonde.", {
      x: 8.95,
      y: 2.2,
      w: 3.4,
      h: 1.45,
      fontSize: 9,
      color: C_SLATE_LIGHT,
      fontFace: "Arial",
    });

    // MASTER HIGHLIGHT: PILLAR 3 - NEUROVISCERAL INTEGRATION (THAYER)
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8,
      y: 4.0,
      w: 11.7,
      h: 2.15,
      fill: { color: "0B1D45" },
      line: { color: C_TEAL, width: 2 },
      rectRadius: 0.12,
    });
    slide.addText("3. MODÈLE D'INTÉGRATION NEUROVISCÉRALE (DR. JULIAN THAYER) — PILIER MAÎTRE", {
      x: 1.05,
      y: 4.15,
      w: 11.2,
      h: 0.35,
      fontSize: 12,
      bold: true,
      color: C_WHITE,
      fontFace: "Arial",
    });
    slide.addText(
      "Le cortex préfrontal et le système nerveux autonome sont intimement interconnectés via le nerf vague au sein du Central Autonomic Network (CAN) ; la variabilité de la fréquence cardiaque (HRV / VRC) reflète directement cette connexion et la stimulation acoustique module ce circuit.\n\n" +
      "Apport capital au projet WAVICA : Cette théorie relie directement la VRC à la régulation par le nerf vague et démontre scientifiquement pourquoi la VRC est le biomarqueur maître de la dynamique d'adaptation individuelle. Les protocoles acoustiques WAVICA agissent sur ce pont neuroviscéral pour restaurer le frein vagal.",
      {
        x: 1.05,
        y: 4.55,
        w: 11.2,
        h: 1.45,
        fontSize: 9.5,
        color: C_SLATE_LIGHT,
        fontFace: "Arial",
      }
    );

    // Pillar 5: N-of-1
    slide.addText(
      "5. Méthodologie N-of-1 : Chaque individu est son propre groupe témoin comparé à ses moyennes glissantes (7 à 28 jours), éliminant les biais de population standardisée.",
      {
        x: 0.8,
        y: 6.35,
        w: 11.7,
        h: 0.45,
        fontSize: 9,
        color: C_TEAL_LIGHT,
        fontFace: "Arial",
      }
    );
  }

  // -------------------------------------------------------------
  // SLIDE 7: APPLICATION DASHBOARDS (3 INTERFACES)
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    addHeaderAndFooter(slide, "Expérience Produit", "Interfaces de l'Application : 3 Dashboards Opérationnels", "Une ergonomie moderne unissant télémétrie biométrique N-of-1, intervention active et supervision B2B2C", 7);

    const dashboards = [
      {
        title: "1. Cockpit Biométrique N-of-1",
        subtitle: "Télémétrie Personnelle Temps Réel",
        color: C_TEAL,
        points: [
          "VRC (HRV) instantanée (64 ms, +18% vs baseline)",
          "Index Tonus Vagal Thayer : 88/100 (Frein vagal actif)",
          "Charge Allostatique McEwen : 1.8 / 5.0 (Zone saine)",
          "Moyenne glissante 28 jours & détection de dérive",
        ],
      },
      {
        title: "2. Lecteur Neuro-Acoustique",
        subtitle: "Intervention Sonore Active 24-bit",
        color: C_BLUE,
        points: [
          "Onde sonore animée synchronisée aux fréquences cibles",
          "Protocoles : 432 Hz, Battements Alpha 10 Hz, Thêta 6 Hz",
          "Biofeedback en direct (+14 ms VRC observée)",
          "Format micro-intervention rapide : 3, 5 ou 8 minutes",
        ],
      },
      {
        title: "3. Console B2B2C Partenaires",
        subtitle: "Déploiement Clubs VIP Monaco & RH",
        color: C_EMERALD,
        points: [
          "Supervision de cohorte anonymisée (28 membres VIP)",
          "Taux de complétion des sessions : 94,8 %",
          "14 alertes de fatigue chronique évitées en amont",
          "Rapports d'impact & fidélisation membres haut de gamme",
        ],
      },
    ];

    dashboards.forEach((d, idx) => {
      const xPos = 0.8 + idx * 4.0;
      slide.addShape(pres.ShapeType.roundRect, {
        x: xPos,
        y: 1.8,
        w: 3.75,
        h: 4.4,
        fill: { color: C_CARD },
        line: { color: d.color, width: 1.5 },
        rectRadius: 0.12,
      });

      slide.addText(d.title, {
        x: xPos + 0.2,
        y: 2.0,
        w: 3.35,
        h: 0.35,
        fontSize: 12,
        bold: true,
        color: C_WHITE,
        fontFace: "Arial",
      });

      slide.addText(d.subtitle, {
        x: xPos + 0.2,
        y: 2.35,
        w: 3.35,
        h: 0.25,
        fontSize: 9.5,
        color: C_TEAL_LIGHT,
        fontFace: "Arial",
      });

      slide.addText(
        d.points.map((p) => `• ${p}`).join("\n\n"),
        {
          x: xPos + 0.2,
          y: 2.75,
          w: 3.35,
          h: 3.2,
          fontSize: 9.5,
          color: C_SLATE_LIGHT,
          fontFace: "Arial",
        }
      );
    });

    slide.addText(
      "Démonstrateur Actif : Les 3 dashboards sont modélisés et navigables en direct dans la plateforme web interactive WAVICA 2.0.",
      {
        x: 0.8,
        y: 6.35,
        w: 11.7,
        h: 0.45,
        fontSize: 9.5,
        color: C_TEAL,
        fontFace: "Arial",
      }
    );
  }

  // -------------------------------------------------------------
  // SLIDE 7: EXISTING ASSETS & MVP
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    addHeaderAndFooter(slide, "Actifs Existants & Traction", "Une Avance Opérationnelle : MVP v1.0 Développé", "Le projet ne part pas d'une page blanche : l'infrastructure technique et le contenu sont déjà en place", 8);

    const assetRows = [
      [
        { text: "Composant Technique", options: { bold: true, fill: { color: "1E293B" }, color: C_WHITE } },
        { text: "Spécification & Réalisation", options: { bold: true, fill: { color: "1E293B" }, color: C_WHITE } },
        { text: "Statut Actuel", options: { bold: true, fill: { color: "1E293B" }, color: C_WHITE } },
      ],
      [
        { text: "Data Ingestion Engine", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "Intégration Oura API et Apple HealthKit fonctionnelle" },
        { text: "Opérationnel (v1.0)", options: { bold: true, color: C_EMERALD } },
      ],
      [
        { text: "Personal Baseline Engine", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "Calcul des moyennes mobiles physiologiques 7 à 28 jours" },
        { text: "Opérationnel (v1.0)", options: { bold: true, color: C_EMERALD } },
      ],
      [
        { text: "Catalogue Audio Exclusif", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "Bibliothèque de paysages sonores avec musiciens partenaires" },
        { text: "Finalisé (Actif Propriétaire)", options: { bold: true, color: C_EMERALD } },
      ],
      [
        { text: "Module Neuro-Guide", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "Scénarios déterministes d'orientation et feedback 1-clic" },
        { text: "En test utilisateur", options: { bold: true, color: C_AMBER } },
      ],
      [
        { text: "Privacy & RGPD Layer", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "Traitement Edge AI local, minimisation selon doctrine CNIL" },
        { text: "Conforme Privacy-by-Design", options: { bold: true, color: C_EMERALD } },
      ],
      [
        { text: "Partenariat Pilote Monaco", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "Accords de principe avec un club de sport premium pour VIPs" },
        { text: "LOI en cours de signature", options: { bold: true, color: C_AMBER } },
      ],
    ];

    slide.addTable(assetRows, {
      x: 0.8,
      y: 1.8,
      w: 11.7,
      colW: [2.6, 5.8, 3.3],
      border: { color: C_CARD_BORDER, pt: 1 },
      fill: { color: C_CARD },
      color: C_SLATE_LIGHT,
      fontSize: 9.5,
      rowH: 0.45,
    });

    const mvpKpis = [
      { label: "INTÉGRATIONS WEARABLES", value: "Apple & Oura", detail: "Flux biométrique temps réel" },
      { label: "BIBLIOTHÈQUE PROPRIÉTAIRE", value: "40+ Heures", detail: "Compositions neuro-acoustiques" },
      { label: "CONFORMITÉ CNIL / RGPD", value: "100 %", detail: "Données de bien-être hébergées UE" },
    ];

    mvpKpis.forEach((m, idx) => {
      const xPos = 0.8 + idx * 4.0;
      slide.addShape(pres.ShapeType.roundRect, {
        x: xPos,
        y: 5.3,
        w: 3.7,
        h: 1.3,
        fill: { color: "083344" },
        line: { color: C_TEAL, width: 1 },
        rectRadius: 0.1,
      });

      slide.addText(m.label, {
        x: xPos + 0.2,
        y: 5.4,
        w: 3.3,
        h: 0.2,
        fontSize: 8.5,
        color: C_SLATE_MUTED,
        fontFace: "Arial",
      });

      slide.addText(m.value, {
        x: xPos + 0.2,
        y: 5.65,
        w: 3.3,
        h: 0.4,
        fontSize: 16,
        bold: true,
        color: C_WHITE,
        fontFace: "Arial",
      });

      slide.addText(m.detail, {
        x: xPos + 0.2,
        y: 6.1,
        w: 3.3,
        h: 0.25,
        fontSize: 8.5,
        color: C_TEAL_LIGHT,
        fontFace: "Arial",
      });
    });
  }

  // -------------------------------------------------------------
  // SLIDE 8: PILOTE MONACO & B2B2C
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    addHeaderAndFooter(slide, "Validation Terrain", "Pilote B2B2C Monaco & Hub French Riviera", "Démarrage auprès d'une clientèle VIP ultra-exigeante pour valider l'engagement et les métriques d'usage", 9);

    const pilotPoints = [
      {
        title: "Cohorte de Test Ciblée",
        desc: "25 à 30 membres actifs de clubs de fitness de prestige à Monaco et sur la Côte d'Azur, déjà équipés d'Apple Watch ou d'Oura Ring.",
      },
      {
        title: "Protocole Expérimental de 6 Semaines",
        desc: "Mesure du taux de complétion des sessions, de l'utilité perçue (1-5), de la rétention à J+28 et de la volonté de souscription payante (WTP).",
      },
      {
        title: "Synergie B2B2C Gagnant-Gagnant",
        desc: "Le club offre à ses membres VIP un service d'hyper-personnalisation technologique exclusif, augmentant la fidélisation et générant un revenu récurrent partagé.",
      },
      {
        title: "Préparation du Déploiement France & Europe",
        desc: "Les retours d'expérience du pilote permettront d'affiner l'UX et d'appuyer les dossiers de subvention Bpifrance et EIC Accelerator.",
      },
    ];

    pilotPoints.forEach((p, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const xPos = 0.8 + col * 5.95;
      const yPos = 1.8 + row * 2.2;

      slide.addShape(pres.ShapeType.roundRect, {
        x: xPos,
        y: yPos,
        w: 5.75,
        h: 2.05,
        fill: { color: C_CARD },
        line: { color: C_CARD_BORDER, width: 1 },
        rectRadius: 0.1,
      });

      slide.addText(`Phase 0${idx + 1} · ${p.title}`, {
        x: xPos + 0.25,
        y: yPos + 0.2,
        w: 5.25,
        h: 0.35,
        fontSize: 11,
        bold: true,
        color: C_TEAL_LIGHT,
        fontFace: "Arial",
      });

      slide.addText(p.desc, {
        x: xPos + 0.25,
        y: yPos + 0.6,
        w: 5.25,
        h: 1.3,
        fontSize: 9.5,
        color: C_SLATE_LIGHT,
        fontFace: "Arial",
      });
    });

    slide.addText(
      "Objectif clé du pilote : Valider la faisabilité d'usage et la rétention réelle avant d'engager les investissements massifs d'acquisition commerciale.",
      {
        x: 0.8,
        y: 6.35,
        w: 11.7,
        h: 0.35,
        fontSize: 9.5,
        italic: true,
        color: C_SLATE_MUTED,
        fontFace: "Arial",
      }
    );
  }

  // -------------------------------------------------------------
  // SLIDE 9: MARKET OPPORTUNITY & COMPETITION
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    addHeaderAndFooter(slide, "Marché & Concurrence", "Opportunité de Marché & Matrice Concurrentielle", "Au carrefour de la santé mentale digitale, des wearables et du bien-être en entreprise", 10);

    const compRows = [
      [
        { text: "Acteur / Segment", options: { bold: true, fill: { color: "1E293B" }, color: C_WHITE } },
        { text: "Faiblesse Constatée", options: { bold: true, fill: { color: "1E293B" }, color: C_WHITE } },
        { text: "Avantage Décisif WAVICA", options: { bold: true, fill: { color: "1E293B" }, color: C_WHITE } },
      ],
      [
        { text: "Calm, Headspace", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "Contenu statique, absence d'écoute biométrique, fort taux d'attrition" },
        { text: "Adaptation dynamique basée sur les signaux physiologiques en temps réel" },
      ],
      [
        { text: "Oura, Whoop, Apple", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "Mesurent et notent mais n'offrent aucune action guidée immédiate" },
        { text: "Active Intervention Layer : transformation immédiate du score en action" },
      ],
      [
        { text: "Bilan Médical Annuel", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "Rare, anxiogène, statique et très onéreux" },
        { text: "Micro-ajustements quotidiens continus sans étiquette pathologique" },
      ],
      [
        { text: "Strava, Peloton", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "Focalisés uniquement sur l'effort, la dépense et la performance" },
        { text: "Spécialisation exclusive sur la phase critique de récupération nerveuse" },
      ],
    ];

    slide.addTable(compRows, {
      x: 0.8,
      y: 1.8,
      w: 11.7,
      colW: [2.5, 4.6, 4.6],
      border: { color: C_CARD_BORDER, pt: 1 },
      fill: { color: C_CARD },
      color: C_SLATE_LIGHT,
      fontSize: 9.5,
      rowH: 0.55,
    });

    const marketKpis = [
      { label: "TAM GLOBAL 2030", value: "500 Mds $", detail: "Wearables ($186B) + Mental ($44B) + Corporate ($313B)" },
      { label: "SAM EUROPÉEN", value: "24 Mds $", detail: "Utilisateurs connectés & bien-être premium" },
      { label: "SOM (5 ANS)", value: "85 M €", detail: "Objectif de pénétration France & DACH" },
    ];

    marketKpis.forEach((m, idx) => {
      const xPos = 0.8 + idx * 4.0;
      slide.addShape(pres.ShapeType.roundRect, {
        x: xPos,
        y: 5.15,
        w: 3.7,
        h: 1.35,
        fill: { color: "083344" },
        line: { color: C_TEAL, width: 1 },
        rectRadius: 0.1,
      });

      slide.addText(m.label, {
        x: xPos + 0.2,
        y: 5.25,
        w: 3.3,
        h: 0.2,
        fontSize: 8.5,
        color: C_SLATE_MUTED,
        fontFace: "Arial",
      });

      slide.addText(m.value, {
        x: xPos + 0.2,
        y: 5.5,
        w: 3.3,
        h: 0.4,
        fontSize: 17,
        bold: true,
        color: C_WHITE,
        fontFace: "Arial",
      });

      slide.addText(m.detail, {
        x: xPos + 0.2,
        y: 5.95,
        w: 3.3,
        h: 0.45,
        fontSize: 8.5,
        color: C_TEAL_LIGHT,
        fontFace: "Arial",
      });
    });
  }

  // -------------------------------------------------------------
  // SLIDE 10: BUSINESS MODEL & MONETIZATION
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    addHeaderAndFooter(slide, "Modèle Économique", "Architecture de Monétisation Hybride", "Diversification des revenus garantissant une croissance rapide et une haute rentabilité", 11);

    const priceRows = [
      [
        { text: "Segment", options: { bold: true, fill: { color: "1E293B" }, color: C_WHITE } },
        { text: "Offre & Périmètre", options: { bold: true, fill: { color: "1E293B" }, color: C_WHITE } },
        { text: "Tarification Cible", options: { bold: true, fill: { color: "1E293B" }, color: C_WHITE } },
        { text: "Marge Brute", options: { bold: true, fill: { color: "1E293B" }, color: C_WHITE } },
      ],
      [
        { text: "B2C Freemium", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "Analyse de base de la baseline, 3 pratiques acoustiques" },
        { text: "0 € (Acquisition)" },
        { text: "Entonnoir" },
      ],
      [
        { text: "B2C Premium", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "Fonctionnalités complètes, toutes les pratiques, Recovery Map" },
        { text: "9,99 € / mois (ou 89 € / an)" },
        { text: "88 %", options: { bold: true, color: C_EMERALD } },
      ],
      [
        { text: "B2C Pro Performance", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "Analyses avancées sommeil/effort, personnalisation poussée" },
        { text: "14,99 € / mois" },
        { text: "90 %", options: { bold: true, color: C_EMERALD } },
      ],
      [
        { text: "B2B2C Fitness Clubs", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "Licence club en marque blanche, dashboards d'engagement VIP" },
        { text: "299 € / mois par club" },
        { text: "92 %", options: { bold: true, color: C_EMERALD } },
      ],
      [
        { text: "B2B Corporate Wellness", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "Programmes de prévention de l'épuisement professionnel" },
        { text: "5 à 10 € / collaborateur / mois" },
        { text: "85 %", options: { bold: true, color: C_EMERALD } },
      ],
    ];

    slide.addTable(priceRows, {
      x: 0.8,
      y: 1.8,
      w: 11.7,
      colW: [2.5, 4.6, 2.8, 1.8],
      border: { color: C_CARD_BORDER, pt: 1 },
      fill: { color: C_CARD },
      color: C_SLATE_LIGHT,
      fontSize: 9.5,
      rowH: 0.5,
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8,
      y: 5.3,
      w: 11.7,
      h: 1.3,
      fill: { color: "083344" },
      line: { color: C_TEAL, width: 1 },
      rectRadius: 0.1,
    });

    slide.addText("EFFICIENCE DU MODÈLE ÉCONOMIQUE", {
      x: 1.0,
      y: 5.45,
      w: 11.3,
      h: 0.25,
      fontSize: 10,
      bold: true,
      color: C_TEAL_LIGHT,
      fontFace: "Arial",
    });

    slide.addText(
      "Grâce à des coûts marginaux quasi-nuls de diffusion audio et d'inférence Edge AI, la marge brute dépasse 85% dès la deuxième année d'exploitation, permettant un autofinancement rapide sans dilution excessive des fondateurs.",
      {
        x: 1.0,
        y: 5.75,
        w: 11.3,
        h: 0.65,
        fontSize: 10.5,
        color: C_WHITE,
        fontFace: "Arial",
      }
    );
  }

  // -------------------------------------------------------------
  // SLIDE 11: 5-YEAR FINANCIAL PLAN (P&L)
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    addHeaderAndFooter(slide, "Plan Financier & Rentabilité", "Modèle Financier Prévisionnel (2026 – 2030)", "Une trajectoire de croissance maîtrisée menant à un chiffre d'affaires de 9,38 M€ en Année 5", 12);

    const plRows = [
      [
        { text: "Agrégat Financier (k€)", options: { bold: true, fill: { color: "1E293B" }, color: C_WHITE } },
        { text: "2026 (Pilote)", options: { bold: true, fill: { color: "1E293B" }, color: C_WHITE } },
        { text: "2027 (France)", options: { bold: true, fill: { color: "1E293B" }, color: C_WHITE } },
        { text: "2028 (Pivot UE)", options: { bold: true, fill: { color: "1E293B" }, color: C_WHITE } },
        { text: "2029 (Échelle)", options: { bold: true, fill: { color: "1E293B" }, color: C_WHITE } },
        { text: "2030 (Maturité)", options: { bold: true, fill: { color: "1E293B" }, color: C_WHITE } },
      ],
      [
        { text: "CA B2C Abonnements" },
        { text: "4,8" },
        { text: "131,8" },
        { text: "647,0" },
        { text: "2 014,0" },
        { text: "4 676,0" },
      ],
      [
        { text: "CA B2B2C Clubs VIP" },
        { text: "3,6" },
        { text: "64,5" },
        { text: "233,0" },
        { text: "574,0" },
        { text: "1 220,0" },
      ],
      [
        { text: "CA B2B Corporate" },
        { text: "0,0" },
        { text: "72,0" },
        { text: "390,0" },
        { text: "1 320,0" },
        { text: "3 480,0" },
      ],
      [
        { text: "CHIFFRE D'AFFAIRES TOTAL", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "8,4", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "268,3", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "1 270,0", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "3 908,0", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "9 376,0", options: { bold: true, color: C_TEAL_LIGHT } },
      ],
      [
        { text: "Coûts Directs (COGS)" },
        { text: "-1,8" },
        { text: "-37,5" },
        { text: "-152,0" },
        { text: "-430,0" },
        { text: "-985,0" },
      ],
      [
        { text: "Marge Brute (%)" },
        { text: "78,5 %" },
        { text: "86,0 %" },
        { text: "88,0 %" },
        { text: "89,0 %" },
        { text: "89,5 %" },
      ],
      [
        { text: "Total OpEx (R&D, Sales, Admin)" },
        { text: "-105,0" },
        { text: "-278,0" },
        { text: "-645,0" },
        { text: "-1 640,0" },
        { text: "-3 420,0" },
      ],
      [
        { text: "EBITDA", options: { bold: true, color: C_WHITE } },
        { text: "-98,4", options: { color: C_ROSE } },
        { text: "-47,2", options: { color: C_ROSE } },
        { text: "+473,0", options: { bold: true, color: C_EMERALD } },
        { text: "+1 838,0", options: { bold: true, color: C_EMERALD } },
        { text: "+4 971,0", options: { bold: true, color: C_EMERALD } },
      ],
      [
        { text: "RÉSULTAT NET", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "-98,4", options: { color: C_ROSE } },
        { text: "-47,2", options: { color: C_ROSE } },
        { text: "+355,0", options: { bold: true, color: C_EMERALD } },
        { text: "+1 378,0", options: { bold: true, color: C_EMERALD } },
        { text: "+3 728,0", options: { bold: true, color: C_EMERALD } },
      ],
      [
        { text: "Effectif Salarié en France (ETP)", options: { bold: true, color: "A5B4FC" } },
        { text: "3" },
        { text: "5" },
        { text: "9" },
        { text: "16" },
        { text: "27" },
      ],
    ];

    slide.addTable(plRows, {
      x: 0.8,
      y: 1.8,
      w: 11.7,
      colW: [3.2, 1.7, 1.7, 1.7, 1.7, 1.7],
      border: { color: C_CARD_BORDER, pt: 1 },
      fill: { color: C_CARD },
      color: C_SLATE_LIGHT,
      fontSize: 8.5,
      rowH: 0.35,
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8,
      y: 5.85,
      w: 11.7,
      h: 0.95,
      fill: { color: "083344" },
      line: { color: C_TEAL, width: 1 },
      rectRadius: 0.1,
    });

    slide.addText(
      "SEUIL DE RENTABILITÉ (BREAK-EVEN) : Atteint au cours du 2ème trimestre 2028 (Mois 18 post-financement Seed). Autofinancement intégral de la croissance à partir de 2029 avec une marge d'EBITDA cible de 53% en Année 5.",
      {
        x: 1.0,
        y: 5.95,
        w: 11.3,
        h: 0.75,
        fontSize: 9.5,
        color: C_WHITE,
        fontFace: "Arial",
      }
    );
  }

  // -------------------------------------------------------------
  // SLIDE 12: UNIT ECONOMICS & ROI
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    addHeaderAndFooter(slide, "Indicateurs d'Efficacité", "Unit Economics & Retour sur Investissement (ROI)", "Des ratios d'acquisition et de fidélisation parmi les meilleurs standards du SaaS santé", 13);

    const unitKpis = [
      {
        label: "COÛT D'ACQUISITION (CAC)",
        value: "18 €",
        benchmark: "Benchmark Marché : 35-50 €",
        desc: "Optimisé via le canal prescripteur des clubs de fitness.",
      },
      {
        label: "VALEUR VIE CLIENT (LTV)",
        value: "380 €",
        benchmark: "Rétention moyenne : 38 mois",
        desc: "Basé sur 9,99 €/mois et un taux de churn de 3,5%.",
      },
      {
        label: "RATIO LTV / CAC",
        value: "21,1x",
        benchmark: "Standard Excellence VC : > 3,0x",
        desc: "Rentabilité unitaire remarquable et effet de levier élevé.",
      },
      {
        label: "DÉLAI DE RÉCUPÉRATION",
        value: "1,8 Mois",
        benchmark: "Standard SaaS : < 12 mois",
        desc: "Le coût d'acquisition est amorti en moins de 2 mois.",
      },
    ];

    unitKpis.forEach((u, idx) => {
      const xPos = 0.8 + idx * 3.0;
      slide.addShape(pres.ShapeType.roundRect, {
        x: xPos,
        y: 1.8,
        w: 2.8,
        h: 2.2,
        fill: { color: idx === 2 ? "083344" : C_CARD },
        line: { color: idx === 2 ? C_TEAL : C_CARD_BORDER, width: 1 },
        rectRadius: 0.1,
      });

      slide.addText(u.label, {
        x: xPos + 0.15,
        y: 1.95,
        w: 2.5,
        h: 0.25,
        fontSize: 8,
        color: C_SLATE_MUTED,
        fontFace: "Arial",
      });

      slide.addText(u.value, {
        x: xPos + 0.15,
        y: 2.25,
        w: 2.5,
        h: 0.45,
        fontSize: 22,
        bold: true,
        color: idx === 2 ? C_TEAL_LIGHT : C_WHITE,
        fontFace: "Arial",
      });

      slide.addText(u.benchmark, {
        x: xPos + 0.15,
        y: 2.75,
        w: 2.5,
        h: 0.25,
        fontSize: 8,
        color: C_AMBER,
        fontFace: "Arial",
      });

      slide.addText(u.desc, {
        x: xPos + 0.15,
        y: 3.05,
        w: 2.5,
        h: 0.85,
        fontSize: 8.5,
        color: C_SLATE_LIGHT,
        fontFace: "Arial",
      });
    });

    const bulletPoints = [
      {
        title: "Taux de Conversion Freemium → Premium de 5,5%",
        desc: "Soutenu par la démonstration tangible de l'efficacité dès la première semaine d'analyse comparative de la baseline.",
      },
      {
        title: "Taux d'Attrition Mensuel (Churn) Contenu à 3,5%",
        desc: "L'effet de renforcement comportemental et l'accumulation de la baseline rendent l'application plus personnalisée et indispensable chaque mois.",
      },
      {
        title: "Effet de Levier B2B2C",
        desc: "L'acquisition de clubs partenaires permet d'embarquer des centaines de membres VIP qualifiés avec un coût d'acquisition direct proche de zéro.",
      },
    ];

    bulletPoints.forEach((b, idx) => {
      const xPos = 0.8 + idx * 4.0;
      slide.addShape(pres.ShapeType.roundRect, {
        x: xPos,
        y: 4.25,
        w: 3.75,
        h: 2.2,
        fill: { color: C_CARD },
        line: { color: C_CARD_BORDER, width: 1 },
        rectRadius: 0.1,
      });

      slide.addText(b.title, {
        x: xPos + 0.2,
        y: 4.4,
        w: 3.35,
        h: 0.45,
        fontSize: 11,
        bold: true,
        color: C_TEAL_LIGHT,
        fontFace: "Arial",
      });

      slide.addText(b.desc, {
        x: xPos + 0.2,
        y: 4.95,
        w: 3.35,
        h: 1.35,
        fontSize: 9.5,
        color: C_SLATE_LIGHT,
        fontFace: "Arial",
      });
    });
  }

  // -------------------------------------------------------------
  // SLIDE 13: STRATEGIC ROADMAP (2026-2028)
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    addHeaderAndFooter(slide, "Feuille de Route", "Calendrier Stratégique & Jalons Opérationnels (2026–2028)", "Un plan d'exécution clair jalonné par des preuves de concept techniques et commerciales", 14);

    const roadmapSteps = [
      {
        period: "Q4 2026",
        title: "Consolidation & Implantation France",
        desc: "Finalisation du MVP v1.0, constitution de la SASU en France (Nice / Sophia Antipolis), signature des accords de principe et lancement du pilote terrain à Monaco.",
      },
      {
        period: "Q1-Q2 2027",
        title: "Validation Commerciale & Bpifrance",
        desc: "Dépôt du dossier Bourse French Tech (30 k€) et Prêt d'Amorçage Bpifrance. Déploiement auprès de 15 clubs sur l'axe Nice-Cannes-Monaco. MRR supérieur à 15 000 €.",
      },
      {
        period: "Q3-Q4 2027",
        title: "Préparation Seed & Expansion Nationale",
        desc: "Candidature au concours d'innovation européen EIC Accelerator. Extension à 40 clubs en Île-de-France et Auvergne-Rhône-Alpes. Dépassement des 2 000 abonnés payants.",
      },
      {
        period: "2028",
        title: "Scale Européen & Partenariats Académiques",
        desc: "Partenariats de recherche avec les universités régionales (Université Côte d'Azur / INRIA). Lancement sur les marchés allemand et suisse. Atteinte de la rentabilité (Break-Even).",
      },
    ];

    roadmapSteps.forEach((r, idx) => {
      const xPos = 0.8 + idx * 3.0;
      slide.addShape(pres.ShapeType.roundRect, {
        x: xPos,
        y: 1.8,
        w: 2.8,
        h: 4.8,
        fill: { color: C_CARD },
        line: { color: C_CARD_BORDER, width: 1 },
        rectRadius: 0.1,
      });

      slide.addText(r.period, {
        x: xPos + 0.2,
        y: 2.0,
        w: 2.4,
        h: 0.3,
        fontSize: 14,
        bold: true,
        color: C_TEAL,
        fontFace: "Arial",
      });

      slide.addText(r.title, {
        x: xPos + 0.2,
        y: 2.4,
        w: 2.4,
        h: 0.6,
        fontSize: 11,
        bold: true,
        color: C_WHITE,
        fontFace: "Arial",
      });

      slide.addText(r.desc, {
        x: xPos + 0.2,
        y: 3.1,
        w: 2.4,
        h: 3.2,
        fontSize: 9.5,
        color: C_SLATE_LIGHT,
        fontFace: "Arial",
      });
    });
  }

  // -------------------------------------------------------------
  // SLIDE 14: FUNDING ASK & USE OF FUNDS
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    addHeaderAndFooter(slide, "Levée de Fonds", "Tour de Table Seed : 600 000 €", "Accélérer l'acquisition commerciale et structurer l'équipe de R&D en France", 15);

    const fundingRows = [
      [
        { text: "Poste d'Investissement", options: { bold: true, fill: { color: "1E293B" }, color: C_WHITE } },
        { text: "Montant Alloué", options: { bold: true, fill: { color: "1E293B" }, color: C_WHITE } },
        { text: "Objectif Clé", options: { bold: true, fill: { color: "1E293B" }, color: C_WHITE } },
      ],
      [
        { text: "R&D & Ingénierie IA", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "240 000 € (40 %)" },
        { text: "Recrutement de 2 ingénieurs IA & traitement du signal à Sophia Antipolis" },
      ],
      [
        { text: "Go-to-Market & Sales B2B2C", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "180 000 € (30 %)" },
        { text: "Déploiement commercial auprès des 50 premiers clubs de sport premium en France" },
      ],
      [
        { text: "Création & Licences Sonores", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "90 000 € (15 %)" },
        { text: "Extension du catalogue audio propriétaire avec des compositeurs acoustiques" },
      ],
      [
        { text: "Conformité Juridique & Brevets", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "50 000 € (8 %)" },
        { text: "Protection de la propriété intellectuelle N-of-1 et audits CNIL/RGPD" },
      ],
      [
        { text: "Trésorerie de Réserve", options: { bold: true, color: C_TEAL_LIGHT } },
        { text: "40 000 € (7 %)" },
        { text: "Fonds de roulement opérationnel de sécurité" },
      ],
    ];

    slide.addTable(fundingRows, {
      x: 0.8,
      y: 1.8,
      w: 11.7,
      colW: [2.8, 2.5, 6.4],
      border: { color: C_CARD_BORDER, pt: 1 },
      fill: { color: C_CARD },
      color: C_SLATE_LIGHT,
      fontSize: 9.5,
      rowH: 0.5,
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8,
      y: 5.15,
      w: 11.7,
      h: 1.5,
      fill: { color: "083344" },
      line: { color: C_TEAL, width: 1 },
      rectRadius: 0.1,
    });

    slide.addText("EFFET DE LEVIER NON-DILUTIF FRANÇAIS", {
      x: 1.0,
      y: 5.3,
      w: 11.3,
      h: 0.25,
      fontSize: 10,
      bold: true,
      color: C_TEAL_LIGHT,
      fontFace: "Arial",
    });

    slide.addText(
      "Chaque euro investi en equity déclenche jusqu'à 0,50 € de subventions et d'avances remboursables Bpifrance (Bourse French Tech de 30 k€, Prêt d'Amorçage Investissement de 250 k€ et Crédit d'Impôt Recherche CIR), portant les capacités réelles de déploiement à 850 000 €.",
      {
        x: 1.0,
        y: 5.6,
        w: 11.3,
        h: 0.85,
        fontSize: 10,
        color: C_WHITE,
        fontFace: "Arial",
      }
    );
  }

  // -------------------------------------------------------------
  // SLIDE 15: FRENCH TALENT VISA (PASSEPORT TALENT) JUSTIFICATION
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    addHeaderAndFooter(slide, "Dossier Passeport Talent", "Conformité & Intérêt Économique pour la France", "Justification des critères d'éligibilité au Passeport Talent (Porteur de projet innovant / Création d'entreprise)", 16);

    const visaCriteria = [
      {
        title: "1. Caractère Économique & Réel de l'Entreprise",
        desc: "Création d'une structure commerciale immatriculée au RCS en France (SASU), avec investissement personnel, preuve de viabilité financière et autonomie financière complète dès le mois 18.",
      },
      {
        title: "2. Caractère Hautement Innovant (Critères French Tech)",
        desc: "Innovation de rupture sur l'Active Intervention Layer et le modèle N-of-1 d'IA prédictive, éligible aux dispositifs de soutien public (Bpifrance, CIR, statut Jeune Entreprise Innovante).",
      },
      {
        title: "3. Création Directe d'Emplois Qualifiés en France",
        desc: "Plan de recrutement prévoyant 5 salariés en 2027, 9 salariés en 2028 et 27 salariés à horizon 2030 (Data Scientists, Développeurs Mobile, Acousticiens, Développeurs Commerciaux).",
      },
      {
        title: "4. Ancrage Territorial & Rayonnement Régional",
        desc: "Implantation stratégique au sein du cluster technologique de la Côte d'Azur (Sophia Antipolis / Nice Métropole), en synergie directe avec le marché de la principauté de Monaco et les laboratoires de neurosciences.",
      },
    ];

    visaCriteria.forEach((v, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const xPos = 0.8 + col * 5.95;
      const yPos = 1.8 + row * 2.2;

      slide.addShape(pres.ShapeType.roundRect, {
        x: xPos,
        y: yPos,
        w: 5.75,
        h: 2.05,
        fill: { color: C_CARD },
        line: { color: C_CARD_BORDER, width: 1 },
        rectRadius: 0.1,
      });

      slide.addText(v.title, {
        x: xPos + 0.25,
        y: yPos + 0.2,
        w: 5.25,
        h: 0.35,
        fontSize: 11,
        bold: true,
        color: C_TEAL_LIGHT,
        fontFace: "Arial",
      });

      slide.addText(v.desc, {
        x: xPos + 0.25,
        y: yPos + 0.6,
        w: 5.25,
        h: 1.3,
        fontSize: 9.5,
        color: C_SLATE_LIGHT,
        fontFace: "Arial",
      });
    });

    slide.addText(
      "Engagement du Fondateur : Présence continue sur le territoire national pour piloter l'exécution de la roadmap, recruter l'équipe locale et développer les partenariats institutionnels et académiques français.",
      {
        x: 0.8,
        y: 6.35,
        w: 11.7,
        h: 0.35,
        fontSize: 9.5,
        italic: true,
        color: C_SLATE_MUTED,
        fontFace: "Arial",
      }
    );
  }

  // Trigger file download in browser
  await pres.writeFile({ fileName: "WAVICA_2.0_Presentation_Business_Plan.pptx" });
}
