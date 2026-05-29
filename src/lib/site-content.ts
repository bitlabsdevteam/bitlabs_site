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
      title: "Agentic solutions",
      problem:
        "Many teams have demos, but not a reliable agent workflow connected to real tools and data.",
      response:
        "We design permissions, orchestration, memory, escalation, and human review together.",
      outcome:
        "You get an agent system ready for controlled rollout.",
    },
    {
      title: "Enterprise AI architecture",
      problem:
        "Generic adoption plans rarely answer data boundaries, ownership, or long-term operating control.",
      response:
        "We define the right architecture, model path, and governance boundary before build work starts.",
      outcome:
        "Teams move with a clearer plan and fewer avoidable risks.",
    },
    {
      title: "LLM and SLM training",
      problem:
        "Training plans become expensive quickly when data, evaluation, and release goals are not aligned.",
      response:
        "We shape pre-training and fine-tuning programs around data quality, objectives, and evaluation.",
      outcome:
        "Model work stays tied to product goals and release readiness.",
    },
    {
      title: "Custom AI applications",
      problem:
        "AI value drops fast when software does not fit existing workflows.",
      response:
        "We build focused applications with strong context design, integration, and evaluation loops.",
      outcome:
        "Users get software they can use day to day, not just a demo.",
    },
    {
      title: "Inference stacks and secure deployment",
      problem:
        "Latency, GPU cost, and deployment control decide whether a system can hold up in production.",
      response:
        "We design serving paths, parallelism, isolation, and release controls for real environments.",
      outcome:
        "The system stays responsive, governable, and easier to operate.",
    },
  ],
  ja: [
    {
      title: "エージェントソリューション",
      problem:
        "デモはあっても、実データや実ツールに接続した安定運用まで進んでいないケースが多くあります。",
      response:
        "権限、オーケストレーション、メモリ、エスカレーション、人の確認工程をまとめて設計します。",
      outcome:
        "本番導入しやすいエージェント運用基盤を構築します。",
    },
    {
      title: "エンタープライズAI設計",
      problem:
        "汎用的な導入だけでは、データ境界や運用責任が曖昧になりがちです。",
      response:
        "構成、モデル方針、統制境界を整理してから実装に入ります。",
      outcome:
        "導入判断が明確になり、無駄な手戻りを減らせます。",
    },
    {
      title: "LLM・SLMの学習",
      problem:
        "学習計画は、データ設計と評価基準が弱いとすぐに非効率になります。",
      response:
        "事前学習とファインチューニングを、データ品質と評価設計を含めて進めます。",
      outcome:
        "モデル開発を事業目標と本番判断につなげます。",
    },
    {
      title: "カスタムAIアプリ",
      problem:
        "AIの価値は、現場の業務フローに乗らないと継続利用されません。",
      response:
        "コンテキスト設計、連携、評価ループを含む実用的なアプリを構築します。",
      outcome:
        "単発デモではなく、日常業務で使える形にします。",
    },
    {
      title: "推論基盤と安全な配備",
      problem:
        "レイテンシ、GPUコスト、配備統制が弱いと本番運用は安定しません。",
      response:
        "推論経路、GPU並列化、隔離設計、リリース統制を本番前提で整えます。",
      outcome:
        "応答性と統制を両立した導入が可能になります。",
    },
  ],
};

export const expertiseAreas: Record<Language, ExpertiseArea[]> = {
  en: [
    {
      title: "Enterprise AI architecture",
      summary:
        "We turn business constraints into architecture decisions teams can actually operate.",
      points: [
        "Map business goals, data boundaries, and control needs early.",
        "Choose where AI belongs in the workflow and where it does not.",
        "Fit delivery to existing systems, approvals, and ownership.",
      ],
    },
    {
      title: "Inference engineering",
      summary:
        "We design serving systems around latency, throughput, memory, and cost.",
      points: [
        "Select the right parallelism for model size and traffic shape.",
        "Tune batching, KV cache, and memory behavior for production use.",
        "Carry serving decisions into observability and deployment operations.",
      ],
    },
  ],
  ja: [
    {
      title: "エンタープライズAI設計",
      summary:
        "事業制約を、実装しやすく運用しやすいAI設計へ落とし込みます。",
      points: [
        "事業目標、データ境界、統制要件を早い段階で整理します。",
        "AIを入れる場所と入れない場所を明確にします。",
        "既存システムや承認フローに合う導入計画を組みます。",
      ],
    },
    {
      title: "推論エンジニアリング",
      summary:
        "レイテンシ、GPUメモリ、運用コストを踏まえて推論基盤を設計します。",
      points: [
        "モデル規模と負荷に合う並列化を選びます。",
        "バッチング、KVキャッシュ、メモリ挙動を最適化します。",
        "推論判断を監視や配備運用まで接続します。",
      ],
    },
  ],
};

