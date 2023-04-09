$(document).ready(function () {
    getAllSVD();
});

function getAllSVD() {
    $.ajax({
        url: "https://localhost:7239/api/APISVD?pageSize=10&pagenumber=1",
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
                table = table + '<td>' + response[i].sanVanDongId.trim() + '</td>';
                table = table + '<td>' + response[i].tenSan.trim() + '</td>';
                table = table + '<td>' + response[i].thanhPho.trim() + '</td>';
                table = table + '<td>' + response[i].namBatDau + '</td>';
                table = table + '<td>' + ' <button type="button" class="btn btn-gradient-info btn-rounded btn-icon" onclick="updateSVDFill(\'' + response[i].sanVanDongId.trim() + '\')"><i class="mdi mdi-table-edit"></i></button> ' + '</td>';
                table = table + '<td>' + ' <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onclick="deleteSVD(\'' + response[i].sanVanDongId.trim() + '\')"><i class="mdi mdi-delete-forever"></i></button> ' + '</td>';
            }
            document.getElementById('tbody-sanvandong').innerHTML = table;
        },
        fail: function (response) {
            console.log("fail");
        }
    });
}

$("#form-sanvandong").submit(function (e) {
    e.preventDefault();
})

function resetInput() {
    $("#SanVanDongId").val("")
    $("#TenSan").val("").change()
    $("#ThanhPho").val("").change()
    $("#NamBatDau").val("").change()
}

function InsertSVD() {

    var dataSend = {
        sanVanDongId: $("#SanVanDongId").val(),
        tenSan: $("#TenSan").val(),
        thanhPho: $("#ThanhPho").val(),
        namBatDau: $("#NamBatDau").val(),
    }
    var url = 'https://localhost:7239/api/APISVD';
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
            resetInput()
            getAllSVD(); //Gọi đến hàm lấy dữ liệu lên bảng
        }
    });
}

function UpdateSVD() {
    var dataSend = {
        sanVanDongId: $("#SanVanDongId").val(),
        tenSan: $("#TenSan").val(),
        thanhPho: $("#ThanhPho").val(),
        namBatDau: $("#NamBatDau").val(),
    }
    var url = 'https://localhost:7239/api/APISVD';
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
            resetInput()
            getAllSVD();
        }
    });
}

function updateSVDFill(id) {
    var url = 'https://localhost:7239/api/APISVD/getById?id=' + id;
    $.ajax({
        url: url,
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        error: function (response) {
            alert("Cập nhật không thành công");
        },
        success: function (response) {
            $("#SanVanDongId").val(response.sanVanDongId.trim())
            $("#TenSan").val(response.tenSan.trim()).change()
            $("#ThanhPho").val(response.thanhPho.trim()).change()
            $("#NamBatDau").val(response.namBatDau).change()
        }
    });
}

function deleteSVD(id) {
    var url = 'https://localhost:7239/api/APISVD?input=' + id;
    $.ajax({
        url: url,
        method: 'DELETE',
        success: function (response) {
            alert("Xóa thành công");
            getAllSVD(); //Gọi đến hàm lấy dữ liệu lên bảng
        },
        error: function (response) {
            alert("Xóa không thành công");
        }
    });
}
