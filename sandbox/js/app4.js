var map;
var newIndex;
var newLat;
var newLng;
var newAddress;
var newLabel;
var newType;
var newSize;
var geocoder = new google.maps.Geocoder;
var infowindow = new google.maps.InfoWindow;

// Update position
$(document).on('submit', '.edit_marker', function(e) {
  e.preventDefault();
  var $index = $(this).data('marker-index');
  $lat = $('#marker_' + $index + '_lat').val();
  $lng = $('#marker_' + $index + '_lng').val();
  var template = $('#edit_marker_template').text();
  // Update form values
  var content = template.replace(/{{index}}/g, $index).replace(/{{lat}}/g, $lat).replace(/{{lng}}/g, $lng);
  map.markers[$index].setPosition(new google.maps.LatLng($lat, $lng));
  map.markers[$index].infoWindow.setContent(content);
  $marker = $('#markers-with-coordinates').find('li').eq(0).find('a');
  $marker.data('marker-lat', $lat);
  $marker.data('marker-lng', $lng);
});

// Update center
$(document).on('click', '.pan-to-marker', function(e) {
  e.preventDefault();
  var lat, lng;
  var $index = $(this).data('marker-index');
  var $lat = $(this).data('marker-lat');
  var $lng = $(this).data('marker-lng');
  if ($index != undefined) {
    // using indices
    var position = map.markers[$index].getPosition();
    lat = position.lat();
    lng = position.lng();
  }
  else {
    // using coordinates
    lat = $lat;
    lng = $lng;
  }
  map.setCenter(lat, lng);
});

//Create New Property Form
var newPropertyForm = function (address, lat, lng){   
    // var content = "<div><p>Label: <input class='new-label'></p>";
    // content += "<div>Address:"+ address +"</div>";
    // // content += "<p>Latitude: <span class='new-lat'>"+lat+"</span></p>";
    // // content += "<p>Longitude: <span class='new-lng'>"+lng+"</span></p>";
    // content += "<p>Type:<input class='new-type'></p>";
    // content += "<p>Size(meters):<input class='new-size'></p>";
    // content += "<button class='new-property-btn'>Save Property</button><div>";
    newAddress = address
    map.addMarker({
      lat: lat,
      lng: lng,
      title: 'Property' + newIndex,
      click: function(e) {
        // alert("LAT:" + lat + "LNG: " + lng + "Address: " + address);
        // $('.new-property-form').fadeIn(2500).animate({ "top": "+=80px" }, 1000 );
        // $('.new-address').val(address);
        // $(".new-label").val('Property' + newIndex);
        // newLat = lat;
        // newLng = lng;
      },
      infoWindow: {
        content: '<p>Address: '  + newAddress + '</p>' +
                 "<button class='details-btn'>Edit</button>"
                 

        // content : content
      }

    });
};//end of newPropertyForm

//GEOCoder Processing
var geocodeLatLng = function(geocoder, map, infowindow, lat, lng) {
  var latlng = {lat: lat, lng: lng};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        address = results[1].formatted_address;
        newPropertyForm(address, newLat, newLng);
      } else {
        // window.alert('No results found');
        address = "";
        newPropertyForm(address, newLat, newLng);
      }
    } else {
      // window.alert('Geocoder failed due to: ' + status);
    }
  });
}

// Initialize
$(document).ready(function(){
  map = new GMaps({
    div: '#map',
    lat: -37.8131869,
    lng: 144.9629796,
  });


  GMaps.on('marker_added', map, function(marker) {
    $('#markers-with-index').append('<li><a href="#" class="pan-to-marker" data-marker-index="' + map.markers.indexOf(marker) + '">' + marker.title + '</a></li>');
    $('#markers-with-coordinates').append('<li><a href="#" class="pan-to-marker" data-marker-lat="' + marker.getPosition().lat() + '" data-marker-lng="' + marker.getPosition().lng() + '">' + marker.title + '</a></li>');
  });

  GMaps.on('click', map.map, function(event){
     newIndex = map.markers.length;
     newLat = event.latLng.lat();
     newLng = event.latLng.lng();
     newAddress = geocodeLatLng(geocoder, map, infowindow, newLat, newLng);
  }); 

});//end of initialize

//Adding New Property
var newProperty = function(label, address, lat, lng, type, size){
  var data = {
    propertie: {
      label: label,
      address: address,
      latitude: lat, 
      longitude: lng,
      type: type, 
      size: size
    }
  }
  $.ajax({
    url: 'http://localhost:3000/properties',
    data: data,
    type: 'post'
  }).done(function(){
    alert('success saving');
    $('.new-property-form').fadeOut(2500);
  });
}

// Send property details to newProperty
$('.new-property-btn').on('click', function() {
  lat = newLat;
  lng = newLng;
  var type = $(this).parent().find('.new-type').html();
  var size = $(this).parent().find('.new-size').html();
  var label = $(this).parent().find('.new-label').html();
  newProperty(label, address, lat, lng, type, size);
});

$('.exit-btn').on('click', function(){
  $('.new-property-form').fadeOut(2500);
});

$('#map').on('click','.details-btn', function(){
  $('.new-property-form').fadeIn(2500).animate({ "top": "+=80px" }, 1000 );
  $('.new-address').val(address);
  $(".new-label").val('Property' + newIndex);
  newLat = lat;
  newLng = lng;
});

// $('#map').on('click', '.new-property-btn', function() {
//   var address = $(this).parent().find('.address').html();
//   console.log($(this).parent().find('.lat').html());
//   console.log($(this).parent().find('.lng').html());
//   console.log($(this).parent().find('.type').html());
//   console.log($(this).parent().find('.size').html());
//   // newProperty();
// });



//=============================================================================
//Display User's already saved Shortlisted Properties
var displayProperties = function(properties){
  properties.forEach(function(property){
    var lat = property.latitude;
    var lng = property.longitude;
    var label = property.label;
    var size = property.size;
    var address = property.address;
    var type = property.type;
    var icon = "http://www.clker.com/cliparts/U/Q/d/9/V/E/orange-pin.svg";
    map.addMarker({
    lat:   lat,
    lng:   lng,
    title: label,
    icon : {
                scaledSize : new google.maps.Size(60, 60),
                url : icon
              },
    // click: function(e) {},
    infoWindow: {
        content: '<p>Label: '    + label   + '</p>' +
                 '<p>Address: '  + address + '</p>' + 
                 '<p>Type: '     + type    + '</p>' +
                 '<p>Size: '     + size    + '</p>'

        // content : content
      }
    });
  });
}
var options = {
  url: 'http://localhost:3000/properties'
}
$.ajax(options).done(displayProperties);

// --------  End Display User's Shortlisted Properties --------
