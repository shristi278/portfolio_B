import { useEffect, useState, type ReactNode } from "react";
import { essay } from "./data";
import { EssayPager } from "./EssayPager";
import { go } from "./nav";

const toc = [
  { id: "essay-intro", label: "Starting point" },
  { id: "essay-language", label: "Finding a visual language" },
  { id: "essay-rejected", label: "The portfolio that didn't make it" },
  { id: "essay-code", label: "From idea to code" },
  { id: "essay-wrong", label: "When the AI doesn't understand" },
  { id: "essay-mine", label: "The part AI didn't design" },
  { id: "essay-details", label: "Designing the details" },
  { id: "essay-month", label: "One month of building" },
  { id: "essay-changed", label: "What changed for me" },
  { id: "essay-next", label: "What I'd do differently" },
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

type EssayImage = { src: string; alt: string };

function EssayLightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: EssayImage[];
  index: number;
  onClose: () => void;
  onIndex: (next: number) => void;
}) {
  const item = items[index];
  const atFirst = index <= 0;
  const atLast = index >= items.length - 1;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight" && !atLast) onIndex(index + 1);
      if (event.key === "ArrowLeft" && !atFirst) onIndex(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [atFirst, atLast, index, onClose, onIndex]);

  return (
    <div className="essay-lightbox">
      <button
        type="button"
        className="essay-lightbox-backdrop"
        aria-label="Close image"
        onClick={onClose}
      />
      <figure
        className="essay-lightbox-frame"
        role="dialog"
        aria-modal="true"
        aria-label={item.alt}
      >
        <img src={item.src} alt="" />
        <figcaption>{item.alt}</figcaption>
      </figure>
      <button
        type="button"
        className="essay-lightbox-close"
        aria-label="Close image"
        onClick={onClose}
      >
        ×
      </button>
      {items.length > 1 ? (
        <>
          <button
            type="button"
            className="essay-lightbox-prev"
            aria-label="Previous image"
            disabled={atFirst}
            onClick={() => onIndex(index - 1)}
          >
            ←
          </button>
          <button
            type="button"
            className="essay-lightbox-next"
            aria-label="Next image"
            disabled={atLast}
            onClick={() => onIndex(index + 1)}
          >
            →
          </button>
        </>
      ) : null}
    </div>
  );
}

