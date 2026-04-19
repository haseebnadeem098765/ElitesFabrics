import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { optimizeImage } from '../utils/cloudinary';

export default function AboutUs() {

  return (
    <>
      <SEO 
        title="Our Legacy - Trusted Textile Suppliers" 
        description="Learn about Elite Fabrics' journey in providing durable, high-quality industrial and institutional fabrics since establishment."
        keywords="about elite fabrics, textile manufacturers pakistan, fabric suppliers karachi"
      />
      <section className="relative px-8 py-20 lg:py-32 overflow-hidden bg-surface">
        <div className="textile-grain absolute inset-0 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 z-10 mt-12 md:mt-0">
            <span className="inline-block text-tertiary font-semibold tracking-wider text-sm mb-4 uppercase">Established Excellence</span>
            <h1 className="font-headline text-4xl sm:text-5xl lg:text-7xl font-extrabold text-primary leading-tight mb-8">
              The Thread of <br/><span className="text-on-surface">Professionalism.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed mb-10">
              Providing High-Quality Uniform Fabrics for Schools, Offices, Hospitals, and Industries. We bridge the gap between industrial durability and professional elegance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/fabrics" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-semibold rounded-lg shadow-lg hover:shadow-primary/20 transition-all inline-block text-center">
                Explore Collections
              </Link>
              <a href="https://wa.me/923211660362" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#128C7E] shadow-lg shadow-[#25D366]/20 transition-all text-center">
                 <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                 </svg>
                 Contact Us
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl relative">
              <img className="w-full h-full object-cover" loading="lazy" data-alt="Close-up of high-precision industrial weaving machinery with metallic components and fine threads" src={"https://res.cloudinary.com/detwuzqry/image/upload/f_auto,q_auto/v1775717717/stitcheerr_assets/htwrjssfunhn6skbntbr.png"}/>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-24 px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface">Our Legacy as a Trusted Supplier</h2>
              <div className="w-20 h-1 bg-tertiary"></div>
              <p className="text-lg text-on-surface-variant leading-relaxed font-light">
                At Elites Fabrics, we understand that uniform fabric is more than just raw material; it is the foundation of a professional's identity and shield. With decades of presence in the textile industry, we have honed our craft to specialize in durable, professional-quality fabrics that withstand the rigors of daily wear while maintaining a crisp, authoritative aesthetic. We custom manufacture fabrics according to party demand, whether it requires a hard Toptex finish or a specially softened weave.
              </p>
              <p className="text-lg text-on-surface-variant leading-relaxed font-light">
                From the sterile corridors of modern hospitals to the dynamic floors of industrial plants, our fabrics are engineered for performance. We source the finest raw fibers to ensure every meter of cloth meets our stringent &apos;Industrial Weaver&apos; standards.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-12">
              <div className="space-y-4">
                <div className="h-64 rounded-xl overflow-hidden bg-surface-container">
                  <img className="w-full h-full object-cover" loading="lazy" data-alt="Rolls of industrial white and grey fabrics neatly stacked in a modern clean warehouse environment" src={optimizeImage("https://res.cloudinary.com/detwuzqry/image/upload/v1775717701/stitcheerr_assets/ummkbuur82ve49dywemi.png")}/>
                </div>
                <div className="h-40 rounded-xl overflow-hidden bg-surface-container">
                  <img className="w-full h-full object-cover" loading="lazy" data-alt="Close-up of a high-precision sewing machine needle working on textured fabric" src={optimizeImage("https://res.cloudinary.com/detwuzqry/image/upload/v1775717702/stitcheerr_assets/kjzwdnknnl50ssyuiadz.png")}/>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-40 rounded-xl overflow-hidden bg-surface-container">
                  <img className="w-full h-full object-cover" loading="lazy" data-alt="A hand touching a swatch of premium high-quality dark wool fabric" src={optimizeImage("https://res.cloudinary.com/detwuzqry/image/upload/v1775717703/stitcheerr_assets/pgmevhwgiyzgnd1sdfkr.png")}/>
                </div>
                <div className="h-64 rounded-xl overflow-hidden bg-surface-container">
                  <img className="w-full h-full object-cover" loading="lazy" data-alt="Macro shot of interwoven fibers showing high-precision textile detail" src={optimizeImage("https://res.cloudinary.com/detwuzqry/image/upload/v1775717705/stitcheerr_assets/vyarn7qbdwul7gcp1rkj.png")}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-surface">
        <div className="max-w-7xl mx-auto relative group">
          <div className="absolute inset-0 bg-primary/5 rounded-3xl -rotate-1 scale-105 transition-transform group-hover:rotate-0"></div>
          <div className="relative bg-white/40 backdrop-blur-xl rounded-3xl p-12 lg:p-20 border border-white/20 shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <span className="material-symbols-outlined text-9xl">inventory_2</span>
            </div>
            <div className="max-w-3xl">
              <h3 className="font-headline text-sm font-bold text-tertiary uppercase tracking-[0.2em] mb-6">Our Mission</h3>
              <blockquote className="font-headline text-2xl sm:text-3xl md:text-5xl font-extrabold text-primary leading-tight mb-10">
                &quot;Delivering high-quality fabrics at competitive prices through precision manufacturing and direct industrial partnerships.&quot;
              </blockquote>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="w-16 h-px bg-outline-variant hidden sm:block"></div>
                <p className="text-on-surface-variant font-medium italic">Empowering professionals through textile excellence.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-surface-container">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="font-headline text-3xl font-bold mb-4">Sectors We Serve</h2>
            <p className="text-on-surface-variant">Engineered solutions for every professional environment.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-xl shadow-sm flex flex-col justify-between min-h-[300px] hover:shadow-md transition-shadow">
              <div>
                <span className="material-symbols-outlined text-primary text-4xl mb-6">school</span>
                <h4 className="font-headline text-xl font-bold mb-2">Academic Institutions</h4>
                <p className="text-on-surface-variant text-sm">Breathable, skin-friendly, and durable fabrics designed for the daily activity of students.</p>
              </div>
              <div className="mt-8 flex gap-2">
                <span className="bg-surface-container-high px-3 py-1 rounded-full text-xs font-semibold uppercase">Cotton-Rich</span>
                <span className="bg-surface-container-high px-3 py-1 rounded-full text-xs font-semibold uppercase">Anti-Pilling</span>
              </div>
            </div>
            <div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-xl shadow-sm flex flex-col justify-between min-h-[300px] hover:shadow-md transition-shadow">
              <div>
                <span className="material-symbols-outlined text-primary text-4xl mb-6">medical_services</span>
                <h4 className="font-headline text-xl font-bold mb-2">Healthcare &amp; Hospitals</h4>
                <p className="text-on-surface-variant text-sm">Anti-microbial and bleach-resistant fabric rolls for scrubs and medical lab coats.</p>
              </div>
              <div className="mt-8 flex gap-2">
                <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-xs font-semibold uppercase">Performance Badge</span>
                <span className="bg-surface-container-high px-3 py-1 rounded-full text-xs font-semibold uppercase">Sterile-Tech</span>
              </div>
            </div>
            <div className="md:col-span-1 bg-surface-container-lowest p-8 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <span className="material-symbols-outlined text-primary text-4xl mb-6">business_center</span>
                <h4 className="font-headline text-lg font-bold mb-2">Corporate Offices &amp; Hotels</h4>
                <p className="text-on-surface-variant text-xs">Premium finishes for professional suiting and uniform un-stitched fabrics.</p>
              </div>
            </div>
            <div className="md:col-span-3 bg-primary text-on-primary p-8 rounded-xl shadow-lg flex flex-col md:flex-row gap-8 items-center hover:shadow-primary/20 transition-all">
              <div className="flex-1">
                <span className="material-symbols-outlined text-surface-container-lowest text-4xl mb-6">precision_manufacturing</span>
                <h4 className="font-headline text-2xl font-bold mb-2">Heavy Industry</h4>
                <p className="text-on-primary/80 text-sm">High-visibility, fire-retardant, and ultra-durable weaves for industrial safety and mechanical environments.</p>
              </div>
              <div className="w-full md:w-48 h-32 bg-primary-container rounded-lg overflow-hidden shrink-0">
                <img className="w-full h-full object-cover opacity-60" loading="lazy" data-alt="Sparks flying in an industrial setting with a worker wearing heavy duty protective fabric" src={optimizeImage("https://res.cloudinary.com/detwuzqry/image/upload/v1775717706/stitcheerr_assets/xhjtbbqzlneqqkl0xtfp.png")}/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
