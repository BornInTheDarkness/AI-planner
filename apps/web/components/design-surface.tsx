"use client";

import { useEffect, useRef } from "react";

type DesignKind = "journey" | "editor";
type DesignInitializer = (root: HTMLElement) => (() => void) | undefined;

declare global {
  interface Window {
    AIHomeJourney?: DesignInitializer;
    AIHomeEditor?: DesignInitializer;
  }
}

const scripts = new Map<string, Promise<void>>();

function loadScript(src: string) {
  const existing = scripts.get(src);
  if (existing) return existing;
  const promise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => {
      scripts.delete(src);
      script.remove();
      reject(new Error(`Unable to load ${src}`));
    };
    document.head.append(script);
  });
  scripts.set(src, promise);
  return promise;
}

/** Open Design markup is static; its isolated runtime owns the canvas and controls. */
export function DesignSurface({
  kind,
  markup,
}: {
  kind: DesignKind;
  markup: string;
}) {
  const surface = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;
    const root = surface.current!;
    async function initialize() {
      try {
        if (kind === "journey")
          await loadScript("/design/vendor/three-r146.min.js");
        await loadScript(`/design/${kind}.js`);
        if (cancelled) return;
        const initializer =
          kind === "journey" ? window.AIHomeJourney : window.AIHomeEditor;
        dispose = initializer?.(root);
      } catch {
        if (!cancelled) {
          root.classList.add("no-webgl");
          root
            .querySelector("[data-runtime-status]")
            ?.removeAttribute("hidden");
        }
      }
    }
    void initialize();
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [kind]);

  return (
    <div
      ref={surface}
      className={`design-surface ${kind}-root`}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
