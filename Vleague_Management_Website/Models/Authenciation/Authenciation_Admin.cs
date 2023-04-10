using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace Vleague_Management_Website.Models.Authenciation
{
    public class Authenciation_Admin : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (context.HttpContext.Session.GetString("TenDangNhap") == null)
            {
                context.Result = new RedirectToRouteResult(
                    new RouteValueDictionary
                    {
                        {"Controller", "Access" },
                        {"Action", "Login" }
                    });
            }
            else if (context.HttpContext.Session.GetString("LoaiTaiKhoan") != "0")
            {
                context.Result = new RedirectToRouteResult(
                    new RouteValueDictionary
                    {
                        {"Controller", "Home" },
                        {"Action", "noPremission" }
                    });
            }
        }
    }
}
