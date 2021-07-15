const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const config_result = dotenv.config();
if (process.env.NODE_ENV != 'production' && config_result.error) {
  throw config_result.error;
}

//###[  Routers ]###
const indexRouter = require('./index/indexRouter');
const profileRouter = require('./profile/profileRouter');
const dsRouter = require('./dsService/dsRouter');
const judgeRouter = require('./judges/judgeRouter');
const caseRouter = require('./cases/caseRouter');
const tagRouter = require('./tags/tagRouter');
const uploadRouter = require('./upload/uploadRouter');
const faqRouter = require('./faq/faqRouter');
const rolesRouter = require('./roles/rolesRouter');

const app = express();

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: process.env.LOCAL_ORIGIN || 'https://a.humanrightsfirstasylum.dev',
  })
);
app.use(logger('dev'));
app.use(cookieParser());

// application routes
app.use('/', indexRouter);
app.use('/upload', uploadRouter);
app.use(['/profile', '/profiles'], profileRouter);
app.use(['/judge', '/judges'], judgeRouter);
app.use(['/case', '/cases'], caseRouter);
app.use('/tags', tagRouter);
app.use('/data', dsRouter);
app.use('/faq', faqRouter);
app.use('/roles', rolesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err instanceof createError.HttpError) {
    res.locals.message = err.message;
    res.locals.status = err.statusCode;
    if (process.env.NODE_ENV === 'development') {
      res.locals.error = err;
    }
  }
  console.error(err);
  if (process.env.NODE_ENV === 'production' && !res.locals.message) {
    res.locals.message = 'ApplicationError';
    res.locals.status = 500;
  }
  if (res.locals.status) {
    res.status(res.locals.status || 500);
    const errObject = { error: res.locals.error, message: res.locals.message };
    return res.json(errObject);
  }
  next(err);
});

module.exports = app;
