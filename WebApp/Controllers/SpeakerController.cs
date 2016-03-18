using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Threading.Tasks;
using System.Web.Mvc;
using ClassLib.CacheExtension;
using WebApp.Models;

namespace WebApp.Controllers
{
    public class SpeakerController : MultiTenantMvcController
    {
        private readonly MultiTenantContext _context = new MultiTenantContext();


        [MultiTenantControllerAllow("svcc")]
        public async Task<ActionResult> Detail(string id = null)
        {
            using (var context = new MultiTenantContext())
            {
                // add cache here
                var speakers = await context.Speakers.ToListAsync();

                var speakerUrlDictionary = speakers.ToDictionary(k => k.SpeakerUrl);

                Speaker speaker = new Speaker();
                if (speakerUrlDictionary.ContainsKey(id))
                {
                    speaker = speakerUrlDictionary[id];

                    speaker.ImageUrl = $"/Content/Images/Speakers/Speaker-{speaker.PictureId}-75.jpg";
                    var sessions =
                        speaker.Sessions.
                            Where(a => a.Tenant.Name == Tenant.Name).
                            OrderBy(a => a.Title).ToList();
                    speaker.Sessions = sessions;
                }

                return View("Detail", "_Layout", speaker);
            }
        }



        /// <summary>
        /// Everything here is converted to sync (not async/wait) primarily because
        /// we are using the sync version of redis.  
        /// </summary>
        /// <returns></returns>
        [MultiTenantControllerAllow("angu,svcc")]
        public ActionResult Index()
        {
            var speakersAll =
                new TCache<List<Speaker>>().
                    Get("s-cache", 20,
                        () =>
                        {
                            List<Speaker> speakersAll1 = _context.
                                Speakers.
                                Include(a => a.Sessions.Select(b => b.Tenant)).
                                ToList();

                            return speakersAll1;
                        });


            var speakers = new List<Speaker>();
            // ReSharper disable once LoopCanBeConvertedToQuery
            foreach (var speaker in speakersAll)
            {
                if (speaker.Sessions != null)
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
                            Id = speaker.Id,
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
                else
                {

                }
            }
            return View("Index", "_Layout", speakers);
        }

       

        /// <summary>
        /// this is not used but shows how you might start to serialize with async/await
        /// </summary>
        /// <returns></returns>
        public async Task<ActionResult> IndexTestingAsync()
        {
            Task<List<Speaker>> speakersAll1 =
                                _context.
                                    Speakers.
                                    Include(a => a.Sessions.
                                        Select(b => b.Tenant)).
                                    ToListAsync();

            foreach (var speaker in await speakersAll1)
            {
                speaker.ImageUrl = "#";
            }

            byte[] objectDataAsStream;
            BinaryFormatter binaryFormatter = new BinaryFormatter();
            using (MemoryStream memoryStream = new MemoryStream())
            {
                binaryFormatter.Serialize(memoryStream, await speakersAll1);
                objectDataAsStream = memoryStream.ToArray();
            }

            return View("Index", "_Layout", speakersAll1.Result);
        }

    }
}