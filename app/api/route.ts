import { readFileSync } from "fs"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    const bus = request.nextUrl.searchParams.get("bus")
    const huong = request.nextUrl.searchParams.get("huong") || 1
    let stop = readFileSync(`${process.cwd()}/bus-stop/bus_${bus}_${huong}.json`).toString()
    let lnglat = readFileSync(`${process.cwd()}/lnglat/lnglat_bus_${bus}_${huong}.json`).toString()

    return Response.json({
        stop: JSON.parse(stop),
        lnglat: JSON.parse(lnglat)
    })
}