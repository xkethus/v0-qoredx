import { NextResponse } from "next/server"
import setupSupabase from "@/scripts/setup-supabase"

export async function GET() {
  try {
    const result = await setupSupabase()

    if (result.success) {
      return NextResponse.json({ success: true, message: result.message })
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error("Error al configurar la base de datos:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}
