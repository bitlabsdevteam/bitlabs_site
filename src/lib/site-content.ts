export type Language = "en" | "ja";

type NavLink = {
  href: string;
  label: string;
};

type Service = {
  title: string;
  summary: string;
  tags?: string[];
};

type ServiceCluster = {
  label: string;
  title: string;
  lead: string;
  serviceIndexes: number[];
};

type ExpertiseArea = {
  title: string;
  summary: string;
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
  heroPrefix: string;
  heroRotating: string[];
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
  researchLabel: string;
  researchTitle: string;
  researchBody: string;
  researchCtaLabel: string;
};

type PlatformLogo = {
  name: string;
  src: string;
};

type HomePlatformsContent = {
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
  platforms: PlatformLogo[];
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
  banksLabel: string;
  banks: string[];
};

type ServicesPageContent = {
  metadataTitle: string;
  metadataDescription: string;
  eyebrow: string;
  title: string;
  body: string;
  ctaTitle: string;
  ctaBody: string;
  ctaLabel: string;
};

type ExpertisePageContent = {
  metadataTitle: string;
  metadataDescription: string;
  eyebrow: string;
  title: string;
  body: string;
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

type CareerRole = {
  title: string;
  type: string;
  location: string;
  summary: string;
  focus: string[];
};

type CareerContent = {
  metadataTitle: string;
  metadataDescription: string;
  eyebrow: string;
  title: string;
  body: string;
  whyLabel: string;
  whyTitle: string;
  whyPoints: string[];
  rolesLabel: string;
  rolesTitle: string;
  rolesBody: string;
  focusLabel: string;
  roles: CareerRole[];
  applyLabel: string;
  applyTitle: string;
  applyBody: string;
  applyEmail: string;
  applyCtaLabel: string;
};

type ContactContent = {
  metadataTitle: string;
  metadataDescription: string;
  eyebrow: string;
  title: string;
  body: string;
  emailLabel: string;
  emailAddress: string;
  emailHelper: string;
  emailCtaLabel: string;
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
  error: string;
  helper: string;
};

type ApplicationFormContent = {
  nameLabel: string;
  emailLabel: string;
  roleLabel: string;
  rolePlaceholder: string;
  messageLabel: string;
  resumeLabel: string;
  resumeHint: string;
  nameError: string;
  emailError: string;
  roleError: string;
  messageError: string;
  resumeError: string;
  honeypotError: string;
  submitIdle: string;
  submitBusy: string;
  success: string;
  error: string;
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
    { href: "/services", label: "Services" },
    { href: "/career", label: "Careers" },
    { href: "/about", label: "About" },
  ],
  ja: [
    { href: "/", label: "ホーム" },
    { href: "/services", label: "サービス" },
    { href: "/career", label: "採用情報" },
    { href: "/about", label: "会社情報" },
  ],
};

