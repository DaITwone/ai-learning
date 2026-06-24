// src/actions/auth.actions.ts
"use server"

import { prisma } from "@/lib/prisma"
import { signIn } from "@/auth"
import bcrypt from "bcryptjs"
import { AuthError } from "next-auth"

export type SignupState = {
  error?: string
  success?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loginWithCredentialsAction(values: any) {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirectTo: "/", // Hoặc trang bạn muốn chuyển hướng đến
    })
    return { success: true }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email hoặc mật khẩu không chính xác." }
        default:
          return { error: "Đã xảy ra lỗi hệ thống khi đăng nhập." }
      }
    }
    throw error // Bắt buộc phải throw error để Next.js handle redirect
  }
}

export async function loginWithGoogleAction() {
  await signIn("google", { redirectTo: "/" })
}

export async function signupAction(
  email: string,
  name: string,
  password: string
): Promise<SignupState> {
  // 1. Validate
  if (!email || !name || !password) {
    return { error: "Vui lòng điền đầy đủ thông tin." }
  }

  if (password.length < 8) {
    return { error: "Mật khẩu tối thiểu 8 ký tự." }
  }

  // 2. Check email tồn tại chưa
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return { error: "Email này đã được sử dụng." }
  }

  // 3. Hash password
  const hashed = await bcrypt.hash(password, 12)

  // 4. Tạo user
  await prisma.user.create({
    data: { email, name, password: hashed },
  })

  // 5. Tự động đăng nhập sau khi tạo xong
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    return { success: true }
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Tạo tài khoản thành công nhưng đăng nhập thất bại." }
    }
    throw error
  }
}

