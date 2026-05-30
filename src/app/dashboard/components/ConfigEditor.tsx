"use client";

import React from 'react';
import { Title } from '../../../ui/Title';
import { Button } from '../../../ui/Button';
import { Input } from '../../../ui/Input';
import { useConfigEditor } from '../../../hooks/useConfigEditor';

interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'nested' | 'root_string_array' | 'object_array';
  fields?: FieldConfig[]; // for nested objects or object_array
  defaultItem?: Record<string, any>; // for object_array
}

interface ConfigEditorProps {
  configKey: string;
  title: string;
  fields: FieldConfig[];
}

export function ConfigEditor({ configKey, title, fields }: ConfigEditorProps) {
  const {
    data,
    setData,
    loading,
    saving,
    message,
    handleSave,
    handleChange,
    handleArrayAction,
  } = useConfigEditor(configKey);

  /**
   * Recursively renders a configuration input field based on its dynamic type mapping.
   * 
   * Formats handled:
   * 1. 'root_string_array' - A leaf element mapping arrays of strings directly to newline-separated textareas.
   * 2. 'object_array' - A list of nested objects. This maps each item dynamically to sub-fields using index segments
   *    in the path, allowing additions and deletions in place.
   * 3. 'nested' - An object structure containing sub-fields. Calls renderField recursively for nested children.
   * 4. Leaf fields ('text' | 'textarea') - Renders basic HTML Input/textarea elements mapping to string values.
   * 
   * @param field - The schema configurations of the target field.
   * @param parentPath - The parent path segments in the nested state object.
   */
  const renderField = (field: FieldConfig, parentPath: string[] = []) => {
    if (field.type === 'root_string_array') {
      const val = Array.isArray(data) ? data.join('\n') : '';
      return (
        <div key="root_array" className="flex flex-col gap-2">
          <label className="font-label-bold text-sm uppercase opacity-80">{field.label}</label>
          <textarea 
            className="w-full p-3 font-mono text-sm neo-border bg-surface text-on-surface focus:outline-none focus:ring-4 focus:ring-theme-yellow min-h-[150px]"
            value={val}
            onChange={(e) => setData(e.target.value.split('\n'))}
          />
        </div>
      );
    }

    const path = [...parentPath, field.key];
    const value = path.reduce((obj, key) => (obj && obj[key] !== undefined) ? obj[key] : '', data) || '';

    if (field.type === 'object_array') {
      const arr = (path.reduce((obj, key) => (obj && obj[key] !== undefined) ? obj[key] : null, data) || []) as Record<string, any>[];
      return (
        <div key={path.join('.')} className="flex flex-col gap-4 border-l-4 border-theme-yellow pl-4">
          <label className="font-label-bold text-sm uppercase opacity-80">{field.label}</label>
          {arr.map((item, index) => (
            <div key={index} className="flex flex-col gap-3 p-4 border-2 border-surface-variant relative">
              <button 
                type="button" 
                onClick={() => handleArrayAction(path, 'remove', index)}
                className="absolute top-2 right-2 text-theme-red hover:text-white uppercase font-bold text-xs"
              >
                [X] Remove
              </button>
              {field.fields?.map(subField => renderField(subField, [...path, String(index)]))}
            </div>
          ))}
          <button 
            type="button" 
            onClick={() => handleArrayAction(path, 'add', undefined, field.defaultItem)}
            className="w-full py-2 border-2 border-dashed border-surface-variant hover:border-theme-yellow text-sm uppercase font-bold"
          >
            + Add Item
          </button>
        </div>
      );
    }

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
