export const handleTableData = (data) => {
    let dataArray = [];
    data?.map((row) => 
        dataArray.push({
            id: row?.id,
            name: row?.title.romaji,
        })
    )
    return dataArray;
}