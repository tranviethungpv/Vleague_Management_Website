$(document).ready(function () {
    getAllUsers();
});

function getAllUsers() {
    $.ajax({
        url: "https://localhost:7239/api/APIUser?pageSize=10&pagenumber=1",
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (response) {
            console.log("error");
        },
        success: function (response) {
            const len = response.length;
            let table = '';
            for (var i = 0; i < len; ++i) {
                
                table = table + '<tr>';
                table = table + '<td>' + response[i].nguoiDungId + '</td>';
                table = table + '<td>' + response[i].hoTen + '</td>';
                table = table + '<td>' + response[i].sđt + '</td>';
                table = table + '<td>' + response[i].email + '</td>';
                table = table + '<td>' + response[i].tenDangNhap + '</td>';
  
            }
            document.getElementById('tbody-nguoidung').innerHTML = table;
        },
        fail: function (response) {
            console.log("fail");
        }
    });
}