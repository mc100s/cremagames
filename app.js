
var database = firebase.database();

firebase.database().ref('/').on('value', function(snapshot) {
  var val = snapshot.val();
  var users = val.users;
  var challenges = val.challenges;

  var div = $('#challenge');
  // Number of rounds
  for (var round = 0; round < 3; round++){

    // Shuffle of Challenges[] & Users[] arrays 
    users = shuffle(val.users);
    challenges = shuffle(val.challenges);
  
    // Initializing chall & user index
    var userIndex = 0;
    var challIndex = 0;

    // Looping on challenges[]
    while (challIndex < challenges.length){
      
      // TODO: Waiting time
      //setTimeout(function(){
      
        // Old version: random(0, challenges.length)];
        var chall = challenges[challIndex];
        
        // var div = $('#challenge');
        if (users.length > 1) {
          // Old version: div.text(users[Math.round(Math.random()*users.length)].name);
          // Old version: userRandom = users[random(0, users.length)].name

          for (var i = 0; i < chall.peopleCount; i++) {
              chall.text = chall.text.replace(/{(\d+)}/g,function(match, number) {
                  return number == i ? users[(userIndex + i) % users.length].name : match});
          }
          div.text(chall.text);
          
          // DEBUG
          console.log(div);
          console.log(div[0].innerText);
        }
        userIndex = (userIndex + chall.peopleCount) % users.length;
        challIndex = challIndex + 1;

      //}, 10000 * (round * challenges.length + challIndex - 1));
    }
  }
});

//   for (var i = 0; i < 100; i++) {
//     setTimeout(function(){
//       if (users.length > 1) {
//         // div.text(users[random(0, users.length)].name);
//         div.text(challenges[random(0, challenges.length)].text);
//       }
//     }, 10000*i);
//   }

// });


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
