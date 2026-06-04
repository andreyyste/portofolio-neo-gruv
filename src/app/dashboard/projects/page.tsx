"use client";

import React, { useState, useEffect } from 'react';
import { Title } from '../../../ui/Title';
import { Button } from '../../../ui/Button';
import { Input } from '../../../ui/Input';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  ProjectEntity
} from '../../../services/dashboard';

export default function ProjectsDashboard() {
  const [projects, setProjects] = useState<ProjectEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    brief: '',
    description: '',
    link: '',
    githubLink: '',
    imageSrc: '',
    imageAlt: '',
    tags: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
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
      const payload = {
        title: formData.title,
        brief: formData.brief,
        description: formData.description,
        liveUrl: formData.link || null,
        githubRepo: formData.githubLink || null,
        coverImage: formData.imageSrc || null,
        hasSourceCode: !!formData.githubLink,
        tags: formData.tags ? formData.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : []
      };

      if (isEditing) {
        await updateProject(editingId, payload);
      } else {
        await createProject(payload);
      }

      setFormData({ title: '', brief: '', description: '', link: '', githubLink: '', imageSrc: '', imageAlt: '', tags: '' });
      setEditingId(null);
      fetchProjects();
    } catch (err: any) {
      alert(err.message || 'Error saving project');
    }
  };

  const handleEdit = (project: ProjectEntity) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      brief: project.brief,
      description: project.description,
      link: project.liveUrl || '',
      githubLink: project.githubRepo || '',
      imageSrc: project.coverImage || '',
      imageAlt: '',
      tags: project.tags ? project.tags.map(t => typeof t === 'string' ? t : (t as { name: string }).name).join(', ') : '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(id);
      fetchProjects();
    } catch (err: any) {
      alert(err.message || 'Error deleting project');
    }
  };

  if (loading) return <div className="p-8 font-label-bold uppercase animate-pulse">Loading Projects...</div>;

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      <div className="bg-surface p-6 md:p-10 neo-border-heavy neo-shadow-sm">
        <Title 
          as="h3" 
          prefix="" 
          highlight={editingId ? "EDIT PROJECT" : "NEW PROJECT"} 
          highlightColorClass="bg-theme-yellow text-on-surface" 
          highlightRotateClass="rotate-1"
          className="mb-8 uppercase tracking-tighter text-[28px] md:text-[36px] font-display-2xl leading-none" 
        />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-label-bold text-sm uppercase opacity-80 mb-2 block">Title</label>
              <Input className="w-full" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            </div>
            <div>
              <label className="font-label-bold text-sm uppercase opacity-80 mb-2 block">Brief / Type</label>
              <Input className="w-full" value={formData.brief} onChange={e => setFormData({...formData, brief: e.target.value})} required />
            </div>
            <div>
              <label className="font-label-bold text-sm uppercase opacity-80 mb-2 block">Image URL</label>
              <Input className="w-full" value={formData.imageSrc} onChange={e => setFormData({...formData, imageSrc: e.target.value})} required />
            </div>
            <div>
              <label className="font-label-bold text-sm uppercase opacity-80 mb-2 block">Image Alt</label>
              <Input className="w-full" value={formData.imageAlt} onChange={e => setFormData({...formData, imageAlt: e.target.value})} required />
            </div>
            <div>
              <label className="font-label-bold text-sm uppercase opacity-80 mb-2 block">Link (Demo / URL)</label>
              <Input className="w-full" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} required />
            </div>
            <div>
              <label className="font-label-bold text-sm uppercase opacity-80 mb-2 block">GitHub / Source Link</label>
              <Input className="w-full" value={formData.githubLink} onChange={e => setFormData({...formData, githubLink: e.target.value})} />
            </div>
            <div className="md:col-span-2">
              <label className="font-label-bold text-sm uppercase opacity-80 mb-2 block">Tags (Comma-separated, e.g. React, Phaser 3)</label>
              <Input className="w-full" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} />
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
              {editingId ? 'UPDATE PROJECT' : 'ADD PROJECT'}
            </Button>
            {editingId && (
              <Button type="button" onClick={() => { setEditingId(null); setFormData({ title: '', brief: '', description: '', link: '', githubLink: '', imageSrc: '', imageAlt: '', tags: '' }); }} className="bg-theme-grey text-on-surface py-4 neo-border hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#1e1b19] transition-all px-8">
                CANCEL
              </Button>
            )}
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-surface p-6 neo-border flex flex-col justify-between">
            <div>
              <h4 className="font-display-2xl text-2xl uppercase tracking-tighter mb-2">{project.title}</h4>
              <p className="font-label-bold opacity-60 text-sm mb-4">{project.brief}</p>
              <p className="text-sm font-mono opacity-80 line-clamp-3 mb-4">{project.description}</p>
            </div>
            <div className="flex gap-3 border-t-2 border-on-surface pt-4 mt-4">
              <button onClick={() => handleEdit(project)} className="font-label-bold text-xs uppercase bg-theme-yellow px-4 py-2 neo-border flex-1 hover:bg-on-surface hover:text-surface transition-colors">Edit</button>
              <button onClick={() => handleDelete(project.id)} className="font-label-bold text-xs uppercase bg-theme-red text-surface px-4 py-2 neo-border flex-1 hover:bg-on-surface hover:text-theme-red transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
