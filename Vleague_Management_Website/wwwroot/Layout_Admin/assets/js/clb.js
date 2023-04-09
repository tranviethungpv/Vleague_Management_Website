$(document).ready(function () {
    getAllCLB();
});

function getAllCLB() {
    $.ajax({
        url: "https://localhost:7239/api/APICLB?pageSize=10&pagenumber=1",
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
                table = table + '<td>' + response[i].cauLacBoId.trim() + '</td>';
                table = table + '<td>' + response[i].tenClb.trim() + '</td>';
                table = table + '<td>' + response[i].tenGoi.trim() + '</td>';
                table = table + '<td>' + response[i].tenSan.trim() + '</td>';
                table = table + '<td>' + response[i].tenHlv.trim() + '</td>';
                table = table + '<td>' + ' <button type="button" class="btn btn-gradient-info btn-rounded btn-icon" onclick="updateCLBFill(\'' + response[i].cauLacBoId.trim() + '\')"><i class="mdi mdi-table-edit"></i></button> ' + '</td>';
                table = table + '<td>' + ' <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onclick="deleteCLB(\'' + response[i].cauLacBoId.trim() + '\')"><i class="mdi mdi-delete-forever"></i></button> ' + '</td>';
            }
            document.getElementById('tbody-CLB').innerHTML = table;
        },
        fail: function (response) {
            console.log("fail");
        }
    });
}

$("#form-CLB").submit(function (e) {
    e.preventDefault();
})

function resetInput() {
    $("#CauLacBoId").val("");
    $("#TenCLB").val("").change();
    $("#TenGoi").val("").change();
    $("#TenSan").val("").change();
    $("#TenHLV").val("").change();
}

function InsertCLB() {

    var dataSend = {
        cauLacBoId: $("#CauLacBoId").val(),
        tenClb: $("#TenCLB").val(),
        tenGoi: $("#TenGoi").val(),
        sanVanDongId: $("#TenSVD").val(),
        huanLuyenVienId: $("#TenHLV").val(),
    }
    var url = 'https://localhost:7239/api/APICLB';
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
            getAllCLB(); //Gọi đến hàm lấy dữ liệu lên bảng
        }
    });
}

function UpdateCLB() {
    var dataSend = {
        cauLacBoId: $("#CauLacBoId").val(),
        tenClb: $("#TenCLB").val(),
        tenGoi: $("#TenGoi").val(),
        sanVanDongId: $("#TenSVD").val(),
        huanLuyenVienId: $("#TenHLV").val(),
    }
    var url = 'https://localhost:7239/api/APICLB';
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
            getAllCLB();
        }
    });
}

function updateCLBFill(id) {
    var url = 'https://localhost:7239/api/APICLB/getById?id=' + id;
    $.ajax({
        url: url,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (response) {
            alert("Cập nhật không thành công");
        },
        success: function (response) {
            $("#CauLacBoId").val(response.cauLacBoId.trim())
            $("#TenCLB").val(response.tenClb.trim())
            $("#TenGoi").val(response.tenGoi.trim())
            $("#TenSVD").val(response.sanVanDongId.trim()).change()
            $("#TenHLV").val(response.huanLuyenVienId.trim()).change()
        }
    });
}

function deleteCLB(id) {
    var url = 'https://localhost:7239/api/APICLB?input=' + id;
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
            getAllCLB(); //Gọi đến hàm lấy dữ liệu lên bảng
        }
    });
}