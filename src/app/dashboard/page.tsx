import React from 'react';
import { ConfigEditor } from './components/ConfigEditor';

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-4">
      <ConfigEditor 
        configKey="hero"
        title="Hero Section"
        fields={[
          { key: 'tagline', label: 'Tagline', type: 'textarea' },
          { 
            key: 'headline', 
            label: 'Headline', 
            type: 'nested', 
            fields: [
              { key: 'line1', label: 'Line 1', type: 'text' },
              { key: 'line2', label: 'Line 2', type: 'text' },
              { key: 'highlight', label: 'Highlight Word', type: 'text' }
            ]
          },
          { key: 'ctaText', label: 'CTA Button Text', type: 'text' },
          { key: 'ctaHref', label: 'CTA Button Link', type: 'text' },
          { 
            key: 'heroImage', 
            label: 'Hero Graphic Image', 
            type: 'nested', 
            fields: [
              { key: 'src', label: 'Image URL', type: 'text' },
              { key: 'alt', label: 'Image Alt Text', type: 'text' }
            ]
          }
        ]}
      />

      <ConfigEditor 
        configKey="about"
        title="About Section"
        fields={[
          { key: 'badge', label: 'Badge Text', type: 'text' },
          { 
            key: 'headline', 
            label: 'Headline', 
            type: 'nested', 
            fields: [
              { key: 'line1', label: 'Line 1', type: 'text' },
              { key: 'line2', label: 'Line 2', type: 'text' },
              { key: 'highlight', label: 'Highlight Word', type: 'text' }
            ]
          },
          { key: 'manifesto', label: 'Manifesto / Paragraph', type: 'textarea' },
          { key: 'portraitLabel', label: 'Portrait Label', type: 'text' },
          {
            key: 'rules',
            label: 'Rules / Core Values',
            type: 'object_array',
            defaultItem: { label: 'Rule 0X', text: 'Rule description goes here.' },
            fields: [
              { key: 'label', label: 'Label (e.g. Rule 01)', type: 'text' },
              { key: 'text', label: 'Text', type: 'text' }
            ]
          }
        ]}
      />

      <ConfigEditor 
        configKey="resume"
        title="Resume Section"
        fields={[
          { key: 'versionLabel', label: 'Version Label', type: 'text' },
          { 
            key: 'headline', 
            label: 'Headline', 
            type: 'nested', 
            fields: [
              { key: 'prefix', label: 'Prefix', type: 'text' },
              { key: 'highlight', label: 'Highlight Word', type: 'text' }
            ]
          },
          { key: 'ctaText', label: 'CTA Button Text', type: 'text' },
          { key: 'downloadUrl', label: 'Download URL', type: 'text' },
        ]}
      />

      <ConfigEditor 
        configKey="contact"
        title="Contact Section"
        fields={[
          { 
            key: 'headline', 
            label: 'Headline', 
            type: 'nested', 
            fields: [
              { key: 'line1', label: 'Line 1', type: 'text' },
              { key: 'line2', label: 'Line 2', type: 'text' },
              { key: 'highlight', label: 'Highlight Word', type: 'text' }
            ]
          },
          { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
          { key: 'emailDestination', label: 'Email Destination (mailto:...)', type: 'text' },
        ]}
      />

      <ConfigEditor 
        configKey="navigation"
        title="Navbar"
        fields={[
          { key: 'brandName', label: 'Brand Name (e.g. CREATIVE.RAW)', type: 'text' },
          { key: 'ctaText', label: 'CTA Button Text', type: 'text' },
          {
            key: 'navLinks',
            label: 'Navigation Links',
            type: 'object_array',
            defaultItem: { label: 'New Link', href: '#' },
            fields: [
              { key: 'label', label: 'Label', type: 'text' },
              { key: 'href', label: 'URL (e.g. #about)', type: 'text' }
            ]
          }
        ]}
      />

      <ConfigEditor 
        configKey="footer"
        title="Footer"
        fields={[
          { key: 'brandName', label: 'Brand Name', type: 'text' },
          { key: 'copyright', label: 'Copyright Text', type: 'text' },
          { 
            key: 'socials', 
            label: 'Social Links', 
            type: 'object_array',
            defaultItem: { label: 'New Link', href: '#', hoverColor: 'hover:text-theme-yellow', hoverBorder: 'hover:border-theme-yellow' },
            fields: [
              { key: 'label', label: 'Label', type: 'text' },
              { key: 'href', label: 'URL', type: 'text' },
              { key: 'hoverColor', label: 'Hover Color Class (e.g. hover:text-theme-red)', type: 'text' },
              { key: 'hoverBorder', label: 'Hover Border Class (e.g. hover:border-theme-red)', type: 'text' }
            ]
          }
        ]}
      />

      <ConfigEditor 
        configKey="marquee"
        title="Marquee Text"
        fields={[
          { key: '', label: 'Marquee Items (One per line)', type: 'root_string_array' }
        ]}
      />
    </div>
  );
}
