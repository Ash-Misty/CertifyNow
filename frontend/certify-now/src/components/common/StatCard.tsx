// import React from 'react';
// import { cn } from '@/lib/utils';
// import { LucideIcon } from 'lucide-react';

// interface StatCardProps {
//   title: string;
//   value: string | number;
//   icon: LucideIcon;
//   trend?: {
//     value: number;
//     isPositive: boolean;
//   };
//   variant?: 'default' | 'primary' | 'success' | 'warning' | 'accent';
//   className?: string;
// }

// export const StatCard: React.FC<StatCardProps> = ({
//   title,
//   value,
//   icon: Icon,
//   trend,
//   variant = 'default',
//   className,
// }) => {
//   const variantStyles = {
//     default: 'bg-card',
//     primary: 'bg-primary/5',
//     success: 'bg-success/5',
//     warning: 'bg-warning/5',
//     accent: 'bg-accent/5',
//   };

//   const iconStyles = {
//     default: 'bg-muted text-muted-foreground',
//     primary: 'bg-primary/10 text-primary',
//     success: 'bg-success/10 text-success',
//     warning: 'bg-warning/10 text-warning',
//     accent: 'bg-accent/10 text-accent',
//   };

//   return (
//     <div
//       className={cn(
//         'stat-card group',
//         variantStyles[variant],
//         className
//       )}
//     >
//       <div className="flex items-start justify-between">
//         <div className="flex-1">
//           <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
//           <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
//           {trend && (
//             <div className="flex items-center mt-2">
//               <span
//                 className={cn(
//                   'text-sm font-medium',
//                   trend.isPositive ? 'text-success' : 'text-destructive'
//                 )}
//               >
//                 {trend.isPositive ? '+' : ''}{trend.value}%
//               </span>
//               <span className="text-xs text-muted-foreground ml-2">vs last month</span>
//             </div>
//           )}
//         </div>
//         <div
//           className={cn(
//             'flex items-center justify-center w-12 h-12 rounded-xl transition-transform group-hover:scale-110',
//             iconStyles[variant]
//           )}
//         >
//           <Icon className="w-6 h-6" />
//         </div>
//       </div>

//       {/* Decorative gradient */}
//       <div
//         className={cn(
//           'absolute bottom-0 left-0 right-0 h-1 rounded-b-xl opacity-0 transition-opacity group-hover:opacity-100',
//           variant === 'primary' && 'gradient-primary',
//           variant === 'success' && 'gradient-success',
//           variant === 'accent' && 'gradient-accent',
//           variant === 'default' && 'bg-border'
//         )}
//       />
//     </div>
//   );
// };
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'accent';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  variant = 'default',
  className,
}) => {
  const variantStyles = {
    default: 'bg-card',
    primary: 'bg-primary/5',
    success: 'bg-success/5',
    warning: 'bg-warning/5',
    accent: 'bg-accent/5',
  };

  const iconStyles = {
    default: 'bg-muted text-muted-foreground',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    accent: 'bg-accent/10 text-accent',
  };

  return (
    <div
      className={cn(
        'stat-card group',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={cn(
                  'text-sm font-medium',
                  trend.isPositive ? 'text-success' : 'text-destructive'
                )}
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-xs text-muted-foreground ml-2">vs last month</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            'flex items-center justify-center w-12 h-12 rounded-xl transition-transform group-hover:scale-110',
            iconStyles[variant]
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {/* Decorative gradient */}
      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 h-1 rounded-b-xl opacity-0 transition-opacity group-hover:opacity-100',
          variant === 'primary' && 'gradient-primary',
          variant === 'success' && 'gradient-success',
          variant === 'accent' && 'gradient-accent',
          variant === 'default' && 'bg-border'
        )}
      />
    </div>
  );
};