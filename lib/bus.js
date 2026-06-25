const bus = require("./bus.json")

const fs = require("fs")

async function getRouteVarId() {
    let newbus1 = []
    for (let i = 0; i < bus.length; i++) {
        const e = bus[i];
        const point1 = `./bus-stop/bus_${e.bus}_${1}.json`
        const point2 = `./bus-stop/bus_${e.bus}_${2}.json`
        const lnglat1 = `./lnglat/lnglat_bus_${e.bus}_${1}.json`
        const lnglat2 = `./lnglat/lnglat_bus_${e.bus}_${2}.json`
        if (!isEmpty(point1) && !isEmpty(point2) && !isEmpty(lnglat1) && !isEmpty(lnglat2)) {
            continue
        }
        try {
            console.log(e.bus);

            let json = await fetch(`https://apicms.ebms.vn/businfo/getvarsbyroute/${e.id}`)
            let data = await json.json()
            let f = data.map((v) => {
                return v.RouteVarId
            })
            newbus1.push({ ...e, RouteVarId: f })

        } catch (error) {
            console.log(e.bus);
        }
    }

    fs.writeFileSync("./newbus.json", JSON.stringify(newbus1))
}

function isEmpty(path) {

    if (!fs.existsSync(path)) {
        return true
    }
    let data = fs.readFileSync(path).toString()
    return JSON.parse(data).length == 0
}

function busStop(bus, id, huong, routeVarId) {
    const path = `./bus-stop/bus_${bus}_${huong}.json`
    if (routeVarId == null) {
        return
    }
    if (!isEmpty(path)) {
        return
    }
    fetch(`https://apicms.ebms.vn/businfo/getstopsbyvar/${id}/${routeVarId}`)
        .then((v) => {
            return v.json()
        }).then((v) => {
            fs.writeFileSync(path, JSON.stringify(v))
        })
        .catch((v) => {
            console.log(`lỗi lấy chạm::::::::::: ${bus} ${huong}`);
        })
}

function busLngLat(bus, id, huong, routeVarId) {
    const path = `./lnglat/lnglat_bus_${bus}_${huong}.json`
    if (!isEmpty(path)) {
        return
    }
    if (routeVarId == null) {
        return
    }
    fetch(`https://apicms.ebms.vn/businfo/getpathsbyvar/${id}/${routeVarId}`)
        .then((v) => {
            return v.json()
        }).then((v) => {
            fs.writeFileSync(path, JSON.stringify(v))
        })
        .catch((v) => {
            console.log(`lỗi lấy điêm::::::::::: ${bus} ${huong}`);

        })
}


async function main() {
    if (!fs.existsSync('lnglat')) {
        fs.mkdirSync('lnglat');
    }

    if (!fs.existsSync('bus-stop')) {
        fs.mkdirSync('bus-stop');
    }

    await getRouteVarId()
    const newbus = require("./newbus.json")

    newbus.forEach(element => {

        busStop(element.bus, element.id, 1, element.RouteVarId[0])
        busStop(element.bus, element.id, 2, element.RouteVarId[1])
    });
    newbus.forEach(element => {
        busLngLat(element.bus, element.id, 1, element.RouteVarId[0])
        busLngLat(element.bus, element.id, 2, element.RouteVarId[1])
    });

}

main()