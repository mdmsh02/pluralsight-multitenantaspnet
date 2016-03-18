using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
    using System.Web.Mvc;
    using WebApp.Models;

    namespace WebApp.Controllers
    {
        public class ExtJsRunController : MultiTenantMvcController
        {

            [MultiTenantControllerAllow("svcc,angu")]
            public ActionResult Index()
            {
                var str = "/ExtjsRun/" + Tenant.Name;
                return Redirect(str);
            }

        }

    }