$(document).ready(function () {
    getAllTrandau();
});

function getAllTrandau() {
    $.ajax({
        url: "https://localhost:7239/api/APILichThiDau?pageSize=10&pagenumber=1",
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (response) {
            console.log(response);
        },
        success: function (response) {
            const len = response.length;
            console.log(response);
            let table = '';
            for (var i = 0; i < len; ++i) {
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
                table = table + '<td>' + ' <button type="button" class="btn btn-gradient-info btn-rounded btn-icon' + (!!response[i].trangThai ? ' disabled' : '') + '" onclick="updateTranDauFill(\'' + response[i].tranDauId.trim() + '\')"><i class="mdi mdi-table-edit"></i></button> ' + '</td>';
                table = table + '<td>' + ' <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon' + (!!response[i].trangThai ? ' disabled' : '') + '" onclick="deleteTranDau(\'' + response[i].tranDauId.trim() + '\')"><i class="mdi mdi-delete-forever"></i></button> ' + '</td>';
            }
            document.getElementById('tbody-trandau').innerHTML = table;
        },
        fail: function (response) {
            console.log(response);
        }
    });
}

$("#form-trandau").submit(function (e) {
    e.preventDefault();
})

function InsertTranDau() {
    
    var dataSend = {
        TranDauId: $("#TranDauId").val(),
        Clbnha: $("#ClbNha").val(),
        Clbkhach: $("#ClbKhach").val(),
        NgayThiDau: $("#ngaythidau").val(),
        SanVanDongId: $("#sanvandong").val(),
        Vong: parseInt($("#vong").val()),
    }
    console.log(dataSend);
    var url = 'https://localhost:7239/api/APILichThiDau';
    $.ajax({
        url: url,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(dataSend),
        dataType: 'json',
        error: function (error) {
            alert(JSON.stringify(error))
        },
        success: function (response) {
            alert("Thêm mới thành công");
            getAllTrandau(); //Gọi đến hàm lấy dữ liệu lên bảng
        }
    });
}

function updateTranDauFill(id) {
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
            $('input').eq(0).val(response.MaSP);
            $('input').eq(1).val(response.TenSP);
            $('input').eq(2).val(response.MoTa);
            $('input').eq(3).val(response.GiaNhap);
            $('input').eq(4).val(response.GiaBan);
            $('input').eq(5).val(response.SoLuong);
        }
    });
}

function deleteTranDau(id) {
    var url = 'https://localhost:7239/api/APILichThiDau?input=' + id;
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
            getAllTrandau(); //Gọi đến hàm lấy dữ liệu lên bảng
        }
    });
}