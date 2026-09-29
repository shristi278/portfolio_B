import { useEffect, useState, type ReactNode } from "react";
import { essayDifferent } from "./data";
import { EssayPager } from "./EssayPager";
import { go } from "./nav";

const toc = [
  { id: "diff-intro", label: "Starting point" },
  { id: "diff-looking-good", label: "When everything starts looking good" },
  { id: "diff-advantage", label: "My advantage isn't the tool" },
  { id: "diff-unusual", label: "Being different isn't about being unusual" },
  { id: "diff-better", label: "What I want to get better at" },
];

function Reveal({ children }: { children: ReactNode }) {
  return <div className="essay-reveal">{children}</div>;
}

function Rich({ children }: { children: string }) {
  return (
    <>
      {children.split(/(\*\*[^*]+\*\*|\+\+[^+]+\+\+)/g).map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <mark key={index} className="essay-hl">
              {part.slice(2, -2)}
            </mark>
          );
        }
        if (part.startsWith("++") && part.endsWith("++")) {
          return (
            <mark key={index} className="essay-hl-alt">
              {part.slice(2, -2)}
            </mark>
          );
        }
        return part;
      })}
    </>
  );
}

function P({ children }: { children: string }) {
  return (
    <p>
      <Rich>{children}</Rich>
    </p>
  );
}

function EssayToc({ activeId }: { activeId: string }) {
  return (
    <>
      <nav className="essay-toc" aria-label="On this page">
        <div className="essay-toc-rail">
          {toc.map((item, index) => (
            <a
              key={item.id}
              className={item.id === activeId ? "is-active" : undefined}
              href={`#${item.id}`}
              aria-current={item.id === activeId ? "location" : undefined}
            >
              <span className="visually-hidden">
                {index + 1}. {item.label}
              </span>
            </a>
          ))}
        </div>
        <div className="essay-toc-panel">
          <p className="essay-toc-title">On this page</p>
          {toc.map((item, index) => (
            <a
              key={item.id}
              className={item.id === activeId ? "is-active" : undefined}
              href={`#${item.id}`}
              tabIndex={-1}
              aria-current={item.id === activeId ? "location" : undefined}
            >
              <span>{index + 1}.</span> {item.label}
            </a>
          ))}
        </div>
      </nav>
      <details className="essay-toc-mobile">
        <summary>On this page</summary>
        {toc.map((item, index) => (
          <a
            key={item.id}
            className={item.id === activeId ? "is-active" : undefined}
            href={`#${item.id}`}
          >
            {index + 1}. {item.label}
          </a>
        ))}
      </details>
    </>
  );
}

