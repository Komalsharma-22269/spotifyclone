 console.log('lets write Javascript')
 let currentSong = new Audio();
 let songs;
 let currfolder;

 function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


async  function getSongs(folder) {
currfolder = folder;
let a = await fetch(`http://127.0.0.1:5501/${folder}/`)
let response = await a.text();
console.log(response)
let div = document.createElement("div")
div.innerHTML = response;
let as = div.getElementsByTagName("a")
 songs = []
for (let index = 0; index < as.length; index++){
    const element = as[index];
    if(element.href.endsWith(".mp3")){
        songs.push(element.href.split(`/${folder}/`)[1] )
    }
}


  //show all the songs in the playlist
  let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
  songUL.innerHTML = ""
  for (const song of songs) {
       songUL.innerHTML = songUL.innerHTML +`<li> <img class="invert" src="image/music.svg" alt="">
       <div class="info">
         <div> ${song.replaceAll("%20" , " ")}</div>
         <div></div>
      </div>
      <div class="playnow">
         <span>Play Now</span>
         <img class="invert" src="image/play1.svg" alt=""> 
      </div> </li>`;
  }
  
  //Attach an event listener to each song
  Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
      e.addEventListener("click", element => {
          playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
  
      })
  })

  return songs
 }

const playMusic = (track, pause=false)=>{
  currentSong.src = `/${currfolder}/` + track
  if(!pause){
    currentSong.play()
    play.src = "image/pause.svg"
  }
 
  document.querySelector(".songinfo").innerHTML = decodeURI(track)
  document.querySelector(".songtime").innerHTML  = "00:00 / 00:00"

  
}

async function displayAlbums(){
  console.log("displaying albums")
  let a = await fetch(`http://127.0.0.1:5501/songs/`)
let response = await a.text();
let div = document.createElement("div")
div.innerHTML = response;
 let anchors = div.getElementsByTagName("a")
let cardcontainer = document.querySelector(".cardcontainer")
 let array = Array.from(anchors)
for (let index = 0 ; index < array.length; index++) {
  const e = array[index];
  if(e.href.includes("/songs/")){
    let folder = e.href.split("/").slice(-2)[1]

    //get the metadata of the folder
    let a = await fetch(`http://127.0.0.1:5501/songs/${folder}/info.json`)
let response = await a.json();
cardcontainer.innerHTML = cardcontainer.innerHTML + ` <div data-folder="${folder}"   class="card ">
<div class="play">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2.5 -2.5 35 35" width="32" height="32" color="#000000" fill="none">
        <circle cx="15" cy="15" r="16" stroke="green" stroke-width="1.5" fill="#0BDA51" />
        <path d="M19.9531 15.3948C19.8016 16.0215 19.0857 16.4644 17.6539 17.3502C16.2697 18.2064 15.5777 18.6346 15.0199 18.4625C14.7893 18.3913 14.5793 18.2562 14.4098 18.07C14 17.6198 14 16.7465 14 15C14 13.2535 14 12.3802 14.4098 11.93C14.5793 11.7438 14.7893 11.6087 15.0199 11.5375C15.5777 11.3654 16.2697 11.7936 17.6539 12.6498C19.0857 13.5356 19.8016 13.9785 19.9531 14.6052C20.0156 14.8639 20.0156 15.1361 19.9531 15.3948Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="black" />
    </svg>
     </div>
     

     <img src="/songs/${folder}/cover.jpg" alt="">
        <h2>${response.title}</h2>
        <p>${response.description}</p>
</div>`
  }
}

 //load the playlist whenever card is clicked
 Array.from(document.getElementsByClassName("card")).forEach(e=>{
 
  e.addEventListener("click", async item=>{
    console.log("Fetching Songs")
    songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
    playMusic(songs[0])
  
  })
}) 

}

 async function main (){
    //get the list of all the songs
 await getSongs("songs/ncs")
 playMusic(songs[0], true)
 
//Display all the albums on the page
await displayAlbums()

//Attach an event listner to play , next and previous
play.addEventListener("click", () => {
    if(currentSong.paused){
        currentSong.play()
        play.src = "image/pause.svg"
    }
    else{
        currentSong.pause()
        play.src = "image/play.svg"
    }
})

  //Listen for timeupdate event
  currentSong.addEventListener("timeupdate", ()=>{
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
    document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100 + "%";
  })

  //Add an event listener to the seekbar
  document.querySelector(".seekbar").addEventListener("click", e=>{
    let percent =  (e.offsetX / e.target.getBoundingClientRect().width) * 100 
      document.querySelector(".circle").style.left = percent + "%";
      currentSong.currentTime = ((currentSong.duration ) * percent)/100
  })

  //Add an event listener for hamburger
  document.querySelector(".hamburger").addEventListener("click", ()=>{
    document.querySelector(".left").style.left = "0"
  })

 //Add an event listener for close button
  document.querySelector(".close").addEventListener("click", ()=>{
    document.querySelector(".left").style.left = "-120%"
  })

  //Add an event listner for previous 
  previous.addEventListener("click", () => {
    currentSong.pause()
    console.log("Previous clicked")
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    if((index - 1) >= 0){
    playMusic(songs[index - 1])
  }
  })

  //Add an event listner for next 
  next.addEventListener("click", () => {
    currentSong.pause()
    console.log("Next clicked")

    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    if((index + 1) <songs.length){
    playMusic(songs[index + 1])
  }
  })

  //Add an event to volume
  document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
    console.log("Setting volume to", e.target.value, "/ 100")
    currentSong.volume = parseInt(e.target.value) / 100
    if (currentSong.volume >0){
      document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg")
    }
  })

// Add event listener to mute the track
document.querySelector(".volume>img").addEventListener("click", e=>{
  if(e.target.src.includes("volume.svg")){
    e.target.src = e.target.src.replace("volume.svg", "mute.svg")
    currentSong.volume = 0;
    document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
  }
  else{
    e.target.src = e.target.src.replace("mute.svg", "volume.svg")
    currentSong.volume = .10;
    document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
  }
  
})

 

 }
 
main() 










