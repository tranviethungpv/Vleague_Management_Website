mapboxgl.accessToken = 'pk.eyJ1IjoiYnV0dHR0dCIsImEiOiJjbGZxbWoxbG8wMHRrM29wcGo4eHhjaXZlIn0.B4Q3rzrDnF9D7F0SHejlMw';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [105.85, 21.0], //Tọa độ lãnh thổ Việt Nam
    zoom: 2, // starting zoom
});
var marker = new mapboxgl.Marker({
    color: "red", //Màu của Marker là đỏ
    draggable: true,
    anchor: 'bottom', //Nhãn Hà Nội nằm dưới Marker
}).setLngLat([105.85, 21.0]) //Thiết lập Marker tại hà Nội
    .addTo(map);
map.addControl(new mapboxgl.NavigationControl());

//vị trí 
map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
}));

//full screen
map.addControl(new mapboxgl.FullscreenControl());
// ngon ngu~
document.getElementById('buttons').addEventListener('click', (event) => {
    const language = event.target.id.substr('button-'.length);
    // Use setLayoutProperty to set the value of a layout property in a style layer.
    // The three arguments are the id of the layer, the name of the layout property,
    // and the new property value.
    map.setLayoutProperty('country-label', 'text-field', [
        'get',
        `name_${language}`
    ]);
});
//them marker khi click

var marker = null; // Biến lưu trữ đối tượng Marker hiện tại

map.on('contextmenu', function (e) {
    // Xóa Marker trước đó (nếu có)
    if (marker) {
        marker.remove();
    }

    // Lấy tọa độ của vị trí click
    var coordinates = e.lngLat;

    // Tạo đối tượng Marker và thêm vào bản đồ
    marker = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map);
});


// chỉ đường 
// Khởi tạo đối tượng MapboxDirections
var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    profile: 'mapbox/driving-traffic',
    interactive: true,
});

// Thêm đối tượng MapboxDirections vào bản đồ
map.addControl(directions, 'bottom-left');
directions.setOrigin([longitude1, latitude1]);
directions.setDestination([longitude2, latitude2]);
