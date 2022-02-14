const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
  }

//Passing Joke To voicerss API
function tellMe(joke) {
        VoiceRSS.speech({
        key: "610b4569c3564922bc74a1f45077fa82",
        src: joke,
        hl: "zh-tw",
        v: "Lee",
        r: -1,
        c: "mp3",
        f: "44khz_16bit_stereo",
        ssml: false,
      });
}

//Get Joke API

async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single';
    try {
       const response = await fetch(apiUrl);
       const data = await response.json();
       if (data.setup) {
           joke = `${data.setup} ... ${data.delivery}`;
       } else {
           joke = data.joke;
       }
       //Text to-Speech
       tellMe(joke);

       //Disabled Button
       toggleButton();

    } catch (error) {
        //Catch Error Here
        console.log('Whopps.Error :', error);
    }
}

//Event Listener

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton)