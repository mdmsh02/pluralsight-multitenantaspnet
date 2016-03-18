using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using WebApp.Models;

namespace WebApp.ControllerWebApi
{
    public class AccountController : MultiTenantWebApiController
    {
        private readonly MultiTenantContext _context = new MultiTenantContext();

        // Post: rest/Account
        public HttpResponseMessage Post(bool extJsWrapper=false)
        {
            Thread.Sleep(3000);
            bool showSpeakerPage = ConfigurationManager.AppSettings["showSpeakerPage"] != null &&
                                  ConfigurationManager.AppSettings["showSpeakerPage"].ToLower() == "true";


            return Request.CreateResponse(HttpStatusCode.OK,
                new
                {
                    TenantName = Tenant.Name,
                    showSpeakerPage = showSpeakerPage

                });






        }
    }
}
