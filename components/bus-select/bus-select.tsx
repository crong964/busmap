import { useCallback, useEffect, useMemo, useState } from "react"
import { iBusStop, iLatLng, iLatLngRes } from "../map-leaflet/interface";
import { latLng, Layer } from "leaflet";
import { toast } from "react-toastify";
import SearchLocation from "../location/search-location";

export default function BusSelect(p: { map: L.Map, L: any }) {
    const [bus, setBus] = useState<string[]>([])

    const [layers, setLayers] = useState<{ [key: string]: { data: Layer, c: string } | undefined }>({})
    const [n, setN] = useState(0)
    const color = ["#FF0000", "#0000FF", "#00FF00", "#FFA500", "#FFC0CB", "#800080", "#808080", "#A52A2A", "#000080", "#00FFFF", "#FFB6C1", "#4682B4"];
    useEffect(() => {
        fetch("/api/bus")
            .then((v) => {
                return v.json()
            })
            .then((v) => {
                setBus(v)
            })
        return () => {

        };
    }, []);
    const handle = (bus: string, route: string) => {
        fetch(`/api?bus=${bus}&huong=${route || 1}`)
            .then((v) => {
                return v.json()
            }).then(async (v) => {
                let data: { stop: iBusStop, lnglat: iLatLngRes } = v
                if (data?.lnglat == undefined) {
                    toast.error("không thể gọi dữ liệu")
                    return
                }
                let lnglat = data.lnglat
                const L = p.L;
                const coordinates = [...lnglat.lng.map((v, i) => {
                    return [v, lnglat.lat[i]]
                })]
                var myLines = [{
                    "type": "LineString",
                    "coordinates": coordinates
                }] as any
                var c = color[n % color.length]
                var myStyle = {
                    "color": c,
                    "weight": 5,
                    "opacity": 1
                };
                let f = L.geoJSON(myLines, {
                    style: myStyle
                }).addTo(p.map)
                p.map.setView([lnglat.lat[0], lnglat.lng[0]])
                var customHtmlIcon = L.divIcon({
                    className: '',
                    html: `<div style="background: ${c};" class='mark'>${bus}</div>`,
                });
                let mark = new L.Marker([lnglat.lat[0], lnglat.lng[0]], {
                    icon: customHtmlIcon
                })
                p.map.addLayer(mark)
                setLayers({ ...layers, [bus + route]: { c: c, data: f }, ["mark" + bus + route]: { c: c, data: mark } })
                setN(n => n + 1);
            })
    }

    return (
        <>

            <SearchLocation {...p} />
            <div className="fixed top-20 z-9999 left-0  p-1  ">
                <div className="flex max-lg:w-20 space-x-2 max-lg:flex-col space-x-1  mt-2.5 ">

                </div>
                <button onClick={() => {
                    setLayers({})
                    setN(0)

                    for (const key in layers) {
                        const element = layers[key];
                        console.log(element?.c);

                        if (element) {
                            p.map.removeLayer(element.data)
                        }

                    }
                }} className="text-white max-lg:w-20 text-sm rounded-2xl shadow-2xl  bg-blue-500 hover:bg-blue-300 font-bold cursor-pointer py-2 my-2">Xóa toàn bộ</button>
            </div>
            <div className="fixed w-full bottom-0  z-9999 ">
                <div className=" flex max-lg:flex-col lg:justify-around space-x-1 bg-white">
                    <div className="">
                        <div className=" ">lượt đi</div>
                        <div className="lg:w-100  overflow-x-auto">
                            <div className="flex space-x-2 w-max">
                                {
                                    bus.map((v, i) => {
                                        return (
                                            <button onClick={() => {
                                                if (layers[v + 1] == undefined) {
                                                    handle(v, 1 + "")
                                                    return
                                                }
                                                const map = p.map
                                                const layer = layers[v + 1]?.data
                                                const mark = layers["mark" + v + 1]?.data
                                                if (layer && mark) {
                                                    map.removeLayer(layer)
                                                    map.removeLayer(mark)
                                                }
                                                setLayers({ ...layers, [v + 1]: undefined })
                                            }} style={{ backgroundColor: layers[v + 1]?.c }}
                                                className=" text-white rounded-2xl shadow-2xl w-max bg-blue-500 hover:bg-blue-300 font-bold cursor-pointer px-4 py-2"
                                                key={v}>
                                                {v}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="sticky  bg-white">lượt về</div>
                        <div className="lg:w-100  overflow-x-auto">
                            <div className="flex space-x-2 w-max">
                                {
                                    bus
                                        .map((v, i) => {
                                            return (
                                                <button onClick={() => {
                                                    const map = p.map
                                                    if (layers[v + 2] == undefined) {
                                                        handle(v, "2")
                                                        return
                                                    }
                                                    const layer = layers[v + 2]?.data
                                                    const mark = layers["mark" + v + 2]?.data
                                                    if (layer && mark) {
                                                        map.removeLayer(layer)
                                                        map.removeLayer(mark)
                                                    }
                                                    setLayers({ ...layers, [v + 2]: undefined })
                                                }} style={{ backgroundColor: layers[v + 2]?.c }} className={` text-white rounded-2xl shadow-2xl   bg-blue-500 hover:bg-blue-300 font-bold cursor-pointer px-4 py-2`}
                                                    key={v}>
                                                    {v}
                                                </button>
                                            )
                                        })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}