export const researchLabNotes: Record<Language, ResearchLabNote[]> = {
  en: [
    {
      label: "Pre-training",
      title: "LLM and SLM training programs",
      focus: "Data quality, objective design, and training efficiency.",
      method: "Review datasets, block weak runs early, and align experiments to target use cases.",
      signal: "Training work that stays connected to product value.",
    },
    {
      label: "Fine-tuning",
      title: "Adaptation with evaluation attached",
      focus: "Domain behavior, tool use, and policy alignment.",
      method: "Run fine-tuning beside regression checks and task scorecards.",
      signal: "Model changes can be measured before release.",
    },
    {
      label: "Inference",
      title: "Serving and inference stack design",
      focus: "Latency, GPU efficiency, and deployment limits.",
      method: "Study batching, KV cache, memory pressure, and traffic patterns together.",
      signal: "More predictable performance in production.",
    },
    {
      label: "Agents",
      title: "Agent reliability and control",
      focus: "Tool boundaries, review paths, and failure handling.",
      method: "Replay traces, test permissions, and measure recovery behavior.",
      signal: "Agents stay useful without losing operational control.",
    },
  ],
  ja: [
    {
      label: "事前学習",
      title: "LLM・SLMの学習プログラム",
      focus: "データ品質、学習目的、学習効率。",
      method: "データセットを精査し、弱い実験は早めに止めて用途に合わせます。",
      signal: "学習投資をプロダクト価値につなげます。",
    },
    {
      label: "ファインチューニング",
      title: "評価と一体の適応設計",
      focus: "業務ドメイン、ツール挙動、ポリシー整合。",
      method: "回帰テストとタスク評価を併走させます。",
      signal: "変更の良し悪しを本番前に判断できます。",
    },
    {
      label: "推論",
      title: "配信と推論スタック設計",
      focus: "レイテンシ、GPU効率、配備制約。",
      method: "バッチング、KVキャッシュ、メモリ制約、負荷特性をまとめて見ます。",
      signal: "本番で予測しやすい性能を目指します。",
    },
    {
      label: "エージェント",
      title: "エージェントの信頼性と統制",
      focus: "ツール境界、確認経路、障害時の挙動。",
      method: "実行トレースを再生し、権限や復旧挙動を検証します。",
      signal: "運用統制を保ったまま使えるエージェントを目指します。",
    },
  ],
};

export const principles: Record<Language, string[]> = {
  en: [
    "Technical rigor over AI theater",
    "Research translated into deployable systems",
    "Security and control designed in early",
    "Measured outcomes over inflated claims",
  ],
  ja: [
    "流行語より技術的な整合性を重視する",
    "研究を実装可能な価値へ変換する",
    "セキュリティと統制を最初の設計から組み込む",
    "誇張ではなく測定可能な成果で示す",
  ],
};

export const teamStrengths: Record<Language, string[]> = {
  en: [
    "Research, product, and implementation stay closely connected",
    "Ownership remains clear from architecture review through launch",
    "We know when to prototype, adapt, or build deeper infrastructure",
    "Sensitive client context is handled carefully",
  ],
  ja: [
    "研究、プロダクト、実装を近い距離でつなぐ体制",
    "設計レビューから導入準備まで責任範囲を明確にする進め方",
    "試作、適応、基盤構築の優先順位を見極める判断力",
    "顧客の制約や機密性を慎重に扱う体制",
  ],
};

