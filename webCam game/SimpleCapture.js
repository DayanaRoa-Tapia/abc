// file:///Users/dayanaroa-tapia/Desktop/webCam%20game/index.html

let capture; 

let food = []; //array to hold food items
let cookie;
let tracker;

let x ;
let y;
// let speed = [];

let w;
let h;

// let speed;
let score;

let openMouth;
let topX;
let topY;
let bottomX;
let bottomY;


function preload(){
	cookie = loadImage('cookie.png');
	// font = ('assets/SourceSansPro-Regular.otf');
	
}



function setup(){
	createCanvas(640,480);
	capture = createCapture(VIDEO);
	capture.size(640,480);
	capture.hide();
	x = random(100,450);
	y = 0;
	w = 50;
	h = 50;
	score = 0;
	// speed = 2;

	colorMode(HSB);

    tracker = new clm.tracker();
    tracker.init();
    tracker.start(capture.elt);


	for (var i = 0; i < 5 ; i++){
		food[i] = new Cookies(cookie, x,0, w, h);
		x = random(100,450);
	}


	// textFont(font);


}



function draw(){

	background(255);

	
	image(capture, 0,0 ,640,480);

	var positions = tracker.getCurrentPosition();

    noFill();
    // stroke(255);
    beginShape();
    for (var i = 0; i < positions.length; i++) {
        vertex(positions[i][0], positions[i][1]);
    }
    endShape();

    noStroke();


    if (positions.length > 0) {

        var mouthTop = createVector(positions[60][0], positions[60][1]);
        var mouthBottom = createVector(positions[57][0], positions[57][1]);
        openMouth = dist(positions[57][0], positions[57][1], positions[60][0], positions[60][1]);
        // print(openMouth);

        topX = positions[60][0];
        topY = positions[60][1];
        bottomX = positions[57][0];
        bottomY = positions[57][1];

    }




	for (var i = 0; i < food.length; i++){

		image(food[i].cookieImg, food[i].cX,food[i].cY+=random(1,8),w,h);

		if(food[i].cY > 480 - 50){

			food[i].cY = 0;
		}

		if(topX-20 < food[i].cX && food[i].cX < bottomX+15 && food[i].cY > topY-15 && food[i].cY < bottomY+15 && openMouth > 15 ){
			print("eat");
			food.splice(i,1);
			score++;

			textSize(25);
			textAlign(CENTER, CENTER);
			print("Score: "+score)
		}

		fill(0);
		text("Score: "+score,60,20);


	}

	if(score == 5){
		capture.stop();
		textSize(60);
		textAlign(CENTER, CENTER);
		text("Score: "+score,60,20);
		fill('red');
		text("YOU WIN!!!!", 320,240);
	}

}

class Cookies{

	constructor(cookie, x, y, w, h){
		this.cookieImg = cookie;
		this.cX = x;
		this.cY = y;
		this.cW = w;
		this.cH = h;
	}


}	












