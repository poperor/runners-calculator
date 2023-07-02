import { Dispatch, SetStateAction } from "react"
import { SpeedType } from "./config"

export interface ResultProps {
    canonicalKph: number
}

export interface AlternativeProps {
    speedTypes: SpeedType[]
    inputSpeedType?: SpeedType
    resultSpeedType?: SpeedType
}

export interface PacePerKm {
    min: string | null
    sec: string | null
}

export interface DistanceTime {
    hrs: string | null
    min: string | null
    sec: string | null
    distance: string | null
}

export interface PacePerMile {
    min: string | null
    sec: string | null
}

export interface DistanceInYardsTime {
    min: number
    sec: number
    distance: number
}

const kphMphRatio = 1.609344
const yardsPerMile = 1760

export const fromKph = (kph: string|null): number => Number(kph) 

export const fromPacePerKm = (pacePerKm: PacePerKm): number => {
    const min = pacePerKm.min !== null ? pacePerKm.min : 0
    const sec = pacePerKm.sec !== null ? pacePerKm.sec : 0
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

export const fromMph = (mph: string|null): number => Number(mph) * kphMphRatio

export const fromPacePerMile = (pacePerMile: PacePerMile): number => {
    const min = pacePerMile.min !== null ? pacePerMile.min : 0
    const sec = pacePerMile.sec !== null ? pacePerMile.sec : 0
    const totalSec = Number(min) * 60 + Number(sec) 
    if (!totalSec) {
        return 0
    } else {
        return (3600 / totalSec) * kphMphRatio
    }
}

export const fromDistanceInYardsTime = (minutesPerYards: DistanceInYardsTime): number => {
    const sec = minutesPerYards.min * 60 + minutesPerYards.sec
    if (!minutesPerYards.distance || !sec) {
        return 0;
    }
    const distanceInMiles = minutesPerYards.distance / yardsPerMile
    return (3600 / sec) * distanceInMiles * kphMphRatio
}

export const toKph = (canonicalKph: number): string => (+canonicalKph.toFixed(2)).toString()

export const toPacePerKm = (kph: number): PacePerKm  => {
    if (!kph) {
        return {min: null, sec: null}
    }
    const secPerKm = 3600 / kph
    return {
        min: Math.floor(secPerKm / 60).toString(),
        sec: (+(secPerKm % 60).toFixed(0)).toString(),
    }
}

export const toDistanceTime = (kph: number, distance: number | null): DistanceTime => {
    if (!kph || !distance) {
        return {hrs: null, min: null, sec: null, distance: null}
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

export const toMph = (canonicalKph: number): string => (canonicalKph / kphMphRatio).toFixed(2).toString()

export const toPacePerMile = (kph: number): PacePerMile => {
    if (!kph) {
        return {min: null, sec: null}
    }
    const secPerMile = (3600 / kph) * kphMphRatio
    return {
        min: Math.floor(secPerMile / 60).toString(),
        sec: (+(secPerMile % 60).toFixed(0)).toString(),
    }
}

export const toDistanceInYardsTime = (kph: number, distance: number): DistanceInYardsTime => {
    const mph = kph / kphMphRatio
    const secPerDistance = (2.04545455 / mph) * distance
    return {
        min: Math.floor(secPerDistance / 60),
        sec: +(secPerDistance % 60).toFixed(0),
        distance
    }
}
