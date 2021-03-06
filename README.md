# log4js-logstash-redis
[![node version][node-image]][node-url]
[![build status][travis-image]][travis-url]
[![David deps][david-image]][david-url]

[node-image]: https://img.shields.io/badge/node.js-%3E=_4.0-green.svg?style=flat-square
[node-url]: https://nodejs.org/en/download/
[travis-image]: https://travis-ci.org/beyond5959/log4js-logstash-redis.svg?branch=master
[travis-url]: https://travis-ci.org/beyond5959/log4js-logstash-redis
[david-image]:https://david-dm.org/beyond5959/log4js-logstash-redis.svg
[david-url]:https://david-dm.org/beyond5959/log4js-logstash-redis

A simple log appender for log4js that sends the data to logstash by redis.


Installation
------------
```
npm install log4js-logstash-redis --save
```

Usage: logstash configuration
-----------------------------
In the "input" part of the logstash server conf :
```
input {
  redis {
  	codec => json
  	data_type => "list"
  	key => "YOURKEY"
  }
}
```

Usage: log4js configuration
---------------------------
Plain javascript
```javascript
const log4js = require('log4js');
log4js.configure({
  appenders: {
    logstash_redis: {
      type: 'log4js-logstash-redis',
      key: 'YOURKEY',
      redis: {
        host: 'localhost',
        port: 6379,
        db: 0 // default 0
      },
    },
  },
  categories: { default: { appenders: [ 'logstash_redis' ], level: 'debug' }}
});

const logger = log4js.getLogger();

logger.debug('hello hello');
```