export const services: Record<Language, Service[]> = {
  en: [
    {
      title: "Enterprise AI, production level",
      summary: "We build, scale, integrate, and deploy AI systems that hold up under real load, inside your enterprise's actual data and access boundaries.",
      tags: ["Microsoft Azure", "AWS", "Secure integration", "Data boundaries"],
    },
    {
      title: "LLM & SLM pre-training, fine-tuning",
      summary: "Closed and open-source models pre-trained at scale with 5D parallelism (data, tensor, pipeline, sequence, and expert) or fine-tuned with modern techniques including JAX and Unsloth, with eval gates before anything ships.",
      tags: ["JAX", "Unsloth", "5D parallelism", "Eval gates"],
    },
    {
      title: "Agentic systems & RAG pipelines",
      summary: "Sophisticated multi-agent solutions and RAG pipelines built on Claude Agent SDK, LangChain, LangGraph, and Codex, wired into your real workflows.",
      tags: ["Claude Agent SDK", "LangChain", "LangGraph", "Codex"],
    },
    {
      title: "Advanced AI agentic solutions with harness engineering",
      summary: "We build the harness beneath the agent: least-privilege tool scoping and sandboxing, context and memory management, checkpointed recovery, and supervised multi-agent orchestration with human approval gates for regulated, high-accountability environments.",
      tags: ["Least-privilege tooling", "Sandboxing", "Context management", "Approval gates"],
    },
    {
      title: "Inference stacks & secure deployment",
      summary: "High-throughput, low-latency serving with tensor and pipeline parallelism, tuned batching, and KV cache efficiency, deployed securely at scale.",
      tags: ["Tensor parallelism", "Pipeline parallelism", "KV cache", "Tuned batching"],
    },
    {
      title: "Custom AI applications",
      summary: "Focused applications with the right context design and integrations your team uses every day.",
      tags: ["React", "Next.js", "Context design"],
    },
    {
      title: "Evaluation & reliability engineering",
      summary: "We are not just builders. Task scorecards, regression suites, and trace-driven evals that keep improving quality release after release.",
      tags: ["Task scorecards", "Regression suites", "Trace-driven evals"],
    },
  ],
  ja: [
    {
      title: "本番レベルのエンタープライズAI",
      summary: "実負荷に耐えるAIシステムを、貴社の実際のデータ境界とアクセス制御の中で構築・拡張・連携・導入します。",
      tags: ["Microsoft Azure", "AWS", "セキュアな連携", "データ境界"],
    },
    {
      title: "LLM・SLMの事前学習とファインチューニング",
      summary: "データ・テンソル・パイプライン・シーケンス・エキスパートの5D並列で大規模に事前学習、またはJAXやUnslothを含む最新技術で微調整。リリース前には必ず評価ゲートを通します。",
      tags: ["JAX", "Unsloth", "5D並列", "評価ゲート"],
    },
    {
      title: "エージェントシステム・RAGパイプライン",
      summary: "Claude Agent SDK、LangChain、LangGraph、Codexを基盤にした高度なマルチエージェントとRAGパイプラインを、実際の業務フローに組み込みます。",
      tags: ["Claude Agent SDK", "LangChain", "LangGraph", "Codex"],
    },
    {
      title: "高度なAIエージェントソリューションとハーネスエンジニアリング",
      summary: "エージェントを支えるハーネスを構築します。最小権限のツールスコープとサンドボックス化、コンテキストとメモリの管理、チェックポイントによる復旧、そして説明責任が求められる規制環境向けに人間の承認ゲートを備えた監督下のマルチエージェント・オーケストレーションまで。",
      tags: ["最小権限ツール", "サンドボックス化", "コンテキスト管理", "承認ゲート"],
    },
    {
      title: "推論基盤とセキュアな導入",
      summary: "テンソル・パイプライン並列、バッチングとKVキャッシュを最適化した高スループット・低レイテンシの推論基盤を、安全に大規模導入します。",
      tags: ["テンソル並列", "パイプライン並列", "KVキャッシュ", "バッチング最適化"],
    },
    {
      title: "カスタムAIアプリ",
      summary: "コンテキスト設計と連携を重視し、日常業務で使える用途特化のアプリを構築します。",
      tags: ["React", "Next.js", "コンテキスト設計"],
    },
    {
      title: "評価・信頼性エンジニアリング",
      summary: "私たちは作るだけではありません。タスクスコアカード、回帰テスト、トレース解析による評価で、リリースのたびに品質を高め続けます。",
      tags: ["タスクスコアカード", "回帰テスト", "トレース評価"],
    },
  ],
};

// Themed practice areas for the services page. `serviceIndexes` reference
// entries in `services` above so the underlying list stays the single source.
export const serviceClusters: Record<Language, ServiceCluster[]> = {
  en: [
    {
      label: "01 / Models",
      title: "Models & Training",
      lead: "We work at the weights level: pre-training from scratch and fine-tuning open or closed models to your domain.",
      serviceIndexes: [1],
    },
    {
      label: "02 / Agents",
      title: "Agentic Systems",
      lead: "Agents, RAG, and the applications around them, engineered with the harness that keeps them safe to run.",
      serviceIndexes: [2, 3, 5],
    },
    {
      label: "03 / Production",
      title: "Production & Reliability",
      lead: "Enterprise integration, high-throughput serving, and the evaluation discipline that keeps quality measurable.",
      serviceIndexes: [0, 4, 6],
    },
  ],
  ja: [
    {
      label: "01 / モデル",
      title: "モデルと学習",
      lead: "重みのレベルから取り組みます。ゼロからの事前学習と、オープン・クローズドモデルの領域特化の微調整。",
      serviceIndexes: [1],
    },
    {
      label: "02 / エージェント",
      title: "エージェントシステム",
      lead: "エージェント、RAG、その周辺アプリケーションを、安全に運用するためのハーネスとともに設計します。",
      serviceIndexes: [2, 3, 5],
    },
    {
      label: "03 / 本番運用",
      title: "本番運用と信頼性",
      lead: "エンタープライズ連携、高スループット推論、そして品質を測定可能に保つ評価の仕組み。",
      serviceIndexes: [0, 4, 6],
    },
  ],
};

