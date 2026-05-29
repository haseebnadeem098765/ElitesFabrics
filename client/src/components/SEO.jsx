import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, keywords, image, url }) => {
  const location = useLocation();
  const siteName = 'Elite Fabrics';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDesc = 'Elite Fabrics provides high-quality, durable, and professional uniform fabrics for schools, offices, hospitals, and industrial safety.';
  const defaultImage = 'https://res.cloudinary.com/detwuzqry/image/upload/v1775717220/stitcheerr_assets/logo.png';
  const siteUrl = 'https://elitesfabrics.store'; // Replace with actual domain when live
  const pageUrl = url || `${siteUrl}${location.pathname}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta name="keywords" content={keywords || 'uniform fabrics, school uniforms, industrial fabrics, medical textiles, corporate wear'} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
};

export default SEO;
