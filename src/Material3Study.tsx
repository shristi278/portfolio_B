import { useEffect } from "react";
import { CtaLink } from "./CtaLink";

const img = (file: string, size = 1024) =>
  `https://framerusercontent.com/images/${file}.png?scale-down-to=${size}`;

function Figure({
  file,
  alt,
  size,
  className,
}: {
  file: string;
  alt: string;
  size?: number;
  className?: string;
}) {
  return (
    <figure className={className ?? "study-figure"}>
      <img src={img(file, size)} alt={alt} loading="lazy" />
    </figure>
  );
}

export function Material3Study() {
  useEffect(() => {
    document.title = "From legacy to Material 3 — Shristi Suman";
    return () => {
      document.title = "Shristi Suman - Senior Product Designer";
    };
  }, []);

  return (
    <main className="study" id="top">
      <header className="study-hero">
        <p className="eyebrow">From legacy to Material 3: redesigning Android experience</p>
        <h1>
          A decade-old interface, 95% of our users, and one bold decision: rebuild
          from the ground up.
        </h1>
        <div className="tags">
          <span>B2B</span>
          <span>Mobile application</span>
          <span>SaaS</span>
        </div>
        <Figure
          file="Jw4oxY7huwwtEnmRWxVr22GmNPY"
          alt="Material 3 Android redesign overview"
          size={2048}
        />
      </header>

      <section className="study-meta">
        <div>
          <h2>Role</h2>
          <p>
            <strong>Led the revamp of Android agents.</strong> Collaborated closely
            with developers and product managers; partnered with the design system
            team to introduce new Android-specific components. Worked directly with
            cross-functional teams to ensure seamless implementation and alignment.
          </p>
        </div>
        <div>
          <h2>Team</h2>
          <p>1 product designer · 3 product managers · 7 software engineers</p>
        </div>
        <div>
          <h2>Timeline</h2>
          <p>2 months</p>
        </div>
      </section>

      <section className="study-block">
        <h2>Setting the Stage: Why this redesign, and why now?</h2>
        <p>
          For over a decade, our Android interface quietly served millions, but
          beneath the surface, cracks were forming. Components were patched
          together, custom elements tangled with aging Material Design, and icon
          files hid in scattered folders across projects. With Android claiming 95%
          of our user base and engineering teams hungry for better workflows, the
          message was clear: it was time to reset, rebuild, and reimagine.
        </p>
        <Figure
          file="kbi6cslYifkGX4TzmOiGssxMcI4"
          alt="User distribution chart showing Android versus iOS"
        />
        <h3>Challenges</h3>
        <ul className="study-challenges">
          <li>
            <strong>Scattered components</strong>
            <span>No centralized library</span>
          </li>
          <li>
            <strong>Inconsistent design</strong>
            <span>80% old Material + 20% custom</span>
          </li>
          <li>
            <strong>Icon chaos</strong>
            <span>No single source of truth</span>
          </li>
          <li>
            <strong>Inefficient workflows</strong>
            <span>Hand-crafted XML for every feature</span>
          </li>
        </ul>
      </section>

      <section className="study-block">
        <h2>The Quest for Feasibility: Step 1 — Asking the right questions with SOTI Snap</h2>
        <p>
          I started not with sketches, but with curiosity. Before touching a single
          pixel, I needed to understand our current reality. I reached out to the
          Snap Android development team with a list of practical, probing questions
          designed to uncover not just what we had, but what we truly needed.
        </p>
        <dl className="study-qa">
          <dt>Which design system are we following now for Android?</dt>
          <dd>
            80% of our UI came straight from old Material Design; the rest was a
            jumble of custom elements.
          </dd>
          <dt>What’s our Android vs. iOS user count? Are we designing for everyone, or mostly Android?</dt>
          <dd>Only 5% of users were on iOS, so why multiply our design work?</dd>
          <dt>Where do our icons live? Is there a system… or a folder… or just chaos?</dt>
          <dd>No proper icon folder. A design scavenger hunt every time.</dd>
          <dt>Could our devs work more efficiently with a native design system?</dt>
          <dd>
            Developers were flexible: they could stick with Elevate or go
            full-native. After bouncing ideas, we chose the native route for
            simplicity and longevity.
          </dd>
        </dl>
      </section>

      <section className="study-block">
        <h2>Digging Deeper: Step 2 — The MobiControl encounter</h2>
        <p>
          Armed with insights from Snap, I connected with the MobiControl Android
          team. Rashmi Narang and Sharib Zafar brought along two talented
          developers, and we gathered (virtually), coffee in hand, ready to dive
          deep into the technical realities and possibilities.
        </p>
        <h3>Key discussion points</h3>
        <ul>
          <li>
            <strong>Component management:</strong> no shared library existed. Every
            feature required hand-crafted XML, multiplying development time and
            introducing inconsistencies.
          </li>
          <li>
            <strong>The path forward:</strong> Jetpack Compose with Material 3
            represented not just a better way, but a modern, faster, and more
            scalable foundation for our future.
          </li>
          <li>
            <strong>The icon solution:</strong> when I pitched centralizing around
            Elevate icons, the relief in the virtual room was immediate. Finally,
            one library. One source of truth.
          </li>
        </ul>
        <Figure
          className="study-figure is-ink"
          file="4kBUpnsYQqi7hbpbYEB63I8so"
          alt="Workshop notes from the MobiControl Android discussion"
          size={2048}
        />
      </section>

      <section className="study-block">
        <h2>Decision time: synthesis and strategy</h2>
        <p>
          With our strategy crystallized and the team aligned, I knew it was time
          to immerse myself in the world that would shape our future UI: Material
          Design 3.
        </p>
        <h3>Why research comes next</h3>
        <p>
          Earlier conversations made one thing clear: Jetpack Compose and Material
          Design 3 weren’t just buzzwords; they were the building blocks for our
          revamp. But to lead this change confidently, I needed more than surface
          knowledge.
        </p>
        <h3>Immersing in Material Design 3</h3>
        <p>I began by asking:</p>
        <ul>
          <li>What’s truly different about Material You, beyond what we see on the surface?</li>
          <li>Which new tokens, color systems, and motion principles could best fit our context?</li>
          <li>How have real teams dealt with migration — what struggles, what payoffs?</li>
        </ul>
        <p>
          From official Google documentation to hands-on migration guides and case
          studies from companies who’d gone before us, my reading list grew.
        </p>
        <h3>Standout discoveries</h3>
        <ul>
          <li>
            <strong>Personalization is core:</strong> Material 3 puts user
            preference at the center. Dynamic color, adaptability, and expressive
            shapes offer a human touch.
          </li>
          <li>
            <strong>Tokens everywhere:</strong> color, spacing, and typography
            standardized via tokens, making them easy to update, scale, and
            maintain.
          </li>
          <li>
            <strong>Jetpack Compose synergy:</strong> Material 3 is deeply embedded
            in Compose, streamlining development and giving us access to the latest
            UI improvements out of the box.
          </li>
          <li>
            <strong>New components:</strong> large buttons, filled and outlined
            text fields, updated navigation bars — ready to use, and less to build
            from scratch.
          </li>
          <li>
            <strong>Accessibility and motion:</strong> improved legibility, motion
            that feels purposeful, and a design that’s flexible for every user.
          </li>
        </ul>
      </section>

      <section className="study-block">
        <h2>Material Design in SOTI Agents vs Material Design 3</h2>
        <Figure
          file="w8FnHdnTP5rTp723sUjcVgBbrVA"
          alt="Old SOTI Agents Material Design components versus Material Design 3"
          size={2048}
        />
        <p>Reading about Material 3 didn’t just teach me new rules, it inspired new questions:</p>
        <ul>
          <li>How can we keep our interface feeling “ours” while embracing platform conventions?</li>
          <li>How much do we leverage out-of-the-box vs. customizing for our brand voice?</li>
          <li>
            What are the practical hurdles (and hidden wins) of shifting both
            design and development teams to this new paradigm?
          </li>
        </ul>
      </section>

      <section className="study-block">
        <h2>Translating insights to action — the Figma expedition</h2>
        <Figure
          file="K7L5x0zwVBebdQFvNvYTTx4M"
          alt="Comic of the Figma workflow becoming tedious"
        />
        <blockquote>
          “After the second or third screen, what should’ve felt like design flow
          was turning into design drag.”
        </blockquote>
        <h3>The problem</h3>
        <p>
          For each new screen, I had to manually drag every single component from
          the Material Design UI kit. Updating colors and swapping in our custom
          icons wasn’t seamless. Every tweak, no matter how small, was eating into
          creative momentum.
        </p>
        <h3>Solution after decision</h3>
        <Figure
          file="ZwrupqZ0Xa4383WM23yVmUb8gPM"
          alt="Decision flowchart: bulk import versus a retroactive library"
          size={2048}
        />
        <p>
          I brought my challenge to my design manager and leads. After weighing
          both options, I chose the bulk-import approach. It felt more systematic
          and would, in theory, accelerate later work. The upfront investment would
          pay dividends as we scaled.
        </p>
      </section>

      <section className="study-block">
        <h2>The color naming conundrum</h2>
        <Figure
          file="uqSaMzyLol4dlfUZ1rqtYIrIv8w"
          alt="Comic of Material Design names versus Elevate tokens"
          size={2048}
        />
        <h3>The problem</h3>
        <p>
          Material’s color style names and our Elevate token naming were
          incompatible. “Surface,” “Primary,” “Secondary” — great in Material’s
          context, but mapping these to our Elevate tokens was a headache. Each
          component required mental translation.
        </p>
        <h3>The solution — Theme Builder spotlight</h3>
        <Figure
          file="LYBCdJMsdrf4oGW9PJ1tvrGHY"
          alt="Theme Builder workflow from manual mapping to automated bridging"
          size={2048}
        />
        <h3>The Resolution</h3>
        <p>
          I circled back to my leads, who recommended the Material Design Theme
          Builder plugin for Figma. This became my secret weapon. It helped bridge
          the gap, letting me map Material colors to our existing tokens. As I made
          transitions, I annotated each style, leaving breadcrumbs for the team to
          later rename and align everything perfectly with our token system.
        </p>
        <h3>Annotation examples</h3>
        <Figure
          file="luEeEZB1wHiXRvk6Rqzpcpq7yw"
          alt="Figma annotations mapping Theme Builder colors to Elevate tokens"
          size={2048}
        />
      </section>

      <section className="study-block">
        <h2>From manual styling to a token-driven system</h2>
        <p>
          Once the foundation was in place, the next step was to bring true
          consistency to the entire UI. This wasn’t about making things look the
          same, it was about making them behave as a system.
        </p>
        <p>
          I moved through the design file component by component, replacing one-off
          color styles with the color tokens I had created in Figma. To make this
          scalable, I aligned the token structure with Material Design Theming —
          every state, surface, text value, and accent mapped cleanly to a defined
          role instead of an arbitrary hex code.
        </p>
        <blockquote>
          “With tokens applied, the system started behaving like a system. Updating
          a primary color no longer meant hunting through frames, it meant
          adjusting a token and watching the UI respond predictably.”
        </blockquote>
        <div className="study-stats">
          <div>
            <strong>3</strong>
            <span>Products unified</span>
          </div>
          <div>
            <strong>1</strong>
            <span>Structured foundation</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>Token-driven system</span>
          </div>
        </div>
        <p>
          After tokens were applied, I brought every screen back into place, old
          and new, so we could see the transformation end to end. This wasn’t just
          a visual refresh. It created a shared baseline that helped Snap Agent
          move forward faster, and it unlocked reuse for Surf and MobiControl.
          Instead of designing three separate experiences, we could evolve one
          structured foundation and adapt it across products.
        </p>
      </section>

      <section className="study-block">
        <h2>Before &amp; after showcase</h2>
        <p>Next I tried comparing all the improvements done.</p>
        <Figure
          file="KlAPC1Loo0KtILZSq3aBIzqOE"
          alt="Old versus new list view for Rack Request"
          size={2048}
        />
        <Figure
          file="7RFBNJl3GggBNyDVOHTJfdUdVM"
          alt="Old versus new status filter selection"
          size={2048}
        />
        <Figure
          file="4hvikqhYVonQtrQs0hoDJN0HotQ"
          alt="Old versus new Track Request status placement"
          size={2048}
        />
        <h3>Old vs new</h3>
        <div className="study-split">
          <Figure
            file="1kZMQlayTOqmnmdsqVk1OhjE5t0"
            alt="Legacy Android agent interface"
          />
          <Figure
            file="vnM98DXdFlTXQONZKMuexnh82s"
            alt="Material 3 Android agent interface"
          />
        </div>
      </section>

      <section className="study-block">
        <h2>Measuring impact — early signals and future potential</h2>
        <p>
          The redesign is currently in development, but early indicators suggest
          we’re on track for meaningful transformation. While we await full
          implementation metrics, we can project the impact based on design system
          best practices and initial team feedback.
        </p>
        <Figure
          file="zlRFCIX2ooYnpACjVFc6OotmNw"
          alt="After screens of the Material 3 Android agent"
          size={2048}
        />
        <Figure
          file="MXCtqjOZAz1MXQYAy8VBzbBTdmI"
          alt="Before screens of the Android agent"
          size={2048}
        />
      </section>

      <section className="study-block">
        <h2>Conclusion — looking forward</h2>
        <Figure
          className="study-figure is-glow"
          file="ytVnNNmieXwVMD9D3weuv0KapY"
          alt="Journey from start to system transformation"
          size={2048}
        />
        <p>
          What began as a conversation about scattered icons and aging components
          evolved into a complete system transformation. But this isn’t just an
          ending, it’s a new beginning.
        </p>
        <h3>Key takeaways</h3>
        <Figure
          file="wzEmA1IRD7ZiWMGoFkkDnNsdI"
          alt="Four lessons from the Material 3 redesign"
          size={2048}
        />
        <p>
          Design isn’t just about choosing pretty colors and layouts. It’s
          navigating real, gritty moments: running into walls, looping back for
          help, and finding tools and people to clear the path forward. With this
          foundation in place, we’re not just maintaining a design system; we’re
          enabling faster iteration, consistent experiences, and a future where
          design and development move in harmony.
        </p>
        <CtaLink className="cta cta-lg" href="mailto:shristi278@gmail.com">
          Let’s talk
          <span aria-hidden="true">→</span>
        </CtaLink>
      </section>
    </main>
  );
}
