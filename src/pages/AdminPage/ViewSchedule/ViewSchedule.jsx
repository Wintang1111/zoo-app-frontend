import { useEffect, useState } from "react";
import { getAllSchedule } from "~/api/animalsService";
import { Box, Button, Typography, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '~/theme';
import { decode } from '~/utils/axiosClient';
import Actions from "./actions";
import AdminHeader from "~/component/Layout/components/AdminHeader/AdminHeader";
import { useNavigate } from "react-router-dom";

function ViewSchedule() {
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState({})
    useEffect(() => {
        const res = getAllSchedule();
        res.then((result) => {
            setSchedule(result)
        })
    }, [])

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
        },
        {
            field: 'animalId',
            headerName: 'Animal ID',
            headerAlign: 'center',
            align: 'left',
        },
        {
            field: 'dietId',
            headerName: 'Diet ID',
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'fed', // Keep the field as 'firstname'
            headerName: 'Is fed',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
            valueGetter: (params) => { return params.row.fed ? "Đã cho ăn" : "Not yet"; },
        },

        {
            field: 'feederId',
            headerName: 'Feeder ID',
            headerAlign: 'left',
            align: 'left',
        },

        {
            field: 'feedingTime',
            headerName: 'Feeding Time',
            headerAlign: 'left',
            align: 'left',
        },

        {
            field: 'zooTrainerId',
            headerName: 'Created by',
            headerAlign: 'left',
            width: 80,
        },
        {
            field: 'createdDate',
            headerName: 'Created Date',
            headerAlign: 'left',
            width: 80,
        },
        {
            field: 'approved',
            headerName: 'Approved',
            headerAlign: 'left',
            width: 80,
            valueGetter: (params) => { return params.row.approved ? "Yes" : "Not yet"; },
        },
        {
            field: 'staffId',
            headerName: 'Approved by',
            headerAlign: 'left',
            width: 80,
            valueGetter: (params) => { return params.row.staffId ? params.row.staffId : undefined; },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            width: 80,
            renderCell: (params) => <>{params.row.approved ? undefined : <Actions {...{ params }} />}</>
        }
    ];
    return (
        <Box m="20px">
            <AdminHeader title="View all animals" subtitle="Table of Animals" />
            <Button
                type="button"
                color="secondary"
                variant="contained"
                onClick={() => navigate('/tickets/create')}
            >
                Create Schedule
            </Button>
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    '& .MuiDataGrid-root': {
                        border: 'none',
                        marginLeft: '0px',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: 'none',
                    },
                    '& .name-column--cell': {
                        color: colors.greenAccent[300],
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: 'none',
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: colors.primary[400],
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: 'none',
                        backgroundColor: colors.blueAccent[700],
                    },
                    '& .MuiCheckbox-root': {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                {schedule && (
                    <DataGrid
                        rows={schedule}
                        columns={columns}
                        getRowId={(row) => row.id}
                        components={{ Toolbar: GridToolbar }}
                        checkboxSelection
                    />
                )}
            </Box>
        </Box>
    );
}

export default ViewSchedule;