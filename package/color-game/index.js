var colors = [];
var numsquares = 6;
var pickcolor;
var squares = document.querySelectorAll(".square");
var colordisplay = document.querySelector("#colordisplay");
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetbutton = document.querySelector("#reset");
var easybtn = document.querySelector("#easybtn");
var hardbtn = document.querySelector("#hardbtn");
var modeButtons = document.querySelectorAll(".mode");

init();
resetbutton.addEventListener("click", function () {
  reset();
});

function init() {
  //modeButton
  setupModeButton();
  //square initial
  setupSquares();
  //reset all
  reset();
}
function setupModeButton() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function () {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? (numsquares = 3) : (numsquares = 6);
      reset();
      //figure out how many squares to show
      //pick new color
      //pick a new pickColor
      //update page to reflect changes
    });
  }
}
function setupSquares() {
  for (var i = 0; i < squares.length; i++) {
    //add initial color to squares
    squares[i].style.backgroundColor = colors[i];

    //add click listeners to squares
    squares[i].addEventListener("click", function () {
      //grab color of clicked
      var clickcolor = this.style.backgroundColor;
      if (clickcolor === pickcolor) {
        message.textContent = "Correct";
        resetbutton.textContent = "Play again?";
        changecolor(clickcolor);
        h1.style.backgroundColor = clickcolor;
      } else {
        this.style.backgroundColor = "#232323";
        message.textContent = "Try again";
      }
    });
  }
}
function reset() {
  //generate all new color
  colors = generateColor(numsquares);
  //change colors of squares
  pickcolor = pickedcolor();
  //change color display to pickcolor
  colordisplay.textContent = pickcolor;
  resetbutton.textContent = "New Color";
  //change square color
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      //hidden another three squares
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "steelblue";
  message.textContent = "";
}
function changecolor(color) {
  //loop through all squares
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}
function pickedcolor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}
function generateColor(num) {
  //make array
  var arr = [];
  //add num random color to array
  for (var i = 0; i < num; i++) {
    //get random color and push into arr
    arr.push(randomColor());
  }
  //return array
  return arr;
}
function randomColor() {
  //pick red from 0 - 255
  var redColor = Math.floor(Math.random() * 256);
  //pick green from 0 - 255
  var greenColor = Math.floor(Math.random() * 256);
  //pick blue from 0 - 255
  var blueColor = Math.floor(Math.random() * 256);
  // "rgb(r, g, b)"
  return "rgb(" + redColor + ", " + greenColor + ", " + blueColor + ")";
}

// easybtn.addEventListener("click",function(){
// 	easybtn.classList.add("selected");
// 	hardbtn.classList.remove("selected");
// 	numsquares = 3;
// 	colors = generateColor(numsquares);
// 	pickcolor = pickedcolor();
// 	colordisplay.textContent = pickcolor;
// 	for(var i = 0;i<squares.length;i++){
// 		if(colors[i]){
// 			squares[i].style.backgroundColor = colors[i];
// 		}else{
// 			//hidden another three squares
// 			squares[i].style.display = "none";
// 		}
// 	}
// });

// hardbtn.addEventListener("click",function(){
// 	easybtn.classList.remove("selected");
// 	hardbtn.classList.add("selected");
// 	numsquares = 6;
// 	colors = generateColor(numsquares);
// 	pickcolor = pickedcolor();
// 	colordisplay.textContent = pickcolor;
// 	for(var i = 0;i<squares.length;i++){
// 		squares[i].style.backgroundColor = colors[i];
// 		//show all squares
// 		squares[i].style.display = "block";
// 	}
// });
