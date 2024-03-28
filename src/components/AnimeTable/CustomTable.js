import React, { useMemo } from "react";
import { useTable, useGlobalFilter, useSortBy, useFilters } from "react-table";
import { tableColumns } from "../../TableConfig/tableColumns";
import "./style.css";
import TableFilter from "./TableFilter";

const CustomTable = ({ tableData, filters, handleFilterChange, handleClearFilter }) => {
    const columns = useMemo(() => tableColumns, []);
    const { 
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        state,
        setGlobalFilter,
        preGlobalFilteredRows,
        prepareRow,
    } = useTable({ columns, data: tableData,
        initialState: {
        sortBy: [
            {
                id: 'title',
                desc: false
            }
        ]
    } }, useGlobalFilter, useFilters, useSortBy);
    const { globalFilter } = state

    return (
        <div>
            <TableFilter
                globalFilter={globalFilter}
                setGlobalFilter={(value) => setGlobalFilter(value)}
                filters={filters}
                handleFilterChange={handleFilterChange}
                handleClearFilter={handleClearFilter}
            />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column?.isSorted
                                            ? column.isSortDesc
                                                ?' 🔽'
                                                : ' 🔼'
                                            : ""
                                        }
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    )
};

export default CustomTable;