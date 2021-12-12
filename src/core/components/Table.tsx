import { FC, useCallback, useContext, useMemo, useState } from 'react';
import Context from '../../core/network/Context';

export type TableData<T> = {
  [key: string]: T;
};

export type TableSearchOperands = 'contains' | 'exact';
export type TableSearchValue = { operand: TableSearchOperands; value: string };
export type TableSearch<T, S extends keyof T> = Record<S, TableSearchValue>;
export type TableProps<T, SeachField extends keyof T> = {
  data: TableData<T>;
  columns: Array<keyof T>;
  defaultSearch: TableSearch<T, SeachField>;
};

const Component = <T, SeachField extends keyof T>(props: TableProps<T, SeachField>) => {
  const { data, columns, defaultSearch } = props;
  const [search, setSearch] = useState<TableSearch<T, SeachField>>(defaultSearch);
  const operands: TableSearchOperands[] = ['contains', 'exact'];
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
  const renderSearch = useCallback(
    (key: SeachField): React.ReactNode => {
      if (key in search) {
        return (
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
        );
      }
      return null;
    },
    [search]
  );
  return (
    <table>
      <thead>
        <tr>
          {columns.map((key) => (
            <th key={String(key)}>{key}</th>
          ))}
        </tr>
        <tr>
          {columns.map((key) => (
            <td key={`search.${key}`}>{renderSearch(key as SeachField)}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((order, index) => (
          <tr key={index}>
            {columns.map((key) => (
              <td key={`${index}.${key}`}>{order[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Component;
