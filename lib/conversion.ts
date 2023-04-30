import { Dispatch, SetStateAction } from "react"

export interface ResultProps {
    canonicalKph: number
}

export interface MinutesPerKm {
    min: number | null
    sec: number | null
}

export interface DistanceTime {
    min: number | null
    sec: number | null
    distance: number | null
}

export interface MinutesPerMile {
    min: number
    sec: number
}

export interface DistanceInYardsTime {
    min: number
    sec: number
    distance: number
}

const KphMphRatio = 1.60934
const YardsPerMile = 1760

export const fromKph = (kph: number): number => kph 

export const fromMinutesPerKm = (minPerKm: MinutesPerKm): number => {
    const min = minPerKm.min !== null ? minPerKm.min : 0
    const sec = minPerKm.sec !== null ? minPerKm.sec : 0
    const totalSec = min * 60 + sec
    if (!totalSec) {
        return 0
    } else {
        return (3600 / totalSec)
    }
}

export const fromDistanceTime = (minutesPerMeters: DistanceTime): number => {
    const min = minutesPerMeters.min !== null ? minutesPerMeters.min : 0
    const sec = minutesPerMeters.sec !== null ? minutesPerMeters.sec : 0
    const totalSec = min * 60 + sec
    if (!minutesPerMeters.distance || !totalSec) {
        return 0;
    }
    const distanceInKm = minutesPerMeters.distance / 1000
    return (3600 / totalSec) * distanceInKm
}

export const fromMph = (mph: number): number => mph * KphMphRatio

export const fromMinutesPerMile = (minPerMile: MinutesPerMile): number => {
    const sec = minPerMile.min * 60 + minPerMile.sec
    if (!sec) {
        return 0
    } else {
        return (3600 / sec) * KphMphRatio
    }
}

export const fromDistanceInYardsTime = (minutesPerYards: DistanceInYardsTime): number => {
    const sec = minutesPerYards.min * 60 + minutesPerYards.sec
    if (!minutesPerYards.distance || !sec) {
        return 0;
    }
    const distanceInMiles = minutesPerYards.distance / YardsPerMile
    return (3600 / sec) * distanceInMiles * KphMphRatio
}

export const toKph = (canonicalKph: number): number => +canonicalKph.toFixed(1)

export const toMinutesPerKm = (kph: number): MinutesPerKm | undefined => {
    if (!kph) {
        return undefined
    }
    const secPerKm = 3600 / kph
    return {
        min: Math.floor(secPerKm / 60),
        sec: +(secPerKm % 60).toFixed(0),
    }
}

export const toDistanceTime = (kph: number, distance: number | null): DistanceTime | undefined => {
    if (!kph || !distance) {
        return undefined
    }
    const secPerDistance = (3600 / kph) * (distance / 1000)
    const secPrecision = distance < 500 ? 1 : 0; 
    return {
        min: Math.floor(secPerDistance / 60),
        sec: +(secPerDistance % 60).toFixed(secPrecision),
        distance
    }
}

export const toMph = (canonicalKph: number): number => canonicalKph / KphMphRatio

export const toMinutesPerMile = (kph: number): MinutesPerMile => {
    const secPerMile = (3600 / kph) * KphMphRatio
    return {
        min: Math.floor(secPerMile / 60),
        sec: +(secPerMile % 60).toFixed(0),
    }
}

export const toDistanceInYardsTime = (kph: number, distance: number): DistanceInYardsTime => {
    const mph = kph / KphMphRatio
    const secPerDistance = (2.04545455 / mph) * distance
    return {
        min: Math.floor(secPerDistance / 60),
        sec: +(secPerDistance % 60).toFixed(0),
        distance
    }
}
