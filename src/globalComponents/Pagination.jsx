import React from 'react';
import ReactPaginate from "react-paginate";
export const PAGINATION = {listParPage:10, currentPage:0, changePageClick:false, listLenght:0, nbrPage:0};
/**
 * 
 * @param {function} onClick  la function callback a executé qd on cliquera sur un button de pagination
 * @param {integer} nbrPage  le nombre de page maximum a afficher
 * @param {boolean} forcePage  activer le mode forcerPage ou pas 
 * @param {string} typeStyle  le style de pagination a renvoyer [classic,compact], classique par defaut
 * @returns 
 */
export function Pagination({onClick,nbrPage, forcePage,typeStyle="classic"}) {
  if (typeStyle==="compact") {
        return(
          <div className="m-0 paginating-container pagination-default d-flex justify-content-end">
            <ReactPaginate
              previousLabel         = {"<"}
              nextLabel             = {">"}
              breakLabel            = "..."
              breakClassName        = {"page-item"}
              breakLinkClassName    = {"page-link"}
              pageCount             = {nbrPage}
              onPageChange          = {onClick}
              pageRangeDisplayed    = {1}
              containerClassName    = {"pagination m-1 justify-content-end"}
              pageClassName         = {"page-item"}
              previousClassName     = {"prev"}
              nextClassName         = {"next"}
              pageLinkClassName     = {"page-link"}
              previousLinkClassName = {"page-link"}
              nextLinkClassName     = {"page-link"}
              disabledClassName     = {"disable"}
              activeClassName       = {"active"}
              renderOnZeroPageCount = {false}
              forcePage             = {forcePage}
            />
          </div>
        )
      }else{
        return(
            <nav className="col-md-12 mt-5 text-center">
                  <ReactPaginate
                      previousLabel         = {"< Précédent"}
                      nextLabel             = {"Suivant >"}
                      breakLabel            = "..."
                      breakClassName        = {"page-item"}
                      breakLinkClassName    = {"page-link"}
                      pageCount             = {nbrPage}
                      onPageChange          = {onClick}
                      pageRangeDisplayed    = {1}
                      containerClassName    = {"pagination m-1 justify-content-end"}
                      pageClassName         = {"page-item"}
                      previousClassName     = {"prev"}
                      nextClassName         = {"next"}
                      pageLinkClassName     = {"page-link"}
                      previousLinkClassName = {"page-link"}
                      nextLinkClassName     = {"page-link"}
                      disabledClassName     = {"disable"}
                      activeClassName       = {"active"}
                      renderOnZeroPageCount = {false}
                      forcePage             = {forcePage}
                  />
            </nav>
        );
      }
}
  
export default Pagination