import { useEffect } from 'react';
import type { SharedData } from '../types';
import { usePage } from '@inertiajs/react';

export default function PublicPage() {
  const { page } = usePage<SharedData>().props;

  // Apply theme class to document.body or a root element on mount
  // useEffect(() => {
  //   const theme = page?.theme ?? 'modern-blue';
  //   document.body.className = `page-${theme} min-h-screen`;
  //   // Optionally handle dark mode
  //   // if (localStorage.getItem('color-scheme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //   //   document.documentElement.classList.add('dark');
  //   // } else {
  //   //   document.documentElement.classList.remove('dark');
  //   // }
  // }, [page?.theme]);

  if (!page) return <div className="p-8">Loading...</div>;

  return (
    <div
      className={`h-screen bg-cover`}
      style={{ backgroundImage: page.background_path ? `url(${page.background_path})` : undefined }}
    >
      <div className="p-8 ">
        <header className='flex gap-2'>
          {page.logo_path && (
            <img src={page.logo_path} alt="Logo" className="max-h-10 mb-4" />
          )}
          <h1 className="text-center font-bold text-4xl w-fit ">{page.title}</h1>
        </header>
        <div className="prose h-full page-modern-blue" dangerouslySetInnerHTML={{ __html: page.body ?? '' }} />
      </div>
    </div>
  );
}