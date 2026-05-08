import React from 'react';
import { Button } from '../ui/Button';
import { Title } from '../ui/Title';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { contactData } from '../data';

export const Contact: React.FC = () => {
    const { headline, subtitle, form } = contactData;

    return (
        <section className="py-24 px-gutter bg-theme-yellow neo-section-divider reveal-section w-full" id="contact">
            <div className="max-w-container-max mx-auto">
                <div className="bg-surface neo-border-heavy neo-shadow p-8 md:p-16 flex flex-col items-center text-center transform rotate-[-1deg] hover:rotate-0 transition-transform duration-500 animate-float">
                    <Title 
                        prefix={<>{headline.line1}<br/>{headline.line2} </>}
                        highlight={headline.highlight}
                        highlightColorClass="bg-on-surface text-surface"
                        highlightRotateClass="rotate-[-2deg]"
                        className="font-display-2xl text-[48px] md:text-[64px] lg:text-[80px] uppercase tracking-tighter mb-4 text-on-surface leading-none"
                    />
                    <p className="font-body-lg text-on-surface font-bold mb-8 max-w-md bg-theme-grey px-6 py-3 neo-border neo-shadow-sm rotate-2 hover:-rotate-1 hover:scale-105 transition-all duration-300">
                        {subtitle}
                    </p>
                    <form className="w-full max-w-2xl flex flex-col gap-6 relative z-10">
                        <Input focusColorClass="focus:bg-theme-red" placeholder={form.namePlaceholder} type="text"/>
                        <Input focusColorClass="focus:bg-theme-blue" placeholder={form.emailPlaceholder} type="email"/>
                        <Textarea focusColorClass="focus:bg-theme-green" placeholder={form.messagePlaceholder}></Textarea>
                        <Button type="button" className="w-full bg-on-surface text-theme-yellow font-display-2xl text-[32px] md:text-[40px] py-6 neo-border-heavy hover:bg-surface hover:text-on-surface hover:-translate-y-2 shadow-[8px_8px_0px_0px_#1e1b19] hover:shadow-[16px_16px_0px_0px_#1e1b19] active:translate-y-2 active:shadow-none duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] mt-4 tracking-tighter">
                            {form.submitText}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};