export function getConfig(options = {}) {

  const apiKey = options.apiKey || process.env.HOOKLENS_API_KEY
  const baseUrl = options.baseUrl || process.env.HOOKLENS_BASE_URL
  const projectId = options.projectId || process.env.HOOKLENS_PROJECT_ID || 'default'

  if (!apiKey) {
    throw new Error('HOOKLENS_API_KEY is required')
  }

  return {
    apiKey,
    projectId,
    provider: options.provider || 'unknown',
    endpoint: baseUrl ? `${baseUrl}/api/capture` : 'https://v0-hooklens-webhook-debugger.vercel.app/api/capture'
  }
}