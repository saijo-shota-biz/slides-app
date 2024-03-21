import {useCallback, useRef} from "react";
import {getReveal} from "~/utils/reveal.client";
import type {Api} from "reveal.js";

type Props = {
  url: string;
};
export const Reveal = ({ url }: Props) => {
  const deckDivRef = useRef<HTMLDivElement | null>(null); // reference to deck container div
  const deckRef = useRef<Api | null>(null); // reference to deck reveal instance

  const deckDivRefCallback = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      deckDivRef.current = node;
      deckRef.current = getReveal(node);
      deckRef.current.initialize().then(() => {
        // good place for event handlers and plugin setups
      });
    } else {
      try {
        if (deckRef.current) {
          deckRef.current.destroy();
          deckRef.current = null;
        }
      } catch (e) {
        console.warn("Reveal.js destroy call failed.");
      }
    }
  }, []);

  return (
    <div className="reveal" ref={deckDivRefCallback}>
      <div className="slides">
        <section
          data-markdown={url}
          data-separator="^---"
          data-separator-vertical="^--"
          data-separator-notes="^Note:"
        />
      </div>
    </div>
  );
};
