import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import DataTable from '../../../globalComponents/DataTable';
import Pagination, { PAGINATION } from "../../../globalComponents/Pagination";
import { loadDataPisteAuditList } from '../../../services/PisteAudit';
import { formatLargeLabel } from '../../../services/globalFunction';
import { setPagination } from '../../../store/PisteAudit/PisteAudit';

function ListPisteAudite() {
    const { pisteAuditList, pagination, status, selectedUser } = useSelector((state) => state.pisteaudites);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadDataPisteAuditList({ start: 0, listParPage: PAGINATION.listParPage }));
    }, [dispatch]);
    /**pagination
     * @évènement onClick
     */
    const handlePageChange = ({ selected }) => {
        dispatch(setPagination({ ...pagination, currentPage: (selected), changePageClick: true }));
        dispatch(loadDataPisteAuditList({ LG_UTIID: selectedUser, DT_BEGIN: document.getElementById("DT_BEGIN").value, DT_END: document.getElementById("DT_END").value, STR_PISTYPE: document.getElementById("STR_PISTYPE").value, start: parseInt(selected) * parseInt(PAGINATION.listParPage), listParPage: PAGINATION.listParPage, search: "%" + document.getElementById("search").value + "%" }));
    };

    return (
        <>
            <DataTable
                footer        = {true}
                dataTableName = "pisteAuditList"
                data          = {pisteAuditList}
                loader        = {status.pisteaudites}
                column        = {
                    [
                        {name : '#'           ,class:"text-left"  ,dataKey:"#"                    ,dataKeyClass:'text-left'  },
                        {name : 'UTILISATEUR' ,class:"text-center",dataKey:"STR_UTIFIRSTLASTNAME" ,dataKeyClass:'text-left'  },
                        {name : 'LIBELLÉ'     ,class:"text-center",dataKey:"STR_PISLIBELLE"       ,dataKeyClass:'text-center',
                            action : (item)=>{
                                return (
                                    item?.STR_PISLIBELLE?.length>150 ?
                                        <>
                                            
                                            <div data-tooltip-id="myPisteLibelle" data-tooltip-content={item.STR_PISLIBELLE} > {formatLargeLabel(150,item.STR_PISLIBELLE)}</div>
                                            <Tooltip id="myPisteLibelle" />
                                        </>
                                    :
                                        item.STR_PISLIBELLE
                                );
                        }
                        },
                        {name : 'DATE'        ,class:"text-center",dataKey:"STR_PISDATE"          ,dataKeyClass:'text-center'},
                        {name : 'TYPE'        ,class:"text-center",dataKey:"STR_PISTYPE"          ,dataKeyClass:'text-center'},
                    ]
                }
            />
            {/* la pagination */}
            <Pagination
                onClick   = {handlePageChange}
                nbrPage   = {pagination.nbrPage}
                forcePage = {pagination.currentPage}
            />
            {/* la pagination */}
        </>
    )
}

export default ListPisteAudite