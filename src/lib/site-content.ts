export type Language = "en" | "ja";

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

export const aboutContent: Record<Language, AboutContent> = {
  en: {
    metadataTitle: "About",
    metadataDescription:
      "Company profile for BitLabs, a Tokyo-based AI research and engineering lab.",
    eyebrow: "About",
    title: "A Tokyo AI research and engineering lab",
    body: "We are a small team with deep model and infrastructure expertise. We help companies that need real AI built and shipped, not just advised.",
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
    banks: [
      "Sumitomo Mitsui Banking Corporation (SMBC)",
      "GMO Aozora Net Bank",
    ],
  },
  ja: {
    metadataTitle: "会社情報",
    metadataDescription:
      "東京拠点のAI研究開発・エンジニアリングラボ、BitLabsの会社概要です。",
    eyebrow: "会社情報",
    title: "東京のAI研究開発・エンジニアリングラボです",
    body: "モデルと基盤に深い専門性を持つ少数精鋭のチームです。助言だけでなく、実際のAIを構築し本番まで届けます。",
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
    body: "BitLabs is growing, and we're looking for people who are genuinely passionate and enthusiastic about AI, not just interested in the label. If you want to train models, build agents, and ship real production systems, we want to hear from you.",
    whyLabel: "Why BitLabs",
    whyTitle: "Connect model research with application engineering",
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
          "Pre-train and adapt LLMs and SLMs where model access, licensing, data, and compute permit",
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
    body: "BitLabsは成長中です。肩書きとしてのAIに興味があるだけでなく、AIそのものに情熱と熱意を持つ方を探しています。モデルを学習し、エージェントを構築し、実際に本番で動くシステムを届けたい方からのご連絡をお待ちしています。",
    whyLabel: "BitLabsで働く理由",
    whyTitle: "モデル研究とアプリケーション開発をつなぐ",
    whyPoints: [
      "モデルの重みから本番導入まで、実際の課題を一貫して担当できる",
      "モデルと基盤に深い専門性を持つ少数精鋭のチームと働ける",
      "デモで終わらせず、本番で動くシステムを届けられる",
      "研究とエンジニアリングを一つのチームで、東京の中心で行える",
    ],
    rolesLabel: "募集職種",
    rolesTitle: "AIエンジニア・AIリサーチャー",
    rolesBody:
      "エンジニアリングと研究の両面で採用しています。両職種は密接に連携するため、境界はあえて明確にしていません。",
    focusLabel: "主な業務内容",
    roles: [
      {
        title: "AIエンジニア",
        type: "正社員・業務委託",
        location: "東京都",
        summary:
          "クライアントが本番で運用するエージェントシステム、RAGパイプライン、推論基盤を構築・出荷します。",
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
        summary:
          "モデルの学習・微調整に関する研究を前進させ、有望なアイデアを出荷できるシステムへ変える。",
        focus: [
          "アクセス権、ライセンス、データ、計算資源に応じたLLM・SLMの事前学習と微調整",
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
    success:
      "Your inquiry has been received. Thank you for sharing your project.",
    error:
      "Something went wrong sending your inquiry. Please try again or email us directly.",
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
    success:
      "お問い合わせを受け付けました。ご相談いただきありがとうございます。",
    error:
      "送信中にエラーが発生しました。もう一度お試しいただくか、直接メールでご連絡ください。",
    helper:
      "勤務先メールアドレスをご利用ください。簡易的なスパム対策を入れています。",
  },
};

export const applicationFormContent: Record<Language, ApplicationFormContent> =
  {
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
      success:
        "Your application has been received. Thank you for your interest in BitLabs.",
      error:
        "Something went wrong sending your application. Please try again or email us directly.",
      helper:
        "Include your background, what you've built, and why AI is what you want to work on.",
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
      resumeError:
        "PDF、DOC、DOCX形式で5MB以下のファイルをアップロードしてください。",
      honeypotError: "無効な送信です。",
      submitIdle: "応募する",
      submitBusy: "送信中...",
      success:
        "ご応募を受け付けました。BitLabsにご関心をお寄せいただきありがとうございます。",
      error:
        "送信中にエラーが発生しました。もう一度お試しいただくか、直接メールでご連絡ください。",
      helper:
        "経歴、これまでに作られたもの、AIに取り組みたい理由をお聞かせください。",
    },
  };

export const chatContent: Record<Language, ChatContent> = {
  en: {
    openLabel: "Adam Consultant",
    dialogLabel: "Adam chat",
    title: "Adam Consultant",
    subtitle: "",
    closeLabel: "Close chat",
    intro:
      "Hi, I'm Adam. Ask about BitLabs: model training, inference, AI agents, or your production AI plans.",
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
    intro:
      "こんにちは、Adamです。モデル学習、推論、AIエージェント、本番導入など、BitLabsについてご相談ください。",
    quickReplies: [
      "BitLabsは何を作れますか？",
      "モデルの学習や微調整は可能ですか？",
      "業務向けのAIエージェントを検討しています",
    ],
    inputPlaceholder: "質問を入力してください...",
    sendLabel: "送信",
  },
};
