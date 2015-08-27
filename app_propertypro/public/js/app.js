var map;
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
//========================================================================================================================
var geocoder = new google.maps.Geocoder;
var newLat; 
var newLng;
//GEOCoder Processing
var geocodeLatLng = function(geocoder, map, infowindow, lat, lng, index) {
  var latlng = {lat: lat, lng: lng};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
            var address = results[1].formatted_address;
            var index = map.markers.length;
            var content = "<div>";
            content += "<p>Label: <input type='text' class='pin-label'> </p>";
            content += "<p class='pin-address'>Address "+address+"</p>";
            content += "<p class='type'>Type:</p>";
            content += "<p>Size: <input class='pin-size'> m</p>";
            content += "<button class='new-property-btn'>Save Property</button>";
            content += "</div>";
<<<<<<< HEAD
=======

>>>>>>> 963d66f2e81ec080f1af6c62fd9561b5208c17ef
            map.addMarker({
              lat: lat,
              lng: lng,
              title: 'Property: #' + index,
              infoWindow: {
                content : content
              }
            });
<<<<<<< HEAD
=======

>>>>>>> 963d66f2e81ec080f1af6c62fd9561b5208c17ef
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}
<<<<<<< HEAD
=======

>>>>>>> 963d66f2e81ec080f1af6c62fd9561b5208c17ef
//=======================================================================================
//Dropped pin function
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
  GMaps.on('click', map.map, function(event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    var template = $('#edit_marker_template').text();

    var infowindow = new google.maps.InfoWindow;

    // var content = template.replace(/{{index}}/g, index).replace(/{{lat}}/g, lat).replace(/{{lng}}/g, lng);
    newLng = lng;
    newLat = lat;
    address = geocodeLatLng(geocoder, map, infowindow, lat, lng);
    console.log(address);
    // $('#new-property-btn').on('click', function() {
    //   newProperty(sdfs);
    // });
  });
});
//========================================================================================================================
//Adding New Property
var newProperty = function(label, address, lat, lng, type, size){
  // type: type, 
  var data = {
    propertie: {
      label: label,
      address: address,
      latitude: lat, 
      longitude: lng,
      size: size
    }
  }
<<<<<<< HEAD
=======

>>>>>>> 963d66f2e81ec080f1af6c62fd9561b5208c17ef
    console.log(data)
  $.ajax({
    url: 'http://localhost:3000/properties',
    data: data,
    type: 'post'
  }).done(function(){
    alert('success saving');
  });
}
<<<<<<< HEAD
=======

>>>>>>> 963d66f2e81ec080f1af6c62fd9561b5208c17ef
$('#map').on('click', '.new-property-btn', function() {
  var label = $(this).parent().find('.pin-label').val();
  var address = $(this).parent().find('.pin-address').html();
  var lat = newLat;
  var lng = newLng;
  var type = $(this).parent().find('.type').html();
  var size = $(this).parent().find('.pin-size').val();
  newProperty(label, address, lat, lng, type, size);
});
<<<<<<< HEAD
=======

>>>>>>> 963d66f2e81ec080f1af6c62fd9561b5208c17ef
//===========SAVED PROPERTIES========================================================================
//Display User's Shortlisted Properties
var options = {
  url: 'http://localhost:3000/properties'
}
var displayProperties = function(properties){
  properties.forEach(function(property){
    var lat = property.latitude;
    var lng = property.longitude;
    var label = property.label;
    var size = property.size;
    // var icon = "http://www.clker.com/cliparts/0/V/t/A/W/N/google-maps-gris.svg";
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
        content: '<p>Name: '     + label + '</p>' + 
                 '<p>Size: '     + size  + '</p>' +
                 '<p>Latitude: ' + lat   + '</p>' +
                 '<p>Longitude: '+ lng   + '</p>'
        // content : content
      }
    });
  });
}
<<<<<<< HEAD
=======

>>>>>>> 963d66f2e81ec080f1af6c62fd9561b5208c17ef
$.ajax(options).done(displayProperties);
//===========================================================================================
// Not currently in use
//Search Function
function initAutocomplete() {
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
}
<<<<<<< HEAD
//===========================================================================================
=======
//===========================================================================================
>>>>>>> 963d66f2e81ec080f1af6c62fd9561b5208c17ef
