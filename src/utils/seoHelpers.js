/**
 * SEO Helper Functions
 * Utilities for generating SEO meta tags and structured data
 */

import { getMetaTags } from "./seoMetaTags";
import {
  breadcrumbSchema,
  serviceSchema,
  articleSchema,
  productSchema,
} from "./schemaMarkup";

/**
 * Generate meta tags for a page
 * @param {string} pageKey - Key from seoConfig
 * @param {string} customUrl - Optional custom URL
 * @returns {object} Meta tag configuration
 */
export const generatePageMeta = (pageKey, customUrl = null) => {
  const meta = getMetaTags(pageKey);
  return {
    ...meta,
    ogUrl: customUrl || meta.ogUrl,
    canonicalUrl: customUrl || meta.ogUrl,
  };
};

/**
 * Generate breadcrumb data for navigation
 * @param {array} items - [{ name: 'Home', url: '/' }, ...]
 * @returns {object} Breadcrumb schema
 */
export const generateBreadcrumbs = (items) => {
  const breadcrumbs = [{ name: "Home", url: "/" }, ...items];
  return breadcrumbSchema(breadcrumbs);
};

/**
 * Optimize images for SEO
 * @param {string} imageSrc - Image source URL
 * @param {string} altText - Alt text for image
 * @param {string} title - Title for image
 * @returns {object} Image optimization props
 */
export const optimizeImage = (imageSrc, altText, title = "") => ({
  src: imageSrc,
  alt: altText,
  title: title || altText,
  loading: "lazy",
  decoding: "async",
});

/**
 * Format content for SEO
 * @param {string} text - Text to format
 * @returns {string} SEO-optimized text
 */
export const formatSEOContent = (text) => {
  // Remove extra whitespace
  let formatted = text.trim().replace(/\s+/g, " ");
  // Ensure proper punctuation
  if (formatted && !formatted.match(/[.!?]$/)) {
    formatted += ".";
  }
  return formatted;
};

/**
 * Generate meta description (max 160 chars)
 * @param {string} text - Text to use as description
 * @returns {string} Trimmed description
 */
export const generateMetaDescription = (text) => {
  const formatted = formatSEOContent(text);
  if (formatted.length > 160) {
    return formatted.substring(0, 157) + "...";
  }
  return formatted;
};

/**
 * Generate page heading hierarchy
 * @param {string} h1 - Main heading (H1)
 * @param {array} h2s - Sub headings (H2)
 * @returns {object} Heading structure
 */
export const generateHeadingHierarchy = (h1, h2s = []) => ({
  h1,
  h2s,
});

/**
 * Generate internal linking structure
 * @param {array} links - [{text, url, relevance}, ...]
 * @returns {array} Optimized internal links
 */
export const generateInternalLinks = (links) => {
  return links.map((link) => ({
    text: link.text,
    url: link.url,
    title: link.text, // Accessibility
    rel: link.rel || "internal",
  }));
};

/**
 * Generate Open Graph tags for social sharing
 * @param {object} data - {title, description, image, url}
 * @returns {object} OG tags
 */
export const generateOpenGraphTags = (data) => ({
  "og:title": data.title,
  "og:description": data.description,
  "og:image": data.image,
  "og:url": data.url,
  "og:type": data.type || "website",
  "og:site_name": "Novixa Travels India",
  "og:locale": "en_IN",
});

/**
 * Generate Twitter Card tags
 * @param {object} data - {title, description, image, card}
 * @returns {object} Twitter tags
 */
export const generateTwitterTags = (data) => ({
  "twitter:card": data.card || "summary_large_image",
  "twitter:title": data.title,
  "twitter:description": data.description,
  "twitter:image": data.image,
  "twitter:site": "@novixatravels",
  "twitter:creator": "@novixatravels",
});

/**
 * Validate URL structure for SEO
 * @param {string} url - URL to validate
 * @returns {boolean} Is URL valid
 */
export const isValidSEOUrl = (url) => {
  try {
    const urlObj = new URL(url);
    // Check for common SEO issues
    const issues = [
      url.includes("?"),
      url.includes("#"),
      url.includes("http://"), // Prefer https
      url.toLowerCase() !== url, // Lowercase URLs are better
    ];
    return !issues.some((issue) => issue === true);
  } catch {
    return false;
  }
};

/**
 * Generate canonical URL
 * @param {string} baseUrl - Base URL
 * @param {string} path - Page path
 * @returns {string} Canonical URL
 */
export const generateCanonicalUrl = (baseUrl = "https://www.novixatravelsindia.com", path = "/") => {
  return `${baseUrl}${path}`;
};

/**
 * Generate robots.txt rules dynamically
 * @param {array} disallowPaths - Paths to disallow
 * @returns {string} Robots.txt content
 */
export const generateRobotsTxt = (disallowPaths = []) => {
  let content = "User-agent: *\n";
  content += "Sitemap: https://www.novixatravelsindia.com/sitemap.xml\n";

  if (disallowPaths.length > 0) {
    disallowPaths.forEach((path) => {
      content += `Disallow: ${path}\n`;
    });
  } else {
    content += "Disallow:\n";
  }

  return content;
};

/**
 * Track SEO metrics
 * @param {object} metrics - {title, description, headings, links, images}
 * @returns {object} SEO score data
 */
export const calculateSEOMetrics = (metrics) => {
  let score = 100;

  // Title check (50-60 characters optimal)
  if (!metrics.title || metrics.title.length < 30) score -= 10;
  if (metrics.title && metrics.title.length > 60) score -= 5;

  // Description check (150-160 characters optimal)
  if (!metrics.description || metrics.description.length < 120) score -= 10;
  if (metrics.description && metrics.description.length > 160) score -= 5;

  // Heading hierarchy
  if (!metrics.headings || !metrics.headings.h1) score -= 20;
  if (metrics.headings && metrics.headings.h1 && metrics.headings.h1.length > 1)
    score -= 10;

  // Internal links
  if (!metrics.links || metrics.links.length === 0) score -= 5;

  // Images with alt text
  if (metrics.images && metrics.images.length > 0) {
    const imagesWithAlt = metrics.images.filter((img) => img.alt).length;
    const altRatio = imagesWithAlt / metrics.images.length;
    if (altRatio < 0.8) score -= 10;
  }

  return Math.max(0, score);
};

export default {
  generatePageMeta,
  generateBreadcrumbs,
  optimizeImage,
  formatSEOContent,
  generateMetaDescription,
  generateHeadingHierarchy,
  generateInternalLinks,
  generateOpenGraphTags,
  generateTwitterTags,
  isValidSEOUrl,
  generateCanonicalUrl,
  generateRobotsTxt,
  calculateSEOMetrics,
};
