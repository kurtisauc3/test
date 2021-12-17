import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { GREY, OFF_WHITE, ORANGE, WHITE } from './styles';
import Select from './Select';
import Input from './Input';
import SearchIcon from '../../assets/icons/search.png';

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
  border-collapse: collapse;
  border-spacing: 0;
  color: ${GREY};
  thead {
    font-size: 18px;
    box-shadow: 0px 4px 1px ${GREY}33;
  }
  tbody {
  }
  tr {
    border: 2px solid ${GREY}33;
  }
  tr:nth-child(even) td {
    background-color: ${ORANGE}33;
  }
  tr:nth-child(odd) td {
    background-color: none;
  }
  td {
    padding: 12px;
  }
`;

const SearchContainer = styled.div`
  position: relative;
`;

const SearchInput = styled(Input)`
  color: ${GREY};
  padding-left: 32px;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  img {
    width: 16px;
    height: 16px;
    opacity: 0.5;
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
    (key: keyof T, allowSearch: boolean = false): React.ReactNode => (
      <div style={{ visibility: allowSearch ? 'visible' : 'hidden' }}>
        <Select
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
        </Select>
        <SearchContainer>
          <IconContainer>
            <img src={SearchIcon} />
          </IconContainer>
          <SearchInput
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
        </SearchContainer>
      </div>
    ),
    [search]
  );

  return (
    <TableContainer>
      <thead>
        <tr>
          {columns.map(({ key, display, allowSearch, props }) => (
            <td {...props} key={String(key)}>
              <b>{display}</b>
              {renderSearch(key, allowSearch)}
            </td>
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
      <tfoot></tfoot>
    </TableContainer>
  );
};

export default Component;
