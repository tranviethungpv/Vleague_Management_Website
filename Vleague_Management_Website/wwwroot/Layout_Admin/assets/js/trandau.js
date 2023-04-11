$(document).ready(function () {
    getAllTrandau();
});


function getAllTrandau() {
    $.ajax({
        url: `https://localhost:7239/api/APILichThiDau`,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (response) {
            console.log("error");
        },
        success: function (response) {
            var count = parseInt(response.totalCount);
            const pageNumber = 1;
            const pageSize = 20;
            $.ajax({
                url: `https://localhost:7239/api/APILichThiDau/getPagination?pageSize=${pageSize}&pagenumber=${pageNumber}`,
                method: 'GET',
                contentType: 'json',
                dataType: 'json',
                error: function (response) {
                    console.log("error");
                },
                success: function (response) {
                    renderTable(response);
                    renderPagination(Math.ceil(count / pageSize), pageNumber);
                },
                fail: function (response) {
                    console.log("fail");
                }
            });
        },
    });
}

$("#form-trandau").submit(function (e) {
    e.preventDefault();
})

function resetInput() {
    $("#TranDauId").val("")
    $("#ClbNha").val("").change()
    $("#ClbKhach").val("").change()
    $("#ngaythidau:text").val("")
    $("#sanvandong").val("").change()
    $("#vong").val("")
}

function InsertTranDau() {
    
    var dataSend = {
        TranDauId: $("#TranDauId").val(),
        Clbnha: $("#ClbNha").val(),
        Clbkhach: $("#ClbKhach").val(),
        NgayThiDau: $("#ngaythidau").val(),
        SanVanDongId: $("#sanvandong").val(),
        Vong: parseInt($("#vong").val()),
    }
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
            resetInput()
            getAllTrandau(); //Gọi đến hàm lấy dữ liệu lên bảng
        }
    });
}

function UpdateTranDau() {
    var dataSend = {
        TranDauId: $("#TranDauId").val(),
        Clbnha: $("#ClbNha").val(),
        Clbkhach: $("#ClbKhach").val(),
        NgayThiDau: $("#ngaythidau").val(),
        SanVanDongId: $("#sanvandong").val(),
        Vong: parseInt($("#vong").val()),
    }
    var url = 'https://localhost:7239/api/APILichThiDau';
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
                $("#TranDauId").val(response.tranDauId.trim())
                $("#ClbNha").val(response.clbnhaId.trim()).change()
                $("#ClbKhach").val(response.clbkhachId.trim()).change()
                $("#ngaythidau:text").val(response.ngayThiDau)
                $("#sanvandong").val(response.sanvandongId.trim()).change()
                $("#vong").val(response.vong)
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

function renderPagination(totalPages, currentPage) {
    let pagination = '';
    for (let i = 1; i <= totalPages; i++) {
        pagination += `<button class="btn ${i === currentPage ? 'btn-primary' : 'btn-outline-primary'}" onclick="setPage(${i})">${i}</button> `;
    }
    document.getElementById('pagination_trandau').innerHTML = pagination;
}

function setPage(pageNumber) {
    const pageSize = 20;
    document.getElementById('page-number').innerHTML = pageNumber;
    $.ajax({
        url: `https://localhost:7239/api/APILichThiDau/getPagination?pageSize=${pageSize}&pagenumber=${pageNumber}`,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (response) {
            console.log("error");
        },
        success: function (response) {
            renderTable(response);
        },
        fail: function (response) {
            console.log("fail");
        }
    });
}

function renderTable(response) {
    const len = response.items.length;
    let table = '';
    for (var i = 0; i < len; ++i) {
        const date = new Date(response.items[i].ngayThiDau);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var hour = date.getHours();
        var minute = date.getMinutes();
        table = table + '<tr>';
        table = table + '<td>' + response.items[i].tranDauId.trim() + '</td>';
        table = table + '<td>' + day + "/" + month + "/" + year + " " + hour + ':' + minute + '</td>';
        table = table + '<td>' + response.items[i].clbnha + '</td>';;
        table = table + '<td>' + response.items[i].clbkhach + '</td>';
        table = table + '<td>' + response.items[i].tenSan + '</td>';
        table = table + '<td>' + response.items[i].vong + '</td>';
        table = table + '<td>' + (!!response.items[i].ketQua ? response.items[i].ketQua : "") + '</td>';
        table = table + '<td>' + (!!response.items[i].trangThai ? '<div class="mdi mdi mdi-check badge badge-success"> </div>' : '<div class="mdi mdi-close badge badge-danger"> </div>') + '</td>';
        table = table + '<td>' + ' <button type="button" class="btn btn-gradient-info btn-rounded btn-icon' + (!!response.items[i].trangThai ? ' disabled' : '') + '" onclick="updateTranDauFill(\'' + response.items[i].tranDauId.trim() + '\')"><i class="mdi mdi-table-edit"></i></button> ' + '</td>';
        table = table + '<td>' + ' <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon' + (!!response.items[i].trangThai ? ' disabled' : '') + '" onclick="deleteTranDau(\'' + response.items[i].tranDauId.trim() + '\')"><i class="mdi mdi-delete-forever"></i></button> ' + '</td>';
    }
    document.getElementById('tbody-trandau').innerHTML = table;
}