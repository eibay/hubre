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
    var index = map.markers.length;
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    var template = $('#edit_marker_template').text();
    // var content = template.replace(/{{index}}/g, index).replace(/{{lat}}/g, lat).replace(/{{lng}}/g, lng);
    var content = "<div><p>Label</p>";
    content += "<p class='address'>Address</p>";
    content += "<p>Latitude: <span class='lat'>"+lat+"</span></p>";
    content += "<p>Longitude: <span class='lng'>"+lng+"</span></p>";
    content += "<p class='type'>Type:</p>";
    content += "<p class='size'>Size meters:</p>";
    content += "<button class='new-property-btn'>Save Property</button><div>";

    map.addMarker({
      lat: lat,
      lng: lng,
      title: 'Property: #' + index,
      infoWindow: {
        content : content
      }
    });
    // $('#new-property-btn').on('click', function() {
    //   newProperty(sdfs);
    // });
  });
});
//Display User's Shortlisted Properties
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
var options = {
  url: 'http://localhost:3000/properties'
}
$.ajax(options).done(displayProperties);

// --------  End Display User's Shortlisted Properties --------
//Search Function
// Create the search box and link it to the UI element.
function initAutocomplete() {
  // map = new GMaps({
  //   div: '#map',
  //   lat: -37.8131869,
  //   lng: 144.9629796,
  //   zoom: 11
  // });
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // // Bias the SearchBox results towards current map's viewport.
  // map.addListener('bounds_changed', function() {
  //   searchBox.setBounds(map.getBounds());
  // });
}
  // var markers = [];
  // // [START region_getplaces]
  // // Listen for the event fired when the user selects a prediction and retrieve
  // // more details for that place.
  // searchBox.addListener('places_changed', function() {
  //   var places = searchBox.getPlaces();
  //   if (places.length == 0) {
  //     return;
  //   }
  //   // Clear out the old markers.
  //   markers.forEach(function(marker) {
  //     marker.setMap(null);
  //   });
  //   markers = [];
  //   // For each place, get the icon, name and location.
  //   var bounds = new google.maps.LatLngBounds();
  //   places.forEach(function(place) {
  //     var icon = {
  //       url: place.icon,
  //       size: new google.maps.Size(71, 71),
  //       origin: new google.maps.Point(0, 0),
  //       anchor: new google.maps.Point(17, 34),
  //       scaledSize: new google.maps.Size(25, 25)
  //     };
  //     // Create a marker for each place.
  //     markers.push(new google.maps.Marker({
  //       map: map,
  //       icon: icon,
  //       title: place.name,
  //       position: place.geometry.location
  //     }));
  //     if (place.geometry.viewport) {
  //       // Only geocodes have viewport.
  //       bounds.union(place.geometry.viewport);
  //     } else {
  //       bounds.extend(place.geometry.location);
  //     }
  //   });
  //   map.fitBounds(bounds);
  // });
// }
//Adding New Property
var newProperty = function(address, lat, lng, type, size){
  var label = "Tester for new button";
  console.log('I got this far')
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
  });
}
$('#map').on('click', '.new-property-btn', function() {
  var address = $(this).parent().find('.address').html();
  var lat = $(this).parent().find('.lat').html();
  var lng = $(this).parent().find('.lng').html();
  var type = $(this).parent().find('.type').html();
  var size = $(this).parent().find('.size').html();
  newProperty(address, lat, lng, type, size);
});


