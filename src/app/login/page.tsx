"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import {
  loginWithCredentialsAction,
  loginWithGoogleAction,
} from "@/actions/auth.action";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Thêm state password
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Thêm state quản lý lỗi

  // Xử lý đăng nhập Credentials (Email/Password)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await loginWithCredentialsAction({ email, password });
      if (res?.error) {
        setError(res.error);
        setIsLoading(false);
      }
    } catch (error) {
      setError("Đã xảy ra lỗi không mong muốn.");
      setIsLoading(false);
    }
  };

  // Xử lý đăng nhập Google
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    // Không bọc try/catch ở đây nữa, để Next-Auth tự handle việc redirect
    await loginWithGoogleAction();

    // Lưu ý: Không đặt setIsLoading(false) ở đây, vì nếu thành công
    // trình duyệt sẽ chuyển trang luôn, nút vẫn giữ trạng thái loading là chuẩn UX nhất!
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Card */}
      <div className="w-full max-w-md">
        {" "}
        {/* Sửa từ max-w-100 thành max-w-md để hiển thị chuẩn */}
        {/* Form card */}
        <div className="bg-white border border-[#e5e5e5] rounded-2xl p-8 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-[22px] font-semibold text-[#0d0d0d] tracking-[-0.01em]">
              CHÀO MỪNG TRỞ LẠI 👋
            </h1>
            <p className="text-sm text-muted-foreground text-center mt-1">
              Đăng nhập để tiếp tục sử dụng AI Learning Assistant
            </p>
          </div>

          {/* Hiển thị lỗi nếu có */}
          {error && (
            <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Input Email */}
            <div className="flex flex-col gap-1.5">
              <Input
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="h-11 bg-white border-[#d1d1d1] text-[#0d0d0d] placeholder:text-[#aaa] rounded-xl focus-visible:ring-1 focus-visible:ring-[#0d0d0d] focus-visible:border-[#0d0d0d] text-[14px] transition-all"
              />
            </div>

            {/* Input Password */}
            <div className="flex flex-col gap-1.5">
              <Input
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="h-11 bg-white border-[#d1d1d1] text-[#0d0d0d] placeholder:text-[#aaa] rounded-xl focus-visible:ring-1 focus-visible:ring-[#0d0d0d] focus-visible:border-[#0d0d0d] text-[14px] transition-all"
              />
            </div>

            {/* Nút Đăng Nhập */}
            <Button
              type="submit"
              disabled={isLoading || !email || !password}
              className="h-11 mt-1 bg-[#0d0d0d] hover:bg-[#1a1a1a] text-white font-semibold rounded-xl text-[14px] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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
              onClick={handleGoogleLogin}
              disabled={isLoading}
            />
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

interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

function SocialButton({ icon, label, onClick, disabled }: SocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center gap-3 h-11 w-full rounded-xl border border-[#d1d1d1] bg-white hover:bg-[#f7f7f7] text-[14px] font-medium text-[#0d0d0d] transition-all hover:border-[#bbb] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {icon}
      {label}
    </button>
  );
}
