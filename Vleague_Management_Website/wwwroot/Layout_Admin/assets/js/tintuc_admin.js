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
                table = table + '<td>' + response[i].tenDangNhap + '</td>';
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
    var tintucid = $("#tintucid").val();
    var ngaytao = new Date().toISOString();
    var tieude = $("#tieude").val();
    var noidung = $("#noidung").val();
    
    var formData = new FormData();

    formData.append("tinTucId", tintucid);
    formData.append("ngayTao", ngaytao);
    formData.append("tieuDe", tieude);
    formData.append("noiDung", noidung);
    formData.append("image", $('#anhdaidien')[0].files[0]);

    var url = 'https://localhost:7239/api/APITinTuc/themtintuc';
    $.ajax({
        url: url,
        method: 'POST',
        processData: false,
        contentType: false,
        data: formData,
        error: function (error) {
            alert("Có lỗi xảy ra");
        },
        success: function (response) {
            alert("Thêm mới thành công");
            resetInput();
            getAllTinTuc(); //Gọi đến hàm lấy dữ liệu lên bảng
        }
    });

    //Đây cũng là 1 cách nữa để upload ảnh, Sử dụng XMLHttpRequest.
    //var xhr = new XMLHttpRequest();
    //xhr.open('POST', 'https://localhost:7239/api/APITinTuc/themtintuc');
    //xhr.setRequestHeader('Accept', 'application/json');
    ////xhr.setRequestHeader('Content-Type', 'multipart/form-data'); // Set content type

    //xhr.onload = function () {
    //    if (xhr.status === 200) {
    //        alert('Tin tức đã được tạo thành công!');
    //    } else {
    //        alert('Đã xảy ra lỗi khi tạo tin tức.');
    //    }
    //};
    //console.log(xhr);
    //xhr.send(formData);
}

function UpdateTinTuc() {
    var tintucid = $("#tintucid").val();
    var ngaytao = new Date().toISOString();
    var tieude = $("#tieude").val();
    var noidung = $("#noidung").val();

    var formData = new FormData();

    formData.append("tinTucId", tintucid);
    formData.append("ngayTao", ngaytao);
    formData.append("tieuDe", tieude);
    formData.append("noiDung", noidung);
    formData.append("image", $('#anhdaidien')[0].files[0]);

    var url = 'https://localhost:7239/api/APITinTuc/capnhattintuc';
    $.ajax({
        url: url,
        method: 'PUT',
        processData: false,
        contentType: false,
        data: formData,
        error: function (error) {
            alert("Có lỗi xảy ra");
        },
        success: function (response) {
            alert("Cập nhật thành công");
            resetInput();
            getAllTinTuc(); //Gọi đến hàm lấy dữ liệu lên bảng
        }
    });
}

function updateTinTucFill(id) {
    var url = 'https://localhost:7239/api/APITinTuc/getById?id=' + id;
    $.ajax({
        url: url,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (response) {
            alert("Cập nhật không thành công");
        },
        success: function (response) {
                $("#tintucid").val(response.tinTucId.trim())
                //$("#ngaytao").val(ngaytao).change()
                $("#tieude").val(response.tieuDe.trim()).change()
                $("#noidung").val(response.noiDung.trim()).change()
                $("#anhdaidien").val(response.anhdaidien.trim()).change()
        }
    });
}

function deleteTinTuc(id) {
    var url = 'https://localhost:7239/api/APITinTuc?input=' + id;
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
            getAllTinTuc(); //Gọi đến hàm lấy dữ liệu lên bảng
        }
    });
}