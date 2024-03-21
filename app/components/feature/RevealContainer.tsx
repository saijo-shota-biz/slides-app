import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export const RevealContainer = ({ children }: { children: ReactNode }) => {
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const refCallback = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      ref.current = node;
      setHeight(node.clientWidth * 0.5625);
    } else {
      ref.current = null;
      setHeight(0);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setHeight(ref.current.clientWidth * 0.5625);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ height: `${height}px` }} ref={refCallback}>
      {children}
    </div>
  );
};
