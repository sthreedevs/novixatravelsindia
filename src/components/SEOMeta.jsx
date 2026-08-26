"use client";
import React, { useEffect } from "react";

/**
 * SEO Meta Component
 * Dynamically updates document head with meta tags
 */
const SEOMeta = ({
  title = "Novixa Travels India",
  description = "Novixa Travels India offers visa assistance, flights, trains, hotels, tour packages, and more.",
  keywords = "travel, visa, flights, hotels, tours",
  ogTitle = null,
  ogDescription = null,
  ogImage = "https://www.novixatravelsindia.com/og-image.jpg",
  ogUrl = "https://www.novixatravelsindia.com/",
  twitterTitle = null,
  twitterDescription = null,
  twitterImage = null,
  canonicalUrl = null,
  structuredData = null,
}) => {
  useEffect(() => {
    // Update Title
    document.title = title;

    // Update Meta Tags
    const updateMeta = (name, content) => {
      if (!content) return;
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("name", name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    const updateProperty = (property, content) => {
      if (!content) return;
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", property);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Standard Meta Tags
    updateMeta("description", description);
    updateMeta("keywords", keywords);

    // Open Graph Tags
    updateProperty("og:title", ogTitle || title);
    updateProperty("og:description", ogDescription || description);
    updateProperty("og:image", ogImage);
    updateProperty("og:url", ogUrl);
    updateProperty("og:type", "website");

    // Twitter Card Tags
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", twitterTitle || ogTitle || title);
    updateMeta("twitter:description", twitterDescription || ogDescription || description);
    if (twitterImage) {
      updateMeta("twitter:image", twitterImage);
    }

    // Canonical URL
    if (canonicalUrl) {
      let canonical = document.querySelector("link[rel='canonical']");
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = canonicalUrl;
    }

    // Structured Data (JSON-LD)
    if (structuredData) {
      let scriptTag = document.getElementById("structured-data");
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = "structured-data";
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }
  }, [
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    twitterTitle,
    twitterDescription,
    twitterImage,
    canonicalUrl,
    structuredData,
  ]);

  return null;
};

export default SEOMeta;
