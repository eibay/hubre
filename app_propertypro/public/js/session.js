//Session Login
var loginUser = function(email, password){


}


//Session Logout



//Adding New User
var newUser = function(email, password, password_confirm){
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
    hideUserForm();
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

function hideUserForm(){
  $('.login').hide();
  $('.signup').hide();
}

