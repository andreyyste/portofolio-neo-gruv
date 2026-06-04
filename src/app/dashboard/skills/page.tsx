"use client";

import React, { useState, useEffect } from 'react';
import { Title } from '../../../ui/Title';
import { Button } from '../../../ui/Button';
import { Input } from '../../../ui/Input';
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  SkillEntity
} from '../../../services/dashboard';

export default function SkillsDashboard() {
  const [skills, setSkills] = useState<SkillEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    color: 'bg-theme-blue',
    text: 'text-surface',
    delay: '0s',
    dur: '5s',
    rotate: 'rotate-2',
    mt: 'mt-0',
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await getSkills();
      setSkills(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = editingId !== null;

    try {
      if (isEditing) {
        await updateSkill(editingId, formData);
      } else {
        await createSkill(formData);
      }

      setFormData({ name: '', color: 'bg-theme-blue', text: 'text-surface', delay: '0s', dur: '5s', rotate: 'rotate-2', mt: 'mt-0' });
      setEditingId(null);
      fetchSkills();
    } catch (err: any) {
      alert(err.message || 'Error saving skill');
    }
  };

  const handleEdit = (skill: SkillEntity) => {
    setEditingId(skill.id);
    setFormData({
      name: skill.name,
      color: skill.color,
      text: skill.text,
      delay: skill.delay,
      dur: skill.dur,
      rotate: skill.rotate,
      mt: skill.mt,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    try {
      await deleteSkill(id);
      fetchSkills();
    } catch (err: any) {
      alert(err.message || 'Error deleting skill');
    }
  };

  if (loading) return <div className="p-8 font-label-bold uppercase animate-pulse">Loading Skills...</div>;

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      <div className="bg-surface p-6 md:p-10 neo-border-heavy neo-shadow-sm">
        <Title 
          as="h3" 
          prefix="" 
          highlight={editingId ? "EDIT SKILL" : "NEW SKILL"} 
          highlightColorClass="bg-theme-yellow text-on-surface" 
          highlightRotateClass="rotate-0"
          className="mb-8 uppercase tracking-tighter text-[28px] md:text-[36px] font-display-2xl leading-none" 
        />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="font-label-bold text-sm uppercase opacity-80 mb-2 block">Skill Name</label>
              <Input className="w-full" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div>
              <label className="font-label-bold text-sm uppercase opacity-80 mb-2 block">Background Color</label>
              <Input className="w-full" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} required />
            </div>
            <div>
              <label className="font-label-bold text-sm uppercase opacity-80 mb-2 block">Text Color</label>
              <Input className="w-full" value={formData.text} onChange={e => setFormData({...formData, text: e.target.value})} required />
            </div>
            <div>
              <label className="font-label-bold text-sm uppercase opacity-80 mb-2 block">Animation Delay</label>
              <Input className="w-full" value={formData.delay} onChange={e => setFormData({...formData, delay: e.target.value})} required />
            </div>
            <div>
              <label className="font-label-bold text-sm uppercase opacity-80 mb-2 block">Animation Duration</label>
              <Input className="w-full" value={formData.dur} onChange={e => setFormData({...formData, dur: e.target.value})} required />
            </div>
            <div>
              <label className="font-label-bold text-sm uppercase opacity-80 mb-2 block">Rotation Class</label>
              <Input className="w-full" value={formData.rotate} onChange={e => setFormData({...formData, rotate: e.target.value})} required />
            </div>
            <div>
              <label className="font-label-bold text-sm uppercase opacity-80 mb-2 block">Margin Top Class</label>
              <Input className="w-full" value={formData.mt} onChange={e => setFormData({...formData, mt: e.target.value})} required />
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <Button type="submit" className="bg-theme-blue text-surface py-4 neo-border hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#1e1b19] transition-all px-8">
              {editingId ? 'UPDATE SKILL' : 'ADD SKILL'}
            </Button>
            {editingId && (
              <Button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', color: 'bg-theme-blue', text: 'text-surface', delay: '0s', dur: '5s', rotate: 'rotate-2', mt: 'mt-0' }); }} className="bg-theme-grey text-on-surface py-4 neo-border hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#1e1b19] transition-all px-8">
                CANCEL
              </Button>
            )}
          </div>
        </form>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {skills.map(skill => (
          <div key={skill.id} className="bg-surface p-4 neo-border flex flex-col justify-between text-center items-center">
            <div className={`px-4 py-2 neo-border mb-4 ${skill.color} ${skill.text} ${skill.rotate}`}>
              <span className="font-display-2xl tracking-tighter text-xl uppercase">{skill.name}</span>
            </div>
            <div className="flex gap-2 w-full mt-2">
              <button onClick={() => handleEdit(skill)} className="font-label-bold text-[10px] uppercase bg-theme-yellow py-2 neo-border flex-1 hover:bg-on-surface hover:text-surface transition-colors">Edit</button>
              <button onClick={() => handleDelete(skill.id)} className="font-label-bold text-[10px] uppercase bg-theme-red text-surface py-2 neo-border flex-1 hover:bg-on-surface hover:text-theme-red transition-colors">Del</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
