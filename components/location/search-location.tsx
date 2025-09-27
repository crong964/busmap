import { Search } from "lucide-react";
import BusStop from "./bus-stop";
import { useState } from "react";

export default function SearchLocation(p: { map: L.Map, L: any }) {
    const [mark, setMark] = useState<L.Marker | undefined>(undefined)
    const SearchLocation = (params: string) => {
        var s = params.replace(" ", "").split(",");
        if (s.length < 2) {
            return;
        }
        const map = p.map
        const L = p.L

        if (mark) {
            map.removeLayer(mark)
        }

        const markTmp = new L.Marker([parseFloat(s[0]), parseFloat(s[1])]);

        map.addLayer(markTmp);
        setMark(markTmp)
    }
    return (
        <div className="fixed top-0 flex items-center  z-9999">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    var target = e.target as any;

                    SearchLocation(target.loca?.value);
                }}
                className="  flex bg-white  rounded-xl items-center mb-2"
            >
                <input
                    type="text"
                    name="loca"
                    placeholder="10.8034, 106.65"
                    className="focus:outline-none flex-1 p-2 rounded-l-xl text-2xl w-[200px] "
                />
                <button
                    type="submit"
                    className=" rounded-r-xl hover:bg-blue-500 h-full flex items-center p-2"
                >
                    <Search />
                </button>
                <BusStop {...p}></BusStop>
            </form>

        </div >
    )
}