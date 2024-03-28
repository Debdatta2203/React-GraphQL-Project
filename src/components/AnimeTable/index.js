import React, { useEffect, useMemo, useState } from "react";
import { options, url } from "../apiConfig";
import { tableColumns } from "../../TableConfig/tableColumns";
import { handleTableData } from "../../utils";
import CustomTable from "./CustomTable";

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
            const response = await fetch(url, options)
            .then(handleResponse)
            .then((resp) => {
                setTableData(handleTableData(resp?.data?.Page?.media));
            });
        } catch(err) {
            console.log(err);
        }
    };

    const handleResponse = (response) => {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    };

    // console.log("VideoPlayer FE ", tableData);

    return (
        <div>
            {
                !loading
                ? <CustomTable tableData={tableData} />
                : <div>Loading...</div>
            }
           {/* <Table tableData={tableData} /> */}
           {/* <table>
                {tableData?.ea}
           </table> */}
        </div>
    );
};

export default AnimeTable;