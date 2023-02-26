/*
 * @Descripttion: 
 * @Author: GXing
 * @Date: 2023-02-26 19:43:49
 */
const Koa = require('koa');
const app = new Koa();

/* 一共注册了3个中间件 */
// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();//先执行下一步(下一个中间件)，执行完再继续执行
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next(); //先执行下一步(下一个中间件)，下一步执行完再继续执行
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// response
app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);