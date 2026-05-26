"use client";

import React, { useActionState } from 'react';
import { Title } from '../../ui/Title';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { loginAction } from '../actions/auth';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen bg-theme-yellow flex items-center justify-center p-4">
      <div className="bg-surface p-8 md:p-12 neo-border-heavy shadow-[16px_16px_0px_0px_#1e1b19] w-full max-w-md transform rotate-1">
        <Title 
          as="h1" 
          prefix="NRE " 
          highlight="ADMIN" 
          highlightColorClass="bg-theme-red text-surface" 
          className="mb-8 text-center uppercase tracking-tighter font-display-2xl text-[48px] leading-none" 
        />
        
        <form action={formAction} className="flex flex-col gap-6">
          <div>
            <label className="font-label-bold text-sm uppercase tracking-widest mb-2 block text-on-surface">Email Address</label>
            <Input name="email" type="email" required placeholder="admin@neo-gruv.com" className="w-full" />
          </div>
          
          <div>
            <label className="font-label-bold text-sm uppercase tracking-widest mb-2 block text-on-surface">Password</label>
            <Input name="password" type="password" required placeholder="••••••••" className="w-full" />
          </div>

          {state?.error && (
            <div className="bg-theme-red text-surface p-3 neo-border font-label-bold text-sm uppercase">
              {state.error}
            </div>
          )}

          <Button type="submit" disabled={isPending} className="w-full bg-theme-blue text-surface py-4 mt-4 neo-border hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#1e1b19] transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none">
            {isPending ? 'AUTHENTICATING...' : 'LOGIN'}
          </Button>
        </form>
      </div>
    </div>
  );
}
