import { useState, useEffect } from 'react';

export function useConfigEditor(configKey: string) {
  const [data, setData] = useState<Record<string, any> | any[] | null>(null);
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
        // Handle case where they previously saved wrapped { value: ... }
        if (json && json.value !== undefined && !json.headline && !json.brandName && !Array.isArray(json)) {
          setData(json.value);
        } else {
          setData(json || {});
        }
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
        body: JSON.stringify(data),
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
    setData((prev) => {
      const newData = Array.isArray(prev) ? [...prev] : { ...prev } as Record<string, any>;
      let current: any = newData;
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {};
        // Shallow clone arrays or objects to trigger re-render properly
        current[path[i]] = Array.isArray(current[path[i]]) ? [...current[path[i]]] : { ...current[path[i]] };
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  const handleArrayAction = (path: string[], action: 'add' | 'remove', index?: number, defaultItem?: Record<string, any>) => {
    setData((prev) => {
      const newData = Array.isArray(prev) ? [...prev] : { ...prev } as Record<string, any>;
      let current: any = newData;
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {};
        current[path[i]] = Array.isArray(current[path[i]]) ? [...current[path[i]]] : { ...current[path[i]] };
        current = current[path[i]];
      }
      const targetKey = path[path.length - 1];
      const arr = Array.isArray(current[targetKey]) ? [...current[targetKey]] : [];
      if (action === 'add') arr.push(defaultItem || {});
      if (action === 'remove' && index !== undefined) arr.splice(index, 1);
      current[targetKey] = arr;
      return newData;
    });
  };

  return {
    data,
    setData,
    loading,
    saving,
    message,
    handleSave,
    handleChange,
    handleArrayAction,
  };
}
