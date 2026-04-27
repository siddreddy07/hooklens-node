import send from "./sender.js"

export default function createCapture(config) {
  return function handler(req, res, next) {
    const isBuffer = Buffer.isBuffer(req.body)

    const payload = {
      method: req.method,
      url: req.originalUrl,
      headers: sanitizeHeaders(req.headers),
      body: isBuffer ? safeJsonParse(req.body) : req.body,
      rawBody: isBuffer ? req.body.toString() : JSON.stringify(req.body),
      provider: config.provider,
      projectId: config.projectId,
      contentType: req.headers['content-type'],
      query: req.query
    }

    send({data: payload, config}).catch(() => {})
    next()
  }
}

function sanitizeHeaders(headers) {
  const h = { ...headers }
  delete h.authorization
  delete h.cookie
  return h
}

function safeJsonParse(buffer) {
  try {
    return JSON.parse(buffer.toString())
  } catch {
    return buffer.toString()
  }
}