const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8').split(/\r?\n/);

// let workingData = []

// for (let i = 0; i < data.length; i++) {
//     let numberArray = []

//     for (let char of data[i]) {
//         if (!isNaN(parseInt(char))) {
//             numberArray.push(char)
//         }
//     }
//     console.log(numberArray)

//     if (numberArray.length > 0) {
//         let number = "";
//         number += numberArray[0].toString()
//         number += numberArray[numberArray.length -1].toString()
//         workingData.push(number)
//     }
    
    
    
// }

// console.log(workingData)

// let total = 0;

// for (let i = 0; i < workingData.length; i++) {
//     total += Number(workingData[i])
// }

// console.log(total)


let oppg2 = []

for (let i = 0; i < data.length; i++) {
    let debugstring = data[i]

    let foundNumbers = []

    let substrings = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    for (let substring of substrings) {
        if (data[i].includes(substring)) {
            let number

            switch (substring) {
                case "one":
                    number = "1"
                    break;
                case "two":
                    number = "2"
                    break;
                case "three":
                    number = "3"
                    break;
                case "four":
                    number = "4"
                    break;
                case "five":
                    number = "5"
                    break;
                case "six":
                    number = "6"
                    break;
                case "seven":
                    number = "7"
                    break;
                case "eight":
                    number = "8"
                    break;
                case "nine":
                    number = "9"
                    break;
                default:
                    number = substring
                    break
            }

            if (data[i].indexOf(substring) == data[i].lastIndexOf(substring)) {
                foundNumbers.push([number, data[i].indexOf(substring)])
            } else {
                foundNumbers.push([number, data[i].indexOf(substring)])
                foundNumbers.push([number, data[i].lastIndexOf(substring)])
            }
            
        }
    }

    // for (let char of data[i]) { 
    //     if (!isNaN(parseInt(char))) {
    //         foundNumbers.push([char, data[i].indexOf(char)])
    //     }
    // }

    foundNumbers.sort((a, b) => a[1] - b[1])

    

    oppg2.push(foundNumbers)

}

let total = 0;

for (let array of oppg2) {
    if (array.length > 0) {
        let number = Number(array[0][0] + array[array.length -1][0])
        
        total = total + number
    }

}

console.log(total)



