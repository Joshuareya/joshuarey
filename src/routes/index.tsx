import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Building } from "@/components/Building";
import { Observing } from "@/components/Observing";
import { Thoughts } from "@/components/Thoughts";
import { FieldNotes } from "@/components/FieldNotes";
import { Community } from "@/components/Community";
import { Connect } from "@/components/Connect";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Joshua Rey — Studying behavior, building systems" },
      {
        name: "description",
        content:
          "Joshua Rey studies how people behave, then builds systems around it — Movlify, Tithetify, Werktify, and quiet observations on visibility and consistency.",
      },
      { property: "og:title", content: "Joshua Rey — Studying behavior, building systems" },
      {
        property: "og:description",
        content:
          "Observations and systems on visibility, accountability, and how good systems make the right behavior easier.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <About />
        <Building />
        <Observing />
        <Thoughts />
        <FieldNotes />
        <Community />
        <Connect />
      </main>
      <Footer />
    </div>
  );
}
