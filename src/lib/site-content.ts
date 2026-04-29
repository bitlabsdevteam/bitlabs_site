export type Language = "en" | "ja";

type NavLink = {
  href: string;
  label: string;
};

type Service = {
  title: string;
  problem: string;
  delivery: string;
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

type ProductionProof = {
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
  primaryCta: string;
  secondaryCta: string;
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
  deliveryLabel: string;
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
      title: "Production AI Agent Applications",
      problem:
        "A business idea only matters when it becomes a workflow people can use, measure, and trust.",
      delivery:
        "We turn CEO objectives and team KPIs into focused MVPs, then harden the best workflows into production-level agentic applications.",
      outcome:
        "Your team gets an AI agent system aligned to business goals, integrated with real tools, and ready for controlled rollout.",
    },
    {
      title: "Enterprise AI Architecture",
      problem:
        "Many AI initiatives stall because the use case, data boundary, system integration, and ownership model are not designed together.",
      delivery:
        "We define the architecture, integration shape, control boundaries, and delivery path required to move from idea to dependable AI capability.",
      outcome:
        "Leadership gets a practical build plan that connects technical decisions directly to KPIs, risk controls, and operating responsibility.",
    },
    {
      title: "LLM / SLM Pre-training & Fine-tuning",
      problem:
        "General-purpose models often miss domain nuance, latency targets, controllability requirements, or deployment constraints that matter in production.",
      delivery:
        "We build model adaptation programs spanning data design, training strategy, fine-tuning pipelines, evaluation suites, and infrastructure for repeatable iteration.",
      outcome:
        "Teams get model systems that are more relevant to their domain, easier to steer, and better suited to production-grade reliability targets.",
    },
    {
      title: "Custom AI Applications",
      problem:
        "Most AI demos break when they meet real workflows, real users, and the operational edge cases that product teams have to own.",
      delivery:
        "We build custom React + AI applications with prompt design, context architecture, evaluation harnesses, and backend integration patterns shaped for daily use.",
      outcome:
        "Users get AI products that fit real operating workflows instead of isolated prototypes that cannot survive production use.",
    },
    {
      title: "Secure Cloud Deployment",
      problem:
        "AI systems need stronger deployment discipline than ordinary demos because they touch data, tools, permissions, and business decisions.",
      delivery:
        "We design secure deployment paths with explicit trust boundaries, environment separation, observability, access control, and release criteria.",
      outcome:
        "Teams can launch AI applications with clearer operational control, safer integrations, and a maintainable path for improvement.",
    },
  ],
  ja: [
    {
      title: "本番向けAIエージェントアプリケーション",
      problem:
        "AIのアイデアは、現場で使われ、測定され、信頼できる業務フローになって初めて価値になります。",
      delivery:
        "CEOの目標や部門KPIから逆算し、まずMVPを構築し、有効なワークフローを本番レベルのエージェントアプリへ育てます。",
      outcome:
        "実業務のツールと接続され、事業目標に沿って運用できるAIエージェントシステムを実現します。",
    },
    {
      title: "エンタープライズAIソリューション",
      problem:
        "多くの企業では、AIの活用可能性は見えていても、既存システム連携、統制、運用責任を見据えた設計まで落とし込めずPoCで止まります。",
      delivery:
        "BitLabsは、本番運用を前提に、システム連携、権限境界、可観測性、ガバナンスを含むエンタープライズAIアーキテクチャを設計します。",
      outcome:
        "事業要件と技術要件が分断されない導入計画をつくり、複数部門に展開可能なAI基盤へつなげます。",
    },
    {
      title: "LLM/SLMの事前学習・ファインチューニング",
      problem:
        "汎用モデルでは、業務固有の知識、応答制御、遅延要件、配備制約に十分対応できない場合があります。",
      delivery:
        "ドメイン特性に合わせて、学習戦略、データ設計、ファインチューニング基盤、評価スイート、継続改善の実験基盤を構築します。",
      outcome:
        "業務に適した関連性、制御性、運用品質を備えたモデルシステムへ段階的に高めていきます。",
    },
    {
      title: "カスタムAIアプリケーション",
      problem:
        "AIの価値は単発デモでは定着せず、現場の業務フロー、例外処理、既存システムに組み込まれて初めて継続利用されます。",
      delivery:
        "ReactとAIを組み合わせ、プロンプト設計、コンテキスト設計、評価ハーネス、バックエンド連携まで含めた専用アプリケーションを開発します。",
      outcome:
        "業務に適合し、継続運用しやすいAIプロダクトとして現場定着を支援します。",
    },
    {
      title: "セキュアクラウドデプロイメント",
      problem:
        "AIシステムはデータ、ツール権限、業務判断に関わるため、通常のデモ以上に慎重な配備設計が必要です。",
      delivery:
        "信頼境界、環境分離、可観測性、アクセス制御、リリース基準を含むセキュアな導入経路を設計します。",
      outcome:
        "安全な連携、明確な運用統制、継続改善しやすい構成でAIアプリケーションを展開できます。",
    },
  ],
};

