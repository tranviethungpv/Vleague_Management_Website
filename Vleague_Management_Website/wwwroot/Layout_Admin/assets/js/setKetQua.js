$(document).ready(function () {
    getAllTrandauKetQua();
});

function getAllTrandauKetQua() {
    $.ajax({
        url: "https://localhost:7239/api/APILichThiDau/getTranDauNotDone",
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
                if (!response[i].trangThai) {
                    const date = new Date(response[i].ngayThiDau);
                    var day = date.getDate();
                    var month = date.getMonth() + 1;
                    var year = date.getFullYear();
                    var hour = date.getHours();
                    var minute = date.getMinutes();
                    table = table + '<tr>';
                    table = table + '<td>' + response[i].tranDauId.trim() + '</td>';
                    table = table + '<td>' + day + "/" + month + "/" + year + " " + hour + ':' + minute + '</td>';
                    table = table + '<td>' + response[i].clbnha + '</td>';;
                    table = table + '<td>' + response[i].clbkhach + '</td>';
                    table = table + '<td>' + response[i].tenSan + '</td>';
                    table = table + '<td>' + response[i].vong + '</td>';
                    table = table + '<td>' + (!!response[i].ketQua ? response[i].ketQua : "") + '</td>';
                    table = table + '<td>' + (!!response[i].trangThai ? '<div class="mdi mdi mdi-check badge badge-success"> </div>' : '<div class="mdi mdi-close badge badge-danger"> </div>') + '</td>';
                    table = table + '<td>' + ' <button type="button" class="btn btn-gradient-info btn-rounded btn-icon' + (!!response[i].trangThai ? ' disabled' : '') + '" onclick="updateKetQuaFill(\'' + response[i].tranDauId.trim() + '\')"><i class="mdi mdi-table-edit"></i></button> ' + '</td>';
                }
            }
            document.getElementById('tbody-ketqua').innerHTML = table;
        },
        fail: function (response) {
            console.log("fail");
        }
    });
}

$("#form-ketqua").submit(function (e) {
    e.preventDefault();
})

function resetInputKetQua() {
    $("#TranDauId").val("")
    $("#TiSoDoiNha").val("")
    $("#TiSoDoiKhach").val("")
}

function UpdateKetQua() {
    var dataSend = {
        TranDauId: $("#TranDauId").val(),
        DoiNha: $("#TiSoDoiNha").val(),
        DoiKhach: $("#TiSoDoiKhach").val()
    }
    var url = 'https://localhost:7239/api/APILichThiDau/setKetQua';
    $.ajax({
        url: url,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(dataSend),
        dataType: 'json',
        error: function (response) {
            alert("Cập nhật không thành công");
        },
        success: function (response) {
            alert("Cập nhật thành công");
            resetInputKetQua()
            getAllTrandauKetQua();
        }
    });
}

function updateKetQuaFill(id) {
    var url = 'https://localhost:7239/api/APILichThiDau/getById?id=' + id;
    $.ajax({
        url: url,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (response) {
            alert("Cập nhật không thành công");
        },
        success: function (response) {
            $("#TranDauId").val(response.tranDauId.trim())
        }
    });
}