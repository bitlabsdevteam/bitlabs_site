"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { type CSSProperties, useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";

type PhaseId = "partition" | "synchronize" | "converge";

const gpuColumns = ["GPU 0", "GPU 1", "GPU 2", "GPU 3"];
const ingressRows = [17, 34, 51, 68];
const syncRows = [23, 50, 77];
const convergeRows = [31, 50, 69];

const heroVisualCopy = {
  en: {
    ariaLabel:
      "Animated distributed AI systems diagram showing workloads partitioning across a GPU fabric, synchronizing across model-parallel lanes, and converging into a stable production path.",
    systemLabel: "Parallel Intelligence Fabric",
    systemValue: "5D model systems",
    clusterLabel: "GPU Fabric",
    outcomeLabel: "Production Path",
    outcomeTitle: "Research depth, organized for delivery.",
    outcomeBody: "Distributed model engineering connected to evaluation, governance, and deployment.",
    tags: ["Eval", "Control", "Serve"],
    capabilities: ["Data", "Tensor", "Pipeline", "Sequence", "Experts"],
    phases: [
      {
        id: "partition" as const,
        title: "Partition",
        description: "Split the workload across distributed compute planes.",
      },
      {
        id: "synchronize" as const,
        title: "Synchronize",
        description: "Coordinate routing and collective communication cleanly.",
      },
      {
        id: "converge" as const,
        title: "Converge",
        description: "Resolve the system into a controlled serving path.",
      },
    ],
  },
  ja: {
    ariaLabel:
      "ワークロードがGPUファブリックに分割され、モデル並列レーンで同期され、安定した本番経路へ収束する分散AIシステムのアニメーション図。",
    systemLabel: "並列インテリジェンス・ファブリック",
    systemValue: "5Dモデルシステム",
    clusterLabel: "GPU Fabric",
    outcomeLabel: "本番経路",
    outcomeTitle: "研究の深さを、運用できる形に整える。",
    outcomeBody: "分散モデル基盤を、評価設計、統制、デプロイまで一つの流れとして設計します。",
    tags: ["評価", "統制", "運用"],
    capabilities: ["データ", "テンソル", "パイプライン", "シーケンス", "エキスパート"],
    phases: [
      {
        id: "partition" as const,
        title: "分割",
        description: "ワークロードを分散計算レイヤーへ配分します。",
      },
      {
        id: "synchronize" as const,
        title: "同期",
        description: "ルーティングと集団通信を整然と制御します。",
      },
      {
        id: "converge" as const,
        title: "収束",
        description: "制御された本番向け経路へまとめ上げます。",
      },
    ],
  },
};

const phaseColors: Record<PhaseId, string> = {
  partition: "var(--fabric-mint)",
  synchronize: "var(--fabric-ice)",
  converge: "var(--fabric-amber)",
};

