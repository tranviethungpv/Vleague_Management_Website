using Microsoft.EntityFrameworkCore;
using Vleague_Management_Website.Models;
using Vleague_Management_Website.Repository;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("QlbongDaContext");
builder.Services.AddDbContext<QlbongDaContext>(x => x.UseSqlServer(connectionString));
builder.Services.AddScoped<ICauThuRepository, CauThuRepository>();
builder.Services.AddScoped<NewsRepository>();
builder.Services.AddScoped<KetQuaThiDauRepository>();

builder.Configuration.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true)
    .AddEnvironmentVariables();
builder.Services.AddSession();



//builder.Services.AddDbContext<>(options =>
//    options.UseSqlServer(connectionString));

builder.Services.AddControllersWithViews();

// Add authorization services
builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// Add authentication middleware before authorization middleware
app.UseAuthentication();

app.UseAuthorization();
app.UseSession();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
