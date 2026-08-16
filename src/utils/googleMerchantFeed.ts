import { Product } from '../types';
import { PRODUCTS } from '../data/products';

/**
 * Generates standard Google Merchant Center RSS 2.0 XML Feed
 * Specification: https://support.google.com/merchants/answer/160589
 */
export function generateGoogleMerchantXml(products: Product[] = PRODUCTS, baseUrl: string = window.location.origin): string {
  const sanitizeXml = (str: string = '') => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  const itemsXml = products
    .map((p) => {
      const productUrl = `${baseUrl}/product/${p.slug}`;
      const imageUrl = p.image.startsWith('http') ? p.image : `${baseUrl}${p.image}`;
      const priceFormatted = `${p.price.toFixed(2)} INR`;
      const availability = p.inStock && p.stock > 0 ? 'in_stock' : 'out_of_stock';
      const cleanDesc = sanitizeXml(p.description || p.shortDescription || p.name);
      const title = sanitizeXml(p.name);
      const brand = sanitizeXml(p.brand || 'Giriraj Power');
      const mpn = sanitizeXml(p.sku || p.id);

      return `    <item>
      <g:id>${p.id}</g:id>
      <g:title>${title}</g:title>
      <g:description>${cleanDesc}</g:description>
      <g:link>${productUrl}</g:link>
      <g:image_link>${imageUrl}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>${availability}</g:availability>
      <g:price>${priceFormatted}</g:price>
      <g:brand>${brand}</g:brand>
      <g:mpn>${mpn}</g:mpn>
      <g:identifier_exists>yes</g:identifier_exists>
      <g:google_product_category>Hardware &gt; Building Materials &gt; Electrical Supplies</g:google_product_category>
      <g:product_type>${sanitizeXml(p.category)}</g:product_type>
      <g:shipping>
        <g:country>IN</g:country>
        <g:service>60-Minute Site Express / Road Freight</g:service>
        <g:price>0.00 INR</g:price>
      </g:shipping>
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Giriraj Power - Google Merchant Center Product Feed</title>
    <link>${baseUrl}</link>
    <description>Authentic electrical and construction material catalog from Giriraj Power. Certified wires, cables, switchgear, adhesives, and tools with instant contractor pricing.</description>
${itemsXml}
  </channel>
</rss>`;
}

/**
 * Generates standard Google Merchant Center CSV Feed
 */
export function generateGoogleMerchantCsv(products: Product[] = PRODUCTS, baseUrl: string = window.location.origin): string {
  const headers = [
    'id',
    'title',
    'description',
    'link',
    'image_link',
    'availability',
    'price',
    'brand',
    'condition',
    'mpn',
    'google_product_category',
    'product_type',
  ];

  const rows = products.map((p) => {
    const productUrl = `${baseUrl}/product/${p.slug}`;
    const imageUrl = p.image.startsWith('http') ? p.image : `${baseUrl}${p.image}`;
    const priceFormatted = `${p.price.toFixed(2)} INR`;
    const availability = p.inStock && p.stock > 0 ? 'in stock' : 'out of stock';
    const cleanDesc = `"${(p.description || p.shortDescription || p.name).replace(/"/g, '""')}"`;
    const cleanTitle = `"${p.name.replace(/"/g, '""')}"`;

    return [
      p.id,
      cleanTitle,
      cleanDesc,
      productUrl,
      imageUrl,
      availability,
      priceFormatted,
      `"${p.brand}"`,
      'new',
      p.sku || p.id,
      '"Hardware > Building Materials > Electrical Supplies"',
      `"${p.category}"`,
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}
