import React, { useEffect, useState } from "react";
import { useQuery } from '@apollo/client';
import CircularProgress from "@mui/material/CircularProgress";
import { getAnimeListQuery } from "../apiConfig";
import { handleTableData } from "../../utils";
import CustomTable from "./CustomTable";
import { client } from "../../apolloClient";

const AnimeTable = () => {
    // states
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        episodes: "",
        status: "",
    });

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            fetchList();
            setTimeout(function () {
                setLoading(false);
            }, 200);
        },2000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        handleFilter();
    }, [filters]);

    const fetchList = async() => {
        try {
            const { data, errors } = await client.query({
                    query: getAnimeListQuery,
                    variables: {
                    page: 1,
                    perPage: 100,
                    },
                });
                console.log("VideoPlayer FE ", data);
                setTableData(handleTableData(data?.Page?.media));
        } catch(err) {
            console.log(err);
        }
    };

    const handleFilterChange = (newValue, name) => {
        setFilters({
          ...filters,
          [name]: newValue,
        });
    };

    const handleFilter = () => {
        if(filters?.episodes) {
            const [min, max] = filters?.episodes;
            let array = [];
            tableData?.map((row) => {
                if(row?.episodes > parseInt(min) && row?.episodes < parseInt(max)) {
                    array.push(row);
                }
            });
            setTableData(array);
        }
        if(filters?.status) {
            let array = [];
            tableData?.map((row) => {
                if(row?.status === filters?.status) {
                    array.push(row);
                }
            });
            setTableData(array);
        }
    };

    const handleClearFilter = () => {
        setFilters({
            episodes: "",
            status: "",
        });
        fetchList();
    };

    return (
        <div>
            <div className="header">
                Media List
            </div>
            {
                !loading
                ? <CustomTable tableData={tableData} filters={filters} handleFilterChange={handleFilterChange} handleClearFilter={handleClearFilter} />
                : (
                    <div className="loader">
                        <CircularProgress />
                    </div>
                )
            }
        </div>
    );
};

export default AnimeTable;