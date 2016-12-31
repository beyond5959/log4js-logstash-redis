const log4js = require('log4js');
const redis = require('ioredis');
const path = require('path');
const assert = require('power-assert');
const redisConf =  {
  host: 'localhost',
  port: 6379,
  db: 0,
};
const redisKey = 'test_key';

let Redis, logger;

describe('logstashRedis appender', () => {
  before((done) => {
    Redis = new redis(redisConf);

    log4js.configure({
      appenders: [{
        type: path.resolve(__dirname, '../'),
        key: redisKey,
        redis: redisConf,
      }],
    });
    logger = log4js.getLogger('tests');
    done();
  });

  it('a info should be sent', (done) => {
    const testStr = 'logstashRedis appender test.';

    Redis.monitor(function (err, monitor) {
      if (err) return done(err);

      monitor.on('monitor', function (time, args, source, database) {
        assert(args[0] === 'rpush');
        assert(args[1] === 'test_key');

        const info = JSON.parse(args[2]);
        assert(info.message === testStr);
        assert(info['@timestamp']);
        done();
      });
    });

    setTimeout(() => {
      logger.debug(testStr);
    }, 10);
  });
});
