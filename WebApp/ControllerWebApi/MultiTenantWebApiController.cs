using System;
using System.Web;
using System.Web.Http;
using WebApp.Models;

namespace WebApp.ControllerWebApi
{
    public class MultiTenantWebApiController : ApiController
    {
        public Tenant Tenant
        {
            get
            {
                object multiTenant;
                if (!HttpContext.Current.GetOwinContext().Environment.TryGetValue("MultiTenant", out multiTenant))
                {
                    throw new ApplicationException("Could not find Tenant");
                }
                return (Tenant)multiTenant;
            }
        }


    }
}
