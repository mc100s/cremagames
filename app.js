var database = firebase.database();

  console.log("Hello world!");

firebase.database().ref('users').on('value', function(snapshot) {
  var users = snapshot.val();

  var div = $('#challenge');
  if (users.length > 1) {
    // div.text(users[Math.round(Math.random()*users.length)].name);
    div.text(users[0].name);
  }
  console.log(div);
});