export const expertiseAreas: Record<Language, ExpertiseArea[]> = {
  en: [
    {
      title: "Production-level enterprise AI",
      summary:
        "We build, scale, integrate, and deploy AI systems around your real systems, approvals, and data boundaries, then evaluate them before and after release.",
    },
    {
      title: "Model pre-training & fine-tuning",
      summary:
        "We pre-train LLMs and SLMs at scale with 5D parallelism, closed or open source, and fine-tune with modern techniques including JAX and Unsloth, scored against task benchmarks, not guesswork.",
    },
    {
      title: "Agentic systems & RAG",
      summary:
        "We build sophisticated multi-agent solutions and RAG pipelines on Claude Agent SDK, LangChain, LangGraph, and Codex, evaluated on traces you can audit.",
    },
  ],
  ja: [
    {
      title: "本番レベルのエンタープライズAI",
      summary:
        "既存システム、承認フロー、データ境界に合わせてAIを構築・拡張・連携・導入し、リリース前後を通じて評価します。",
    },
    {
      title: "モデルの事前学習・ファインチューニング",
      summary:
        "5D並列でLLM・SLMをクローズド・オープンソース問わず大規模に事前学習し、JAXやUnslothを含む最新技術で微調整。勘ではなくタスク評価基準で判断します。",
    },
    {
      title: "エージェントシステム・RAG",
      summary:
        "Claude Agent SDK、LangChain、LangGraph、Codexを基盤にした高度なマルチエージェントとRAGパイプラインを構築し、検証可能なトレースで評価します。",
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
      label: "01 / Models",
      title: "Pre-train & fine-tune",
      body: "LLMs and SLMs pre-trained at scale with 5D parallelism, open or closed weights, then fine-tuned with modern techniques like JAX and Unsloth, shaped to your domain, data, and latency budget.",
    },
    {
      label: "02 / Agents",
      title: "Agentic systems & RAG",
      body: "Sophisticated multi-agent solutions and RAG pipelines built on Claude Agent SDK, LangChain, LangGraph, and Codex, wired into real enterprise workflows.",
    },
    {
      label: "03 / Production",
      title: "Scale, integrate, deploy",
      body: "Enterprise AI taken to production level: high-throughput inference, secure integration with your existing systems, and deployment at scale.",
    },
    {
      label: "04 / Evals",
      title: "Evals & quality",
      body: "We are not just builders, we are experts in evaluation. Task scorecards, regression suites, and trace-driven evals that keep improving quality after launch.",
    },
    {
      label: "05 / Harness",
      title: "Harness engineering",
      body: "The control loop, tool guardrails, context management, and checkpointed recovery that let an agent run in production, with least-privilege scoping and human approval gates where risk demands it.",
    },
  ],
  ja: [
    {
      label: "01 / モデル",
      title: "事前学習・微調整",
      body: "5D並列でLLM・SLMをオープン・クローズド問わず大規模に事前学習し、JAXやUnslothなど最新技術で微調整。領域・データ・レイテンシ要件に合わせます。",
    },
    {
      label: "02 / エージェント",
      title: "エージェントシステム・RAG",
      body: "Claude Agent SDK、LangChain、LangGraph、Codexを基盤にした高度なマルチエージェントとRAGパイプラインを、実際の業務フローに組み込みます。",
    },
    {
      label: "03 / 本番運用",
      title: "拡張・連携・導入",
      body: "エンタープライズAIを本番レベルへ。高スループット推論、既存システムとの安全な連携、大規模導入までを実現します。",
    },
    {
      label: "04 / 評価",
      title: "評価と品質",
      body: "私たちは作るだけの会社ではなく、評価の専門家です。タスクスコアカード、回帰テスト、トレース解析による評価で、リリース後も品質を高め続けます。",
    },
    {
      label: "05 / ハーネス",
      title: "ハーネスエンジニアリング",
      body: "制御ループ、ツールのガードレール、コンテキスト管理、チェックポイントによる復旧まで。エージェントを本番で動かすための基盤を、最小権限のスコープとリスクに応じた人間の承認ゲートとともに構築します。",
    },
  ],
};

