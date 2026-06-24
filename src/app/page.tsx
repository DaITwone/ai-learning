import Image from "next/image";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { TypingAnimation } from "@/components/ui/typing-animation";

export default function Home() {
  return (
    <main
      className="flex min-h-screen items-center justify-center px-6 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/Background.png')",
      }}
    >
      <div className="flex max-w-2xl flex-col items-center text-center">
        <Image
          src="/Logo.png"
          alt="AI Learning Assistant"
          width={280}
          height={280}
          priority
          className=""
        />

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-purple-950/85 drop-shadow-sm">
          Your All-in-One Platform for Learning, Practice, and Discovery{" "}
        </h1>

        <TypingAnimation
          duration={30}
          className="mt-4 max-w-xl text-muted-foreground text-lg"
        >
          Trò chuyện cùng AI, khám phá kiến thức mới, luyện tập với các bài quiz
          tương tác và nâng cao hiệu quả học tập trong một nền tảng duy nhất.
        </TypingAnimation>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="h-12 px-6 rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            asChild
          >
            <Link href="/login">Đăng nhập</Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="h-12 px-6 rounded-xl text-base font-semibold border-2 hover:bg-muted hover:-translate-y-1 transition-all duration-300"
            asChild
          >
            <Link href="/signup">Đăng ký</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