export function DifferentEssay() {
  const [activeId, setActiveId] = useState(toc[0].id);

  useEffect(() => {
    const previousTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content") ?? "";
    document.title = `${essayDifferent.title} — ${essayDifferent.author}`;
    meta?.setAttribute("content", essayDifferent.description);

    const keywords = document.createElement("meta");
    keywords.name = "keywords";
    keywords.content = essayDifferent.keywords.join(", ");
    document.head.appendChild(keywords);

    const author = document.createElement("meta");
    author.name = "author";
    author.content = essayDifferent.author;
    document.head.appendChild(author);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = [...document.querySelectorAll(".essay-reveal")];
    if (reduced.matches) {
      nodes.forEach((node) => node.classList.add("is-in"));
      return () => {
        document.title = previousTitle;
        meta?.setAttribute("content", previousDescription);
        keywords.remove();
        author.remove();
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-in");
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      document.title = previousTitle;
      meta?.setAttribute("content", previousDescription);
      keywords.remove();
      author.remove();
    };
  }, []);

  useEffect(() => {
    const headings = toc
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -64% 0px", threshold: [0, 0.25, 1] },
    );
    headings.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: essayDifferent.title,
    description: essayDifferent.description,
    author: { "@type": "Person", name: essayDifferent.author },
    datePublished: "2025-01-01",
    dateModified: "2025-12-31",
    keywords: essayDifferent.keywords.join(", "),
    inLanguage: "en",
    image: essayDifferent.thumbnail.src,
  };

  return (
    <main className="essay" id="top">
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <EssayToc activeId={activeId} />
      <div className="essay-body">
        <a
          className="cta essay-back"
          href="/#experiments"
          onClick={(event) => {
            event.preventDefault();
            go("/#experiments");
          }}
        >
          <span aria-hidden="true">←</span> Back
        </a>

        <header className="essay-hero">
          <p className="eyebrow">{essayDifferent.meta}</p>
          <h1>{essayDifferent.title}</h1>
          <p className="essay-dek">
            <Rich>{essayDifferent.subtitle}</Rich>
          </p>
        </header>

        <article>
          <Reveal>
            <section className="essay-section" aria-labelledby="diff-intro">
              <h2 id="diff-intro" className="visually-hidden">
                Starting point
              </h2>
              <P>
                I've been thinking a lot about what it actually means to be a
                designer in a world where almost anything can be created with
                AI.
              </P>
              <P>
                A few years ago, being good at a tool was a differentiator.
                Knowing Figma well, understanding visual systems or being able
                to prototype quickly gave you an edge. Today, AI can do a lot of
                that work for you. Give it a prompt and you can get a UI, an
                illustration, a prototype, some code or even an entire visual
                direction in minutes.
              </P>
              <P>And honestly, I love that.</P>
              <P>
                AI has made experimenting much easier for me. I can take an idea
                that would normally sit in my head for days and actually see it
                within minutes. I can explore ten directions instead of settling
                for the first one. I can also spend more time thinking about the
                problem instead of spending all my energy making the thing.
              </P>
              <P>
                But there's something interesting happening alongside all this.
              </P>
              <P>
                **The easier it becomes to make things, the harder it becomes to
                make something that feels like you.**
              </P>
            </section>
          </Reveal>

          <hr className="essay-rule" />

          <Reveal>
            <section
              className="essay-section"
              aria-labelledby="diff-looking-good"
            >
              <h2 id="diff-looking-good">When everything starts looking good</h2>
              <P>
                One thing I've noticed while working with AI is how quickly it
                can make something look polished.
              </P>
              <P>
                You can generate beautiful interfaces, 3D objects, illustrations
                and visual identities without necessarily having a strong idea
                behind them. And because everyone has access to similar tools,
                there's a risk that everything starts looking familiar.
              </P>
              <P>
                The same gradients. The same futuristic interfaces. The same
                glass effects. The same perfectly polished AI-generated visuals.
              </P>
              <P>This made me think about my own work.</P>
              <P>
                I don't want AI to become the thing that defines my design
                style. I want it to become part of how I explore my ideas.
              </P>
              <p>
                For me, the interesting question is no longer{" "}
                <em>“Can I make this?”</em>
              </p>
              <P>It is **“Is this worth making in the first place?”**</P>
            </section>
          </Reveal>

          <hr className="essay-rule" />

          <Reveal>
            <section className="essay-section" aria-labelledby="diff-advantage">
              <h2 id="diff-advantage">My advantage isn't the tool</h2>
              <P>
                I've started thinking of AI less like a replacement for design
                skills and more like an extremely fast creative partner.
              </P>
              <P>
                I can throw a rough idea at it, make something, dislike it,
                change it, break it and try again. That loop is incredibly
                useful. It gives me permission to explore ideas that I might
                have otherwise ignored because they felt too time-consuming to
                execute.
              </P>
              <P>But the final decision still comes from me.</P>
              <P>
                What I find interesting. What I notice. What I remove. What
                feels unnecessary. What feels too obvious. What feels like
                something I've already seen a hundred times.
              </P>
              <P>
                Those decisions are shaped by my experiences as a designer, the
                products I've worked on, the things I've liked and disliked and
                honestly, sometimes just my weird personal obsessions.
              </P>
              <P>That's the part I don't want to outsource.</P>
            </section>
          </Reveal>

          <hr className="essay-rule" />

          <Reveal>
            <section className="essay-section" aria-labelledby="diff-unusual">
              <h2 id="diff-unusual">
                Being different isn't about being unusual
              </h2>
              <P>
                I used to think being different meant doing something visually
                unexpected.
              </P>
              <P>Now I think it is much simpler.</P>
              <P>It is having a **point of view.**</P>
              <P>
                Two designers can use exactly the same AI tools and arrive at
                completely different outcomes because they start with different
                questions. One might care deeply about simplicity. Another might
                be obsessed with motion. Someone else might focus on
                accessibility, systems or storytelling.
              </P>
              <P>The tool is the same.</P>
              <P>**The lens is different.**</P>
              <P>
                And I think that lens becomes increasingly valuable as AI makes
                execution cheaper.
              </P>
            </section>
          </Reveal>

          <hr className="essay-rule" />

          <Reveal>
            <section className="essay-section" aria-labelledby="diff-better">
              <h2 id="diff-better">So, what do I want to get better at?</h2>
              <P>Not prompting.</P>
              <P>At least, not only prompting.</P>
              <P>
                I want to get better at noticing things. Asking better
                questions. Understanding people. Connecting seemingly unrelated
                ideas. Developing stronger taste. Knowing when something is
                working and, perhaps more importantly, knowing when it isn't.
              </P>
              <P>
                I want to use AI to explore more, fail faster and make the
                boring parts of design less boring.
              </P>
              <P>But I still want the final work to have fingerprints.</P>
              <P>Mine.</P>
              <P>
                Because if AI makes it possible for everyone to create almost
                anything, I think the designers who stand out won't necessarily
                be the ones who know the most tools.
              </P>
              <P>
                They'll be the ones who have something **personal to say with
                them.**
              </P>
              <P>
                And that's probably the part of being a designer I don't want AI
                to change.
              </P>
            </section>
          </Reveal>
        </article>
        <EssayPager slug={essayDifferent.slug} />
      </div>
    </main>
  );
}
