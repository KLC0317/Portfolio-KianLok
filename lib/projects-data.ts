export type Project = {
  slug: string;
  title: string;
  period: string;
  tagline: string;
  documentation?: string;
  tags: string[];
  color: "purple" | "cyan" | "pink";
  icon: string;
  image?: string;
  demo?: string;
  featured?: boolean;
  status?: "completed" | "in-progress" | "archived";
  team?: string[];
  awards?: string[];
  metrics?: {
    label: string;
    value: string;
    icon?: string;
  }[];
  github?: string;
  live?: string;
  bullets: string[];
  overview: string;
  pdf?: string;
  highlights: { label: string; value: string }[];
  sections: { heading: string; body: string }[];
};

export const projects: Project[] = [
  {
    slug: "zestix-ai",
    title: "Zestix AI Automation Platform",
    period: "Nov 2025 – Feb 2026",
    tagline: "Unified AI portal with real-time automation, RAG pipelines & SEO intelligence",
    tags: ["Next.js", "n8n", "PostgreSQL", "Vector DB", "Docker", "Redis", "Traefik"],
    color: "purple",
    icon: "⚡",
    image: "/images/projects/zestix-ai.png",
    featured: true,
    status: "completed",
    team: ["Solo Project"],
    metrics: [
      { label: "Workflows", value: "55+", icon: "⚙️" },
      { label: "Websites", value: "220+", icon: "🌐" },
      { label: "RAG Tiers", value: "3", icon: "🧠" },
      { label: "Infra", value: "Docker", icon: "🐳" },
    ],
    github: "https://github.com/KLC0317/ZestixRepo",
    live: "http://zestix.os.my/",
    bullets: [
      "Architected a unified AI portal with real-time WebSocket monitoring and Framer Motion UI.",
      "Engineered a 3-tier RAG pipeline using Supabase (pg-vector) for high-precision AI retrieval.",
      "Developed 55+ n8n workflows for SEO auditing and lead generation via Puppeteer.",
      "Integrated GA4 and Search Console APIs to automate reporting for 220+ websites.",
      "Orchestrated VPS deployment via Docker and Traefik with Redis-based rate limiting.",
    ],
    overview:
      "Zestix is a full-stack AI automation platform built to centralise SEO intelligence, lead generation, and AI-driven content workflows into a single, real-time portal. The system spans from data ingestion through intelligent retrieval to automated reporting across hundreds of client websites.",
    highlights: [
      { label: "Workflows", value: "15+" },
      { label: "Websites Covered", value: "220+" },
      { label: "RAG Tiers", value: "3" },
      { label: "Infra", value: "Docker / VPS" },
    ],
    sections: [
      {
        heading: "Architecture",
        body: "The platform is built on a Next.js frontend communicating with a Node.js API layer. WebSocket channels stream live workflow status to the dashboard. Data persistence is handled by PostgreSQL with the pg-vector extension powering the RAG layer.",
      },
      {
        heading: "RAG Pipeline",
        body: "A 3-tier retrieval-augmented generation pipeline ingests content from crawled pages, embeds it with OpenAI embeddings, and stores vectors in Supabase. Queries go through a re-ranking pass before hitting the LLM, significantly improving answer precision.",
      },
      {
        heading: "Automation & SEO",
        body: "n8n orchestrates 15+ headless-browser workflows built on Puppeteer. Each workflow can run on a cron schedule or be triggered via webhook, auditing on-page signals, extracting leads, and posting structured results back to the portal database.",
      },
      {
        heading: "Deployment",
        body: "All services are containerised with Docker Compose and fronted by Traefik for SSL termination and path-based routing. Redis enforces per-tenant rate limits and acts as a pub/sub bus for WebSocket events.",
      },
    ],
  },
  {
    slug: "safe-vision",
    title: "Safe Vision",
    period: "Dec 2025 – Feb 2026",
    tagline: "Real-time multimodal threat detection for safer educational environments",
    tags: ["PyTorch", "TensorFlow", "Flutter", "YOLO", "Gemini AI", "Firestore", "YAMNet"],
    color: "cyan",
    icon: "🛡️",
    image: "/images/projects/safe-vision.png",
    documentation: "https://docs.google.com/presentation/d/1kk_uwH6Yrc8ojHjuKNQy5W04jItbqqTPk1c87PdtuCs/edit?slide=id.g28c0408aca4_0_1#slide=id.g28c0408aca4_0_1",
    featured: true,
    status: "completed",
    team: ["Solo Project"],
    awards: ["SDG 4 Impact Project"],
    metrics: [
      { label: "Audio Classes", value: "521", icon: "🔊" },
      { label: "Detection", value: "YOLO26n-pose", icon: "👁️" },
      { label: "Fusion", value: "Gemini AI", icon: "🤖" },
      { label: "SDG Target", value: "SDG 4 & 16", icon: "🎯" },
    ],
    github: "https://github.com/KLC0317/Kitahack2026-Main",
    bullets: [
      "Built real-time threat detection integrating pose estimation (YOLO) and audio classification (YAMNet, 521 classes).",
      "Designed a SmartFusion engine using Google Gemini to analyze multimodal streams, reducing false positives.",
      "Built a Flutter mobile interface visualizing live threats on a 2D Digital Twin map via Firestore.",
      "Executed full project lifecycle from AI deployment to mobile release, targeting SDG 4 (Education Safety).",
    ],
    overview:
      "Safe Vision is an AI-powered safety monitoring system designed to protect students and staff in educational facilities. It fuses computer-vision and audio-analysis models in real time, surfacing genuine threats while suppressing false alarms through a Gemini-powered fusion engine.",
    highlights: [
      { label: "Audio Classes", value: "521" },
      { label: "Detection Model", value: "YOLO126n-pose" },
      { label: "Fusion Engine", value: "Gemini AI" },
      { label: "SDG Target", value: "SDG 4" },
    ],
    sections: [
      {
        heading: "Threat Detection",
        body: "YOLO26 runs pose estimation on each camera feed, identifying aggressive stances, falls, and crowd anomalies. In parallel, YAMNet classifies audio streams across 521 event categories including screams, glass breaks, and gunshots.",
      },
      {
        heading: "SmartFusion Engine",
        body: "Raw signals from vision and audio models are fed into a Google Gemini multimodal prompt. Gemini correlates temporal and spatial context to adjudicate whether an event constitutes a real threat, drastically cutting false-positive rates.",
      },
      {
        heading: "Digital Twin Interface",
        body: "A Flutter mobile app renders a live 2D floor-plan of the campus. Threat events written to Firestore appear as animated overlays on the correct room in near real-time, giving security personnel immediate situational awareness.",
      },
      {
        heading: "Impact & Mission",
        body: "The system was built with UN Sustainable Development Goal 4 and 16in mind—ensuring inclusive and equitable quality education by making learning environments safer. It was designed to be deployable on commodity hardware without cloud inference costs for video streams.",
      },
    ],
  },
  {
    slug: "brand-intelligence",
    title: "Brand Intelligence & Forecasting",
    period: "Aug 2025 – Sept 2025",
    tagline: "End-to-end YouTube analytics with NLP clustering and ensemble trend forecasting",
    tags: ["SBERT", "FAISS", "LSTM", "Prophet", "ARIMA", "SHAP", "TF-IDF"],
    color: "pink",
    icon: "📊",
    image: "/images/projects/brand-intelligence.png",
    documentation: "https://docs.google.com/presentation/d/16BtnxQfK5b1rXfbzj3VbhAU4gMUSvPno/edit?slide=id.p1#slide=id.p1",
    featured: false,
    status: "completed",
    team: ["Solo Project"],
    metrics: [
      { label: "Embedding", value: "SBERT", icon: "🔤" },
      { label: "Vector Index", value: "FAISS", icon: "📐" },
      { label: "Models", value: "3 Ensemble", icon: "📈" },
      { label: "Explainability", value: "SHAP", icon: "💡" },
    ],
    github: "https://github.com/KLC0317/TrendAI",
    bullets: [
      "Built an end-to-end analytics system using SBERT-based NLP to extract and embed YouTube metadata.",
      "Applied FAISS clustering and TF-IDF analysis to segment content by topic and sentiment.",
      "Developed an ensemble forecasting pipeline (Prophet, LSTM, ARIMA) to predict engagement trends.",
      "Performed SHAP-based model interpretability for transparent insights and competitive analysis.",
    ],
    overview:
      "Brand Intelligence is a data-science pipeline that ingests YouTube channel metadata, clusters it semantically, and forecasts future engagement using an ensemble of statistical and deep-learning models. SHAP explainability makes every prediction auditable for brand strategists.",
    highlights: [
      { label: "Embedding Model", value: "SBERT" },
      { label: "Vector Index", value: "FAISS" },
      { label: "Forecast Models", value: "3-Model Ensemble" },
      { label: "Explainability", value: "SHAP" },
    ],
    sections: [
      {
        heading: "Data Ingestion & Embedding",
        body: "The YouTube Data API v3 feeds video titles, descriptions, tags, and engagement metrics into a processing pipeline. SBERT converts textual fields into dense 768-dimensional embeddings that capture semantic meaning beyond keyword matching.",
      },
      {
        heading: "Clustering & Segmentation",
        body: "FAISS performs approximate nearest-neighbour search to group videos into topic clusters. TF-IDF extracts the most discriminative keywords per cluster, and VADER sentiment scoring annotates each group, revealing which content themes resonate positively.",
      },
      {
        heading: "Ensemble Forecasting",
        body: "Three complementary models—Facebook Prophet for seasonality, an LSTM for non-linear temporal patterns, and ARIMA for stationarity—generate independent 30-day engagement forecasts. Their outputs are blended via a weighted average tuned on validation data.",
      },
      {
        heading: "Explainability",
        body: "SHAP TreeExplainer values are computed for the gradient-boosted meta-learner, producing waterfall charts that reveal which features (upload hour, cluster membership, sentiment score) drive each prediction, making the system actionable for non-technical brand managers.",
      },
    ],
  },
  {
    slug: "nutritrack",
    title: "NutriTrack",
    period: "Mar 2025 – Jul 2025",
    tagline: "LLM-powered clinical nutrition app for personalised patient dietary management",
    tags: ["Kotlin", "MVVM", "LLM APIs", "Android", "Room DB", "Jetpack Compose"],
    color: "purple",
    icon: "🥗",
    image: "/images/projects/nutritrack.png",
    featured: false,
    status: "completed",
    team: ["Solo Project"],
    metrics: [
      { label: "Platform", value: "Android", icon: "📱" },
      { label: "Architecture", value: "MVVM", icon: "🏗️" },
      { label: "AI Layer", value: "LLM API", icon: "🤖" },
      { label: "Local DB", value: "Room", icon: "💾" },
    ],
    github: "https://github.com/",
    bullets: [
      "Developed a comprehensive diet and nutrition app for clinics to monitor patient dietary data.",
      "Integrated an LLM-based assistant to provide personalized nutritional guidance per food intake.",
      "Implemented admin tools for clinic staff to access and manage patient information efficiently.",
    ],
    overview:
      "NutriTrack is an Android application bridging the gap between clinical dietitians and their patients. Patients log meals and receive instant LLM-generated nutritional feedback, while clinic staff gain a structured dashboard to review intake history, flag deficiencies, and adjust care plans.",
    highlights: [
      { label: "Platform", value: "Android" },
      { label: "Architecture", value: "MVVM + Clean" },
      { label: "AI Layer", value: "LLM API" },
      { label: "Local DB", value: "Room" },
    ],
    sections: [
      {
        heading: "Patient Experience",
        body: "Patients use a Jetpack Compose UI to log meals via text or barcode scan. Each entry is passed to an LLM prompt that returns macro breakdowns, micronutrient flags, and plain-language dietary advice tailored to the patient's clinical profile stored in Room DB.",
      },
      {
        heading: "Admin Dashboard",
        body: "Clinic staff access a role-gated section listing all patients with sortable intake summaries. Dietitians can annotate records, set caloric targets, and receive automated alerts when a patient falls below a configurable threshold for key nutrients.",
      },
      {
        heading: "Architecture",
        body: "The app follows Clean Architecture with an MVVM presentation layer. UseCases mediate between the ViewModel and Repository, keeping the LLM API calls isolated in a dedicated DataSource. All network requests are handled by Retrofit with coroutine-based concurrency.",
      },
    ],
  },
  {
    slug: "peleesenet",
    title: "PeleeSENet",
    period: "Nov 2024 – Feb 2025",
    pdf: "https://github.com/KLC0317/PeleSENet-ISR2024/blob/main/First%20manuscprit%20iSR.pdf",
    tagline: "Hybrid lightweight CNN with channel & spatial attention for skin-lesion classification",
    tags: ["PyTorch", "TensorFlow", "CNN", "Grad-CAM", "CBAM", "SE-Net", "PeleeNet"],
    color: "cyan",
    icon: "🧠",
    image: "/images/projects/peleesenet.png",
    featured: false,
    status: "completed",
    team: ["Solo Project"],
    metrics: [
      { label: "Parameters", value: "<3.5M", icon: "⚡" },
      { label: "Attention", value: "SE+CBAM", icon: "🎯" },
      { label: "Explainability", value: "Grad-CAM", icon: "🔍" },
      { label: "Task", value: "Lesion AI", icon: "🏥" },
    ],
    github: "https://github.com/",
    bullets: [
      "Designed a hybrid CNN merging PeleeNet dense connectivity with SE-Net channel attention.",
      "Integrated CBAM for sequential channel and spatial attention on lesion characteristics.",
      "Achieved high efficiency (<3.5M parameters) using 1×1 bottleneck layers and transition blocks.",
      "Deployed Grad-CAM for explainability and an adaptive learning loop for continuous improvement.",
    ],
    overview:
      "PeleeSENet is a novel lightweight convolutional architecture tailored for dermoscopic image classification. By fusing PeleeNet densely connected blocks with Squeeze-and-Excitation and CBAM attention, it achieves competitive accuracy at a fraction of the parameter count of standard medical imaging models.",
    highlights: [
      { label: "Parameters", value: "<3.5 M" },
      { label: "Attention", value: "SE + CBAM" },
      { label: "Explainability", value: "Grad-CAM" },
      { label: "Task", value: "Lesion Classification" },
    ],
    sections: [
      {
        heading: "Architecture Design",
        body: "The backbone inherits PeleeNet two-way dense blocks which reuse feature maps at multiple scales without the memory overhead of DenseNet. SE-Net squeeze-and-excitation heads are inserted after each dense block to recalibrate channel responses based on global context.",
      },
      {
        heading: "CBAM Integration",
        body: "A Convolutional Block Attention Module follows each SE head, applying sequential channel-wise and spatial-wise attention gates. This forces the network to focus on discriminative lesion regions (asymmetry, border irregularity, colour variation) while suppressing background skin.",
      },
      {
        heading: "Efficiency",
        body: "1×1 bottleneck convolutions before each 3×3 layer and transition blocks between stages keep the total parameter count below 3.5 M. This makes the model deployable on mobile or edge devices without quantisation, suitable for point-of-care dermatology settings.",
      },
      {
        heading: "Explainability & Continuous Learning",
        body: "Grad-CAM heatmaps are generated per prediction, highlighting the pixels that most influenced the classification. An adaptive feedback loop allows dermatologists to flag incorrect predictions, which are added to a fine-tuning queue, gradually improving calibration on local patient populations.",
      },
    ],
  },
];

