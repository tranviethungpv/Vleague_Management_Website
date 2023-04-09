$(document).ready(function () {
    getAllCauThu();
});

function getAllCauThu() {
    $.ajax({
        url: "https://localhost:7239/api/APICauThu?pageSize=10&pagenumber=1",
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
                const date = new Date(response[i].ngaysinh);
                var day = date.getDate();
                var month = date.getMonth() + 1;
                var year = date.getFullYear();
                var hour = date.getHours();
                var minute = date.getMinutes();
                table = table + '<tr>';
                table = table + '<td>' + response[i].cauThuId.trim() + '</td>';
                table = table + '<td>' + response[i].hoVaTen.trim() + '</td>';
                table = table + '<td>' + response[i].clbid.trim() + '</td>';
                table = table + '<td>' + day + "/" + month + "/" + year + " " + hour + ':' + minute + '</td>';
                table = table + '<td>' + response[i].viTri.trim() + '</td>';
                table = table + '<td>' + response[i].quocTich.trim() + '</td>';
                table = table + '<td>' + response[i].soAo + '</td>';
                table = table + '<td>' + response[i].canNang + '</td>';
                table = table + '<td>' + response[i].chieuCao + '</td>';
                table = table + '<td>' + response[i].anhdaidien.trim() + '</td>';
                table = table + '<td>' + ' <button type="button" class="btn btn-gradient-info btn-rounded btn-icon" onclick="updateCauThuFill(\'' + response[i].cauThuId.trim() + '\')"><i class="mdi mdi-table-edit"></i></button> ' + '</td>';
                table = table + '<td>' + ' <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onclick="deleteCauThu(\'' + response[i].cauThuId.trim() + '\')"><i class="mdi mdi-delete-forever"></i></button> ' + '</td>';
            }
            document.getElementById('tbody-cauthu').innerHTML = table;
        },
        fail: function (response) {
            console.log("fail");
        }
    });
}

$("#form-cauthu").submit(function (e) {
    e.preventDefault();
})

function resetInput() {
    $("#CauThuID").val("")
    $("#hoten").val("").change()
    $("#clbid").val("").change()
    $("#ngaysinh:text").val("")
    $("#vitri").val("").change()
    $("#country").val("").change()
    $("#soao").val("")
    $("#cannang").val("")
    $("#chieucao").val("")
    $("#anhdaidien").val("").change()
}

function InsertCauThu() {

    var dataSend = {
        cauThuId: $("#CauThuId").val(),
        hoVaTen: $("#hoten").val(),
        cauLacBoId: $("#clbid").val(),
        ngaySinh: $("#ngaysinh").val(),
        vitri: $("#vitri").val(),
        quocTich: $("#country").val(),
        soAo: $("#soao").val(),
        canNang: parseFloat($("#cannang").val()),
        ChieuCao: parseFloat($("#chieucao").val()),
        anhDaiDien: $("#anhdaidien").val(),
    }
    var url = 'https://localhost:7239/api/APICauThu';
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
            getAllCauThu(); //Gọi đến hàm lấy dữ liệu lên bảng
        }
    });
}

function UpdateCauThu() {
    var dataSend = {
        cauThuId: $("#CauThuId").val(),
        hoVaTen: $("#hoten").val(),
        cauLacBoId: $("#clbid").val(),
        ngaySinh: $("#ngaysinh").val(),
        vitri: $("#vitri").val(),
        quocTich: $("#country").val(),
        soAo: $("#soao").val(),
        canNang: parseFloat($("#cannang").val()),
        ChieuCao: parseFloat($("#chieucao").val()),
        anhDaiDien: $("#anhdaidien").val(),
    }
    var url = 'https://localhost:7239/api/APICauThu';
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
            getAllCauThu();
        }
    });
}

function updateCauThuFill(id) {
    var url = 'https://localhost:7239/api/APICauThu/getById?id=' + id;
    $.ajax({
        url: url,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (response) {
            alert("Cập nhật không thành công");
        },
        success: function (response) {
            $("#CauThuId").val(response.cauThuId.trim())
            $("#hoten").val(response.hoVaTen.trim()).change()
            $("#clbid").val(response.cauLacBoId.trim()).change()
            $("#ngaysinh:text").val(response.ngaysinh)
            $("#vitri").val(response.viTri.trim()).change()
            $("#country").val(response.quocTich.trim()).change()
            $("#soao").val(response.soAo.trim()).change()
            $("#cannang").val(response.canNang)
            $("#chieucao").val(response.chieuCao)
            $("#anhdaidien").val(response.anhdaidien.trim()).change()
        }
    });
}

function deleteCauThu(id) {
    var url = 'https://localhost:7239/api/APICauThu?input=' + id;
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
            getAllCauThu(); //Gọi đến hàm lấy dữ liệu lên bảng
        }
    });
}