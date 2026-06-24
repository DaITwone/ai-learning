"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
// import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Card */}
      <div className="w-full max-w-[400px]">
        {/* Logo */}

        {/* Form card */}
        <div className="bg-white border border-[#e5e5e5] rounded-2xl p-8 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col items-center mb-4">
            <h1 className="text-[22px] font-semibold text-[#0d0d0d] tracking-[-0.01em]">
              CHÀO MỪNG TRỞ LẠI 👋
            </h1>
            <p className="text-sm text-muted-foreground mb-3">
              Đăng nhập để tiếp tục sử dụng AI Learning Assistant
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <Input
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 bg-white border-[#d1d1d1] text-[#0d0d0d] placeholder:text-[#aaa] rounded-xl focus-visible:ring-1 focus-visible:ring-[#0d0d0d] focus-visible:border-[#0d0d0d] text-[14px] transition-all"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || !email}
              className="h-11 mt-1 bg-[#0d0d0d] hover:bg-[#1a1a1a] text-white font-semibold rounded-xl text-[14px] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Đang xử lý...
                </span>
              ) : (
                "Đăng nhập"
              )}
            </Button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <Separator className="flex-1 bg-[#e5e5e5]" />
            <span className="text-[12px] text-[#999] font-medium shrink-0">
              HOẶC
            </span>
            <Separator className="flex-1 bg-[#e5e5e5]" />
          </div>

          {/* Social buttons */}
          <div className="flex flex-col gap-2.5">
            <SocialButton
              icon={<FcGoogle className="w-5 h-5" />}
              label="Tiếp tục với Google"
            />

            {/* <SocialButton
              icon={<FaApple className="w-5 h-5" />}
              label="Tiếp tục với Apple"
            />

            <SocialButton
              icon={<FaFacebook className="w-5 h-5 text-blue-600" />}
              label="Tiếp tục với Facebook"
            /> */}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[15px] text-[#999] mt-4">
          Chưa có tài khoản?{" "}
          <a
            href="/signup"
            className="text-[#0d0d0d] hover:underline transition-colors font-bold"
          >
            Đăng Ký
          </a>
        </p>
      </div>
    </div>
  );
}

function SocialButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-3 h-11 w-full rounded-xl border border-[#d1d1d1] bg-white hover:bg-[#f7f7f7] text-[14px] font-medium text-[#0d0d0d] transition-all hover:border-[#bbb] active:scale-[0.99]"
    >
      {icon}
      {label}
    </button>
  );
}
