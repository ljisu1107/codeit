import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import Header from "@/app/header";

export const metadata: Metadata = {
  title: "Todo List - do it;",
  description: "할 일 목록을 관리하는 To Do 서비스",
};

const nanumSquare = localFont({
  src: './font/NanumSquare.woff',
  display: 'swap',
  variable: '--font-pretendard',
})



export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="kr"
      className={`${nanumSquare.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
