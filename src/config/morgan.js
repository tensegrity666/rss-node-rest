const logResponse =
  ':status :method :referrer :url :response-time ms - :body - content-length: :req[content-length]';

const errResponse =
  ':status :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms';

const parseBody = req => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return '';
};

module.exports = { logResponse, errResponse, parseBody };
