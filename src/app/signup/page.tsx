"use client";

import { useState } from "react";
import { ChevronLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
// import { FaApple, FaFacebook } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type Step = "email" | "name" | "password";

const STEPS: Step[] = ["email", "name", "password"];

export default function SignupPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const getStrength = (pw: string) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const strength = getStrength(password);
  const strengthLabel = ["", "Yếu", "Trung bình", "Khá", "Mạnh"][strength];
  const strengthColor = ["", "#ef4444", "#f97316", "#eab308", "#22c55e"][
    strength
  ];

  const inputClass =
    "h-11 bg-white border-[#d1d1d1] text-[#0d0d0d] placeholder:text-[#aaa] rounded-xl focus-visible:ring-1 focus-visible:ring-[#0d0d0d] focus-visible:border-[#0d0d0d] text-[14px] transition-all";

  const submitClass =
    "h-11 mt-1 bg-[#0d0d0d] hover:bg-[#1a1a1a] text-white font-semibold rounded-xl text-[14px] disabled:opacity-30 disabled:cursor-not-allowed transition-all";

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        {/* Card */}
        <div className="bg-white border border-[#e5e5e5] rounded-2xl p-8 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-[24px] font-semibold text-[#0d0d0d] tracking-[-0.01em]">
              TẠO TÀI KHOẢN
            </h1>
          </div>
          {/* Step indicator */}
          <div className="flex gap-1.5 mb-6">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className="h-1 flex-1 rounded-full transition-all duration-300"
                style={{
                  background: STEPS.indexOf(step) >= i ? "#0d0d0d" : "#e5e5e5",
                }}
              />
            ))}
          </div>

          {/* Step 1 — Email */}
          {step === "email" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setStep("name");
              }}
              className="flex flex-col gap-3"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-[14.5px] font-bold text-[#111]">
                  Địa chỉ email
                </label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  className={inputClass}
                />
              </div>

              <Button type="submit" disabled={!email} className={submitClass}>
                Tiếp tục
              </Button>

              <div className="flex items-center gap-3 my-2">
                <Separator className="flex-1 bg-[#e5e5e5]" />
                <span className="text-[12px] text-[#999] font-medium shrink-0">
                  HOẶC
                </span>
                <Separator className="flex-1 bg-[#e5e5e5]" />
              </div>

              <div className="flex flex-col gap-2.5">
                <SocialButton
                  icon={<FcGoogle size={18} />}
                  label="Đăng ký với Google"
                />
                {/* <SocialButton
                  icon={<FaApple size={18} />}
                  label="Đăng ký với Apple"
                />
                <SocialButton
                  icon={<FaFacebook size={18} color="#1877F2" />}
                  label="Đăng ký với Facebook"
                /> */}
              </div>
            </form>
          )}

          {/* Step 2 — Name */}
          {step === "name" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (name.trim()) setStep("password");
              }}
              className="flex flex-col gap-3"
            >
              <BackButton onClick={() => setStep("email")} />

              <div className="flex flex-col gap-1.5">
                <label className="text-[14.5px] font-bold text-[#111]">
                  Họ và tên
                </label>
                <Input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoFocus
                  className={inputClass}
                />
                <p className="text-[12px] text-[#999]">
                  Tên sẽ hiển thị trong tài khoản của bạn.
                </p>
              </div>

              <Button
                type="submit"
                disabled={!name.trim()}
                className={submitClass}
              >
                Tiếp tục
              </Button>
            </form>
          )}

          {/* Step 3 — Password */}
          {step === "password" && (
            <form
              onSubmit={handlePasswordSubmit}
              className="flex flex-col gap-3"
            >
              <BackButton onClick={() => setStep("name")} />

              <div className="flex flex-col gap-1.5">
                <label className="text-[14.5px] font-bold text-[#111]">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Tối thiểu 8 ký tự"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoFocus
                    minLength={8}
                    className={`${inputClass} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#555] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {password.length > 0 && (
                  <div className="flex flex-col gap-1.5 mt-0.5">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-1 flex-1 rounded-full transition-all duration-300"
                          style={{
                            background:
                              i <= strength ? strengthColor : "#e5e5e5",
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-[12px]" style={{ color: strengthColor }}>
                      Độ mạnh: {strengthLabel}
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-[#f7f7f7] rounded-xl px-4 py-3 flex flex-col gap-0.5 text-[13px] text-[#555]">
                <span className="text-[#999] text-[11px] font-medium uppercase tracking-wide mb-0.5">
                  Tóm tắt
                </span>
                <span>
                  <span className="text-[#0d0d0d] font-medium">Email:</span>{" "}
                  {email}
                </span>
                <span>
                  <span className="text-[#0d0d0d] font-medium">Tên:</span>{" "}
                  {name}
                </span>
              </div>

              <Button
                type="submit"
                disabled={isLoading || password.length < 8}
                className={submitClass}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang tạo tài khoản...
                  </span>
                ) : (
                  "Tạo tài khoản"
                )}
              </Button>

              <p className="text-[11px] text-[#aaa] text-center leading-relaxed">
                Đồng ý với{" "}
                <a
                  href="#"
                  className="text-[#555] hover:text-[#0d0d0d] underline transition-colors"
                >
                  Điều khoản dịch vụ
                </a>{" "}
                và{" "}
                <a
                  href="#"
                  className="text-[#555] hover:text-[#0d0d0d] underline transition-colors"
                >
                  Chính sách bảo mật
                </a>
                .
              </p>
            </form>
          )}
        </div>

        <p className="text-center text-[15px] text-[#999] mt-4">
          Đã có tài khoản?{" "}
          <a
            href="/login"
            className="text-[#0d0d0d] hover:underline font-bold transition-colors"
          >
            Đăng nhập
          </a>
        </p>
      </div>
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1 text-[13px] text-[#666] hover:text-[#0d0d0d] transition-colors mb-1 w-fit"
    >
      <ChevronLeft className="w-4 h-4" />
      Quay lại
    </button>
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
