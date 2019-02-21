function onChangeBrightness(value) {
  brightness = parseInt(value);

  for(var i = 0; i < imagedatacopy.data.length; i += 4){
    imagedatacopy.data[i] = imagedata.data[i] + brightness;       // r
    imagedatacopy.data[i+1] = imagedata.data[i+1] + brightness;   // g
    imagedatacopy.data[i+2] = imagedata.data[i+2] + brightness;   // b
  }

  ctx.clearRect(0, 0, width, height);
  ctx.putImageData(imagedatacopy, 0, 0);
}

function onChangeContrast(value) {
  contrast = parseFloat(value);

  for(var i = 0; i < imagedatacopy.data.length; i += 4){
    imagedatacopy.data[i] = (imagedata.data[i] - 128) *contrast + 128;       // r
    imagedatacopy.data[i+1] = (imagedata.data[i+1] - 128) *contrast + 128;   // g
    imagedatacopy.data[i+2] = (imagedata.data[i+2] - 128) *contrast + 128;   // b
  }

  ctx.clearRect(0, 0, width, height);
  ctx.putImageData(imagedatacopy, 0, 0);
}

function onChangeGamma(value) {
  gamma = parseFloat(value);
  for(var i = 0; i < imagedatacopy.data.length; i += 4){
    imagedatacopy.data[i] = 255 * Math.pow(imagedata.data[i]/255.0, 1.0/gamma);
    imagedatacopy.data[i+1] = 255 * Math.pow(imagedata.data[i+1]/255.0, 1.0/gamma);
    imagedatacopy.data[i+2] = 255 * Math.pow(imagedata.data[i+2]/255.0, 1.0/gamma);
  }
  ctx.clearRect(0, 0, width, height);
  ctx.putImageData(imagedatacopy, 0, 0);
}

function onChangeHueR(value) {
  hueR = parseInt(value);
  for(var i = 0; i < imagedatacopy.data.length; i += 4){
    imagedatacopy.data[i] = imagedata.data[i] + hueR;
  }
  ctx.clearRect(0, 0, width, height);
  ctx.putImageData(imagedatacopy, 0, 0);
}


function onChangeHueG(value) {
  hueG = parseInt(value);
  for(var i = 0; i < imagedatacopy.data.length; i += 4){
    imagedatacopy.data[i+1] = imagedata.data[i+1] + hueG;
  }
  ctx.clearRect(0, 0, width, height);
  ctx.putImageData(imagedatacopy, 0, 0);
}

function onChangeHueB(value) {
  hueB = parseInt(value);
  for(var i = 0; i < imagedatacopy.data.length; i += 4){
    imagedatacopy.data[i+2] = imagedata.data[i+2] + hueB;
  }
  ctx.clearRect(0, 0, width, height);
  ctx.putImageData(imagedatacopy, 0, 0);
}


function onChangeNegative(){
  for(var i = 0; i < imagedatacopy.data.length; i += 4){
    imagedatacopy.data[i] = 255 - imagedata.data[i];
    imagedatacopy.data[i+1] = 255 - imagedata.data[i+1];
    imagedatacopy.data[i+2] = 255 - imagedata.data[i+2];
  }
}

function onChangeGray(){
  for(var i = 0; i < imagedatacopy.data.length; i += 4){
    var grayscale = imagedata.data[i]*0.34 + imagedata.data[i+1]*0.5 + imagedata.data[i+2]*0.16;
    imagedatacopy.data[i] = grayscale;
    imagedatacopy.data[i+1] = grayscale;
    imagedatacopy.data[i+2] = grayscale;
  }
}

function onChangeSepia() {
  for(var i = 0; i < imagedatacopy.data.length; i += 4){
    var val1 =  (0.393*imagedata.data[i] +  0.769*imagedata.data[i+1] +  0.189*imagedata.data[i+2])/1.351;
    var val2 =  (0.349*imagedata.data[i] +  0.686*imagedata.data[i+1] +  0.186*imagedata.data[i+2])/1.203;
    var val3 =  (0.272*imagedata.data[i] +  0.534*imagedata.data[i+1] +  0.131*imagedata.data[i+2])/2.140;
    imagedatacopy.data[i] = val1;
    imagedatacopy.data[i+1] = val2;
    imagedatacopy.data[i+2] = val3;
  }
}

function onChangeBinary(value){
  onChangeGray();
  binary = parseInt(value);

  for(var i = 0; i < imagedatacopy.data.length; i += 4){
    (imagedatacopy.data[i] < binary) ? imagedatacopy.data[i] = 0 : imagedatacopy.data[i] = 255;
    (imagedatacopy.data[i+1] < binary) ? imagedatacopy.data[i+1] = 0 : imagedatacopy.data[i+1] = 255;
    (imagedatacopy.data[i+2] < binary) ? imagedatacopy.data[i+2] = 0 : imagedatacopy.data[i+2] = 255;
  }

  ctx.clearRect(0, 0, width, height);
  ctx.putImageData(imagedatacopy, 0, 0);
}

