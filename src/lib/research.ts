import type { Locale } from "./editorial-content";
export type ResearchEntry = {
  slug: string;
  status: "published" | "draft";
  kind: "illustration" | "finding";
  date: string;
  author: string;
  content: Record<
    Locale,
    {
      title: string;
      summary: string;
      question: string;
      method: string;
      findings: string[];
      limitations: string;
      relevance: string;
      artifacts: { label: string; href: string }[];
    }
  >;
};
export const researchEntries: ResearchEntry[] = [
  {
    slug: "bounded-agent-workflow",
    status: "published",
    kind: "illustration",
    date: "2026-10-04",
    author: "BitLabs",
    content: {
      en: {
        title: "An agent workflow with a human decision point",
        summary:
          "A synthetic purchase request illustrates retrieval, limited tool access, approval, and evaluation.",
        question:
          "How can an assistant prepare a purchase request without gaining the authority to place an order?",
        method:
          "We built a deterministic browser demonstration around one fictional request: four monitors at ¥30,000 each. A synthetic policy document allows requests up to ¥150,000 but requires human approval before any order. The interface walks through retrieval and a draft tool call. It makes no model calls and connects to no business systems.",
        findings: [
          "The synthetic request totals ¥120,000, within the example policy threshold. This is arithmetic in the demonstration, not a model benchmark.",
          "The draft can cite the supplied policy, but being within budget does not grant permission to place an order.",
          "Rejecting the request stops the illustration. Approving it displays a simulated handoff; it never creates an order.",
        ],
        limitations:
          "This is an explanatory artifact, not a tested autonomous agent or a client engagement. It does not measure retrieval accuracy, model quality, latency, security effectiveness, or business outcomes. Production systems need server-enforced authorization, real identity checks, idempotency, audit retention, and adversarial testing.",
        relevance:
          "Separating recommendation from execution makes responsibility visible. Before deployment, evaluation should test missing evidence, out-of-policy requests, attempted unauthorized tools, rejection, and duplicate approvals.",
        artifacts: [
          {
            label: "Download the annotated synthetic scenario (JSON)",
            href: "/examples/bounded-agent-workflow.json",
          },
        ],
      },
      ja: {
        title: "人の判断を組み込んだエージェントワークフロー",
        summary:
          "架空の購入依頼を通じて、検索、限定的なツール権限、承認、評価の考え方を示します。",
        question:
          "発注権限を与えずに、アシスタントが購入依頼の準備を支援するにはどうすればよいでしょうか。",
        method:
          "架空の依頼「1台30,000円のモニターを4台購入」を使った、決められた手順で動くブラウザデモを作成しました。合成の規程では150,000円以下の申請を認めていますが、発注前には人の承認を必要とします。画面で検索結果と下書き用ツール呼び出しを説明します。モデルの呼び出しや業務システムへの接続は行いません。",
        findings: [
          "架空の依頼の合計は120,000円で、例示した規程の上限内です。デモ内の計算であり、モデルの性能評価ではありません。",
          "下書きは与えられた規程を根拠にできますが、予算内であっても発注権限は付与されません。",
          "却下するとデモは停止します。承認すると引き継ぎの例を表示しますが、実際の発注は行いません。",
        ],
        limitations:
          "設計を説明するための資料であり、検証済みの自律エージェントや顧客案件ではありません。検索精度、モデル品質、遅延、セキュリティ対策の有効性、事業成果は測定していません。本番環境ではサーバー側の認可、本人確認、冪等性、監査ログの保持、攻撃を想定したテストが必要です。",
        relevance:
          "提案と実行を分けることで責任の所在が明確になります。導入前には、根拠の欠落、規程外の依頼、未許可ツールの利用、却下、重複承認を検証する必要があります。",
        artifacts: [
          {
            label: "注釈付き合成シナリオをダウンロード（JSON・英語）",
            href: "/examples/bounded-agent-workflow.json",
          },
        ],
      },
    },
  },
];
export const publishedResearch = researchEntries.filter(
  (entry) => entry.status === "published",
);
