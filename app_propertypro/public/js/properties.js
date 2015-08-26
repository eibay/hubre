
//Adding New Property
var newProperty = function(){
  var label = $('#property-label').val();
  var address = $('#property-address').val();

  var data = {
    propertie: {
      label: label,
      address: address
    }
  }

  $.ajax({
    url: 'http://localhost:3000/properties',
    data: data,
    type: 'post'

  }).done(function(){
    alert('success saving');
  });
}

$('#new-property-btn').on('click', newProperty);

//SHOW NEW PROPERTY FORM
var showNewPropertyForm = function(){
  $('#new-property-form').css('display', 'inline');
}