import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    })
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
    }).max(255),
    username: z.string({
        message: "Username must contain at least 3 characters",
    }).min(3).max(50),
    password: z.string({
        message: "Password must contain at least 8 characters",
    }).min(8).max(100)
})