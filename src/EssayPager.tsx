import { CtaLink } from "./CtaLink";
import { essays } from "./data";

export function EssayPager({ slug }: { slug: string }) {
  const index = essays.findIndex((item) => item.slug === slug);
  const prev = index > 0 ? essays[index - 1] : undefined;
  const next = index >= 0 && index < essays.length - 1 ? essays[index + 1] : undefined;

  if (!prev && !next) return null;

  return (
    <nav className="essay-pager" aria-label="More writing">
      {prev ? (
        <CtaLink className="cta essay-pager-link" href={prev.slug}>
          <span aria-hidden="true">←</span>
          {" "}
          {prev.title}
        </CtaLink>
      ) : (
        <span className="essay-pager-spacer" />
      )}
      {next ? (
        <CtaLink className="cta essay-pager-link is-next" href={next.slug}>
          {next.title}
          {" "}
          <span aria-hidden="true">→</span>
        </CtaLink>
      ) : (
        <span className="essay-pager-spacer" />
      )}
    </nav>
  );
}
