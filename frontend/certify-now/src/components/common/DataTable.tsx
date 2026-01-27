// import React, { useState, useMemo } from 'react';
// import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { cn } from '@/lib/utils';

// interface Column<T> {
//   key: keyof T | string;
//   header: string;
//   render?: (item: T) => React.ReactNode;
//   className?: string;
// }

// interface DataTableProps<T> {
//   data: T[];
//   columns: Column<T>[];
//   searchable?: boolean;
//   searchKeys?: (keyof T)[];
//   pageSize?: number;
//   className?: string;
// }

// export function DataTable<T extends { id: string }>({
//   data,
//   columns,
//   searchable = true,
//   searchKeys = [],
//   pageSize = 10,
//   className,
// }: DataTableProps<T>) {
//   const [search, setSearch] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);

//   const filteredData = useMemo(() => {
//     if (!search || searchKeys.length === 0) return data;

//     return data.filter(item =>
//       searchKeys.some(key => {
//         const value = item[key];
//         if (typeof value === 'string') {
//           return value.toLowerCase().includes(search.toLowerCase());
//         }
//         return false;
//       })
//     );
//   }, [data, search, searchKeys]);

//   const totalPages = Math.ceil(filteredData.length / pageSize);
//   const startIndex = (currentPage - 1) * pageSize;
//   const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

//   const goToPage = (page: number) => {
//     setCurrentPage(Math.max(1, Math.min(page, totalPages)));
//   };

//   return (
//     <div className={cn('w-full space-y-4', className)}>
//       {searchable && (
//         <div className="relative max-w-sm">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//           <Input
//             placeholder="Search..."
//             value={search}
//             onChange={e => {
//               setSearch(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="pl-10"
//           />
//         </div>
//       )}

//       <div className="rounded-xl border border-border bg-card overflow-hidden shadow-soft">
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow className="bg-muted/50 hover:bg-muted/50">
//                 {columns.map((column, index) => (
//                   <TableHead
//                     key={index}
//                     className={cn('font-semibold text-foreground', column.className)}
//                   >
//                     {column.header}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {paginatedData.length === 0 ? (
//                 <TableRow>
//                   <TableCell
//                     colSpan={columns.length}
//                     className="h-24 text-center text-muted-foreground"
//                   >
//                     No results found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 paginatedData.map(item => (
//                   <TableRow
//                     key={item.id}
//                     className="transition-colors hover:bg-muted/30"
//                   >
//                     {columns.map((column, colIndex) => (
//                       <TableCell key={colIndex} className={column.className}>
//                         {column.render
//                           ? column.render(item)
//                           : String(item[column.key as keyof T] ?? '')}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       </div>

//       {totalPages > 1 && (
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
//           <p className="text-sm text-muted-foreground">
//             Showing {startIndex + 1} to {Math.min(startIndex + pageSize, filteredData.length)} of{' '}
//             {filteredData.length} results
//           </p>

//           <div className="flex items-center gap-1">
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => goToPage(1)}
//               disabled={currentPage === 1}
//               className="h-8 w-8"
//             >
//               <ChevronsLeft className="w-4 h-4" />
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => goToPage(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="h-8 w-8"
//             >
//               <ChevronLeft className="w-4 h-4" />
//             </Button>

//             <div className="flex items-center gap-1 mx-2">
//               {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                 let pageNum: number;
//                 if (totalPages <= 5) {
//                   pageNum = i + 1;
//                 } else if (currentPage <= 3) {
//                   pageNum = i + 1;
//                 } else if (currentPage >= totalPages - 2) {
//                   pageNum = totalPages - 4 + i;
//                 } else {
//                   pageNum = currentPage - 2 + i;
//                 }

//                 return (
//                   <Button
//                     key={pageNum}
//                     variant={currentPage === pageNum ? 'default' : 'outline'}
//                     size="icon"
//                     onClick={() => goToPage(pageNum)}
//                     className="h-8 w-8"
//                   >
//                     {pageNum}
//                   </Button>
//                 );
//               })}
//             </div>

//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => goToPage(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className="h-8 w-8"
//             >
//               <ChevronRight className="w-4 h-4" />
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => goToPage(totalPages)}
//               disabled={currentPage === totalPages}
//               className="h-8 w-8"
//             >
//               <ChevronsRight className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
  searchKeys?: (keyof T)[];
  pageSize?: number;
  className?: string;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  searchable = true,
  searchKeys = [],
  pageSize = 10,
  className,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!search || searchKeys.length === 0) return data;

    return data.filter(item =>
      searchKeys.some(key => {
        const value = item[key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(search.toLowerCase());
        }
        return false;
      })
    );
  }, [data, search, searchKeys]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className={cn('w-full space-y-4', className)}>
      {searchable && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10"
          />
        </div>
      )}

      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                {columns.map((column, index) => (
                  <TableHead
                    key={index}
                    className={cn('font-semibold text-foreground', column.className)}
                  >
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No results found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map(item => (
                  <TableRow
                    key={item.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    {columns.map((column, colIndex) => (
                      <TableCell key={colIndex} className={column.className}>
                        {column.render
                          ? column.render(item)
                          : String(item[column.key as keyof T] ?? '')}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + pageSize, filteredData.length)} of{' '}
            {filteredData.length} results
          </p>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className="h-8 w-8"
            >
              <ChevronsLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 w-8"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-1 mx-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => goToPage(pageNum)}
                    className="h-8 w-8"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-8 w-8"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className="h-8 w-8"
            >
              <ChevronsRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
