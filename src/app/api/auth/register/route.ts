import { connectToDatabase } from "@/lib/db"
import { User } from "@/models/User"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    await connectToDatabase()
    const body = await request.json()
    const { fullName, email, phone, password, municipality, ward } = body as any
    if (!fullName || !email || !phone || !password || !municipality || !ward) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 })
    }

    const existing = await User.findOne({ $or: [{ email }, { phone }] }).lean()
    if (existing) {
      return new Response(JSON.stringify({ message: "User already exists" }), { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    await User.create({
      fullName,
      email,
      phone,
      passwordHash,
      municipalityId: municipality,
      ward,
    })

    return new Response(JSON.stringify({ message: "Registered successfully" }), { status: 201 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 })
  }
}


