import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';

export default function OurFabrics() {
  const content = useSelector((state) => state.content.data);
  const fabricsHero = content?.fabrics?.hero || {};
  const fabricsCatalog = content?.fabrics?.catalog?.items || [];
  const fabricsCta = content?.fabrics?.cta || {};

  const [searchParams, setSearchParams] = useSearchParams();
  const [filterCategory, setFilterCategory] = useState(searchParams.get('category') || 'All');
  const [sortOrder, setSortOrder] = useState('Featured');
  const [localSearch, setLocalSearch] = useState(searchParams.get('search') || '');

  // Extract unique categories from CMS data
  const categories = ['All', ...new Set(fabricsCatalog.map(f => f.category))];

  // Sync URL params when internal state changes
  useEffect(() => {
    const params = {};
    if (filterCategory !== 'All') params.category = filterCategory;
    if (localSearch) params.search = localSearch;
    setSearchParams(params);
  }, [filterCategory, localSearch, setSearchParams]);

  const [prevSearchParams, setPrevSearchParams] = useState(searchParams);
  if (searchParams !== prevSearchParams) {
    setPrevSearchParams(searchParams);
    const searchFromUrl = searchParams.get('search') || '';
    if (searchFromUrl !== localSearch) {
      setLocalSearch(searchFromUrl);
    }
    const categoryFromUrl = searchParams.get('category') || 'All';
    if (categoryFromUrl !== filterCategory) {
      setFilterCategory(categoryFromUrl);
    }
  }

  // Apply filtering
  let displayedFabrics = fabricsCatalog.filter((fabric) => {
    const matchesCategory = filterCategory === 'All' || fabric.category === filterCategory;
    const matchesSearch = fabric.title.toLowerCase().includes(localSearch.toLowerCase()) || 
                          fabric.description.toLowerCase().includes(localSearch.toLowerCase()) ||
                          fabric.category.toLowerCase().includes(localSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Apply sorting
  displayedFabrics.sort((a, b) => {
    if (sortOrder === 'Featured') {
      return (a.featured === b.featured) ? 0 : a.featured ? -1 : 1;
    } else if (sortOrder === 'A-Z') {
      return a.title.localeCompare(b.title);
    } else if (sortOrder === 'Z-A') {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  return (
    <>
      <SEO 
        title="Our Fabrics - Toptex, Nichiee & Industrial Blends" 
        description="Browse our collection of premium shirting, industrial blends, and school uniform fabrics. High tensile strength and wrinkle-resistant materials."
        keywords="toptex fabric, winnertex, nichiee blend, kt shirting, industrial textile catalog"
      />
      <section className="relative h-[409px] flex items-center justify-center overflow-hidden bg-surface-container-low">
        <div className="absolute inset-0 textile-grain"></div>
        <div className="z-10 text-center px-6 max-w-full overflow-hidden">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-extrabold text-on-surface tracking-tight mb-4 break-words">
            {fabricsHero.title || "Precision in Every Thread"}
          </h1>
          <p className="text-on-surface-variant text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-full break-words">
            {fabricsHero.subtitle || "Discover our curated collection of industrial and corporate fabrics, engineered for durability and professional excellence."}
          </p>
        </div>
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-tertiary/5 rounded-full blur-3xl"></div>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-0">
          <div className="space-y-1">
            <span className="text-tertiary font-semibold tracking-widest text-xs uppercase">Product Catalog</span>
            <h2 className="text-3xl font-headline font-bold">The Textile Collection</h2>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-wrap bg-surface-container p-1 rounded-lg gap-1">
              {categories.map((category) => (
                <button 
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${filterCategory === category ? 'bg-surface-container-lowest shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  {category === 'All' ? 'All Fabrics' : category}
                </button>
              ))}
            </div>
            <div className="relative group min-w-[240px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">search</span>
              <input 
                type="text" 
                placeholder="Search collection..."
                className="w-full pl-10 pr-4 py-2 bg-surface-container rounded-lg text-sm outline-none border-2 border-transparent focus:border-primary/30 focus:bg-white transition-all"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
              {localSearch && (
                <button 
                  onClick={() => setLocalSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 hover:text-red-500 transition-colors text-sm"
                >
                  close
                </button>
              )}
            </div>
            <div className="relative group">
              <button 
                onClick={() => setSortOrder(prev => prev === 'Featured' ? 'A-Z' : (prev === 'A-Z' ? 'Z-A' : 'Featured'))}
                className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest rounded-lg text-sm font-medium text-on-surface outline outline-1 outline-outline-variant/20 hover:bg-surface-container-low transition-colors h-full"
                title="Click to toggle sorting"
              >
                <span className="material-symbols-outlined text-sm">filter_list</span>
                Sort by: {sortOrder}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {displayedFabrics.map((fabric) => (
            <div key={fabric.id} className="bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col sm:flex-row transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
              <div className="sm:w-2/5 h-64 sm:h-auto overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" alt={fabric.title} src={fabric.image}/>
              </div>
              <div className="sm:w-3/5 p-8 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 mb-2 text-tertiary">
                    <span className="text-[10px] font-bold uppercase tracking-widest">{fabric.category}</span>
                    {fabric.featured && <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[10px] font-bold">Featured</span>}
                  </div>
                  <h3 className="font-headline text-xl font-bold mb-3">{fabric.title}</h3>
                  <p className="text-on-surface-variant text-sm mb-6 line-clamp-3">{fabric.description}</p>
                  
                  <div className="flex gap-2 mb-8 items-center">
                    {fabric.colors?.map((color, idx) => (
                      <div key={idx} className="w-6 h-6 rounded-full shadow-inner border border-outline-variant/20" style={{backgroundColor: color}}></div>
                    ))}
                    <span className="text-xs text-on-surface-variant self-center ml-2">10+ Colors</span>
                  </div>
                </div>
                
                <Link to="/quotes" className="w-full block py-3 text-center border border-primary/20 text-primary rounded-lg text-sm font-bold hover:bg-primary hover:text-on-primary hover:border-transparent transition-all">
                  Get Quotes
                </Link>
              </div>
            </div>
          ))}
          {displayedFabrics.length === 0 && (
             <div className="col-span-full py-20 text-center text-on-surface-variant">
               <span className="material-symbols-outlined text-4xl mb-2 opacity-50">search_off</span>
               <p>No fabrics found for the selected category.</p>
             </div>
          )}
        </div>
      </section>

      <section className="bg-surface-container-low py-24 relative overflow-hidden">
        <div className="absolute inset-0 textile-grain"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10 text-center">
          <h2 className="font-headline text-4xl font-bold mb-6">{fabricsCta.title || "Need a Custom Fabric Solution?"}</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto mb-10 text-lg">
            {fabricsCta.subtitle || "Our textile engineers can work with you to develop proprietary blends tailored to your organization's specific durability and aesthetic requirements."}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={`tel:${content?.global?.config?.phone || '03323804080'}`} className="flex items-center justify-center gap-2 px-10 py-4 bg-primary text-on-primary font-bold rounded-lg shadow-xl shadow-primary/20 hover:-translate-y-0.5 transition-transform">
              <span className="material-symbols-outlined text-xl">phone_iphone</span>
              Call Us: {content?.global?.config?.phone || '03323804080'}
            </a>
            <a href={`https://wa.me/${content?.global?.config?.whatsapp || '923211660362'}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-10 py-4 bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#128C7E] shadow-xl shadow-[#25D366]/20 hover:-translate-y-0.5 transition-all">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
