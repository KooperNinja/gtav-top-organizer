import glob from "fast-glob";
import fs from "fs";

import maleTops from "./male.json";
import femaleTops from "./female.json"

import maleStartingDrawList from "./maleStartingDrawList.json"
import femaleStartingDrawList from "./femaleStartingDrawList.json"
import { json } from "stream/consumers";

interface ITopData {
    category: string
    dlc: string
    drawable: number
    torsos: number[]
}

const getDlcNames = (tops: ITopData[]): string[] => {
    let dlcNameList: string[] = []
    for(let top of tops) {
        if(dlcNameList.indexOf(top.dlc) !== -1) continue
        dlcNameList.push(top.dlc)
    }
    return dlcNameList
}

interface IStartingDrawList {
    [key: string]: number
}

const rawAbsoluteStartingDrawList = (dlcList: string[]) => {
    let list: IStartingDrawList = {}
    for(let dlcName of dlcList) {
        list[dlcName] = 0
    }
    return list
}

const combineList = (...lists: IStartingDrawList[]) => {
    let finalList: IStartingDrawList = {}
    for(let list of lists) {
        finalList = Object.assign(finalList, list)
    }
    return finalList
}
/*
fs.writeFileSync(
    "RAWmaleStartingDrawList.json", 
    JSON.stringify(
        rawAbsoluteStartingDrawList(getDlcNames(maleTops)),
        null,
        "\t"
    )
)
fs.writeFileSync(
    "RAWfemaleStartingDrawList.json", 
    JSON.stringify(
        rawAbsoluteStartingDrawList(getDlcNames(femaleTops)),
        null,
        "\t"
    )
)
*/

fs.writeFileSync(
    "dlcStartingDraws.json", 
    JSON.stringify(
        combineList(maleStartingDrawList, femaleStartingDrawList),
        null,
        "\t"
    )
)