function EssayShots({
  items,
  className,
  label,
}: {
  items: EssayImage[];
  className: string;
  label?: string;
}) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <div className={className} role="group" aria-label={label}>
        {items.map((item, i) => (
          <button
            key={item.src}
            type="button"
            className="essay-shot"
            onClick={() => setIndex(i)}
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>
      {index !== null ? (
        <EssayLightbox
          items={items}
          index={index}
          onClose={() => setIndex(null)}
          onIndex={setIndex}
        />
      ) : null}
    </>
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

export function AiEssay() {
  const [activeId, setActiveId] = useState(toc[0].id);

  useEffect(() => {
    const previousTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content") ?? "";
    document.title = `${essay.title} — Shristi Suman`;
    meta?.setAttribute("content", essay.description);

    const keywords = document.createElement("meta");
    keywords.name = "keywords";
    keywords.content = essay.keywords.join(", ");
    document.head.appendChild(keywords);

    const author = document.createElement("meta");
    author.name = "author";
    author.content = essay.author;
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
    headline: essay.title,
    description: essay.description,
    author: { "@type": "Person", name: essay.author },
    datePublished: "2026-09-01",
    dateModified: "2026-09-27",
    keywords: essay.keywords.join(", "),
    inLanguage: "en",
    image: essay.thumbnail.src,
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
        <p className="eyebrow">{essay.meta}</p>
        <h1>{essay.title}</h1>
        <p className="essay-dek">
          <Rich>{essay.subtitle}</Rich>
        </p>
        <div className="essay-meta">
          <p>
            <strong>Tools:</strong> Figma · ChatGPT · Cursor · GitHub · Vercel
          </p>
          <p>
            <strong>Build time:</strong> ~1 month
          </p>
          <p>
            <strong>Visual direction:</strong> Neo-Y2K × Digital Brutalism
          </p>
        </div>
      </header>

      <article>
        <Reveal>
          <section className="essay-section" aria-labelledby="essay-intro">
            <h2 id="essay-intro" className="visually-hidden">
              Starting point
            </h2>
            <P>
              I've been redesigning my portfolio for almost a year. Not because
              I didn't know what I wanted to make, but because I couldn't find
              something that actually felt like **me**.
            </P>
            <P>
              I kept making clean, minimal portfolio designs. They looked
              polished, but they also looked like portfolios I'd seen a hundred
              times before. And honestly, they were a little boring.
            </P>
            <P>
              As a product designer working in B2B, a lot of my day-to-day work
              is about structure, complexity and making enterprise products
              easier to use. I enjoy that work, but I also have a much more
              experimental and playful side that doesn't always get to show up
              in a B2B environment. I wanted my portfolio to show that side.
            </P>
            <P>
              So I stopped trying to make a ++"perfect product designer
              portfolio"++ and started trying to make something that felt like
              **my own little digital space**.
            </P>
          </section>
        </Reveal>

        <hr className="essay-rule" />

        <Reveal>
          <section className="essay-section" aria-labelledby="essay-language">
            <h2 id="essay-language"><span className="essay-step">01</span>Finding a visual language</h2>
            <P>
              I started, as most design projects start, with a Figma moodboard.
              It honestly felt like being back in college. I collected things I
              was naturally drawn to: **badges, stickers, balloons, charms,
              metallic objects, bold colours and strange little digital
              artifacts.**
            </P>
            <P>
              I've always loved Y2K, especially the optimism around how people
              imagined the future. But I didn't want to recreate a Y2K website
              from the early 2000s. I wanted to reinterpret it.
            </P>
            <P>
              The direction became ++Neo-Y2K × Digital Brutalism++. Y2K gave me
              the playfulness and nostalgia. Brutalism gave me the bold
              typography, strong composition and slightly raw feeling. The
              moodboard became the foundation for everything that followed.
            </P>
            <figure className="essay-figure">
              <EssayShots
                className="essay-mood"
                label="Figma moodboard: typography, color, layout, and visual language"
                items={essay.mood}
              />
              <figcaption>
                The visual language started with a Figma moodboard rather than a
                UI.
              </figcaption>
            </figure>
          </section>
        </Reveal>

        <hr className="essay-rule" />

        <Reveal>
          <section className="essay-section" aria-labelledby="essay-rejected">
            <h2 id="essay-rejected"><span className="essay-step">02</span>The portfolio that didn't make it</h2>
            <P>
              Before reaching this direction, I made several versions of the
              portfolio. And rejected them. Some were too minimal. Some felt too
              generic. Some looked good but didn't feel personal enough.
            </P>
            <P>
              Looking back at these versions was actually useful because they
              made one thing very clear: **I wasn't looking for another polished
              portfolio. I was looking for a visual language that could reveal
              more of my personality.**
            </P>
            <figure className="essay-figure">
              <EssayShots className="essay-collage" items={essay.collage} />
              <figcaption>
                A few of the directions I explored before finding the one that
                felt right.
              </figcaption>
            </figure>
          </section>
        </Reveal>

        <hr className="essay-rule" />

        <Reveal>
          <section className="essay-section" aria-labelledby="essay-code">
            <h2 id="essay-code"><span className="essay-step">03</span>From idea to code</h2>
            <P>
              Once I had the visual direction, I didn't design the entire
              website in Figma. I only used Figma for the **moodboard, visual
              direction and typography**. Then I moved directly into code.
            </P>
            <P>
              This is where AI changed the process for me. I used ++ChatGPT for
              brainstorming, visual exploration and image generation++, and
              **Cursor as my coding partner**.
            </P>
            <P>
              My workflow became **Think → Prompt → Build → Interact → Break →
              Fix → Repeat**. Instead of spending hours creating a high-fidelity
              prototype in Figma, I could describe an interaction and see a
              working version much faster. That completely changed how I think
              about prototyping.
            </P>
            <P>
              ++I no longer have to decide whether an idea is good enough to
              prototype. I can prototype it to find out whether it's good.++
            </P>
          </section>
        </Reveal>

        <hr className="essay-rule" />

        <Reveal>
          <section className="essay-section" aria-labelledby="essay-wrong">
            <h2 id="essay-wrong"><span className="essay-step">04</span>When the AI doesn't understand what you mean</h2>
            <P>
              Of course, it wasn't magic. I initially had a very ambitious hero
              animation in mind. I experimented with AI video generation but
              quickly hit a practical problem: the tool I wanted to use was
              paid. So I went back to brainstorming with ChatGPT. That
              eventually led me towards stickers, 3D objects and a custom
              character instead.
            </P>
            <P>
              Some of the most interesting parts of the final website came from
              these iterations. And some of the worst parts did too. Cursor made
              plenty of mistakes. A transparent PNG would occasionally become a
              JPEG with a black background. Animations would become glitchy.
              Text would overlap images. Complex patterns were sometimes
              difficult to reproduce.
            </P>
            <P>
              My About section banner was particularly painful. It created
              unwanted horizontal scrolling, repeated elements and refused to
              animate the way I intended.
            </P>
            <figure className="essay-figure">
              <EssayShots className="essay-fail-grid" items={essay.failures} />
              <figcaption>
                AI makes iteration faster. It doesn't make iteration unnecessary.
              </figcaption>
            </figure>
            <P>
              These failures taught me something important: **AI can execute an
              instruction, but it doesn't automatically understand your design
              intention.** You still need to look at the result, understand
              what's wrong and communicate the problem clearly.
            </P>
          </section>
        </Reveal>

        <hr className="essay-rule" />

        <Reveal>
          <section className="essay-section essay-quiet" aria-labelledby="essay-mine">
            <h2 id="essay-mine"><span className="essay-step">05</span>The part AI didn't design</h2>
            <P>
              The visual direction was mine. The interaction ideas were mine.
              The decision to combine Neo-Y2K with brutalism was mine. AI helped
              me turn those decisions into working things faster. That's an
              important distinction for me.
            </P>
            <P>
              I don't think the interesting story is ++“I built my portfolio
              with AI.”++ It's **“I had a strong design point of view and used
              AI to reduce the distance between my ideas and a working
              prototype.”** That difference matters.
            </P>
            <P>
              The stronger my direction became, the more useful AI became. When
              I was vague, the results were generic. When I was specific about
              the visual language, behaviour, spacing, viewport rules or
              interaction, the output became much closer to what I imagined.
            </P>
          </section>
        </Reveal>

        <hr className="essay-rule" />

        <Reveal>
          <section className="essay-section" aria-labelledby="essay-details">
            <h2 id="essay-details"><span className="essay-step">06</span>Designing the details</h2>
            <P>
              Some of my favourite parts of the final portfolio are also the
              most experimental. The **hero and footer** were particularly fun
              to build. There are stickers, grids, a swinging ID card, floating
              balloons and different objects interacting with the page.
            </P>
            <P>
              None of these things are necessary for a portfolio to function.
              But they communicate something that a traditional case study
              can't: ++I enjoy making things.++ I wanted the portfolio to show
              the designer behind the work, not just the work itself.
            </P>
          </section>
        </Reveal>

        <hr className="essay-rule" />

        <Reveal>
          <section className="essay-section" aria-labelledby="essay-month">
            <h2 id="essay-month"><span className="essay-step">07</span>One month of building</h2>
            <P>
              The whole build took about **one month**. My setup was relatively
              simple:
            </P>
            <ul className="essay-setup">
              <li>
                <strong>Figma</strong> → visual direction
              </li>
              <li>
                <strong>ChatGPT</strong> → brainstorming + image generation
              </li>
              <li>
                <strong>Cursor</strong> → development + debugging
              </li>
              <li>
                <strong>GitHub</strong> → version control
              </li>
              <li>
                <strong>Vercel</strong> → deployment
              </li>
            </ul>
            <P>
              I also kept asking Cursor to check the site for ++accessibility,
              performance, responsive behaviour and glitches++ throughout the
              process. That was important because moving quickly shouldn't mean
              ignoring the fundamentals.
            </P>
            <P>
              After the website was working, I deployed it and tested the actual
              live experience rather than relying only on the local version.
              Eventually, it moved onto my own domain.
            </P>
          </section>
        </Reveal>

        <hr className="essay-rule" />

        <Reveal>
          <section className="essay-section essay-quiet" aria-labelledby="essay-changed">
            <h2 id="essay-changed">What changed for me</h2>
            <P>
              The biggest thing I took away wasn't learning Cursor or becoming
              better at prompting. It was a change in how I think about
              **prototyping**.
            </P>
            <P>
              Before this, prototyping usually meant opening Figma, creating
              screens, connecting interactions and deciding how much effort an
              idea deserved. Now the barrier is much lower. ++If I have an idea,
              I can build a rough version of it almost immediately.++
            </P>
            <P>
              That means I can explore more ideas, reject them faster and push
              the interesting ones further. And that's probably the best part of
              designing with AI. It doesn't replace the designer's point of
              view. **It makes the distance between a thought and something
              tangible much smaller.**
            </P>
          </section>
        </Reveal>

        <Reveal>
          <section className="essay-section" aria-labelledby="essay-next">
            <h3 id="essay-next">A few things I'd do differently</h3>
            <P>
              I'd push the experimental side even further. I'd add more recorded
              videos, behind-the-scenes experiments and unfinished ideas. Not
              just the polished outcome, but more evidence of how I think and
              make.
            </P>
            <P>
              Because if this portfolio is supposed to represent me, it
              shouldn't only show **what I designed**. It should also show ++how
              I think, experiment and build.++ **Maybe that's the next version.**
            </P>
          </section>
        </Reveal>
      </article>
      <EssayPager slug={essay.slug} />
      </div>
    </main>
  );
}
