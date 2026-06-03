import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getNote, SOCIAL_IMAGE } from "@/lib/field-notes";

export const Route = createFileRoute("/notes/$slug")({
  loader: ({ params }) => {
    const note = getNote(params.slug);
    if (!note) throw notFound();
    return { note };
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
  const { note } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
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
            <div className="mt-10 flex items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
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

            <div className="mt-10 pt-10 border-t border-border space-y-6">
              {note.body.map((para, i) => (
                <p key={i} className="text-foreground/85 leading-relaxed text-lg">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        </article>
      </main>
      <Footer />
    </div>
  );
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
