import { useState, useCallback } from 'react';

import { TableProps } from './types';

type ReturnType = TableProps;

export type UseTableProps = {
  defaultOrder?: 'asc' | 'desc';
  defaultOrderBy?: string;
  defaultRowsPerPage?: number;
  defaultCurrentPage?: number;
};

export default function useTable(props?: UseTableProps): ReturnType {

  const [orderBy, setOrderBy] = useState<string | undefined>(undefined);

  const [order, setOrder] = useState<'asc' | 'desc'>(props?.defaultOrder || 'asc');

  const [page, setPage] = useState(props?.defaultCurrentPage || 0);

  const [totalPage, setTotalPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      if (id !== '') {
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
      }
    },
    [order, orderBy]
  );

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  }, []);


  return {
    order,
    page,
    orderBy,
    rowsPerPage,
    onSort,
    onChangePage,
    onChangeRowsPerPage,
    setPage,
    setOrder,
    setOrderBy,
    setRowsPerPage,
    setTotalPage,
    totalPage
  };
}
