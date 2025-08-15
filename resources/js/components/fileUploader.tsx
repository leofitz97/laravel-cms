


interface Props {
  onChange: (file: File) => void;
  accept?: string;
  label?: string;
}



export default function FileUploader({ onChange, accept='image/*', label='Upload' }: Props) {
  return (
    <label className="flex items-center gap-2 px-3 py-2 border rounded bg-white cursor-pointer">
      <input type="file" accept={accept} className="hidden" onChange={(e) => {
        const f = e.target.files?.[0];
        if (f) onChange(f);
      }} />
      <span className="text-sm">{label}</span>
    </label>
  );
}
