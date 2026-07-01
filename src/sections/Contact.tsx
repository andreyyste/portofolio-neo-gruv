"use client";

import React, { useActionState } from 'react';
import { Button } from '../ui/Button';
import { Title } from '../ui/Title';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { useData } from '../context/DataContext';
import { sendContactAction } from '../app/actions/contact';

export const Contact: React.FC = () => {
    const { contactData } = useData();
    const { headline, subtitle, form } = contactData;

    const [state, formAction, isPending] = useActionState(sendContactAction, null);

    return (
        <section className="py-16 md:py-24 px-gutter bg-[var(--contact-bg)] neo-section-divider w-full overflow-hidden" id="contact">
            <div className="max-w-container-max mx-auto">
                <div className="bg-surface neo-border-heavy neo-shadow p-4 sm:p-8 md:p-16 flex flex-col items-center text-center transform rotate-[-1deg] hover:rotate-0 transition-transform duration-500 animate-float reveal-bottom">
                    <div className="reveal-left" style={{ transitionDelay: '0.15s' }}>
                        <Title 
                            prefix={<>{headline.line1}<br/>{headline.line2} </>}
                            highlight={headline.highlight}
                            highlightColorClass="bg-on-surface text-surface"
                            highlightRotateClass="rotate-[-2deg]"
                            className="font-display-2xl text-[32px] sm:text-[48px] md:text-[64px] lg:text-[80px] uppercase tracking-tighter mb-4 text-on-surface leading-none"
                        />
                    </div>
                    <div className="reveal-right" style={{ transitionDelay: '0.3s' }}>
                        <p className="font-body-lg text-on-surface font-bold mb-8 max-w-md bg-theme-grey px-6 py-3 neo-border neo-shadow-sm rotate-2 hover:-rotate-1 hover:scale-105 transition-all duration-300">
                            {subtitle}
                        </p>
                    </div>
                    <form action={formAction} className="w-full max-w-2xl flex flex-col gap-6 relative z-10">
                        <div className="reveal-bottom" style={{ transitionDelay: '0.4s' }}>
                            <Input focusColorClass="focus:bg-theme-red" placeholder={form.namePlaceholder} type="text" name="name" required />
                        </div>
                        <div className="reveal-bottom" style={{ transitionDelay: '0.5s' }}>
                            <Input focusColorClass="focus:bg-theme-blue" placeholder={form.emailPlaceholder} type="email" name="email" required />
                        </div>
                        <div className="reveal-bottom" style={{ transitionDelay: '0.6s' }}>
                            <Textarea focusColorClass="focus:bg-theme-green" placeholder={form.messagePlaceholder} name="message" required></Textarea>
                        </div>

                        {state?.error && (
                            <div className="text-theme-red font-bold text-left p-4 bg-surface border-2 border-theme-red neo-shadow-sm rounded-none">
                                ⚠️ {state.error}
                            </div>
                        )}

                        {state?.success && (
                            <div className="text-theme-green font-bold text-left p-4 bg-surface border-2 border-theme-green neo-shadow-sm rounded-none">
                                🎉 Message sent successfully! I will get back to you soon.
                            </div>
                        )}

                        <div className="reveal-bottom" style={{ transitionDelay: '0.7s' }}>
                            <Button 
                                type="submit" 
                                disabled={isPending}
                                className="w-full bg-on-surface text-theme-yellow font-display-2xl text-[18px] sm:text-[28px] md:text-[40px] py-3.5 sm:py-6 neo-border-heavy hover:bg-surface hover:text-on-surface hover:-translate-y-2 shadow-[8px_8px_0px_0px_#1e1b19] hover:shadow-[16px_16px_0px_0px_#1e1b19] active:translate-y-2 active:shadow-none duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] mt-4 tracking-tighter disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPending ? 'Sending...' : form.submitText}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};