export function TransformerModelHeroVisual() {
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const copy = heroVisualCopy[language];
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setPhaseIndex((current) => (current + 1) % copy.phases.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [copy.phases.length, reduceMotion]);

  const activePhase = copy.phases[phaseIndex];

  return (
    <>
      <div className="transformer-model-hero" aria-label={copy.ariaLabel}>
        <div className="transformer-model-vignette" aria-hidden />
        <div className="fabric-drift fabric-drift-left" aria-hidden />
        <div className="fabric-drift fabric-drift-right" aria-hidden />

        <div className="fabric-header">
          <div className="fabric-system-chip">
            <span>{copy.systemLabel}</span>
            <strong>{copy.systemValue}</strong>
          </div>

          <div className="fabric-phase-rail" aria-hidden>
            {copy.phases.map((phase, index) => (
              <span
                key={phase.id}
                className={`fabric-phase-pill${index === phaseIndex ? " is-active" : ""}`}
                style={{ "--fabric-phase-color": phaseColors[phase.id] } as CSSProperties}
              >
                {phase.title}
              </span>
            ))}
          </div>
        </div>

        <div className="fabric-stage">
          <div className="fabric-ingress" aria-hidden>
            <span className="fabric-rail-label">{activePhase.title}</span>
            {ingressRows.map((top) => (
              <span key={top} className="fabric-ingress-line" style={{ top: `${top}%` }} />
            ))}
          </div>

          <div className="fabric-cluster" aria-hidden>
            <div className="fabric-cluster-grid" />
            <div className="fabric-cluster-header">
              <span>{copy.clusterLabel}</span>
              <span>4 x GPU</span>
            </div>

            <div className="fabric-columns">
              {gpuColumns.map((gpu, index) => (
                <motion.article
                  key={gpu}
                  className={`fabric-column${index === phaseIndex ? " is-emphasized" : ""}`}
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          y: activePhase.id === "partition" ? [0, -6, 0] : activePhase.id === "synchronize" ? [0, -3, 0] : 0,
                          borderColor:
                            activePhase.id === "partition"
                              ? "rgba(178, 248, 226, 0.3)"
                              : activePhase.id === "synchronize"
                                ? "rgba(143, 201, 255, 0.3)"
                                : "rgba(255, 215, 141, 0.3)",
                        }
                  }
                  transition={
                    reduceMotion
                      ? undefined
                      : {
                          duration: 2.8,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: index * 0.12,
                        }
                  }
                >
                  <span className="fabric-column-label">{gpu}</span>
                  <div className="fabric-pane-stack">
                    {Array.from({ length: 4 }).map((_, paneIndex) => (
                      <span
                        key={`${gpu}-pane-${paneIndex}`}
                        className="fabric-pane"
                        style={
                          {
                            "--fabric-pane-delay": `${paneIndex * 0.15 + index * 0.08}s`,
                          } as CSSProperties
                        }
                      />
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>

            {ingressRows.map((top, index) => (
              <motion.span
                key={`partition-${top}`}
                className="fabric-signal fabric-signal-partition"
                style={{ top: `${top}%` }}
                animate={
                  reduceMotion
                    ? { left: `${28 + index * 13}%`, opacity: 0.58 }
                    : activePhase.id === "partition"
                      ? {
                          left: ["4%", `${20 + index * 10}%`, `${32 + index * 12}%`],
                          opacity: [0, 1, 0.38],
                          scale: [0.88, 1.04, 0.94],
                        }
                      : { left: `${32 + index * 12}%`, opacity: 0.12, scale: 0.86 }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        duration: 2.4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: index * 0.2,
                      }
                }
              />
            ))}

            {syncRows.map((top, index) => (
              <motion.span
                key={`sync-${top}`}
                className="fabric-signal fabric-signal-sync"
                style={{ top: `${top}%` }}
                animate={
                  reduceMotion
                    ? { left: "18%", opacity: 0.18, scaleX: 0.92 }
                    : activePhase.id === "synchronize"
                      ? {
                          left: ["18%", "34%", "54%"],
                          opacity: [0, 0.9, 0],
                          scaleX: [0.3, 1, 1.08],
                        }
                      : { left: "34%", opacity: 0.08, scaleX: 0.28 }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        duration: 2.2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: index * 0.28,
                      }
                }
              />
            ))}

            {convergeRows.map((top, index) => (
              <motion.span
                key={`converge-${top}`}
                className="fabric-signal fabric-signal-converge"
                style={{ top: `${top}%` }}
                animate={
                  reduceMotion
                    ? { left: `${68 + index * 4}%`, opacity: 0.48 }
                    : activePhase.id === "converge"
                      ? {
                          left: ["66%", "78%", "92%"],
                          opacity: [0, 0.95, 0],
                          scale: [0.9, 1, 0.8],
                        }
                      : { left: "74%", opacity: 0.1, scale: 0.82 }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        duration: 1.9,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeOut",
                        delay: index * 0.22,
                      }
                }
              />
            ))}

            <motion.span
              className="fabric-core-node"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: activePhase.id === "synchronize" ? [0.36, 0.9, 0.36] : [0.2, 0.5, 0.2],
                      scale: activePhase.id === "synchronize" ? [0.96, 1.04, 0.96] : [1, 1.02, 1],
                    }
              }
              transition={reduceMotion ? undefined : { duration: 2.3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              aria-hidden
            />
          </div>

          <div className="fabric-outcome">
            <span className="fabric-outcome-label">{copy.outcomeLabel}</span>
            <strong>{copy.outcomeTitle}</strong>
            <p>{copy.outcomeBody}</p>
            <div className="fabric-tag-row" aria-hidden>
              {copy.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="fabric-footer">
          <div className="fabric-capability-row" aria-hidden>
            {copy.capabilities.map((label, index) => (
              <span key={label} className={`fabric-capability-pill${index === phaseIndex ? " is-active" : ""}`}>
                {label}
              </span>
            ))}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={activePhase.id}
              className="fabric-phase-description"
              initial={reduceMotion ? undefined : { opacity: 0, y: 6 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={reduceMotion ? undefined : { duration: 0.35, ease: "easeOut" }}
            >
              {activePhase.description}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        .transformer-model-hero {
          position: relative;
          min-height: 31rem;
          display: grid;
          gap: 1rem;
          padding: 1rem;
          overflow: hidden;
          isolation: isolate;
          --fabric-mint: #b2f8e2;
          --fabric-ice: #8fc9ff;
          --fabric-amber: #ffd78d;
          background:
            radial-gradient(circle at 8% 18%, rgba(178, 248, 226, 0.18), transparent 28%),
            radial-gradient(circle at 74% 24%, rgba(143, 201, 255, 0.18), transparent 26%),
            radial-gradient(circle at 92% 78%, rgba(255, 215, 141, 0.14), transparent 22%),
            linear-gradient(150deg, rgba(6, 10, 12, 0.98), rgba(10, 14, 18, 0.98));
        }

        .transformer-model-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background:
            linear-gradient(90deg, rgba(244, 238, 228, 0.055) 1px, transparent 1px),
            linear-gradient(rgba(244, 238, 228, 0.04) 1px, transparent 1px);
          background-size: 4.8rem 4.8rem;
          opacity: 0.34;
        }

        .transformer-model-vignette {
          pointer-events: none;
          position: absolute;
          inset: 0;
          z-index: 2;
          background:
            linear-gradient(180deg, rgba(6, 10, 12, 0.08), transparent 28%, rgba(6, 10, 12, 0.44)),
            radial-gradient(circle at center, transparent 42%, rgba(4, 6, 9, 0.4));
        }

        .fabric-drift {
          position: absolute;
          inset-block: 12% auto;
          z-index: 0;
          width: 14rem;
          height: 14rem;
          border-radius: 999px;
          filter: blur(24px);
          opacity: 0.55;
        }

        .fabric-drift-left {
          left: -4rem;
          background: radial-gradient(circle, rgba(178, 248, 226, 0.2), transparent 72%);
        }

        .fabric-drift-right {
          right: -4rem;
          top: auto;
          bottom: -2rem;
          background: radial-gradient(circle, rgba(143, 201, 255, 0.16), transparent 72%);
        }

        .fabric-header,
        .fabric-stage,
        .fabric-footer {
          position: relative;
          z-index: 1;
        }

        .fabric-header {
          display: flex;
          justify-content: space-between;
          gap: 0.9rem;
          align-items: flex-start;
        }

        .fabric-system-chip {
          display: grid;
          gap: 0.18rem;
          max-width: 15rem;
          border: 1px solid rgba(244, 238, 228, 0.12);
          border-radius: 1rem;
          padding: 0.8rem 0.95rem;
          background: linear-gradient(155deg, rgba(15, 21, 27, 0.88), rgba(10, 13, 17, 0.66));
          backdrop-filter: blur(14px);
        }

        .fabric-system-chip span,
        .fabric-cluster-header,
        .fabric-outcome-label,
        .fabric-rail-label {
          font-size: 0.64rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(222, 235, 230, 0.68);
        }

        .fabric-system-chip strong {
          color: rgba(246, 241, 233, 0.96);
          font-family: Baskerville, "Goudy Old Style", "Palatino Linotype", "Book Antiqua", "Iowan Old Style", serif;
          font-size: 1.08rem;
          font-weight: 500;
          letter-spacing: -0.02em;
        }

        .fabric-phase-rail {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 0.5rem;
        }

        .fabric-phase-pill {
          border: 1px solid rgba(244, 238, 228, 0.1);
          border-radius: 999px;
          padding: 0.45rem 0.78rem;
          font-size: 0.66rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(218, 229, 225, 0.62);
          background: rgba(8, 12, 16, 0.56);
        }

        .fabric-phase-pill.is-active {
          border-color: color-mix(in srgb, var(--fabric-phase-color) 38%, rgba(244, 238, 228, 0.12));
          color: rgba(249, 244, 236, 0.96);
          box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.02),
            0 0 2.2rem color-mix(in srgb, var(--fabric-phase-color) 22%, transparent);
        }

        .fabric-stage {
          display: grid;
          grid-template-columns: 0.16fr minmax(0, 1fr) 0.34fr;
          align-items: stretch;
          gap: 0.9rem;
          min-height: 23rem;
        }

        .fabric-ingress,
        .fabric-cluster,
        .fabric-outcome {
          border: 1px solid rgba(244, 238, 228, 0.1);
          border-radius: 1.25rem;
          background: linear-gradient(160deg, rgba(16, 21, 26, 0.92), rgba(8, 11, 15, 0.84));
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
        }

        .fabric-ingress {
          position: relative;
          overflow: hidden;
        }

        .fabric-rail-label {
          position: absolute;
          left: 0.9rem;
          top: 0.9rem;
        }

        .fabric-ingress-line {
          position: absolute;
          left: 0.9rem;
          right: 1rem;
          height: 1px;
          background: linear-gradient(90deg, rgba(178, 248, 226, 0.12), rgba(178, 248, 226, 0.6), rgba(178, 248, 226, 0.08));
        }

        .fabric-cluster {
          position: relative;
          overflow: hidden;
          padding: 1rem;
        }

        .fabric-cluster-grid {
          position: absolute;
          inset: 0.85rem;
          border-radius: 0.95rem;
          background:
            linear-gradient(90deg, rgba(244, 238, 228, 0.05) 1px, transparent 1px),
            linear-gradient(rgba(244, 238, 228, 0.04) 1px, transparent 1px),
            radial-gradient(circle at center, rgba(143, 201, 255, 0.08), transparent 58%);
          background-size: 3.9rem 3.9rem, 3.9rem 3.9rem, auto;
          opacity: 0.45;
        }

        .fabric-cluster-header {
          position: relative;
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .fabric-columns {
          position: relative;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0.7rem;
          min-height: 100%;
        }

        .fabric-column {
          position: relative;
          display: grid;
          align-content: start;
          gap: 0.6rem;
          min-height: 16.8rem;
          padding: 0.8rem;
          border: 1px solid rgba(244, 238, 228, 0.1);
          border-radius: 1rem;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 34%),
            linear-gradient(160deg, rgba(18, 24, 29, 0.94), rgba(11, 14, 18, 0.82));
          backdrop-filter: blur(10px);
        }

        .fabric-column.is-emphasized {
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 0 2rem rgba(178, 248, 226, 0.08);
        }

        .fabric-column-label {
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(227, 235, 232, 0.72);
        }

        .fabric-pane-stack {
          display: grid;
          gap: 0.55rem;
        }

        .fabric-pane {
          height: 2.55rem;
          border: 1px solid rgba(244, 238, 228, 0.08);
          border-radius: 0.72rem;
          background:
            linear-gradient(90deg, rgba(178, 248, 226, 0.12), transparent 48%, rgba(143, 201, 255, 0.1)),
            linear-gradient(160deg, rgba(18, 23, 27, 0.92), rgba(12, 15, 19, 0.76));
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
          animation: fabricPanePulse 6s ease-in-out infinite;
          animation-delay: var(--fabric-pane-delay);
        }

        .fabric-signal {
          position: absolute;
          border-radius: 999px;
          pointer-events: none;
        }

        .fabric-signal-partition {
          left: 4%;
          width: 0.62rem;
          height: 0.62rem;
          background: var(--fabric-mint);
          box-shadow: 0 0 1rem rgba(178, 248, 226, 0.9);
        }

        .fabric-signal-sync {
          left: 18%;
          width: 28%;
          height: 0.14rem;
          background: linear-gradient(90deg, transparent, var(--fabric-ice), transparent);
          box-shadow: 0 0 1rem rgba(143, 201, 255, 0.72);
          transform-origin: left center;
        }

        .fabric-signal-converge {
          left: 66%;
          width: 0.7rem;
          height: 0.7rem;
          background: var(--fabric-amber);
          box-shadow: 0 0 1.15rem rgba(255, 215, 141, 0.82);
        }

        .fabric-core-node {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 6.75rem;
          height: 6.75rem;
          border-radius: 999px;
          transform: translate(-50%, -50%);
          background:
            radial-gradient(circle, rgba(143, 201, 255, 0.18), rgba(143, 201, 255, 0.04) 52%, transparent 68%),
            radial-gradient(circle at center, rgba(178, 248, 226, 0.12), transparent 72%);
          border: 1px solid rgba(143, 201, 255, 0.12);
          filter: blur(0.2px);
        }

        .fabric-outcome {
          display: grid;
          align-content: center;
          gap: 0.8rem;
          padding: 1.1rem 1rem;
        }

        .fabric-outcome strong {
          font-family: Baskerville, "Goudy Old Style", "Palatino Linotype", "Book Antiqua", "Iowan Old Style", serif;
          font-size: 1.45rem;
          font-weight: 500;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: rgba(247, 242, 235, 0.98);
        }

        .fabric-outcome p {
          margin: 0;
          color: rgba(217, 208, 197, 0.82);
          font-size: 0.92rem;
          line-height: 1.72;
        }

        .fabric-tag-row,
        .fabric-capability-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.48rem;
        }

        .fabric-tag-row span,
        .fabric-capability-pill {
          border: 1px solid rgba(244, 238, 228, 0.08);
          border-radius: 999px;
          padding: 0.38rem 0.68rem;
          background: rgba(10, 13, 17, 0.58);
        }

        .fabric-tag-row span {
          font-size: 0.66rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(222, 235, 230, 0.68);
        }

        .fabric-footer {
          display: grid;
          gap: 0.8rem;
        }

        .fabric-capability-pill {
          color: rgba(223, 216, 204, 0.7);
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .fabric-capability-pill.is-active {
          color: rgba(247, 242, 235, 0.96);
          border-color: rgba(244, 238, 228, 0.18);
          background: linear-gradient(160deg, rgba(21, 28, 33, 0.96), rgba(11, 15, 19, 0.82));
        }

        .fabric-phase-description {
          margin: 0;
          color: rgba(217, 208, 197, 0.78);
          font-size: 0.92rem;
          line-height: 1.6;
        }

        @keyframes fabricPanePulse {
          0%,
          100% {
            opacity: 0.7;
            transform: scaleX(1);
          }

          50% {
            opacity: 1;
            transform: scaleX(1.02);
          }
        }

        @media (max-width: 767px) {
          .transformer-model-hero {
            min-height: 26rem;
            padding: 0.85rem;
          }

          .fabric-header,
          .fabric-phase-rail {
            display: grid;
          }

          .fabric-system-chip {
            max-width: none;
          }

          .fabric-stage {
            grid-template-columns: 1fr;
            min-height: auto;
          }

          .fabric-ingress {
            min-height: 4.4rem;
          }

          .fabric-columns {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .fabric-column {
            min-height: 11.6rem;
          }

          .fabric-outcome strong {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </>
  );
}
