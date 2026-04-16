"use client";

import { motion, useReducedMotion } from "framer-motion";

type ApproachFlowStep = {
  phase: string;
  title: string;
  marker: string;
};

type ApproachFlowVisualProps = {
  steps: ApproachFlowStep[];
  visualLabel: string;
  visualValue: string;
  outcomeLabel: string;
  outcomeTitle: string;
  outcomeBody: string;
};

export function ApproachFlowVisual({
  steps,
  visualLabel,
  visualValue,
  outcomeLabel,
  outcomeTitle,
  outcomeBody,
}: ApproachFlowVisualProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="approach-visual" aria-hidden>
      <div className="approach-visual-glow" />
      <div className="approach-visual-header">
        <span className="approach-visual-chip">{visualLabel}</span>
        <span className="approach-visual-chip">{visualValue}</span>
      </div>

      <div className="approach-rail">
        <motion.div
          className="approach-rail-pulse"
          animate={prefersReducedMotion ? undefined : { y: [0, 220, 0], opacity: [0, 1, 1, 0] }}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 5.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
          }
        />

        <div className="approach-step-stack">
          {steps.map((step, index) => (
            <motion.article
              key={step.phase}
              className="approach-step-card"
              initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }
              }
            >
              <span className="approach-step-node" />
              <div className="approach-step-inner">
                <div className="approach-step-topline">
                  <p>{step.phase}</p>
                  <span>{step.marker}</span>
                </div>
                <h3>{step.title}</h3>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.article
          className="approach-outcome-card"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={prefersReducedMotion ? undefined : { duration: 0.65, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="approach-outcome-label">{outcomeLabel}</p>
          <h3>{outcomeTitle}</h3>
          <p>{outcomeBody}</p>
        </motion.article>
      </div>
    </div>
  );
}