export const labCapabilities: Record<Language, LabCapability[]> = {
  en: [
    {
      label: "01 / Agents",
      title: "Agentic solution development",
      body:
        "Production workflows with tool permissions, orchestration, and review paths.",
    },
    {
      label: "02 / Pre-training",
      title: "LLM and SLM training programs",
      body:
        "Training, fine-tuning, and evaluation handled as one system.",
    },
    {
      label: "03 / Inference",
      title: "Inference stack architecture",
      body:
        "Serving paths shaped for latency, GPU efficiency, and deployment control.",
    },
    {
      label: "04 / Reliability",
      title: "Enterprise delivery discipline",
      body:
        "Quality, latency, safety, and failure modes measured before launch.",
    },
  ],
  ja: [
    {
      label: "01 / エージェント",
      title: "エージェントソリューション開発",
      body:
        "権限設計、オーケストレーション、確認経路を本番前提で整えます。",
    },
    {
      label: "02 / 事前学習",
      title: "LLM・SLMの学習プログラム設計",
      body:
        "事前学習、ファインチューニング、評価を一体で扱います。",
    },
    {
      label: "03 / 推論",
      title: "推論スタックアーキテクチャ",
      body:
        "レイテンシ、GPU効率、配備統制に合う推論経路を設計します。",
    },
    {
      label: "04 / 信頼性",
      title: "エンタープライズ導入規律",
      body:
        "品質、安全性、障害モードを測定して導入基準を明確にします。",
    },
  ],
};

export const productionProofs: Record<Language, ProductionProof[]> = {
  en: [
    {
      label: "Research",
      value: "Model programs",
      body: "Pre-training, fine-tuning, and controllability work.",
    },
    {
      label: "Architecture",
      value: "Inference boundaries",
      body: "Model, data, serving, and deployment choices tied to real constraints.",
    },
    {
      label: "Implementation",
      value: "Working systems",
      body: "Focused MVPs, agentic systems, and custom AI software.",
    },
    {
      label: "Operation",
      value: "Reliable rollout",
      body: "Release criteria, observability, and steady improvement.",
    },
  ],
  ja: [
    {
      label: "研究",
      value: "モデルプログラム",
      body: "事前学習、ファインチューニング、制御性を扱います。",
    },
    {
      label: "設計",
      value: "推論境界",
      body: "事業制約をモデル、データ、推論、配備の判断へ落とし込みます。",
    },
    {
      label: "実装",
      value: "動くシステム",
      body: "MVP、エージェント、専用AIアプリを構築します。",
    },
    {
      label: "運用",
      value: "信頼できる展開",
      body: "リリース基準、監視、継続改善をつなぎます。",
    },
  ],
};

export const systemMapSteps: Record<Language, SystemMapStep[]> = {
  en: [
    {
      label: "01",
      title: "Business problem",
    },
    {
      label: "02",
      title: "Data boundary",
    },
    {
      label: "03",
      title: "Model strategy",
    },
    {
      label: "04",
      title: "Inference stack",
    },
    {
      label: "05",
      title: "Agent workflow",
    },
    {
      label: "06",
      title: "Evaluation",
    },
    {
      label: "07",
      title: "Secure deployment",
    },
  ],
  ja: [
    {
      label: "01",
      title: "事業課題",
    },
    {
      label: "02",
      title: "データ境界",
    },
    {
      label: "03",
      title: "モデル戦略",
    },
    {
      label: "04",
      title: "推論スタック",
    },
    {
      label: "05",
      title: "エージェント業務",
    },
    {
      label: "06",
      title: "評価",
    },
    {
      label: "07",
      title: "セキュア配備",
    },
  ],
};

export const deliverySteps: Record<Language, DeliveryStep[]> = {
  en: [
    {
      phase: "01. Discovery",
      detail: "Align on constraints, data boundaries, and success metrics.",
    },
    {
      phase: "02. Design",
      detail: "Set the model path, integrations, evaluation, and control model.",
    },
    {
      phase: "03. Implementation",
      detail: "Build with evaluation loops and production controls from the start.",
    },
    {
      phase: "04. Operations",
      detail: "Launch with observability, governance checks, and a practical improvement path.",
    },
  ],
  ja: [
    {
      phase: "01. 現状整理",
      detail: "業務制約、データ境界、成功指標を整理します。",
    },
    {
      phase: "02. 設計",
      detail: "モデル方針、連携、評価、統制設計をまとめて決めます。",
    },
    {
      phase: "03. 実装",
      detail: "評価ループと本番統制を含めて段階的に構築します。",
    },
    {
      phase: "04. 運用",
      detail: "監視、ガバナンス確認、継続改善とともに本番へ進めます。",
    },
  ],
};

