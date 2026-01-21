const layersConfig = {
    "avatar-top": { folder: "assets/tops", maxHeight: 200, maxWidth: 200, y: 0, isAvatar: true },
    "avatar-bottom": { folder: "assets/bottoms", maxHeight: 150, maxWidth: 200, y: 200, isAvatar: true },
    "avatar-shoes": { folder: "assets/shoes", maxHeight: 100, maxWidth: 200, y: 350, isAvatar: true },
    "window-hair": { folder: "assets/hair", maxHeight: 200, maxWidth: 200, isAvatar: false },
    "window-jacket": { folder: "assets/jackets", maxHeight: 200, maxWidth: 200, isAvatar: false },
    "window-bag": { folder: "assets/bags", maxHeight: 100, maxWidth: 200, isAvatar: false },
    "window-glasses": { folder: "assets/glasses", maxHeight: 50, maxWidth: 200, isAvatar: false },
    "window-scarf": { folder: "assets/scarf", maxHeight: 50, maxWidth: 200, isAvatar: false },
    "window-lipstick": { folder: "assets/lipstick", maxHeight: 20, maxWidth: 200, isAvatar: false },
    "window-accessories": { folder: "assets/accessories", maxHeight: 50, maxWidth: 200, isAvatar: false },
};

// Contenedor de cada capa
const layers = {};

async function loadImages(layerName, config) {
    const resp = await fetch(`${config.folder}/files.json`);
    const list = await resp.json();
    layers[layerName] = {
        element: document.getElementById(layerName),
        items: list,
        index: 0,
        maxHeight: config.maxHeight,
        maxWidth: config.maxWidth,
        y: config.y || 0,
        isAvatar: config.isAvatar || false
    };
    render(layerName);
}

function render(layer) {
    const l = layers[layer];
    if (!l || !l.items.length) return;

    const img = new Image();
    img.src = l.items[l.index];
    img.onload = () => {
        let newHeight = l.maxHeight;
        let newWidth = img.width / img.height * newHeight;
        if (newWidth > l.maxWidth) {
            newWidth = l.maxWidth;
            newHeight = newWidth * img.height / img.width;
        }

        l.element.src = l.items[l.index];
        l.element.style.width = newWidth + "px";
        l.element.style.height = newHeight + "px";

        if (!l.isAvatar) {
            l.element.style.display = "block";
            l.element.style.margin = "0 auto";
        }
    }
}



function next(layer) {
    const l = layers[layer];
    if (!l) return;
    l.index = (l.index + 1) % l.items.length;
    render(layer);
}

function prev(layer) {
    const l = layers[layer];
    if (!l) return;
    l.index = (l.index - 1 + l.items.length) % l.items.length;
    render(layer);
}

// Inicializar todas las capas
for (const name in layersConfig) {
    loadImages(name, layersConfig[name]);
}

const audio = document.getElementById('audio-element');
const statusText = document.getElementById('status-text');
const songTitle = document.getElementById('song-title');

// Tu lista de canciones predeterminada
let playlist = [
    { url: 'audios/Musica.mp3', name: 'DTI_THEME' },
    { url: 'audios/bratz.mp3', name: 'bratzzzz' },
    { url: 'audios/monster.mp3', name: 'monster_high.mp3' },
    { url: 'audios/phone.mp3', name: 'LOL.mp3' },
    { url: 'audios/satisfaction.mp3', name: 'SATISFACTION_THEME' },
    { url: 'audios/y2k.mp3', name: 'Y2K_THEME' }
];
let currentTrackIndex = 0;

function playTrack(index) {
    if (playlist[index]) {
        audio.src = playlist[index].url;
        audio.load();
        audio.play().then(() => {
            songTitle.innerText = playlist[index].name;
            statusText.innerText = "PLAYING...";
        }).catch(err => {
            statusText.innerText = "ERR: LOAD";
            console.log("Error de carga inicial");
        });
    }
}

function playAudio() {
    if (audio.src) {
        audio.play();
        statusText.innerText = "PLAYING...";
    } else {
        playTrack(currentTrackIndex);
    }
}

function pauseAudio() {
    audio.pause();
    statusText.innerText = "PAUSED";
}

function nextSong() {
    if (playlist.length > 1) {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        playTrack(currentTrackIndex);
    }
}

function prevSong() {
    if (playlist.length > 1) {
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        playTrack(currentTrackIndex);
    }
}

function loadMusic(event) {
    const file = event.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        playlist.push({ url: url, name: file.name.toUpperCase() });
        currentTrackIndex = playlist.length - 1;
        playTrack(currentTrackIndex);
    }
}

function actualizarHoraClima() {
    const ahora = new Date();
    const tiempo = ahora.getHours() + ":" + ahora.getMinutes().toString().padStart(2, '0');
    const updateElem = document.getElementById('update-time');
    if (updateElem) {
        updateElem.innerText = "LAST UPD: " + tiempo;
    }
}

// Actualizar al cargar
document.addEventListener('DOMContentLoaded', actualizarHoraClima);
