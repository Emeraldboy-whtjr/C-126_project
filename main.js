var righthand = "";
var lefthand = "";

var rightWrist_X = 0;
var rightWrist_Y = 0;
var leftWrist_X = 0;
var leftWrist_Y = 0;

var scoreLeftWrist = 0;//for storing the score of the left wrist.
var scoreRightWrist = 0;//for storing the score of the right wrist.

var statusSong = "";//this variable is to see wether the song is bieng played or not.

function preload(){
    righthand = loadSound("Crying_for_Rain.mp3");
    lefthand = loadSound("Mirror_heart.mp3");
}

function setup(){
    canvas = createCanvas(400,400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);//initialising poseNet model inside posenet variable.
    posenet.on("pose", gotposes);//executing poseNet model.
}

function modelLoaded(){
    console.log("model has loaded");

}

function gotposes(results){

    if(results.length > 0){
        console.log(results);

        //getting x and y co-ordinates for right wrist.
        rightWrist_X = results[0].pose.rightWrist.x;
        rightWrist_Y = results[0].pose.rightWrist.y;

        //getting x and y co-ordinates for left wrist.
        leftWrist_X = results[0].pose.leftWrist.x;
        leftWrist_Y = results[0].pose.leftWrist.y;

        //for storing the score of the left wrist.
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        //for checking the score of the left wrist.
        console.log(scoreLeftWrist);

        //for storing the score of the right wrist.
        scoreRightWrist = results[0].pose.keypoints[10].score;
        //for checking the score of the right wrist.
        console.log(scoreRightWrist);


    }
}

function draw(){
    image(video,0,0,400,400);

    fill("red");
    

    statusSong = lefthand.isPlaying();//to store the info if the song is bieng played or not.

    //idk wtf is going on.
    if(scoreLeftWrist > 0.2){
        circle(leftWrist_X,leftWrist_Y,25);
        righthand.stop();

        if(righthand.isPlaying() == false){
            righthand.play();
            document.getElementById("song_pyed").innerHTML = "Crying for Rain";
        }
    }

    statusSong = righthand.isPlaying();//to store the info if the song is bieng played or not.

    if(scoreRightWrist > 0.2){
        circle(rightWrist_X,rightWrist_Y,25);
        lefthand.stop();

        if(lefthand.isPlaying() == false){
            lefthand.play();
            document.getElementById("song_pyed").innerHTML = "Mirror Heart";
        }
    
    }
}