var el = document.getElementById("main"),
	two = new Two({
		fullscreen: true
	});

two.appendTo(el); //Attach two.js to html element

var ground = two.height * 3 / 4; //Where the red line (ground) should be
var ceiling = 100; //Same as radius of circle so that the top reaches the edge of the screen
var isFalling = true; //Starts from top and falls towards ground
var acceleration = .1;
//Make ground
var line = two.makeLine(0, ground, two.width, ground); 
line.linewidth = 10;
line.stroke = "red";

//Make ball
var ball = two.makeCircle(two.width / 2, 100, 100);
ball.noStroke();
ball.fill = "blue";

function moveUp(acceleration){
	ball.translation.y = ball.translation.y - 1 * acceleration;
}

function moveDown(acceleration){
	ball.translation.y = ball.translation.y + 1 * acceleration;
}

two.bind("update", function(frameCount) {
	if(ball.translation.y <= ground - 100 && isFalling) {
		moveDown(acceleration);
		acceleration = acceleration + .1;
	} else if (ball.translation.y > ceiling && !isFalling) {
		moveUp(acceleration);
		acceleration = acceleration - .1;
		//Logic for when to switch direction
	} else if (ball.translation.y <= ceiling) {
		isFalling = true;
		acceleration = .1;
	} else if (ball.translation.y > ground - 100) {
		isFalling = false;
	}
});
two.play();