export const colorMap = {
  purple: {
    tag: "bdg-purple",
    border: "rgba(168,85,247,0.30)",
    glow: "rgba(168,85,247,0.12)",
    accent: "#c084fc",
    iconBg: "linear-gradient(135deg, rgba(217,70,239,0.25), rgba(168,85,247,0.25))",
    iconBorder: "rgba(192,132,252,0.35)",
    activeBorder: "rgba(168,85,247,0.55)",
    activeGlow: "rgba(168,85,247,0.18)",
    gradFrom: "#f0abfc",
    gradTo: "#818cf8",
    glowStrong: "rgba(168,85,247,0.35)",
    // ← NEW fields used by the card
    shimmer: "rgba(192,132,252,0.6)",
    metricBg: "rgba(168,85,247,0.10)",
    metricBorder: "rgba(168,85,247,0.25)",
    tabActive: "rgba(168,85,247,0.18)",
    tabActiveBorder: "rgba(168,85,247,0.60)",
    tabActiveGlow: "rgba(168,85,247,0.30)",
    btnPrimary: "rgba(168,85,247,0.20)",
    btnPrimaryBorder: "rgba(168,85,247,0.40)",
    btnPrimaryColor: "#d8b4fe",
    btnPrimaryHoverBg: "rgba(168,85,247,0.32)",
    btnPrimaryHoverBorder: "rgba(168,85,247,0.65)",
    btnPrimaryHoverColor: "#f3e8ff",
    dotActive: "linear-gradient(90deg, #c084fc, #818cf8)",
    dotGlow: "rgba(168,85,247,0.70)",
  },
  cyan: {
    tag: "bdg-cyan",
    border: "rgba(103,232,249,0.22)",
    glow: "rgba(103,232,249,0.08)",
    accent: "#67e8f9",
    iconBg: "linear-gradient(135deg, rgba(103,232,249,0.20), rgba(56,189,248,0.20))",
    iconBorder: "rgba(165,243,252,0.30)",
    activeBorder: "rgba(103,232,249,0.50)",
    activeGlow: "rgba(103,232,249,0.14)",
    gradFrom: "#a5f3fc",
    gradTo: "#38bdf8",
    glowStrong: "rgba(103,232,249,0.35)",
    // ← NEW fields
    shimmer: "rgba(103,232,249,0.6)",
    metricBg: "rgba(103,232,249,0.08)",
    metricBorder: "rgba(103,232,249,0.22)",
    tabActive: "rgba(103,232,249,0.15)",
    tabActiveBorder: "rgba(103,232,249,0.55)",
    tabActiveGlow: "rgba(103,232,249,0.28)",
    btnPrimary: "rgba(103,232,249,0.15)",
    btnPrimaryBorder: "rgba(103,232,249,0.35)",
    btnPrimaryColor: "#a5f3fc",
    btnPrimaryHoverBg: "rgba(103,232,249,0.28)",
    btnPrimaryHoverBorder: "rgba(103,232,249,0.60)",
    btnPrimaryHoverColor: "#cffafe",
    dotActive: "linear-gradient(90deg, #67e8f9, #38bdf8)",
    dotGlow: "rgba(103,232,249,0.70)",
  },
  pink: {
    tag: "bdg-pink",
    border: "rgba(236,72,153,0.22)",
    glow: "rgba(236,72,153,0.08)",
    accent: "#f9a8d4",
    iconBg: "linear-gradient(135deg, rgba(236,72,153,0.20), rgba(244,114,182,0.20))",
    iconBorder: "rgba(249,168,212,0.30)",
    activeBorder: "rgba(236,72,153,0.50)",
    activeGlow: "rgba(236,72,153,0.14)",
    gradFrom: "#fbcfe8",
    gradTo: "#f472b6",
    glowStrong: "rgba(236,72,153,0.35)",
    // ← NEW fields
    shimmer: "rgba(249,168,212,0.6)",
    metricBg: "rgba(236,72,153,0.08)",
    metricBorder: "rgba(236,72,153,0.22)",
    tabActive: "rgba(236,72,153,0.14)",
    tabActiveBorder: "rgba(236,72,153,0.52)",
    tabActiveGlow: "rgba(236,72,153,0.28)",
    btnPrimary: "rgba(236,72,153,0.15)",
    btnPrimaryBorder: "rgba(236,72,153,0.35)",
    btnPrimaryColor: "#fbcfe8",
    btnPrimaryHoverBg: "rgba(236,72,153,0.28)",
    btnPrimaryHoverBorder: "rgba(236,72,153,0.58)",
    btnPrimaryHoverColor: "#fce7f3",
    dotActive: "linear-gradient(90deg, #f9a8d4, #f472b6)",
    dotGlow: "rgba(236,72,153,0.70)",
  },
};
