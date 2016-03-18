using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace WebApp
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                namespaces: new[] {"WebApp.Controllers"},
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home",
                    action = "Index",
                    id = UrlParameter.Optional }
            );

            // ng*
            routes.MapRoute("NgWildcard", "NgRun/{*ngName}",
                new
                {
                    /* Your default route */
                    controller = "NgRun",
                    action = "Index"
                });
        }
    }
}
