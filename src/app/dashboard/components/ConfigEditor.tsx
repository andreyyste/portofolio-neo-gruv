"use client";

import React, { useState, useEffect } from 'react';
import { Title } from '../../../ui/Title';
import { Button } from '../../../ui/Button';
import { Input } from '../../../ui/Input';

interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'nested';
  fields?: FieldConfig[]; // for nested objects like headline: { prefix, highlight }
}

interface ConfigEditorProps {
  configKey: string;
  title: string;
  fields: FieldConfig[];
}

export function ConfigEditor({ configKey, title, fields }: ConfigEditorProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchConfig();
  }, [configKey]);

  const fetchConfig = async () => {
    try {
      const res = await fetch(`/api/proxy/config/${configKey}`);
      if (res.ok) {
        const json = await res.json();
        setData(json.value || {});
      } else {
        setData({});
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch(`/api/proxy/config/${configKey}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: data }),
      });
      if (res.ok) {
        setMessage('Saved successfully!');
      } else {
        setMessage('Error saving data.');
      }
    } catch (e) {
      setMessage('Error saving data.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleChange = (path: string[], value: string) => {
    setData((prev: any) => {
      const newData = { ...prev };
      let current = newData;
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {};
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  const renderField = (field: FieldConfig, parentPath: string[] = []) => {
    const path = [...parentPath, field.key];
    const value = path.reduce((obj, key) => (obj && obj[key] !== undefined) ? obj[key] : '', data) || '';

    if (field.type === 'nested' && field.fields) {
      return (
        <div key={path.join('.')} className="p-4 bg-theme-grey neo-border flex flex-col gap-4">
          <label className="font-label-bold uppercase text-theme-red">{field.label}</label>
          {field.fields.map(subField => renderField(subField, path))}
        </div>
      );
    }

    return (
      <div key={path.join('.')} className="flex flex-col gap-2">
        <label className="font-label-bold text-sm uppercase opacity-80">{field.label}</label>
        {field.type === 'textarea' ? (
          <textarea 
            className="w-full p-3 font-mono text-sm neo-border bg-surface text-on-surface focus:outline-none focus:ring-4 focus:ring-theme-yellow min-h-[100px]"
            value={value}
            onChange={(e) => handleChange(path, e.target.value)}
          />
        ) : (
          <Input 
            className="w-full"
            value={value}
            onChange={(e) => handleChange(path, e.target.value)}
          />
        )}
      </div>
    );
  };

  if (loading) return <div className="p-8 font-label-bold uppercase animate-pulse">Loading {title}...</div>;

  return (
    <div className="bg-surface p-6 md:p-10 neo-border-heavy neo-shadow-sm mb-12">
      <Title 
        as="h3" 
        prefix="" 
        highlight={title.toUpperCase()} 
        highlightColorClass="bg-theme-yellow text-on-surface" 
        highlightRotateClass="rotate-0"
        className="mb-8 uppercase tracking-tighter text-[28px] md:text-[36px] font-display-2xl leading-none" 
      />
      
      {message && (
        <div className={`p-4 mb-6 neo-border font-bold uppercase ${message.includes('Error') ? 'bg-theme-red text-surface' : 'bg-theme-green text-on-surface'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        {fields.map(f => renderField(f))}
        <Button type="submit" disabled={saving} className="bg-theme-blue text-surface py-4 neo-border hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#1e1b19] transition-all self-start px-8 mt-4 disabled:opacity-50">
          {saving ? 'SAVING...' : 'SAVE CHANGES'}
        </Button>
      </form>
    </div>
  );
}
