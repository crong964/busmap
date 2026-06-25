const fs = require("fs")


let dir = fs.readdirSync("./bus-stop")
var stop = new Map()
var stopArray = []
for (let i = 0; i < dir.length; i++) {
	const file = `./bus-stop/${dir[i]}`;
	let data = JSON.parse(fs.readFileSync(file).toString())

	for (let j = 0; j < data.length; j++) {
		const e = data[j];
		if (!stop.has(e.StopId)) {
			stop.set(e.StopId, e)
			stopArray.push(e)
		}
		//"StopId": 7686,
		//  "Code": "SWB1_11",
		//  "Name": "Ga tàu thuỷ Linh Đông",
		//  "StopType": "Trạm tạm",
		//  "Zone": "TP. Thủ Đức - KV3",
		//  "Ward": "Phường Linh Đông",
		//  "AddressNo": "Bến tàu thuỷ Linh Đông",
		//  "Street": "Đường số 36",
		//  "SupportDisability": "Có",
		//  "Status": "Chưa khai thác",
		//  "Lng": 106.746254,
		//  "Lat": 10.835287,
		//  "Search": "GttLD BttLD Ds36",
		//  "Routes": "SWB1"
	}

}


fs.writeFileSync("./stop.json", JSON.stringify(stopArray))