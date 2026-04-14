import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SEO from '../components/SEO';

export default function Home() {
  const content = useSelector((state) => state.content.data);
  const heroData = content?.home?.hero || {};

  return (
    <>
      <SEO 
        title="Premium Uniform Fabric for Schools & Industry" 
        description="Elite Fabrics provides high-quality, durable, and professional uniform fabrics for schools, offices, hospitals, and industrial safety in Pakistan."
        keywords="uniform fabrics, school uniforms pakistan, industrial textiles, medical scrubs fabric, corporate shirting"
      />
      <section className="relative min-h-[921px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt={heroData.title || "Premium Uniform Fabrics"}
            className="w-full h-full object-cover"
            src={ "https://res.cloudinary.com/detwuzqry/image/upload/f_auto,q_auto/v1775717707/stitcheerr_assets/bsywtsz1pgrpqo3vcxhm.png"}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-surface/40 z-10"></div>
          <div className="absolute inset-0 fabric-texture z-20 opacity-40"></div>
        </div>
        <div className="absolute inset-0 z-10 flex items-center justify-end overflow-hidden pointer-events-none">
          <img
            alt="Elite Fabrics Logo Background"
            className="w-full lg:w-auto h-[60%] lg:h-[110%] object-contain opacity-25 lg:translate-x-12 -translate-y-12 lg:translate-y-0 drop-shadow-2xl"
            src={(content?.global?.images?.logo || "https://res.cloudinary.com/detwuzqry/image/upload/v1775717220/stitcheerr_assets/logo.png").replace('/upload/', '/upload/f_auto,q_auto/')}
          />
        </div>
        <div className="container mx-auto px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold font-headline leading-tight text-on-background mb-6">
              {heroData.title ? heroData.title : (
                <>Premium <span className="text-primary">Uniform Fabric</span> for Every Industry</>
              )}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-on-surface-variant font-light mb-10 leading-relaxed">
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
            <span className="text-tertiary font-bold tracking-widest text-sm uppercase">Industry Standards</span>
            <h2 className="text-4xl font-bold font-headline mt-2">Fabric Solutions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 group relative overflow-hidden rounded-xl h-80 bg-surface-container-lowest transition-all hover:shadow-xl">
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity">
                <img className="w-full h-full object-cover" loading="lazy" data-alt="Sharp, professional business suits and shirts on display in a luxury boutique" src="https://res.cloudinary.com/detwuzqry/image/upload/f_auto,q_auto/v1775717707/stitcheerr_assets/bsywtsz1pgrpqo3vcxhm.png"/>
              </div>
              <div className="relative p-10 h-full flex flex-col justify-end">
                <h3 className="text-3xl font-bold font-headline mb-2 text-primary">Corporate Wear</h3>
                <p className="text-on-surface-variant max-w-md">Executive grade materials designed for durability and breathability in high-performance environments.</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl h-80 bg-tertiary-container transition-all hover:shadow-xl">
              <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity">
                <img className="w-full h-full object-cover" loading="lazy" data-alt="Clean, high-quality blue medical scrubs folded neatly" src="https://res.cloudinary.com/detwuzqry/image/upload/f_auto,q_auto/v1775717708/stitcheerr_assets/d5hgmwfgyhsk2lmcbgj1.png"/>
              </div>
              <div className="relative p-10 h-full flex flex-col justify-end text-on-tertiary-container">
                <h3 className="text-3xl font-bold font-headline mb-2">Medical Textiles</h3>
                <p className="opacity-90">Antimicrobial and bleach-resistant fabrics for safety and comfort.</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl h-80 bg-secondary-container transition-all hover:shadow-xl">
              <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity">
                <img className="w-full h-full object-cover" loading="lazy" data-alt="Durable school blazers and trousers showing high-quality textile weave" src="https://res.cloudinary.com/detwuzqry/image/upload/f_auto,q_auto/v1775717709/stitcheerr_assets/ls7aid56da4au68o7nkl.png"/>
              </div>
              <div className="relative p-10 h-full flex flex-col justify-end text-on-secondary-container">
                <h3 className="text-3xl font-bold font-headline mb-2">School Uniforms</h3>
                <p className="opacity-90">Tear-resistant and easy-wash blends for active students.</p>
              </div>
            </div>
            <div className="md:col-span-2 group relative overflow-hidden rounded-xl h-80 bg-surface-container-highest transition-all hover:shadow-xl">
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity">
                <img className="w-full h-full object-cover" loading="lazy" data-alt="Heavy-duty high-visibility workwear jacket with reflective strips" src="https://res.cloudinary.com/detwuzqry/image/upload/f_auto,q_auto/v1775717710/stitcheerr_assets/xuftn55kohpwejxktuza.png"/>
              </div>
              <div className="relative p-10 h-full flex flex-col justify-end">
                <h3 className="text-3xl font-bold font-headline mb-2 text-on-background">Industrial Safety</h3>
                <p className="text-on-surface-variant max-w-md">FR-rated and heavy-duty twills engineered for extreme protection and rugged use.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-headline mb-4">Trusted by Industry Leaders</h2>
            <div className="h-1 w-24 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 overflow-hidden">
            <div className="flex-1 bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/10">
              <div className="flex text-tertiary mb-6">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="text-lg italic text-on-surface mb-8 leading-relaxed">&quot;Elite Fabrics ka kapra waqai lajawab hai. Hamare staff ki uniforms ka color fade nahi hota aur inki delivery bhi humesha time par hoti hai. Highly recommended!&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold">AR</div>
                <div>
                  <h4 className="font-bold text-on-surface">Ali Raza</h4>
                  <p className="text-sm text-on-surface-variant">Procurement Manager, Asim Mills</p>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/10">
              <div className="flex text-tertiary mb-6">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="text-lg italic text-on-surface mb-8 leading-relaxed">&quot;Hum pichlay 5 saal se yahan se school uniforms ka kapra buy kar rahe hain. Bachon ke kapray jaldi kharab ho jatay thay, lekin inka fabric bohat mazboot aur washable hai!&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold">ZR</div>
                <div>
                  <h4 className="font-bold text-on-surface">Zainab Rauf</h4>
                  <p className="text-sm text-on-surface-variant">Admin Head, The Smart School</p>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/10">
              <div className="flex text-tertiary mb-6">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="text-lg italic text-on-surface mb-8 leading-relaxed">&quot;Hospital scrubs aur bed linens ke fabric ke liye inki quality best lagi. Kapra naram aur saans lene wala hai, jo 24 hour duty ke liye staff ke liye perfect hai.&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold">DF</div>
                <div>
                  <h4 className="font-bold text-on-surface">Dr. Farhan</h4>
                  <p className="text-sm text-on-surface-variant">Medical Director, City Hospital</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 fabric-texture opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-8 relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline text-on-primary mb-8 px-2">Ready to Elevate Your Team&apos;s Appearance?</h2>
          <p className="text-lg sm:text-xl text-primary-fixed mb-12 max-w-2xl mx-auto opacity-90 px-4">Get custom fabric swatches and a comprehensive quote for your organization within 24 hours.</p>
          <Link to="/quotes" className="inline-block px-12 py-5 bg-tertiary text-on-tertiary font-bold text-xl rounded-xl shadow-2xl hover:bg-tertiary/90 transition-all active:scale-95">
            Request a Free Quote Now
          </Link>
        </div>
      </section>
    </>
  );
}
