using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebApp.Models;

namespace WebApp.ControllerWebApi
{
    public class SpeakerController : MultiTenantWebApiController
    {
        private readonly MultiTenantContext _context = new MultiTenantContext();

        // GET: rest/Speaker/extjswrapper or rest/Speaker
        public HttpResponseMessage Get(bool extJsWrapper=false)
        {

            var speakersAll =
                new TCache<List<Speaker>>().
                    Get("s-cache", 20,
                        () =>
                        {
                            var speakersAll1 =
                                _context.Speakers.
                                Include(a => a.Sessions.Select(b => b.Tenant)).
                                ToList();
                            return speakersAll1;
                        });

            //var badCnt = TestForBad(speakersAll);


            var speakers = new List<Speaker>();
            // ReSharper disable once LoopCanBeConvertedToQuery
            foreach (var speaker in speakersAll)
            {
                var speakerInTenant =
                    speaker.Sessions.
                        Any(a => a.Tenant.Name == Tenant.Name);
                if (speakerInTenant)
                {
                    speakers.Add(new Speaker
                    {
                        FirstName = speaker.FirstName,
                        LastName = speaker.LastName,
                        //Id = speaker.Id,
                        Id = speaker.PictureId,
                        PictureId = speaker.PictureId,
                        Bio = speaker.Bio,
                        AllowHtml = speaker.AllowHtml,
                        WebSite = speaker.WebSite,

                        ImageUrl =
                            $"/Content/Images/Speakers/Speaker-{speaker.PictureId}-75.jpg",
                        Sessions =
                            speaker.Sessions.
                                Where(a => a.Tenant.Name == Tenant.Name).
                                OrderBy(a => a.Title).ToList()
                    });
                }
            }

            var speakers2 = speakers.Select(speaker => new Speaker
            {
                Id = speaker.Id,
                FirstName = speaker.FirstName,
                LastName = speaker.LastName,
                WebSite = speaker.WebSite,
                ImageUrl = "",
                Bio = speaker.Bio,
                AllowHtml = speaker.AllowHtml,

                Sessions = speaker.Sessions.Select(session => new Session()
                {
                    Id = session.Id,
                    Title = session.Title,
                    //SessionUrl = "",
                    DescriptionShort = session.DescriptionShort,
                    Description = session.Description
                    //TenantName = session.Tenant.Name

                }).ToList()
            }).ToList();

            if (extJsWrapper)
            {
                return Request.CreateResponse(HttpStatusCode.OK,
                               new
                               {
                                   data = speakers2,
                                   total = speakers2.ToList().Count,
                                   success = true
                               });
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.OK,
                              speakers2);
            }

           
            

        }

        private static int TestForBad(List<Speaker> speakersAll)
        {
            int badCnt = 0;
            foreach (var speakerx in speakersAll)
            {
                foreach (var sessionx in speakerx.Sessions)
                {
                    if (sessionx.Tenant == null || String.IsNullOrEmpty(sessionx.Tenant.Name))
                    {
                        sessionx.Tenant = new Tenant
                        {
                            Name = "XXXX"
                        };
                        badCnt++;
                    }
                }
            }
            return badCnt;
        }
    }
}
