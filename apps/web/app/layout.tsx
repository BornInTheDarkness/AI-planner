import type { Metadata } from "next";

import "./styles.css";

export const metadata: Metadata = {
  title: "AI Home Modeler — дом начинается с вашего плана",
  description:
    "Путешествие по готовому интерьеру. Создайте проверяемый план, уточните размеры и сравните варианты своего дома.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
