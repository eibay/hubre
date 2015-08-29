//Session Login
var loginUser = function(email, password){
  var data = {
    email: email,
    password: password
  }

  $.ajax({
    url: 'http://localhost:3000/session',
    data: data,
    type: 'post'
  }).done(function(){
    hideUserForm();
  });

}

$('.login-btn').on('click', function(){
  var email = $('.email-login').val();
  var password = $('.password-login').val();
  loginUser(email, password);

});

//Session Logout
var logout = function(){

  $.ajax({
      url: 'http://localhost:3000/session',
      data: data,
      type: 'destroy'
    }).done(function(){
      showUserForm();
    });

}

$('.logout-btn').on('click', logout);


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

function showUserForm(){
  $('.login').show();
  $('.signup').show();
}

//Initial Status of Session Form

