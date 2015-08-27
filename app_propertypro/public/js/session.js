//Session Login



//Session Logout



//Adding New User
var newUser = function(email, password, password_confirm){
  // type: type, 
  var data = {
    user: {
      email: email,
      password: password,
      password_confirmation: password_confirm
    }
  }

  $.ajax({
    url: 'http://localhost:3000/users',
    data: data,
    type: 'post'
  }).done(function(){
    alert('user created!');
  });
}

$('.new-account-btn').on('click', function(){
  var email = $('.email').val();
  var password = $('.password').val();
  var password_confirm = $('.password_confirm').val();

  // Password check
  if (password === password_confirm) {
    newUser(email, password, password_confirm);
  }else{
    alert("Sorry, password is not match.");
    $('.password_confirm').val("");
    $('.password').val("").focus();
  }

});

