const fs = require('fs');
const { nextTick } = require('process');
const data = fs.readFileSync('input.txt', 'utf8').split(/\r?\n/);


//red, green, blue
const limits = [12, 13, 14]

const gameData = []

for (let game of data) {
    let gameObj = {}
    let info = game.split(":")

    gameObj["id"] = Number(info[0].split(" ")[1])

    info.shift()   

    for (let round of info) {
        let rounds = round.split(";")

        let roundArray = []
        
        for (let singleRound of rounds) {
            let roundObj = {
                "red": 0,
                "green": 0,
                "blue": 0
            }
            let cubes = singleRound.split(",")

            for (let cube of cubes) { 
                let cubeAtom = cube.split(" ")

                if (cubeAtom[2] == "red") { 
                    roundObj["red"] = parseInt(cubeAtom[1])
                } else if(cubeAtom[2] == "green") {
                    roundObj["green"] = parseInt(cubeAtom[1])
                } else if(cubeAtom[2] == "blue") {
                    roundObj["blue"] = parseInt(cubeAtom[1])
                }
            }
            roundArray.push(roundObj)
        }
        gameObj["rounds"] = roundArray
    }
    gameData.push(gameObj)  
}

let sum1 = 0



for (let game of gameData) {    
    game.valid = true
    for (let round of game.rounds) {
        if (round.red > limits[0] || round.green > limits[1] || round.blue > limits[2]) {
            game.valid = false
            
        } 
    }

    if (game.valid) {
        sum1 = sum1 + game.id
    }
}

console.log(sum1)

let totalPower = 0

for (let game of gameData) {
    game.minRed = 0
    game.minBlue = 0
    game.minGreen = 0

    for (let round of game.rounds) {
        if (round.red > game.minRed) {
            game.minRed = round.red
        }
        if (round.green > game.minGreen) {
            game.minGreen = round.green
        }
        if (round.blue > game.minBlue) {
            game.minBlue = round.blue
        }
    }

    game.power = game.minRed * game.minGreen * game.minBlue

    totalPower += game.power
}

console.log(totalPower)