export const footerContent: Record<Language, FooterContent> = {
  en: {
    summary:
      "Tokyo-based AI R&D company building usable enterprise AI systems.",
    location: "Tokyo, Japan",
    email: "hello@bitlabs.site",
    copyright: "All rights reserved.",
    socialAriaLabel: (name) => `View BitLabs on ${name}`,
  },
  ja: {
    summary:
      "東京を拠点とするAI研究開発企業。企業で使えるAIシステムを構築します。",
    location: "東京、日本",
    email: "hello@bitlabs.site",
    copyright: "無断転載・無断使用を禁じます。",
    socialAriaLabel: (name) => `BitLabsの${name}を見る`,
  },
};

export const homeContent: Record<Language, HomeContent> = {
  en: {
    location: "Tokyo AI Research and Engineering Lab",
    heroTitle: "Agentic systems, model programs, and inference stacks for real deployment.",
    heroBody:
      "BitLabs designs and builds enterprise AI systems with a lighter path from concept to production.",
    heroStatementLabel: "Research to production",
    heroStatement:
      "We keep model, product, and deployment choices tied to business goals and control boundaries.",
    heroReadout: ["Agent systems", "Model training", "Inference design", "Secure rollout"],
    heroHighlightsLabel: "What matters",
    heroHighlights: [
      {
        label: "Scope",
        value: "Clear first",
        body: "We define the target, the limits, and the success measure early.",
      },
      {
        label: "Ownership",
        value: "One path",
        body: "Architecture, build, and rollout stay connected.",
      },
      {
        label: "Judgment",
        value: "Measured",
        body: "Progress is driven by evidence, not AI theater.",
      },
    ],
    primaryCta: "Talk to BitLabs",
    secondaryCta: "Explore expertise",
    missionLabel: "Mission",
    missionBody:
      "Turn advanced AI work into dependable systems teams can operate.",
    missionAttribution: "- BitLabs CEO David Bong",
    visionLabel: "Vision",
    visionBody:
      "Make rigorous AI deployment feel as disciplined as any critical production system.",
    visionAttribution: "- BitLabs CEO David Bong",
    labLabel: "Expert Lab",
    labTitle: "Focused capability across agent systems, model work, and inference.",
    labBody:
      "BitLabs connects model decisions, application design, and deployment discipline in one delivery path.",
    productionLabel: "Research to Production",
    productionTitle: "From research direction to working system.",
    productionBody:
      "We use focused MVPs to validate value, then harden what works.",
    systemMapLabel: "System Map",
    systemMapTitle: "One path from business problem to secure AI deployment.",
    systemMapBody:
      "We map the operating path before implementation so the core decisions stay aligned.",
    capabilitiesLabel: "Capabilities",
    capabilitiesTitle: "What BitLabs builds.",
    approachLabel: "Approach",
    approachTitle: "We start with the problem, then choose the right model and serving path.",
    approachBody:
      "We begin with the operating problem, then shape the model, inference, and application architecture around it.",
    approachSteps: [
      {
        phase: "01. Workshop",
        title: "Clarify the operating problem.",
        body: "Map workflow pain points, systems, and hard constraints.",
        marker: "Pain points",
      },
      {
        phase: "02. Solution Design",
        title: "Choose the right stack.",
        body: "Set the architecture, model approach, inference path, and control boundary.",
        marker: "Best-fit proposal",
      },
      {
        phase: "03. MVP Development",
        title: "Build the focused MVP.",
        body: "Ship the smallest system that can validate fit and value.",
        marker: "Focused MVP",
      },
    ],
    approachVisualLabel: "BitLabs flow",
    approachVisualValue: "Workshop to MVP",
    approachOutcomeLabel: "Outcome",
    approachOutcomeTitle: "A clearer path from operating problem to production-ready AI.",
    approachOutcomeBody:
      "Clients move forward with a solution shaped around their environment and operating limits.",
    securityLabel: "Security & Deployment",
    securityTitle: "Production AI starts with control boundaries, evaluation, and deployment discipline.",
    securityBody:
      "Security, data handling, and release checks are part of the first architecture pass.",
    securityPoints: [
      "Private or regional deployment options with explicit trust boundaries",
      "Integration patterns for model access, tool use, and sensitive data handling",
      "Release criteria for regulated or high-accountability environments",
    ],
  },
  ja: {
    location: "東京のAI研究開発・エンジニアリングラボ",
    heroTitle: "エージェント、モデル開発、推論基盤を本番導入まで設計するAIパートナー。",
    heroBody:
      "BitLabsは、構想段階のAIを実際に運用できるシステムへ落とし込みます。",
    heroStatementLabel: "MVPから本番へ",
    heroStatement:
      "モデル、プロダクト、配備の判断を事業目標と統制要件に結びつけます。",
    heroReadout: ["エージェント", "モデル学習", "推論設計", "安全な導入"],
    heroHighlightsLabel: "重視する点",
    heroHighlights: [
      {
        label: "スコープ",
        value: "先に明確化",
        body: "目的、対象外、成功指標を最初にそろえます。",
      },
      {
        label: "責任範囲",
        value: "一つの流れ",
        body: "設計、実装、導入判断を分断しません。",
      },
      {
        label: "判断",
        value: "測定重視",
        body: "進め方は検証結果と制約条件で決めます。",
      },
    ],
    primaryCta: "BitLabsに相談する",
    secondaryCta: "専門領域を見る",
    missionLabel: "ミッション",
    missionBody:
      "高度なAIを、継続運用できる信頼性の高いシステムへ変換すること。",
    missionAttribution: "- BitLabs CEO David Bong",
    visionLabel: "ビジョン",
    visionBody:
      "高度なAI導入が、厳格な運用規律とともに進む状態を当たり前にすること。",
    visionAttribution: "- BitLabs CEO David Bong",
    labLabel: "専門ラボ",
    labTitle: "エージェント、モデル開発、推論基盤を横断する専門性。",
    labBody:
      "モデル判断、アプリ設計、導入規律を一つの流れで扱います。",
    productionLabel: "研究から本番へ",
    productionTitle: "研究の方向性から動くシステムへ。",
    productionBody:
      "まずMVPで価値を確かめ、機能する部分を本番品質へ進めます。",
    systemMapLabel: "システムマップ",
    systemMapTitle: "事業課題からセキュアなAI配備までを一つの経路として設計する。",
    systemMapBody:
      "実装前に、事業目的から配備判断までを一つの流れで整理します。",
    capabilitiesLabel: "対応領域",
    capabilitiesTitle: "BitLabsが構築するもの。",
    approachLabel: "進め方",
    approachTitle: "まず課題を捉え、そのうえで最適な構成を決めます。",
    approachBody:
      "既成パターンを当てはめるのではなく、業務課題に合うモデル、推論、アプリ構成を選びます。",
    approachSteps: [
      {
        phase: "01. ワークショップ",
        title: "業務課題を明確にする。",
        body: "痛点、既存システム、制約条件を整理します。",
        marker: "課題整理",
      },
      {
        phase: "02. 解決策の設計",
        title: "最適な構成を決める。",
        body: "アーキテクチャ、モデル方針、推論経路、統制境界を定義します。",
        marker: "最適提案",
      },
      {
        phase: "03. MVP開発",
        title: "価値検証用のMVPを構築する。",
        body: "技術適合性と利用価値を確認できる最小構成を作ります。",
        marker: "MVP開発",
      },
    ],
    approachVisualLabel: "進行フロー",
    approachVisualValue: "課題整理からMVPへ",
    approachOutcomeLabel: "進行結果",
    approachOutcomeTitle: "課題から本番導入につながる道筋を明確にする。",
    approachOutcomeBody:
      "環境に合う形で、次の開発判断へ無理なく進めます。",
    securityLabel: "セキュリティと配備",
    securityTitle: "本番品質のAIは、設計段階から統制と評価を組み込みます。",
    securityBody:
      "アクセス境界、データ取り扱い、推論隔離、評価基準を初期設計から組み込みます。",
    securityPoints: [
      "プライベート基盤を含む配備構成と明確な信頼境界",
      "モデル利用、ツール実行、データ取り扱いを統制する連携設計",
      "説明責任が求められる環境を前提にした評価とリリース設計",
    ],
  },
};

