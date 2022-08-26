song ="";

scoreRightWrist=0;
scoreLeftWrist=0; 

rightWristX=0;
rightWristY=0;

leftWristX=0;
leftWristY=0;

function preload(){
    song =loadSound("BTS.mp3");
}
function setup(){
    canvas =createCanvas(600,500);
    canvas.center();

    video =createCapture(VIDEO);
    video.hide();

    poseNet =ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);

}
function modelLoaded(){
    console.log("PoseNet Is Intialised");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWristX= results[0].pose.keypoints[9].score;
        scoreRightWristY= results[0].pose.keypoints[10].score;

        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;

        leftWristX= results[0].pose.rightWrist.x;
        leftWristY= results[0].pose.rightWrist.y;
    }
}
function draw(){
    image(video,0,0,600,500);

    fill("deepskyblue");
    stroke("dodgerblue");
    circle(leftWristX+400,leftWristY,20);

    if(scoreRightWrist> 0.2){
        circle(rightWristX,rightWristY,20);
        InNumberrightWristY = Number(rightWristY);
        remove_decimal = floor(InNumberrightWristY);
        volume = remove_decimal/500;
        document.getElementById("volume").innerHTML = "Volume : " + volume;
        song.setVolume(volume);
        console.log(volume); 
    }
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function stop() {
    song.stop();
}