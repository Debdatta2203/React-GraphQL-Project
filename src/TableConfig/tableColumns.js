import "./style.css";

export const tableColumns = [
    {
        Header: 'ID',
        accessor: 'id',
    }, 
    {
        Header: 'Title',
        accessor: 'title',
        Cell: (row) => {
            console.log("VideoPlayer FE", row?.row?.original?.title);
            return(
                <div>
                    {!row?.row?.original?.title ? "N/A" : row?.row?.original?.title}
                </div>
            )
        }
    },
    {
        Header: 'Description',
        accessor: 'description',
    },
    {
        Header: 'Episodes',
        accessor: 'episodes',
    },
    {
        Header: 'Status',
        accessor: 'status',
        Cell: (row) => {
            return (
                <div className={`statusPill ${row?.row?.original?.status}`}>
                    {row?.row?.original?.status}
                </div>
            )
        }
    }
]