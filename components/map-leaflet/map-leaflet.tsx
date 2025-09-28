'use client'

import { useEffect, useRef, useState } from "react";
import { iLatLng } from "./interface";
import { toast } from "react-toastify";
import BusSelect from "../bus-select/bus-select";
import LocationWatch from "../location/watch-location";

export default function MapLeafLet() {
    const refmap = useRef<any>(null)
    const [map, setMap] = useState<L.Map | undefined>()
    const [l, setL] = useState<any>()
    useEffect(() => {
        const f = async () => {

            const L = await import("leaflet")

            setL(L)

            let mark: L.Marker = new L.Marker([10.906132709550574,
                106.8849634786165], {
                alt: "vị trí của bạn", draggable: true,
            });


            mark.on("dragend", (ev) => {

            })
            const map = L.map('maps').setView([10.906132709550574,
                106.8849634786165], 13);
            const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            setMap(map)
        }
        f()
        return () => {

        };
    }, []);
    return (
        <>
            <div id="maps" ref={refmap} className="h-screen w-screen">

            </div>
            {
                map ?
                    <>
                        <BusSelect map={map} L={l} /> <LocationWatch map={map} L={l} />
                    </> : <></>
            }

        </>
    )
}