$(document).ready(function () {
    getAllCLB();
});

function getAllCLB() {
    $.ajax({
        url: "https://localhost:7239/api/APICLB",
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (response) {
            console.log("error");
        },
        success: function (response) {
            var count = parseInt(response.totalCount);
            const pageNumber = 1;
            const pageSize = 5;
            $.ajax({
                url: `https://localhost:7239/api/APICLB/getPagination?pageSize=${pageSize}&pagenumber=${pageNumber}`,
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

function renderPagination(totalPages, currentPage) {
    let pagination = '';
    for (let i = 1; i <= totalPages; i++) {
        pagination += `<button class="btn ${i === currentPage ? 'btn-primary' : 'btn-outline-primary'}" onclick="setPage(${i})">${i}</button> `;
    }
    document.getElementById('pagination_clb').innerHTML = pagination;
}

function setPage(pageNumber) {
    const pageSize = 5;
    document.getElementById('page-number').innerHTML = pageNumber;
    $.ajax({
        url: `https://localhost:7239/api/APICLB/getPagination?pageSize=${pageSize}&pagenumber=${pageNumber}`,
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
        table = table + '<tr>';
        table = table + '<td>' + response.items[i].cauLacBoId.trim() + '</td>';
        table = table + '<td>' + response.items[i].tenClb.trim() + '</td>';
        table = table + '<td>' + response.items[i].tenGoi.trim() + '</td>';
        table = table + '<td>' + response.items[i].tenSan.trim() + '</td>';
        table = table + '<td>' + response.items[i].tenHlv.trim() + '</td>';
        table = table + '<td>' + ' <button type="button" class="btn btn-gradient-info btn-rounded btn-icon" onclick="updateCLBFill(\'' + response.items[i].cauLacBoId.trim() + '\')"><i class="mdi mdi-table-edit"></i></button> ' + '</td>';
        table = table + '<td>' + ' <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onclick="deleteCLB(\'' + response.items[i].cauLacBoId.trim() + '\')"><i class="mdi mdi-delete-forever"></i></button> ' + '</td>';
    }
    document.getElementById('tbody-CLB').innerHTML = table;
}