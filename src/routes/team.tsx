import { createFileRoute } from "@tanstack/react-router";
import { UserRound } from "lucide-react";
import { PageHero } from "@/components/site/Section";
import { FinalCta } from "@/components/site/FinalCta";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — Aevyrix Creation Hub" },
      { name: "description", content: "Meet the creative, design and engineering roles behind Aevyrix Creation Hub." },
      { property: "og:title", content: "Our Team — Aevyrix Creation Hub" },
      { property: "og:description", content: "The people behind the work." },
    ],
  }),
  component: Team,
});

const roles = ["Founder / Agency Lead", "Creative Director", "Video Editor", "Graphic Designer", "Frontend Developer", "Backend Developer", "UI/UX Designer", "Digital Marketing Specialist"];

function Team() {
  return (
    <>
      <PageHero eyebrow="Our team" title={<>The people behind <span className="text-gradient">the work</span></>} text="Real team profiles with photos and bios are coming soon. These are the roles that shape every project." />
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((r) => (
            <div key={r} className="rounded-2xl border border-dashed border-border bg-card/60 p-6 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-border bg-section"><UserRound className="h-8 w-8 text-muted-foreground" /></div>
              <p className="mt-4 font-display font-semibold">{r}</p>
              <p className="mt-1 text-xs text-muted-foreground">Profile coming soon</p>
            </div>
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
