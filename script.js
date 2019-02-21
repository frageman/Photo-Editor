// obecnie modyfikowana rzecz (np. jasność)
var activeOption;
// obiekty zmieniające styl na podstawie akcji użytkownika
var optionsSelect = document.getElementsByName("option");
var sliders = document.getElementsByClassName("slider");
var slidersContainer = document.getElementsByClassName("sliders-container")[0];

// suwaki
var brightnessSlider = document.getElementById("brightness-slider");
var contrastSlider = document.getElementById("contrast-slider");
var gammaSlider = document.getElementById("gamma-slider");
var hueSliderR = document.getElementById("hue-slider-r");
var hueSliderG = document.getElementById("hue-slider-g");
var hueSliderB = document.getElementById("hue-slider-b");
var binarySlider = document.getElementById("binary-slider");
var checkboxes = document.getElementsByClassName("checkbox");

// wartości
var brightness = 0;
var contrast = 1;
var gamma = 1;
var hueR = 0;
var hueG = 0;
var hueB = 0;
var binary = 128;

var grayscale = false;
var negative = false;
var sepia = false;

var img, c, ctx, height, width, imagedata, imagedatacopy;;

// obsługa głównego menu opcji
for (var i = 0; i < optionsSelect.length; i++) {
  optionsSelect[i].addEventListener("click", onChangeOption)
}

function onChangeOption() {
  // ukrywa wszystkie suwaki
  for(var i = 0; i < sliders.length; i++) {
    sliders[i].style.opacity = 0;
    sliders[i].style.visibility = "hidden";
  }
  for(var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].style.opacity = 0;
    checkboxes[i].style.visibility = "hidden";
  }
  // po kliknięciu aktywnej opcji - odznaczamy ją
  if(activeOption === this.value) {
    slidersContainer.style.opacity = 0;
    activeOption = null;
    this.checked = false;
  } else { // po kliknięciu nieaktywnej opcji - zaznaczamy ją
    slidersContainer.style.opacity = 1;
    activeOption = this.value;
  }
  showControl();
  imagedata = ctx.getImageData(0, 0, width, height);
  imagedata.data = new Uint8ClampedArray();
}

// to pewnie da się zrobić lepiej, ale chuj na razie, to nie projekt z TI xD
function showControl() {
  switch(activeOption) {
    case "brightness":
      brightnessSlider.style.visibility = "visible";
      brightnessSlider.style.opacity = 1;
      brightnessSlider.value = brightness;
      break;
    case "contrast":
      contrastSlider.style.visibility = "visible";
      contrastSlider.style.opacity = 1;
      contrastSlider.value = contrast;
      break;
    case "gamma":
      gammaSlider.style.visibility = "visible";
      gammaSlider.style.opacity = 1;
      gammaSlider.value = gamma;
      break;
    case "hue":
      hueSliderR.style.visibility = "visible"; hueSliderG.style.visibility = "visible"; hueSliderB.style.visibility = "visible";
      hueSliderR.style.opacity = 1; hueSliderG.style.opacity = 1; hueSliderB.style.opacity = 1;
      hueSliderR.value = hueR; hueSliderG.value = hueG; hueSliderB.value = hueB;
      break;
    case "binary":
      binarySlider.style.visibility = "visible";
      binarySlider.style.opacity = 1;
      binarySlider.value = binary;
      break;
    case "filters":
      for(var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].style.visibility = "visible";
        checkboxes[i].style.opacity = 1;
      }
      break;
  }
}

var img, c, ctx, height, width, imagedata, imagedatacopy;

// ładowanie obrazka od użytkownika
document.getElementById('file').onchange = function (evt) {
  var file = evt.target.files[0];
  var reader = new FileReader();

  reader.onload = function(event) {
    img = new Image();
    img.onload = function() {
      document.getElementsByClassName("canvas-empty")[0].style.display = "none";

      // dobieramy takie wymiary, żeby wszystko zmieściło się na ekranie
      height = window.innerHeight - 200;
      width = height / img.height * img.width;

      // typowe gówno
      c = document.getElementById("canvas")
      c.height = height
      c.width = width;
      c.style.left = (window.innerWidth - width) / 2 + "px";
      ctx = c.getContext("2d");

      // czyścimy i rysujemy
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      // zapisujemy dane z obrazu w formie tablicy (r,g,b,a), oryginał zostawiamy w spokoju, pracujemy na kopii
      imagedata = ctx.getImageData(0, 0, width, height);
      imagedatacopy = ctx.getImageData(0, 0, width, height);
      imagedata.data = new Uint8ClampedArray();
      imagedatacopy.data = new Uint8ClampedArray();
    }
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
  for(var i = 0; i < optionsSelect.length; i++) {
    optionsSelect[i].disabled = false;
  }
  document.getElementsByClassName("save-btn")[0].className = "save-btn";
}

function onDocsOpen() {
  document.getElementsByClassName("docs-container")[0].style.visibility = "visible";
  document.getElementsByClassName("docs-container")[0].style.opacity = 1;
}

function onDocsClose() {
  document.getElementsByClassName("docs-container")[0].style.visibility = "hidden";
  document.getElementsByClassName("docs-container")[0].style.opacity = 0;
}

function onSaveFile() {
  imageURL = c.toDataURL("image/jpeg");
  document.getElementsByClassName("save-btn")[0].href = imageURL;
}
























// asdasd
