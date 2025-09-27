import L from "leaflet"

export interface iLatLng {
    lat: number,
    lng: number
}

export interface iBusStop {
    StopId: number,
    Code: string,
    Name: string,
    StopType: string,
    Zone: string,
    Ward: string,
    AddressNo: string,
    Street: string,
    SupportDisability: string,
    Status: string,
    Lng: number,
    Lat: number,
    Search: string,
    Routes: string
}

export interface iLatLngRes {
    lat: number[],
    lng: number[]
}
