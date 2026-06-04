"use client";

import React, { useState, useEffect } from 'react';
import { Title } from '../../../ui/Title';
import { Button } from '../../../ui/Button';
import { Input } from '../../../ui/Input';
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  ExperienceEntity
} from '../../../services/dashboard';

export default function ExperiencesDashboard() {
  const [experiences, setExperiences] = useState<ExperienceEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    period: '',
    description: '',
    skills: '',
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const data = await getExperiences();
      setExperiences(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = editingId !== null;

    const payload = {
      ...formData,
      skills: formData.skills
        ? formData.skills.split(',').map(s => s.trim()).filter(Boolean)
        : [],
    };

    try {
      if (isEditing) {
        await updateExperience(editingId, payload);
      } else {
        await createExperience(payload);
      }
      setFormData({ role: '', company: '', period: '', description: '', skills: '' });
      setEditingId(null);
      fetchExperiences();
    } catch (err: any) {
      alert(err.message || 'Error saving experience');
    }
  };

  const handleEdit = (exp: ExperienceEntity) => {
    setEditingId(exp.id);
    setFormData({
      role: exp.role,
      company: exp.company,
      period: exp.period,
      description: exp.description,
      skills: exp.skills ? exp.skills.map(s => s.name).join(', ') : '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    try {
      await deleteExperience(id);
      fetchExperiences();
    } catch (err: any) {
      alert(err.message || 'Error deleting experience');
    }
  };

  if (loading) return <div className="p-8 font-label-bold uppercase animate-pulse">Loading Experiences...</div>;

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      <div className="bg-surface p-6 md:p-10 neo-border-heavy neo-shadow-sm">
        <Title 
          as="h3" 
          prefix="" 
          highlight={editingId ? "EDIT EXPERIENCE" : "NEW EXPERIENCE"} 
          highlightColorClass="bg-theme-yellow text-on-surface" 
          highlightRotateClass="-rotate-1"
          className="mb-8 uppercase tracking-tighter text-[28px] md:text-[36px] font-display-2xl leading-none" 
        />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-label-bold text-sm uppercase opacity-80 mb-2 block">Role</label>
              <Input className="w-full" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} required />
            </div>
            <div>
              <label className="font-label-bold text-sm uppercase opacity-80 mb-2 block">Company</label>
              <Input className="w-full" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} required />
            </div>
            <div className="md:col-span-2">
              <label className="font-label-bold text-sm uppercase opacity-80 mb-2 block">Period (e.g. 2021 - Present)</label>
              <Input className="w-full" value={formData.period} onChange={e => setFormData({...formData, period: e.target.value})} required />
            </div>
            <div className="md:col-span-2">
              <label className="font-label-bold text-sm uppercase opacity-80 mb-2 block">Skills / Tags (Comma-separated, e.g. HTML5, SASS, JavaScript)</label>
              <Input className="w-full" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} placeholder="HTML5, SASS, JavaScript" />
            </div>
            <div className="md:col-span-2">
              <label className="font-label-bold text-sm uppercase opacity-80 mb-2 block">Description</label>
              <textarea 
                className="w-full p-3 font-mono text-sm neo-border bg-surface focus:outline-none focus:ring-4 focus:ring-theme-yellow min-h-[100px]"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <Button type="submit" className="bg-theme-blue text-surface py-4 neo-border hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#1e1b19] transition-all px-8">
              {editingId ? 'UPDATE EXPERIENCE' : 'ADD EXPERIENCE'}
            </Button>
            {editingId && (
              <Button type="button" onClick={() => { setEditingId(null); setFormData({ role: '', company: '', period: '', description: '', skills: '' }); }} className="bg-theme-grey text-on-surface py-4 neo-border hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#1e1b19] transition-all px-8">
                CANCEL
              </Button>
            )}
          </div>
        </form>
      </div>

      <div className="flex flex-col gap-4">
        {experiences.map(exp => (
          <div key={exp.id} className="bg-surface p-6 neo-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <h4 className="font-display-2xl text-2xl uppercase tracking-tighter">{exp.role}</h4>
              <p className="font-label-bold opacity-60 text-sm mb-2">{exp.company} • {exp.period}</p>
              <p className="text-sm font-mono opacity-80 line-clamp-2">{exp.description}</p>
              {exp.skills && exp.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {exp.skills.map((s) => (
                    <span key={s.id} className="font-mono text-xs uppercase px-2 py-0.5 bg-theme-yellow/20 neo-border border-[2px]">
                      {s.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-3 w-full md:w-auto md:flex-col lg:flex-row">
              <button onClick={() => handleEdit(exp)} className="font-label-bold text-xs uppercase bg-theme-yellow px-6 py-3 neo-border flex-1 hover:bg-on-surface hover:text-surface transition-colors">Edit</button>
              <button onClick={() => handleDelete(exp.id)} className="font-label-bold text-xs uppercase bg-theme-red text-surface px-6 py-3 neo-border flex-1 hover:bg-on-surface hover:text-theme-red transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
