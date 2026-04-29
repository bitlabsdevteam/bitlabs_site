"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import type { Language } from "@/lib/site-content";

const gpus = ["GPU 0", "GPU 1", "GPU 2", "GPU 3"];
const expertY = [10, 28, 46, 64];
type ParallelMode = "training" | "inference";

const labels: Record<Language, {
  data: string;
  tensor: string;
  pipeline: string;
  sequence: string;
  expert: string;
  stage: string;
  shard: string;
  router: string;
  training: string;
  inference: string;
  chip: string;
  aria: string;
  axis: string[];
}> = {
  en: {
    data: "Data",
    tensor: "Tensor",
    pipeline: "Pipeline",
    sequence: "Sequence",
    expert: "Expert",
    stage: "Stage",
    shard: "Shard",
    router: "Router",
    training: "Training",
    inference: "Inference",
    chip: "5D x 4 GPUs",
    aria:
      "Animated 5D parallelism diagram showing data, tensor, pipeline, sequence, and expert communication patterns across four GPUs.",
    axis: [
      "Data: replica + all-reduce",
      "Tensor: shard + gather/scatter",
      "Pipeline: microbatch stages",
      "Sequence: token partition",
      "Expert: routed MoE tokens",
    ],
  },
  ja: {
    data: "データ",
    tensor: "テンソル",
    pipeline: "パイプライン",
    sequence: "シーケンス",
    expert: "エキスパート",
    stage: "ステージ",
    shard: "シャード",
    router: "ルーター",
    training: "事前学習",
    inference: "推論",
    chip: "5D x GPU 4基",
    aria:
      "4基のGPU上で、データ、テンソル、パイプライン、シーケンス、エキスパートの通信パターンを示す5D並列化アニメーション図。",
    axis: [
      "データ: 複製 + all-reduce",
      "テンソル: シャード + gather/scatter",
      "パイプライン: マイクロバッチ段階",
      "シーケンス: トークン分割",
      "エキスパート: ルーティングされたMoEトークン",
    ],
  },
};

function DataParallelRow({ copy }: { copy: typeof labels.en }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="parallel-row">
      <div className="parallel-row-label">{copy.data}</div>
      <div className="parallel-row-canvas">
        <div className="parallel-lanes">
          {gpus.map((gpu, lane) => (
            <div key={gpu} className="parallel-lane-line">
              <span className="parallel-mini-tag">{gpu}</span>
              <motion.span
                className="parallel-packet parallel-packet-data"
                animate={
                  reduceMotion
                    ? undefined
                    : { x: [0, 176], opacity: [0.2, 1, 0.2] }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        duration: 2.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                        delay: lane * 0.18,
                      }
                }
                aria-hidden
              />
            </div>
          ))}
        </div>
        <motion.div
          className="parallel-allreduce-pulse"
          animate={reduceMotion ? undefined : { opacity: [0.15, 0.8, 0.15], scale: [0.92, 1, 0.92] }}
          transition={reduceMotion ? undefined : { duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          aria-hidden
        >
          AR
        </motion.div>
      </div>
    </div>
  );
}

function TensorParallelRow({ copy }: { copy: typeof labels.en }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="parallel-row">
      <div className="parallel-row-label">{copy.tensor}</div>
      <div className="parallel-row-canvas parallel-row-canvas-tensor">
        <div className="parallel-tensor-grid">
          {gpus.map((gpu, index) => (
            <div key={gpu} className="parallel-shard-col">
              <span className="parallel-mini-tag">{gpu}</span>
              <div className="parallel-shards">
                <span className="parallel-shard" />
                <span className="parallel-shard" />
                <span className="parallel-shard" />
              </div>
              <span className="parallel-shard-tag">{copy.shard} {index}</span>
            </div>
          ))}
        </div>
        <motion.div
          className="parallel-gather-beam"
          animate={reduceMotion ? undefined : { x: [0, 58, 116, 174], opacity: [0.2, 0.95, 0.95, 0.2] }}
          transition={reduceMotion ? undefined : { duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          aria-hidden
        />
        <motion.div
          className="parallel-scatter-beam"
          animate={reduceMotion ? undefined : { x: [174, 116, 58, 0], opacity: [0.2, 0.95, 0.95, 0.2] }}
          transition={reduceMotion ? undefined : { duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.6 }}
          aria-hidden
        />
      </div>
    </div>
  );
}

function PipelineParallelRow({ mode, copy }: { mode: ParallelMode; copy: typeof labels.en }) {
  const reduceMotion = useReducedMotion();
  const forwardDelay = mode === "training" ? 0 : 0.2;

  return (
    <div className="parallel-row">
      <div className="parallel-row-label">{copy.pipeline}</div>
      <div className="parallel-row-canvas parallel-row-canvas-pipeline">
        <div className="parallel-stages">
          {gpus.map((gpu, i) => (
            <div key={gpu} className="parallel-stage">
              <span>{copy.stage} {i}</span>
            </div>
          ))}
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.span
            key={`f-${i}`}
            className="parallel-packet parallel-packet-pipe-f"
            style={{ top: "34%" }}
            animate={reduceMotion ? undefined : { x: [0, 56, 112, 168] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 3.6, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: forwardDelay + i * 0.35 }
            }
            aria-hidden
          />
        ))}
        {mode === "training" &&
          Array.from({ length: 4 }).map((_, i) => (
            <motion.span
              key={`b-${i}`}
              className="parallel-packet parallel-packet-pipe-b"
              style={{ top: "64%" }}
              animate={reduceMotion ? undefined : { x: [168, 112, 56, 0] }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 3.8, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 1 + i * 0.42 }
              }
              aria-hidden
            />
          ))}
      </div>
    </div>
  );
}

