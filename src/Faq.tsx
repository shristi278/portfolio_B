import { useEffect, useState, type ReactNode } from "react";

const items: { question: string; answer: ReactNode }[] = [
  {
    question: "Who are you?",
    answer: (
      <>
        <p>
          I’m Shristi, a Product Designer with{" "}
          <strong>4.7 years of experience</strong> designing digital products,
          with the last <strong>3 years at SOTI</strong>, a B2B technology
          company.
        </p>
        <p>
          I enjoy working on complex problems, making them easier to understand
          and turning them into experiences that feel simple for the people
          using them.
        </p>
      </>
    ),
  },
  {
    question: "What do you actually design?",
    answer: (
      <>
        <p>
          A bit of everything that comes with building a product: user flows,
          interaction design, information architecture, visual design, design
          systems and prototypes.
        </p>
        <p>
          Most of my work has been in B2B, so I’m quite comfortable designing
          for products where things can get complex very quickly.
        </p>
      </>
    ),
  },
  {
    question: "B2B? Isn’t that boring?",
    answer: (
      <>
        <p>Not really.</p>
        <p>
          B2B products often have some wonderfully complicated problems. There
          are multiple users, workflows, permissions, edge cases and a lot of
          information to make sense of.
        </p>
        <p>
          That complexity is actually what I enjoy. The challenge is figuring
          out how to make something powerful without making it feel
          overwhelming.
        </p>
      </>
    ),
  },
  {
    question: "What have you learned from 3 years at SOTI?",
    answer: (
      <>
        <p>
          That good product design isn’t just about making an interface easier
          to use.
        </p>
        <p>
          It’s also about understanding the business, technical constraints,
          user behaviour and all the little things that happen outside the
          happy path.
        </p>
        <p>
          Working in B2B has made me much more comfortable with complexity and
          collaboration.
        </p>
      </>
    ),
  },
  {
    question: "What kind of designer are you?",
    answer: (
      <>
        <p>
          I’d say I’m a <strong>problem-first designer</strong>.
        </p>
        <p>
          I like understanding the “why” before jumping into the “how”. I’m
          naturally curious, fairly detail-oriented and I enjoy exploring
          multiple directions before settling on one.
        </p>
      </>
    ),
  },
  {
    question: "What are you looking for next?",
    answer: (
      <>
        <p>
          A place where I can work on meaningful problems, collaborate closely
          with product and engineering and keep growing as a designer.
        </p>
        <p>
          I’m particularly interested in opportunities where design has a real
          seat at the table, not just a seat at the end of the process.
        </p>
      </>
    ),
  },
  {
    question: "Why should I email you?",
    answer: (
      <p>
        If you’re looking for someone who can handle complexity, work
        collaboratively and still care about the tiny details, we should
        probably talk.
      </p>
    ),
  },
  {
    question: "What’s the easiest way to reach you?",
    answer: <p>Email works. Coffee works too.</p>,
  },
];

function PlusIcon() {
  return (
    <>
      <span />
      <span />
    </>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const [showGirl, setShowGirl] = useState(
    () =>
      typeof window !== "undefined" &&
      !window.matchMedia("(max-width: 980px)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 980px)");
    const apply = () => setShowGirl(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <section className="wonder" id="wonder" aria-labelledby="wonder-heading">
      <div className="section-head">
        <h2 id="wonder-heading">
          Before you hit <span className="accent">“Email”</span>
        </h2>
        <p className="wonder-lede">A few things you might be wondering.</p>
      </div>
      <div className="wonder-body">
        {showGirl ? (
          <figure className="wonder-media">
            <img
              src="/wonder/girl.gif"
              alt=""
              width={400}
              height={600}
              decoding="async"
            />
          </figure>
        ) : null}
        <div className="wonder-list">
          {items.map((item, index) => {
            const isOpen = open === index;
            const answerId = `wonder-answer-${index}`;
            return (
              <div
                key={item.question}
                className={isOpen ? "wonder-item is-open" : "wonder-item"}
              >
                <div className="wonder-q-row">
                  <h3 className="wonder-q">{item.question}</h3>
                  <button
                    type="button"
                    className="wonder-plus"
                    aria-label={isOpen ? "Collapse answer" : "Expand answer"}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() =>
                      setOpen((current) => (current === index ? null : index))
                    }
                  >
                    <PlusIcon />
                  </button>
                </div>
                {isOpen ? (
                  <div className="wonder-answer" id={answerId}>
                    {item.answer}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
