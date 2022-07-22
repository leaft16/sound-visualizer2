const windowMargin = 200;
//var song
var mic;
var fft;
var bgvid = document.getElementById("bgvid");
var cow;
let rotation;
let cow_x;
let cow_y;
let movement_x;
let movement_y;

function preload() {
  //song = loadSound('improv37.mp3');
  cow = loadModel('Mesh_Cow.obj');
}

function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight, WEBGL);
  myCanvas.parent("fundo");
  angleMode(DEGREES);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  rotation = 90;
  cow_x = 0;
  cow_y = 0;
  movement_x = 1; 
  movement_y = 1;
}

function draw() {
  background(0, 0, 0, 0);
  stroke(255);
  strokeWeight(3);
  noFill();
  
  var wave = fft.waveform();

  beginShape();
  for (var i = 0; i <= width; i++) {
    var index = floor(map(i, 0, width, 0, wave.length));

    var x = i - width/2;
    var y = wave[index] * 200;
    vertex(x,y);
  }
  endShape();

  // Invisible Cube
  noStroke();
  noFill();
  translate(cow_x, cow_y, 200);
  box(200);

  // Cow
  ambientLight(100);
  normalMaterial();
  rotateX(-rotation);
  rotateY(rotation);
  rotateZ(rotation);

  model(cow);

  rotation += .2;

  if (rotation >= 360)
    rotation = 0;

  if (cow_x >= windowWidth/2 - windowMargin*5/3) movement_x = 0;
  if (cow_y >= windowHeight/2 - windowMargin) movement_y = 0;
  if (cow_x <= -windowWidth/2 + windowMargin*5/3) movement_x = 1;
  if (cow_y <= -windowHeight/2 + windowMargin) movement_y = 1;

  if (movement_x == 1) cow_x+=2;
  if (movement_x == 0) cow_x-=2;
  if (movement_y == 1) cow_y+=2;
  if (movement_y == 0) cow_y-=2;
}
/*
function mouseClicked() {
  if (song.isPlaying()) {
    song.pause()
    noLoop()
    bgvid.pause()
  } else {
    song.play()
    loop()
    bgvid.play()
  }
}

function keyPressed() {
  // 32 - spacebar; 13 - enter
  if (keyCode === 32 || keyCode === 13) {
    if (song.isPlaying()) {
      song.pause()
      noLoop()
      bgvid.pause()
    } else {
      song.play()
      loop()
      bgvid.play()
    } 
  }
}
*/