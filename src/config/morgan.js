const morgan = require('morgan');

const logResponse =
  ':status :method :referrer :url :response-time ms - :body - content-length: :req[content-length]';

const errResponse =
  ':status :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms';

morgan.token('body', req => {
  if (req.method === 'POST' || req.method === 'PUT') {
    return JSON.stringify(req.body).replace(/("password": ").+"/, 'password');
  }
  return '';
});

module.exports = { logResponse, errResponse };
