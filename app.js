var database = firebase.database();

firebase.database().ref('/').on('value', function(snapshot) {
  var val = snapshot.val();
  var users = val.users;
  var challenges = val.challenges;

  var div = $('#challenge');

  for (var i = 0; i < 100; i++) {
    setTimeout(function(){
      if (users.length > 1) {
        // div.text(users[random(0, users.length)].name);
        div.text(challenges[random(0, challenges.length)].text);
      }
    }, 10000*i);
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