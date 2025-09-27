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
                            html: `<div style="background: #FF0000;" class='mark'>${i}</div>`,
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