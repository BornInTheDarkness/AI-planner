import type { Metadata } from "next";

import "./styles.css";

export const metadata: Metadata = {
  title: "AI Home Modeler — прототип",
  description: "Проверяемый прототип основного сценария AI Home Modeler",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
