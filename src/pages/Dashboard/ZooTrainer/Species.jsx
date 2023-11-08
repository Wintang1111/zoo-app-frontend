import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { get, remove } from '../AxiosClient';

const Species = () => {

    const [deleteModal, openDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const navigate = useNavigate(null)
    const toast = useRef(null);

    const labels = {
        title: 'Species Management',
        subtitle: 'Table of Species',
        apiPath: '/species'
    }

    const { data, mutate, isLoading } = useSWR(labels.apiPath, get)

    const imgBody = (item) => {
        return <img className='w-32 h-16 object-contain shadow-2 rounded-md' src={item.imgUrl} alt={item.id} />
    }
    const avatarBody = (item) => {
        return <img className='w-32 h-16 object-contain shadow-2 rounded-md' src={item.avatarUrl} alt={item.id} />
    }

    const statusBody = (item) => {
        return <Tag value={item.conversationStatus ?
            'True' :
            'False'}
            className={`${item.conversationStatus ? 'bg-green-400' : 'bg-red-500'} p-2 text-[0.9rem]`} />
    }

    const actionBody = (item) => {
        return <div className='space-x-2'>
            <Button icon='pi pi-pencil' className='border-amber-500 text-amber-500' rounded outlined onClick={() => navigate('/dashboard/species/update')} />
            <Button icon='pi pi-trash' className='border-red-500 text-red-500' rounded outlined onClick={() => handleDeleteClick(item)} />
        </div>
    }

    const handleDeleteClick = (rowData) => {
        setDeleteId(rowData.id)
        openDeleteModal(true)
    }

    const handleConfirmDelete = () => {
        remove(`${labels.apiPath}/${deleteId}`).then((response) => {
            if (response.status === 200) {
                mutate({ ...data })
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Delete successfully', life: 3000 })
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'An error has occurred', life: 3000 })
            }
            openDeleteModal(false)
        })
    }

    const deleteModalFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={() => openDeleteModal(false)} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={handleConfirmDelete} />
        </React.Fragment>
    );

    const columns = [
        { field: 'id', header: 'ID' },
        { field: 'name', header: 'Name' },
        { field: 'species', header: 'Species' },
        { header: 'Image', body: imgBody },
        { header: 'Avatar', body: avatarBody },
        { field: 'genus', header: 'Genus' },
        { field: 'family', header: 'Family' },
        { field: 'habitat', header: 'Habitat' },
        { field: 'diet', header: 'Diet' },
        { field: 'description', header: 'Description' },
        { header: 'Conver Sation Status', body: statusBody },
        { header: 'Action', body: actionBody }
    ]

    return (
        <div className='p-5'>
            {isLoading && <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />}
            <Toast ref={toast} />
            <Dialog visible={deleteModal} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                header="Confirm"
                onHide={() => openDeleteModal(false)}
                footer={deleteModalFooter}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <span>
                        Are you sure you want to delete this?
                    </span>
                </div>
            </Dialog>

            <div className=''>
                <p className='text-3xl font-bold'>{labels.title}</p>
                <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
            </div>
            {data &&
                <div className='mt-5'>
                    <DataTable value={data.data} loading={isLoading} showGridlines>
                        {columns.map((col) => (
                            <Column key={col.field} field={col.field} header={col.header} body={col.body} style={(col.header === 'Description' && { minWidth: '20rem' }) || (col.header === 'Name' && { minWidth: '15rem' })} />
                        ))}
                    </DataTable>
                </div>
            }
        </div>
    )
}

export default Species