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
      title: "We need an AI agent in production.",
      problem:
        "Teams have agent demos, but not a controlled workflow people can use against real tools and data.",
      response:
        "We design agent permissions, memory, orchestration, escalation, evaluation, and human review as one operating system.",
      outcome:
        "Your team gets an AI agent system aligned to business goals, integrated with real tools, and ready for controlled rollout.",
    },
    {
      title: "We need a private model strategy.",
      problem:
        "Generic model adoption does not answer where data lives, who owns model behavior, or how adaptation should improve domain performance.",
      response:
        "We define the model path across buy, adapt, fine-tune, or train decisions, with data boundaries and evaluation gates attached.",
      outcome:
        "Leadership gets a practical build plan that connects technical decisions directly to KPIs, risk controls, and operating responsibility.",
    },
    {
      title: "We need lower-latency inference.",
      problem:
        "Useful AI systems can fail commercially when token latency, GPU memory pressure, traffic spikes, or serving cost are ignored.",
      response:
        "We shape the serving path around batching, KV cache behavior, GPU parallelism, memory planning, and deployment envelope.",
      outcome:
        "Teams get AI applications that feel responsive, operate within infrastructure constraints, and scale with clearer capacity assumptions.",
    },
    {
      title: "We need AI software users can run every day.",
      problem:
        "Most AI demos break when they meet real workflows, real users, and the operational edge cases that product teams have to own.",
      response:
        "We combine React product engineering, context architecture, prompt systems, backend integration, and testable evaluation loops.",
      outcome:
        "Users get AI products that fit real operating workflows instead of isolated prototypes that cannot survive production use.",
    },
    {
      title: "We need secure AI deployment.",
      problem:
        "AI systems need stronger deployment discipline than ordinary demos because they touch data, tools, permissions, and business decisions.",
      response:
        "We design around trust boundaries, environment separation, least privilege, data sovereignty, observability, and release controls.",
      outcome:
        "Teams can launch AI applications with clearer operational control, safer integrations, and deployment patterns that respect where sensitive data can live and move.",
    },
  ],
  ja: [
    {
      title: "AIエージェントを本番で使いたい。",
      problem:
        "エージェントのデモはあっても、実データや実ツールに接続して安全に運用できる業務フローになっていない。",
      response:
        "ツール権限、メモリ、オーケストレーション、エスカレーション、評価、人の確認工程を一つの運用システムとして設計します。",
      outcome:
        "実業務のツールと接続され、事業目標に沿って運用できるAIエージェントシステムを実現します。",
    },
    {
      title: "自社に合うプライベートモデル戦略が必要。",
      problem:
        "汎用モデルを導入するだけでは、データの所在、モデル挙動の所有性、ドメイン性能の改善方針が明確になりません。",
      response:
        "購入、適応、ファインチューニング、学習の判断を、データ境界と評価ゲートに接続して設計します。",
      outcome:
        "事業要件と技術要件が分断されない導入計画をつくり、複数部門に展開可能なAI基盤へつなげます。",
    },
    {
      title: "より低レイテンシな推論が必要。",
      problem:
        "トークン遅延、GPUメモリ、アクセス集中、推論コストを無視すると、価値あるAIでも事業利用に耐えられません。",
      response:
        "バッチング、KVキャッシュ、GPU並列化、メモリ計画、配備制約に合わせて推論経路を設計します。",
      outcome:
        "ユーザー体験を損なわず、インフラ制約内で運用しやすいAIアプリケーションを実現します。",
    },
    {
      title: "毎日使えるAIソフトウェアが必要。",
      problem:
        "AIの価値は単発デモでは定着せず、現場の業務フロー、例外処理、既存システムに組み込まれて初めて継続利用されます。",
      response:
        "Reactのプロダクト開発、コンテキスト設計、プロンプトシステム、バックエンド連携、評価ループを組み合わせます。",
      outcome:
        "業務に適合し、継続運用しやすいAIプロダクトとして現場定着を支援します。",
    },
    {
      title: "安全なAI配備が必要。",
      problem:
        "AIシステムはデータ、ツール権限、業務判断に関わるため、通常のデモ以上に慎重な配備設計が必要です。",
      response:
        "信頼境界、環境分離、最小権限、データ主権、可観測性、リリース統制を前提に設計します。",
      outcome:
        "安全な連携、明確な運用統制、継続改善しやすい構成でAIアプリケーションを展開できます。",
    },
  ],
};

