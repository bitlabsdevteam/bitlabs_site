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
  capabilitiesLabel: string;
  capabilitiesTitle: string;
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
  strengthsLabel: string;
  strengthsTitle: string;
  principlesLabel: string;
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
    { href: "/expertises", label: "Expertises" },
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
      title: "AI Agent Solutions",
      problem: "Manual workflows and disconnected systems slow down decision-making.",
      delivery:
        "We design and implement agentic workflows that connect internal knowledge, tools, and policy-aware execution paths.",
      outcome: "Teams move faster, reduce operational friction, and improve consistency in execution.",
    },
    {
      title: "AI Consulting Services",
      problem:
        "Many small and mid-sized companies see the promise of AI, yet struggle to translate it into a commercially sound and operationally realistic transformation plan.",
      delivery:
        "We advise leadership teams on where AI can create measurable leverage, then shape the roadmap, operating model, and implementation priorities needed to move from experimentation to disciplined adoption.",
      outcome:
        "SMEs gain a clear path to practical AI transformation, with investments aligned to business value, execution capacity, and long-term competitiveness.",
    },
    {
      title: "LLM / SLM Pre-training & Fine-tuning",
      problem: "General-purpose models do not always fit domain-specific requirements or control needs.",
      delivery:
        "We build training strategy, data design, and fine-tuning infrastructure aligned to the demands of your domain.",
      outcome: "Production systems gain stronger relevance, accuracy, and controllability.",
    },
    {
      title: "Custom AI Applications",
      problem: "Teams need products embedded into real work, not isolated demos.",
      delivery:
        "We build custom React + AI applications covering prompt design, context architecture, and evaluation harnesses.",
      outcome: "Users get AI experiences that fit actual operating workflows.",
    },
  ],
  ja: [
    {
      title: "AIエージェントソリューション",
      problem: "手作業の多い業務フローや分断されたシステムが意思決定の速度を落としています。",
      delivery:
        "社内データ、各種ツール、ポリシーを踏まえた実行手順をつなぐエージェント型ワークフローを設計・実装します。",
      outcome: "実行速度を高め、運用摩擦を減らし、業務品質の一貫性を向上させます。",
    },
    {
      title: "エンタープライズAIソリューション",
      problem: "規制や統制が厳しい環境では、PoCが本番展開まで進まないことが少なくありません。",
      delivery:
        "本番運用を前提としたエンタープライズAI基盤のアーキテクチャ設計と実装を提供します。",
      outcome: "ガバナンスに対応した統制のもとで、複数部門への確実な展開を実現します。",
    },
    {
      title: "LLM/SLMの事前学習・ファインチューニング",
      problem: "汎用モデルでは業務ドメイン固有の要求に十分対応できない場合があります。",
      delivery:
        "ドメイン特性に合わせた学習戦略、データ設計、ファインチューニング基盤を構築します。",
      outcome: "実運用における関連性、精度、制御性を高い水準で引き上げます。",
    },
    {
      title: "カスタムAIアプリケーション",
      problem: "現場が必要としているのは単発のデモではなく、業務に組み込めるプロダクトです。",
      delivery:
        "ReactとAIを組み合わせ、プロンプト設計、コンテキスト設計、評価ハーネスまで含めた専用アプリを開発します。",
      outcome: "業務プロセスに適合した、実利用可能なAI体験を提供します。",
    },
  ],
};

