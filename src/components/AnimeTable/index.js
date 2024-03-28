import React, { useEffect, useState } from "react";
import { useQuery } from '@apollo/client';
import { FILMS_QUERY, getAnimeListQuery, options, url } from "../apiConfig";
import { handleTableData } from "../../utils";
import CustomTable from "./CustomTable";
import { client } from "../../apolloClient";

const AnimeTable = () => {
    // states
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const fetchList = async() => {
        try {
            const { data, errors } = await client.query({
                    query: getAnimeListQuery,
                    variables: {
                    page: 1,
                    perPage: 100,
                    },
                });
                setTableData(handleTableData(data?.Page?.media));
        } catch(err) {
            console.log(err);
        }
    };
    
    // console.log("VideoPlayer FE ", tableData);

    return (
        <div>
            <h1>Media List</h1>
            {
                !loading
                ? <CustomTable tableData={tableData} />
                : <div>Loading...</div>
            }
        </div>
    );
};

export default AnimeTable;