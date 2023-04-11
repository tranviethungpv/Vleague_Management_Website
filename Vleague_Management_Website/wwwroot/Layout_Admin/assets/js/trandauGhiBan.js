$(document).ready(function () {
    getAllMatchDone();
});

function getAllMatchDone() {
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
                if (response[i].trangThai === false) { // Only append the table row if trangThai is false
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
                    table = table + '<td>' + '<div class="mdi mdi-close badge badge-danger"> </div>' + '</td>';
                    table = table + '<td>' + ' <button type="button" class="btn btn-gradient-info btn-rounded btn-icon" onclick="getCauThuTranDau(\'' + response[i].tranDauId.trim() + '\')"><i class="mdi mdi-table-edit"></i></button> ' + '</td>';
                    table = table + '</tr>';
                }
            }
            document.getElementById('tbody-ghiban').innerHTML = table;
        },
        fail: function (response) {
            console.log("fail");
        }
    });
}


$("#form-banthang").submit(function (e) {
    e.preventDefault();
})

function resetInput() {
    $("#TranDauId").val("")
    $("#BanThangId").val("").change()
    $("#ClbId").val("").change()
    $("#CauThuId:text").val("")
    $("#ThoiDiemGhiBan").val("").change()
}

function getCauThuTranDau(id) {
    var url = 'https://localhost:7239/api/APITranDauGhiBan/GetCauThuTranDau?id=' + id;
    $.ajax({
        url: url,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (response) {
            alert("Cập nhật không thành công");
        },
        success: function (response) {
            const len = response.length;
            let table = '';

            for (var i = 0; i < len; ++i) {
                table += `<tr>
                                <td class="py-1">
                                    <img src="../../Images/Players/${!!response[i].anhdaidien ? response[i].anhdaidien.trim() : 'default-avatar.png'}" alt="image" />
                                </td>
                                <td> ${response[i].hoVaTen} </td>
                                <td> ${response[i].cauLacBoId.trim()} </td>
                                <td> <button type="button" class="btn btn-gradient-info btn-rounded btn-icon" onclick="fillTranDauCauThu('${response[i].cauThuId.trim()}','${id}')"><i class="mdi mdi-table-edit"></i></button> </td>
                            </tr>`
            }
            document.getElementById('tbody-cauthutrandau').innerHTML = table;
        },
    });
}

function fillTranDauCauThu(cauThuId, tranDauId) {
    var url = 'https://localhost:7239/api/APITranDauGhiBan/getById?trandauid=' + tranDauId + '&cauthuid=' + cauThuId;
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
            $("#ClbId").val(response.cauLacBoId.trim())
            $("#CauThuId").val(response.cauThuId.trim())
        }
    });
}

function InsertTranDauGhiBan() {

    var dataSend = {
        TranDauId: $("#TranDauId").val(),
        GhiBanId: $("#BanThangId").val(),
        CauLacBoId: $("#ClbId").val(),
        CauThuId: $("#CauThuId").val(),
        ThoiDiemGhiBan: $("#ThoiDiemGhiBan").val()
    }
    var url = 'https://localhost:7239/api/APITranDauGhiBan';
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
        }
    });
}

function UpdateTranDauGhiBan() {
    var dataSend = {
        TranDauId: $("#TranDauId").val(),
        GhiBanId: $("#BanThangId").val(),
        CauLacBoId: $("#ClbId").val(),
        CauThuId: $("#CauThuId").val(),
        ThoiDiemGhiBan: $("#ThoiDiemGhiBan").val()
    }
    var url = 'https://localhost:7239/api/APITranDauGhiBan';
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
            getAllTrandau();
        }
    });
}

function DeleteTranDauGhiBan() {
    var id = $("#BanThangId").val()
    var url = 'https://localhost:7239/api/APITranDauGhiBan?input=' + id;
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