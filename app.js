var database = firebase.database();

  console.log("Hello world!");

firebase.database().ref('/').on('value', function(snapshot) {
  var val = snapshot.val();
  var users = val.users;
  var challenges = val.challenges;

  var div = $('#challenge');
  if (users.length > 1) {
    // div.text(users[Math.round(Math.random()*users.length)].name);
    // div.text(users[random(0, users.length)].name);
    div.text(challenges[random(0, challenges.length)].text);
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