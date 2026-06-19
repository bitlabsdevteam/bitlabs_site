export type Language = "en" | "ja";

type NavLink = {
  href: string;
  label: string;
};

type Service = {
  title: string;
  problem: string;
  response: string;
  outcome: string;
};

type DeliveryStep = {
  phase: string;
  detail: string;
};

type ExpertiseArea = {
  title: string;
  summary: string;
  points: string[];
};

type FooterContent = {
  summary: string;
  location: string;
  email: string;
  copyright: string;
  socialAriaLabel: (name: string) => string;
};

type HomeApproachStep = {
  phase: string;
  title: string;
  body: string;
  marker: string;
};

type LabCapability = {
  label: string;
  title: string;
  body: string;
};

type StackLayer = {
  tier: string;
  title: string;
  body: string;
};

type ProductionProof = {
  label: string;
  value: string;
  body: string;
};

type SystemMapStep = {
  label: string;
  title: string;
};

type ResearchLabNote = {
  label: string;
  title: string;
  focus: string;
  method: string;
  signal: string;
};

type HeroHighlight = {
  label: string;
  value: string;
  body: string;
};

type HomeContent = {
  location: string;
  heroTitle: string;
  heroBody: string;
  heroStatementLabel: string;
  heroStatement: string;
  heroReadout: string[];
  heroHighlightsLabel: string;
  heroHighlights: HeroHighlight[];
  primaryCta: string;
  secondaryCta: string;
  fullStackLabel: string;
  fullStackTitle: string;
  fullStackLead: string;
  fullStackWrapperLabel: string;
  fullStackWrapperBody: string;
  fullStackBitlabsLabel: string;
  fullStackBitlabsBody: string;
  fullStackLayersLabel: string;
  fullStackLayers: StackLayer[];
  missionLabel: string;
  missionBody: string;
  missionAttribution: string;
  visionLabel: string;
  visionBody: string;
  visionAttribution: string;
  labLabel: string;
  labTitle: string;
  labBody: string;
  productionLabel: string;
  productionTitle: string;
  productionBody: string;
  systemMapLabel: string;
  systemMapTitle: string;
  systemMapBody: string;
  capabilitiesLabel: string;
  capabilitiesTitle: string;
  approachLabel: string;
  approachTitle: string;
  approachBody: string;
  approachSteps: HomeApproachStep[];
  approachVisualLabel: string;
  approachVisualValue: string;
  approachOutcomeLabel: string;
  approachOutcomeTitle: string;
  approachOutcomeBody: string;
  securityLabel: string;
  securityTitle: string;
  securityBody: string;
  securityPoints: string[];
};

type AboutContent = {
  metadataTitle: string;
  metadataDescription: string;
  eyebrow: string;
  title: string;
  body: string;
  profileLabel: string;
  profileTitle: string;
  companyNameLabel: string;
  companyName: string;
  ceoLabel: string;
  ceo: string;
  establishedLabel: string;
  established: string;
  addressLabel: string;
  address: string;
  capitalLabel: string;
  capital: string;
};

type ServicesPageContent = {
  metadataTitle: string;
  metadataDescription: string;
  eyebrow: string;
  title: string;
  body: string;
  problemLabel: string;
  responseLabel: string;
  outcomeLabel: string;
  processLabel: string;
  processTitle: string;
};

type ExpertisePageContent = {
  metadataTitle: string;
  metadataDescription: string;
  eyebrow: string;
  title: string;
  body: string;
  advisoryLabel: string;
  advisoryTitle: string;
  advisoryBody: string;
  parallelismLabel: string;
  parallelismTitle: string;
  parallelismBody: string;
  frameworkLabel: string;
  frameworkTitle: string;
  frameworkBody: string;
  frameworkPoints: string[];
};

type ResearchContent = {
  metadataTitle: string;
  metadataDescription: string;
  eyebrow: string;
  title: string;
  body: string;
  labLabel: string;
  labTitle: string;
  focusLabel: string;
  methodLabel: string;
  signalLabel: string;
  inferenceLabel: string;
  inferenceTitle: string;
  inferencePoints: string[];
  reliabilityLabel: string;
  reliabilityTitle: string;
  reliabilityPoints: string[];
  note: string;
};

type ContactContent = {
  metadataTitle: string;
  metadataDescription: string;
  eyebrow: string;
  title: string;
  body: string;
  emailLabel: string;
  locationLabel: string;
  responseLabel: string;
  responseTime: string;
};

type ContactFormContent = {
  nameLabel: string;
  emailLabel: string;
  companyLabel: string;
  briefLabel: string;
  nameError: string;
  emailError: string;
  companyError: string;
  briefError: string;
  honeypotError: string;
  submitIdle: string;
  submitBusy: string;
  success: string;
  helper: string;
};

type ChatContent = {
  openLabel: string;
  dialogLabel: string;
  title: string;
  subtitle: string;
  closeLabel: string;
  intro: string;
  quickReplies: string[];
  inputPlaceholder: string;
  sendLabel: string;
};

