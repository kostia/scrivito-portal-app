import cspBuilder from 'content-security-policy-builder'

function headers(environment: string) {
  return {
    'Content-Security-Policy': cspBuilder({
      directives: {
        'base-uri': "'none'",
        'default-src': [
          "'self'",
          'data:',
          'https:',
          'wss:',
          'ws:',
          "'unsafe-inline'",
          "'unsafe-eval'",
          'http:',
        ],
        'style-src': [
          "'self'",
          'data:',
          'https:',
          'wss:',
          "'unsafe-inline'",
          'http:',
        ],
        'script-src': [
          "'self'",
          'https://api.scrivito.com',
          'https://assets.scrivito.com',
          "'unsafe-inline'",
          "'unsafe-eval'",
          'http:',
        ].concat(
          // The package `@vitejs/plugin-react-swc` include an inline script into index.html (see [1]).
          // [1] https://github.com/vitejs/vite-plugin-react-swc/blob/17bb3ab6f0223f2c19d5cb3b9097457418188da5/src/index.ts#L17C7-L20
          // In case it breaks please look into the JS console and search for "CSP".
          // There you can find the current "sha256-x" value, which is to be copied over here.
          environment === 'development'
            ? ["'sha256-Z2/iFzh9VMlVkEOar1f/oSHWwQk3ve1qk/C2WdsC4Xk='"]
            : [],
        ),
        'object-src': "'none'",
        'block-all-mixed-content': true,
        'frame-ancestors':
          environment === 'development'
            ? ['*']
            : ["'self'", 'https://*.scrivito.com'],
      },
    }),
    'X-Frame-Options': 'sameorigin',
    'X-XSS-Protection': '1; mode=block',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Access-Control-Allow-Origin': '*',
  }
}

// Netlify or Cloudflare Pages headers format. For details:
// * https://www.netlify.com/docs/headers-and-basic-auth/
// * https://developers.cloudflare.com/pages/platform/headers/
export function productionHeaders(): string {
  return `/*
${Object.entries(headers('production'))
  .map(([key, value]) => `  ${key}: ${value}`)
  .join('\n')}
`
}

export function developmentHeaders() {
  return headers('development')
}
