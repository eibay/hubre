var map;

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
            var content = "<div class='pins'>";
            content += "<input type='text' class='pin-label' placeholder='Label'>";
            content += "<p>Address: <span class='pin-address'>"+address+"</span></p>";
            content += "<input type='text' class='pin-note' placeholder='Notes / Listing Hyperlink'>";
            content += "<p>Type: "
            content += "<select class='pin-type'><option>Apartment</option>";
            content += "<option>Townhouse</option>";
            content += "<option>House</option>";
            content += "<option>Land</option></select></p>";
            content += "<p class='pin-size'>Size: <input class='pin-size-input' placeholder='Meters'></p>";
            content += "<button class='new-property-btn'>Save</button>";
            content += "</div>";
            map.addMarker({
              lat: lat,
              lng: lng,
              title: 'Property: #' + index,
              infoWindow: {
                content : content
              }
            });

      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}

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
    // $('#markers-with-coordinates').append('<li><a href="#" class="pan-to-marker" data-marker-lat="' + marker.getPosition().lat() + '" data-marker-lng="' + marker.getPosition().lng() + '">' + marker.title + '</a></li>');
  });
  GMaps.on('click', map.map, function(event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    var template = $('#edit_marker_template').text();

    var infowindow = new google.maps.InfoWindow;
    newLng = lng;
    newLat = lat;
    address = geocodeLatLng(geocoder, map, infowindow, lat, lng);
  });
});
//========================================================================================================================
//Adding New Property
var newProperty = function(label, address, lat, lng, proptype, size, note){
  // type: type, 
  var data = {
    propertie: {
      label: label,
      address: address,
      latitude: lat, 
      longitude: lng,
      size: size,
      proptype: proptype,
      note: note
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

$('#map').on('click', '.new-property-btn', function() {
  var label = $(this).parent().find('.pin-label').val();
  var address = $(this).parent().find('.pin-address').html();
  var lat = newLat;
  var lng = newLng;
  var proptype = $(this).parent().find('.pin-type').val();
  var size = $(this).parent().find('.pin-size-input').val();
  var note = $(this).parent().find('.pin-note').val();
  newProperty(label, address, lat, lng, proptype, size, note);
});

//===========SAVED PROPERTIES========================================================================
//Display User's Shortlisted Properties
var options = {
  url: 'http://localhost:3000/properties'
}
var displayProperties = function(properties){
  properties.forEach(function(property){
    var label = property.label;
    var address = property.address;
    var note = property.note;
    var lat = property.latitude;
    var lng = property.longitude;
    var size = property.size;
    var proptype = property.proptype;
    // var icon = "http://www.clker.com/cliparts/0/V/t/A/W/N/google-maps-gris.svg";
    var icon = "http://www.clker.com/cliparts/U/Q/d/9/V/E/orange-pin.svg";
    var content = "<div class='existing-pins'>";
    content += "<p class='existing-pins-label'>"+label+"</p>";
    content += "<p>Address: <span class='existing-pins-address'>"+address+"</span></p>";
    content += "<p>Notes: <span class='existing-pins-note'>"+note+"</span></p>";
    content += "<p>Type: <span class='existing-pins-type'>"+proptype+"</span></p>";
    content += "<p>Size: <span class='existing-pins-size'>"+size+"</span> m2</p>";
    content += "</div>";

    map.addMarker({
    lat:   lat,
    lng:   lng,
    title: label,
    icon : {
              scaledSize : new google.maps.Size(60, 60),
              url : icon
            },
    infoWindow: {
        content : content
      }
    });
    // $('#saved-property-list').append('<li><a href="#" class="pan-to-marker" data-marker-lat="' + marker.getPosition().lat() + '" data-marker-lng="' + marker.getPosition().lng() + '">' + marker.title + '</a></li>');
    $('#saved-property-list').append('<div class="save-sidebar">'+content+'</div>');
 
  });
}

$.ajax(options).done(displayProperties);
//===========================================================================================
// Not currently in use
//Search Function
function initAutocomplete() {
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
}