export const navLinks: Record<Language, NavLink[]> = {
  en: [
    { href: "/", label: "Home" },
    { href: "/expertises", label: "Expertise" },
    { href: "/services", label: "Services" },
    { href: "/research", label: "Research" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  ja: [
    { href: "/", label: "ホーム" },
    { href: "/expertises", label: "専門領域" },
    { href: "/services", label: "サービス" },
    { href: "/research", label: "研究" },
    { href: "/about", label: "会社情報" },
    { href: "/contact", label: "お問い合わせ" },
  ],
};

export const services: Record<Language, Service[]> = {
  en: [
    {
      title: "AI agents & RAG systems",
      problem:
        "A chatbot demo is easy. A reliable agent or RAG system that works on your real data is not.",
      response:
        "We build multi-agent apps and RAG pipelines with strong harness and loop engineering.",
      outcome: "Agents that use your tools and data dependably in production.",
    },
    {
      title: "Model training & fine-tuning",
      problem:
        "Off-the-shelf models don't always fit your domain, cost, or privacy needs.",
      response:
        "We pre-train transformer models from scratch and fine-tune any open or closed model.",
      outcome: "A model tuned to your task, with evaluation you can trust.",
    },
    {
      title: "Inference stacks & deployment",
      problem:
        "Latency and GPU cost decide whether a model survives real traffic.",
      response:
        "We design high-throughput inference stacks — runtime, tools, and infrastructure — using 5D parallelism.",
      outcome: "Fast, efficient serving you can run at scale.",
    },
    {
      title: "Custom AI applications",
      problem: "AI only helps when it fits how your team actually works.",
      response:
        "We build focused applications with the right context design and integrations.",
      outcome: "Software your team uses every day, not just a demo.",
    },
    {
      title: "Enterprise AI architecture",
      problem:
        "Adopting AI raises hard questions about data, ownership, and control.",
      response:
        "We define the architecture, model path, and data boundaries before the build.",
      outcome: "A clear plan with fewer surprises later.",
    },
  ],
  ja: [
    {
      title: "AIエージェント・RAG",
      problem:
        "デモは簡単でも、実データで安定して動くエージェントやRAGの構築は別物です。",
      response:
        "ハーネス・ループエンジニアリングを軸に、マルチエージェントアプリとRAGを構築します。",
      outcome: "実ツールと実データを安定して扱えるエージェントを本番導入します。",
    },
    {
      title: "モデル学習・ファインチューニング",
      problem:
        "既製モデルでは、業務ドメインやコスト、機密要件に合わないことがあります。",
      response:
        "トランスフォーマーをゼロから事前学習し、オープン・クローズドを問わず微調整します。",
      outcome: "用途に合わせたモデルを、信頼できる評価とともに用意します。",
    },
    {
      title: "推論基盤と導入",
      problem:
        "レイテンシとGPUコストが、本番トラフィックに耐えられるかを左右します。",
      response:
        "5D並列を活用し、ランタイム・ツール・インフラまで高スループット推論基盤を設計します。",
      outcome: "大規模でも高速で効率的な推論を実現します。",
    },
    {
      title: "カスタムAIアプリ",
      problem:
        "AIは、現場の業務フローに合って初めて価値になります。",
      response:
        "コンテキスト設計と連携を重視した、用途特化のアプリを構築します。",
      outcome: "単発デモではなく、日常業務で使える形にします。",
    },
    {
      title: "エンタープライズAI設計",
      problem:
        "AI導入には、データ、責任範囲、統制という難しい論点が伴います。",
      response:
        "構成、モデル方針、データ境界を実装前に整理します。",
      outcome: "見通しが立ち、後工程の手戻りを減らせます。",
    },
  ],
};

export const expertiseAreas: Record<Language, ExpertiseArea[]> = {
  en: [
    {
      title: "Enterprise AI architecture",
      summary:
        "We turn business constraints into an architecture you can actually run.",
      points: [
        "Map goals, data boundaries, and control needs early.",
        "Decide where AI belongs in the workflow — and where it doesn't.",
        "Fit delivery to your systems, approvals, and ownership.",
      ],
    },
    {
      title: "Inference engineering",
      summary:
        "We build serving stacks for speed, scale, and cost.",
      points: [
        "5D parallelism for efficient large-model training and serving.",
        "Runtime, tools, and infrastructure designed for high throughput.",
        "Batching, KV cache, and memory tuned for production traffic.",
      ],
    },
  ],
  ja: [
    {
      title: "エンタープライズAI設計",
      summary:
        "事業制約を、実際に運用できるAI設計へ落とし込みます。",
      points: [
        "事業目標、データ境界、統制要件を早い段階で整理します。",
        "AIを入れる場所と入れない場所を明確にします。",
        "既存システムや承認フローに合う導入計画を組みます。",
      ],
    },
    {
      title: "推論エンジニアリング",
      summary:
        "速度・規模・コストを両立する推論基盤を構築します。",
      points: [
        "5D並列で大規模モデルの学習と推論を効率化します。",
        "高スループット前提でランタイム・ツール・インフラを設計します。",
        "バッチング、KVキャッシュ、メモリを本番負荷に合わせて最適化します。",
      ],
    },
  ],
};

export const researchLabNotes: Record<Language, ResearchLabNote[]> = {
  en: [
    {
      label: "Pre-training",
      title: "Training models from scratch",
      focus: "Transformer architecture, data quality, and training efficiency.",
      method: "We design the architecture and data, then train at scale with 5D parallelism.",
      signal: "Models built for the task, not borrowed and forced to fit.",
    },
    {
      label: "Fine-tuning",
      title: "Adapting open and closed models",
      focus: "Domain behavior, tool use, and alignment.",
      method: "We fine-tune any model alongside regression checks and task scorecards.",
      signal: "Changes you can measure before release.",
    },
    {
      label: "Inference",
      title: "High-throughput serving",
      focus: "Latency, GPU efficiency, and scale.",
      method: "We study batching, KV cache, parallelism, and traffic together.",
      signal: "Predictable performance under real load.",
    },
    {
      label: "Agents & RAG",
      title: "Reliable agentic systems",
      focus: "Tool use, retrieval quality, and loop control.",
      method: "We replay traces, test permissions, and tune harness and loop behavior.",
      signal: "Agents that stay useful and in control.",
    },
  ],
  ja: [
    {
      label: "事前学習",
      title: "モデルをゼロから学習",
      focus: "トランスフォーマー設計、データ品質、学習効率。",
      method: "アーキテクチャとデータを設計し、5D並列で大規模に学習します。",
      signal: "借り物ではなく、用途に合わせたモデルを作ります。",
    },
    {
      label: "ファインチューニング",
      title: "オープン・クローズドモデルの適応",
      focus: "業務ドメイン、ツール挙動、整合性。",
      method: "回帰テストとタスク評価を併走させて微調整します。",
      signal: "変更の良し悪しを本番前に判断できます。",
    },
    {
      label: "推論",
      title: "高スループット推論",
      focus: "レイテンシ、GPU効率、スケール。",
      method: "バッチング、KVキャッシュ、並列化、負荷特性をまとめて検討します。",
      signal: "本番負荷でも予測しやすい性能を目指します。",
    },
    {
      label: "エージェント・RAG",
      title: "信頼できるエージェント",
      focus: "ツール利用、検索品質、ループ制御。",
      method: "実行トレースを再生し、権限やハーネス・ループ挙動を調整します。",
      signal: "統制を保ったまま使えるエージェントを目指します。",
    },
  ],
};

export const principles: Record<Language, string[]> = {
  en: [
    "Real engineering over AI hype",
    "Research turned into systems you can run",
    "Security and control designed in early",
    "Measured results, not inflated claims",
  ],
  ja: [
    "流行語より、実際のエンジニアリングを重視する",
    "研究を運用できるシステムへ変換する",
    "セキュリティと統制を最初の設計から組み込む",
    "誇張ではなく測定可能な成果で示す",
  ],
};

export const teamStrengths: Record<Language, string[]> = {
  en: [
    "Deep expertise in transformer models and inference",
    "Research, product, and engineering under one roof",
    "We know when to prototype and when to build real infrastructure",
    "Production delivery, not demos left on a shelf",
  ],
  ja: [
    "トランスフォーマーモデルと推論に関する深い専門性",
    "研究、プロダクト、実装を一つのチームでつなぐ体制",
    "試作と本格的な基盤構築を見極める判断力",
    "デモで終わらせず、本番まで届ける実行力",
  ],
};

export const labCapabilities: Record<Language, LabCapability[]> = {
  en: [
    {
      label: "01 / Agents",
      title: "AI agents & RAG",
      body: "Multi-agent apps and RAG pipelines with harness and loop engineering.",
    },
    {
      label: "02 / Models",
      title: "Training & fine-tuning",
      body: "Pre-training from scratch and fine-tuning open or closed models.",
    },
    {
      label: "03 / Inference",
      title: "Inference stacks",
      body: "High-throughput serving: runtime, tools, and infrastructure.",
    },
    {
      label: "04 / Delivery",
      title: "Production delivery",
      body: "Tested, deployed systems — not just proofs of concept.",
    },
  ],
  ja: [
    {
      label: "01 / エージェント",
      title: "AIエージェント・RAG",
      body: "ハーネス・ループエンジニアリングを軸にエージェントとRAGを構築します。",
    },
    {
      label: "02 / モデル",
      title: "学習・ファインチューニング",
      body: "ゼロからの事前学習と、オープン・クローズドモデルの微調整。",
    },
    {
      label: "03 / 推論",
      title: "推論基盤",
      body: "ランタイム・ツール・インフラまで含む高スループット推論。",
    },
    {
      label: "04 / 導入",
      title: "本番導入",
      body: "検証から本番導入まで。デモで終わらせません。",
    },
  ],
};

export const productionProofs: Record<Language, ProductionProof[]> = {
  en: [
    {
      label: "Research",
      value: "We train models",
      body: "Transformer architecture, pre-training, and fine-tuning.",
    },
    {
      label: "Inference",
      value: "We serve at scale",
      body: "High-throughput stacks built with 5D parallelism.",
    },
    {
      label: "Agents",
      value: "We build agents",
      body: "Multi-agent apps and RAG pipelines on your data.",
    },
    {
      label: "Delivery",
      value: "We ship",
      body: "From PoC to production, with monitoring and clear release criteria.",
    },
  ],
  ja: [
    {
      label: "研究",
      value: "モデルを学習",
      body: "トランスフォーマー設計、事前学習、ファインチューニング。",
    },
    {
      label: "推論",
      value: "大規模に提供",
      body: "5D並列で構築する高スループット推論基盤。",
    },
    {
      label: "エージェント",
      value: "エージェントを構築",
      body: "実データで動くマルチエージェントとRAG。",
    },
    {
      label: "導入",
      value: "本番へ届ける",
      body: "PoCから本番まで。監視と明確なリリース基準を伴います。",
    },
  ],
};

export const systemMapSteps: Record<Language, SystemMapStep[]> = {
  en: [
    { label: "01", title: "Your problem" },
    { label: "02", title: "Data boundary" },
    { label: "03", title: "Model strategy" },
    { label: "04", title: "Inference stack" },
    { label: "05", title: "Agent workflow" },
    { label: "06", title: "Evaluation" },
    { label: "07", title: "Secure deployment" },
  ],
  ja: [
    { label: "01", title: "課題の把握" },
    { label: "02", title: "データ境界" },
    { label: "03", title: "モデル戦略" },
    { label: "04", title: "推論基盤" },
    { label: "05", title: "エージェント業務" },
    { label: "06", title: "評価" },
    { label: "07", title: "セキュア導入" },
  ],
};

export const deliverySteps: Record<Language, DeliveryStep[]> = {
  en: [
    {
      phase: "01. Discovery",
      detail: "Align on goals, data boundaries, and what success looks like.",
    },
    {
      phase: "02. Design",
      detail: "Choose the model, inference path, and integrations.",
    },
    {
      phase: "03. Build",
      detail: "Build with evaluation and production controls from the start.",
    },
    {
      phase: "04. Launch",
      detail: "Deploy with monitoring and a clear path to improve.",
    },
  ],
  ja: [
    {
      phase: "01. 現状整理",
      detail: "目標、データ境界、成功の定義をそろえます。",
    },
    {
      phase: "02. 設計",
      detail: "モデル、推論経路、連携方針を決めます。",
    },
    {
      phase: "03. 構築",
      detail: "評価ループと本番統制を最初から組み込んで構築します。",
    },
    {
      phase: "04. 導入",
      detail: "監視と改善の道筋を伴って本番へ展開します。",
    },
  ],
};

export const footerContent: Record<Language, FooterContent> = {
  en: {
    summary:
      "Tokyo AI lab. We train models, build agents, and ship inference stacks for production.",
    location: "Tokyo, Japan",
    email: "hello@bitlabs.site",
    copyright: "All rights reserved.",
    socialAriaLabel: (name) => `View BitLabs on ${name}`,
  },
  ja: {
    summary:
      "東京のAIラボ。モデル学習、エージェント構築、推論基盤の本番導入を行います。",
    location: "東京、日本",
    email: "hello@bitlabs.site",
    copyright: "無断転載・無断使用を禁じます。",
    socialAriaLabel: (name) => `BitLabsの${name}を見る`,
  },
};

export const homeContent: Record<Language, HomeContent> = {
  en: {
    location: "Tokyo AI Research & Engineering Lab",
    heroTitle: "Agentic systems, model programs, and inference stacks for real deployment.",
    heroBody:
      "BitLabs is a Tokyo AI lab. We train models, build AI agents, and ship the inference stacks that run them in production.",
    heroStatementLabel: "What we do",
    heroStatement:
      "From transformer pre-training to high-throughput serving, we take AI from idea to production — not just a demo.",
    heroReadout: ["AI agents & RAG", "Model training", "Inference stacks", "Production delivery"],
    heroHighlightsLabel: "Why BitLabs",
    heroHighlights: [
      {
        label: "Depth",
        value: "We train models",
        body: "Pre-training from scratch and fine-tuning, open or closed source.",
      },
      {
        label: "Scale",
        value: "We serve fast",
        body: "High-throughput inference with runtime, tools, and infrastructure.",
      },
      {
        label: "Delivery",
        value: "We ship",
        body: "Production systems, not proofs of concept left on a shelf.",
      },
    ],
    primaryCta: "Talk to BitLabs",
    secondaryCta: "Explore expertise",
    fullStackLabel: "End to end",
    fullStackTitle: "We are not AI model wrappers.",
    fullStackLead:
      "Most “AI companies” call someone else’s model API and wrap it in a UI. BitLabs owns the entire stack — from the GPU infrastructure to the application that runs on it. Every layer is ours to design, tune, and operate.",
    fullStackWrapperLabel: "A model wrapper",
    fullStackWrapperBody:
      "Calls a hosted model and ships a thin interface. When cost, latency, privacy, or quality breaks, there is nothing deeper to fix.",
    fullStackBitlabsLabel: "BitLabs",
    fullStackBitlabsBody:
      "Owns infrastructure, models, inference, and the application. We tune the whole system, not just the prompt — so it holds up in production.",
    fullStackLayersLabel: "The full stack",
    fullStackLayers: [
      {
        tier: "Layer 04 / Application",
        title: "Agents & applications",
        body: "The product your team actually uses — AI agents, RAG, and custom apps built around your workflow.",
      },
      {
        tier: "Layer 03 / Models",
        title: "Models",
        body: "Pre-trained from scratch or fine-tuned, open or closed source, shaped to your task and data.",
      },
      {
        tier: "Layer 02 / Inference",
        title: "Inference & serving",
        body: "High-throughput serving with 5D parallelism — runtime, tooling, and orchestration.",
      },
      {
        tier: "Layer 01 / Infrastructure",
        title: "Infrastructure",
        body: "Secure cloud and GPU foundations, provisioned and operated for real production load.",
      },
    ],
    missionLabel: "Mission",
    missionBody:
      "Turn deep AI research into systems teams can run every day.",
    missionAttribution: "- BitLabs CEO David Bong",
    visionLabel: "Vision",
    visionBody:
      "Make production AI as dependable as any core system you rely on.",
    visionAttribution: "- BitLabs CEO David Bong",
    labLabel: "What we do",
    labTitle: "One team for models, agents, and inference.",
    labBody:
      "We handle the full path: train or fine-tune the model, build the agent or app, and deploy the inference stack that serves it.",
    productionLabel: "PoC to production",
    productionTitle: "We don't stop at the demo.",
    productionBody:
      "We prove value with a focused build, then harden it into a production system you can operate.",
    systemMapLabel: "How we work",
    systemMapTitle: "From your problem to a deployed AI system.",
    systemMapBody:
      "We map the whole path up front so the big decisions stay aligned.",
    capabilitiesLabel: "Capabilities",
    capabilitiesTitle: "What BitLabs builds.",
    approachLabel: "Approach",
    approachTitle: "Start with your problem, then pick the right model and serving path.",
    approachBody:
      "We shape the model, inference, and application around your actual workflow and constraints.",
    approachSteps: [
      {
        phase: "01. Workshop",
        title: "Understand the problem.",
        body: "We map your workflow, systems, and constraints.",
        marker: "Discovery",
      },
      {
        phase: "02. Design",
        title: "Choose the right stack.",
        body: "Model approach, inference path, and architecture.",
        marker: "Plan",
      },
      {
        phase: "03. Build",
        title: "Ship a focused MVP.",
        body: "The smallest system that proves real value.",
        marker: "MVP",
      },
    ],
    approachVisualLabel: "BitLabs flow",
    approachVisualValue: "Workshop to MVP",
    approachOutcomeLabel: "Outcome",
    approachOutcomeTitle: "A clear path from problem to production AI.",
    approachOutcomeBody:
      "You move forward with a system built for your environment.",
    securityLabel: "Security & Deployment",
    securityTitle: "Built for production from day one.",
    securityBody:
      "We design data handling, access, and release checks into the first architecture pass.",
    securityPoints: [
      "Private or regional deployment with clear trust boundaries",
      "Controlled model access, tool use, and sensitive data handling",
      "Release checks for regulated, high-accountability environments",
    ],
  },
  ja: {
    location: "東京のAI研究開発・エンジニアリングラボ",
    heroTitle: "エージェント、モデル開発、推論基盤を本番導入まで設計するAIパートナー。",
    heroBody:
      "BitLabsは東京のAIラボです。モデルを学習し、AIエージェントを構築し、それを動かす推論基盤を本番導入します。",
    heroStatementLabel: "私たちの仕事",
    heroStatement:
      "トランスフォーマーの事前学習から高スループット推論まで、デモではなく本番までやり切ります。",
    heroReadout: ["AIエージェント・RAG", "モデル学習", "推論基盤", "本番導入"],
    heroHighlightsLabel: "BitLabsを選ぶ理由",
    heroHighlights: [
      {
        label: "深さ",
        value: "モデルを学習",
        body: "ゼロからの事前学習と、オープン・クローズド両方の微調整。",
      },
      {
        label: "規模",
        value: "高速に提供",
        body: "ランタイム・ツール・インフラを備えた高スループット推論。",
      },
      {
        label: "実行力",
        value: "本番へ届ける",
        body: "デモで終わらせず、本番運用できるシステムを作ります。",
      },
    ],
    primaryCta: "BitLabsに相談する",
    secondaryCta: "専門領域を見る",
    fullStackLabel: "エンドツーエンド",
    fullStackTitle: "私たちは、AIモデルのラッパーではありません。",
    fullStackLead:
      "多くの「AI企業」は、他社のモデルAPIを呼び出してUIで包むだけです。BitLabsはGPUインフラから、その上で動くアプリケーションまで、スタック全体を自分たちで持ちます。すべての層を、設計し、調整し、運用します。",
    fullStackWrapperLabel: "モデルラッパー",
    fullStackWrapperBody:
      "ホスト型モデルを呼び出し、薄いUIを載せるだけ。コスト、レイテンシ、機密性、品質が崩れても、踏み込んで直せる層がありません。",
    fullStackBitlabsLabel: "BitLabs",
    fullStackBitlabsBody:
      "インフラ、モデル、推論、アプリケーションまで自社で保有。プロンプトだけでなくシステム全体を調整し、本番で通用する形にします。",
    fullStackLayersLabel: "フルスタック",
    fullStackLayers: [
      {
        tier: "Layer 04 / アプリケーション",
        title: "エージェント・アプリ",
        body: "現場が実際に使うプロダクト。業務に合わせたAIエージェント、RAG、カスタムアプリ。",
      },
      {
        tier: "Layer 03 / モデル",
        title: "モデル",
        body: "ゼロからの事前学習、またはオープン・クローズドの微調整。用途とデータに合わせて作ります。",
      },
      {
        tier: "Layer 02 / 推論",
        title: "推論・配信",
        body: "5D並列による高スループット配信。ランタイム、ツール、オーケストレーションまで。",
      },
      {
        tier: "Layer 01 / インフラ",
        title: "インフラ",
        body: "セキュアなクラウドとGPU基盤を、本番負荷に耐える形で構築・運用します。",
      },
    ],
    missionLabel: "ミッション",
    missionBody:
      "深いAI研究を、毎日運用できるシステムへ変換すること。",
    missionAttribution: "- BitLabs CEO David Bong",
    visionLabel: "ビジョン",
    visionBody:
      "本番のAIを、基幹システムと同じくらい信頼できるものにすること。",
    visionAttribution: "- BitLabs CEO David Bong",
    labLabel: "私たちの仕事",
    labTitle: "モデル、エージェント、推論を一つのチームで。",
    labBody:
      "モデルの学習・微調整、エージェントやアプリの構築、それを動かす推論基盤の導入まで一貫して担います。",
    productionLabel: "PoCから本番へ",
    productionTitle: "デモで終わらせません。",
    productionBody:
      "まず小さな構成で価値を確かめ、機能する部分を本番運用できる形へ仕上げます。",
    systemMapLabel: "進め方",
    systemMapTitle: "課題から、導入済みのAIシステムまで。",
    systemMapBody:
      "実装前に全体の道筋を描き、重要な判断をぶれさせません。",
    capabilitiesLabel: "対応領域",
    capabilitiesTitle: "BitLabsが構築するもの。",
    approachLabel: "進め方",
    approachTitle: "まず課題を捉え、最適なモデルと推論経路を選びます。",
    approachBody:
      "実際の業務フローと制約に合わせて、モデル、推論、アプリ構成を組み立てます。",
    approachSteps: [
      {
        phase: "01. ワークショップ",
        title: "課題を理解する。",
        body: "業務フロー、既存システム、制約を整理します。",
        marker: "課題整理",
      },
      {
        phase: "02. 設計",
        title: "最適な構成を選ぶ。",
        body: "モデル方針、推論経路、アーキテクチャを決めます。",
        marker: "設計",
      },
      {
        phase: "03. 構築",
        title: "価値検証用のMVPを作る。",
        body: "価値を確認できる最小構成を構築します。",
        marker: "MVP",
      },
    ],
    approachVisualLabel: "進行フロー",
    approachVisualValue: "課題整理からMVPへ",
    approachOutcomeLabel: "進行結果",
    approachOutcomeTitle: "課題から本番AIまでの道筋を明確にする。",
    approachOutcomeBody:
      "環境に合う形で、次の開発判断へ無理なく進めます。",
    securityLabel: "セキュリティと配備",
    securityTitle: "最初から本番前提で設計します。",
    securityBody:
      "データ取り扱い、アクセス、リリース確認を初期設計から組み込みます。",
    securityPoints: [
      "プライベート／リージョン配備と明確な信頼境界",
      "モデル利用、ツール実行、機密データの統制",
      "説明責任が求められる環境向けのリリース確認",
    ],
  },
};

export const aboutContent: Record<Language, AboutContent> = {
  en: {
    metadataTitle: "About",
    metadataDescription: "Company profile for BitLabs, a Tokyo-based AI research and engineering lab.",
    eyebrow: "About",
    title: "A Tokyo AI research and engineering lab.",
    body:
      "We are a small team with deep model and infrastructure expertise. We help companies that need real AI built and shipped — not just advised.",
    profileLabel: "Corporate Information",
    profileTitle: "Company profile.",
    companyNameLabel: "Company Name",
    companyName: "Bit Labs株式会社",
    ceoLabel: "CEO",
    ceo: "David Bong",
    establishedLabel: "Company Established Date",
    established: "April 3, 2024",
    addressLabel: "Company Address",
    address: "東京都渋谷区道玄坂一丁目10番8号渋谷道玄坂東急ビル2F-C",
    capitalLabel: "Startup Capital",
    capital: "300万円",
  },
  ja: {
    metadataTitle: "会社情報",
    metadataDescription: "東京拠点のAI研究開発・エンジニアリングラボ、BitLabsの会社概要です。",
    eyebrow: "会社情報",
    title: "東京のAI研究開発・エンジニアリングラボです。",
    body:
      "モデルと基盤に深い専門性を持つ少数精鋭のチームです。助言だけでなく、実際のAIを構築し本番まで届けます。",
    profileLabel: "会社情報",
    profileTitle: "会社プロフィール。",
    companyNameLabel: "会社名",
    companyName: "Bit Labs株式会社",
    ceoLabel: "CEO",
    ceo: "David Bong",
    establishedLabel: "設立日",
    established: "令和6年4月3日",
    addressLabel: "会社住所",
    address: "東京都渋谷区道玄坂一丁目10番8号渋谷道玄坂東急ビル2F-C",
    capitalLabel: "資本金",
    capital: "300万円",
  },
};

export const servicesPageContent: Record<Language, ServicesPageContent> = {
  en: {
    metadataTitle: "Services",
    metadataDescription:
      "BitLabs services: AI agents and RAG, model training and fine-tuning, inference stacks, custom AI apps, and enterprise AI architecture.",
    eyebrow: "Services",
    title: "Services for teams building real AI systems.",
    body:
      "We keep scope tight and build what moves your system toward production.",
    problemLabel: "When to call us",
    responseLabel: "What we do",
    outcomeLabel: "What you get",
    processLabel: "Build Path",
    processTitle: "A short path: align, design, build, launch.",
  },
  ja: {
    metadataTitle: "サービス",
    metadataDescription:
      "BitLabsのサービス。AIエージェントとRAG、モデル学習・ファインチューニング、推論基盤、カスタムAIアプリ、エンタープライズAI設計。",
    eyebrow: "サービス",
    title: "本番のAIを作るチームのためのサービス。",
    body:
      "スコープを絞り、本番に近づくものから構築します。",
    problemLabel: "こんなとき",
    responseLabel: "BitLabsの対応",
    outcomeLabel: "得られるもの",
    processLabel: "構築ステップ",
    processTitle: "短い流れで進めます。整理、設計、構築、導入。",
  },
};

export const expertisePageContent: Record<Language, ExpertisePageContent> = {
  en: {
    metadataTitle: "Expertise",
    metadataDescription:
      "BitLabs expertise: transformer model training, fine-tuning, 5D parallelism, high-throughput inference, RAG, and agentic systems.",
    eyebrow: "Expertise",
    title: "Models, inference, agents, and the architecture around them.",
    body:
      "BitLabs goes deep on transformer models, high-throughput inference, and agentic systems — and ships them to production.",
    advisoryLabel: "Enterprise architecture",
    advisoryTitle: "AI that fits your business and data rules.",
    advisoryBody:
      "We design the architecture around your systems, approvals, and data boundaries.",
    parallelismLabel: "Inference engineering",
    parallelismTitle: "High-throughput, low-latency inference.",
    parallelismBody:
      "We design the serving stack — runtime, tools, and infrastructure — and use 5D parallelism to train and serve large models efficiently.",
    frameworkLabel: "Agents & RAG",
    frameworkTitle: "Agentic systems you can trust and trace.",
    frameworkBody:
      "We build multi-agent apps and RAG pipelines with strong harness and loop engineering.",
    frameworkPoints: [
      "Multi-agent orchestration with clear permissions and audit trails.",
      "RAG pipelines tuned for accuracy on your data.",
      "Harness and loop engineering for reliable, repeatable behavior.",
    ],
  },
  ja: {
    metadataTitle: "専門領域",
    metadataDescription:
      "BitLabsの専門領域。トランスフォーマーモデルの学習、ファインチューニング、5D並列、高スループット推論、RAG、AIエージェント。",
    eyebrow: "専門領域",
    title: "モデル、推論、エージェント、そしてその周辺設計。",
    body:
      "BitLabsはトランスフォーマーモデル、高スループット推論、AIエージェントを深く掘り下げ、本番まで届けます。",
    advisoryLabel: "エンタープライズ設計",
    advisoryTitle: "事業とデータルールに合うAIを設計する。",
    advisoryBody:
      "既存システム、承認フロー、データ境界に合わせてアーキテクチャを設計します。",
    parallelismLabel: "推論エンジニアリング",
    parallelismTitle: "高スループット・低レイテンシの推論。",
    parallelismBody:
      "ランタイム・ツール・インフラまで推論基盤を設計し、5D並列で大規模モデルを効率的に学習・提供します。",
    frameworkLabel: "エージェント・RAG",
    frameworkTitle: "信頼でき、追跡できるAIエージェント。",
    frameworkBody:
      "ハーネス・ループエンジニアリングを軸に、マルチエージェントアプリとRAGを構築します。",
    frameworkPoints: [
      "権限と監査ログが明確なマルチエージェント・オーケストレーション。",
      "自社データで精度を高めたRAGパイプライン。",
      "安定して再現する挙動のためのハーネス・ループエンジニアリング。",
    ],
  },
};

export const researchContent: Record<Language, ResearchContent> = {
  en: {
    metadataTitle: "Research",
    metadataDescription:
      "BitLabs research across transformer architecture, pre-training, fine-tuning, 5D parallelism, inference, and reliability for production AI.",
    eyebrow: "Research",
    title: "Research that makes AI work in production.",
    body:
      "We research transformer models, inference, and agent reliability, and prove ideas with PoCs before they reach production.",
    labLabel: "Public Lab Notes",
    labTitle: "We separate promising ideas from systems that actually ship.",
    focusLabel: "Focus",
    methodLabel: "Method",
    signalLabel: "Signal",
    inferenceLabel: "Model & inference research",
    inferenceTitle: "We study the model and the serving layer together.",
    inferencePoints: [
      "How transformer architecture choices affect quality and cost.",
      "How 5D parallelism makes large-model training and serving efficient.",
      "How serving limits should shape model choice before the build.",
    ],
    reliabilityLabel: "Reliability",
    reliabilityTitle: "Production trust has to be earned with evidence.",
    reliabilityPoints: [
      "Evaluation across quality, latency, safety, and control.",
      "Reliability testing for tools, planning, and escalation.",
      "Release criteria tied to governance and deployment needs.",
    ],
    note: "Some research and PoC work stays private under confidentiality.",
  },
  ja: {
    metadataTitle: "研究",
    metadataDescription:
      "BitLabsの研究領域。トランスフォーマー設計、事前学習、ファインチューニング、5D並列、推論、本番AIの信頼性。",
    eyebrow: "研究",
    title: "AIを本番で動かすための研究。",
    body:
      "トランスフォーマーモデル、推論、エージェントの信頼性を研究し、本番投入の前にPoCで検証します。",
    labLabel: "公開ラボノート",
    labTitle: "有望なアイデアと、実際に本番へ届く仕組みを切り分けます。",
    focusLabel: "焦点",
    methodLabel: "方法",
    signalLabel: "確認する兆候",
    inferenceLabel: "モデル・推論研究",
    inferenceTitle: "モデル設計と配信層の両方を研究します。",
    inferencePoints: [
      "トランスフォーマー設計の選択が品質とコストにどう影響するか。",
      "5D並列が大規模モデルの学習と提供をどう効率化するか。",
      "配信制約がモデル選定にどう影響すべきか。",
    ],
    reliabilityLabel: "信頼性",
    reliabilityTitle: "本番での信頼は、根拠を持って積み上げるものです。",
    reliabilityPoints: [
      "品質、遅延、安全性、制御性を横断する評価。",
      "ツール、計画、エスカレーションの信頼性検証。",
      "ガバナンスと導入要件に沿ったリリース基準。",
    ],
    note: "一部の研究やPoC案件は機密性のため公開していません。",
  },
};

export const contactContent: Record<Language, ContactContent> = {
  en: {
    metadataTitle: "Contact",
    metadataDescription:
      "Contact BitLabs about model training, fine-tuning, inference stacks, AI agents, RAG, and production deployment.",
    eyebrow: "Contact",
    title: "Tell us what you want to build.",
    body:
      "Reach out if you need to train or fine-tune a model, scale up inference, or build an AI agent or RAG system. Share your goal and constraints — we'll reply with a practical next step.",
    emailLabel: "Email",
    locationLabel: "Location",
    responseLabel: "Typical response",
    responseTime: "Within 1 business day",
  },
  ja: {
    metadataTitle: "お問い合わせ",
    metadataDescription:
      "モデル学習、ファインチューニング、推論基盤、AIエージェント、RAG、本番導入についてBitLabsへお問い合わせください。",
    eyebrow: "お問い合わせ",
    title: "作りたいものをお聞かせください。",
    body:
      "モデルの学習・微調整、推論のスケール、AIエージェントやRAGの構築をご検討中ならご相談ください。目標と制約をお知らせいただければ、現実的な次の一歩をご提案します。",
    emailLabel: "メール",
    locationLabel: "所在地",
    responseLabel: "通常のご返信目安",
    responseTime: "1営業日以内",
  },
};

export const contactFormContent: Record<Language, ContactFormContent> = {
  en: {
    nameLabel: "Name",
    emailLabel: "Work email",
    companyLabel: "Company",
    briefLabel: "Project brief",
    nameError: "Please enter your name.",
    emailError: "Please enter a valid work email address.",
    companyError: "Please enter your company name.",
    briefError: "Please provide at least 20 characters.",
    honeypotError: "Invalid submission.",
    submitIdle: "Send inquiry",
    submitBusy: "Sending...",
    success: "Your inquiry has been received. We usually reply within one business day.",
    helper: "Please use a work email. A simple spam check protects this form.",
  },
  ja: {
    nameLabel: "氏名",
    emailLabel: "勤務先メールアドレス",
    companyLabel: "会社名",
    briefLabel: "プロジェクト概要",
    nameError: "氏名を入力してください。",
    emailError: "有効な勤務先メールアドレスを入力してください。",
    companyError: "会社名を入力してください。",
    briefError: "20文字以上でご記入ください。",
    honeypotError: "無効な送信です。",
    submitIdle: "問い合わせを送信",
    submitBusy: "送信中...",
    success: "お問い合わせを受け付けました。通常1営業日以内にご返信します。",
    helper: "勤務先メールアドレスをご利用ください。簡易的なスパム対策を入れています。",
  },
};

export const chatContent: Record<Language, ChatContent> = {
  en: {
    openLabel: "Adam Consultant",
    dialogLabel: "Adam chat",
    title: "Adam Consultant",
    subtitle: "",
    closeLabel: "Close chat",
    intro: "Hi, I'm Adam. Ask about BitLabs — model training, inference, AI agents, or your production AI plans.",
    quickReplies: [
      "What can BitLabs build?",
      "Can you train or fine-tune a model for us?",
      "We want an AI agent for our workflows",
    ],
    inputPlaceholder: "Type your question...",
    sendLabel: "Send",
  },
  ja: {
    openLabel: "Adamコンサルタント",
    dialogLabel: "Adamチャット",
    title: "Adamコンサルタント",
    subtitle: "",
    closeLabel: "チャットを閉じる",
    intro: "こんにちは、Adamです。モデル学習、推論、AIエージェント、本番導入など、BitLabsについてご相談ください。",
    quickReplies: [
      "BitLabsは何を作れますか？",
      "モデルの学習や微調整は可能ですか？",
      "業務向けのAIエージェントを検討しています",
    ],
    inputPlaceholder: "質問を入力してください...",
    sendLabel: "送信",
  },
};
