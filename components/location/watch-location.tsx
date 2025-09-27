'use client'
import { Locate, LocateFixed } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const LocationWatch = (p: { map: L.Map, L: any }) => {
    var [mark, setMark] = useState<L.Marker | undefined>(undefined)

    const handle = () => {
        const L = p.L
        const map = p.map

        navigator.geolocation.watchPosition((position) => {
            const v = position.coords
            if (mark != undefined) {

                mark.setLatLng([v.latitude, v.longitude])
            } else {
                mark = new L.Marker([v.latitude, v.longitude], {
                    alt: "vị trí của bạn", draggable: true,
                });
                map.addLayer(mark as any)
                setMark(mark)
                map.setView([v.latitude, v.longitude], 20);
                
            }

        }, (err) => {
            
            // switch (err.code) {
            //     case 1:
            //         toast.error("Bạn chưa cấp quyền");
            //         break;
            //     case 2:
            //         toast.error("Không thể lấy được vị trí");
            //         break;
            //     case 3:
            //         toast.error("Qua thời gian");
            //         break;
            // }
        });
    }

    return (
        <button onClick={() => {
            if (!mark) {
                handle()
                return
            }
            setMark(undefined)
            p.map.removeLayer(mark)
            mark = undefined

        }} className="fixed bg-white p-2 rounded-full right-0 top-0 z-999 ">
            {
                mark ?
                    <LocateFixed /> : <Locate />
            }

        </button>
    )
}

export default LocationWatch