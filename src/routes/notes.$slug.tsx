import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getNote, getNextNote, SOCIAL_IMAGE } from "@/lib/field-notes";

export const Route = createFileRoute("/notes/$slug")({
  loader: ({ params }) => {
    const note = getNote(params.slug);
    if (!note) throw notFound();
    return { note, nextNote: getNextNote(params.slug) };
  },
  head: ({ params, loaderData }) => {
    const note = loaderData?.note;
    const url = `https://joshuarey.org/notes/${params.slug}`;
    if (!note) {
      return { meta: [{ title: "Field note — Joshua Rey" }] };
    }
    const title = `${note.title} — Joshua Rey`;
    return {
      meta: [
        { title },
        { name: "description", content: note.excerpt },
        { property: "og:title", content: note.title },
        { property: "og:description", content: note.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: SOCIAL_IMAGE },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: note.title },
        { name: "twitter:description", content: note.excerpt },
        { name: "twitter:image", content: SOCIAL_IMAGE },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: note.title,
            description: note.excerpt,
            image: SOCIAL_IMAGE,
            author: { "@type": "Person", name: "Joshua Rey" },
          }),
        },
      ],
    };
  },
  component: NotePage,
  notFoundComponent: NoteNotFound,
  errorComponent: NoteError,
});

function NotePage() {
  const { note, nextNote } = Route.useLoaderData();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [readPercent, setReadPercent] = useState(0);
  const readOpacity = useTransform(scrollYProgress, [0, 0.05, 0.1], [0, 0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
    setReadPercent(Math.round(latest * 100));
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-forest-soft origin-left z-50"
        style={{ scaleX }}
      />

      {/* Read percentage */}
      <motion.div
        className="fixed top-4 right-4 z-50 text-[10px] uppercase tracking-[0.25em] text-muted-foreground tabular-nums"
        style={{ opacity: readOpacity }}
      >
        {readPercent}% read
      </motion.div>

      <Nav />
      <main className="px-6 md:px-10 py-32 md:py-44">
        <article className="mx-auto max-w-2xl">
          <Link
            to="/"
            hash="field-notes"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-forest-soft transition-colors"
          >
            <span className="rotate-180 inline-block">→</span> All field notes
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Ambient glow behind title */}
            <div className="relative mt-10">
              <div className="absolute -left-20 -top-10 w-40 h-40 rounded-full bg-forest-soft/10 blur-3xl pointer-events-none" />

              <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                <span>{note.date}</span>
                <span>·</span>
                <span>{note.read}</span>
              </div>
              <h1 className="mt-6 text-3xl md:text-5xl font-light leading-tight tracking-tight text-balance">
                {note.title}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                {note.excerpt}
              </p>
            </div>

            {/* Pull quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-12 mb-10 pl-6 md:pl-8 border-l-2 border-forest-soft/40"
            >
              <p className="text-xl md:text-2xl font-light leading-snug tracking-tight text-foreground/90 italic">
                &ldquo;{note.pullQuote}&rdquo;
              </p>
            </motion.blockquote>

            {/* Body with staggered animations, drop cap, and dividers */}
            <div className="mt-10 pt-10 border-t border-border space-y-8">
              {note.body.map((para: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
                >
                  {i === note.body.length - 1 && (
                    <div className="flex items-center gap-4 my-8">
                      <div className="flex-1 h-px bg-border" />
                      <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                        {note.date}
                      </span>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                  )}
                  {(() => {
                    const parseLinks = (text: string) => {
                      const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
                      const parts = [];
                      let lastIndex = 0;
                      let match;
                      while ((match = regex.exec(text)) !== null) {
                        if (match.index > lastIndex) {
                          parts.push(text.slice(lastIndex, match.index));
                        }
                        parts.push(
                          <a
                            key={match.index}
                            href={match[2]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-forest-soft hover:underline font-normal"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {match[1]}
                          </a>
                        );
                        lastIndex = regex.lastIndex;
                      }
                      if (lastIndex < text.length) {
                        parts.push(text.slice(lastIndex));
                      }
                      return parts.length > 0 ? parts : text;
                    };

                    if (i === 0) {
                      return (
                        <p className="text-foreground/85 leading-[1.85] text-lg max-w-prose">
                          <span className="float-left text-5xl md:text-6xl font-light leading-[0.85] mr-3 mt-1 text-forest-soft">
                            {para.charAt(0)}
                          </span>
                          {parseLinks(para.slice(1))}
                        </p>
                      );
                    }
                    return (
                      <p className="text-foreground/85 leading-[1.85] text-lg max-w-prose">
                        {parseLinks(para)}
                      </p>
                    );
                  })()}
                </motion.div>
              ))}
            </div>

            {/* Share */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-14 flex items-center gap-6"
            >
              <button
                type="button"
                onClick={() => handleShare(note.slug, note.title)}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-forest-soft transition-colors cursor-pointer"
              >
                <ShareIcon />
                Share this note
              </button>
            </motion.div>

            {/* Next note navigation */}
            {nextNote && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-20 pt-12 border-t border-border"
              >
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Next field note
                </span>
                <Link
                  to="/notes/$slug"
                  params={{ slug: nextNote.slug }}
                  className="group mt-4 block"
                >
                  <h3 className="text-2xl md:text-3xl font-light leading-snug tracking-tight text-balance group-hover:text-forest-soft transition-colors">
                    {nextNote.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <span>{nextNote.date}</span>
                    <span>·</span>
                    <span>{nextNote.read}</span>
                    <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">
                      →
                    </span>
                  </div>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

async function handleShare(slug: string, title: string) {
  const url = `${window.location.origin}/notes/${slug}`;
  try {
    if (navigator.share) {
      await navigator.share({ title: `Field note — ${title}`, url });
      return;
    }
    await navigator.clipboard.writeText(url);
  } catch {
    // user cancelled native share, or clipboard blocked — fail quietly
  }
}

function NoteNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-light text-foreground">Field note not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This note may have been moved or renamed.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            hash="field-notes"
            className="inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm hover:border-foreground transition-colors"
          >
            Back to field notes
          </Link>
        </div>
      </div>
    </div>
  );
}

function NoteError({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-light text-foreground">This note didn't load</h1>
        <div className="mt-6">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm hover:border-foreground transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

function ShareIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
      <line x1="15.4" y1="6.5" x2="8.6" y2="10.5" />
    </svg>
  );
}