export const expertiseAreas: Record<Language, ExpertiseArea[]> = {
  en: [
    {
      title: "Enterprise AI architecture for business-critical environments",
      summary:
        "We translate messy operational realities into enterprise AI architectures that make technical sense, commercial sense, and governance sense at the same time.",
      points: [
        "Map business constraints into architectures that teams can implement and sustain.",
        "Prioritize AI interventions around data boundaries, model ownership, risk control, and decision speed.",
        "Design delivery around existing systems, approval paths, operational ownership, and sovereignty requirements.",
      ],
    },
    {
      title: "Inference engineering with GPU parallelism",
      summary:
        "We design serving systems that use GPU parallelism deliberately, balancing latency, throughput, memory pressure, and operating cost.",
      points: [
        "Shape tensor, pipeline, data, sequence, and expert parallelism for model size, traffic pattern, and latency target.",
        "Optimize inference paths around batching, KV cache behavior, GPU memory limits, and interconnect communication.",
        "Carry serving decisions into observability, capacity planning, failover, security, and sovereign deployment operations.",
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

export const researchLabNotes: Record<Language, ResearchLabNote[]> = {
  en: [
    {
      label: "Diffusion LM",
      title: "Diffusion Language Model research",
      focus: "Alternative generation dynamics, controllability, and practical deployment tradeoffs.",
      method: "Study training objectives, denoising behavior, sampling strategies, and evaluation patterns against autoregressive baselines.",
      signal: "Clearer understanding of where diffusion-based language models create real product or research advantage.",
    },
    {
      label: "Fine-tuning",
      title: "Adaptation pipelines that keep evaluation attached",
      focus: "Post-training methods for business language, tool behavior, and policy-aligned response shape.",
      method: "Pair fine-tuning runs with regression suites, refusal checks, and domain task scorecards.",
      signal: "Safer iteration cycles where model changes are measured before release.",
    },
    {
      label: "KV Cache",
      title: "Memory-aware long-context serving",
      focus: "The serving constraints that shape real token latency and infrastructure cost.",
      method: "Study cache pressure, sequence length, batching strategy, and eviction behavior across workloads.",
      signal: "More stable long-context sessions and fewer surprises under production traffic.",
    },
    {
      label: "Batching",
      title: "Scheduling for latency and GPU utilization",
      focus: "Balancing responsive user experience with efficient accelerator usage.",
      method: "Tune queueing, micro-batches, priority classes, and workload segmentation for real traffic shape.",
      signal: "Predictable p95 latency and clearer cost envelopes for rollout planning.",
    },
    {
      label: "Agent Reliability",
      title: "Bounded autonomy across tools and review paths",
      focus: "Agent plans, tool calls, memory, escalation, and human review in high-accountability workflows.",
      method: "Replay traces, inject failures, test permission boundaries, and measure recovery behavior.",
      signal: "Agents that degrade safely and keep operators informed when uncertainty rises.",
    },
    {
      label: "Evaluation",
      title: "Release criteria for production AI systems",
      focus: "Quality, safety, latency, cost, tool behavior, and governance readiness.",
      method: "Build scenario suites, rubric checks, adversarial cases, and release gates tied to operating risk.",
      signal: "A practical go/no-go process for models and agentic applications.",
    },
  ],
  ja: [
    {
      label: "Diffusion LM",
      title: "Diffusion Language Modelの研究",
      focus: "生成の仕組み、制御性、実運用上のトレードオフ。",
      method: "自己回帰モデルとの比較を前提に、学習目的、ノイズ除去挙動、サンプリング戦略、評価パターンを検証します。",
      signal: "拡散型言語モデルが実際に優位になる条件を明確にします。",
    },
    {
      label: "ファインチューニング",
      title: "評価を接続した適応パイプライン",
      focus: "業務語彙、ツール挙動、ポリシーに沿った応答形式のポストトレーニング。",
      method: "回帰テスト、拒否応答確認、ドメインタスク評価とファインチューニングを組み合わせます。",
      signal: "モデル変更を本番前に測定できる安全な改善サイクル。",
    },
    {
      label: "KVキャッシュ",
      title: "長文脈配信のメモリ最適化",
      focus: "実際のトークン遅延とインフラコストを決める配信制約。",
      method: "キャッシュ圧力、系列長、バッチ戦略、退避挙動をワークロード別に検証します。",
      signal: "長文脈セッションの安定性を高め、本番負荷時の不確実性を減らします。",
    },
    {
      label: "バッチング",
      title: "遅延とGPU利用率のためのスケジューリング",
      focus: "応答性とアクセラレータ効率のバランス。",
      method: "キュー、マイクロバッチ、優先度、ワークロード分割を実トラフィックに合わせて調整します。",
      signal: "予測しやすいp95遅延と、展開計画に使えるコスト見通し。",
    },
    {
      label: "エージェント信頼性",
      title: "ツールと確認経路を持つ限定的自律性",
      focus: "高い説明責任が必要な業務での計画、ツール実行、メモリ、エスカレーション。",
      method: "実行トレース再生、障害注入、権限境界テスト、復旧挙動の測定を行います。",
      signal: "不確実性が上がった時に安全に縮退し、運用者へ状態を伝えるエージェント。",
    },
    {
      label: "評価",
      title: "本番AIシステムのリリース基準",
      focus: "品質、安全性、遅延、コスト、ツール挙動、ガバナンス準備。",
      method: "シナリオスイート、ルーブリック、攻撃的ケース、運用リスクに紐づくゲートを構築します。",
      signal: "モデルとエージェントアプリの実用的なリリース判断プロセス。",
    },
  ],
};

export const principles: Record<Language, string[]> = {
  en: [
    "Technical rigor over AI theater",
    "Research, engineering, and deployment decisions reviewed as one system",
    "Security, sovereignty, and control designed in from the first architecture pass",
    "Research translated into deployable systems",
    "Measured outcomes over inflated claims",
  ],
  ja: [
    "流行語より技術的な整合性を重視する",
    "研究、実装、導入判断を一つのシステムとして扱う",
    "セキュリティと統制を最初の設計から組み込む",
    "研究を実装可能な価値へ変換する",
    "誇張ではなく測定可能な成果で示す",
  ],
};

export const teamStrengths: Record<Language, string[]> = {
  en: [
    "Close collaboration between research, product, and implementation work",
    "Clear ownership from first architecture review through launch preparation",
    "Practical judgment on when to prototype, adapt, or build deeper infrastructure",
    "Documentation and handoff practices shaped for enterprise teams",
    "Careful handling of client context, constraints, and confidential work",
  ],
  ja: [
    "研究、プロダクト、実装を近い距離で接続する体制",
    "初期設計レビューから導入準備まで責任範囲を明確にする進め方",
    "試作、適応、深い基盤構築のどれを選ぶべきかを見極める判断力",
    "企業チームへ引き継ぎやすいドキュメントと運用整理",
    "顧客の文脈、制約、機密情報を慎重に扱う姿勢",
  ],
};

export const labCapabilities: Record<Language, LabCapability[]> = {
  en: [
    {
      label: "01 / Agents",
      title: "Agentic solution development",
      body:
        "Tool permissions, memory strategy, orchestration, escalation paths, and review loops designed for accountable production workflows.",
    },
    {
      label: "02 / Pre-training",
      title: "LLM and SLM training programs",
      body:
        "Dataset strategy, objective design, training infrastructure, fine-tuning pipelines, and evaluation harnesses handled as one system.",
    },
    {
      label: "03 / Inference",
      title: "Inference stack architecture",
      body:
        "Serving paths, GPU parallelism, batching strategy, memory pressure, and deployment boundaries shaped for production latency and cost.",
    },
    {
      label: "04 / Reliability",
      title: "Enterprise delivery discipline",
      body:
        "Quality, latency, safety, tool behavior, and failure modes measured before a system is treated as production-ready.",
    },
  ],
  ja: [
    {
      label: "01 / エージェント",
      title: "エージェントソリューション開発",
      body:
        "ツール権限、メモリ設計、オーケストレーション、エスカレーション、人による確認工程を本番運用前提で設計します。",
    },
    {
      label: "02 / 事前学習",
      title: "LLM・SLMの学習プログラム設計",
      body:
        "データ設計、学習戦略、ファインチューニング、評価ハーネス、配備制約を一つのシステムとして扱います。",
    },
    {
      label: "03 / 推論",
      title: "推論スタックアーキテクチャ",
      body:
        "配信経路、GPU並列化、バッチング、メモリ制約、導入境界を本番レイテンシと運用コストに合わせて設計します。",
    },
    {
      label: "04 / 信頼性",
      title: "エンタープライズ導入規律",
      body:
        "品質、遅延、安全性、ツール挙動、障害モードを測定し、本番運用に進める条件を明確にします。",
    },
  ],
};

export const productionProofs: Record<Language, ProductionProof[]> = {
  en: [
    {
      label: "Research",
      value: "Model programs",
      body: "Study pre-training, post-training, controllability, and the limits of agentic workflows.",
    },
    {
      label: "Architecture",
      value: "Inference boundaries",
      body: "Translate business constraints into model, data, tool, serving, and deployment boundaries.",
    },
    {
      label: "Implementation",
      value: "Working systems",
      body: "Build focused MVPs, agentic solutions, and custom AI applications with measurable learning goals.",
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
      value: "モデルプログラム",
      body: "事前学習、ポストトレーニング、制御性、エージェント型ワークフローの限界を検証します。",
    },
    {
      label: "設計",
      value: "推論境界",
      body: "事業制約を、モデル、データ、ツール、推論、配備の境界設計へ落とし込みます。",
    },
    {
      label: "実装",
      value: "動くシステム",
      body: "MVP、エージェントソリューション、専用AIアプリ、連携基盤を、検証すべき学習目標とともに構築します。",
    },
    {
      label: "運用",
      value: "信頼できる展開",
      body: "リリース基準、可観測性、ガバナンス、継続改善を接続します。",
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
      "Tokyo-based AI R&D company helping enterprise teams turn complex AI ideas into usable systems.",
    location: "Tokyo, Japan",
    email: "hello@bitlabs.site",
    copyright: "All rights reserved.",
    socialAriaLabel: (name) => `View BitLabs on ${name}`,
  },
  ja: {
    summary:
      "東京を拠点とするAI研究開発企業。複雑なAI構想を、企業で使えるシステムへ落とし込みます。",
    location: "東京、日本",
    email: "hello@bitlabs.site",
    copyright: "無断転載・無断使用を禁じます。",
    socialAriaLabel: (name) => `BitLabsの${name}を見る`,
  },
};

export const homeContent: Record<Language, HomeContent> = {
  en: {
    location: "Tokyo AI Research and Engineering Lab",
    heroTitle: "Enterprise AI systems, engineered from research to deployment.",
    heroBody:
      "BitLabs helps organizations move from AI ambition to working systems with clear architecture, careful implementation, and disciplined release planning.",
    heroStatementLabel: "Research to production",
    heroStatement:
      "We keep technical decisions tied to business outcomes, protected data boundaries, and launch readiness.",
    heroReadout: ["Architecture review", "Focused MVP", "Release criteria", "Operational handoff"],
    heroHighlightsLabel: "Engagement signals",
    heroHighlights: [
      {
        label: "Scope",
        value: "Clear before build",
        body: "The first step is defining what the system should do, what it should not do, and how success will be judged.",
      },
      {
        label: "Ownership",
        value: "One accountable path",
        body: "Architecture, implementation, and release decisions stay connected instead of moving through separate handoffs.",
      },
      {
        label: "Judgment",
        value: "Measured progress",
        body: "Work advances through evidence, constraints, and operating risk rather than broad AI claims.",
      },
    ],
    primaryCta: "Talk to BitLabs",
    secondaryCta: "Explore expertise",
    missionLabel: "Mission",
    missionBody:
      "Turn serious AI research into dependable systems that create measurable business value under real operational constraints, clear ownership, and protected data boundaries.",
    missionAttribution: "- BitLabs CEO David Bong",
    visionLabel: "Vision",
    visionBody:
      "Build a future where technically rigorous AI systems can be deployed with the same discipline expected of critical production infrastructure.",
    visionAttribution: "- BitLabs CEO David Bong",
    labLabel: "Expert Lab",
    labTitle: "Deep capability across model programs, inference architecture, and agentic delivery.",
    labBody:
      "The homepage gives the short version: BitLabs connects model decisions, application design, and deployment discipline so enterprise AI work can move beyond isolated demos.",
    productionLabel: "Research to Production",
    productionTitle: "From research direction to production system.",
    productionBody:
      "We use focused MVPs to test value, then carry validated workflows into implementation, release review, and operational handoff.",
    systemMapLabel: "System Map",
    systemMapTitle: "One path from business problem to secure AI deployment.",
    systemMapBody:
      "Before implementation, we map the operating path so business goals, data rules, model choices, workflow behavior, and release gates are understood together.",
    capabilitiesLabel: "Capabilities",
    capabilitiesTitle: "What BitLabs builds for customers.",
    approachLabel: "Approach",
    approachTitle: "We start with the problem, then design the right model, serving, and application path.",
    approachBody:
      "BitLabs does not force a prepackaged AI solution onto client teams. We begin with a working session to understand pain points, systems, constraints, sovereignty requirements, and success criteria. From there, we shape the best-fit model, inference, and application architecture and move into focused MVP development.",
    approachSteps: [
      {
        phase: "01. Workshop",
        title: "Understand the pain points in operational detail.",
        body: "We map business friction, system dependencies, data boundaries, and the failure tolerance that will shape the solution.",
        marker: "Pain points",
      },
      {
        phase: "02. Solution Design",
        title: "Curate the right stack before building.",
        body: "We define the right architecture, model approach, inference path, sovereignty boundary, and control surfaces instead of defaulting to generic AI patterns.",
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
      "Clients move forward with a solution shaped around their environment, their data boundaries, their inference envelope, and their long-term model ownership.",
    securityLabel: "Security & Deployment",
    securityTitle: "Production AI starts with architecture, data sovereignty, control boundaries, and evaluation.",
    securityBody:
      "BitLabs treats security, access control, data handling, sovereignty requirements, inference isolation, and release evaluation as core parts of system design, not cleanup work after a prototype is already built.",
    securityPoints: [
      "Deployment architectures designed with private infrastructure options, regional control, and explicit trust boundaries",
      "Policy-led integration patterns for model access, tool use, data handling, and sovereignty enforcement",
      "Evaluation and release criteria shaped for regulated or high-accountability environments",
    ],
  },
  ja: {
    location: "東京のAI研究開発・エンジニアリングラボ",
    heroTitle: "研究から導入までを見据えた、エンタープライズAIシステム。",
    heroBody:
      "BitLabsは、AI構想を実際に動くシステムへ落とし込むために、アーキテクチャ、実装、リリース判断を一貫して支援します。",
    heroStatementLabel: "MVPから本番へ",
    heroStatement:
      "技術判断を、事業成果、保護すべきデータ境界、リリース可能性に結びつけて進めます。",
    heroReadout: ["設計レビュー", "集中MVP", "リリース基準", "運用引き継ぎ"],
    heroHighlightsLabel: "進め方の基準",
    heroHighlights: [
      {
        label: "スコープ",
        value: "作る前に明確化",
        body: "何を実現し、何を対象外にし、何で成功を判断するかを最初に定義します。",
      },
      {
        label: "責任範囲",
        value: "一貫した導入経路",
        body: "設計、実装、リリース判断を分断せず、一つの流れとして扱います。",
      },
      {
        label: "判断",
        value: "測定に基づく進行",
        body: "大きな主張ではなく、検証結果、制約条件、運用リスクに基づいて進めます。",
      },
    ],
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
    labTitle: "モデル開発、推論基盤、エージェント実装を横断する専門性。",
    labBody:
      "ホームでは、BitLabsの全体像を短く示します。モデル判断、アプリケーション設計、導入規律をつなぎ、単発デモで終わらないAI開発を進めます。",
    productionLabel: "研究から本番へ",
    productionTitle: "研究の方向性からMVPへ、そして本番へ。",
    productionBody:
      "価値検証に必要なMVPをつくり、有効な業務フローを実装、リリース判断、運用引き継ぎへ進めます。",
    systemMapLabel: "システムマップ",
    systemMapTitle: "事業課題からセキュアなAI配備までを一つの経路として設計する。",
    systemMapBody:
      "実装前に、事業目的、データルール、モデル選定、業務挙動、リリース判断を一つの流れとして整理します。",
    capabilitiesLabel: "対応領域",
    capabilitiesTitle: "BitLabsが顧客のために構築するもの。",
    approachLabel: "進め方",
    approachTitle: "まず課題を捉え、そのうえで最適なモデル・推論・アプリ構成を決めます。",
    approachBody:
      "BitLabsは、既成のAIパターンをそのまま当てはめません。まず業務上の痛点、既存システム、制約条件、データ主権要件、成功指標を整理し、そのうえで最適なモデル方針、推論経路、アプリ構成を定義してMVPへ進みます。",
    approachSteps: [
      {
        phase: "01. ワークショップ",
        title: "現場の痛みと制約を具体的に把握する。",
        body: "業務上のボトルネック、既存システムとの関係、データ境界、許容できる失敗範囲まで含めて整理します。",
        marker: "課題整理",
      },
      {
        phase: "02. 解決策の設計",
        title: "最適なスタックを選定して提案する。",
        body: "汎用的なAI導入パターンに当てはめるのではなく、お客様の状況に合うアーキテクチャ、モデル方針、推論経路、運用境界を設計します。",
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
      "お客様の環境に合った形で、過剰な投資や遠回りを避けながら、モデル所有性と推論制約まで踏まえた次の開発判断へ進めます。",
    securityLabel: "セキュリティと配備",
    securityTitle: "本番品質のAIは、設計段階から統制と評価を組み込みます。",
    securityBody:
      "BitLabsは、アクセス境界、データ取り扱い、ツール権限、推論隔離、評価基準をアーキテクチャの初期段階から設計し、企業のリスク要件に合わせた導入を行います。",
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
    metadataDescription: "Company profile for BitLabs, a Tokyo-based AI research and engineering lab.",
    eyebrow: "About",
    title: "A Tokyo-based AI research and engineering lab.",
    body:
      "BitLabs is based in Tokyo and works with teams that need careful technical judgment, practical execution, and responsible handling of sensitive AI work.",
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
    metadataDescription: "東京拠点のAI研究開発・エンジニアリングラボ、BitLabsの会社概要です。",
    eyebrow: "会社情報",
    title: "東京を拠点に、AIの研究開発と実装を行うラボです。",
    body:
      "BitLabsは東京を拠点に、慎重な技術判断、現実的な実行、機密性の高いAI業務の取り扱いを重視して活動しています。",
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
      "BitLabs services for agentic systems, enterprise AI architecture, pre-training, fine-tuning, inference stack design, and secure deployment.",
    eyebrow: "Services",
    title: "Services organized around the buyer problem.",
    body:
      "Each engagement starts with the practical question the organization is trying to answer. From there we decide what to build, what to measure, and what should remain out of scope.",
    problemLabel: "Problem",
    responseLabel: "Technical Response",
    outcomeLabel: "Outcome",
    processLabel: "Build Path",
    processTitle: "Short, focused execution: KPI alignment, MVP, production hardening.",
  },
  ja: {
    metadataTitle: "サービス",
    metadataDescription:
      "BitLabsの本番AIエージェント、MVP開発、エンタープライズAI設計、モデル適応、セキュア導入に関するサービス紹介。",
    eyebrow: "サービス",
    title: "買い手の課題から整理するサービス。",
    body:
      "各プロジェクトは、組織が解きたい実務上の問いから始めます。そのうえで、何を作るか、何を測るか、どこまでを対象外にするかを決めます。",
    problemLabel: "課題",
    responseLabel: "技術的対応",
    outcomeLabel: "期待効果",
    processLabel: "構築ステップ",
    processTitle: "短く集中した実行。KPI整理、MVP、本番品質化。",
  },
};

export const expertisePageContent: Record<Language, ExpertisePageContent> = {
  en: {
    metadataTitle: "Expertise",
    metadataDescription:
      "BitLabs expertise across enterprise AI architecture, pre-training, fine-tuning, inference engineering, and agentic systems.",
    eyebrow: "Expertise",
    title: "Enterprise AI architecture, model programs, inference stacks, and agentic systems.",
    body:
      "BitLabs helps teams build AI systems that fit enterprise constraints, protect sensitive data, and support long-term ownership of model behavior. Our expertise connects pre-training and fine-tuning strategy with model serving, GPU efficiency, and agentic application control.",
    advisoryLabel: "Business Advisory",
    advisoryTitle: "Design AI systems that fit real business constraints and sovereignty requirements.",
    advisoryBody:
      "We work from operational constraints outward, shaping enterprise AI architectures that fit the existing business, approval, systems, and data-governance landscape instead of forcing generic tooling into it.",
    parallelismLabel: "Inference Engineering",
    parallelismTitle: "GPU parallelism for high-throughput, low-latency AI inference.",
    parallelismBody:
      "For demanding AI applications, inference is a product bottleneck: users feel latency, finance feels GPU waste, and operators feel instability. We design serving paths that use GPU parallelism intentionally across model size, traffic shape, production constraints, and sovereignty-aware deployment patterns.",
    frameworkLabel: "Agentic Solutions",
    frameworkTitle: "Design advanced agentic systems with control, traceability, and operational clarity.",
    frameworkBody:
      "We architect agentic systems for high-accountability environments, aligning orchestration, tool access, escalation paths, decision boundaries, and proprietary model behavior with operational control requirements.",
    frameworkPoints: [
      "Policy-aware agent design with explicit permissions, escalation paths, and auditability.",
      "Model adaptation choices that keep domain behavior and release criteria tied to operational reality.",
      "Secure integration patterns for internal data, external tools, human-in-the-loop controls, and sovereign data handling.",
      "Operational governance covering traceability, risk boundaries, model ownership, and production readiness.",
    ],
  },
  ja: {
    metadataTitle: "専門領域",
    metadataDescription:
      "BitLabsの専門領域。エンタープライズAI設計、事前学習、ファインチューニング、推論エンジニアリング、AIエージェント設計。",
    eyebrow: "専門領域",
    title: "エンタープライズAI設計、モデル開発、推論基盤、AIエージェント設計。",
    body:
      "BitLabsは、ユーザーに価値が届くAIアプリケーション設計と、その背後に必要な事前学習・ファインチューニング方針、モデル配信、GPU、信頼性のエンジニアリングを一体で扱います。",
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
      "業務ドメインに合わせたモデル適応と、リリース基準を接続した設計。",
      "社内データ、外部ツール、人の確認工程を安全につなぐ統合設計。",
      "トレーサビリティ、リスク境界、本番運用基準を含む運用ガバナンス設計。",
    ],
  },
};

export const researchContent: Record<Language, ResearchContent> = {
  en: {
    metadataTitle: "Research",
    metadataDescription:
      "Research areas at BitLabs across Diffusion Language Models, pre-training, fine-tuning, inference engineering, and reliability for production AI systems.",
    eyebrow: "Research",
    title: "Research that improves how AI systems behave in production.",
    body:
      "BitLabs studies the control surfaces, failure modes, and evaluation methods that determine whether advanced AI systems can be deployed responsibly. We have deep research interest in Diffusion Language Models alongside pre-training, post-training, inference engineering, reliability boundaries, and the practical limits of production use.",
    labLabel: "Public Lab Notes",
    labTitle: "A lightweight notebook of the system questions we investigate.",
    focusLabel: "Focus",
    methodLabel: "Method",
    signalLabel: "Signal",
    inferenceLabel: "Model and Inference Research",
    inferenceTitle: "We study both the model program and the serving layer that determines real user experience.",
    inferencePoints: [
      "Where Diffusion Language Models offer useful tradeoffs in controllability, generation quality, or system design.",
      "What data quality signals should block a model experiment before compute is spent.",
      "Which benchmark results actually predict usefulness in the intended workflow.",
      "How serving limits should influence model choice before application design begins.",
    ],
    reliabilityLabel: "Reliability",
    reliabilityTitle: "Evaluation, failure analysis, and guardrails are built into every research cycle.",
    reliabilityPoints: [
      "Structured evaluation suites spanning quality, latency, safety, controllability, and ownership of model behavior.",
      "Reliability testing for tool use, planning behavior, escalation paths, and operational failure modes.",
      "Release criteria aligned to governance, sovereignty, and deployment requirements before production use.",
    ],
    note: "Some research engagements cannot be published because of confidentiality constraints.",
  },
  ja: {
    metadataTitle: "研究",
    metadataDescription:
      "BitLabsが取り組むDiffusion Language Model、事前学習、ファインチューニング、推論エンジニアリング、信頼性に関する研究領域。",
    eyebrow: "研究",
    title: "AIシステムを本番で成立させるための研究。",
    body:
      "BitLabsの研究は、先端性そのものを競うためではなく、AIシステムを安全かつ継続的に運用するために必要な制御性、信頼性、評価手法を高めることに焦点を当てています。Diffusion Language Modelを含むモデル研究、ファインチューニング、推論エンジニアリングが主要テーマです。",
    labLabel: "公開ラボノート",
    labTitle: "BitLabsが検証するシステム上の問い。",
    focusLabel: "焦点",
    methodLabel: "方法",
    signalLabel: "確認する兆候",
    inferenceLabel: "モデル・推論研究",
    inferenceTitle: "モデル設計と、実際のユーザー体験を決める配信層の両方を研究します。",
    inferencePoints: [
      "Diffusion Language Modelが制御性、生成品質、システム設計において有効になる条件。",
      "計算資源を使う前に、どのデータ品質シグナルで実験を止めるべきか。",
      "どのベンチマーク結果が、実際の業務有用性を予測できるのか。",
      "アプリケーション設計の前に、配信制約がモデル選定へどう影響するのか。",
    ],
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
      "Contact BitLabs about enterprise AI architecture, pre-training, fine-tuning, inference stack design, and sovereign deployment.",
    eyebrow: "Contact",
    title: "Start a serious technical conversation.",
    body:
      "Tell us what you are trying to build, what systems it needs to touch, where data must stay, and what constraints matter. We will respond with a practical path shaped by architecture, sovereignty, risk, and delivery reality.",
    emailLabel: "Email",
    locationLabel: "Location",
    responseLabel: "Typical response",
    responseTime: "Within 1 business day",
  },
  ja: {
    metadataTitle: "お問い合わせ",
    metadataDescription: "AIエージェント、事前学習、ファインチューニング、推論基盤、研究開発、エンタープライズ導入についてBitLabsへお問い合わせください。",
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
