export type Locale = "en" | "ja";
export type PageKey =
  | "home"
  | "services"
  | "research"
  | "about"
  | "contact"
  | "career";
export const pagePaths: Record<PageKey, string> = {
  home: "/",
  services: "/services",
  research: "/research",
  about: "/about",
  contact: "/contact",
  career: "/career",
};
export function localizedPath(locale: Locale, path = "/") {
  return locale === "ja" ? `/ja${path === "/" ? "" : path}` : path;
}
type Item = { title: string; body: string };
type Service = Item & { id: string; deliver: string; evaluate: string };
type Copy = {
  nav: [string, string, string, string];
  cta: string;
  explore: string;
  allServices: string;
  readExample: string;
  eyebrow: string;
  headline: [string, string];
  intro: string;
  needsTitle: string;
  needs: Item[];
  workTitle: string;
  workIntro: string;
  capabilitiesTitle: string;
  capabilities: Service[];
  deliveryTitle: string;
  delivery: Item[];
  securityTitle: string;
  securityIntro: string;
  security: Item[];
  researchTitle: string;
  researchIntro: string;
  tracks: Item[];
  aboutTitle: string;
  aboutIntro: string;
  mission: string;
  principles: Item[];
  contactTitle: string;
  contactIntro: string;
  nextTitle: string;
  nextBody: string;
  privacy: string;
  servicesTitle: string;
  servicesIntro: string;
  services: Service[];
  problemLabel: string;
  deliverLabel: string;
  evaluateLabel: string;
  closingTitle: string;
  closingBody: string;
  footer: string;
  diagram: {
    title: string;
    input: string;
    context: string;
    model: string;
    tools: string;
    review: string;
    output: string;
    rail: string;
    caption: string;
  };
};
export const editorial: Record<Locale, Copy> = {
  en: {
    nav: ["Services", "Research", "About", "Discuss your project"],
    cta: "Discuss your project",
    explore: "Explore our work",
    allServices: "Explore services",
    readExample: "Read the annotated workflow",
    eyebrow: "AI research & engineering · Tokyo",
    headline: ["Research depth.", "AI that works in your business."],
    intro:
      "BitLabs builds AI agents, adapts language models, and delivers secure applications around your workflows, data, and operating requirements. We connect research with the engineering needed to put AI into everyday use.",
    needsTitle: "Start with the work you need to improve.",
    needs: [
      {
        title: "Automate complex workflows",
        body: "Connect knowledge, tools, and human decisions so your team can move beyond repetitive handoffs.",
      },
      {
        title: "Improve model quality or efficiency",
        body: "Identify whether better context, fine-tuning, a smaller model, or inference optimization fits your constraints.",
      },
      {
        title: "Bring a prototype into production",
        body: "Turn a promising experiment into an application with clear evaluation criteria and an operating plan.",
      },
    ],
    workTitle: "Make the engineering visible.",
    workIntro:
      "An illustrative workflow shows how we think about context, permissions, and accountability. It uses synthetic data and is not a client case study or a performance benchmark.",
    capabilitiesTitle: "From model behavior to everyday use.",
    capabilities: [
      {
        id: "agents",
        title: "Agents & applications",
        body: "When a workflow spans documents, systems, and decisions.",
        deliver:
          "Context retrieval, tool integrations, and interfaces with human oversight.",
        evaluate:
          "Task completion, source grounding, and permission boundaries.",
      },
      {
        id: "models",
        title: "Models & training",
        body: "When general models do not meet domain, cost, or latency needs.",
        deliver:
          "Data preparation, model adaptation, and training pipelines where access and licensing permit.",
        evaluate:
          "Held-out quality, resource use, and comparison with a simpler baseline.",
      },
      {
        id: "production",
        title: "Production engineering",
        body: "When an AI system must fit existing operations.",
        deliver:
          "Deployment architecture, monitoring, release controls, and handover documentation.",
        evaluate: "Reliability, access control, recovery, and operating cost.",
      },
    ],
    deliveryTitle: "Agree on what good looks like. Then build toward it.",
    delivery: [
      {
        title: "Understand the workflow",
        body: "Map users, data, constraints, and the decisions that need human judgment.",
      },
      {
        title: "Establish evaluation criteria",
        body: "Set a baseline and agree on quality, latency, cost, and failure cases.",
      },
      {
        title: "Build and test",
        body: "Iterate on the model, context, tools, and interface against those criteria.",
      },
      {
        title: "Deploy and hand over",
        body: "Document operations, test recovery, and prepare the people who will run the system.",
      },
    ],
    securityTitle: "Security is part of the system design.",
    securityIntro:
      "We scope controls around your data, risk, and operating environment. Deployment options can include AWS, Azure, and private infrastructure, subject to project requirements.",
    security: [
      {
        title: "Data boundaries",
        body: "Define what a model can see, where data can travel, and what is retained.",
      },
      {
        title: "Tool permissions",
        body: "Use scoped credentials and allowlisted actions, with approval for consequential changes.",
      },
      {
        title: "Monitoring & recovery",
        body: "Plan trace visibility, incident handling, rollback, and safe failure paths.",
      },
    ],
    researchTitle: "Research that informs engineering decisions.",
    researchIntro:
      "Our research directions focus on smaller models, adaptation, agent design, and reliability. These are areas of investigation, not claims of published results.",
    tracks: [
      {
        title: "SLM development",
        body: "How can smaller language models serve focused tasks within limited compute and memory budgets? We investigate data selection, architecture, and training choices.",
      },
      {
        title: "Fine-tuning methods",
        body: "When does model adaptation outperform improvements to retrieval or prompting? We examine data quality, parameter-efficient methods, and held-out evaluation.",
      },
      {
        title: "Agentic system design",
        body: "How should context, tools, and human approval interact? We explore bounded workflows, harness design, and failure handling.",
      },
      {
        title: "Evaluation & reliability",
        body: "How can evaluation reveal failures before deployment? We study task-based testing, grounding, reproducibility, and regression checks.",
      },
    ],
    aboutTitle: "A Tokyo team connecting AI research with practical delivery.",
    aboutIntro:
      "BitLabs is an AI R&D and consulting company based in Tokyo. Our work brings together language model development, agent systems, application engineering, and secure cloud deployment.",
    mission:
      "Help people and businesses solve daily problems with practical AI, and support measurable business growth through secure, reliable systems.",
    principles: [
      {
        title: "Begin with the problem",
        body: "Understand the workflow and the people using it before choosing a model or framework.",
      },
      {
        title: "Make quality testable",
        body: "Agree on evidence, evaluate limitations, and document the conditions under which a system works.",
      },
      {
        title: "Build for the people who operate it",
        body: "Treat access controls, observability, documentation, and handover as part of delivery.",
      },
    ],
    contactTitle: "What would you like AI to help you do?",
    contactIntro:
      "Tell us about the workflow, the goal, and the constraints. A rough starting point is enough.",
    nextTitle: "What happens next",
    nextBody:
      "We will review your inquiry and follow up to understand the scope, relevant data, operating requirements, and possible next steps.",
    privacy:
      "We use the details you provide to respond to your inquiry. Please avoid including credentials, personal datasets, or confidential documents.",
    servicesTitle: "AI engineering around your business requirements.",
    servicesIntro:
      "Choose the starting point that fits your problem. We define scope and evaluation together, then connect the required model, application, and infrastructure work.",
    services: [
      {
        id: "ai-agents",
        title: "AI Agent Solutions",
        body: "Multi-step work across documents and business systems, where automation needs clear boundaries.",
        deliver:
          "Workflow design, retrieval, tool integrations, context and harness engineering, approval steps, and task traces. OpenClaw customization where appropriate.",
        evaluate:
          "Completion and escalation behavior, source grounding, tool authorization, and recovery from failed actions.",
      },
      {
        id: "enterprise-ai",
        title: "Enterprise AI Solutions",
        body: "AI initiatives that need to fit existing architecture, governance, and business processes.",
        deliver:
          "Architecture assessment, integration design, proof of concept, evaluation plan, and an implementation roadmap.",
        evaluate:
          "Workflow fit, data boundaries, stakeholder acceptance, and integration and operational constraints.",
      },
      {
        id: "model-training",
        title: "LLM/SLM Training & Fine-tuning",
        body: "Domain-specific quality, model size, or operating cost requirements that a general model may not meet.",
        deliver:
          "Data preparation, training or fine-tuning pipelines, model comparison, and inference optimization. Pre-training requires suitable data and compute; weight-level adaptation requires model access and licensing. Closed models depend on provider-supported options.",
        evaluate:
          "Held-out task quality, baseline comparison, regressions, latency, memory, and training and serving costs.",
      },
      {
        id: "ai-applications",
        title: "Custom AI Applications",
        body: "Teams need an interface that makes AI useful in their day-to-day work.",
        deliver:
          "React applications, secure backend integrations, retrieval interfaces, feedback capture, and human review workflows.",
        evaluate:
          "Task usability, accessibility, grounded responses, latency, and handling of uncertain or failed outputs.",
      },
      {
        id: "cloud-deployment",
        title: "Secure Cloud Deployment",
        body: "A prototype needs a controlled, maintainable production environment.",
        deliver:
          "Cloud or private deployment design, least-privilege access, secrets management, release pipelines, monitoring, recovery plans, and operational documentation.",
        evaluate:
          "Access boundaries, load behavior, rollback and recovery, monitoring coverage, and operating cost.",
      },
    ],
    problemLabel: "Suitable problems",
    deliverLabel: "What we deliver",
    evaluateLabel: "How we evaluate",
    closingTitle: "Bring us the problem. We’ll work through the possibilities.",
    closingBody:
      "A workflow to improve, a model to adapt, or a prototype ready for its next step.",
    footer:
      "AI research and engineering for practical business use. Based in Tokyo, Japan.",
    diagram: {
      title: "From a request to a reviewed action",
      input: "Your workflow",
      context: "Relevant context",
      model: "Model + harness",
      tools: "Permitted tools",
      review: "Human approval",
      output: "Useful action",
      rail: "Evaluate · Observe · Improve",
      caption:
        "An illustrative system: context informs the model; permissions and human review bound its actions.",
    },
  },
  ja: {
    nav: ["サービス", "研究", "会社情報", "プロジェクトのご相談"],
    cta: "プロジェクトのご相談",
    explore: "取り組みを見る",
    allServices: "サービスを見る",
    readExample: "解説付きワークフローを読む",
    eyebrow: "AI研究開発・エンジニアリング · 東京",
    headline: ["AI研究の深さを、", "事業で使える力へ。"],
    intro:
      "BitLabsは、業務フロー、データ、運用要件に合わせてAIエージェントを構築し、言語モデルを最適化し、安全なアプリケーションを届けます。研究の知見と実装力をつなぎ、AIを日々の業務で活用できる形にします。",
    needsTitle: "改善したい業務から、始めましょう。",
    needs: [
      {
        title: "複雑な業務フローを自動化する",
        body: "情報、ツール、人の判断をつなぎ、繰り返しの確認や引き継ぎを減らす仕組みを設計します。",
      },
      {
        title: "モデルの品質や効率を高める",
        body: "コンテキストの改善、追加学習、小型モデル、推論の最適化から、制約に合う方法を検討します。",
      },
      {
        title: "試作品を本番運用へ進める",
        body: "有望な実験を、評価基準と運用計画を備えたアプリケーションへ育てます。",
      },
    ],
    workTitle: "設計の考え方を、見える形に。",
    workIntro:
      "合成データを用いた説明用ワークフローで、コンテキスト、権限、責任の境界を示します。顧客事例や性能の実測結果ではありません。",
    capabilitiesTitle: "モデルの振る舞いから、日々の業務まで。",
    capabilities: [
      {
        id: "agents",
        title: "エージェントとアプリケーション",
        body: "文書、システム、人の判断にまたがる業務に。",
        deliver:
          "情報検索、ツール連携、人が確認できるインターフェースを構築します。",
        evaluate: "タスクの達成、回答の根拠、権限の境界を検証します。",
      },
      {
        id: "models",
        title: "モデル開発と学習",
        body: "汎用モデルでは専門性、コスト、遅延の要件を満たせないときに。",
        deliver:
          "データ整備、モデル調整、利用権限とライセンスに応じた学習基盤を提供します。",
        evaluate:
          "未学習データでの品質、計算資源、より単純な手法との比較で判断します。",
      },
      {
        id: "production",
        title: "本番システムの設計と運用",
        body: "AIを既存の運用体制に組み込むために。",
        deliver: "導入構成、監視、リリース管理、引き継ぎ文書を整備します。",
        evaluate: "信頼性、アクセス制御、復旧手順、運用コストを検証します。",
      },
    ],
    deliveryTitle: "目指す品質を共有し、実装で確かめる。",
    delivery: [
      {
        title: "業務を理解する",
        body: "利用者、データ、制約、人の判断が必要な箇所を整理します。",
      },
      {
        title: "評価基準を定める",
        body: "現状を基準に、品質、遅延、コスト、想定する失敗を共有します。",
      },
      {
        title: "構築し、検証する",
        body: "モデル、コンテキスト、ツール、画面を評価基準に照らして改善します。",
      },
      {
        title: "導入し、引き継ぐ",
        body: "運用を文書化し、復旧を検証して、運用担当者への引き継ぎを行います。",
      },
    ],
    securityTitle: "安全性を、設計の段階から。",
    securityIntro:
      "データ、リスク、運用環境に合わせて対策を設計します。AWS、Azure、プライベート基盤など、導入先はプロジェクトの要件に応じて検討します。",
    security: [
      {
        title: "データの境界",
        body: "モデルに渡す情報、データの移動先、保存範囲を定めます。",
      },
      {
        title: "ツールの権限",
        body: "認証情報と操作権限を必要最小限に絞り、重要な変更には承認を設けます。",
      },
      {
        title: "監視と復旧",
        body: "処理の追跡、障害対応、ロールバック、安全な停止方法を計画します。",
      },
    ],
    researchTitle: "実装の判断につながる研究。",
    researchIntro:
      "小型モデル、追加学習、エージェント設計、信頼性を研究テーマとしています。ここでは研究の方向性を紹介しており、公表済みの成果を示すものではありません。",
    tracks: [
      {
        title: "SLMの開発",
        body: "限られた計算資源とメモリで、特定の業務に役立つ小型言語モデルをどう作るか。データ選定、アーキテクチャ、学習方法を探究します。",
      },
      {
        title: "ファインチューニング手法",
        body: "検索やプロンプトの改善より追加学習が有効なのはどのような条件か。データ品質、パラメータ効率の高い手法、未学習データでの評価を検討します。",
      },
      {
        title: "エージェントシステムの設計",
        body: "コンテキスト、ツール、人の承認をどう組み合わせるか。制約を持つワークフロー、ハーネスの設計、失敗時の処理を検討します。",
      },
      {
        title: "評価と信頼性",
        body: "導入前に失敗を発見するための評価とは何か。業務単位のテスト、根拠の確認、再現性、回帰テストを研究します。",
      },
    ],
    aboutTitle: "東京から、AI研究と実用化をつなぐ。",
    aboutIntro:
      "BitLabsは東京を拠点とするAI研究開発・コンサルティング企業です。言語モデル開発、エージェントシステム、アプリケーション開発、安全なクラウド導入を組み合わせて、業務の課題に取り組みます。",
    mission:
      "実用的なAIで人と企業の日々の課題を解決し、安全で信頼できるシステムを通じて、測定可能な事業の成長を支えます。",
    principles: [
      {
        title: "課題から考える",
        body: "モデルやフレームワークを選ぶ前に、業務と利用する人を理解します。",
      },
      {
        title: "品質を確かめられる形にする",
        body: "判断の根拠を共有し、限界を評価し、システムが機能する条件を記録します。",
      },
      {
        title: "運用する人を見据えて作る",
        body: "アクセス制御、監視、文書化、引き継ぎまでを開発の一部として扱います。",
      },
    ],
    contactTitle: "AIで、どんな業務を変えたいですか。",
    contactIntro:
      "対象の業務、目標、制約をお聞かせください。構想の段階からご相談いただけます。",
    nextTitle: "ご相談後の流れ",
    nextBody:
      "内容を確認のうえ、対象範囲、関連データ、運用要件、進め方についてご連絡します。",
    privacy:
      "お送りいただいた情報は、お問い合わせへの対応に使用します。認証情報、個人データ、機密文書は記載しないでください。",
    servicesTitle: "事業の要件に合わせたAIエンジニアリング。",
    servicesIntro:
      "課題に合う出発点を選び、対象範囲と評価方法を一緒に定めます。必要なモデル、アプリケーション、基盤の開発をつなぎます。",
    services: [
      {
        id: "ai-agents",
        title: "AIエージェントソリューション",
        body: "文書や業務システムをまたぐ複数の処理を、明確な権限の範囲で自動化したい場合。",
        deliver:
          "業務設計、検索、ツール連携、コンテキストとハーネスの設計、承認手順、処理ログ。要件に応じてOpenClawのカスタマイズにも対応します。",
        evaluate:
          "タスクの達成とエスカレーション、情報の根拠、ツールの認可、処理失敗からの復旧。",
      },
      {
        id: "enterprise-ai",
        title: "エンタープライズAIソリューション",
        body: "既存の構成、ガバナンス、業務プロセスにAIを組み込みたい場合。",
        deliver:
          "アーキテクチャの評価、連携設計、概念実証、評価計画、実装ロードマップ。",
        evaluate:
          "業務との適合性、データ境界、関係者の受け入れ条件、連携と運用の制約。",
      },
      {
        id: "model-training",
        title: "LLM・SLMの事前学習と微調整",
        body: "専門領域の品質、モデルサイズ、運用コストなど、汎用モデルで満たしにくい要件がある場合。",
        deliver:
          "データ整備、事前学習・追加学習のパイプライン、モデル比較、推論最適化。事前学習には適切なデータと計算資源が必要です。重みの調整はアクセス権とライセンスに依存し、非公開モデルでは提供元が対応する方法に限られます。",
        evaluate:
          "未学習のタスクでの品質、基準手法との比較、品質低下、遅延、メモリ、学習と推論のコスト。",
      },
      {
        id: "ai-applications",
        title: "カスタムAIアプリケーション",
        body: "日々の業務でAIを使うための、実用的なインターフェースが必要な場合。",
        deliver:
          "Reactアプリケーション、安全なバックエンド連携、検索画面、フィードバック収集、人による確認フロー。",
        evaluate:
          "業務上の使いやすさ、アクセシビリティ、回答の根拠、遅延、不確かな出力や失敗への対応。",
      },
      {
        id: "cloud-deployment",
        title: "安全なクラウド導入",
        body: "試作品を、管理と保守ができる本番環境へ移行したい場合。",
        deliver:
          "クラウド・プライベート環境の設計、最小権限、シークレット管理、リリース基盤、監視、復旧計画、運用文書。",
        evaluate:
          "アクセス境界、負荷への対応、ロールバックと復旧、監視範囲、運用コスト。",
      },
    ],
    problemLabel: "対象となる課題",
    deliverLabel: "提供するもの",
    evaluateLabel: "評価の観点",
    closingTitle: "課題から、可能性を一緒に考えましょう。",
    closingBody:
      "改善したい業務、調整したいモデル、次の段階へ進めたい試作品についてご相談ください。",
    footer: "実用化につながるAI研究開発とエンジニアリング。東京、日本。",
    diagram: {
      title: "依頼から、確認を経た実行へ",
      input: "業務の依頼",
      context: "関連情報",
      model: "モデルとハーネス",
      tools: "許可されたツール",
      review: "人による承認",
      output: "業務での実行",
      rail: "評価 · 監視 · 改善",
      caption:
        "説明用の構成図。関連情報をモデルに渡し、権限と人の確認で実行範囲を制御します。",
    },
  },
};