export const aboutContent: Record<Language, AboutContent> = {
  en: {
    metadataTitle: "About",
    metadataDescription: "Company profile for BitLabs, a Tokyo-based AI research and engineering lab.",
    eyebrow: "About",
    title: "A Tokyo-based AI research and engineering lab.",
    body:
      "BitLabs works with teams that need careful technical judgment and practical AI delivery.",
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
    title: "東京を拠点に、AIの研究開発と実装を行うラボです。",
    body:
      "BitLabsは東京を拠点に、慎重な技術判断と現実的なAI実装を重視しています。",
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
      "BitLabs services for agentic systems, enterprise AI architecture, pre-training, fine-tuning, inference stack design, and secure deployment.",
    eyebrow: "Services",
    title: "Services for teams building serious AI systems.",
    body:
      "We keep scope tight, focus on the operating problem, and build only what moves the system forward.",
    problemLabel: "Need",
    responseLabel: "BitLabs",
    outcomeLabel: "Result",
    processLabel: "Build Path",
    processTitle: "Short path: align, design, build, launch.",
  },
  ja: {
    metadataTitle: "サービス",
    metadataDescription:
      "BitLabsの本番AIエージェント、MVP開発、エンタープライズAI設計、モデル適応、セキュア導入に関するサービス紹介。",
    eyebrow: "サービス",
    title: "本番導入を見据えたAIサービス。",
    body:
      "スコープを絞り、運用課題に直結するものから構築します。",
    problemLabel: "ニーズ",
    responseLabel: "BitLabsの対応",
    outcomeLabel: "結果",
    processLabel: "構築ステップ",
    processTitle: "短い流れで進めます。整理、設計、実装、導入。",
  },
};

