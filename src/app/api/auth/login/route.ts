import { connectToDatabase } from "@/lib/db"
import { User } from "@/models/User"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    await connectToDatabase()
    const body = await request.json()
    const { identifier, password } = body as any
    if (!identifier || !password) {
      return new Response(JSON.stringify({ message: "Missing credentials" }), { status: 400 })
    }

    const user = await User.findOne({ $or: [{ email: identifier }, { phone: identifier }] })
    if (!user) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 })
    }

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 })
    }

    return new Response(JSON.stringify({ message: "Login successful", user: { id: user._id, fullName: user.fullName } }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 })
  }
}


