import { editorial, type Locale } from "@/lib/editorial-content";
import { SystemDiagramMotion } from "./system-diagram-motion";
export function SystemDiagram({ locale }: { locale: Locale }) {
  const d = editorial[locale].diagram;
  return (
    <SystemDiagramMotion label={d.title}>
      <div className="diagram-caption">
        <span className="technical">BITLABS / SYSTEM DESIGN</span>
        <span className="diagram-dot" aria-hidden="true" />
      </div>
      <div className="diagram-flow">
        <div className="diagram-input">{d.input}</div>
        <div className="diagram-connector" aria-hidden="true" />
        <div className="diagram-boundary">
          <div className="diagram-context">{d.context}</div>
          <div className="diagram-connector" aria-hidden="true" />
          <div className="diagram-model">
            <span className="diagram-emblem" aria-hidden="true">
              <svg viewBox="0 0 64 64">
                <path d="M32 3 58 18v28L32 61 6 46V18Z M6 18l26 15 26-15 M32 33v28 M6 46 32 31l26 15 M32 3v28" />
              </svg>
              <span className="diagram-cube">
                {Array.from({ length: 6 }, (_, face) => (
                  <i key={face} className="diagram-cube-face" />
                ))}
              </span>
            </span>
            <strong>{d.model}</strong>
          </div>
          <div className="diagram-connector" aria-hidden="true" />
          <div className="diagram-pair">
            <span>{d.tools}</span>
            <span>{d.review}</span>
          </div>
        </div>
        <div className="diagram-connector" aria-hidden="true" />
        <div className="diagram-output">{d.output}</div>
      </div>
      <div className="diagram-rail">{d.rail}</div>
      <figcaption>{d.caption}</figcaption>
    </SystemDiagramMotion>
  );
}
