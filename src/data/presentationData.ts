export interface SlideData {
  id: string;
  slideNumber: number;
  category: string;
  title: string;
  subtitle: string;
  badge?: string;
  heroImage?: string;
  bulletPoints?: { title: string; desc: string }[];
  metrics?: { label: string; value: string; detail: string }[];
  tableData?: { headers: string[]; rows: (string | number)[][] };
  talentVisaContext?: string;
  callout?: { title: string; content: string };
}

export const SLIDES: SlideData[] = [
  {
    id: "cover",
    slideNumber: 1,
    category: "Vision & Identité",
    title: "WAVICA 2.0",
    subtitle: "Active Intervention Layer pour Wearables, Récupération Neuro-Acoustique & Dynamique Physiologique N-of-1",
    badge: "YOUR HEALTH • YOUR FUTURE",
    heroImage: "/src/assets/images/wavica_wearable_neuro_device_1790197479506.jpg",
    callout: {
      title: "Statut Exécutif du Projet · Septembre 2026",
      content: "MVP opérationnel v1.0 développé · 40h de catalogue neuro-acoustique propriétaire · Pilote Monaco actif · Enregistrement SASU en France (Écosystème French Tech Côte d'Azur)."
    },
    metrics: [
      { label: "Stade", value: "MVP Testé", detail: "Oura & Apple Health intégrés" },
      { label: "Modèle", value: "B2C / B2B2C", detail: "Abonnement + Partenariats Clubs" },
      { label: "Tour de Table", value: "600 000 €", detail: "Levée Seed + Levier Bpifrance" }
    ],
    talentVisaContext: "Dossier présenté dans le cadre du Passeport Talent (Création d'entreprise innovante / French Tech) auprès de la Préfecture des Alpes-Maritimes et de la DREETS."
  },
  {
    id: "executive-summary",
    slideNumber: 2,
    category: "Résumé Exécutif",
    title: "Synthèse Stratégique & Thèse d'Investissement",
    subtitle: "Transformer les données biométriques passives en actions concrètes de régénération nerveuse",
    bulletPoints: [
      {
        title: "La Rupture Active (Active Intervention Layer)",
        desc: "WAVICA ne concurrence pas les montres connectées (Apple Watch, Oura, Garmin, Withings). Elle s'intègre au-dessus d'elles pour combler le vide critique entre la mesure d'une anomalie et l'action de récupération personnalisée."
      },
      {
        title: "Intelligence Personnalisée N-of-1",
        desc: "Fini les conseils génériques basés sur des moyennes statistiques. WAVICA apprend la physiologie, la psychologie et la réactivité propre à chaque individu via une boucle fermée d'apprentissage."
      },
      {
        title: "Positionnement Non-Médical & Vélocité Réglementaire",
        desc: "Classé comme produit numérique de bien-être (données de bien-être CNIL/RGPD). Pas d'obstacle HDS ni d'autorisation ANSM, permettant un time-to-market immédiat tout en conservant une validation neuro-scientifique rigoureuse."
      },
      {
        title: "Implantation Stratégique en France",
        desc: "Création d'une SASU innovante sur la Côte d'Azur (Sophia Antipolis / Nice), éligible Bourse French Tech Bpifrance, CIR et statut Jeune Entreprise Innovante (JEI), avec déploiement pilote à Monaco."
      }
    ],
    metrics: [
      { label: "Marché Total (TAM)", value: "500 Mds $", detail: "Santé digitale & Wearables 2030" },
      { label: "Marge Brute Cible", value: "88 %", detail: "Modèle SaaS logiciel & audio" },
      { label: "Break-Even", value: "Mois 18", detail: "Rentabilité atteinte dès 2028" }
    ]
  },
  {
    id: "market-problem",
    slideNumber: 3,
    category: "Problématique de Marché",
    title: "Le Paradoxe du Monitoring Passif",
    subtitle: "Les utilisateurs ont accès à une abondance de données, mais restent démunis face à l'action",
    bulletPoints: [
      {
        title: "L'impasse des scores bruts",
        desc: "Les wearables actuels mesurent avec précision le sommeil, la VRC (HRV), le rythme cardiaque au repos et la température. Pourtant, lorsque l'utilisateur constate une baisse de son score de récupération, aucune solution personnalisée ne lui est proposée."
      },
      {
        title: "Les questions sans réponse de l'utilisateur",
        desc: "Qu'est-ce qui a changé par rapport à mon état habituel ? Est-ce une fluctuation isolée ou un schéma répétitif ? Que puis-je faire aujourd'hui en 5 minutes avec peu d'énergie ? Comment savoir si cette action a réellement fonctionné sur moi ?"
      },
      {
        title: "La fatigue des applications de méditation classiques",
        desc: "Les applications traditionnelles (Calm, Headspace) proposent des catalogues statiques et impersonnels. Elles ignorent tout du contexte biologique réel de l'utilisateur et souffrent d'une perte d'engagement rapide (churn élevé)."
      }
    ],
    callout: {
      title: "Le Chaînon Manquant identifié par WAVICA",
      content: "Données biométriques → Compréhension individuelle → Micro-intervention ciblée → Vérification d'impact → Personnalisation continue."
    }
  },
  {
    id: "solution-overview",
    slideNumber: 4,
    category: "Solution WAVICA 2.0",
    title: "L'Active Intervention Layer",
    subtitle: "Un assistant d'apprentissage adaptatif en boucle fermée fondé sur la réaction biologique réelle",
    heroImage: "/src/assets/images/wavica_soundscape_recovery_1790197491070.jpg",
    bulletPoints: [
      {
        title: "Mesure non invasive & intégration transparente",
        desc: "Connexion directe aux API Oura, Apple HealthKit et Garmin pour capter en temps réel la baseline individuelle (moyennes glissantes 7 à 28 jours)."
      },
      {
        title: "Détection des anomalies de dynamique",
        desc: "Identification précoce des dérives physiologiques propres à l'individu sans dramatisation ni vocabulaire anxiogène de diagnostic médical."
      },
      {
        title: "Micro-interventions adaptées au contexte",
        desc: "Sélection instantanée de protocoles neuro-acoustiques, respiratoires (cohérence cardiaque), physiques ou de repos profond (NSDR / Yoga Nidra)."
      },
      {
        title: "Modèle N-of-1 évolutif",
        desc: "Chaque session alimente le modèle de réponse individuelle (Personal Recovery Response Model) pour affiner continuellement les recommandations futures."
      }
    ]
  },
  {
    id: "ai-neuro-guide",
    slideNumber: 5,
    category: "Technologie & IA",
    title: "WAVICA Neuro-Guide & Moteur IA N-of-1",
    subtitle: "Une architecture hybride unissant analyse physiologique, contexte subjectif et IA empathique",
    tableData: {
      headers: ["Dimension Analysée", "Paramètres Traités par l'Algorithme", "Valeur Ajoutée WAVICA"],
      rows: [
        ["Sommeil & Rythmes", "Durée, régularité, architecture des phases (REM/Profond)", "Détection d'écart par rapport à l'historique personnel"],
        ["Biométrie Cardiaque", "HRV (VRC), Fréquence de repos, tendances de récupération", "Indicateur non-invasif de charge allostatique"],
        ["Activité & Charge", "Pas, charge d'entraînement, micro-mouvements", "Corrélation entre dépense d'énergie et besoin de repos"],
        ["Contexte Utilisateur", "Charge de travail, déplacements, décalage horaire, notes", "Interprétation contextuelle de la baisse de vitalité"],
        ["Historique de Réaction", "Taux de complétion, feedback subjectif, recheck à J+3", "Apprentissage continu des formats d'intervention les plus efficaces"]
      ]
    },
    callout: {
      title: "Différenciateur Clé IA",
      content: "Contrairement aux IA génériques de type chatbot médical, le Neuro-Guide n'invente rien : il s'appuie sur une logique déterministe explicable complétée par un modèle d'inférence empathique guidant l'utilisateur vers une action immédiate."
    }
  },
  {
    id: "acoustic-science",
    slideNumber: 6,
    category: "Fondements Scientifiques",
    title: "Les 5 Piliers Scientifiques & Régulation Neuroviscérale",
    subtitle: "Une assise neuro-physiologique rigoureuse unissant cortex préfrontal, nerf vague et biométrie VRC",
    bulletPoints: [
      {
        title: "1. Théorie Polyvagale (Dr. Stephen Porges)",
        desc: "Stimulation ciblée du complexe vagal ventral par des plages de fréquences et timbres spécifiques pour activer la branche parasympathique et désamorcer le surmenage sympathique (fuite / combat)."
      },
      {
        title: "2. Modèle de la Charge Allostatique (Dr. Bruce McEwen)",
        desc: "Mesure du coût biologique cumulatif du stress chronique ; identification prédictive de la dérive de la baseline physiologique avant l'épuisement ou le burn-out."
      },
      {
        title: "3. Modèle d'Intégration Neuroviscérale (Dr. Julian Thayer) — PILIER MAÎTRE",
        desc: "Le cortex préfrontal et le système nerveux autonome sont intimement interconnectés via le nerf vague ; la variabilité de la fréquence cardiaque (HRV / VRC) reflète directement cette connexion et la stimulation acoustique module ce circuit. Apport capital au projet : relie la VRC à la régulation par le nerf vague et démontre pourquoi la VRC est le biomarqueur maître de la dynamique d'adaptation."
      },
      {
        title: "4. Entraînement Cérébral & Bio-Acoustique Résonante",
        desc: "Synchronisation des ondes cérébrales (Alpha 8-12 Hz, Thêta 4-7 Hz) par battements isochrones et fréquences harmoniques (432 Hz) pour stabiliser le calme attentionnel et la régénération profonde."
      },
      {
        title: "5. Méthodologie N-of-1 (Single-Subject Experimental Design)",
        desc: "Chaque individu est son propre groupe témoin comparé à ses moyennes glissantes (7 à 28 jours), fermant la boucle de rétroaction et éliminant les erreurs des normes de population standardisées."
      }
    ],
    callout: {
      title: "Conséquence pour le Projet WAVICA",
      content: "L'Intégration Neuroviscérale de Thayer prouve que la régulation vagale mesurée par la VRC est un levier direct sur les fonctions cognitives préfrontales. La stimulation acoustique WAVICA agit directement sur ce pont neuroviscéral."
    }
  },
  {
    id: "app-dashboards-slide",
    slideNumber: 7,
    category: "Expérience Produit",
    title: "Interfaces de l'Application : 3 Dashboards Opérationnels",
    subtitle: "Une ergonomie fluide alliant télémétrie biométrique temps réel, intervention active et supervision B2B2C",
    bulletPoints: [
      {
        title: "Dashboard 1 · Cockpit Biométrique Individuel N-of-1",
        desc: "Visualisation instantanée de la VRC (RMSSD), du Tonus Vagal (Index Thayer), de la charge allostatique et de la courbe longitudinale sur 28 jours avec détection précoce d'anomalies."
      },
      {
        title: "Dashboard 2 · Lecteur d'Intervention Neuro-Acoustique Active",
        desc: "Lecteur spatial audio 24-bit avec onde sonore animée aux couleurs du logo, sélecteur de protocoles (432 Hz, Alpha 10 Hz, NSDR Thêta) et affichage du biofeedback en temps réel (+14 ms VRC mesurée)."
      },
      {
        title: "Dashboard 3 · Console B2B2C Clubs VIP & Entreprises (Pilote Monaco)",
        desc: "Supervision agrégée et anonymisée pour les directeurs de clubs sportifs et directeurs RH : 28 membres VIP suivis, 94,8% de taux de complétion et 14 alertes de surmenage évitées."
      }
    ],
    callout: {
      title: "Démonstrateur Actif",
      content: "Accessible directement via l'onglet 'Dashboards de l'App' dans la barre de navigation pour tester en direct le lecteur sonore, le circuit neuroviscéral et la console Monaco."
    }
  },
  {
    id: "mvp-assets",
    slideNumber: 8,
    category: "Actifs Existants & Traction",
    title: "Une Avance Opérationnelle : MVP v1.0 Développé",
    subtitle: "Le projet ne part pas d'une page blanche : l'infrastructure technique et le contenu sont déjà en place",
    tableData: {
      headers: ["Composant Technique", "Spécification & Réalisation", "Statut Actuel"],
      rows: [
        ["Data Ingestion Engine", "Intégration Oura API et Apple HealthKit fonctionnelle", "Opérationnel (v1.0)"],
        ["Personal Baseline Engine", "Calcul des moyennes mobiles physiologiques 7 à 28 jours", "Opérationnel (v1.0)"],
        ["Catalogue Audio Exclusif", "Bibliothèque de paysages sonores avec musiciens partenaires", "Finalisé (40h d'actifs propriétaires)"],
        ["Module Neuro-Guide", "Scénarios déterministes d'orientation et feedback 1-clic", "En test utilisateur"],
        ["Privacy & RGPD Layer", "Traitement Edge AI local, minimisation selon doctrine CNIL", "Conforme Privacy-by-Design"],
        ["Partenariat Pilote Monaco", "Accords de principe avec un club de sport premium pour VIPs", "Lettre d'intention (LOI) en cours"]
      ]
    },
    metrics: [
      { label: "Intégrations", value: "2 Majeures", detail: "Apple Health + Oura Ring" },
      { label: "Bibliothèque", value: "40+ Heures", detail: "Compositions neuro-acoustiques" },
      { label: "RGPD / CNIL", value: "100% Conforme", detail: "Données de bien-être hébergées UE" }
    ]
  },
  {
    id: "pilot-monaco",
    slideNumber: 9,
    category: "Validation Terrain",
    title: "Pilote B2B2C Monaco & Hub French Riviera",
    subtitle: "Démarrage auprès d'une clientèle VIP ultra-exigeante pour valider l'engagement et les métriques d'usage",
    heroImage: "/src/assets/images/wavica_executive_monaco_fitness_1790197500822.jpg",
    bulletPoints: [
      {
        title: "Cohorte de Test Ciblée",
        desc: "25 à 30 membres actifs de clubs de fitness de prestige à Monaco et sur la Côte d'Azur, déjà équipés d'Apple Watch ou d'Oura Ring."
      },
      {
        title: "Protocole Expérimental de 6 Semaines",
        desc: "Mesure du taux de complétion des sessions, de l'utilité perçue (1-5), de la rétention à J+28 et de la volonté de souscription payante (WTP - Willingness to Pay)."
      },
      {
        title: "Synergie B2B2C Gagnant-Gagnant",
        desc: "Le club offre à ses membres VIP un service d'hyper-personnalisation technologique exclusif, augmentant la fidélisation et générant un revenu récurrent partagé."
      },
      {
        title: "Préparation du Déploiement France & Europe",
        desc: "Les retours d'expérience du pilote permettront d'affiner l'UX et d'appuyer les dossiers de subvention Bpifrance et EIC Accelerator."
      }
    ]
  },
  {
    id: "market-opportunity",
    slideNumber: 10,
    category: "Marché & Concurrence",
    title: "Opportunité de Marché & Matrice Concurrentielle",
    subtitle: "Au carrefour de la santé mentale digitale, des wearables et du bien-être en entreprise",
    tableData: {
      headers: ["Acteur / Segment", "Faiblesse Constatée", "Avantage Décisif WAVICA"],
      rows: [
        ["Calm, Headspace", "Contenu statique, absence d'écoute biométrique, fort taux d'attrition", "Adaptation dynamique basée sur les signaux physiologiques en temps réel"],
        ["Oura, Whoop, Apple", "Mesurent et notent mais n'offrent aucune action guidée immédiate", "Active Intervention Layer : transformation immédiate du score en action"],
        ["Bilan Médical Annuel", "Rare, anxiogène, statique et très onéreux", "Micro-ajustements quotidiens continus sans étiquette pathologique"],
        ["Strava, Peloton", "Focalisés uniquement sur l'effort, la dépense et la performance", "Spécialisation exclusive sur la phase critique de récupération nerveuse"]
      ]
    },
    metrics: [
      { label: "TAM Global 2030", value: "500 Mds $", detail: "Wearables ($186B) + Mental ($44B) + Corporate ($313B)" },
      { label: "SAM Européen", value: "24 Mds $", detail: "Utilisateurs connectés & bien-être premium" },
      { label: "SOM (5 ans)", value: "85 M €", detail: "Objectif de pénétration France & DACH" }
    ]
  },
  {
    id: "business-model",
    slideNumber: 11,
    category: "Modèle Économique",
    title: "Architecture de Monétisation Hybride",
    subtitle: "Diversification des revenus garantissant une croissance rapide et une haute rentabilité",
    tableData: {
      headers: ["Segment", "Offre & Périmètre", "Tarification Cible", "Marge Nette Estimée"],
      rows: [
        ["B2C Freemium", "Analyse de base de la baseline, 3 pratiques acoustiques", "Gratuit (Acquisition)", "Entonnoir de conversion"],
        ["B2C Premium", "Fonctionnalités complètes, toutes les pratiques, Recovery Map", "9,99 € / mois ou 89 € / an", "88 % marge brute"],
        ["B2C Pro Performance", "Analyses avancées sommeil/effort, personnalisation poussée", "14,99 € / mois", "90 % marge brute"],
        ["B2B2C Fitness Clubs", "Licence club en marque blanche, dashboards d'engagement VIP", "299 € / mois par club", "92 % marge brute"],
        ["B2B Corporate Wellness", "Programmes de prévention de l'épuisement professionnel", "5 à 10 € / collaborateur / mois", "85 % marge brute"]
      ]
    },
    callout: {
      title: "Efficience du Modèle Économique",
      content: "Grâce à des coûts marginaux quasi-nuls de diffusion audio et d'inférence Edge AI, la marge brute dépasse 85% dès la deuxième année d'exploitation."
    }
  },
  {
    id: "financial-projections",
    slideNumber: 12,
    category: "Plan Financier & Rentabilité",
    title: "Modèle Financier Prévisionnel (2026 – 2030)",
    subtitle: "Une trajectoire de croissance maîtrisée menant à un chiffre d'affaires de 9,38 M€ en Année 5",
    tableData: {
      headers: ["Agrégat Financier (en k€)", "2026 (Pilote)", "2027 (France)", "2028 (Pivot UE)", "2029 (Échelle)", "2030 (Maturation)"],
      rows: [
        ["Chiffre d'Affaires B2C", "4,8 k€", "131,8 k€", "647,0 k€", "2 014 k€", "4 676 k€"],
        ["Chiffre d'Affaires B2B2C / Clubs", "3,6 k€", "64,5 k€", "233,0 k€", "574 k€", "1 220 k€"],
        ["Chiffre d'Affaires B2B Corporate", "0 k€", "72,0 k€", "390,0 k€", "1 320 k€", "3 480 k€"],
        ["Total Chiffre d'Affaires", "8,4 k€", "268,3 k€", "1 270,0 k€", "3 908 k€", "9 376 k€"],
        ["Coûts Directs (COGS)", "1,8 k€", "37,5 k€", "152,0 k€", "430 k€", "985 k€"],
        ["Marge Brute", "6,6 k€ (78%)", "230,8 k€ (86%)", "1 118,0 k€ (88%)", "3 478 k€ (89%)", "8 391 k€ (89,5%)"],
        ["Total Dépenses OpEx", "105 k€", "278 k€", "645 k€", "1 640 k€", "3 420 k€"],
        ["EBITDA", "-98,4 k€", "-47,2 k€", "+473,0 k€", "+1 838 k€", "+4 971 k€"],
        ["Résultat Net Comptable", "-98,4 k€", "-47,2 k€", "+355,0 k€", "+1 378 k€", "+3 728 k€"],
        ["Effectif Salarié (ETP)", "3", "5", "9", "16", "27"]
      ]
    },
    callout: {
      title: "Point Mort / Seuil de Rentabilité",
      content: "Atteint au cours du 2ème trimestre 2028 (Mois 18 post-financement Seed). Autofinancement intégral de la croissance à partir de 2029."
    }
  },
  {
    id: "unit-economics",
    slideNumber: 13,
    category: "Indicateurs d'Efficacité",
    title: "Unit Economics & Retour sur Investissement (ROI)",
    subtitle: "Des ratios d'acquisition et de fidélisation parmi les meilleurs standards du SaaS santé",
    metrics: [
      { label: "Coût d'Acquisition (CAC)", value: "18 €", detail: "Optimisé via bouche-à-oreille clubs" },
      { label: "Valeur Vie Client (LTV)", value: "380 €", detail: "Durée moyenne de rétention 38 mois" },
      { label: "Ratio LTV / CAC", value: "21,1x", detail: "Excellence financière (> 3x requis)" },
      { label: "Période de Payback", value: "1,8 Mois", detail: "Amortissement rapide du coût d'acquisition" }
    ],
    bulletPoints: [
      {
        title: "Taux de Conversion Freemium vers Premium de 5,5%",
        desc: "Soutenu par la démonstration tangible de l'efficacité dès la première semaine d'analyse comparative."
      },
      {
        title: "Taux d'Attrition Mensuel (Churn) contenu à 3,5%",
        desc: "L'effet de renforcement comportemental et l'accumulation de la baseline rendent l'application plus précieuse chaque mois."
      },
      {
        title: "Effet de Levier B2B2C",
        desc: "L'acquisition de clubs partenaires permet d'embarquer des centaines de membres qualifiés avec un CAC B2C quasi nul."
      }
    ]
  },
  {
    id: "roadmap",
    slideNumber: 14,
    category: "Feuille de Route",
    title: "Calendrier Stratégique & Jalons Opérationnels (2026–2028)",
    subtitle: "Un plan d'exécution clair jalonné par des preuves de concept techniques et commerciales",
    bulletPoints: [
      {
        title: "Q4 2026 · Consolidation & Implantation France",
        desc: "Finalisation du MVP v1.0, constitution de la SASU en France, signature des LOI et démarrage du pilote terrain à Monaco."
      },
      {
        title: "Q1-Q2 2027 · Validation Commerciale & Bpifrance",
        desc: "Dépôt du dossier Bourse French Tech (30 k€) et Prêt d'Amorçage Bpifrance. Déploiement auprès de 15 clubs sur l'axe Nice-Cannes-Monaco. MRR supérieur à 15 000 €."
      },
      {
        title: "Q3-Q4 2027 · Préparation Seed & Expansion Nationale",
        desc: "Candidature au concours d'innovation EIC Accelerator. Extension à 40 clubs en Île-de-France et Rhône-Alpes. Franchissement des 2 000 abonnés payants."
      },
      {
        title: "2028 · Scale Européen & Partenariats Académiques",
        desc: "Partenariats de recherche avec les universités régionales (ex: Université Côte d'Azur / INRIA). Lancement sur les marchés allemand et suisse."
      }
    ]
  },
  {
    id: "funding-ask",
    slideNumber: 15,
    category: "Levée de Fonds",
    title: "Tour de Table Seed : 600 000 €",
    subtitle: "Accélérer l'acquisition commerciale et structurer l'équipe de R&D en France",
    tableData: {
      headers: ["Poste d'Investissement", "Montant Alloué", "Objectif Clé"],
      rows: [
        ["R&D & Ingénierie IA", "240 000 € (40%)", "Recrutement de 2 ingénieurs IA & traitement du signal audio à Sophia Antipolis"],
        ["Go-to-Market & Sales B2B2C", "180 000 € (30%)", "Déploiement commercial auprès des 50 premiers clubs de sport premium en France"],
        ["Création & Licences Sonores", "90 000 € (15%)", "Extension du catalogue audio propriétaire avec des compositeurs acoustiques"],
        ["Conformité Juridique & Brevets", "50 000 € (8%)", "Protection de la propriété intellectuelle N-of-1 et audits CNIL/RGPD"],
        ["Trésorerie de Réserve", "40 000 € (7%)", "Fonds de roulement opérationnel"]
      ]
    },
    callout: {
      title: "Effet de Levier Non-Dilutif Français",
      content: "Chaque euro investi en equity déclenche jusqu'à 0,50 € de subventions et avances remboursables Bpifrance (Bourse French Tech, Prêt d'Amorçage Investissement)."
    }
  },
  {
    id: "talent-visa-justification",
    slideNumber: 16,
    category: "Dossier Passeport Talent",
    title: "Conformité & Intérêt Économique pour la France",
    subtitle: "Justification des critères d'éligibilité au Passeport Talent (Porteur de projet innovant / Création d'entreprise)",
    bulletPoints: [
      {
        title: "1. Caractère Économique & Réel de l'Entreprise",
        desc: "Création d'une structure commerciale immatriculée au RCS en France (SASU), avec investissement personnel, preuve de viabilité financière et autonomie financière complète dès le mois 18."
      },
      {
        title: "2. Caractère Hautement Innovant (Critères French Tech)",
        desc: "Innovation de rupture sur l'Active Intervention Layer et le modèle N-of-1 d'IA prédictive fondé sur l'intégration neuroviscérale de Thayer, éligible aux dispositifs de soutien public (Bpifrance, CIR, statut JEI)."
      },
      {
        title: "3. Création Directe d'Emplois Qualifiés en France",
        desc: "Plan de recrutement prévoyant 5 salariés en 2027, 9 salariés en 2028 et 27 salariés à horizon 2030 (Data Scientists, Développeurs Mobile, Acousticiens, Développeurs Commerciaux)."
      },
      {
        title: "4. Ancrage Territorial & Rayonnement Régional",
        desc: "Implantation stratégique au sein du cluster technologique de la Côte d'Azur (Sophia Antipolis / Nice Métropole), en synergie directe avec le marché de la principauté de Monaco et les laboratoires de neurosciences."
      }
    ],
    callout: {
      title: "Engagement du Fondateur",
      content: "Présence continue sur le territoire national pour piloter l'exécution de la roadmap, négocier les partenariats stratégiques et représenter la société auprès des investisseurs et institutions publiques."
    }
  }
];
