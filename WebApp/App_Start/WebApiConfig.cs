using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace WebApp
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute
             ("SpeakersWithExtJSWrapper", "rest/speaker/extjswrapper",
                 new
                 {
                     controller = "speaker",
                     extjswrapper = true
                 });

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "rest/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );


          

            config.Formatters.Clear();
            config.Formatters.Add(new JsonMediaTypeFormatter
            {
                SerializerSettings =
                    new JsonSerializerSettings
                    {
                        ContractResolver =
                            new CamelCasePropertyNamesContractResolver
                                (),
                        DateTimeZoneHandling = DateTimeZoneHandling.Local,
                        Formatting = Formatting.Indented,
                        NullValueHandling = NullValueHandling.Ignore
                    }
            });
        }
    }
}