function SequenceParallelRow({ copy }: { copy: typeof labels.en }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="parallel-row">
      <div className="parallel-row-label">{copy.sequence}</div>
      <div className="parallel-row-canvas parallel-row-canvas-sequence">
        <div className="parallel-seq-chunks">
          {gpus.map((gpu) => (
            <div key={gpu} className="parallel-seq-chunk">
              <span className="parallel-mini-tag">{gpu}</span>
              <div className="parallel-seq-bars">
                <span />
                <span />
                <span />
              </div>
            </div>
          ))}
        </div>
        {[1, 2, 3].map((boundary) => (
          <motion.span
            key={`xfer-${boundary}`}
            className="parallel-seq-xfer"
            style={{ left: `${boundary * 25}%` }}
            animate={reduceMotion ? undefined : { opacity: [0.2, 0.9, 0.2], y: [0, -2, 0] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: boundary * 0.25 }
            }
          />
        ))}
      </div>
    </div>
  );
}

function ExpertParallelRow({ copy }: { copy: typeof labels.en }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="parallel-row">
      <div className="parallel-row-label">{copy.expert}</div>
      <div className="parallel-row-canvas parallel-row-canvas-expert">
        <span className="parallel-router">{copy.router}</span>
        <div className="parallel-experts">
          {gpus.map((gpu, i) => (
            <span key={gpu} className="parallel-expert-node" style={{ top: `${expertY[i]}%` }}>
              E{i}
            </span>
          ))}
        </div>
        {Array.from({ length: 8 }).map((_, i) => {
          const target = expertY[i % 4] - 2;
          return (
            <motion.span
              key={`dispatch-${i}`}
              className="parallel-packet parallel-packet-expert"
              style={{ left: "20%", top: "48%" }}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      x: [0, 52, 116],
                      y: [0, target - 48, target - 48],
                      opacity: [0, 0.95, 0.95, 0],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 2.8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: i * 0.22,
                    }
              }
              aria-hidden
            />
          );
        })}
        {Array.from({ length: 6 }).map((_, i) => {
          const source = expertY[(i + 1) % 4] - 2;
          return (
            <motion.span
              key={`combine-${i}`}
              className="parallel-packet parallel-packet-expert-return"
              style={{ left: "76%", top: `${source}%` }}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      x: [0, -52, -110],
                      y: [0, 48 - source, 48 - source],
                      opacity: [0, 0.95, 0.95, 0],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 2.6,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 0.5 + i * 0.27,
                    }
              }
              aria-hidden
            />
          );
        })}
      </div>
    </div>
  );
}

function Panel({ mode, copy }: { mode: ParallelMode; copy: typeof labels.en }) {
  return (
    <section className="parallel-panel">
      <header className="parallel-panel-header">
        <span>{mode === "training" ? copy.training : copy.inference}</span>
        <span className="parallel-chip">{copy.chip}</span>
      </header>
      <div className="parallel-row-stack">
        <DataParallelRow copy={copy} />
        <TensorParallelRow copy={copy} />
        <PipelineParallelRow mode={mode} copy={copy} />
        <SequenceParallelRow copy={copy} />
        <ExpertParallelRow copy={copy} />
      </div>
    </section>
  );
}

export function ParallelismHeroVisual() {
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useState<ParallelMode>("training");
  const copy = labels[language];

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setMode((current) => (current === "training" ? "inference" : "training"));
    }, 4200);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <div className="parallel-hero" aria-label={copy.aria}>
      <div className="parallel-background" aria-hidden />
      <div className="parallel-axis-row" aria-hidden>
        {copy.axis.map((item) => (
          <span key={item} className="parallel-axis-pill">{item}</span>
        ))}
      </div>

      <div className="parallel-panels">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={mode}
            initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={reduceMotion ? undefined : { duration: 0.42, ease: "easeOut" }}
          >
            <Panel mode={mode} copy={copy} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
