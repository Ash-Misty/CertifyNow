// import React from 'react';
// import { cn } from '@/lib/utils';

// interface LoaderProps {
//   size?: 'sm' | 'md' | 'lg';
//   className?: string;
// }

// export const Loader: React.FC<LoaderProps> = ({ size = 'md', className }) => {
//   const sizeClasses = {
//     sm: 'w-4 h-4 border-2',
//     md: 'w-8 h-8 border-3',
//     lg: 'w-12 h-12 border-4',
//   };

//   return (
//     <div
//       className={cn(
//         'animate-spin rounded-full border-primary border-t-transparent',
//         sizeClasses[size],
//         className
//       )}
//     />
//   );
// };

// export const PageLoader: React.FC = () => {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-background">
//       <div className="flex flex-col items-center gap-4">
//         <Loader size="lg" />
//         <p className="text-muted-foreground animate-pulse">Loading...</p>
//       </div>
//     </div>
//   );
// };

// export const CardLoader: React.FC = () => {
//   return (
//     <div className="flex h-48 items-center justify-center">
//       <Loader size="md" />
//     </div>
//   );
// };
import React from 'react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md', className }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-primary border-t-transparent',
        sizeClasses[size],
        className
      )}
    />
  );
};

export const PageLoader: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader size="lg" />
        <p className="text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export const CardLoader: React.FC = () => {
  return (
    <div className="flex h-48 items-center justify-center">
      <Loader size="md" />
    </div>
  );
};