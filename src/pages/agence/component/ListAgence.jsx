import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../../globalComponents/DataTable';
import Pagination, { PAGINATION } from "../../../globalComponents/Pagination";
import { loadDataAgenceList } from '../../../services/Agence';
import { setPagination } from '../../../store/Agences/Agences';
import RenderActionAgence from './RenderActionAgence';

function ListAgence() {
    const {agenceList, pagination, status} = useSelector((state) => state.agences);
    const dispatch = useDispatch(); 
    useEffect(() => {
        dispatch(loadDataAgenceList({ start: 0, listParPage: PAGINATION.listParPage }));
    }, [dispatch]);

    /**pagination
     * @évènement onClick
     */
    const handlePageChange = ({ selected }) => {
        dispatch(setPagination({ ...pagination, currentPage: (selected), changePageClick: true }));
        dispatch(loadDataAgenceList({ start: parseInt(selected) * parseInt(PAGINATION.listParPage), listParPage: PAGINATION.listParPage }));
    };


    return (
        <>
            <DataTable
                footer        = {true}
                dataTableName = "agenceList"
                data          = {agenceList}
                loader        = {status.agence}
                column        = {
                    [
                        {name : '#'           ,class:"text-left"  ,dataKey:"#"                  ,dataKeyClass:'text-left'  },
                        {name : 'CODE'        ,class:"text-center",dataKey:"STR_AGECODE"        ,dataKeyClass:'text-left'  },
                        {name : 'VILLE'       ,class:"text-center",dataKey:"STR_VILLE"          ,dataKeyClass:'text-left'  ,},
                        {name : 'DESCRIPTION' ,class:"text-center",dataKey:"STR_AGEDESCRIPTION" ,dataKeyClass:'text-left'},
                        {name : 'TÉLÉPHONE'   ,class:"text-center",dataKey:"STR_AGEPHONE"       ,dataKeyClass:'text-center'},
                        {name : 'MAIL'        ,class:"text-center",dataKey:"STR_AGEMAIL"        ,dataKeyClass:'text-center'},
                        {name : 'ACTION'      ,class:"text-center",dataKey:"", action: (item)=>{
                                return (<RenderActionAgence item={item} />);
                            }, 
                        dataKeyClass:'text-center'
                        }
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

export default ListAgence