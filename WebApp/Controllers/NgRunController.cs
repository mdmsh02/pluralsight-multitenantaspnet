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
    public class NgRunController : MultiTenantMvcController
    {

        [MultiTenantControllerAllow("svcc,angu")]
        public async Task<ActionResult> Index()
        {
            bool showSpeakerPage = ConfigurationManager.AppSettings["showSpeakerPage"] != null &&
                                   ConfigurationManager.AppSettings["showSpeakerPage"].ToLower() == "true";

            var data = new NgData
            {
                TenantName = Tenant.Name,
                TopTitle = "Registration Closed 12/25/2015", // not used right
                ShowSpeakerPage = showSpeakerPage.ToString()
            };
            return View("Index", data);
        }

    }

    public class NgData
    {
        public string TenantName { get; set; }
        public string TopTitle { get; set; }
        public string ShowSpeakerPage { get; set; }
    }
}