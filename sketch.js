let currency;
let baseCurrency = "USD";
let exchangeData;
let currenyOrbs = [];
let rates = []; //helps grab the rate values globally

function setup() {
  createCanvas(4010, 1060);
  loadJSON(
    "https://v6.exchangerate-api.com/v6/dab48e0931ad93f17fc77e7c/latest/USD",
    gotData
  );
  // loadExchangeData(); // Call the function to load API data
}

function gotData(data) {
  currency = data;
}

function draw() {
  background(137, 207, 240);

  if (currency) {
    fill(0);
    textSize(12);
    textAlign(LEFT, TOP);
    let y = 20; // Starting position for text display
    let x = 80;

    // Simplified for-in loop to display each currency rate
    for (let code in currency.conversion_rates) {
      let rate = currency.conversion_rates[code];

      rates.push(rate); //add those rates to a public array

      fill(0);
      text(`${code}`, x, 1040);
      x += 50;

      //don't need this anymore
      // fill(255, 800, 0);
      // noStroke();
      // ellipse(x - 37, 1025 - `${rate}`, 10);

      //instead of ellipses, we are loading the rate values as objects "orbs"
      let o = new Orbs(x - 37, 1025 - `${rate}`); //create the orb
      currenyOrbs.push(o); //add to array
    }
    fill(0);
    for (let i = 500; i >= 0; i -= 10) {
      text(i, 50, y);
      y += 20; // Move down for each currency
    }

    //display orbs and rollover feature
    for (let i = 0; i < currenyOrbs.length; i++) {
      currenyOrbs[i].show();
      currenyOrbs[i].rollOver(mouseX, mouseY, rates[i]); //grabs that public array for rates
    }
  }
}

//here is the orb class
class Orbs {
  constructor(tempX, tempY) {
    this.x = tempX;
    this.y = tempY;
    this.s = 10;
  }

  rollOver(px, py, tempText) {
    //checks the mouse position
    let d = dist(px, py, this.x, this.y);

    if (d < this.s / 2) {
      //add more styling for your textbox
       rectMode(CENTER);
       fill(250);
       rect(this.x, this.y - 25, 70, 25);
      fill(0);
      textAlign(CENTER);
      let newTxt = tempText.toFixed(2);
      text(newTxt, this.x, this.y - 30);
      fill(255,0,0);
      ellipse(this.x, this.y, this.s);
    }
  }

  // you can change the look of the orbs here
  show() {
    fill(255, 255, 0);
    noStroke();
    ellipse(this.x, this.y, this.s);
  }
}