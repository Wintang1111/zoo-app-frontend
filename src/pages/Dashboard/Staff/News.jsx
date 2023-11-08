import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { get } from '~/utils/axiosClient';
import { remove } from '../AxiosClient';

export default function ViewNews() {

    const navigate = useNavigate();
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const toast = useRef(null);

    const labels = {
        title: 'View News',
        subtitle: 'Table of News',
        apiPath: '/news'
    }
    const { data, mutate, isLoading } = useSWR(labels.apiPath, get)

    // const handleRowDoubleClick = (selectedNews) => {
    //     // const selectedNews = params.data;
    //     const homeNewsId = selectedNews.id;
    //     navigate(`/home/news/${homeNewsId}`);
    // };

    const imgUrl = (rowData) => {
        return <div style={{ width: '100px', height: '100px' }}>
            <img src={rowData.imgUrl} alt={rowData.title} width="100" />
        </div>;
    };
    const thumbnailUrl = (rowData) => {
        return <div style={{ width: '100px', height: '100px' }}>
            <img src={rowData.thumbnailUrl} alt={rowData.title} width="100" />
        </div>;
    };
    const createdDate = (rowData) => {
        return <span>{new Date(rowData.createdDate).toLocaleString()}</span>;
    };

    const status = (item) => {
        return <Tag value={item.status ?
            'True' :
            'False'}
            className={`${item.status ? 'bg-green-400' : 'bg-red-500'} p-2 text-[0.9rem]`} />
    }

    const type = (item) => {
        const typeColor = item.type === 'Event' ? 'text-yellow-500' : 'text-green-400';
        const typeText = item.type === 'Event' ? 'Event' : 'Info';

        return (
            <span className={`${typeColor} p-2 text-[0.9rem]`}>
                {typeText}
            </span>
        );
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editNews(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => handleDeleteClick(rowData)} />
            </React.Fragment>
        );
    };
    const editNews = (news) => {
        console.log(news)
        const NewsId = news.id;
        navigate(`/home/news/update/${NewsId}`);
    };

    const handleDeleteClick = (rowData) => {
        setDeleteProductDialog(true)
        setDeleteId(rowData.id)
    }

    const confirmDeleteSelected = () => {
        remove(`${labels.apiPath}/${deleteId}`)
            .then((response) => {
                if (response.status === 200) {
                    setDeleteProductDialog(false)
                    mutate({ ...data })
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Delete Successfully', life: 3000 });
                }
            })
            .catch((error) => {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'An error has occurred', life: 3000 });
                console.error('DELETE request failed:', error);
            });
    };
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={() => setDeleteProductDialog(true)} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={confirmDeleteSelected} />
        </React.Fragment>
    );
    const truncateText = (text, limit) => {
        if (text.length > limit) {
            return text.slice(0, limit) + '...';
        }
        return text;
    };
    const columns = [
        { field: 'id', header: 'ID' },
        { field: 'title', header: 'Title', body: (rowData) => <span>{truncateText(rowData.title, 30)}</span> },
        { field: 'shortDescription', header: 'Short Description', body: (rowData) => <span>{truncateText(rowData.shortDescription, 200)}</span> },
        { field: 'content', header: 'Content', body: (rowData) => <span>{truncateText(rowData.shortDescription, 200)}</span> },
        { header: 'ImgUrl', body: imgUrl },
        { header: 'ThumbnailUrl', body: thumbnailUrl },
        { field: 'type', header: 'Type', body: type },
        { field: 'createdDate', header: 'Created Date', body: createdDate },
        { field: 'status', header: 'Status', body: status },
        { header: 'Action', body: actionBodyTemplate },
    ];
    return (
        <div className='p-5'>
            <div className=''>
                <p className='text-3xl font-bold'>{labels.title}</p>
                <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
            </div>
            {data &&
                <div className='mt-5'>
                    <DataTable value={data.data} loading={isLoading} showGridlines>
                        {columns.map((col) => (
                            <Column key={col.field} field={col.field} header={col.header} body={col.body} />
                        ))}
                    </DataTable>
                </div>
            }
            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={() => setDeleteProductDialog(false)}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {data && (
                        <span>
                            Are you sure you want to delete <b>{data.id}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
            <Toast ref={toast} />
        </div>
    );
}
