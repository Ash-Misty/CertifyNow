// import React, { useCallback, useState } from 'react';
// import { Upload, File, X, CheckCircle } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button';

// interface FileUploadProps {
//   accept?: string;
//   onFileSelect: (file: File) => void;
//   label?: string;
//   description?: string;
//   className?: string;
// }

// export const FileUpload: React.FC<FileUploadProps> = ({
//   accept = '.xlsx,.xls,.pdf',
//   onFileSelect,
//   label = 'Upload File',
//   description = 'Drag and drop or click to upload',
//   className,
// }) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   const handleDrag = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setIsDragging(true);
//     } else if (e.type === 'dragleave') {
//       setIsDragging(false);
//     }
//   }, []);

//   const handleDrop = useCallback(
//     (e: React.DragEvent) => {
//       e.preventDefault();
//       e.stopPropagation();
//       setIsDragging(false);

//       const files = e.dataTransfer.files;
//       if (files && files[0]) {
//         setSelectedFile(files[0]);
//         onFileSelect(files[0]);
//       }
//     },
//     [onFileSelect]
//   );

//   const handleChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       const files = e.target.files;
//       if (files && files[0]) {
//         setSelectedFile(files[0]);
//         onFileSelect(files[0]);
//       }
//     },
//     [onFileSelect]
//   );

//   const clearFile = () => {
//     setSelectedFile(null);
//   };

//   return (
//     <div className={cn('w-full', className)}>
//       <div
//         onDragEnter={handleDrag}
//         onDragLeave={handleDrag}
//         onDragOver={handleDrag}
//         onDrop={handleDrop}
//         className={cn(
//           'relative rounded-xl border-2 border-dashed transition-all duration-300',
//           isDragging
//             ? 'border-accent bg-accent/5 scale-[1.02]'
//             : 'border-border hover:border-accent/50 hover:bg-muted/30',
//           selectedFile && 'border-success bg-success/5'
//         )}
//       >
//         <input
//           type="file"
//           accept={accept}
//           onChange={handleChange}
//           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
//         />

//         <div className="flex flex-col items-center justify-center py-10 px-6">
//           {selectedFile ? (
//             <>
//               <div className="flex items-center justify-center w-14 h-14 rounded-full bg-success/10 mb-4">
//                 <CheckCircle className="w-7 h-7 text-success" />
//               </div>
//               <div className="flex items-center gap-2 text-foreground font-medium">
//                 <File className="w-4 h-4" />
//                 <span className="truncate max-w-[200px]">{selectedFile.name}</span>
//               </div>
//               <p className="text-sm text-muted-foreground mt-1">
//                 {(selectedFile.size / 1024).toFixed(1)} KB
//               </p>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={clearFile}
//                 className="mt-3 text-destructive hover:text-destructive z-20 relative"
//               >
//                 <X className="w-4 h-4 mr-1" />
//                 Remove
//               </Button>
//             </>
//           ) : (
//             <>
//               <div
//                 className={cn(
//                   'flex items-center justify-center w-14 h-14 rounded-full mb-4 transition-colors',
//                   isDragging ? 'bg-accent/20' : 'bg-muted'
//                 )}
//               >
//                 <Upload
//                   className={cn(
//                     'w-7 h-7 transition-colors',
//                     isDragging ? 'text-accent' : 'text-muted-foreground'
//                   )}
//                 />
//               </div>
//               <p className="text-foreground font-medium">{label}</p>
//               <p className="text-sm text-muted-foreground mt-1">{description}</p>
//               <p className="text-xs text-muted-foreground mt-3">
//                 Supported formats: Excel, PDF
//               </p>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// interface ImageUploadProps {
//   onImageSelect: (file: File, previewUrl: string) => void;
//   currentImage?: string | null;
//   label?: string;
//   className?: string;
// }

// export const ImageUpload: React.FC<ImageUploadProps> = ({
//   onImageSelect,
//   currentImage,
//   label = 'Upload Image',
//   className,
// }) => {
//   const [preview, setPreview] = useState<string | null>(currentImage || null);