export const expertisePageContent: Record<Language, ExpertisePageContent> = {
  en: {
    metadataTitle: "Expertise",
    metadataDescription:
      "BitLabs expertise across enterprise AI architecture, pre-training, fine-tuning, inference engineering, and agentic systems.",
    eyebrow: "Expertise",
    title: "Architecture, model programs, inference stacks, and agentic systems.",
    body:
      "BitLabs connects model work, serving design, and application control so enterprise teams can move with clarity.",
    advisoryLabel: "Business Advisory",
    advisoryTitle: "Design AI systems that fit real business constraints.",
    advisoryBody:
      "We shape architecture around the existing business, systems, approvals, and data rules.",
    parallelismLabel: "Inference Engineering",
    parallelismTitle: "Inference engineering for high-throughput, low-latency AI.",
    parallelismBody:
      "We design serving paths that balance latency, GPU efficiency, and deployment constraints.",
    frameworkLabel: "Agentic Solutions",
    frameworkTitle: "Design agentic systems with control and traceability.",
    frameworkBody:
      "We align orchestration, tool access, escalation, and model behavior with operating control requirements.",
    frameworkPoints: [
      "Explicit permissions, escalation paths, and auditability.",
      "Model adaptation tied to domain behavior and release criteria.",
      "Secure integration for internal data, tools, and human review.",
    ],
  },
  ja: {
    metadataTitle: "専門領域",
    metadataDescription:
      "BitLabsの専門領域。エンタープライズAI設計、事前学習、ファインチューニング、推論エンジニアリング、AIエージェント設計。",
    eyebrow: "専門領域",
    title: "AI設計、モデル開発、推論基盤、AIエージェント設計。",
    body:
      "BitLabsは、モデル開発、推論設計、アプリ制御を一体で扱います。",
    advisoryLabel: "事業課題への適用",
    advisoryTitle: "実際の事業制約に合うAIシステムを設計する。",
    advisoryBody:
      "既存業務、承認フロー、システム制約に合う導入方針を組み立てます。",
    parallelismLabel: "推論エンジニアリング",
    parallelismTitle: "高スループット・低レイテンシAIのための推論設計。",
    parallelismBody:
      "モデル規模、負荷特性、本番制約に合わせて推論経路を設計します。",
    frameworkLabel: "エージェントソリューション",
    frameworkTitle: "統制と追跡性を備えたAIエージェント設計。",
    frameworkBody:
      "説明責任が必要な環境で、オーケストレーション、権限、確認経路を設計します。",
    frameworkPoints: [
      "権限管理、承認フロー、監査可能性を備えた設計。",
      "業務ドメインに合わせたモデル適応とリリース基準の接続。",
      "社内データ、外部ツール、人の確認工程を安全につなぐ統合設計。",
    ],
  },
};

