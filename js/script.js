var inputCurrentFrequency = document.querySelector('#inputCurrentFrequency');
var rangeFrequencies = document.querySelector('#rangeFrequencies');
var divPodcast = document.querySelector('#divPodcast');
var leftArrow = document.querySelector('#arrowLeft');
var rightArrow = document.querySelector('#arrowRight');

function start() {
  rangeFrequencies.addEventListener('input', handleRangeValueChange);
  leftArrow.addEventListener('click', previousFrequency);
  rightArrow.addEventListener('click', nextFrequency);
}

function previousFrequency(event) {
  var rangeValue = event.path[1].children[1].value;
  var min = rangeFrequencies.getAttribute('min');
  if (rangeValue !== min) {
    rangeValue = parseFloat(rangeValue);
    rangeValue -= 0.1;
    inputCurrentFrequency.value = rangeValue.toFixed(1);
    rangeFrequencies.value = rangeValue.toFixed(1);
    findPodcastFrom(rangeValue.toFixed(1));
  }
}

function nextFrequency() {
  var rangeValue = event.path[1].children[1].value;
  var max = rangeFrequencies.getAttribute('max');
  if (rangeValue !== max) {
    rangeValue = parseFloat(rangeValue);
    rangeValue += 0.1;
    inputCurrentFrequency.value = rangeValue.toFixed(1);
    rangeFrequencies.value = rangeValue.toFixed(1);
    findPodcastFrom(rangeValue.toFixed(1));
  }
}

function handleRangeValueChange(event) {
  var currentFrequency = event.target.value;
  inputCurrentFrequency.value = currentFrequency;
  findPodcastFrom(currentFrequency);
}

function findPodcastFrom(frequency) {
  var foundPodcast = null;
  for (var i = 0; i < realPodcasts.length; i++) {
    var currentPodcast = realPodcasts[i];
    if (currentPodcast.id === frequency) {
      foundPodcast = currentPodcast;
      break;
    }
  }
  if (foundPodcast) {
    renderPodcast(foundPodcast);
  } else {
    divPodcast.innerHTML = '<p>No podcasts found!</p>';
  }
}

function renderPodcast(podcast) {
  divPodcast.innerHTML = '';
  var img = document.createElement('img');
  img.src = './img/' + podcast.img;
  var title = document.createElement('h2');
  title.textContent = podcast.title;
  var description = document.createElement('p');
  description.textContent = podcast.description;

  divPodcast.appendChild(img);
  divPodcast.appendChild(title);
  divPodcast.appendChild(description);
}

start();