export const expertiseAreas: Record<Language, ExpertiseArea[]> = {
  en: [
    {
      title: "AI system design for business-critical environments",
      summary:
        "We translate messy operational realities into system designs that make technical sense, commercial sense, and governance sense at the same time.",
      points: [
        "Map business constraints into architectures that teams can implement and sustain.",
        "Prioritize AI interventions that improve throughput, quality, risk control, or decision speed.",
        "Design delivery around existing systems, approval paths, and operational ownership.",
      ],
    },
    {
      title: "Inference engineering with GPU parallelism",
      summary:
        "We design serving systems that use GPU parallelism deliberately, balancing latency, throughput, memory pressure, and operating cost.",
      points: [
        "Shape tensor, pipeline, data, sequence, and expert parallelism for model size, traffic pattern, and latency target.",
        "Optimize inference paths around batching, KV cache behavior, GPU memory limits, and interconnect communication.",
        "Carry serving decisions into observability, capacity planning, failover, security, and maintainable operations.",
      ],
    },
  ],
  ja: [
    {
      title: "重要業務を前提にしたAIシステム設計",
      summary:
        "複雑な事業課題を、技術的にも事業的にも無理のないAIシステム設計へ落とし込み、実装と運用の両立を支援します。",
      points: [
        "事業制約を整理し、実装と運用まで見据えたアーキテクチャに変換します。",
        "意思決定速度、品質、リスク管理、コスト構造に効く適用領域を見極めます。",
        "既存組織、既存システム、承認フローに合う導入計画を設計します。",
      ],
    },
    {
      title: "GPU並列化による推論エンジニアリング",
      summary:
        "レイテンシ、スループット、GPUメモリ、運用コストのバランスを取りながら、GPU並列化を前提にした推論基盤を設計します。",
      points: [
        "モデルサイズ、トラフィック特性、遅延要件に合わせて、テンソル、パイプライン、データ、シーケンス、エキスパート並列を設計します。",
        "バッチング、KVキャッシュ、GPUメモリ上限、GPU間通信を考慮して推論経路を最適化します。",
        "推論基盤の判断を、可観測性、容量計画、フェイルオーバー、セキュリティ、運用保守まで接続します。",
      ],
    },
  ],
};

export const researchTracks: Record<Language, string[]> = {
  en: [
    "SLM architecture design and training-efficiency research for deployment-constrained environments.",
    "Fine-tuning and domain-adaptation methods for model behavior that needs tighter control in production.",
    "Bias detection, steerability, and intervention methods for safer and more predictable model behavior.",
    "Orchestration, memory design, and reliability boundaries for agentic systems operating across tools and human review.",
    "Evaluation, robustness, and lifecycle governance for production-grade model systems.",
  ],
  ja: [
    "配備制約の大きい環境を前提にしたSLMアーキテクチャ設計と学習効率の研究",
    "本番環境での制御性を高めるためのファインチューニングとドメイン適応の研究",
    "LLM出力の暗黙的バイアス検出と、挙動をより予測可能にする介入手法の研究",
    "ツール実行や人の確認を含むエージェント型システムのオーケストレーション、メモリ設計、信頼性境界の研究",
    "本番品質のモデルシステムに向けた評価、堅牢性、ライフサイクルガバナンス",
  ],
};

