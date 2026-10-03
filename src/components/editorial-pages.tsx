import Link from "next/link";
import { editorial, localizedPath, type Locale } from "@/lib/editorial-content";
import { aboutContent, careerContent } from "@/lib/site-content";
import { publishedResearch, type ResearchEntry } from "@/lib/research";
import { SystemDiagram } from "./system-diagram";
import { WorkflowDemo } from "./workflow-demo";
import { ContactForm } from "./contact-form";
import { ApplicationForm } from "./application-form";
export function Arrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  );
}
function Action({
  locale,
  secondary = false,
}: {
  locale: Locale;
  secondary?: boolean;
}) {
  return (
    <Link
      className={secondary ? "text-link" : "button-primary"}
      href={localizedPath(locale, "/contact")}
    >
      {editorial[locale].cta}
      <Arrow />
    </Link>
  );
}
function Closing({ locale }: { locale: Locale }) {
  const c = editorial[locale];
  return (
    <section className="closing">
      <h2>{c.closingTitle}</h2>
      <div>
        <p>{c.closingBody}</p>
        <Action locale={locale} />
      </div>
    </section>
  );
}
function PageHeading({ title, body }: { title: string; body: string }) {
  return (
    <header className="page-heading">
      <h1>{title}</h1>
      <p className="lead">{body}</p>
    </header>
  );
}
function ResearchLink({ locale }: { locale: Locale }) {
  const c = editorial[locale],
    entry = publishedResearch[0],
    e = entry.content[locale];
  return (
    <article className="research-feature">
      <div className="feature-meta">
        <span className="status-label">
          {locale === "en"
            ? "Illustrative workflow · Synthetic data"
            : "説明用ワークフロー · 合成データ"}
        </span>
        <span>
          {entry.author} · <time dateTime={entry.date}>{entry.date}</time>
        </span>
      </div>
      <h3>
        <Link href={localizedPath(locale, `/research/${entry.slug}`)}>
          {e.title}
          <Arrow />
        </Link>
      </h3>
      <p>{e.summary}</p>
      <Link
        className="text-link"
        href={localizedPath(locale, `/research/${entry.slug}`)}
      >
        {c.readExample}
        <Arrow />
      </Link>
    </article>
  );
}
export function HomePage({ locale }: { locale: Locale }) {
  const c = editorial[locale],
    ja = locale === "ja";
  return (
    <>
      <section id="hero" className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{c.eyebrow}</p>
          <h1>
            <span className="hero-accent">{c.headline[0]}</span>
            <br />
            {c.headline[1]}
          </h1>
          <p className="lead">{c.intro}</p>
          <div className="actions">
            <Action locale={locale} />
            <a href="#demonstrations" className="text-link">
              {c.explore}
              <Arrow />
            </a>
          </div>
        </div>
        <SystemDiagram locale={locale} />
      </section>
      <section className="section needs-section">
        <h2>{c.needsTitle}</h2>
        <div className="needs-list">
          {c.needs.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="demonstrations" className="section work-section">
        <div className="section-intro">
          <h2>{c.workTitle}</h2>
          <p>{c.workIntro}</p>
        </div>
        <ResearchLink locale={locale} />
        <WorkflowDemo locale={locale} />
      </section>
      <section id="capabilities" className="section">
        <div className="section-intro">
          <h2>{c.capabilitiesTitle}</h2>
          <p>
            {ja
              ? "AIネイティブな設計とは、モデルの振る舞い、コンテキスト、評価、ツールの権限、人の監督を業務フローの一部として扱うことです。"
              : "For us, AI-native design means building workflows around model behavior, context, evaluation, tool access, and human oversight."}
          </p>
        </div>
        <div className="capability-list">
          {c.capabilities.map((item) => (
            <article key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <dl>
                <dt>{c.deliverLabel}</dt>
                <dd>{item.deliver}</dd>
                <dt>{c.evaluateLabel}</dt>
                <dd>{item.evaluate}</dd>
              </dl>
            </article>
          ))}
        </div>
        <Link
          className="text-link section-link"
          href={localizedPath(locale, "/services")}
        >
          {c.allServices}
          <Arrow />
        </Link>
      </section>
      <section className="section delivery-section">
        <h2>{c.deliveryTitle}</h2>
        <ol className="delivery-list">
          {c.delivery.map((item, i) => (
            <li key={item.title}>
              <span className="step-index">{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="section security-section">
        <div>
          <h2>{c.securityTitle}</h2>
          <p>{c.securityIntro}</p>
        </div>
        <div className="security-list">
          {c.security.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section research-company">
        <div>
          <span className="status-label">
            {ja ? "研究の方向性" : "Research directions"}
          </span>
          <h2>{c.researchTitle}</h2>
          <p>{c.researchIntro}</p>
          <Link className="text-link" href={localizedPath(locale, "/research")}>
            {c.nav[1]}
            <Arrow />
          </Link>
        </div>
        <div>
          <h2>
            {ja ? "東京から、共に作る。" : "Built together. Based in Tokyo."}
          </h2>
          <p>{c.aboutIntro}</p>
          <Link className="text-link" href={localizedPath(locale, "/about")}>
            {ja ? "BitLabsについて" : "Meet BitLabs"}
            <Arrow />
          </Link>
        </div>
      </section>
      <Closing locale={locale} />
    </>
  );
}
export function ServicesPage({ locale }: { locale: Locale }) {
  const c = editorial[locale];
  return (
    <>
      <PageHeading title={c.servicesTitle} body={c.servicesIntro} />
      <nav
        className="service-index"
        aria-label={locale === "en" ? "Service index" : "サービス一覧"}
      >
        {c.services.map((s) => (
          <a key={s.id} href={`#${s.id}`}>
            {s.title}
            <Arrow />
          </a>
        ))}
      </nav>
      <div className="services-list">
        {c.services.map((s) => (
          <section id={s.id} className="service-detail" key={s.id}>
            <div>
              <h2>{s.title}</h2>
              <Action locale={locale} secondary />
            </div>
            <dl>
              <dt>{c.problemLabel}</dt>
              <dd>{s.body}</dd>
              <dt>{c.deliverLabel}</dt>
              <dd>{s.deliver}</dd>
              <dt>{c.evaluateLabel}</dt>
              <dd>{s.evaluate}</dd>
            </dl>
          </section>
        ))}
      </div>
      <Closing locale={locale} />
    </>
  );
}
export function ResearchPage({ locale }: { locale: Locale }) {
  const c = editorial[locale],
    ja = locale === "ja";
  return (
    <>
      <PageHeading title={c.researchTitle} body={c.researchIntro} />
      <section className="section">
        <h2>{ja ? "研究の方向性" : "Research directions"}</h2>
        <div className="research-tracks">
          {c.tracks.map((t) => (
            <article key={t.title}>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="section-intro">
          <h2>
            {ja ? "公開デモと技術資料" : "Demonstrations & technical artifacts"}
          </h2>
          <p>
            {ja
              ? "現在公開しているのは、設計の考え方を示す説明用の資料です。実測による研究成果はまだ掲載していません。"
              : "Our first public artifact explains a design approach. No empirical research findings are published here yet."}
          </p>
        </div>
        <ResearchLink locale={locale} />
      </section>
      <Closing locale={locale} />
    </>
  );
}
export function ResearchDetail({
  locale,
  entry,
}: {
  locale: Locale;
  entry: ResearchEntry;
}) {
  const e = entry.content[locale],
    ja = locale === "ja";
  return (
    <article className="research-article">
      <Link
        className="text-link back-link"
        href={localizedPath(locale, "/research")}
      >
        {ja ? "研究一覧へ" : "All research"}
        <Arrow />
      </Link>
      <PageHeading title={e.title} body={e.summary} />
      <div className="article-meta">
        <span className="status-label">
          {ja ? "説明用 · 合成データ" : "Illustration · Synthetic data"}
        </span>
        <span>
          {entry.author} · <time dateTime={entry.date}>{entry.date}</time>
        </span>
      </div>
      <div className="article-prose">
        <section>
          <h2>{ja ? "問い" : "The question"}</h2>
          <p>{e.question}</p>
        </section>
        <section>
          <h2>
            {ja ? "構築したものと条件" : "What we built & the conditions"}
          </h2>
          <p>{e.method}</p>
        </section>
      </div>
      <WorkflowDemo locale={locale} />
      <div className="article-prose">
        <section>
          <h2>
            {ja ? "この例から読み取れること" : "Observations from the example"}
          </h2>
          <ul>
            {e.findings.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>{ja ? "限界" : "Limitations"}</h2>
          <p>{e.limitations}</p>
        </section>
        <section>
          <h2>
            {ja ? "業務への意味と評価" : "Business relevance & evaluation"}
          </h2>
          <p>{e.relevance}</p>
        </section>
        <section>
          <h2>{ja ? "公開資料" : "Inspect the artifact"}</h2>
          {e.artifacts.map((a) => (
            <a key={a.href} href={a.href} download className="text-link">
              {a.label}
              <Arrow />
            </a>
          ))}
        </section>
      </div>
      <Closing locale={locale} />
    </article>
  );
}
export function AboutPage({ locale }: { locale: Locale }) {
  const c = editorial[locale],
    p = aboutContent[locale],
    ja = locale === "ja";
  const rows = [
    [p.companyNameLabel, p.companyName],
    [p.ceoLabel, p.ceo],
    [p.establishedLabel, p.established],
    [p.addressLabel, p.address],
    [p.capitalLabel, p.capital],
    [ja ? "取引銀行" : "Banks", p.banks.join(" / ")],
  ];
  return (
    <>
      <PageHeading title={c.aboutTitle} body={c.aboutIntro} />
      <section className="section mission-section">
        <h2>{ja ? "私たちのミッション" : "Our mission"}</h2>
        <p>{c.mission}</p>
      </section>
      <section className="section">
        <div className="section-intro">
          <h2>
            {ja
              ? "研究と実装をつなぐ専門性"
              : "Expertise across research and delivery"}
          </h2>
          <p>
            {ja
              ? "モデルの事前学習・微調整、SLM開発、プロンプト・コンテキスト・ハーネス設計、Reactアプリケーション、クラウド基盤を横断して取り組みます。個別の技術より、課題に合った組み合わせを重視します。"
              : "Our team works across model pre-training and adaptation, SLM development, prompt, context and harness engineering, React applications, and cloud infrastructure. We choose the combination that fits the problem."}
          </p>
        </div>
        <div className="needs-list">
          {c.principles.map((p) => (
            <article key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section company-section">
        <h2>{ja ? "会社概要" : "Company information"}</h2>
        <dl>
          {rows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section id="contact-form" className="legacy-contact section">
        <h2>
          {ja ? "プロジェクトについて相談する" : "Start a project conversation"}
        </h2>
        <p>{c.contactIntro}</p>
        <Action locale={locale} />
        <a className="text-link" href="mailto:david@bitlabs.site">
          david@bitlabs.site
          <Arrow />
        </a>
      </section>
    </>
  );
}
export function ContactPage({ locale }: { locale: Locale }) {
  const c = editorial[locale];
  return (
    <>
      <PageHeading title={c.contactTitle} body={c.contactIntro} />
      <div className="contact-layout">
        <aside>
          <h2>{c.nextTitle}</h2>
          <p>{c.nextBody}</p>
          <h3>{locale === "en" ? "Prefer email?" : "メールでのご相談"}</h3>
          <a className="text-link" href="mailto:david@bitlabs.site">
            david@bitlabs.site
            <Arrow />
          </a>
          <p className="privacy-note">{c.privacy}</p>
        </aside>
        <section
          id="contact-form"
          aria-label={
            locale === "en" ? "Project inquiry" : "プロジェクトのお問い合わせ"
          }
        >
          <ContactForm />
        </section>
      </div>
    </>
  );
}
export function CareerPage({ locale }: { locale: Locale }) {
  const c = careerContent[locale],
    ja = locale === "ja";
  return (
    <>
      <PageHeading
        title={
          ja
            ? "AIを研究し、使える形にする仲間へ。"
            : "Research AI. Build things people can use."
        }
        body={
          ja
            ? "東京のBitLabsでは、モデル開発、エージェント、アプリケーションに取り組むAIエンジニアとAIリサーチャーを募集しています。"
            : "BitLabs is looking for AI Engineers and AI Researchers to work on models, agents, and applications in Tokyo."
        }
      />
      <section className="section">
        <h2>
          {ja
            ? "研究と開発を一つのチームで"
            : "Research and engineering in one team"}
        </h2>
        <div className="research-tracks">
          {c.roles.map((role) => (
            <article key={role.title}>
              <span className="status-label">
                {role.type} · {role.location}
              </span>
              <h3>{role.title}</h3>
              <p>{role.summary}</p>
              <ul>
                {role.focus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a className="text-link" href="#apply">
                {ja ? "応募する" : "Apply"}
                <Arrow />
              </a>
            </article>
          ))}
        </div>
      </section>
      <section id="apply" className="section contact-layout">
        <div>
          <h2>
            {ja
              ? "これまでの取り組みを教えてください"
              : "Tell us about your work"}
          </h2>
          <p>
            {ja
              ? "経歴、作ったもの、研究テーマ、関心のある職種をお知らせください。履歴書の添付は任意です。"
              : "Share your background, what you have built or researched, and the role that interests you. A resume is optional."}
          </p>
          <a className="text-link" href="mailto:david@bitlabs.site">
            david@bitlabs.site
            <Arrow />
          </a>
        </div>
        <ApplicationForm />
      </section>
    </>
  );
}
