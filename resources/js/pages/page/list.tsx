import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, SharedData } from "@/types";
import { Head, router, usePage } from "@inertiajs/react";
import { Button } from "antd";



const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Page',
    href: '/pages',
  },
];


export default function List () {
  const { pages, auth } = usePage<SharedData>().props;
  // console.log(pages)

  const handleEdit = (id: number) => router.visit(`/pages/${id}/edit`);

  const handleOnClick = (e: any, id: number ) => {
    e.preventDefault();
    e.stopPropagation();
    router.visit(`pages/${id}/analytics`);   
  }

  const handleDelete = (e: any, id: number ) => {
    e.preventDefault();
    e.stopPropagation();
    router.delete(`pages/${id}`);   
  }

  const publish = (e: any, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    router.post(`/pages/${id}/publish`);
  };

  return (
  <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Pages" />  
      <div className="space-y-6 ps-3">
        <div>
          <Button onClick={() => router.visit('pages/create')}>Create</Button>
        </div>
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full border border-muted/40 rounded-lg overflow-hidden">
            <thead className="bg-muted/40 text-muted-foreground">
              <tr className='hover:bg-muted/70'>
                <th className="px-4 py-3 text-left text-sm font-medium border-b border-muted/30">Title</th>
                <th className="px-4 py-3 text-left text-sm font-medium border-b border-muted/30">Published</th>
                <th className="px-4 py-3 text-left text-sm font-medium border-b border-muted/30">Theme</th>
                <th className="px-4 py-3 text-left text-sm font-medium border-b border-muted/30">Action</th>
              </tr>
            </thead>
            <tbody>
              {pages.map(page =>
                <tr key={page.id} onClick={() => handleEdit(page.id)} className="hover:bg-muted/70 transition-colors border-b border-muted/20 hover:cursor-pointer">
                <td className="px-4 py-3 text-sm text-foreground">{page.title}</td>
                <td className="px-4 py-3 text-sm text-foreground">{page.is_published ? 'YES' : 'NO'}</td>
                <td className="px-4 py-3 text-sm text-foreground">{page.theme}</td>
                <td className="px-4 py-3 text-sm text-foreground">
                  {auth.user.role === 'admin' && <Button type="text" size="small" className={page.is_published ? '!hidden' : 'inline !text-green-500'} onClick={e => publish(e, page.id)}>Publish</Button>}
                  <Button type="link" size="small" onClick={e => handleOnClick(e, page.id)}>View Analytics</Button>
                  <Button type="text" danger size="small" onClick={e => handleDelete(e, page.id)}>Delete</Button>
                </td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  )
}