export const principles: Record<Language, string[]> = {
  en: [
    "Technical rigor over AI theater",
    "Security and control designed in from the first architecture pass",
    "Research translated into deployable systems",
    "Measured outcomes over inflated claims",
  ],
  ja: [
    "流行語より技術的な整合性を重視する",
    "セキュリティと統制を最初の設計から組み込む",
    "研究を実装可能な価値へ変換する",
    "誇張ではなく測定可能な成果で示す",
  ],
};

export const teamStrengths: Record<Language, string[]> = {
  en: [
    "AI system architecture for enterprise environments",
    "LLM pre-training, fine-tuning, and evaluation infrastructure",
    "SLM design and training from scratch",
    "Prompt design, context engineering, and agent orchestration",
    "Secure cloud deployment patterns for model systems",
    "Custom implementation across OpenClaw and adjacent AI stacks",
  ],
  ja: [
    "エンタープライズ環境におけるAIシステムアーキテクチャ設計",
    "LLMの事前学習、ファインチューニング、評価基盤の構築",
    "SLMのゼロからの設計と学習",
    "プロンプト設計、コンテキスト設計、エージェントオーケストレーション",
    "モデルシステム向けのセキュアなクラウドデプロイ設計",
    "OpenClawを含むAIスタックのカスタム実装",
  ],
};

export const labCapabilities: Record<Language, LabCapability[]> = {
  en: [
    {
      label: "01 / Agents",
      title: "Agent architecture",
      body:
        "Tool permissions, memory strategy, orchestration, escalation paths, and review loops designed for accountable operations.",
    },
    {
      label: "02 / Models",
      title: "LLM and SLM engineering",
      body:
        "Training strategy, fine-tuning pipelines, domain adaptation, evaluation harnesses, and deployment constraints handled as one system.",
    },
    {
      label: "03 / Enterprise",
      title: "Agentic application engineering",
      body:
        "CEO KPI alignment, MVP delivery, system integration, and production hardening for real business workflows.",
    },
    {
      label: "04 / Reliability",
      title: "Evaluation-first development",
      body:
        "Quality, latency, safety, tool behavior, and failure modes measured before a system is treated as production-ready.",
    },
  ],
  ja: [
    {
      label: "01 / エージェント",
      title: "AIエージェント設計",
      body:
        "ツール権限、メモリ設計、オーケストレーション、エスカレーション、人による確認工程を運用責任と合わせて設計します。",
    },
    {
      label: "02 / モデル",
      title: "LLM・SLMエンジニアリング",
      body:
        "学習戦略、ファインチューニング、ドメイン適応、評価ハーネス、配備制約を一つのシステムとして扱います。",
    },
    {
      label: "03 / 企業導入",
      title: "エージェント型アプリ開発",
      body:
        "CEOのKPIに合わせたMVP構築、システム連携、本番運用に向けた品質強化まで支援します。",
    },
    {
      label: "04 / 信頼性",
      title: "評価を前提にした開発",
      body:
        "品質、遅延、安全性、ツール挙動、障害モードを測定し、本番運用に進める条件を明確にします。",
    },
  ],
};

export const productionProofs: Record<Language, ProductionProof[]> = {
  en: [
    {
      label: "Research",
      value: "Model behavior",
      body: "Study control surfaces, adaptation methods, and the limits of agentic workflows.",
    },
    {
      label: "Architecture",
      value: "System boundaries",
      body: "Translate business constraints into model, data, tool, and deployment boundaries.",
    },
    {
      label: "Implementation",
      value: "Working systems",
      body: "Build focused MVPs, custom AI applications, and integration layers with measurable learning goals.",
    },
    {
      label: "Operation",
      value: "Reliable rollout",
      body: "Connect release criteria, observability, governance, and continuous improvement.",
    },
  ],
  ja: [
    {
      label: "研究",
      value: "モデル挙動",
      body: "制御性、適応手法、エージェント型ワークフローの限界と可能性を検証します。",
    },
    {
      label: "設計",
      value: "システム境界",
      body: "事業制約を、モデル、データ、ツール、配備の境界設計へ落とし込みます。",
    },
    {
      label: "実装",
      value: "動くシステム",
      body: "MVP、専用AIアプリ、連携基盤を、検証すべき学習目標とともに構築します。",
    },
    {
      label: "運用",
      value: "信頼できる展開",
      body: "リリース基準、可観測性、ガバナンス、継続改善を接続します。",
    },
  ],
};

