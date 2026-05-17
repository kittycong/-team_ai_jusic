import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "AI Market Command Center",
  description: "기관형 리서치 워크플로우를 개인용으로 재구성한 시장 분석 플랫폼"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
