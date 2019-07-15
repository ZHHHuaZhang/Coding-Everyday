const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  return array[Math.floor(Math.random()*array.length)];
}

var storyText='It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.';

var insertx=[
    'Willy the Goblin',
    'Big Daddy',
    'Father Christmas',
]

var inserty=[
    'the soup kitchen',
    'Disneyland',
    'the White House'
]

var insertz=[
    'spontaneously combusted',
    'melted into a puddle on the sidewalk',
    'turned into a slug and crawled away'
]

randomize.addEventListener('click', result);

function result() {

  var newStory=storyText;
  var xItem=randomValueFromArray(insertx);
  console.log(xItem);
  var yItem=randomValueFromArray(inserty);
  var zItem=randomValueFromArray(insertz);
  
  newStory=newStory.replace(':insertx:',xItem);
  newStory=newStory.replace(':inserty:',yItem);
  newStory=newStory.replace(':insertz:',zItem);
  newStory=newStory.replace(':insertx:',xItem);

  if(customName.value !== '') {
    var name = customName.value;
    newStory=newStory.replace('Bob',name);
  }

  if(document.getElementById("uk").checked) {
    var weight = Math.round(300*0.0714286)+'st';
    var temperature =  Math.round((94-32)/1.8)+'°F';
    newStory=newStory.replace('94 fahrenheit',temperature);
    newStory=newStory.replace('300 pounds',weight);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}