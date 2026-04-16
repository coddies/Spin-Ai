const fs = require('fs');

const domain = "https://spin-ai-brown.vercel.app";
const routes = ["/"]; // Add more routes if the app becomes multi-page

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${domain}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

try {
  fs.writeFileSync('./public/sitemap.xml', sitemap);
  console.log('✅ sitemap.xml generated successfully in /public');
} catch (err) {
  console.error('❌ Error generating sitemap:', err);
}