export const deliverySteps: Record<Language, DeliveryStep[]> = {
  en: [
    {
      phase: "01. Discovery",
      detail: "We align on operating constraints, data boundaries, failure tolerance, and the metrics that will define success.",
    },
    {
      phase: "02. Design",
      detail: "We define model approach, orchestration, evaluation strategy, security controls, and integration shape as one system.",
    },
    {
      phase: "03. Implementation",
      detail: "We build iteratively with evaluation loops, traceability, and enterprise controls integrated from the start.",
    },
    {
      phase: "04. Operations",
      detail: "We move into production with observability, governance checks, and a continuous path for model and workflow improvement.",
    },
  ],
  ja: [
    {
      phase: "01. 現状整理",
      detail: "業務制約、データ境界、許容できる失敗範囲、評価指標を明確化します。",
    },
    {
      phase: "02. 設計",
      detail: "モデル方針、オーケストレーション、評価設計、セキュリティ、連携構成を一体で定義します。",
    },
    {
      phase: "03. 実装",
      detail: "評価ループ、トレーサビリティ、エンタープライズ統制を組み込みながら段階的に構築します。",
    },
    {
      phase: "04. 運用",
      detail: "可観測性、ガバナンス確認、継続改善の仕組みとともに本番運用へ移行します。",
    },
  ],
};

export const footerContent: Record<Language, FooterContent> = {
  en: {
    summary:
      "Tokyo-based AI R&D and engineering company building agent systems, model infrastructure, and secure production deployments.",
    location: "Tokyo, Japan",
    email: "hello@bitlabs.site",
    copyright: "All rights reserved.",
    socialAriaLabel: (name) => `View BitLabs on ${name}`,
  },
  ja: {
    summary:
      "東京を拠点とするAI研究開発・エンジニアリング企業。AIエージェント、モデル基盤、セキュアな本番導入を設計・実装します。",
    location: "東京、日本",
    email: "hello@bitlabs.site",
    copyright: "無断転載・無断使用を禁じます。",
    socialAriaLabel: (name) => `BitLabsの${name}を見る`,
  },
};

