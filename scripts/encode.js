import fs from 'fs';
import path from 'path';

let file = fs.readFileSync('scripts\\input', "utf8");

export function xor(str, shift) {
    let newS = ""
    str.split("").forEach((letter, i) => {
        newS += String.fromCharCode(letter.charCodeAt(0)^(shift[i%shift.length].charCodeAt(0)))
    })
    return newS
}

fs.writeFileSync("scripts\\output", btoa(xor(file, "yoshiisangry")))