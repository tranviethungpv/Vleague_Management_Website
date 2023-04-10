$(document).ready(function () {
    $('#TranDau').on('change', function (event) {
        event.preventDefault();
        var id = $(this).val();
        getDanhSachGhiBan(id);
        $("#trandauid").val(id)
    });
});

function getDanhSachGhiBan(id) {
    var url = 'https://localhost:7239/api/APIDanhSachGhiBan/getDsById?trandauid=' + id;
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
                                <td> ${response[i].tenClb.trim()} </td>
                                <td> ${response[i].thoiDiemGhiBan} </td>
                            </tr>`
            }
            document.getElementById('tbody-danhsachghiban').innerHTML = table;
        },
    });
}