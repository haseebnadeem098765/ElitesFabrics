import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SEO from '../components/SEO';
import { optimizeImage } from '../utils/cloudinary';

export default function Home() {
  const content = useSelector((state) => state.content.data);
  const heroData = content?.home?.hero || {};

  return (
    <>
      <SEO 
        title="Premium Uniform Fabric for Schools & Industry" 
        description="Elites Fabrics provides high-quality, durable, and professional uniform fabrics for schools, offices, hospitals, and industrial safety in Pakistan."
        keywords="uniform fabrics, school uniforms pakistan, industrial textiles, medical scrubs fabric, corporate shirting"
      />
      <section className="relative min-h-[60vh] md:min-h-[921px] flex items-center overflow-hidden pt-32 md:pt-20 -mt-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            alt={heroData.title || "Premium Uniform Fabrics"}
            className="w-full h-full object-cover object-center scale-100 md:scale-105"
            src={optimizeImage(heroData.image || "https://res.cloudinary.com/detwuzqry/image/upload/v1775717707/stitcheerr_assets/bsywtsz1pgrpqo3vcxhm.png")}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-surface/20 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-10 opacity-60"></div>
          <div className="absolute inset-0 fabric-texture z-20 opacity-30"></div>
        </div>
        <div className="absolute inset-0 z-10 flex items-center justify-end overflow-hidden pointer-events-none">
          <img
            alt="Elite Fabrics Logo Background"
            className="w-full max-w-full lg:w-auto h-[60%] lg:h-[85%] object-contain opacity-20 lg:translate-x-4 translate-y-4 lg:translate-y-0 drop-shadow-2xl transition-all duration-700"
            src={optimizeImage(content?.global?.config?.logo || "https://res.cloudinary.com/detwuzqry/image/upload/v1775717220/stitcheerr_assets/logo.png")}
          />
        </div>
        <div className="container mx-auto px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold font-headline leading-tight text-on-background mb-6 break-words max-w-full">
              {heroData.title ? heroData.title : (
                <>Premium <span className="text-primary">Uniform Fabric</span> for Every Industry</>
              )}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-on-surface-variant font-light mb-10 leading-relaxed max-w-full overflow-wrap-anywhere">
              {heroData.subtitle || "High-quality, durable, and comfortable fabrics for schools, offices, hospitals, and industrial uniforms."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/fabrics" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold text-lg rounded-xl shadow-lg hover:shadow-primary/20 transition-all active:scale-95 text-center">
                View Fabrics
              </Link>
              <Link to="/quotes" className="w-full sm:w-auto px-8 py-4 bg-surface-container-highest text-on-surface font-bold text-lg rounded-xl hover:bg-surface-container-high transition-all active:scale-95 text-center">
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-container-low relative">
        <div className="container mx-auto px-8">
          <div className="mb-16">
            <span className="text-tertiary font-bold tracking-widest text-sm uppercase">{content?.home?.features?.subtitle || 'Industry Standards'}</span>
            <h2 className="text-4xl font-bold font-headline mt-2">{content?.home?.features?.title || 'Fabric Solutions'}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(content?.home?.features?.items?.length > 0 ? content.home.features.items : [
              { title: 'School And University Uniform', description: 'High-durability, wrinkle-resistant fabrics designed for daily student attire. Ensures all-day comfort and professional look.', image: 'https://res.cloudinary.com/detwuzqry/image/upload/v1776588261/stitcheerr_assets/xptmbrbgmfj3xozpbhwu.jpg' },
              { title: 'Corporate Shirting', description: 'Premium Toptex and Winnertex blends for executive professional wear and boardroom elegance.', image: 'https://res.cloudinary.com/detwuzqry/image/upload/v1776588262/stitcheerr_assets/acj0i3umdqo3qlaqp94h.jpg' },
              { title: 'Hospitality & Hotel Fabrics', description: 'Breathable and stain-resistant fabrics for chefs, front-desk staff, and housekeeping teams.', image: 'https://res.cloudinary.com/detwuzqry/image/upload/v1776586858/stitcheerr_assets/r6sxvktceybqwkua4mxs.jpg' },
              { title: 'Industrial Safety', description: 'High-tensile strength blended fabrics for heavy-duty industrial and factory environments.', image: 'https://res.cloudinary.com/detwuzqry/image/upload/v1776588263/stitcheerr_assets/dn3nvegkp9tv6n3thv73.jpg' },
              { title: 'Medical Scrubs', description: 'Antimicrobial and breathable fabrics for healthcare professionals and hospital staff.', image: 'https://res.cloudinary.com/detwuzqry/image/upload/v1776588264/stitcheerr_assets/k6a6rkvbndb2vqn6rfcx.jpg' },
              { title: 'Security & Guards', description: 'Rugged and professional fabrics for private security, guards, and law enforcement uniforms.', image: 'https://res.cloudinary.com/detwuzqry/image/upload/v1776587152/stitcheerr_assets/ewgoqvnm2ce0navpana8.jpg' }
            ]).map((feature, idx) => (
              <div 
                key={idx} 
                className={`${idx % 3 === 0 ? 'lg:col-span-2' : ''} group relative overflow-hidden rounded-xl h-80 bg-surface-container-lowest transition-all hover:shadow-xl`}
              >
                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity">
                  <img 
                    className="w-full h-full object-cover" 
                    loading="lazy" 
                    alt={feature.title} 
                    src={optimizeImage(feature.image)}
                  />
                </div>
                <div className="relative p-10 h-full flex flex-col justify-end">
                  <h3 className="text-3xl font-bold font-headline mb-2 text-primary">{feature.title}</h3>
                  <p className="text-on-surface-variant max-w-md">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-headline mb-4">{content?.home?.testimonials?.title || 'Trusted by Industry Leaders'}</h2>
            <div className="h-1 w-24 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 overflow-hidden">
            {(content?.home?.testimonials?.items || []).map((testimonial, idx) => (
              <div key={idx} className="flex-1 bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/10">
                <div className="flex text-tertiary mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="text-lg italic text-on-surface mb-8 leading-relaxed">{testimonial.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold">{testimonial.initials}</div>
                  <div>
                    <h4 className="font-bold text-on-surface">{testimonial.name}</h4>
                    <p className="text-sm text-on-surface-variant">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 fabric-texture opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-8 relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline text-on-primary mb-8 px-2">
            {content?.home?.cta?.title || "Ready to Elevate Your Team's Appearance?"}
          </h2>
          <p className="text-lg sm:text-xl text-primary-fixed mb-12 max-w-2xl mx-auto opacity-90 px-4">
            {content?.home?.cta?.subtitle || "Get custom fabric swatches and a comprehensive quote for your organization within 24 hours."}
          </p>
          <Link to="/quotes" className="inline-block px-12 py-5 bg-tertiary text-on-tertiary font-bold text-xl rounded-xl shadow-2xl hover:bg-tertiary/90 transition-all active:scale-95">
            {content?.home?.cta?.buttonText || "Request a Free Quote Now"}
          </Link>
        </div>
      </section>
    </>
  );
}
