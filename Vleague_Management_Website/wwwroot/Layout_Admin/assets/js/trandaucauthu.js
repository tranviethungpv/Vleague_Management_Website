$(document).ready(function () {
    getAllTrandaucauthu();
});

function getAllTrandaucauthu() {
    /*table = table + '<td>' + ' <button type="button" class="btn btn-gradient-info btn-rounded btn-icon' + '" onclick="updateTranDauFill(\'' + response[i].tranDauId.trim() + '\')"><i class="mdi mdi-table-edit"></i></button> ' + '</td>';*/
    $.ajax({
        url: "https://localhost:7239/api/APITranDauCauThu?pageSize=10&pagenumber=1",
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
                table = table + '<td>' + response[i].tranDauId.trim() + '</td>';
                table = table + '<td>' + response[i].cauThuId +'</td>';
                table = table + '<td>' + response[i].thoiGianBatDau +'</td>';
                table = table + '<td>' + response[i].thoiGianKetThuc + '</td>';
                table = table + '<td>' + response[i].phamLoi + '</td>';
                table = table + '<td>' + response[i].theVang + '</td>';
                table = table + '<td>' + response[i].theDo + '</td>';
                table = table + '<td>' + ' <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon' +  '" onclick="deleteTranDau(\'' + response[i].tranDauId.trim() + '\')"><i class="mdi mdi-delete-forever"></i></button> ' + '</td>';
            }
            document.getElementById('tbody-trandau').innerHTML = table;
        },
        fail: function (response) {
            console.log("fail");
        }
    });
}

function deleteTranDau(id) {
    var url = 'https://localhost:7239/api/APITranDauCauThu?matrandau=' + id;
    $.ajax({
        url: url,
        method: 'DELETE',
        contentType: 'json',
        dataType: 'json',
        error: function (response) {
            alert("Xóa không thành công");
        },
        success: function (response) {
            alert("Xóa thành công");
            getAllTrandaucauthu();
        }
    });
}
