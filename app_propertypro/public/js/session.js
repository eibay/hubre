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
    resetPasswordForm();
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
    alert("Sorry, password does not match.");
    resetPasswordForm();
  }

});

function resetPasswordForm(){
  $('.password_confirm').val("");
  $('.password').val("").focus();
}

