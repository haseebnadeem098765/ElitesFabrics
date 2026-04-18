/**
 * Optimizes a Cloudinary URL by injecting auto-format and auto-quality parameters.
 * @param {string} url - The original Cloudinary URL.
 * @param {string} transformations - Optional additional transformations (e.g., 'w_800,c_fill').
 * @returns {string} - The optimized URL.
 */
export const optimizeImage = (url, transformations = '') => {
  if (!url || !url.includes('res.cloudinary.com')) return url;
  
  // Prevent duplicate parameters
  if (url.includes('f_auto') || url.includes('q_auto')) return url;

  const baseTransform = 'f_auto,q_auto';
  const finalTransform = transformations ? `${baseTransform},${transformations}` : baseTransform;

  return url.replace('/upload/', `/upload/${finalTransform}/`);
};
