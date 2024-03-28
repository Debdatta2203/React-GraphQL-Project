export const handleTableData = (data) => {
    let dataArray = [];
    data?.map((row) => 
        dataArray.push({
            id: row?.id,
            title: row?.title.english,
            description: row?.description,
            episodes: row?.episodes,
            status: row?.status
        })
    )
    return dataArray;
}