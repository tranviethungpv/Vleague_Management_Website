var geocoder = new MapboxGeocoder({
    accessToken: 'pk.eyJ1IjoiYnV0dHR0dCIsImEiOiJjbGZxbWoxbG8wMHRrM29wcGo4eHhjaXZlIn0.B4Q3rzrDnF9D7F0SHejlMw', // Thay thế bằng access token của bạn
    mapboxgl: mapboxgl, // Tham chiếu đến đối tượng mapboxgl
    marker: false, // Tắt hiển thị đánh dấu lên bản đồ khi tìm kiếm
});

// Thêm control tìm kiếm vào bản đồ
map.addControl(geocoder, "top-left");

geocoder.on('result', function (e) {
    // Lấy thông tin địa chỉ đầy đủ từ kết quả đảo ngược địa chỉ
    var fullAddress = e.result.place_name;
    var postalCode = e.result.context.find(c => c.id.startsWith('postcode'));
    var country = e.result.context.find(c => c.id.startsWith('country'));
    var longitude = e.result.center[0];
    var latitude = e.result.center[1];

    // Kiểm tra và in thông tin địa chỉ lên console
    console.log('Full Address:', fullAddress);
    document.getElementById('location').innerHTML = fullAddress;
    if (postalCode) {
        console.log('Postal Code:', postalCode.text);
        document.getElementById('postal_code').innerHTML = postalCode.text;
    }
    if (country) {
        console.log('Country:', country.text);
        document.getElementById('country').innerHTML = country.text;
    }
    console.log('Latitude:', latitude);
    document.getElementById('lat').innerHTML = latitude;
    console.log('Longitude:', longitude);
    document.getElementById('lon').innerHTML = longitude;
});

map.on('contextmenu', function (e) {
    // Lấy tọa độ từ sự kiện click trên bản đồ
    var coordinates = e.lngLat;

    // Gửi yêu cầu API của Mapbox để lấy thông tin địa chỉ dựa trên tọa độ

    document.getElementById('postal_code').innerHTML = ""
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json?access_token=pk.eyJ1IjoiYnV0dHR0dCIsImEiOiJjbGZxbWoxbG8wMHRrM29wcGo4eHhjaXZlIn0.B4Q3rzrDnF9D7F0SHejlMw`)
        .then(response => response.json())
        .then(data => {
            // Lấy kết quả trả về
            var features = data.features;
            if (features && features.length > 0) {
                var result = features[0];

                // Lấy thông tin postal code và các thông tin khác từ kết quả

                var fullAddress = result.place_name;

                var postalCode = null;
                var country = '';

                if (result.context) {
                    var postalCodeContext = result.context.find(c => c.id.startsWith('postcode'));
                    if (postalCodeContext) {
                        postalCode = postalCodeContext.text;
                    }

                    var countryContext = result.context.find(c => c.id.startsWith('country'));
                    if (countryContext) {
                        country = countryContext.text;
                    }
                }

                var longitude = result.center[0];
                var latitude = result.center[1];

                // In thông tin địa chỉ lên console
                console.log('Full Address:', fullAddress);
                document.getElementById('location').innerHTML = fullAddress
                console.log('Country:', country);
                document.getElementById('country').innerHTML = country
                console.log('Latitude:', latitude);
                document.getElementById('lat').innerHTML = latitude
                console.log('Longitude:', longitude);
                document.getElementById('lon').innerHTML = longitude
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});