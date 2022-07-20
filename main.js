song1="";
song2="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreleftwristy=0;
song1status="";

function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("song2.mp3.mp3");
}
function setup(){
    canvas=createCanvas(500,600);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
console.log('model is initiated');
}
function gotPoses(results){
if(results.length>0){
    console.log(results);

    scoreleftwristy=results[0].pose.keypoints[9].score;
    console.log("score of left wrist y is "+scoreleftwristy);

    

    leftwristx=results[0].pose.leftWrist.x;
    leftwristy=results[0].pose.leftWrist.y;
    rightwristx=results[0].pose.rightWrist.x;
    rightwristx=results[0].pose.rightWrist.y;
    
    console.log('LEFT WRIST X '+leftwristx +'LEFT WRIST Y '+leftwristy);
    console.log('RIGHT WRIST X '+rightwristx + 'RIGHT WRIST Y '+ rightwristy);
}
}
function draw(){
    image(video,0,0,500,600);
    if(scoreleftwristy>0.2){
        fill("#eb4034");
        stroke("#eb4034");
        circle(leftwristx,leftwristy,20);
    }
    
}
function play(){
    song1.play();
    song1status=song1.isPlaying();
    if(song1status=="true"){
        song1.stop();
        document.getElementById("song_name").innerHTML="playing believer by imagine dragons";
    }
}