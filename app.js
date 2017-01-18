
// Functions

/**
 * Shuffle array.length times the given array.
 */
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle
  while (0 !== currentIndex) {

    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Main

var database = firebase.database();

firebase.database().ref('/').on('value', function(snapshot) {
  var val = snapshot.val();
  var users = val.users;
  var challenges = val.challenges;

  // Number of rounds
  for (var round = 0; round < 3; round++){

    // Shuffle of Challenges[] & Users[] arrays 
    users = shuffle(users);
    challenges = shuffle(challenges);
  
    // Initializing chall & user index
    var userIndex = 0;
    var challIndex = 0;

    // Looping on challenges[]
    while (challIndex < challenges.length){
      
      // Old version: random(0, challenges.length)];
      var chall = challenges[challIndex];
      
      var div = $('#challenge');
      if (users.length > 1) {
        // Old version: div.text(users[Math.round(Math.random()*users.length)].name);
        // Old version: userRandom = users[random(0, users.length)].name

        for (var i = 0; i < chall.peopleCount; i++) {
            chall.text = chall.text.replace(/{(\d+)}/g,function(match, number) {
                return number == i ? users[userIndex + i % users.length].name : match});
        }
    
        div.text(chall.text);
    
      }

      // May intentionally cause an out-of-bound for userIndex 
      userIndex = (userIndex + chall.peopleCount);
      // Loop on chall (as discussed)
      challIndex = (challIndex + 1) % challenge.length;

    }
  }
  console.log(div);
});


firebase.database().ref('/').on('value', function(snapshot) {
  var x = snapshot.val();
  console.log(x);
});


/**
 * Return a random number in "[a;b[" ("b" not included)
 */
function random(a, b) {
  return Math.floor(Math.random()*(b-a))+a;
}