function onChangeFilter(value, checked) {
  if(value === "grayscale" && checked == true) {
    grayscale = true;
  }
  else if(value === "negative" && checked == true) {
    negative = true;
  }
  else if(value === "sepia" && checked == true) {
    sepia = true;
  }
  else if(value === "grayscale" && checked == false) {
    grayscale = false;
    ctx.clearRect(0, 0, width, height);
    ctx.putImageData(imagedata, 0, 0);
  }
  else if(value === "negative" && checked == false) {
    negative = false;
    ctx.clearRect(0, 0, width, height);
    ctx.putImageData(imagedata, 0, 0);
  }
  else if(value === "sepia" && checked == false) {
    sepia = false;
    ctx.clearRect(0, 0, width, height);
    ctx.putImageData(imagedata, 0, 0);
  }

  if(grayscale && !negative && !sepia) { // 1 0 0
    onChangeGray();
    ctx.clearRect(0, 0, width, height);
    ctx.putImageData(imagedatacopy, 0, 0);
  }
  else if (!grayscale && negative && !sepia) { // 0 1 0
    onChangeNegative();
    ctx.clearRect(0, 0, width, height);
    ctx.putImageData(imagedatacopy, 0, 0);
  }
  else if (!grayscale && !negative && sepia) { // 0 0 1
    onChangeSepia();
    ctx.clearRect(0, 0, width, height);
    ctx.putImageData(imagedatacopy, 0, 0);
  }
  else if (grayscale && negative && !sepia) { // 1 1 0
    onChangeNegativeAndGray();
    ctx.clearRect(0, 0, width, height);
    ctx.putImageData(imagedatacopy, 0, 0);
  }
  else if (!grayscale && negative && sepia) { // 0 1 1
    onChangeNegativeAndSepia();
    ctx.clearRect(0, 0, width, height);
    ctx.putImageData(imagedatacopy, 0, 0);
  }
  else if (grayscale && !negative && sepia) { // 1 0 1
    onChangeGrayAndSepia();
    ctx.clearRect(0, 0, width, height);
    ctx.putImageData(imagedatacopy, 0, 0);
  }
  else if (grayscale && negative && sepia) { // 1 1 1
    onChangeNegativeAndGrayAndSepia();
    ctx.clearRect(0, 0, width, height);
    ctx.putImageData(imagedatacopy, 0, 0);
  }

}

function onChangeNegativeAndGray() {
  for(var i = 0; i < imagedatacopy.data.length; i += 4){
    var grayscale = imagedata.data[i]*0.34 + imagedata.data[i+1]*0.5 + imagedata.data[i+2]*0.16;
    imagedatacopy.data[i] = grayscale;
    imagedatacopy.data[i+1] = grayscale;
    imagedatacopy.data[i+2] = grayscale;
    imagedatacopy.data[i] = 255 - imagedatacopy.data[i];
    imagedatacopy.data[i+1] = 255 - imagedatacopy.data[i+1];
    imagedatacopy.data[i+2] = 255 - imagedatacopy.data[i+2];
  }
}

function onChangeNegativeAndSepia() {
  for(var i = 0; i < imagedatacopy.data.length; i += 4){
    imagedatacopy.data[i] = 255 - imagedata.data[i];
    imagedatacopy.data[i+1] = 255 - imagedata.data[i+1];
    imagedatacopy.data[i+2] = 255 - imagedata.data[i+2];
    var val1 =  (0.393*imagedatacopy.data[i] +  0.769*imagedatacopy.data[i+1] +  0.189*imagedatacopy.data[i+2])/1.351;
    var val2 =  (0.349*imagedatacopy.data[i] +  0.686*imagedatacopy.data[i+1] +  0.186*imagedatacopy.data[i+2])/1.203;
    var val3 =  (0.272*imagedatacopy.data[i] +  0.534*imagedatacopy.data[i+1] +  0.131*imagedatacopy.data[i+2])/2.140;
    imagedatacopy.data[i] = val1;
    imagedatacopy.data[i+1] = val2;
    imagedatacopy.data[i+2] = val3;
  }
}

function onChangeGrayAndSepia() {
  for(var i = 0; i < imagedatacopy.data.length; i += 4){
    var grayscale = imagedata.data[i]*0.34 + imagedata.data[i+1]*0.5 + imagedata.data[i+2]*0.16;
    imagedatacopy.data[i] = grayscale;
    imagedatacopy.data[i+1] = grayscale;
    imagedatacopy.data[i+2] = grayscale;
    var val1 =  (0.393*imagedatacopy.data[i] +  0.769*imagedatacopy.data[i+1] +  0.189*imagedatacopy.data[i+2])/1.351;
    var val2 =  (0.349*imagedatacopy.data[i] +  0.686*imagedatacopy.data[i+1] +  0.186*imagedatacopy.data[i+2])/1.203;
    var val3 =  (0.272*imagedatacopy.data[i] +  0.534*imagedatacopy.data[i+1] +  0.131*imagedatacopy.data[i+2])/2.140;
    imagedatacopy.data[i] = val1;
    imagedatacopy.data[i+1] = val2;
    imagedatacopy.data[i+2] = val3;
  }
}

function onChangeNegativeAndGrayAndSepia() {
  for(var i = 0; i < imagedatacopy.data.length; i += 4){
    var grayscale = imagedata.data[i]*0.34 + imagedata.data[i+1]*0.5 + imagedata.data[i+2]*0.16;
    imagedatacopy.data[i] = grayscale;
    imagedatacopy.data[i+1] = grayscale;
    imagedatacopy.data[i+2] = grayscale;
    imagedatacopy.data[i] = 255 - imagedatacopy.data[i];
    imagedatacopy.data[i+1] = 255 - imagedatacopy.data[i+1];
    imagedatacopy.data[i+2] = 255 - imagedatacopy.data[i+2];
    var val1 =  (0.393*imagedatacopy.data[i] +  0.769*imagedatacopy.data[i+1] +  0.189*imagedatacopy.data[i+2])/1.351;
    var val2 =  (0.349*imagedatacopy.data[i] +  0.686*imagedatacopy.data[i+1] +  0.186*imagedatacopy.data[i+2])/1.203;
    var val3 =  (0.272*imagedatacopy.data[i] +  0.534*imagedatacopy.data[i+1] +  0.131*imagedatacopy.data[i+2])/2.140;
    imagedatacopy.data[i] = val1;
    imagedatacopy.data[i+1] = val2;
    imagedatacopy.data[i+2] = val3;
  }
}
