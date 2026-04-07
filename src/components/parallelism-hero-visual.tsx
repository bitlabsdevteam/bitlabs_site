"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const gpus = ["GPU 0", "GPU 1", "GPU 2", "GPU 3"];
const expertY = [10, 28, 46, 64];

function DataParallelRow() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="parallel-row">
      <div className="parallel-row-label">Data</div>
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

function TensorParallelRow() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="parallel-row">
      <div className="parallel-row-label">Tensor</div>
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
              <span className="parallel-shard-tag">shard {index}</span>
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

function PipelineParallelRow({ mode }: { mode: "Pre-training" | "Inference" }) {
  const reduceMotion = useReducedMotion();
  const forwardDelay = mode === "Pre-training" ? 0 : 0.2;

  return (
    <div className="parallel-row">
      <div className="parallel-row-label">Pipeline</div>
      <div className="parallel-row-canvas parallel-row-canvas-pipeline">
        <div className="parallel-stages">
          {gpus.map((gpu, i) => (
            <div key={gpu} className="parallel-stage">
              <span>Stage {i}</span>
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
        {mode === "Pre-training" &&
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

function SequenceParallelRow() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="parallel-row">
      <div className="parallel-row-label">Sequence</div>
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

function ExpertParallelRow() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="parallel-row">
      <div className="parallel-row-label">Expert</div>
      <div className="parallel-row-canvas parallel-row-canvas-expert">
        <span className="parallel-router">router</span>
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

function Panel({ mode }: { mode: "Pre-training" | "Inference" }) {
  return (
    <section className="parallel-panel">
      <header className="parallel-panel-header">
        <span>{mode}</span>
        <span className="parallel-chip">5D x 4 GPUs</span>
      </header>
      <div className="parallel-row-stack">
        <DataParallelRow />
        <TensorParallelRow />
        <PipelineParallelRow mode={mode} />
        <SequenceParallelRow />
        <ExpertParallelRow />
      </div>
    </section>
  );
}

export function ParallelismHeroVisual() {
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useState<"Pre-training" | "Inference">("Pre-training");

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setMode((current) => (current === "Pre-training" ? "Inference" : "Pre-training"));
    }, 4200);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <div className="parallel-hero" aria-label="Animated 5D parallelism diagram with distinct data, tensor, pipeline, sequence, and expert communication patterns over 4 GPUs.">
      <div className="parallel-background" aria-hidden />
      <div className="parallel-axis-row" aria-hidden>
        <span className="parallel-axis-pill">Data: replica + all-reduce</span>
        <span className="parallel-axis-pill">Tensor: shard + gather/scatter</span>
        <span className="parallel-axis-pill">Pipeline: micro-batch stages</span>
        <span className="parallel-axis-pill">Sequence: token partitions</span>
        <span className="parallel-axis-pill">Expert: routed MoE tokens</span>
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
            <Panel mode={mode} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
