"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type PlatformLogo = {
  name: string;
  src: string;
};

type IntegrationHeroProps = {
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  platforms: PlatformLogo[];
};

export function IntegrationHero({
  eyebrow,
  title,
  body,
  ctaLabel,
  ctaHref,
  platforms,
}: IntegrationHeroProps) {
  return (
    <section
      className="relative overflow-hidden bg-background py-24 md:py-32"
      aria-labelledby="home-platforms-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative mx-auto max-w-7xl px-4 text-center md:px-6">
        <span className="inline-block rounded-full border px-3 py-1 text-sm text-foreground">
          {eyebrow}
        </span>
        <h2
          id="home-platforms-title"
          className="mt-4 text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl"
        >
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground md:text-xl">
          {body}
        </p>

        <Button asChild className="mt-8">
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>

        <div
          className="mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
          role="list"
          aria-label={eyebrow}
        >
          <div className="platform-marquee-track flex w-max items-center gap-16">
            {[...platforms, ...platforms].map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                role="listitem"
                aria-hidden={index >= platforms.length}
                className="flex flex-col items-center gap-3"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <span className="text-sm text-muted-foreground">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default IntegrationHero;
