import React from 'react';
import { ConfigEditor } from './components/ConfigEditor';

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-4">
      <ConfigEditor 
        configKey="heroData"
        title="Hero Section"
        fields={[
          { key: 'greeting', label: 'Greeting', type: 'text' },
          { 
            key: 'headline', 
            label: 'Headline', 
            type: 'nested', 
            fields: [
              { key: 'prefix', label: 'Prefix', type: 'text' },
              { key: 'highlight', label: 'Highlight Word', type: 'text' }
            ]
          },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'buttonText', label: 'Button Text', type: 'text' },
          { key: 'availability', label: 'Availability Status', type: 'text' }
        ]}
      />

      <ConfigEditor 
        configKey="aboutData"
        title="About Section"
        fields={[
          { 
            key: 'headline', 
            label: 'Headline', 
            type: 'nested', 
            fields: [
              { key: 'prefix', label: 'Prefix', type: 'text' },
              { key: 'highlight', label: 'Highlight Word', type: 'text' }
            ]
          },
          { key: 'description1', label: 'Paragraph 1', type: 'textarea' },
          { key: 'description2', label: 'Paragraph 2', type: 'textarea' },
          { key: 'imageSrc', label: 'Image URL', type: 'text' },
          { key: 'imageAlt', label: 'Image Alt Text', type: 'text' },
        ]}
      />

      <ConfigEditor 
        configKey="resumeData"
        title="Resume Section"
        fields={[
          { key: 'headline', label: 'Headline', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'ctaText', label: 'CTA Button Text', type: 'text' },
          { key: 'versionLabel', label: 'Version Label', type: 'text' },
        ]}
      />
    </div>
  );
}
