// @ts-nocheck
export const onRequestGet: PagesFunction<{ DB: D1Database }> = async ({ env }) => {
  const provinces = await env.DB.prepare('SELECT slug FROM provinces').all()
  const urls = provinces.results.map(p => `
    <url>
      <loc>https://travel-planet.pages.dev/province/${p.slug}</loc>
      <changefreq>weekly</changefreq>
    </url>`).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url><loc>https://travel-planet.pages.dev/</loc></url>
      ${urls}
    </urlset>`
    
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' }
  })
}