export const researchContent: Record<Language, ResearchContent> = {
  en: {
    metadataTitle: "Research",
    metadataDescription:
      "Research areas at BitLabs across Diffusion Language Models, pre-training, fine-tuning, inference engineering, and reliability for production AI systems.",
    eyebrow: "Research",
    title: "Research that makes AI systems more usable in production.",
    body:
      "At BitLabs, we actively research AI and build PoCs to test model behavior, inference design, and reliability before production decisions are made.",
    labLabel: "Public Lab Notes",
    labTitle: "Research and PoC work help us separate promising ideas from deployable systems.",
    focusLabel: "Focus",
    methodLabel: "Method",
    signalLabel: "Signal",
    inferenceLabel: "Model and Inference Research",
    inferenceTitle: "We study both the model program and the serving layer.",
    inferencePoints: [
      "Which data quality signals should stop a training run early.",
      "Which evaluation results actually predict usefulness in the target workflow.",
      "How serving limits should shape model choice before product work starts.",
    ],
    reliabilityLabel: "Reliability",
    reliabilityTitle: "Research matters because AI systems need evidence before they earn production trust.",
    reliabilityPoints: [
      "Evaluation across quality, latency, safety, and controllability.",
      "Reliability testing for tool use, planning behavior, and escalation paths.",
      "Release criteria aligned to governance and deployment requirements.",
    ],
    note: "Some research and PoC work stays private because of confidentiality constraints.",
  },
  ja: {
    metadataTitle: "研究",
    metadataDescription:
      "BitLabsが取り組むDiffusion Language Model、事前学習、ファインチューニング、推論エンジニアリング、信頼性に関する研究領域。",
    eyebrow: "研究",
    title: "AIシステムを本番で使える形に近づける研究。",
    body:
      "BitLabsでは、AIの研究とPoC構築を継続的に行い、モデル挙動、推論設計、信頼性を本番判断の前に検証しています。",
    labLabel: "公開ラボノート",
    labTitle: "研究とPoCは、有望なアイデアと本番導入できる仕組みを切り分けるために重要です。",
    focusLabel: "焦点",
    methodLabel: "方法",
    signalLabel: "確認する兆候",
    inferenceLabel: "モデル・推論研究",
    inferenceTitle: "モデル設計と配信層の両方を研究します。",
    inferencePoints: [
      "どのデータ品質シグナルで学習実験を早めに止めるべきか。",
      "どの評価結果が実業務の有用性を予測できるか。",
      "配信制約がモデル選定にどう影響するか。",
    ],
    reliabilityLabel: "信頼性",
    reliabilityTitle: "AI研究が重要なのは、本番投入の前に根拠を持って判断する必要があるためです。",
    reliabilityPoints: [
      "品質、遅延、安全性、制御性を横断する評価。",
      "ツール利用、計画挙動、確認経路に対する信頼性検証。",
      "本番利用前に行うガバナンス要件に沿ったリリース判定。",
    ],
    note: "一部の研究やPoC案件は機密性のため公開していません。",
  },
};

export const contactContent: Record<Language, ContactContent> = {
  en: {
    metadataTitle: "Contact",
    metadataDescription:
      "Contact BitLabs about enterprise AI architecture, pre-training, fine-tuning, inference stack design, and sovereign deployment.",
    eyebrow: "Contact",
    title: "Start a focused technical conversation.",
    body:
      "Tell us what you want to build and the key constraints. We will reply with a practical next step.",
    emailLabel: "Email",
    locationLabel: "Location",
    responseLabel: "Typical response",
    responseTime: "Within 1 business day",
  },
  ja: {
    metadataTitle: "お問い合わせ",
    metadataDescription: "AIエージェント、事前学習、ファインチューニング、推論基盤、研究開発、エンタープライズ導入についてBitLabsへお問い合わせください。",
    eyebrow: "お問い合わせ",
    title: "技術前提を含めてご相談ください。",
    body:
      "実現したいことと重視する制約条件をご共有ください。初期の進め方をご提案します。",
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
