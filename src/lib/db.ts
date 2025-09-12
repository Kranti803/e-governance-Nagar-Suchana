import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI || ""

if (!MONGODB_URI) {
  console.warn("MONGODB_URI is not set. Set it in your environment to enable DB.")
}

let cached = (global as any).mongoose as { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

export const connectToDatabase = async () => {
  if (cached!.conn) return cached!.conn
  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGODB_URI)
  }
  cached!.conn = await cached!.promise
  return cached!.conn
}


