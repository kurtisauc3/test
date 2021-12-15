import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

export type TableData<T> = { [key: string]: T };

export type TableSearchOperands = 'contains' | 'exact';
export type TableSearchValue = { operand: TableSearchOperands; value: string };
export type TableSearch<T> = Record<keyof T, TableSearchValue>;
export type ColumnProps<T> = {
  key: keyof T;
  display: string;
  render?: (data: T) => React.ReactNode;
  allowSearch?: boolean;
  props?: React.ThHTMLAttributes<HTMLTableCellElement>;
};
export type TableProps<T> = {
  data: TableData<T>;
  columns: Array<ColumnProps<T>>;
};
const operands: TableSearchOperands[] = ['contains', 'exact'];

const TableContainer = styled.table`
  th {
    text-transform: uppercase;
    font-weight: 500;
  }
`;

const Component = <T,>(props: TableProps<T>) => {
  const { data, columns } = props;
  const [search, setSearch] = useState<TableSearch<T>>(
    columns.reduce(
      (acc, col) => ({ ...acc, [col.key]: { value: '', operand: 'contains' } as TableSearchValue }),
      {} as TableSearch<T>
    )
  );

  // data filtered by search
  const tableData = useMemo(
    () =>
      Object.values(data).filter((row) => {
        for (const key in search) {
          const { value, operand } = search[key];
          if (value.length && key in row) {
            switch (operand) {
              case 'contains':
                return String(row[key]).includes(value);
              case 'exact':
                return String(row[key]) === value;
            }
          }
        }
        return true;
      }),
    [data, search]
  );

  // renders an optional search box for each column
  const renderSearch = useCallback(
    (key: keyof T): React.ReactNode => (
      <>
        <select
          value={search[key].operand}
          onChange={({ target: { value } }) =>
            setSearch({
              ...search,
              [key]: {
                ...search[key],
                operand: value as TableSearchOperands
              }
            })
          }
        >
          {operands.map((operand) => (
            <option key={operand} value={operand}>
              {operand}
            </option>
          ))}
        </select>
        <input
          value={search[key].value}
          onChange={({ target: { value } }) =>
            setSearch({
              ...search,
              [key]: {
                ...search[key],
                value
              }
            })
          }
        />
      </>
    ),
    [search]
  );

  return (
    <TableContainer>
      <thead>
        <tr>
          {columns.map(({ key, display, props }) => (
            <th {...props} key={String(key)}>
              {display}
            </th>
          ))}
        </tr>
        <tr>
          {columns.map(({ key, allowSearch }) => (
            <td key={`search.${String(key)}`}>{allowSearch && renderSearch(key)}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((order, index) => (
          <tr key={index}>
            {columns.map(({ key, render }) => (
              <td key={`${index}.${String(key)}`}>{render ? render(order) : order[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
};

export default Component;
