import { DesignSurface } from "@/components/design-surface";
import { markup } from "@/components/design/journey-markup";

export default function Home() {
  return <DesignSurface kind="journey" markup={markup} />;
}
