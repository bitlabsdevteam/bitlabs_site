import { editorial, type Locale } from "@/lib/editorial-content";
export function SystemDiagram({ locale }: { locale: Locale }) {
  const d = editorial[locale].diagram;
  return (
    <figure className="system-diagram" aria-label={d.title}>
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
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <path d="M32 3 58 18v28L32 61 6 46V18Z M6 18l26 15 26-15 M32 33v28 M6 46 32 31l26 15 M32 3v28" />
            </svg>
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
    </figure>
  );
}
