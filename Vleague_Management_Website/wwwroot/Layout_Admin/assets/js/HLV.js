$(document).ready(function () {
    getAllHLV();
});

function getAllHLV() {
    $.ajax({
        url: "https://localhost:7239/api/APIHuanLuyenVien?pageSize=10&pagenumber=1",
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
                table = table + '<td>' + response[i].huanLuyenVienId.trim() + '</td>';
                table = table + '<td>' + response[i].tenHlv.trim() + '</td>';
                table = table + '<td>' + response[i].namSinh + '</td>';
                table = table + '<td>' + response[i].quocTich.trim() + '</td>';
                table = table + '<td>' + ' <button type="button" class="btn btn-gradient-info btn-rounded btn-icon" onclick="updateHuanLuyenVien(\'' + response[i].huanLuyenVienId.trim() + '\')"><i class="mdi mdi-table-edit"></i></button> ' + '</td>';
                table = table + '<td>' + ' <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onclick="deleteHuanLuyenVien(\'' + response[i].huanLuyenVienId.trim() + '\')"><i class="mdi mdi-delete-forever"></i></button> ' + '</td>';
            }
            document.getElementById('tbody-HLV').innerHTML = table;
        },
        fail: function (response) {
            console.log("fail");
        }
    });
}

$("#form-huanluyenvien").submit(function (e) {
    e.preventDefault();
})

function resetInput() {
    $("#HuanLuyenVienId").val("")
    $("#tenhlv").val("").change()
    $("#year").val("").change()
    $("#country").val("").change()
}

function InsertHuanLuyenVien() {

    var dataSend = {
        huanLuyenVienId: $("#HuanLuyenVienId").val(),
        tenHlv: $("#tenhlv").val(),
        namSinh: parseInt($("#year").val()),
        quocTich: $("#country").val(),
    }
    var url = 'https://localhost:7239/api/APIHuanLuyenVien';
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
            getAllHLV(); //Gọi đến hàm lấy dữ liệu lên bảng
        }
    });
}

function UpdateHuanLuyenVien() {
    var dataSend = {
        huanLuyenVienId: $("#HuanLuyenVienId").val(),
        tenHlv: $("#tenhlv").val(),
        namSinh: parseInt($("#year").val()),
        quocTich: $("#country").val(),
    }
    var url = 'https://localhost:7239/api/APIHuanLuyenVien';
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
            getAllHLV();
        }
    });
}

function updateHuanLuyenVien(id) {
    var url = 'https://localhost:7239/api/APIHuanLuyenVien/getById?id=' + id;
    $.ajax({
        url: url,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (response) {
            alert("Cập nhật không thành công");
        },
        success: function (response) {
            $("#HuanLuyenVienId").val(response.huanLuyenVienId.trim())
            $("#tenhlv").val(response.tenHlv.trim()).change()
            $("#year").val(response.namSinh).change()
            $("#country").val(response.quocTich.trim()).change()
        }
    });
}

function deleteHuanLuyenVien(id) {
    var url = 'https://localhost:7239/api/APIHuanLuyenVien?input=' + id;
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
            getAllHLV(); //Gọi đến hàm lấy dữ liệu lên bảng
        }
    });
}