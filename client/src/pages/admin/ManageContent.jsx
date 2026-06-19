import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateContent, uploadImage, clearMessages } from '../../features/content/contentSlice';

const ManageContent = () => {
    const [contentKeys, setContentKeys] = useState({ page: 'home', section: 'hero' });
    const [isAdvancedMode, setIsAdvancedMode] = useState(false);
    const [formData, setFormData] = useState({});
    const [jsonString, setJsonString] = useState('');
    const [status, setStatus] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const dispatch = useDispatch();
    const { data: storeData, updateLoading, uploadLoading } = useSelector((state) => state.content);

    const sections = {
        home: ['hero', 'features', 'cta'],
        about: ['main', 'mission', 'vision'],
        fabrics: ['intro', 'gallery'],
        contact: ['info'],
        global: ['images', 'contact_info']
    };

    const [prevKeys, setPrevKeys] = useState(contentKeys);
    const [prevStoreData, setPrevStoreData] = useState(storeData);

    if (contentKeys.page !== prevKeys.page || contentKeys.section !== prevKeys.section || storeData !== prevStoreData) {
        setPrevKeys(contentKeys);
        setPrevStoreData(storeData);
        const pageData = storeData?.[contentKeys.page] || {};
        const sectionData = pageData[contentKeys.section] || {};
        setFormData(sectionData);
        setJsonString(JSON.stringify(sectionData, null, 2));
    }

    const handleFormChange = (key, value) => {
        const newFormData = { ...formData, [key]: value };
        setFormData(newFormData);
        setJsonString(JSON.stringify(newFormData, null, 2));
    };

    const handleSave = async () => {
        setStatus('Saving...');
        let dataToSave = formData;

        if (isAdvancedMode) {
            try {
                dataToSave = JSON.parse(jsonString);
            } catch {
                setStatus('Error: Invalid JSON format');
                return;
            }
        }

        try {
            const res = await dispatch(updateContent({
                page: contentKeys.page,
                section: contentKeys.section,
                data: dataToSave
            })).unwrap();
            
            setStatus(res.message || 'Content updated successfully!');
            setTimeout(() => setStatus(''), 3000);
            dispatch(clearMessages());
        } catch (err) {
            setStatus(`Error: ${err}`);
            dispatch(clearMessages());
        }
    };

    const handleInitialize = () => {
        // Simple templates for initial data
        const templates = {
            hero: { title: 'New Hero Title', subtitle: 'Add your subtitle here', image: '', ctaText: 'Learn More', ctaLink: '#' },
            features: { title: 'Our Services', subtitle: 'What we offer', items: [{ title: 'Service 1', description: 'Description here', image: '' }] },
            testimonials: { title: 'Testimonials', items: [{ name: 'John Doe', role: 'CEO', text: 'Great service!', initials: 'JD' }] },
            cta: { title: 'Ready to start?', subtitle: 'Contact us today', buttonText: 'Get Quote' },
            images: { logo: '', favicon: '' },
            contact_info: { email: '', phone: '', address: '' },
            info: { title: 'Contact Us', subtitle: 'Get in touch' }
        };

        const template = templates[contentKeys.section] || { title: 'New Section', content: 'Add content here' };
        setFormData(template);
        setJsonString(JSON.stringify(template, null, 2));
        setStatus('Template loaded. Click Publish to save.');
    };

    const handleImageUpload = async (key) => {
        if (!imageFile) return;
        setStatus('Uploading image...');
        const data = new FormData();
        data.append('image', imageFile);

        try {
            const res = await dispatch(uploadImage(data)).unwrap();
            handleFormChange(key, res.imageUrl);
            setStatus(`Image Uploaded!`);
            setImageFile(null);
        } catch (err) {
            setStatus(`Error: ${err}`);
        }
    };

    const renderFormField = (key, value) => {
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        
        // Detect Images
        if (key.toLowerCase().includes('image') || key.toLowerCase().includes('logo') || (typeof value === 'string' && value.includes('res.cloudinary.com'))) {
            return (
                <div key={key} className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">{label}</label>
                    <div className="flex items-start gap-6">
                        <div className="w-32 h-32 rounded bg-gray-200 overflow-hidden shrink-0 border border-gray-300">
                            {value ? (
                                <img src={value} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center p-2">No Image</div>
                            )}
                        </div>
                        <div className="flex-grow space-y-3">
                            <input 
                                type="text"
                                value={value || ''}
                                onChange={(e) => handleFormChange(key, e.target.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary py-2 px-3 border text-sm"
                                placeholder="Image URL (Cloudinary)"
                            />
                            <div className="flex items-center gap-2">
                                <input 
                                    type="file"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                    className="text-xs text-gray-500 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                />
                                <button 
                                    onClick={() => handleImageUpload(key)}
                                    disabled={!imageFile || uploadLoading}
                                    className="px-3 py-1 bg-primary text-white text-xs font-bold rounded shadow-sm hover:translate-y-[-1px] transition-all disabled:opacity-50"
                                >
                                    {uploadLoading ? 'Uploading...' : 'Replace Image'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // Detect Long Text
        if (typeof value === 'string' && (value.length > 80 || key.toLowerCase().includes('description') || key.toLowerCase().includes('subtitle'))) {
            return (
                <div key={key} className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">{label}</label>
                    <textarea 
                        value={value || ''}
                        onChange={(e) => handleFormChange(key, e.target.value)}
                        rows={4}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary py-2 px-3 border"
                    />
                </div>
            );
        }

        // Default Input
        return (
            <div key={key} className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">{label}</label>
                <input 
                    type="text"
                    value={value || ''}
                    onChange={(e) => handleFormChange(key, e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary py-2 px-3 border"
                />
            </div>
        );
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Visual CMS Editor</h2>
                    <p className="text-sm text-gray-500">Edit website content without touching any code.</p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-xs font-semibold text-gray-400">Advanced Mode</span>
                    <button 
                        onClick={() => setIsAdvancedMode(!isAdvancedMode)}
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${isAdvancedMode ? 'bg-primary' : 'bg-gray-200'}`}
                    >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isAdvancedMode ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Navigation Sidebar */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-xs uppercase text-gray-400 tracking-widest">Select Page</div>
                        <div className="flex flex-col">
                            {Object.keys(sections).map(page => (
                                <button 
                                    key={page}
                                    onClick={() => setContentKeys({ page, section: sections[page][0] })}
                                    className={`px-4 py-3 text-left text-sm font-semibold border-l-4 transition-all ${contentKeys.page === page ? 'bg-primary/5 border-primary text-primary' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
                                >
                                    {page.charAt(0).toUpperCase() + page.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-xs uppercase text-gray-400 tracking-widest">Section</div>
                        <div className="flex flex-col">
                            {sections[contentKeys.page].map(section => (
                                <button 
                                    key={section}
                                    onClick={() => setContentKeys({ ...contentKeys, section })}
                                    className={`px-4 py-3 text-left text-sm font-semibold transition-all ${contentKeys.section === section ? 'bg-tertiary/5 text-tertiary' : 'text-gray-500 hover:bg-gray-50'}`}
                                >
                                    {section.charAt(0).toUpperCase() + section.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Editor Area */}
                <div className="lg:col-span-9 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-lg font-bold text-gray-700 flex items-center gap-2 capitalize">
                                <span className="w-2 h-2 rounded-full bg-primary" />
                                {contentKeys.page} / {contentKeys.section}
                            </h3>
                            <div className="flex items-center gap-4">
                                <span className={`text-sm font-bold ${status.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{status}</span>
                                <button 
                                    onClick={handleSave}
                                    disabled={updateLoading}
                                    className="px-6 py-2 bg-primary text-white font-bold rounded-lg shadow-md shadow-primary/20 hover:translate-y-[-2px] transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {updateLoading ? 'Saving...' : 'Publish Changes'}
                                </button>
                            </div>
                        </div>

                        {isAdvancedMode ? (
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Raw JSON Editor</label>
                                <textarea 
                                    value={jsonString}
                                    onChange={(e) => setJsonString(e.target.value)}
                                    rows={15}
                                    className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary font-mono text-sm p-4 bg-gray-50 border"
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-8">
                                {Object.keys(formData).length > 0 ? (
                                    Object.keys(formData).map(key => renderFormField(key, formData[key]))
                                ) : (
                                    <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-xl space-y-4">
                                        <div>
                                            <p className="text-gray-400 font-medium italic text-sm">No fields found for this section.</p>
                                            <p className="text-gray-300 text-xs mt-2">Use Advanced Mode to add initial data structure or use the template below.</p>
                                        </div>
                                        <button 
                                            onClick={handleInitialize}
                                            className="px-6 py-2 bg-gray-100 text-gray-600 font-bold rounded-lg hover:bg-gray-200 transition-all text-xs"
                                        >
                                            Load Section Template
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg flex gap-3 italic">
                        <span className="material-symbols-outlined text-primary text-sm mt-1">info</span>
                        <p className="text-xs text-blue-700 leading-relaxed">
                            <strong>Tip:</strong> Changes made here reflect instantly on the public website after clicking &apos;Publish&apos;. 
                            All images are automatically processed and optimized by Cloudinary for the best performance.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageContent;
