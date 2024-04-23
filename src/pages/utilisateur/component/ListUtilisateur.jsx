import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../../globalComponents/DataTable';
import Pagination, { PAGINATION } from '../../../globalComponents/Pagination';
import { loadDataAgenceList } from '../../../services/Agence';
import { loadDataProfilList } from '../../../services/Profil';
import { loadDataUtilisateurList } from '../../../services/Utilisateurs';
import { setPagination } from '../../../store/Utilisateurs/Utilisateur';
import ModalAssoProfil from '../../profil/component/ModalAssoProfil';
import RenderActionUtilisateur from './RenderActionUtilisateur';

function ListUtilisateur() {
    const { pagination, status, UtilisateurList } = useSelector((state) => state.utilisateurs);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadDataAgenceList({ start: 0, listParPage: 10000 }));
        dispatch(loadDataUtilisateurList({ start: 0, listParPage: PAGINATION.listParPage }));
        dispatch(loadDataProfilList({ search: "%", start: 0, length: 1000 }))
    }, [dispatch]);

    /**pagination
     * @évènement onClick
     */
    const handlePageChange = ({ selected }) => {
        dispatch(setPagination({ ...pagination, currentPage: (selected), changePageClick: true }));
        dispatch(loadDataUtilisateurList({ start: parseInt(selected) * parseInt(PAGINATION.listParPage), listParPage: PAGINATION.listParPage }));
    };

    return (
        <>
            <DataTable
                footer        = {true}
                dataTableName = "utilisateurlist"
                data          = {UtilisateurList}
                loader        = {status.utilisateur}
                column        = {
                    [
                        {name : '#'             ,class:"text-left"  ,dataKey:"#"                    ,dataKeyClass:'text-left'},
                        {name : 'AGENCE'        ,class:"text-center",dataKey:"LG_AGEID"             ,dataKeyClass:'text-left'},
                        {name : 'NOM & PRENOMS' ,class:"text-center",dataKey:"STR_UTIFIRSTLASTNAME" ,dataKeyClass:'text-left'},
                        {name : 'EMAIL'         ,class:"text-center",dataKey:"STR_UTIMAIL"          ,dataKeyClass:'text-center'},
                        {name : 'TÉLÉPHONE'     ,class:"text-center",dataKey:"STR_UTIPHONE"         ,dataKeyClass:'text-center'},
                        {name : 'UID'           ,class:"text-center",dataKey:"STR_UTILOGIN"         ,dataKeyClass:'text-center'},
                        {name : 'ACTION'        ,class:"text-center",dataKey:"", action: (item)=>{
                                return (<RenderActionUtilisateur item={item} />);
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
            <ModalAssoProfil />
        </>
    )
}

export default ListUtilisateur