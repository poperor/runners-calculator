import { Dispatch, SetStateAction } from "react"

export interface ResultProps {
    canonicalKph: number
}

export interface MinutesPerKm {
    min: string | null
    sec: string | null
}

export interface DistanceTime {
    hrs: string | null
    min: string | null
    sec: string | null
    distance: string | null
}

export interface MinutesPerMile {
    min: string | null
    sec: string | null
}

export interface DistanceInYardsTime {
    min: number
    sec: number
    distance: number
}

const KphMphRatio = 1.609344
const YardsPerMile = 1760

export const fromKph = (kph: number): number => kph 

export const fromMinutesPerKm = (minPerKm: MinutesPerKm): number => {
    const min = minPerKm.min !== null ? minPerKm.min : 0
    const sec = minPerKm.sec !== null ? minPerKm.sec : 0
    const totalSec = Number(min) * 60 + Number(sec)
    if (!totalSec) {
        return 0
    } else {
        return (3600 / totalSec)
    }
}

export const fromDistanceTime = (distanceTime: DistanceTime): number => {
    const hrs = distanceTime.hrs !== null ? distanceTime.hrs : 0
    const min = distanceTime.min !== null ? distanceTime.min : 0
    const sec = distanceTime.sec !== null ? distanceTime.sec : 0
    const totalSec = Number(hrs) * 60 * 60 + Number(min) * 60 + Number(sec)
    if (!distanceTime.distance || !totalSec) {
        return 0;
    }
    const distanceInKm = Number(distanceTime.distance) / 1000
    return (3600 / totalSec) * distanceInKm
}

export const fromMph = (mph: number): number => mph * KphMphRatio

export const fromMinutesPerMile = (minPerMile: MinutesPerMile): number => {
    const min = minPerMile.min !== null ? minPerMile.min : 0
    const sec = minPerMile.sec !== null ? minPerMile.sec : 0
    const totalSec = Number(min) * 60 + Number(sec) 
    if (!totalSec) {
        return 0
    } else {
        return (3600 / totalSec) * KphMphRatio
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

export const toKph = (canonicalKph: number): number => +canonicalKph.toFixed(2)

export const toMinutesPerKm = (kph: number): MinutesPerKm | undefined => {
    if (!kph) {
        return undefined
    }
    const secPerKm = 3600 / kph
    return {
        min: Math.floor(secPerKm / 60).toString(),
        sec: (+(secPerKm % 60).toFixed(0)).toString(),
    }
}

export const toDistanceTime = (kph: number, distance: number | null): DistanceTime | undefined => {
    if (!kph || !distance) {
        return undefined
    }
    const secPerDistance = (3600 / kph) * (distance / 1000)
    const secPrecision = distance < 500 ? 1 : 0;
    const hrs = Math.floor(secPerDistance / 3600)
    const remainingSecs = secPerDistance - hrs * 3600
    const min = Math.floor(remainingSecs / 60)
    const sec = +(remainingSecs % 60).toFixed(secPrecision)
    return {
        hrs: hrs ? hrs.toString() : null,
        min: min ? min.toString() : null,
        sec: sec ? sec.toString() : null,
        distance: distance ? distance.toString() : null
    }
}

export const toMph = (canonicalKph: number): number => canonicalKph / KphMphRatio

export const toMinutesPerMile = (kph: number): MinutesPerMile | undefined => {
    if (!kph) {
        return undefined
    }
    const secPerMile = (3600 / kph) * KphMphRatio
    return {
        min: Math.floor(secPerMile / 60).toString(),
        sec: (+(secPerMile % 60).toFixed(0)).toString(),
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