export const homeContent: Record<Language, HomeContent> = {
  en: {
    location: "Production AI Agents and Inference Engineering / Tokyo, Japan",
    heroTitle: "Deep AI and LLM systems, built from idea to production.",
    heroBody:
      "BitLabs designs, develops, and integrates AI agents, LLM workflows, inference systems, and secure AI applications that move from MVP to real users and measurable KPIs.",
    heroStatementLabel: "MVP to production",
    heroStatement:
      "We combine AI research, agent architecture, inference engineering, evaluation, and product implementation so technical decisions stay connected to business outcomes.",
    primaryCta: "Talk to BitLabs",
    secondaryCta: "Explore expertise",
    missionLabel: "Mission",
    missionBody:
      "Turn serious AI research into dependable systems that create measurable business value under real operational constraints.",
    missionAttribution: "- BitLabs CEO David Bong",
    visionLabel: "Vision",
    visionBody:
      "Build a future where technically rigorous AI systems can be deployed with the same discipline expected of critical production infrastructure.",
    visionAttribution: "- BitLabs CEO David Bong",
    labLabel: "Expert Lab",
    labTitle: "Specialized AI capability for agents, model systems, inference, and secure deployment.",
    labBody:
      "BitLabs is built for organizations that need a technical build partner, not a generic AI consultant. We define the AI product path, build the application layer, engineer the model and inference layer, and prepare the system for controlled use.",
    productionLabel: "Research to Production",
    productionTitle: "From idea to MVP, then production.",
    productionBody:
      "Our work does not stop at recommendations. We turn promising ideas into MVPs, validate them against user value and CEO-level KPIs, then harden the winners for production deployment.",
    capabilitiesLabel: "Capabilities",
    capabilitiesTitle: "What BitLabs builds for customers.",
    approachLabel: "Approach",
    approachTitle: "We start with the problem, then design the right path to an MVP.",
    approachBody:
      "BitLabs does not force a prepackaged AI solution onto client teams. We begin with a working session to understand pain points, systems, constraints, and success criteria. From there, we curate the best-fit approach and move into focused MVP development.",
    approachSteps: [
      {
        phase: "01. Workshop",
        title: "Understand the pain points in operational detail.",
        body: "We map business friction, system dependencies, data boundaries, and the failure tolerance that will shape the solution.",
        marker: "Pain points",
      },
      {
        phase: "02. Solution Design",
        title: "Curate the best-fit solution before building.",
        body: "We define the right architecture, model approach, workflow design, and control boundaries instead of defaulting to generic AI patterns.",
        marker: "Best-fit proposal",
      },
      {
        phase: "03. MVP Development",
        title: "Build a focused MVP with clear learning goals.",
        body: "We implement the smallest credible system that can validate technical fit, user value, and the path toward production deployment.",
        marker: "Focused MVP",
      },
    ],
    approachVisualLabel: "BitLabs flow",
    approachVisualValue: "Workshop to MVP",
    approachOutcomeLabel: "Outcome",
    approachOutcomeTitle: "A clearer, lower-risk path from pain point to production-ready AI.",
    approachOutcomeBody:
      "Clients move forward with a solution shaped around their environment, not around hype or generic demos.",
    securityLabel: "Security & Deployment",
    securityTitle: "Production AI starts with architecture, control boundaries, and evaluation.",
    securityBody:
      "BitLabs treats security, access control, data handling, and release evaluation as core parts of system design, not cleanup work after a prototype is already built.",
    securityPoints: [
      "Deployment architectures designed with private infrastructure options and explicit trust boundaries",
      "Policy-led integration patterns for model access, tool use, and data handling",
      "Evaluation and release criteria shaped for regulated or high-accountability environments",
    ],
  },
  ja: {
    location: "本番AIエージェント・推論エンジニアリング / 東京",
    heroTitle: "Deep AIとLLMシステムを、アイデアから本番へ。",
    heroBody:
      "BitLabsは、AIエージェント、LLMワークフロー、推論基盤、セキュアなAIアプリケーションを設計・開発・統合し、MVPから実ユーザーとKPIで検証できる本番システムへ育てます。",
    heroStatementLabel: "MVPから本番へ",
    heroStatement:
      "AI研究、エージェント設計、推論エンジニアリング、評価、プロダクト実装を組み合わせ、技術判断を事業成果に接続します。",
    primaryCta: "BitLabsに相談する",
    secondaryCta: "専門領域を見る",
    missionLabel: "ミッション",
    missionBody:
      "高度なAI研究を、現場で継続運用できる安全で信頼性の高いシステムへ変換すること。",
    missionAttribution: "- BitLabs CEO David Bong",
    visionLabel: "ビジョン",
    visionBody:
      "技術的に高度なAIシステムが、厳格な運用規律とともに社会実装される状態を当たり前にすること。",
    visionAttribution: "- BitLabs CEO David Bong",
    labLabel: "専門ラボ",
    labTitle: "AIエージェント、モデル基盤、推論、セキュア導入を横断する専門性。",
    labBody:
      "BitLabsは、一般的なAIコンサルタントではなく、技術的な深さが求められる企業のための開発パートナーです。AIプロダクトの道筋を定義し、アプリケーション層、モデル・推論基盤、本番運用設計まで構築します。",
    productionLabel: "研究から本番へ",
    productionTitle: "アイデアからMVPへ、そして本番へ。",
    productionBody:
      "BitLabsは提案だけで終わりません。有望なアイデアをMVPにし、ユーザー価値とCEOレベルのKPIで検証し、有効なものを本番導入へ育てます。",
    capabilitiesLabel: "対応領域",
    capabilitiesTitle: "BitLabsが顧客のために構築するもの。",
    approachLabel: "進め方",
    approachTitle: "まず課題を正しく捉え、そのうえで最適なMVPへ落とし込みます。",
    approachBody:
      "BitLabsは、最初から特定のAI手法を押しつけません。まずワークショップを通じて、お客様の課題、業務の流れ、既存システム、制約条件、成功指標を整理し、その内容にもとづいて最適な解決策を設計したうえでMVP開発へ進みます。",
    approachSteps: [
      {
        phase: "01. ワークショップ",
        title: "現場の痛みと制約を具体的に把握する。",
        body: "業務上のボトルネック、既存システムとの関係、データ境界、許容できる失敗範囲まで含めて整理します。",
        marker: "課題整理",
      },
      {
        phase: "02. 解決策の設計",
        title: "最適なアプローチを選定して提案する。",
        body: "汎用的なAI導入パターンに当てはめるのではなく、お客様の状況に合うアーキテクチャ、モデル方針、運用境界を設計します。",
        marker: "最適提案",
      },
      {
        phase: "03. MVP開発",
        title: "価値検証に必要なMVPを絞って構築する。",
        body: "技術的成立性、利用価値、本番展開への見通しを確認できる最小構成のシステムを実装します。",
        marker: "MVP開発",
      },
    ],
    approachVisualLabel: "進行フロー",
    approachVisualValue: "課題整理からMVPへ",
    approachOutcomeLabel: "進行結果",
    approachOutcomeTitle: "課題から本番導入につながる現実的な道筋を明確にする。",
    approachOutcomeBody:
      "お客様の環境に合った形で、過剰な投資や遠回りを避けながら次の開発判断へ進めます。",
    securityLabel: "セキュリティと配備",
    securityTitle: "本番品質のAIは、設計段階から統制と評価を組み込みます。",
    securityBody:
      "BitLabsは、アクセス境界、データ取り扱い、ツール権限、評価基準をアーキテクチャの初期段階から設計し、企業のリスク要件に合わせた導入を行います。",
    securityPoints: [
      "プライベート基盤を含む配備構成と明確な信頼境界の設計",
      "モデル利用、ツール実行、データ取り扱いを統制する連携設計",
      "規制対応や説明責任が求められる環境を前提にした評価とリリース設計",
    ],
  },
};

