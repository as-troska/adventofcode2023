const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8').split('\n').map(line => line.split(''));

let total = 0;

for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
        if (!isNaN(parseInt(data[i][j]))) {
            let number = '';
            let k = j;
            while (!isNaN(parseInt(data[i][k]))) {
                number += data[i][k];
                k++;
            }

            let isPartNumber = false;
            for (let l = 0; l < number.length; l++) {
                outer: for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        if (dx === 0 && dy === 0) continue;

                        let x = i + dx;
                        let y = j + l + dy;

                        if (x >= 0 && x < data.length && y >= 0 && y < data[i].length) {
                            let symbol = data[x][y];
                            if (symbol != "." && isNaN(parseInt(symbol))) {
                                isPartNumber = true;
                                break outer;
                            }
                        }
                    }
                }
                if (isPartNumber) break;
            }

            if (isPartNumber) {
                total += parseInt(number);
            }

            j = k - 1;
        }
    }
}

console.log(total);

let totalGearRatios = 0;

for (let i2 = 0; i2 < data.length; i2++) {
    for (let j2 = 0; j2 < data[i2].length; j2++) {
        if (data[i2][j2] === '*') {
            let partNumbers = [];
            for (let dx2 = -1; dx2 <= 1; dx2++) {
                for (let dy2 = -1; dy2 <= 1; dy2++) {
                    if (dx2 === 0 && dy2 === 0) continue;

                    let x2 = i2 + dx2;
                    let y2 = j2 + dy2;

                    if (x2 >= 0 && x2 < data.length && y2 >= 0 && y2 < data[i2].length) {
                        let cell2 = data[x2][y2];
                        if (!isNaN(parseInt(cell2))) {
                            let number2 = '';
                            let k2 = y2;
                            while (k2 >= 0 && !isNaN(parseInt(data[x2][k2]))) {
                                number2 = data[x2][k2] + number2;
                                k2--;
                            }
                            k2 = y2 + 1;
                            while (k2 < data[i2].length && !isNaN(parseInt(data[x2][k2]))) {
                                number2 += data[x2][k2];
                                k2++;
                            }
                            partNumbers.push(parseInt(number2));
                        }
                    }
                }
            }
            partNumbers = [...new Set(partNumbers)];
            if (partNumbers.length === 2) {
                totalGearRatios += partNumbers[0] * partNumbers[1];
            }
        }
    }
}

console.log(totalGearRatios);