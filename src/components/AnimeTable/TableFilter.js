import React  from "react";
import { Autocomplete, TextField } from "@mui/material";
import "./style.css";
import { episodeOptions, statusOptions } from "../../constants";

const TableFilter = ({ globalFilter, setGlobalFilter, filters, handleFilterChange, handleClearFilter }) => {
    return (
        <div className="searchContainer">
            <div>
                <label>Search:</label>
                <input
                    type="text"
                    value={globalFilter || ''}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                />
            </div>
            <div>
                <label>
                    Episodes:
                </label>
                <select value={filters?.episodes} name="episodes" id="episodes" onChange={(e) => {
                    handleFilterChange(e.target.value?.split(","), "episodes");
                }}>
                    <option value=""></option>
                    {episodeOptions.map((option) => <option value={option.value}>{option.label}</option>)}
                </select>
            </div>
            <div>
                <label>
                    Status:
                </label>
                <select value={filters?.status} name="status" id="status" onChange={(e) => {
                    handleFilterChange(e.target.value, "status");
                }}>
                    <option value=""></option>
                    {statusOptions.map((option) => <option value={option.value}>{option.label}</option>)}
                </select>
            </div>
            {filters?.episodes || filters?.status
                ? <div className="clearFilter" onClick={() => handleClearFilter()}>Clear Filter</div>
                : null
            }
        </div>
    )
};

export default TableFilter;