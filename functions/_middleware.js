export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // Map subdomains directly to your .html files
  const subdomainRoutes = {
    'about.projectvoid.dev': '/about.html',
    'orgs.projectvoid.dev': '/orgs.html',
    'voidium.projectvoid.dev': '/voidium.html',
  };

  const targetFile = subdomainRoutes[url.hostname];

  // Only rewrite if we're hitting the root of a subdomain
  if (targetFile && (url.pathname === '/' || url.pathname === '')) {
    const newUrl = new URL(targetFile + url.search, url.origin);
    return next(new Request(newUrl, request));
  }

  return next();
}