import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const TREE_PLANTING_SOCIAL_IMAGE =
  "https://joshuarey.org/__l5e/assets-v1/31e817d6-ff66-4348-836c-edf3c18fe769/tree-planting-social-v3.png";

const TITLE = "Tree Planting with Joshua Rey";
const DESCRIPTION =
  "Small intentional actions shape the future. Join the next tree planting — a recurring gathering in Port Harcourt where we plant, talk systems, and shape behavior one season at a time.";
const URL = "https://joshuarey.org/tree-planting";

export const Route = createFileRoute("/tree-planting")({
  head: () => ({
    meta: [
      { title: `${TITLE} — Joshua Rey` },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: TREE_PLANTING_SOCIAL_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: TREE_PLANTING_SOCIAL_IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          name: TITLE,
          description: DESCRIPTION,
          image: TREE_PLANTING_SOCIAL_IMAGE,
          location: {
            "@type": "Place",
            name: "Port Harcourt",
          },
          organizer: { "@type": "Person", name: "Joshua Rey" },
        }),
      },
    ],
  }),
  component: TreePlantingPage,
});

function TreePlantingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="px-6 md:px-10 py-32 md:py-44">
        <article className="mx-auto max-w-2xl">
          <Link
            to="/"
            hash="community"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-forest-soft transition-colors"
          >
            <span className="rotate-180 inline-block">→</span> Back to community
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mt-10 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Port Harcourt · Recurring
            </div>
            <h1 className="mt-6 text-3xl md:text-5xl font-light leading-tight tracking-tight text-balance">
              Tree Planting with Joshua Rey
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Small intentional actions shape the future.
            </p>

            <div className="mt-10 pt-10 border-t border-border space-y-6 text-foreground/85 leading-relaxed text-lg">
              <p>
                A tree is a system too — small input, compounding output, results you only
                see if you stay consistent. So a few times a year we gather, plant, and talk
                about the systems we're each building.
              </p>
              <p>
                No app. No streak counter. Just behavior shaping the future, one season at a
                time.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="https://wa.me/2349082828771"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-forest hover:bg-forest-soft text-white px-6 py-3.5 rounded-full text-sm tracking-wide transition-all"
              >
                Join the next tree planting
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </motion.div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
