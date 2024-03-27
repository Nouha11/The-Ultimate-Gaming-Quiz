//showing button after animation
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.frame-4');
  const startButton = document.getElementById('startButton');

  function showButton() {
    if (startButton) {
      startButton.classList.remove('hidden');
      console.log('Button shown after animation');
    } else {
      console.error('Button element not found.');
    }
  }
    var audio = document.getElementById("audioPlayer1");
    animatedElements.forEach(element => {
    element.addEventListener('animationend', showButton);
    audio.play();
  });
});

//playing background image after clicking start button

const video = document.getElementById('backgroundVideo');
    const playButton = document.getElementById('startButton');
    var audio = document.getElementById("audioPlayer");
    var audio1 = document.getElementById("audioPlayer1");
    audio1.volume -= 0.5;
    playButton.addEventListener('click', function() {
        video.play();
        audio1.pause();
        audio.play();
        audio.volume -= 0.5;
    });

function show1() {
    var x = document.getElementById("scroll");
    x.style.display = "block";
    var y = document.getElementById("wrapper");
    y.style.display = "none";
  }

function show(id) {
    var x = document.getElementById(id);
    x.style.display = "block";
  }