export const aboutContent: Record<Language, AboutContent> = {
  en: {
    metadataTitle: "About",
    metadataDescription: "Company profile for BitLabs, a Tokyo-based AI R&D and engineering company.",
    eyebrow: "About",
    title: "A Tokyo-based AI R&D and engineering company.",
    body:
      "BitLabs works at the intersection of model research, agent architecture, application engineering, and secure deployment. We help organizations that need technical depth, disciplined implementation, and systems that can hold up in production.",
    profileLabel: "Corporate Information",
    profileTitle: "Registered company details.",
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
    metadataDescription: "東京拠点のAI研究開発・エンジニアリング企業、BitLabsの会社概要です。",
    eyebrow: "会社情報",
    title: "東京を拠点に、AIの研究開発と実装を行う会社です。",
    body:
      "BitLabsは、モデル研究、エージェント設計、AIアプリケーション開発、セキュアな導入アーキテクチャを横断して扱うAI研究開発・エンジニアリング企業です。技術的な深さと、継続運用できる実装規律の両立を重視しています。",
    profileLabel: "会社情報",
    profileTitle: "登記情報に基づく会社プロフィール。",
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
      "BitLabs services for production AI agents, MVP development, enterprise AI architecture, model adaptation, and secure deployment.",
    eyebrow: "Services",
    title: "From idea to MVP to production AI agent application.",
    body:
      "BitLabs helps teams convert a business objective into a usable AI product. We align the first MVP with the CEO's KPIs, validate the workflow with real users, then harden it into a secure production-level agentic application.",
    problemLabel: "Problem",
    deliveryLabel: "Focus",
    outcomeLabel: "Outcome",
    processLabel: "Build Path",
    processTitle: "Short, focused execution: KPI alignment, MVP, production hardening.",
  },
  ja: {
    metadataTitle: "サービス",
    metadataDescription:
      "BitLabsの本番AIエージェント、MVP開発、エンタープライズAI設計、モデル適応、セキュア導入に関するサービス紹介。",
    eyebrow: "サービス",
    title: "アイデアからMVPへ。本番AIエージェントアプリへ。",
    body:
      "BitLabsは、事業目標を実際に使えるAIプロダクトへ変換します。CEOのKPIに合わせてMVPを設計・検証し、有効なワークフローをセキュアな本番レベルのエージェントアプリへ育てます。",
    problemLabel: "課題",
    deliveryLabel: "重点領域",
    outcomeLabel: "期待効果",
    processLabel: "構築ステップ",
    processTitle: "短く集中した実行。KPI整理、MVP、本番品質化。",
  },
};

