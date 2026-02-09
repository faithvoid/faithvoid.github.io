const videoInput = document.getElementById('videoInput');
const subtitleInput = document.getElementById('subtitleInput');
const video = document.getElementById('video');
const track = document.getElementById('subtitleTrack');
const wrapper = document.getElementById('videoWrapper');
const aspectBox = document.getElementById('aspectBox');
const aspectSelect = document.getElementById('aspectSelect');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');

playBtn.addEventListener('click', () => {
  if (video.src) {
    video.play();
  }
});

pauseBtn.addEventListener('click', () => {
  video.pause();
});

stopBtn.addEventListener('click', () => {
  video.pause();
  video.currentTime = 0;
});


const aspectModes = ['fit','original','16-9','4-3','stretch'];
let currentAspectIndex = 0;

function applyAspect(value) {
  aspectBox.className = 'aspect-box';
  aspectBox.style.width = '';
  aspectBox.style.height = '';
  video.style.width = '';
  video.style.height = '';
  video.style.objectFit = '';

  const maxWindowHeight = window.innerHeight * 0.9;

  switch(value) {
    case '16-9':
      aspectBox.classList.add('ratio-16-9');
      video.style.objectFit = 'contain';
      video.style.width = '100%';
      video.style.maxHeight = maxWindowHeight + 'px';
      break;

    case '4-3':
      aspectBox.classList.add('ratio-4-3');
      video.style.objectFit = 'contain';
      video.style.width = '100%';
      video.style.maxHeight = maxWindowHeight + 'px';
      break;

    case 'original':
      aspectBox.classList.add('ratio-original');
      video.style.objectFit = 'contain';
      video.style.width = 'auto';
      video.style.height = 'auto';
      video.style.maxWidth = '100%';
      video.style.maxHeight = maxWindowHeight + 'px';
      break;

    case 'fit':
      aspectBox.classList.add('ratio-original');
      video.style.width = '100%';
      video.style.height = 'auto';
      video.style.objectFit = 'contain';
      video.style.maxHeight = maxWindowHeight + 'px';
      break;

    case 'stretch':
      aspectBox.classList.add('ratio-original');
      video.style.width = '100%';
      video.style.height = '100%';
      video.style.objectFit = 'fill';
      break;
  }

  aspectSelect.value = value;
  currentAspectIndex = aspectModes.indexOf(value);
}


aspectSelect.addEventListener('change', () => applyAspect(aspectSelect.value));

videoInput.addEventListener('change', () => {
  const file = videoInput.files[0];
  if (!file) return;
  video.src = URL.createObjectURL(file);
  video.load();
});

video.addEventListener('loadedmetadata', () => applyAspect('fit'));

subtitleInput.addEventListener('change', async () => {
  const file = subtitleInput.files[0];
  if (!file) return;

  let text = await file.text();
  if (file.name.toLowerCase().endsWith('.srt')) {
    text = 'WEBVTT\n\n' + text.replace(/\r+/g,'').replace(/^\d+\n/gm,'').replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g,'$1.$2');
  }

  track.src = URL.createObjectURL(new Blob([text], {type:'text/vtt'}));
  track.default = true;
  video.textTracks[0].mode = 'showing';
});