export const expertiseAreas: Record<Language, ExpertiseArea[]> = {
  en: [
    {
      title: "AI for sophisticated business problems",
      summary:
        "We help business owners turn ambiguous operational bottlenecks into scoped AI systems with clear commercial intent.",
      points: [
        "Translate complex business constraints into an implementation roadmap.",
        "Prioritize use cases that improve decision speed, cost structure, or service quality.",
        "Design delivery plans that fit existing teams, systems, and governance limits.",
      ],
    },
    {
      title: "Pre-training and inference with 5D parallelism",
      summary:
        "We design high-throughput training and serving stacks that coordinate data, tensor, pipeline, sequence, and expert parallelism across GPU clusters.",
      points: [
        "Balance throughput, memory pressure, and communication overhead across distributed topologies.",
        "Adapt parallelism strategy for both pre-training workloads and low-latency inference paths.",
        "Build deployment plans that remain observable, secure, and operationally maintainable.",
      ],
    },
  ],
  ja: [
    {
      title: "高度な経営課題に向けたAI活用",
      summary:
        "複雑で曖昧な事業課題を、実行可能なAIシステムへ落とし込めるように、経営者の意思決定を支援します。",
      points: [
        "複雑な事業制約を整理し、実装可能なロードマップへ変換します。",
        "意思決定速度、コスト構造、サービス品質に効くユースケースを優先します。",
        "既存組織、既存システム、ガバナンス制約に合う導入計画を設計します。",
      ],
    },
    {
      title: "5D並列化による事前学習と推論",
      summary:
        "データ並列、テンソル並列、パイプライン並列、シーケンス並列、エキスパート並列を組み合わせ、GPUクラスタ上の学習・推論基盤を設計します。",
      points: [
        "分散トポロジーごとの通信負荷、メモリ制約、スループットを最適化します。",
        "事前学習と低遅延推論の両方に合わせて並列化戦略を調整します。",
        "可観測性と安全性を確保しながら、運用可能な配備設計に落とし込みます。",
      ],
    },
  ],
};

export const researchTracks: Record<Language, string[]> = {
  en: [
    "SLM architecture design and training-efficiency research for constrained deployment environments.",
    "Research on detecting implicit bias in LLM outputs, with mitigation strategies including FairSteer and hook-based interventions.",
    "Research on orchestration, memory design, and reliability boundaries for agentic systems.",
    "Evaluation, robustness, and lifecycle governance for production-grade model systems.",
  ],
  ja: [
    "制約の大きい配備環境を前提にしたSLMアーキテクチャ設計と学習効率の研究",
    "LLM出力に潜む暗黙的バイアスの検出と、FairSteerやフック介入を含む緩和手法の研究",
    "エージェント型システムのオーケストレーション、メモリ設計、信頼性境界の研究",
    "本番品質のモデルシステムに向けた評価、堅牢性、ライフサイクルガバナンス",
  ],
};

export const principles: Record<Language, string[]> = {
  en: [
    "Practical outcomes over inflated claims",
    "Security by design",
    "Research that converts into production value",
    "Long-term partnership anchored in measurable results",
  ],
  ja: [
    "誇張より実用性を重視する",
    "セキュリティを前提に設計する",
    "研究を本番価値につなげる",
    "測定可能な成果を軸に長期で伴走する",
  ],
};

export const teamStrengths: Record<Language, string[]> = {
  en: [
    "AI architecture design and enterprise delivery execution",
    "LLM pre-training and fine-tuning infrastructure",
    "SLM design and training from scratch",
    "Prompt design, context engineering, and evaluation harnesses",
    "Secure cloud deployment for LLM systems",
    "OpenClaw custom solution implementation",
  ],
  ja: [
    "エンタープライズ環境におけるAIアーキテクチャ設計と導入実行",
    "LLMの事前学習およびファインチューニング基盤",
    "SLMのゼロからの設計と学習",
    "プロンプト設計、コンテキスト設計、評価ハーネス構築",
    "LLMシステム向けのセキュアなクラウドデプロイ",
    "OpenClawカスタムソリューション実装",
  ],
};

