import React from 'react';
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import DataTable from '../../../globalComponents/DataTable';
import { formatLargeLabel } from '../../../services/globalFunction';
import RenderActionProfilPriv from './RenderActionProfilPriv';

/**
 * LE COMPOSANT LISTE DES PROFILS
*/
function ListProfilPrivilege() {
  const { profilPrivilegeList, status } = useSelector((state) => state.profilprivileges);

  return (
    <>
      <DataTable
          footer        = {true}
          dataTableName = "profilPrivilegeList"
          data          = {profilPrivilegeList}
          loader        = {status.profil}
          column        = {
              [
                  {name : '#'              ,class:"text-left"   ,dataKey:"#"                  ,dataKeyClass:'text-left'   },
                  {name : 'DESCRIPTION'    ,class:"text-left" ,dataKey:"STR_PRIDESCRIPTION" ,dataKeyClass:'text-left',
                      action : (item)=>{
                          return (
                              item?.STR_PRIDESCRIPTION?.length>150 ?
                                  <>
                                      {/* <ReactTooltip /> */}
                                      <div data-tip={item.STR_PRIDESCRIPTION} > {formatLargeLabel(150,item.STR_PRIDESCRIPTION)}</div>
                                  </>
                              :
                                  item.STR_PRIDESCRIPTION
                          );
                      }
                  },
                  {name : 'LIBELLE' ,class:"text-center" ,dataKey:"STR_PRINAME" ,dataKeyClass:'text-left'  ,
                      action : (item)=>{
                          return (
                              item?.STR_PRINAME?.length>150 ?
                                  <>
                                      {/* <ReactTooltip /> */}
                                      <div data-tip={item.STR_PRINAME} > {formatLargeLabel(150,item.STR_PRINAME)}</div>
                                  </>
                              :
                                  item.STR_PRINAME
                          );
                      }
                  },
                  {name : 'CATEGORIE' ,class:"text-left"   ,dataKey:"STR_PRIKIND" ,dataKeyClass:'text-left'   },
                  {name : 'ETAT'    ,class:"text-center",dataKey:"", 
                      action: (item,index)=>{
                          return (<RenderActionProfilPriv item={item} index={index} />);
                      }, 
                      dataKeyClass:'text-center'
                  }
              ]
          }
      />
    </>
  )
}

export default ListProfilPrivilege