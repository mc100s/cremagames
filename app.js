
var database = firebase.database();

firebase.database().ref('/').on('value', function(snapshot) {
  // var users = snapshot.val().users;
  // var challenges = snapshot.val().challenges;
  var maxRound = 3;

  // Number of rounds
  for (var round = 0; round < maxRound; round++){

    // Shuffle of Challenges[] & Users[] arrays 
    var users = shuffle(snapshot.val().users);
    var challenges = shuffle(snapshot.val().challenges);
  
    // Initializing chall & user index
    var userIndex = 0;
    var challIndex = 0;

    // Looping on challenges[]

    for (var challIndex = 0; challIndex < challenges.length; challIndex++) {
      
      var chall = challenges[challIndex];

      setTimeout(function(chall, round){
        $('#users').html(' ');
      
        if (users.length >= chall.peopleCount) {

          for (var i = 0; i < chall.peopleCount; i++) {
            userIndex = (userIndex + 1) % users.length;
            var pictureUrl = 'img/user.png';
            if (users[userIndex].pictureUrl)
              pictureUrl = users[userIndex].pictureUrl;
            $('audio')[0].play(); // Play audio
            $('#users').append('<div class="user">'
                + users[userIndex].name +'<br><img src="'+ pictureUrl +'">'
              +'</div>');
            chall.text = chall.text.replace(/{(\d+)}/g,function(match, number) {
              return number == i ? users[userIndex].name : match;
            });
          }
          $('#challenge').html(chall.text);
          $('#forfeit').html('<u>Gage</u> : Le perdant boit un shot choisi par un hôte de maison');
        }
        // Clear after 2 min
        clearScreen(2*60000);

      console.debug("Challenge " + (challIndex - maxRound) + " : " + chall.text)
      }, 300000 * (round * 2 * challenges.length + challIndex), chall);
    }
  }

  // BONUS: New Year Challenge
  newYearCelebration();
});


/*****************************************************************************/
/********************************* FUNCTIONS *********************************/
/*****************************************************************************/

/**
 * Return a random number in "[a;b[" ("b" not included)
 */
function random(a, b) {
  return Math.floor(Math.random()*(b-a))+a;
}


/**
 * Shuffle 
 */
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle
  while (0 !== currentIndex) {

    // Pick a remaining element
    randomIndex = random(0, currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function clearScreen(time){

 setTimeout(function() {
          $('#users').html(' ');
          $('#challenge').html(' ');
          $('#forfeit').html(' ');
        }, time);
}

function copyToScreen(time, challenge, users, forfeit){

 setTimeout(function() {
          $('#challenge').html(challenge);
          $('#users').html(users);
          $('#forfeit').html(forfeit);
        }, time);
}

function newYearTrigger() {

 var usersCopy, challengeCopy, forfeitCopy;

 challengeCopy = $('#challenge')[0].innerHTML;
 usersCopy = $('#users')[0].innerHTML;
 forfeitCopy = $('#forfeit')[0].innerHTML;

 clearScreen(0);

 // 10 seconds count down
 for (var i=10; i>0; i--) {
  setTimeout(function(i){$('#challenge').html("<b>"+i+"</b>")}, (10-i)*1000, i); 
 }
 setTimeout(function(){$('#challenge').html("<b>NEW YEAR !</b>")}, 10*1000);

 // Refreshing the previous chall
 copyToScreen(15*1000, challengeCopy, usersCopy, forfeitCopy);
}

function newYearCelebration() {
  var now = new Date();

  // every hour from 21h
  var millisTill21 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 0, 0, 0) - now;

  // in case of very bad F5 after midnight ;)
  if (millisTill21 > 0) {
    millisTill21 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0) - now;
  }
  for (var hour = 0; hour < 10; hour++){
    if ((millisTill21 + hour*3600000 - 10000) > 0)
      setTimeout(newYearTrigger, millisTill21 + hour*3600000 - 10000);
  }
}

