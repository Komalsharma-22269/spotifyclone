console.log('lets write Javascript')

async  function getSongs() {

let a = await fetch("http://127.0.0.1:5500/songs/")
let response = await a.text();
console.log(response)
let div= document.createElement("div")
div.innerHTML = response;
let as = div.getElementsByTagName("a")
// http://127.0.0.1:5500/songs/cs/abc.mp3
let songs = []
for (let index = 0; index < as.length; index++){
    const element = as[index];
    if(element.href.endsWith(".mp3")){
        songs.push(element.href.split("/songs/")[1])
    }
}
 return songs
 }

// Array of song names and artists
const songs = [
    { name: 'BamBholle', artist: 'Viru' },
    { name: 'Chak Lein De', artist: 'Kailash Kher' },
    { name: 'Chammak Challo', artist: 'Akon' },
    { name: 'Crazy Kiya Re', artist: 'Sunidhi Chauhan, Pritam, Sameer' },
    { name: 'Ek Zindagi', artist: 'Tanishkaa Sanghvi, Sachin, Jigar' },
    { name: 'Lat Lag Gayee', artist: 'Pritam Chakraborty' },
    { name: 'Raabta', artist: 'Arijit Singh' },
    { name: 'There Party On My Mind', artist: 'Yo Yo Honey Singh, KK' },
    { name: 'Tumhi Ho Bandhu', artist: 'Neeraj Shridhar, Kavita Seth' },
    { name: 'Ziddi Dil', artist: 'Vishal Dadlani' },
    { name: 'Zinda', artist: 'Siddharth Mahadevan' }
];

// Get the ul element with the class 'songlist'
const songList = document.querySelector('.songlist ul');

// Iterate through the array of songs
songs.forEach(song => {
    // Create li element
    const listItem = document.createElement('li');

    // Create img element for music icon
    const musicImg = document.createElement('img');
    musicImg.classList.add('invert');
    musicImg.src = 'music.svg'; // Set the appropriate URL for the music icon
    listItem.appendChild(musicImg);

    // Create div for song name and artist
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');
    infoDiv.innerHTML = `
        <div>${song.name}</div>
        <div>${song.artist}</div>
    `;
    listItem.appendChild(infoDiv);

    // Create div for "Play Now"
    const playNowDiv = document.createElement('div');
    playNowDiv.textContent = 'Play Now';
    playNowDiv.style.fontSize = '11px'; // Set font size to 11px
    listItem.appendChild(playNowDiv);

    // Create img element for play button
    const playImg = document.createElement('img');
    playImg.classList.add('invert');
    playImg.src = 'play1.svg'; // Set the appropriate URL for the play icon
    listItem.appendChild(playImg);

    // Append the list item to the songList
    songList.appendChild(listItem);
});


//Play the first song
var audio = new Audio(songs[1]);
audio.play();

audio.addEventListener("loadeddata", () => {
  console.log(audio.duration, audio.currentSrc, audio.currentTime)
  // The duration variable now holds the duration (in seconds) of the audio clip
});

 
 
main() 
