'use client'
import { useState } from "react"
import { iBusStop } from "../map-leaflet/interface"
import { BusFront, FlagOff } from "lucide-react"

export default function BusStop(p: { map: L.Map, L: any }) {
    const [marks, setMarks] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    return (
        <>
            <button onClick={async () => {
                setLoading(true)
                const map = p.map
                const L = p.L
                const latlng = map.getCenter()
                try {
                    let json = await fetch(`/api/bus-stop?lat=${latlng.lat}&lng=${latlng.lng}`)
                    let data = await json.json() as iBusStop[]
                    let markstmp = []
                    for (let i = 0; i < data.length; i++) {
                        const e = data[i];
                        var customHtmlIcon = L.divIcon({
                            className: '',
                            html: `<div style="background: #FF0000;" class='mark'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6 2 7"/><path d="M10 6h4"/><path d="m22 7-2-1"/><rect width="16" height="16" x="4" y="3" rx="2"/><path d="M4 11h16"/><path d="M8 15h.01"/><path d="M16 15h.01"/><path d="M6 19v2"/><path d="M18 21v-2"/></svg></div>`,
                        });

                        let mark = new L.Marker([e.Lat, e.Lng], {
                            icon: customHtmlIcon
                        }).bindPopup(`${e.Name} ${e.Routes}`);
                        map.addLayer(mark)
                        markstmp.push(mark)
                    }
                    setMarks([...marks, ...markstmp])
                    setLoading(false)
                } catch (error) {

                }

            }} className={`${loading ? "opacity-20" : "opacity-100"} p-2 cursor-pointer`}>
                <BusFront />
            </button>
            <button onClick={async () => {
                const map = p.map
                marks.forEach((v) => {
                    map.removeLayer(v)
                })
                setMarks([])
            }} className="p-2 cursor-pointer">
                <FlagOff />
            </button>
        </>
    )
}