//   const handleChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       const file = e.target.files?.[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           const result = reader.result as string;
//           setPreview(result);
//           onImageSelect(file, result);
//         };
//         reader.readAsDataURL(file);
//       }
//     },
//     [onImageSelect]
//   );

//   return (
//     <div className={cn('w-full', className)}>
//       <label className="block text-sm font-medium text-foreground mb-2">{label}</label>
//       <div className="relative rounded-lg border-2 border-dashed border-border hover:border-accent/50 transition-colors overflow-hidden">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleChange}
//           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
//         />
//         {preview ? (
//           <div className="relative h-32 flex items-center justify-center p-4 bg-muted/30">
//             <img
//               src={preview}
//               alt="Preview"
//               className="max-h-full max-w-full object-contain"
//             />
//           </div>
//         ) : (
//           <div className="h-32 flex flex-col items-center justify-center">
//             <Upload className="w-6 h-6 text-muted-foreground mb-2" />
//             <p className="text-sm text-muted-foreground">Click to upload</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
import React, { useCallback, useState } from 'react';
import { Upload, File, X, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  accept?: string;
  onFileSelect: (file: File) => void;
  label?: string;
  description?: string;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept = '.xlsx,.xls,.pdf',
  onFileSelect,
  label = 'Upload File',
  description = 'Drag and drop or click to upload',
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files[0]) {
        setSelectedFile(files[0]);
        onFileSelect(files[0]);
      }
    },
    [onFileSelect]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files[0]) {
        setSelectedFile(files[0]);
        onFileSelect(files[0]);
      }
    },
    [onFileSelect]
  );

  const clearFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className={cn('w-full', className)}>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          'relative rounded-xl border-2 border-dashed transition-all duration-300',
          isDragging
            ? 'border-accent bg-accent/5 scale-[1.02]'
            : 'border-border hover:border-accent/50 hover:bg-muted/30',
          selectedFile && 'border-success bg-success/5'
        )}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        <div className="flex flex-col items-center justify-center py-10 px-6">
          {selectedFile ? (
            <>
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-success/10 mb-4">
                <CheckCircle className="w-7 h-7 text-success" />
              </div>
              <div className="flex items-center gap-2 text-foreground font-medium">
                <File className="w-4 h-4" />
                <span className="truncate max-w-[200px]">{selectedFile.name}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFile}
                className="mt-3 text-destructive hover:text-destructive z-20 relative"
              >
                <X className="w-4 h-4 mr-1" />
                Remove
              </Button>
            </>
          ) : (
            <>
              <div
                className={cn(
                  'flex items-center justify-center w-14 h-14 rounded-full mb-4 transition-colors',
                  isDragging ? 'bg-accent/20' : 'bg-muted'
                )}
              >
                <Upload
                  className={cn(
                    'w-7 h-7 transition-colors',
                    isDragging ? 'text-accent' : 'text-muted-foreground'
                  )}
                />
              </div>
              <p className="text-foreground font-medium">{label}</p>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
              <p className="text-xs text-muted-foreground mt-3">
                Supported formats: Excel, PDF
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

interface ImageUploadProps {
  onImageSelect: (file: File, previewUrl: string) => void;
  currentImage?: string | null;
  label?: string;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  currentImage,
  label = 'Upload Image',
  className,
}) => {
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setPreview(result);
          onImageSelect(file, result);
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageSelect]
  );

  return (
    <div className={cn('w-full', className)}>
      <label className="block text-sm font-medium text-foreground mb-2">{label}</label>
      <div className="relative rounded-lg border-2 border-dashed border-border hover:border-accent/50 transition-colors overflow-hidden">
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        {preview ? (
          <div className="relative h-32 flex items-center justify-center p-4 bg-muted/30">
            <img
              src={preview}
              alt="Preview"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ) : (
          <div className="h-32 flex flex-col items-center justify-center">
            <Upload className="w-6 h-6 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Click to upload</p>
          </div>
        )}
      </div>
    </div>
  );
};