import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    const lng = parseFloat(request.nextUrl.searchParams.get("lng") || "0")
    const lat = parseFloat(request.nextUrl.searchParams.get("lat") || "0")

    var pa = `${lng - 0.005}/${lat - 0.004}/
        ${lng + 0.005}/${lat + 0.004}`;
    try {
        let json = await fetch(`http://apicms.ebms.vn/businfo/getstopsinbounds/${pa}`)
        let data = await json.json()
        return Response.json(data)
    } catch (error) {

    }
    return Response.json([])

}