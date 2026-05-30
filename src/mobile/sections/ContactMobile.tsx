import React from 'react';
import { useData } from '../../context/DataContext';

export const ContactMobile: React.FC = () => {
    const { contactData } = useData();
    return (
        <section id="contact" className="w-full bg-[#fbdcdb] px-4 py-16 flex flex-col overflow-hidden">
            <h2 className="font-display-2xl text-[48px] leading-[0.9] uppercase tracking-tighter text-on-surface mb-10 font-extrabold flex flex-col items-start gap-2 reveal-left">
                {contactData.headline.line1} {contactData.headline.line2}
                <span className="inline-block bg-[#cc2929] text-[#f4f1ea] px-3 py-1 rounded-[4px] border-[3px] border-on-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                    {contactData.headline.highlight}
                </span>
            </h2>

            <form action={contactData.emailDestination} method="POST" encType="text/plain" className="flex flex-col gap-6 w-full">
                <div className="flex flex-col gap-2 reveal-bottom" style={{ transitionDelay: '50ms' }}>
                    <label className="font-label-bold font-bold text-xs tracking-widest uppercase text-on-surface">NAME</label>
                    <input 
                        type="text" 
                        name="name"
                        placeholder={contactData.form.namePlaceholder}
                        className="w-full bg-white border-[3px] border-on-surface px-4 py-3 font-body-lg shadow-[4px_4px_0px_0px_#1e1b19] focus:outline-none focus:translate-x-1 focus:translate-y-1 focus:shadow-none transition-all"
                    />
                </div>
                
                <div className="flex flex-col gap-2 reveal-bottom" style={{ transitionDelay: '150ms' }}>
                    <label className="font-label-bold font-bold text-xs tracking-widest uppercase text-on-surface">EMAIL ALIAS</label>
                    <input 
                        type="email" 
                        name="email"
                        placeholder={contactData.form.emailPlaceholder}
                        className="w-full bg-white border-[3px] border-on-surface px-4 py-3 font-body-lg shadow-[4px_4px_0px_0px_#1e1b19] focus:outline-none focus:translate-x-1 focus:translate-y-1 focus:shadow-none transition-all"
                    />
                </div>

                <div className="flex flex-col gap-2 reveal-bottom" style={{ transitionDelay: '250ms' }}>
                    <label className="font-label-bold font-bold text-xs tracking-widest uppercase text-on-surface">MESSAGE</label>
                    <textarea 
                        name="message"
                        rows={4}
                        placeholder={contactData.form.messagePlaceholder}
                        className="w-full bg-white border-[3px] border-on-surface px-4 py-3 font-body-lg shadow-[4px_4px_0px_0px_#1e1b19] focus:outline-none focus:translate-x-1 focus:translate-y-1 focus:shadow-none transition-all resize-none"
                    ></textarea>
                </div>

                <button 
                    type="submit"
                    className="w-full mt-4 bg-on-surface text-surface py-4 border-[3px] border-on-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] flex justify-center items-center active:translate-y-1 active:translate-x-1 active:shadow-none transition-all reveal-bottom"
                    style={{ transitionDelay: '350ms' }}
                >
                    <span className="font-label-bold font-bold uppercase tracking-wider">{contactData.form.submitText}</span>
                </button>
            </form>
        </section>
    );
};