export const productionProofs: Record<Language, ProductionProof[]> = {
  en: [
    {
      label: "Research",
      value: "We train, not wrap",
      body: "Transformer pre-training with 5D parallelism, custom tokenizers, and fine-tuning pipelines for LLMs and SLMs.",
    },
    {
      label: "Engineering",
      value: "We own the stack",
      body: "Multi-agent orchestration down to GPU-level serving, every layer ours to tune.",
    },
    {
      label: "Production",
      value: "We serve at scale",
      body: "Inference servers with tensor and pipeline parallelism and secure deployment, hardened for real load.",
    },
  ],
  ja: [
    {
      label: "研究",
      value: "包むのではなく学習する",
      body: "5D並列によるトランスフォーマーの事前学習、カスタムトークナイザ、LLM・SLMのファインチューニング基盤。",
    },
    {
      label: "エンジニアリング",
      value: "スタックを保有する",
      body: "マルチエージェントのオーケストレーションからGPUレベルの配信まで、全層を自社で調整。",
    },
    {
      label: "本番運用",
      value: "大規模に提供する",
      body: "テンソル・パイプライン並列とセキュアな配備を備えた推論サーバーを、実負荷向けに堅牢化。",
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
    location: "Tokyo Deep-Tech AI Lab",
    heroTitle: "Trained models. Enterprise agents. Production inference",
    heroPrefix: "Enterprise AI, engineered to be",
    heroRotating: ["trained", "agentic", "secure", "reliable", "measurable"],
    heroBody:
      "A Tokyo deep-tech lab. From model weights to production, every layer our own.",
    heroStatementLabel: "What we do",
    heroStatement:
      "From transformer pre-training to high-throughput serving, we take AI from idea to production, not just a demo.",
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
    secondaryCta: "Explore our capabilities",
    fullStackLabel: "End to end",
    fullStackTitle: "We are not AI model wrappers",
    fullStackLead:
      "Most “AI companies” call someone else’s model API and wrap it in a UI. BitLabs owns the entire stack, from the GPU infrastructure to the application that runs on it. Every layer is ours to design, tune, and operate.",
    fullStackWrapperLabel: "A model wrapper",
    fullStackWrapperBody:
      "Calls a hosted model and ships a thin interface. When cost, latency, privacy, or quality breaks, there is nothing deeper to fix.",
    fullStackBitlabsLabel: "BitLabs",
    fullStackBitlabsBody:
      "Owns infrastructure, models, inference, and the application. We tune the whole system, not just the prompt, so it holds up in production.",
    fullStackLayersLabel: "The full stack",
    fullStackLayers: [
      {
        tier: "Layer 04 / Application",
        title: "Agents & applications",
        body: "The product your team actually uses: AI agents, RAG, and custom apps built around your workflow.",
      },
      {
        tier: "Layer 03 / Models",
        title: "Models",
        body: "Pre-trained from scratch with 5D parallelism or fine-tuned, open or closed source, shaped to your task and data.",
      },
      {
        tier: "Layer 02 / Inference",
        title: "Inference & serving",
        body: "High-throughput serving with tensor and pipeline parallelism: runtime, tooling, and orchestration.",
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
    labLabel: "Core capabilities",
    labTitle: "Five disciplines, done deeply",
    labBody:
      "We don't wrap someone else's API. We pre-train and fine-tune models with JAX and Unsloth, build agentic systems and RAG on Claude Agent SDK, LangChain, LangGraph, and Codex, run production inference, evaluate everything we ship, and engineer the harness that keeps agents safe to run.",
    productionLabel: "Deep tech",
    productionTitle: "We own the whole stack",
    productionBody:
      "From transformer pre-training to GPU-level serving, every layer is ours to design, tune, and operate, so it holds up in production.",
    systemMapLabel: "How we work",
    systemMapTitle: "From your problem to a deployed AI system",
    systemMapBody:
      "We map the whole path up front so the big decisions stay aligned.",
    capabilitiesLabel: "Capabilities",
    capabilitiesTitle: "What BitLabs builds",
    approachLabel: "Approach",
    approachTitle: "Start with your problem, then pick the right model and serving path",
    approachBody:
      "We shape the model, inference, and application around your actual workflow and constraints.",
    approachSteps: [
      {
        phase: "01. Workshop",
        title: "Understand the problem",
        body: "We map your workflow, systems, and constraints.",
        marker: "Discovery",
      },
      {
        phase: "02. Design",
        title: "Choose the right stack",
        body: "Model approach, inference path, and architecture.",
        marker: "Plan",
      },
      {
        phase: "03. Build",
        title: "Ship a focused MVP",
        body: "The smallest system that proves real value.",
        marker: "MVP",
      },
    ],
    approachVisualLabel: "BitLabs flow",
    approachVisualValue: "Workshop to MVP",
    approachOutcomeLabel: "Outcome",
    approachOutcomeTitle: "A clear path from problem to production AI",
    approachOutcomeBody:
      "You move forward with a system built for your environment.",
    securityLabel: "Security & Deployment",
    securityTitle: "Built for production from day one",
    securityBody:
      "We design data handling, access, and release checks into the first architecture pass.",
    securityPoints: [
      "Private or regional deployment with clear trust boundaries",
      "Controlled model access, tool use, and sensitive data handling",
      "Release checks for regulated, high-accountability environments",
    ],
    researchLabel: "Research",
    researchTitle: "The lab behind the delivery",
    researchBody:
      "Our production work is grounded in ongoing research on pre-training, fine-tuning, inference, and agent reliability.",
    researchCtaLabel: "Explore our research",
  },
  ja: {
    location: "東京のディープテックAIラボ",
    heroTitle: "学習するモデル。企業向けエージェント。本番の推論基盤",
    heroPrefix: "私たちが作る企業向けAIは、",
    heroRotating: ["学習する", "自律する", "安全な", "信頼できる", "成果を生む"],
    heroBody:
      "東京のディープテックAIラボ。モデルの重みから本番運用まで、すべての層を自分たちの手で。",
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
    secondaryCta: "対応領域を見る",
    fullStackLabel: "エンドツーエンド",
    fullStackTitle: "私たちは、AIモデルのラッパーではありません",
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
        body: "5D並列によるゼロからの事前学習、またはオープン・クローズドの微調整。用途とデータに合わせて作ります。",
      },
      {
        tier: "Layer 02 / 推論",
        title: "推論・配信",
        body: "テンソル・パイプライン並列による高スループット配信。ランタイム、ツール、オーケストレーションまで。",
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
    labLabel: "中核領域",
    labTitle: "5つの領域を、深く",
    labBody:
      "他社APIを包むだけではありません。JAXやUnslothでモデルを事前学習・微調整し、Claude Agent SDK、LangChain、LangGraph、Codexでエージェントシステムを構築し、本番推論を運用し、出荷するすべてを評価し、そしてエージェントを安全に動かすハーネスを設計します。",
    productionLabel: "ディープテック",
    productionTitle: "スタック全体を自社で保有",
    productionBody:
      "トランスフォーマーの事前学習からGPUレベルの配信まで、すべての層を自分たちで設計・調整・運用し、本番で通用させます。",
    systemMapLabel: "進め方",
    systemMapTitle: "課題から、導入済みのAIシステムまで",
    systemMapBody:
      "実装前に全体の道筋を描き、重要な判断をぶれさせません。",
    capabilitiesLabel: "対応領域",
    capabilitiesTitle: "BitLabsが構築するもの",
    approachLabel: "進め方",
    approachTitle: "まず課題を捉え、最適なモデルと推論経路を選びます",
    approachBody:
      "実際の業務フローと制約に合わせて、モデル、推論、アプリ構成を組み立てます。",
    approachSteps: [
      {
        phase: "01. ワークショップ",
        title: "課題を理解する",
        body: "業務フロー、既存システム、制約を整理します。",
        marker: "課題整理",
      },
      {
        phase: "02. 設計",
        title: "最適な構成を選ぶ",
        body: "モデル方針、推論経路、アーキテクチャを決めます。",
        marker: "設計",
      },
      {
        phase: "03. 構築",
        title: "価値検証用のMVPを作る",
        body: "価値を確認できる最小構成を構築します。",
        marker: "MVP",
      },
    ],
    approachVisualLabel: "進行フロー",
    approachVisualValue: "課題整理からMVPへ",
    approachOutcomeLabel: "進行結果",
    approachOutcomeTitle: "課題から本番AIまでの道筋を明確にする",
    approachOutcomeBody:
      "環境に合う形で、次の開発判断へ無理なく進めます。",
    securityLabel: "セキュリティと配備",
    securityTitle: "最初から本番前提で設計します",
    securityBody:
      "データ取り扱い、アクセス、リリース確認を初期設計から組み込みます。",
    securityPoints: [
      "プライベート／リージョン配備と明確な信頼境界",
      "モデル利用、ツール実行、機密データの統制",
      "説明責任が求められる環境向けのリリース確認",
    ],
    researchLabel: "研究",
    researchTitle: "デリバリーを支えるラボ",
    researchBody:
      "私たちの本番開発は、事前学習、ファインチューニング、推論、エージェント信頼性に関する継続的な研究に支えられています。",
    researchCtaLabel: "研究内容を見る",
  },
};

export const aboutContent: Record<Language, AboutContent> = {
  en: {
    metadataTitle: "About",
    metadataDescription: "Company profile for BitLabs, a Tokyo-based AI research and engineering lab.",
    eyebrow: "About",
    title: "A Tokyo AI research and engineering lab",
    body:
      "We are a small team with deep model and infrastructure expertise. We help companies that need real AI built and shipped, not just advised.",
    profileLabel: "Corporate Information",
    profileTitle: "Company profile",
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
    banksLabel: "Banking Partners",
    banks: ["Sumitomo Mitsui Banking Corporation (SMBC)", "GMO Aozora Net Bank"],
  },
  ja: {
    metadataTitle: "会社情報",
    metadataDescription: "東京拠点のAI研究開発・エンジニアリングラボ、BitLabsの会社概要です。",
    eyebrow: "会社情報",
    title: "東京のAI研究開発・エンジニアリングラボです",
    body:
      "モデルと基盤に深い専門性を持つ少数精鋭のチームです。助言だけでなく、実際のAIを構築し本番まで届けます。",
    profileLabel: "会社情報",
    profileTitle: "会社プロフィール",
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
    banksLabel: "取引銀行",
    banks: ["三井住友銀行", "GMOあおぞらネット銀行"],
  },
};

export const careerContent: Record<Language, CareerContent> = {
  en: {
    metadataTitle: "Careers",
    metadataDescription:
      "BitLabs is expanding its Tokyo AI lab. We're hiring AI Engineers and AI Researchers who are passionate about building and training production AI systems.",
    eyebrow: "Careers",
    title: "We're expanding our team",
    body:
      "BitLabs is growing, and we're looking for people who are genuinely passionate and enthusiastic about AI, not just interested in the label. If you want to train models, build agents, and ship real production systems, we want to hear from you.",
    whyLabel: "Why BitLabs",
    whyTitle: "Work on the whole stack, not a thin wrapper",
    whyPoints: [
      "Own real problems end to end, from model weights to production deployment",
      "Work alongside a small, senior team with deep model and infrastructure expertise",
      "Ship systems that reach production, not demos left on a shelf",
      "Research and engineering under one roof, in the heart of Tokyo",
    ],
    rolesLabel: "Open roles",
    rolesTitle: "AI Engineer & AI Researcher",
    rolesBody:
      "We're hiring across engineering and research. Both roles work closely together, so the lines blur by design.",
    focusLabel: "What you'll focus on",
    roles: [
      {
        title: "AI Engineer",
        type: "Full-time / Contract",
        location: "Tokyo, Japan",
        summary:
          "Build and ship the agentic systems, RAG pipelines, and inference stacks our clients run in production.",
        focus: [
          "Design and build agentic systems and RAG pipelines on modern frameworks",
          "Build and operate high-throughput inference and serving infrastructure",
          "Integrate AI systems securely into enterprise environments",
          "Write evaluation harnesses that keep quality honest release after release",
        ],
      },
      {
        title: "AI Researcher",
        type: "Full-time / Contract",
        location: "Tokyo, Japan",
        summary:
          "Push our model training and fine-tuning work forward, and turn promising ideas into systems we can ship.",
        focus: [
          "Pre-train and fine-tune LLMs and SLMs, open or closed source",
          "Research transformer architecture, training efficiency, and evaluation",
          "Prototype ideas as PoCs and prove them before they reach production",
          "Publish internal lab notes that inform what we build next",
        ],
      },
    ],
    applyLabel: "Apply",
    applyTitle: "Passionate about AI? Let's talk",
    applyBody:
      "Email us your background, what you've built, and why AI is what you want to spend your time on. Attach your CV, tell us which role fits, or if you're not sure, tell us anyway.",
    applyEmail: "david@bitlabs.site",
    applyCtaLabel: "Email your application",
  },
  ja: {
    metadataTitle: "採用情報",
    metadataDescription:
      "BitLabsは東京のAIラボとしてチームを拡大しています。本番AIシステムの構築・学習に情熱を持つAIエンジニア・AIリサーチャーを募集中です。",
    eyebrow: "採用情報",
    title: "チームを拡大しています",
    body:
      "BitLabsは成長中です。肩書きとしてのAIに興味があるだけでなく、AIそのものに情熱と熱意を持つ方を探しています。モデルを学習し、エージェントを構築し、実際に本番で動くシステムを届けたい方からのご連絡をお待ちしています。",
    whyLabel: "BitLabsで働く理由",
    whyTitle: "薄いラッパーではなく、スタック全体に関わる",
    whyPoints: [
      "モデルの重みから本番導入まで、実際の課題を一貫して担当できる",
      "モデルと基盤に深い専門性を持つ少数精鋭のチームと働ける",
      "デモで終わらせず、本番で動くシステムを届けられる",
      "研究とエンジニアリングを一つのチームで、東京の中心で行える",
    ],
    rolesLabel: "募集職種",
    rolesTitle: "AIエンジニア・AIリサーチャー",
    rolesBody: "エンジニアリングと研究の両面で採用しています。両職種は密接に連携するため、境界はあえて明確にしていません。",
    focusLabel: "主な業務内容",
    roles: [
      {
        title: "AIエンジニア",
        type: "正社員・業務委託",
        location: "東京都",
        summary: "クライアントが本番で運用するエージェントシステム、RAGパイプライン、推論基盤を構築・出荷します。",
        focus: [
          "最新フレームワークによるエージェントシステム・RAGパイプラインの設計・構築",
          "高スループット推論・配信基盤の構築と運用",
          "AIシステムをエンタープライズ環境へ安全に統合",
          "リリースのたびに品質を担保する評価ハーネスの構築",
        ],
      },
      {
        title: "AIリサーチャー",
        type: "正社員・業務委託",
        location: "東京都",
        summary: "モデルの学習・微調整に関する研究を前進させ、有望なアイデアを出荷できるシステムへ変える。",
        focus: [
          "オープン・クローズド問わずLLM・SLMの事前学習・微調整",
          "トランスフォーマー設計、学習効率、評価手法の研究",
          "アイデアをPoCとして検証し、本番投入前に効果を確認",
          "社内ラボノートを公開し、次に構築するものの指針とする",
        ],
      },
    ],
    applyLabel: "応募",
    applyTitle: "AIに情熱がある方、ぜひご連絡ください",
    applyBody:
      "これまでの経歴、作ってきたもの、AIに時間を注ぎたい理由をメールでお送りください。履歴書・職務経歴書（CV）を添付し、希望する職種を教えてください。迷っている場合もお気軽にご連絡ください。",
    applyEmail: "david@bitlabs.site",
    applyCtaLabel: "応募メールを送る",
  },
};

export const servicesPageContent: Record<Language, ServicesPageContent> = {
  en: {
    metadataTitle: "Services",
    metadataDescription:
      "BitLabs services: production-level enterprise AI, LLM/SLM pre-training and fine-tuning with JAX and Unsloth, agentic systems and RAG on Claude Agent SDK, LangChain, LangGraph, and Codex, inference stacks, custom AI apps, and evaluation and reliability engineering.",
    eyebrow: "Services",
    title: "Deep-tech AI, built, trained, evaluated, and shipped to production",
    body:
      "We build, scale, integrate, and deploy enterprise AI at production level. We pre-train and fine-tune the models, build the agents, and evaluate everything before it ships, not just once, but release after release.",
    ctaTitle: "Have a model to train or an agent to ship?",
    ctaBody:
      "Tell us your goal and constraints, and we'll reply with a practical next step within one business day.",
    ctaLabel: "Talk to BitLabs",
  },
  ja: {
    metadataTitle: "サービス",
    metadataDescription:
      "BitLabsのサービス。本番レベルのエンタープライズAI、JAXとUnslothによるLLM・SLMの事前学習・ファインチューニング、Claude Agent SDK、LangChain、LangGraph、Codexによるエージェントシステムとの RAG、推論基盤、カスタムAIアプリ、評価・信頼性エンジニアリング。",
    eyebrow: "サービス",
    title: "ディープテックAIを、構築し、学習させ、評価し、本番へ届ける",
    body:
      "エンタープライズAIを本番レベルで構築・拡張・連携・導入します。モデルを自ら事前学習・微調整し、エージェントを構築し、出荷前だけでなくリリースのたびに評価し続けます。",
    ctaTitle: "学習させたいモデル、本番に載せたいエージェントはありますか？",
    ctaBody:
      "目標と制約をお知らせください。1営業日以内に、現実的な次の一歩をご提案します。",
    ctaLabel: "BitLabsに相談する",
  },
};

export const homePlatforms: Record<Language, HomePlatformsContent> = {
  en: {
    eyebrow: "Platforms",
    title: "Experts in enterprise AI, on the platforms you run",
    body:
      "We build and deploy on Microsoft Azure, AWS, Anthropic, and OpenAI, matching the model and infrastructure to what your enterprise already relies on.",
    ctaLabel: "Talk to us",
    platforms: [
      { name: "Microsoft Azure", src: "/images/logos/azure.svg" },
      { name: "AWS", src: "/images/logos/aws.svg" },
      { name: "Anthropic", src: "/images/logos/anthropic.svg" },
      { name: "OpenAI", src: "/images/logos/openai.svg" },
    ],
  },
  ja: {
    eyebrow: "プラットフォーム",
    title: "お使いの基盤の上で、エンタープライズAIを深く実装する",
    body:
      "Microsoft Azure、AWS、Anthropic、OpenAIの上に構築・展開し、貴社が既に依拠するモデルとインフラに合わせて設計します。",
    ctaLabel: "お問い合わせ",
    platforms: [
      { name: "Microsoft Azure", src: "/images/logos/azure.svg" },
      { name: "AWS", src: "/images/logos/aws.svg" },
      { name: "Anthropic", src: "/images/logos/anthropic.svg" },
      { name: "OpenAI", src: "/images/logos/openai.svg" },
    ],
  },
};

export const expertisePageContent: Record<Language, ExpertisePageContent> = {
  en: {
    metadataTitle: "Expertise",
    metadataDescription:
      "BitLabs expertise: production-level enterprise AI, LLM/SLM pre-training and fine-tuning with JAX and Unsloth, agentic systems and RAG on Claude Agent SDK, LangChain, LangGraph, and Codex, and evaluation to keep improving quality.",
    eyebrow: "Expertise",
    title: "Deep-tech AI expertise, from model weights to production",
    body:
      "BitLabs goes deep on model training with JAX and Unsloth, agentic systems and RAG on Claude Agent SDK, LangChain, LangGraph, and Codex, and production-level enterprise deployment. We are not just builders. We are experts in evaluation, and we use it to keep improving quality after launch.",
  },
  ja: {
    metadataTitle: "専門領域",
    metadataDescription:
      "BitLabsの専門領域。本番レベルのエンタープライズAI、JAXとUnslothによるLLM・SLMの事前学習・ファインチューニング、Claude Agent SDK、LangChain、LangGraph、CodexによるエージェントシステムとRAG、そして品質を高め続ける評価。",
    eyebrow: "専門領域",
    title: "モデルの重みから本番運用まで、ディープテックの専門性",
    body:
      "BitLabsはJAXとUnslothによるモデル学習、Claude Agent SDK、LangChain、LangGraph、Codexによるエージェントシステム・RAG、そして本番レベルのエンタープライズ導入を深く掘り下げます。私たちは作るだけの会社ではなく、評価の専門家です。出荷後も評価を通じて品質を高め続けます。",
  },
};

export const researchContent: Record<Language, ResearchContent> = {
  en: {
    metadataTitle: "Research",
    metadataDescription:
      "BitLabs research across transformer architecture, pre-training, fine-tuning, 5D parallelism, inference, and reliability for production AI.",
    eyebrow: "Research",
    title: "Research that makes AI work in production",
    body:
      "We research transformer models, inference, and agent reliability, and prove ideas with PoCs before they reach production.",
    labLabel: "Public Lab Notes",
    labTitle: "We separate promising ideas from systems that actually ship",
    focusLabel: "Focus",
    methodLabel: "Method",
    signalLabel: "Signal",
    inferenceLabel: "Model & inference research",
    inferenceTitle: "We study the model and the serving layer together",
    inferencePoints: [
      "How transformer architecture choices affect quality and cost.",
      "How 5D parallelism makes large-model training and serving efficient.",
      "How serving limits should shape model choice before the build.",
    ],
    reliabilityLabel: "Reliability",
    reliabilityTitle: "Production trust has to be earned with evidence",
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
    title: "AIを本番で動かすための研究",
    body:
      "トランスフォーマーモデル、推論、エージェントの信頼性を研究し、本番投入の前にPoCで検証します。",
    labLabel: "公開ラボノート",
    labTitle: "有望なアイデアと、実際に本番へ届く仕組みを切り分けます",
    focusLabel: "焦点",
    methodLabel: "方法",
    signalLabel: "確認する兆候",
    inferenceLabel: "モデル・推論研究",
    inferenceTitle: "モデル設計と配信層の両方を研究します",
    inferencePoints: [
      "トランスフォーマー設計の選択が品質とコストにどう影響するか。",
      "5D並列が大規模モデルの学習と提供をどう効率化するか。",
      "配信制約がモデル選定にどう影響すべきか。",
    ],
    reliabilityLabel: "信頼性",
    reliabilityTitle: "本番での信頼は、根拠を持って積み上げるものです",
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
    title: "Tell us what you want to build",
    body:
      "Reach out if you need to train or fine-tune a model, scale up inference, or build an AI agent or RAG system. Share your goal and constraints, and we'll reply with a practical next step.",
    emailLabel: "Email",
    emailAddress: "david@bitlabs.site",
    emailHelper: "Send your inquiry directly to this address, including your goal, constraints, and any timeline.",
    emailCtaLabel: "Send inquiry",
    locationLabel: "Location",
    responseLabel: "Typical response",
    responseTime: "Within 1 business day",
  },
  ja: {
    metadataTitle: "お問い合わせ",
    metadataDescription:
      "モデル学習、ファインチューニング、推論基盤、AIエージェント、RAG、本番導入についてBitLabsへお問い合わせください。",
    eyebrow: "お問い合わせ",
    title: "作りたいものをお聞かせください",
    body:
      "モデルの学習・微調整、推論のスケール、AIエージェントやRAGの構築をご検討中ならご相談ください。目標と制約をお知らせいただければ、現実的な次の一歩をご提案します。",
    emailLabel: "メール",
    emailAddress: "david@bitlabs.site",
    emailHelper: "目標や制約、ご希望のスケジュールを添えて、こちらのアドレスへ直接お問い合わせください。",
    emailCtaLabel: "問い合わせを送信",
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
    error: "Something went wrong sending your inquiry. Please try again or email us directly.",
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
    error: "送信中にエラーが発生しました。もう一度お試しいただくか、直接メールでご連絡ください。",
    helper: "勤務先メールアドレスをご利用ください。簡易的なスパム対策を入れています。",
  },
};

export const applicationFormContent: Record<Language, ApplicationFormContent> = {
  en: {
    nameLabel: "Name",
    emailLabel: "Email",
    roleLabel: "Role",
    rolePlaceholder: "Select a role",
    messageLabel: "Tell us about yourself",
    resumeLabel: "Resume / CV (optional)",
    resumeHint: "PDF, DOC, or DOCX — up to 5MB.",
    nameError: "Please enter your name.",
    emailError: "Please enter a valid email address.",
    roleError: "Please select a role.",
    messageError: "Please provide at least 20 characters.",
    resumeError: "Please upload a PDF, DOC, or DOCX file under 5MB.",
    honeypotError: "Invalid submission.",
    submitIdle: "Submit application",
    submitBusy: "Sending...",
    success: "Your application has been received. We usually reply within one business day.",
    error: "Something went wrong sending your application. Please try again or email us directly.",
    helper: "Include your background, what you've built, and why AI is what you want to work on.",
  },
  ja: {
    nameLabel: "氏名",
    emailLabel: "メールアドレス",
    roleLabel: "希望職種",
    rolePlaceholder: "職種を選択してください",
    messageLabel: "自己紹介",
    resumeLabel: "履歴書・職務経歴書（任意）",
    resumeHint: "PDF、DOC、DOCX形式、5MBまで。",
    nameError: "氏名を入力してください。",
    emailError: "有効なメールアドレスを入力してください。",
    roleError: "希望職種を選択してください。",
    messageError: "20文字以上でご記入ください。",
    resumeError: "PDF、DOC、DOCX形式で5MB以下のファイルをアップロードしてください。",
    honeypotError: "無効な送信です。",
    submitIdle: "応募する",
    submitBusy: "送信中...",
    success: "ご応募を受け付けました。通常1営業日以内にご返信します。",
    error: "送信中にエラーが発生しました。もう一度お試しいただくか、直接メールでご連絡ください。",
    helper: "経歴、これまでに作られたもの、AIに取り組みたい理由をお聞かせください。",
  },
};

export const chatContent: Record<Language, ChatContent> = {
  en: {
    openLabel: "Adam Consultant",
    dialogLabel: "Adam chat",
    title: "Adam Consultant",
    subtitle: "",
    closeLabel: "Close chat",
    intro: "Hi, I'm Adam. Ask about BitLabs: model training, inference, AI agents, or your production AI plans.",
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