export const expertisePageContent: Record<Language, ExpertisePageContent> = {
  en: {
    metadataTitle: "Expertise",
    metadataDescription:
      "BitLabs expertise across inference engineering, GPU parallelism, AI agent architecture, and production AI systems.",
    eyebrow: "Expertise",
    title: "Inference engineering and GPU parallelism for production AI systems.",
    body:
      "BitLabs helps teams build AI systems that are useful to users and efficient enough to operate. Our expertise connects agentic application design with the model-serving, GPU, and reliability work required behind it.",
    advisoryLabel: "Business Advisory",
    advisoryTitle: "Design AI systems that fit real business constraints.",
    advisoryBody:
      "We work from operational constraints outward, shaping AI systems that can fit the existing business, approval, and systems landscape instead of forcing generic tooling into it.",
    parallelismLabel: "Inference Engineering",
    parallelismTitle: "GPU parallelism for high-throughput, low-latency AI inference.",
    parallelismBody:
      "For demanding AI applications, inference is a product bottleneck: users feel latency, finance feels GPU waste, and operators feel instability. We design serving paths that use GPU parallelism intentionally across model size, traffic shape, and production constraints.",
    frameworkLabel: "Agentic Solutions",
    frameworkTitle: "Design advanced agentic systems with control, traceability, and operational clarity.",
    frameworkBody:
      "We architect agentic systems for high-accountability environments, aligning orchestration, tool access, escalation paths, and decision boundaries with operational control requirements.",
    frameworkPoints: [
      "Policy-aware agent design with explicit permissions, escalation paths, and auditability.",
      "Secure integration patterns for internal data, external tools, and human-in-the-loop controls.",
      "Operational governance covering traceability, risk boundaries, and production readiness.",
    ],
  },
  ja: {
    metadataTitle: "専門領域",
    metadataDescription:
      "BitLabsの専門領域。推論エンジニアリング、GPU並列化、AIエージェント設計、本番AIシステム。",
    eyebrow: "専門領域",
    title: "本番AIシステムのための推論エンジニアリングとGPU並列化。",
    body:
      "BitLabsは、ユーザーに価値が届くAIアプリケーション設計と、その背後に必要なモデル配信、GPU、信頼性のエンジニアリングを一体で扱います。",
    advisoryLabel: "事業課題への適用",
    advisoryTitle: "実際の事業制約に合うAIシステムを設計する。",
    advisoryBody:
      "既存業務、承認フロー、システム制約を踏まえ、技術的にも運用的にも無理のないAI導入方針を組み立てます。",
    parallelismLabel: "推論エンジニアリング",
    parallelismTitle: "高スループット・低レイテンシAI推論のためのGPU並列化。",
    parallelismBody:
      "高度なAIアプリケーションでは、推論がプロダクト体験とコストのボトルネックになります。モデルサイズ、アクセス特性、本番制約に合わせてGPU並列化を設計します。",
    frameworkLabel: "エージェントソリューション",
    frameworkTitle: "統制、追跡性、運用明確性を備えたAIエージェント設計。",
    frameworkBody:
      "BitLabsは、説明責任や統制が求められる環境において、オーケストレーション、ツール権限、エスカレーション経路、判断境界を設計します。",
    frameworkPoints: [
      "権限管理、承認フロー、監査可能性を備えたポリシー対応型エージェント設計。",
      "社内データ、外部ツール、人の確認工程を安全につなぐ統合設計。",
      "トレーサビリティ、リスク境界、本番運用基準を含む運用ガバナンス設計。",
    ],
  },
};

