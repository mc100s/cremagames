
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
            $('#users').append('<div class="user">'
                + users[userIndex].name +'<br><img src="https://scontent-mrs1-1.xx.fbcdn.net/v/t1.0-9/12247188_1361606713866115_5442842873180515409_n.jpg?oh=5640aad3e795b93f7a1d1e41d88d8b00&oe=5913F6BF">'
              +'</div>');
            chall.text = chall.text.replace(/{(\d+)}/g,function(match, number) {
              // return number == i ? users[(userIndex + i) % users.length].name : match // OLD Mod
              return number == i ? users[userIndex].name : match;
            });
          }
          $('#challenge').html(chall.text);
        }
        challIndex = challIndex + 1;

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

function newYearTrigger() {

 // 10 seconds count down
 for (var i=10; i>0; i--) {
  setTimeout(function(){$('#challenge').html("<b>"+i+"</b>")}, (10-i)*1000); 
 }
 setTimeout(function(){$('#challenge').html("<b>NEW YEAR !</b>")}, 10*1000);

 // Clear
 setTimeout(function(){$('#challenge').html('')}, 20*1000);
}

function newYearCelebration() {
  var now = new Date();

  // every hour from 21h
  var millisTill21 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 0, 0, 0) - now;
  for (var hour = 0; hour < 6; hour++){
    setTimeout(newYearTrigger, millisTill21 + hour*3600000 - 10000);
  }
}
