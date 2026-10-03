"use client";
import { useState } from "react";
import type { Locale } from "@/lib/editorial-content";
export function WorkflowDemo({ locale }: { locale: Locale }) {
  const [decision, setDecision] = useState<"pending" | "approved" | "rejected">(
    "pending",
  );
  const ja = locale === "ja";
  return (
    <div className="workflow-demo">
      <div className="demo-heading">
        <span className="technical">SYNTHETIC / 001</span>
        <span>
          {ja
            ? "説明用デモ · 外部への操作なし"
            : "Illustrative demo · No external actions"}
        </span>
      </div>
      <ol className="demo-steps">
        <li>
          <span className="step-index">1</span>
          <div>
            <h3>{ja ? "依頼を読み取る" : "Read the request"}</h3>
            <p>
              {ja
                ? "モニター4台、1台30,000円。合計120,000円。"
                : "Four monitors, ¥30,000 each. Total: ¥120,000."}
            </p>
          </div>
        </li>
        <li>
          <span className="step-index">2</span>
          <div>
            <h3>{ja ? "規程を参照する" : "Retrieve the policy"}</h3>
            <p>
              {ja
                ? "合成規程：申請上限150,000円。発注前に人の承認が必要。"
                : "Synthetic policy: requests up to ¥150,000. Human approval required before ordering."}
            </p>
            <code>SYNTHETIC-POLICY-01</code>
          </div>
        </li>
        <li>
          <span className="step-index">3</span>
          <div>
            <h3>
              {ja
                ? "許可された操作で下書きする"
                : "Draft within tool permissions"}
            </h3>
            <p>
              {ja
                ? "検索と下書きのみ許可。発注と送金は禁止。"
                : "Search and draft tools allowed. Ordering and payments denied."}
            </p>
            <code>draft_request → pending_human_review</code>
          </div>
        </li>
        <li>
          <span className="step-index">4</span>
          <div>
            <h3>{ja ? "人が判断する" : "A person decides"}</h3>
            <p>
              {ja
                ? "予算内でも自動では実行しません。承認と却下を試せます。"
                : "Being within budget does not authorize execution. Try either decision."}
            </p>
          </div>
        </li>
      </ol>
      <div className="demo-actions">
        <button
          className="button-primary"
          disabled={decision !== "pending"}
          onClick={() => setDecision("approved")}
        >
          {ja ? "承認を試す" : "Simulate approval"}
        </button>
        <button
          className="button-secondary"
          disabled={decision !== "pending"}
          onClick={() => setDecision("rejected")}
        >
          {ja ? "却下を試す" : "Simulate rejection"}
        </button>
        {decision !== "pending" ? (
          <button className="text-link" onClick={() => setDecision("pending")}>
            {ja ? "リセット" : "Reset example"}
          </button>
        ) : null}
      </div>
      <p role="status" className="demo-status">
        {decision === "approved"
          ? ja
            ? "承認の例：権限を持つ担当者への引き継ぎを表示しました。発注は行っていません。"
            : "Approval simulated: handoff to an authorized operator. No order was placed."
          : decision === "rejected"
            ? ja
              ? "却下の例：処理を停止しました。操作は行っていません。"
              : "Rejection simulated: workflow stopped. No action was taken."
            : ja
              ? "人による確認を待っています。"
              : "Waiting for human review."}
      </p>
    </div>
  );
}
