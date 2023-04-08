$(document).ready(function () {
    getAllTinTuc();
});

function getAllTinTuc() {
    $.ajax({
        url: "https://localhost:7239/api/APITinTuc",
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
                const date = new Date(response[i].ngayTao);
                var day = date.getDate();
                var month = date.getMonth() + 1;
                var year = date.getFullYear();
                var hour = date.getHours();
                var minute = date.getMinutes();
                table = table + '<tr>';
                table = table + '<td>' + response[i].tinTucId.trim() + '</td>';
                table = table + '<td>' + day + "/" + month + "/" + year + " " + hour + ':' + minute + '</td>';
                table = table + '<td>' + response[i].tieuDe + '</td>';;
                table = table + '<td>' + response[i].nguoiDungId + '</td>';
                table = table + '<td>' + ' <button type="button" class="btn btn-gradient-info btn-rounded btn-icon" onclick="updateTinTucFill(\'' + response[i].tinTucId.trim() + '\')"><i class="mdi mdi-table-edit"></i></button> ' + '</td>';
                table = table + '<td>' + ' <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onclick="deleteTinTuc(\'' + response[i].tinTucId.trim() + '\')"><i class="mdi mdi-delete-forever"></i></button> ' + '</td>';
            }
            document.getElementById('tbody-tintuc').innerHTML = table;
        },
        fail: function (response) {
            console.log("fail");
        }
    });
}

$("#form-tintuc").submit(function (e) {
    e.preventDefault();
})

function resetInput() {
    $("#TinTucId").val("").change()
    $("#TieuDe").val("").change()
    $("#NoiDung").val("").change()
    $("#Anhdaidien").val("").change()
}

function InsertTinTuc() {
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

function addTinTuc() {
    var url = 'https://localhost:7239/api/APILichThiDau';
    var tintucid = $("#TinTucId").val();
    var tieude = $("#TieuDe").val();
    var noidung = $("#NoiDung").val();
    var anhdaidien = $("#Anhdaidien").get(0).files[0];
    var ngaytao = new Date().toISOString();
    // Validate form fields
    if (!tintucid || !tieude || !noidung || !anhdaidien) {
        console.log("Không được bỏ trống");
        return;
    }
    if (!anhdaidien.type.match(/^image\/(jpeg|png|gif)$/)) {
        console.log("Định dạng không hợp lệ. Chỉ hỗ trợ định dạng JPEG, PNG, or GIF file.");
        return;
    }
    if (anhdaidien.size > 10 * 1024 * 1024) {
        console.log("Dung lượng file tối đa là 10 MB.");
        return;
    }

    var formData = new FormData();
    formData.append("TinTucId", tintucid);
    formData.append("NgayTao", ngaytao);
    formData.append("TieuDe", tieude);
    formData.append("NoiDung", noidung);
    formData.append("Anhdaidien", anhdaidien);

    $.ajax({
        type: "POST",
        url: url,
        data: formData,
        processData: false,
        contentType: false,
        success: function () {
            alert("Thêm bài đăng thành công!");
            resetInput();
            getAllTinTuc();
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("Lỗi xảy ra khi thêm bài đăng " + errorThrown);
        }
    });
}