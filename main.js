var righthand = "";
var lefthand = "";

function preload(){
    righthand = loadSound("Crying_for_Rain.mp3");
    lefthand = loadSound("Mirror_heart.mp3");
}

function setup(){
    canvas = createCanvas(400,400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function draw(){
    image(video,100,100,400,400);
}