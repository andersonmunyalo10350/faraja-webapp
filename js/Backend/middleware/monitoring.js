const crypto = require('crypto');

const round = n => Math.round(n * 10) / 10;

const stats = {
total: 0,
clientErrors: 0,
serverErrors: 0,
routes: {}
};

function who(req) {
if (!req.apiKey) return 'none';

const hash = crypto
.createHash('sha256')
.update(req.apiKey)
.digest('hex');

return 'key-' + hash.slice(0, 6);
}

function newRoute() {
return {
count: 0,
clientErrors: 0,
serverErrors: 0,
totalMs: 0,
avgMs: 0,
maxMs: 0
};
}

function monitor(req, res, next) {
const start = process.hrtime.bigint();

res.on('finish', () => {
const ms = Number(process.hrtime.bigint() - start) / 1e6;
const duration = round(ms);

```
console.log(JSON.stringify({
  time: new Date().toISOString(),
  method: req.method,
  path: req.path,
  status: res.statusCode,
  ms: duration,
  caller: who(req)
}));

stats.total++;

if (res.statusCode >= 400 && res.statusCode < 500) {
  stats.clientErrors++;
}

if (res.statusCode >= 500) {
  stats.serverErrors++;
}

const routeName = req.route
  ? req.method + ' ' + req.baseUrl + req.route.path
  : '(no route)';

if (!stats.routes[routeName]) {
  stats.routes[routeName] = newRoute();
}

const route = stats.routes[routeName];

route.count++;
route.totalMs += ms;
route.avgMs = round(route.totalMs / route.count);
route.maxMs = Math.max(route.maxMs, duration);

if (res.statusCode >= 400 && res.statusCode < 500) {
  route.clientErrors++;
}

if (res.statusCode >= 500) {
  route.serverErrors++;
}
```

});

next();
}

function statsHandler(req, res) {
const routes = {};

for (const [name, data] of Object.entries(stats.routes)) {
routes[name] = {
count: data.count,
clientErrors: data.clientErrors,
serverErrors: data.serverErrors,
avgMs: data.avgMs,
maxMs: data.maxMs
};
}

res.json({
total: stats.total,
clientErrors: stats.clientErrors,
serverErrors: stats.serverErrors,
errorRatePercent: stats.total
? round(((stats.clientErrors + stats.serverErrors) / stats.total) * 100)
: 0,
routes
});
}

module.exports = { monitor, statsHandler };
