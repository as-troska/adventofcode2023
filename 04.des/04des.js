const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8').split(/\r?\n/);

// Part 1:

let totalPoints = 0;
for (let line of data) {
    //Prepare lines:

    let lineArray = line.split("|")

    let winningNumbers = lineArray[0].split(" ")

    winningNumbers.shift()
    winningNumbers.shift()      

    let myNumbers = lineArray[1].split(" ")

    //Remove empty elements:
    for (let i = 0; i < winningNumbers.length; i++) { 
        if (winningNumbers[i] == "") {
            winningNumbers.splice(i, 1)
        }
    }

    for (let i = 0; i < myNumbers.length; i++) {
        if (i == 0 && myNumbers[i] == "") {
            
            myNumbers.shift()
        }

        if (myNumbers[i] == "") {
            myNumbers.splice(i, 1)
        }
    }

    // Find winning numbers on this card:

    let winningNumbersTotal = 0;
    
    for (let i = 0; i < winningNumbers.length; i++) {
        let winningNumber = winningNumbers[i]
        if(myNumbers.includes(winningNumber)) {
            winningNumbersTotal++
        }
    }

    // Debug: calculate points:
    // console.log("Number of winning numbers on this card: " + winningNumbersTotal)
    // console.log("Points this card: " + Math.pow(2, winningNumbersTotal -1))


    let points = Math.pow(2, winningNumbersTotal - 1)
    
    if (points >= 1) { 
        totalPoints += points
    }
    
}

console.log(totalPoints)

// Part 2:

let totalCards = 0;
let cards = [];

class Card {
    constructor(winningNumbers, myNumbers, index) {
        this.index = index;
        this.winningNumbers = winningNumbers;
        this.myNumbers = myNumbers;
        this.wonCards = this.getPoints();
        totalCards++;
    }

    getPoints() {
        let winningNumbersTotal = 0;
        for (let i = 0; i < this.winningNumbers.length; i++) {
            let winningNumber = this.winningNumbers[i];
            if(this.myNumbers.includes(winningNumber)) {
                winningNumbersTotal++;
            }
        }       
        return winningNumbersTotal;
    }

    addCopies() {
        for (let i = 0; i < this.wonCards; i++) {
            let newCard = this.processCard(this.index + (i+1));
            newCard.addCopies();
        }
    }

    processCard(index) {
        let lineArray = data[index].split("|");
        let winningNumbers = lineArray[0].split(" ");
        winningNumbers.shift();
        winningNumbers.shift();      
        let myNumbers = lineArray[1].split(" ");
        myNumbers = myNumbers.filter(num => num !== "");
        winningNumbers = winningNumbers.filter(num => num !== "");
        return new Card(winningNumbers, myNumbers, index);
    }
}

for (let x = 0; x < data.length; x++) {
    let lineArray = data[x].split("|");
    let winningNumbers = lineArray[0].split(" ");
    winningNumbers.shift();
    winningNumbers.shift();      
    let myNumbers = lineArray[1].split(" ");
    myNumbers = myNumbers.filter(num => num !== "");
    winningNumbers = winningNumbers.filter(num => num !== "");
    cards.push(new Card(winningNumbers, myNumbers, x));
}

for (let card of cards) {
    card.addCopies();
}

console.log(totalCards);