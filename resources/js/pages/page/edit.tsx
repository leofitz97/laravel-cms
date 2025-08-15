import { useRef, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import type { BreadcrumbItem, Page } from '@/types';
import themes from '@/lib/themes';
import ThemeSelector from '@/components/themeSelector';
import FileUploader from '@/components/fileUploader';
import SunEditor, { buttonList } from 'suneditor-react';
import plugins from 'suneditor/src/plugins'
import {Button, Form, Input} from 'antd';
import AppLayout from '@/layouts/app-layout';


const options = {
  plugins: plugins,
  buttonList: buttonList.complex
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Page',
    href: '/pages',
  },
];


export default function PageEditor({ page: initialPage }: { page: Page }) {
  const [page, setPage] = useState<Partial<Page>>(initialPage || {});
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [form] = Form.useForm();
  const iframeRef = useRef<HTMLIFrameElement>(null);


  const save = () => {
    let data = form.getFieldsValue();
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('body', data.body);
    if (page.theme) formData.append('theme', page.theme);
    if (backgroundFile) formData.append('background', backgroundFile);
    if (logoFile) formData.append('logo', logoFile);
    
    if (page.id) {
      formData.append('_method', 'PUT'); // Simulate PUT
      router.post(`/pages/${page.id}`, formData, {
        forceFormData: true, // Important for Inertia to treat it as multipart/form-data
        onSuccess: () => {
          console.log('Page updated successfully');
          if (iframeRef.current) {
            iframeRef.current.src = `${iframeRef.current.src.split('?')[0]}?t=${Date.now()}`;
            // iframeRef.current.src = iframeRef.current.src;
          }
        },
        onError: (errors) => {
          console.error('Update failed', errors);
        },
      })
    }else {
      router.post(`/pages`, formData, {
        forceFormData: true, // Important for Inertia to treat it as multipart/form-data
        onSuccess: () => {
          console.log('Page updated successfully');
          if (iframeRef.current) {
            iframeRef.current.src = `${iframeRef.current.src.split('?')[0]}?t=${Date.now()}`;
            // iframeRef.current.src = iframeRef.current.src;
          }
        },
        onError: (errors) => {
          console.error('Update failed', errors);
        },
      })
    }
  };

  const publish = () => {
    if (!page.id) return alert('Save before publishing');
    router.post(`/pages/${page.id}/publish`);
  };



  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <Head title="Page Form" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" >
      <div className="bg-white p-4 rounded shadow">
        <div className="space-y-3">
          <Form
            form={form}
            initialValues={page.id ? {...page} : {}}
            layout='vertical'
          >
            <Form.Item name='title' className='!mb-1 font-semibold'>
              <Input type='text' className='font-normal !text-3xl' placeholder='Page Title' />
            </Form.Item>
            <Form.Item name='body'>
              <SunEditor height="190px" setOptions={options} setContents={page.body ?? ''}/>
            </Form.Item>
          </Form>
            

          {/* Theme */}
          <ThemeSelector themes={themes} value={page.theme ?? null} onChange={k => setPage({ ...page, theme: k })} />

          <div className='flex justify-between'>
            {/* File uploads */}
            <div className="flex gap-2"> 
              <FileUploader label="Background" onChange={f => setBackgroundFile(f)} />
              <FileUploader label="Logo" onChange={f => setLogoFile(f)} />
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button onClick={save} type='primary'>Save</Button>
              <Button onClick={publish} className={(page.id && !page.is_published) ? 'block' : 'hidden'} type='default' color='cyan'>{page.id && page.is_published ? 'UnPublish': 'Publish'}</Button>
            </div>
          </div>
          
        </div>
      </div>

      {/* Right - Live Preview */}
      <div className="p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Live Preview</h2>
        <iframe
          ref={iframeRef}
          title="preview"
          src={`/page-preview/${page.slug ?? ''}`}
          className="w-full h-[480px] border"
        />
      </div>
    </div>
    </AppLayout>
  );
}