export const researchContent: Record<Language, ResearchContent> = {
  en: {
    metadataTitle: "Research",
    metadataDescription:
      "Research areas at BitLabs across SLMs, fine-tuning methods, and reliability for agentic systems.",
    eyebrow: "Research",
    title: "Research that improves how AI systems behave in production.",
    body:
      "BitLabs studies the control surfaces, failure modes, and evaluation methods that determine whether advanced AI systems can be deployed responsibly. Our research spans model behavior, reliability boundaries, agent orchestration, and the practical limits of production use.",
    reliabilityLabel: "Reliability",
    reliabilityTitle: "Evaluation, failure analysis, and guardrails are built into every research cycle.",
    reliabilityPoints: [
      "Structured evaluation suites spanning quality, latency, safety, and controllability.",
      "Reliability testing for tool use, planning behavior, escalation paths, and operational failure modes.",
      "Release criteria aligned to governance and deployment requirements before production use.",
    ],
    note: "Some research engagements cannot be published because of confidentiality constraints.",
  },
  ja: {
    metadataTitle: "研究",
    metadataDescription:
      "BitLabsが取り組むSLM、ファインチューニング、エージェント信頼性に関する研究領域。",
    eyebrow: "研究",
    title: "AIシステムを本番で成立させるための研究。",
    body:
      "BitLabsの研究は、先端性そのものを競うためではなく、AIシステムを安全かつ継続的に運用するために必要な制御性、信頼性、評価手法を高めることに焦点を当てています。",
    reliabilityLabel: "信頼性",
    reliabilityTitle: "評価、障害分析、ガードレールを研究サイクルに組み込みます。",
    reliabilityPoints: [
      "品質、遅延、安全性、制御性を横断する構造化評価スイート。",
      "ツール利用、計画挙動、エスカレーション経路、運用上の障害モードに対する信頼性検証。",
      "本番利用前に実施する、ガバナンス要件に沿ったリリース判定基準。",
    ],
    note: "一部の研究案件は機密性の観点から公開できません。",
  },
};

export const contactContent: Record<Language, ContactContent> = {
  en: {
    metadataTitle: "Contact",
    metadataDescription:
      "Contact BitLabs about AI agents, model customization, research, and enterprise deployment.",
    eyebrow: "Contact",
    title: "Start a serious technical conversation.",
    body:
      "Tell us what you are trying to build, what systems it needs to touch, and what constraints matter. We will respond with a practical path shaped by architecture, risk, and delivery reality.",
    emailLabel: "Email",
    locationLabel: "Location",
    responseLabel: "Typical response",
    responseTime: "Within 1 business day",
  },
  ja: {
    metadataTitle: "お問い合わせ",
    metadataDescription: "AIエージェント、モデル最適化、研究開発、エンタープライズ導入についてBitLabsへお問い合わせください。",
    eyebrow: "お問い合わせ",
    title: "技術的な前提を含めてご相談ください。",
    body:
      "実現したい機能、接続したいシステム、重視する制約条件をご共有ください。BitLabsが技術設計と導入現実性の両面から初期の進め方をご提案します。",
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
    submitIdle: "Discuss your AI system",
    submitBusy: "Sending...",
    success: "Your inquiry has been received. We usually reply within one business day.",
    helper:
      "A honeypot field is included as a spam measure. In production, connect this form to Turnstile or hCaptcha and submit to a secure Server Action or API endpoint.",
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
    submitIdle: "AIシステムについて相談する",
    submitBusy: "送信中...",
    success: "お問い合わせを受け付けました。通常1営業日以内にご返信します。",
    helper:
      "スパム対策としてハニーポット項目を設置しています。本番運用ではTurnstileまたはhCaptchaを追加し、安全なServer ActionまたはAPIへ接続してください。",
  },
};

export const chatContent: Record<Language, ChatContent> = {
  en: {
    openLabel: "Adam Consultant",
    dialogLabel: "Adam chat",
    title: "Adam Consultant",
    subtitle: "",
    closeLabel: "Close chat",
    intro: "Hi, I’m Adam. Ask about BitLabs services, AI architecture, or your production AI plans.",
    quickReplies: [
      "Tell me about BitLabs technical capabilities",
      "How do you approach enterprise AI architecture?",
      "We are exploring an AI agent for internal workflows",
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
    intro: "こんにちは、Adamです。BitLabsの技術領域や、AIシステムの設計・導入についてご相談ください。",
    quickReplies: [
      "BitLabsの技術力について知りたい",
      "エンタープライズAIの設計はどう進めますか？",
      "社内業務向けのAIエージェントを検討しています",
    ],
    inputPlaceholder: "質問を入力してください...",
    sendLabel: "送信",
  },
};
