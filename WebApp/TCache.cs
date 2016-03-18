using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using ClassLib.CacheExtension;

namespace WebApp
{
    public class TCache<T>
    {
        public T Get(string cacheKeyName, int cacheTimeOutSeconds,
            Func<T> func)
        {
            var redisCache =
                ConfigurationManager.AppSettings["RedisCache"];

            if (redisCache == "true")
            {
                return new TCacheRedis<T>().
                    Get(cacheKeyName, cacheTimeOutSeconds, func);
            }
            else
            {
                return new TCacheInternal<T>().Get(
                    cacheKeyName, cacheTimeOutSeconds, func);
            }


        }

        //public T Get(string cacheKeyName, int cacheTimeOutSeconds,
        //    Func<T> func)
        //{
        //    return new TCacheInternal<T>().Get(
        //        cacheKeyName, cacheTimeOutSeconds, func);
        //}
    }
}