export const deliverySteps: Record<Language, DeliveryStep[]> = {
  en: [
    {
      phase: "01. Discovery",
      detail: "We align on operational constraints, data boundaries, and the target metrics that matter.",
    },
    {
      phase: "02. Design",
      detail: "We define the model approach, orchestration, security controls, and integration shape.",
    },
    {
      phase: "03. Implementation",
      detail: "We build iteratively with evaluation loops and enterprise controls integrated from the start.",
    },
    {
      phase: "04. Operations",
      detail: "We move into production with observability, governance checks, and a continuous improvement path.",
    },
  ],
  ja: [
    {
      phase: "01. 現状整理",
      detail: "業務上の制約、データ境界、目標となる運用指標を明確化します。",
    },
    {
      phase: "02. 設計",
      detail: "モデル、オーケストレーション、セキュリティ、連携構成を定義します。",
    },
    {
      phase: "03. 実装",
      detail: "評価ループとエンタープライズ統制を組み込みながら段階的に構築します。",
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
      "Tokyo-based AI R&D and consulting company building practical, secure systems for enterprise use.",
    location: "Tokyo, Japan",
    email: "hello@bitlabs.site",
    copyright: "All rights reserved.",
    socialAriaLabel: (name) => `View BitLabs on ${name}`,
  },
  ja: {
    summary:
      "東京を拠点とするAI研究開発・コンサルティング企業。実用性と安全性を備えたシステムを企業向けに構築します。",
    location: "東京、日本",
    email: "hello@bitlabs.site",
    copyright: "無断転載・無断使用を禁じます。",
    socialAriaLabel: (name) => `BitLabsの${name}を見る`,
  },
};

export const homeContent: Record<Language, HomeContent> = {
  en: {
    location: "Tokyo, Japan",
    heroTitle: "From research depth to production discipline for enterprise AI.",
    heroBody:
      "BitLabs designs, builds, and deploys practical AI systems across agent workflows, model systems, and secure cloud environments.",
    heroStatementLabel: "No hype",
    heroStatement: "We cut through AI hype and build AI systems that actually work in the real world.",
    primaryCta: "Talk to Adam",
    secondaryCta: "View services",
    missionLabel: "Mission",
    missionBody:
      "Turn advanced AI research into secure, dependable systems that create concrete business value.",
    missionAttribution: "- BitLabs CEO David Bong",
    visionLabel: "Vision",
    visionBody:
      "Build a future where serious research and rigorous operations deliver robust, safe LLM systems into real production environments.",
    visionAttribution: "- BitLabs CEO David Bong",
    capabilitiesLabel: "Capabilities",
    capabilitiesTitle: "Design and delivery that holds up under real operating conditions.",
    securityLabel: "Security & Deployment",
    securityTitle: "Security architecture belongs in the first blueprint, not as a retrofit.",
    securityBody:
      "BitLabs designs deployment models with access boundaries, controlled integrations, and governance checkpoints aligned to enterprise risk requirements.",
    securityPoints: [
      "Solution architecture designed for private infrastructure options",
      "Policy-led deployment plans and data handling boundaries",
      "Model deployment patterns built for regulated environments",
    ],
  },
  ja: {
    location: "東京、日本",
    heroTitle: "研究の深さと実装の規律で、企業向けAIを本番品質へ導く。",
    heroBody:
      "BitLabsは、AIエージェント、モデルシステム、セキュアなクラウド環境にまたがる実用的なAIの設計・開発・導入を支援します。",
    heroStatementLabel: "誇張ではなく実装",
    heroStatement:
      "AI hypeに振り回されず、現実の現場で本当に機能するAIシステムを構築します。",
    primaryCta: "Adamに相談する",
    secondaryCta: "サービスを見る",
    missionLabel: "ミッション",
    missionBody:
      "高度なAI研究を、具体的な事業価値を生む安全で信頼できるシステムへ変換すること。",
    missionAttribution: "- BitLabs CEO David Bong",
    visionLabel: "ビジョン",
    visionBody:
      "真剣な研究にもとづく高度で堅牢かつ安全なLLMシステムが、現実の運用規律とともに届けられる未来を形にすること。",
    visionAttribution: "- BitLabs CEO David Bong",
    capabilitiesLabel: "対応領域",
    capabilitiesTitle: "実際の運用条件に耐える設計と実装。",
    securityLabel: "セキュリティと配備",
    securityTitle: "セキュリティ設計は後付けではなく、最初の設計図に含めます。",
    securityBody:
      "BitLabsは、アクセス境界、統制された連携、ガバナンスの確認ポイントを組み込んだ配備モデルを設計し、企業のリスク基準に整合させます。",
    securityPoints: [
      "プライベート基盤を前提にしたソリューション設計",
      "ポリシー主導の展開計画とデータ取り扱い境界",
      "規制環境に適したモデル配備パターン",
    ],
  },
};

export const aboutContent: Record<Language, AboutContent> = {
  en: {
    metadataTitle: "About",
    metadataDescription: "Company profile, team strengths, and operating principles for BitLabs.",
    eyebrow: "About",
    title: "A Tokyo-based AI team built for critical enterprise work.",
    body:
      "BitLabs is an AI R&D and consulting company focused on agentic solutions, model systems, and secure production deployment.",
    strengthsLabel: "Team Strengths",
    strengthsTitle: "Technical depth with the discipline to deliver.",
    principlesLabel: "Working Principles",
  },
  ja: {
    metadataTitle: "会社情報",
    metadataDescription: "BitLabsの会社概要、チームの強み、行動原則について。",
    eyebrow: "会社情報",
    title: "企業の重要業務を支える、東京発のAI開発チーム。",
    body:
      "BitLabsは、エージェントソリューション、モデルシステム、そして本番環境向けの安全な導入に強みを持つAI研究開発・コンサルティング企業です。",
    strengthsLabel: "チームの強み",
    strengthsTitle: "技術の深さと、やり切る実装力。",
    principlesLabel: "行動原則",
  },
};

export const servicesPageContent: Record<Language, ServicesPageContent> = {
  en: {
    metadataTitle: "Services",
    metadataDescription:
      "BitLabs services across AI agents, AI consulting for SMEs, model training, and secure cloud deployment.",
    eyebrow: "Services",
    title: "From strategy and architecture through production rollout.",
    body:
      "BitLabs combines research discipline, technical implementation, and pragmatic advisory work to help organizations turn AI ambition into reliable operational capability.",
    problemLabel: "Problem",
    deliveryLabel: "What We Deliver",
    outcomeLabel: "Outcome",
    processLabel: "Delivery Process",
    processTitle: "An execution framework built around measurable outcomes.",
  },
  ja: {
    metadataTitle: "サービス",
    metadataDescription:
      "BitLabsのAIエージェント、エンタープライズAI、モデル学習、セキュアなクラウド配備に関するサービス紹介。",
    eyebrow: "サービス",
    title: "構想設計から本番運用まで、一気通貫で支援します。",
    body:
      "BitLabsは、研究手法とエンタープライズ実装、安定した配備設計を組み合わせ、AI導入をエンドツーエンドで支援します。",
    problemLabel: "課題",
    deliveryLabel: "提供内容",
    outcomeLabel: "期待効果",
    processLabel: "提供プロセス",
    processTitle: "測定可能な成果につなげるための実行フレームワーク。",
  },
};

export const expertisePageContent: Record<Language, ExpertisePageContent> = {
  en: {
    metadataTitle: "Expertises",
    metadataDescription:
      "BitLabs expertise in solving sophisticated business problems with AI and designing 5D-parallel model systems.",
    eyebrow: "Expertises",
    title: "Applied AI expertise for business complexity and model-scale systems.",
    body:
      "BitLabs combines executive-level problem framing with deep systems engineering, helping organizations define the right AI intervention and build the infrastructure needed to run it reliably.",
    advisoryLabel: "Business Advisory",
    advisoryTitle: "Help business owners solve sophisticated problems using AI technologies.",
    advisoryBody:
      "We work from business constraints outward, shaping AI programs that make operational sense instead of forcing generic tooling into complex environments.",
    parallelismLabel: "Model Systems",
    parallelismTitle: "Pre-training and inference with 5D parallelism.",
    parallelismBody:
      "For teams pushing large-model workloads, we design distributed training and inference patterns that coordinate multiple forms of parallelism without losing sight of reliability, cost, or deployment discipline.",
    frameworkLabel: "Agentic Solutions",
    frameworkTitle: "Design and implement advanced AI agentic solutions with compliance.",
    frameworkBody:
      "We architect agentic systems for regulated and high-accountability environments, aligning orchestration, tool access, and decision boundaries with enterprise compliance requirements.",
    frameworkPoints: [
      "Policy-aware agent design with explicit permissions, escalation paths, and auditability.",
      "Secure integration patterns for internal data, external tools, and human-in-the-loop controls.",
      "Operational governance covering traceability, risk boundaries, and production readiness.",
    ],
  },
  ja: {
    metadataTitle: "専門領域",
    metadataDescription:
      "BitLabsの専門領域。高度な事業課題を解くAI活用と、5D並列化によるモデルシステム設計。",
    eyebrow: "専門領域",
    title: "事業の複雑性と大規模モデル基盤の双方に対応するAI実装力。",
    body:
      "BitLabsは、経営課題の整理から分散モデル基盤の設計までを一気通貫で捉え、正しいAI施策とそれを支える実装基盤を設計します。",
    advisoryLabel: "事業課題への適用",
    advisoryTitle: "AI技術で高度な経営課題を解くための支援。",
    advisoryBody:
      "既存業務、制約条件、投資対効果を踏まえ、複雑な現場に対して実際に機能するAI導入方針を組み立てます。",
    parallelismLabel: "モデルシステム",
    parallelismTitle: "5D並列化による事前学習と推論。",
    parallelismBody:
      "大規模モデルの学習・推論に向けて、複数の並列化手法を組み合わせた分散実行基盤を設計し、性能・安定性・運用性のバランスを取ります。",
    frameworkLabel: "エージェントソリューション",
    frameworkTitle: "コンプライアンスを踏まえた高度なAIエージェントソリューションの設計と実装。",
    frameworkBody:
      "BitLabsは、規制対応や説明責任が求められる環境において、オーケストレーション、ツール権限、判断境界を統制要件に合わせて設計します。",
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
    title: "Research built for the point where models meet operational reality.",
    body:
      "We study the control surfaces, failure modes, and evaluation methods that determine whether modern AI systems can be trusted in production, with active work in bias detection, steerability, and enterprise-grade reliability.",
    reliabilityLabel: "Reliability",
    reliabilityTitle: "Evaluation and guardrails are built into every research cycle.",
    reliabilityPoints: [
      "Structured evaluation suites spanning quality, latency, and safety.",
      "Reliability testing for tool use, planning behavior, and operational failure modes.",
      "Release criteria aligned to governance requirements before production deployment.",
    ],
    note: "Some research engagements cannot be published because of confidentiality constraints.",
  },
  ja: {
    metadataTitle: "研究",
    metadataDescription:
      "BitLabsが取り組むSLM、ファインチューニング、エージェント信頼性に関する研究領域。",
    eyebrow: "研究",
    title: "本番環境の制約を前提に成立する応用研究。",
    body:
      "BitLabsの研究プログラムは、安全で信頼できるエンタープライズAIへ直接つながる手法に焦点を当てています。",
    reliabilityLabel: "信頼性",
    reliabilityTitle: "評価とガードレールを、すべての研究サイクルに組み込みます。",
    reliabilityPoints: [
      "品質、遅延、安全性の各指標を横断する構造化評価スイート。",
      "ツール利用、計画挙動、運用上の障害モードに対する信頼性検証。",
      "本番展開前に実施する、ガバナンス要件に沿ったリリース判定基準。",
    ],
    note: "一部の研究案件は機密性の観点から公開できません。",
  },
};

export const contactContent: Record<Language, ContactContent> = {
  en: {
    metadataTitle: "Contact",
    metadataDescription:
      "Contact BitLabs about AI consulting, research, and enterprise deployment support.",
    eyebrow: "Contact",
    title: "Tell us what you need to build.",
    body:
      "Share your business context, constraints, and target outcomes. We will propose a practical starting path.",
    emailLabel: "Email",
    locationLabel: "Location",
    responseLabel: "Typical response",
    responseTime: "Within 1 business day",
  },
  ja: {
    metadataTitle: "お問い合わせ",
    metadataDescription: "AIコンサルティング、研究開発、導入支援についてBitLabsへお問い合わせください。",
    eyebrow: "お問い合わせ",
    title: "実現したい内容をお聞かせください。",
    body:
      "事業背景、制約条件、期待する成果をご共有ください。初期の進め方をご提案します。",
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
    submitIdle: "Discuss your AI project",
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
    submitIdle: "AIプロジェクトについて相談する",
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
    intro: "Hi, I’m Adam. Ask about BitLabs services or your AI project.",
    quickReplies: [
      "Tell me about BitLabs services",
      "How do you approach enterprise deployment?",
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
    intro: "こんにちは、Adamです。BitLabsのサービスやAIプロジェクトについてお気軽にご相談ください。",
    quickReplies: [
      "BitLabsのサービスについて知りたい",
      "エンタープライズ導入はどう進めますか？",
      "社内業務向けのAIエージェントを検討しています",
    ],
    inputPlaceholder: "質問を入力してください...",
    sendLabel: "送信",
  },
};
