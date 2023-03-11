# Hướng dẫn kết nối cơ sở dữ liệu
Phần kết nối CSDL của cái ASP.NET Core này có vẻ không hợp lí cho lắm, vì thé khi clone hoặc pull project về thì hãy thực hiện các bước sau đây để kết nối cơ sở dữ liệu:
* Đảm bảo trên máy đã có CSDL <b><i>QlBongDa</i></b> (file SQL đã được để trong project)
* Mở project bằng Visual Studio, chọn <b>View -> Terminal</b>, sau đó chạy lệnh sau:  
<code>setx DATABASE_CONNECTION_STRING "<b>connectionString</b>"</code>  
trong đó <b>connectionString</b> là chuỗi kết nối database của máy.  
Ví dụ <code>setx DATABASE_CONNECTION_STRING "<b>Data Source=LAPTOP-31LR8ADC\SQLEXPRESS;Initial Catalog=QLBanVaLi;Integrated Security=True;TrustServerCertificate=True</b>"</code>
* Sau đó cần <b>Scaffold-DbContext</b>, để làm điều này, chạy lệnh sau:  
<code>Scaffold-DbContext "Data Source=<b>connectionString</b>" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -force</code>  
trong đó <b>connectionString</b> là chuỗi kết nối database của máy, tuy nhiên bắt buộc thêm <b>TrustServerCertificate=True</b> vào chuỗi kết nối (điều này quan trọng).  
Ví dụ <code>Scaffold-DbContext "Data Source=LAPTOP-31LR8ADC\SQLEXPRESS;Initial Catalog=QLBanVaLi;Integrated Security=True;<b>TrustServerCertificate=True</b>" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -force</code>  
* Làm và push lên như thường, mỗi lần pull về chỉ cần làm lại bước <b>Scaffold-DbContext</b>.
