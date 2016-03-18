using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using StackExchange.Redis;
using WebApp;


namespace ClassLib.CacheExtension
{
    public class TCacheRedis<T> : ITCache<T>
    {
        internal static readonly object Locker = new object();

        //public delegate object CacheLoaderDelegate();

        //private static ConnectionMultiplexer connectionMultiplexer;
        private static IDatabase redis;

        //http://docs.servicestack.net/redis-client/distributed-locking-with-redis (how to do locking)
        //http://stackoverflow.com/questions/33309825/using-redis-as-cache-and-c-sharp-client  (policy on cache)

        //public T Get(string cacheKeyName, int cacheTimeOutSeconds,
        //    CacheLoaderDelegate loaderDelegate)
        //{
        //    //var redisManager = new PooledRedisClientManager("localhost:6379");
        //    connectionMultiplexer = ConnectionMultiplexer.Connect("localhost:6379");
        //    lock (Locker)
        //    {
        //        redis = connectionMultiplexer.GetDatabase();
        //    }
        //    //using (var redis = redisManager.GetClient())
        //    //{
        //    var o = CacheSerializer.Deserialize<T>(redis.StringGet(cacheKeyName));
        //    if (o != null)
        //    {
        //        return o;
        //    }
        //    lock (Locker)
        //    {
        //        // get lock but release if it takes more than 60 seconds to complete to avoid deadlock if this app crashes before release
        //        //using (redis.AcquireLock(cacheKeyName + "-lock", TimeSpan.FromSeconds(60)))
        //        //{
        //        var lockKey = cacheKeyName + "-lock";
        //        if (redis.LockTake(lockKey,Environment.MachineName,TimeSpan.FromSeconds(10)))
        //        {
        //            try
        //            {
        //                o = CacheSerializer.Deserialize<T>(redis.StringGet(cacheKeyName));
        //                if (o == null)
        //                {
        //                    o = (T) loaderDelegate();
        //                    redis.StringSet(cacheKeyName, CacheSerializer.Serialize(o),
        //                        TimeSpan.FromSeconds(cacheTimeOutSeconds));
        //                }
        //                redis.LockRelease(lockKey, Environment.MachineName);
        //                return o;
        //            }
        //            finally
        //            {
        //                redis.LockRelease(lockKey, Environment.MachineName);
        //            }
        //        }
        //        return o;
        //    }
        //    //}
        //}

        /// <summary>
        /// http://www.modhul.com/2014/10/serializing-custom-net-types-for-use-with-the-azure-redis-cache/
        /// </summary>
        public static class CacheSerializer
        {
            public static byte[] Serialize(object o)
            {
                if (o == null)
                {
                    return null;
                }

                BinaryFormatter binaryFormatter = new BinaryFormatter();
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    binaryFormatter.Serialize(memoryStream, o);
                    byte[] objectDataAsStream = memoryStream.ToArray();
                    return objectDataAsStream;
                }
            }

            public static T Deserialize<T>(byte[] stream)
            {
                if (stream == null)
                    return (default(T));

                BinaryFormatter binaryFormatter = new BinaryFormatter();
                using (MemoryStream memoryStream = new MemoryStream(stream))
                {
                    T result = (T)binaryFormatter.Deserialize(memoryStream);
                    return result;
                }
            }
        }

        public T Get(string cacheKeyName, int cacheTimeOutSeconds, Func<T> func)
        {
            //var redisManager = new PooledRedisClientManager("localhost:6379");
            var redisCacheServer =
               ConfigurationManager.AppSettings["RedisCacheServer"];
            var redisCacheServerPort =
               ConfigurationManager.AppSettings["RedisCacheServerPort"];
            if (string.IsNullOrEmpty(redisCacheServer))
            {
                throw new ApplicationException("RedisCacheServer must be defined in appsettings");
            }
            if (string.IsNullOrEmpty(redisCacheServerPort))
            {
                throw new ApplicationException("RedisCacheServerPort must be defined in appsettings");
            }

            var redisKey = ConfigurationManager.AppSettings["RedisCacheServerKey"];
            string connectionString;
            if (!string.IsNullOrEmpty(redisKey))
            {
                connectionString =
                    $"{redisCacheServer}:{redisCacheServerPort},abortConnect=false,ssl=false,password={redisKey}";
            }
            else
            {
                connectionString =
                    $"{redisCacheServer}:{redisCacheServerPort}";
            }

            using (var connectionMultiplexer = ConnectionMultiplexer.Connect(connectionString))
            {

                lock (Locker)
                {
                    redis = connectionMultiplexer.GetDatabase();
                }
               
                var o = CacheSerializer.Deserialize<T>(redis.StringGet(cacheKeyName));
                if (o != null)
                {
                    return o;
                }
                lock (Locker)
                {
                    // get lock but release if it takes more than 60 seconds to complete to avoid deadlock if this app crashes before release
                    //using (redis.AcquireLock(cacheKeyName + "-lock", TimeSpan.FromSeconds(60)))
                    
                    var lockKey = cacheKeyName + "-lock";
                    if (redis.LockTake(lockKey, Environment.MachineName, TimeSpan.FromSeconds(10)))
                    {
                        try
                        {
                            o = CacheSerializer.Deserialize<T>(redis.StringGet(cacheKeyName));
                            if (o == null)
                            {
                                o = func();
                                redis.StringSet(cacheKeyName, CacheSerializer.Serialize(o),
                                    TimeSpan.FromSeconds(cacheTimeOutSeconds));
                            }
                            redis.LockRelease(lockKey, Environment.MachineName);
                            return o;
                        }
                        finally
                        {
                            redis.LockRelease(lockKey, Environment.MachineName);
                        }
                    }
                    return o;
                }
               
            }
        }


    }
}