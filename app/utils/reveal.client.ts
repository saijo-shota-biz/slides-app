import Reveal from "reveal.js";
import RevealHighlight from "reveal.js/plugin/highlight/highlight";
import RevealMarkdown from "reveal.js/plugin/markdown/markdown";
import RevealNotes from "reveal.js/plugin/notes/notes";

export const getReveal = (ref: HTMLDivElement) => {
  return new Reveal(ref, {
    transition: "slide",
    embedded: true,
    showNotes: true,
    plugins: [RevealMarkdown, RevealHighlight, RevealNotes],
  });
};
