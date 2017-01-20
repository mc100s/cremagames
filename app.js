
var database = firebase.database();

firebase.database().ref('/').on('value', function(snapshot) {
  // var users = snapshot.val().users;
  // var challenges = snapshot.val().challenges;

  // Number of rounds
  for (var round = 0; round < 3; round++){

    // Shuffle of Challenges[] & Users[] arrays 
    var users = shuffle(snapshot.val().users);
    var challenges = shuffle(snapshot.val().challenges);
  
    // Initializing chall & user index
    var userIndex = 0;
    var challIndex = 0;

    // Looping on challenges[]

    for (var challIndex = 0; challIndex < challenges.length; challIndex++) {
      
      var chall = challenges[challIndex];

      setTimeout(function(chall){
        $('#users').html(' ');
      
        if (users.length >= chall.peopleCount) {

          for (var i = 0; i < chall.peopleCount; i++) {
            userIndex = (userIndex + 1) % users.length;
            var pictureUrl = 'img/user.png';
            if (users[userIndex].pictureUrl)
              pictureUrl = users[userIndex].pictureUrl;
            $('#users').append('<div class="user">'
                + users[userIndex].name +'<br><img src="'+ pictureUrl +'">'
              +'</div>');
            chall.text = chall.text.replace(/{(\d+)}/g,function(match, number) {
              return number == i ? users[userIndex].name : match;
            });
          }
          $('#challenge').html(chall.text.replace('&#10;', '<br>'));
        }
        challIndex = challIndex + 1;

        console.log(1000 * (round * challenges.length + challIndex));

      }, 5000 * (round * challenges.length + challIndex), chall);
    }
  }
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
