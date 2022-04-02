const song = document.getElementById('song')
const playBtn = document.querySelector(".player")
const nextBtn = document.querySelector(".forward")
const prevBtn = document.querySelector('.rewind')
const durationTime = document.querySelector('.duration')
const remainingTime = document.querySelector('.remaining')
const rangeBar = document.querySelector('.range')
const musicsName = document.querySelector('.title-music')
const musicsImg = document.querySelector('.theme img')
const musicsThumb = document.querySelector('.theme')
const playRepeat = document.querySelector('.repeat')
let isRepeat = false;
let timer;
playRepeat.addEventListener('click', function() {
    if (isRepeat) {
        isRepeat = false
        playRepeat.removeAttribute('style')
    } else {
        isRepeat = true
        playRepeat.style.color = '#2cccff'
    }
})
playBtn.addEventListener('click', playPause);
let isPlaying = true;
const musics = [{
    id: 1,
    title: "Nếu Ngày Ấy",
    file: "0.mp3",
    image: "./img/3.jpg",
}, {
    id: 1,
    title: 'Beautiful in White',
    file: '1.mp3',
    image: './img/1.jpg',
}, {
    id: 1,
    title: 'Dù Cho Mai Về Sau',
    file: '2.mp3',
    image: './img/2.jpg',
}, {
    id: 1,
    title: 'Nơi Này Có Anh',
    file: '3.mp3',
    image: './img/0.jpg',
}]
let indexSong = 0
nextBtn.addEventListener('click', function() {
    changeSong(1)
})
prevBtn.addEventListener('click', function() {
    changeSong(-1)
})
song.addEventListener('ended', handleEndedSong)

function handleEndedSong() {
    if (isRepeat) {
        //handleRepeat
        isPlaying = true
    } else {
        changeSong(1)
    }
}

function changeSong(index) {
    if (index === 1) {
        //next song
        indexSong++;
        if (indexSong >= musics.length) {
            indexSong = 0
        }
        isPlaying = true
    } else if (index === -1) {
        // previous song
        indexSong--;
        if (indexSong < 0) {
            indexSong = musics.length - 1
        }
        isPlaying = true
    }
    init(indexSong)
        // song.setAttribute('src', `./music/${musics[indexSong].file}`);
    playPause()
}

function playPause() {
    if (isPlaying) {
        musicsThumb.classList.add('is-playing')
        song.play()
        playBtn.innerHTML = `<ion-icon name="pause"></ion-icon>`
        isPlaying = false
        timer = setInterval(displayTimer, 500)

    } else {
        musicsThumb.classList.remove('is-playing')
        song.pause()
        playBtn.innerHTML = `<ion-icon name="play"></ion-icon>`
        isPlaying = true
        clearInterval(timer)
    }
}

function displayTimer() {
    const { duration, currentTime } = song;
    rangeBar.max = duration
    rangeBar.value = currentTime
    remainingTime.textContent = formatTimer(currentTime)
    if (!duration) {
        durationTime.textContent = '00:00'
    } else {
        durationTime.textContent = formatTimer(duration)
    }
}

function formatTimer(numb) {
    const minutes = Math.floor(numb / 60)
    const seconds = Math.floor(numb - minutes * 60)
    return `${minutes < 10 ? '0'+minutes:minutes}:${seconds<10?'0'+seconds:seconds}`

}
rangeBar.addEventListener('change', handleChangeBar)

function handleChangeBar() {
    song.currentTime = rangeBar.value
}

function init(indexSong) {
    song.setAttribute('src', `./music/${musics[indexSong].file}`);
    musicsImg.setAttribute('src', musics[indexSong].image);
    musicsName.textContent = musics[indexSong].title
}

displayTimer()
init(indexSong)