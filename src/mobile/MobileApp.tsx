import React from 'react';
import { MobileHeader } from './MobileHeader';
import { HeroMobile } from './sections/HeroMobile';
import { AboutMobile } from './sections/AboutMobile';
import { SkillsMobile } from './sections/SkillsMobile';
import { WorkMobile } from './sections/WorkMobile';
import { ExperienceMobile } from './sections/ExperienceMobile';
import { ResumeMobile } from './sections/ResumeMobile';
import { ContactMobile } from './sections/ContactMobile';
import { MobileFooter } from './MobileFooter';

export const MobileApp: React.FC = () => {
    return (
        <div className="bg-[#f4f1ea] text-on-background font-body-md min-h-screen flex flex-col relative w-full overflow-x-hidden selection:bg-theme-yellow selection:text-on-surface">
            <MobileHeader />
            <main className="flex-grow w-full flex flex-col">
                <HeroMobile />
                <AboutMobile />
                <WorkMobile />
                <ExperienceMobile />
                <SkillsMobile />
                <ResumeMobile />
                <ContactMobile />
            </main>
            <MobileFooter />
        </div>
    );
};
