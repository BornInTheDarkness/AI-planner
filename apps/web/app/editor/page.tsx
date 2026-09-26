import type { Metadata } from "next";
import { DesignSurface } from "@/components/design-surface";
import { markup } from "@/components/design/editor-markup";

export const metadata: Metadata = { title: "Редактор плана — AI Home Modeler" };

export default function Editor() {
  return <DesignSurface kind="editor" markup={markup} />;
}
