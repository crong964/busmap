import { existsSync, readFileSync } from "fs"
import { NextRequest, NextResponse } from "next/server"
import path from "path"

export async function GET(request: NextRequest) {
    const bus = request.nextUrl.searchParams.get("bus")
    const huong = request.nextUrl.searchParams.get("huong") || 1
    const busstopPath = path.resolve(process.cwd(), "bus-stop", `bus_${bus}_${huong}.json`)
    const lnglatPath = path.resolve(process.cwd(), "lnglat", `lnglat_bus_${bus}_${huong}.json`)

    
    let stop = readFileSync(busstopPath).toString()
    let lnglat = readFileSync(lnglatPath).toString()

    return Response.json({
        stop: JSON.parse(stop),
        lnglat: JSON.parse(lnglat)
    })
}