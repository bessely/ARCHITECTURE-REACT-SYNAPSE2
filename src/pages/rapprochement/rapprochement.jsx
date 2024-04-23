import React from 'react';
import NavBar from "../../globalComponents/NavBar";
import Container from '../../globalComponents/Container';

/**
 * LE DASHBOARD
 * @returns JSX
 */
function Rapprochement() {
  const TitlePage = "Rapprochement"; // Titre de la page
  return (
    <>
      <NavBar title="Rapprochement">
      <div className="main-content-wrap mobile-menu-content bg-off-white m-0">
                <Container TitlePage={TitlePage}>
                  <div className="col-md-12 mb-4">
                      <div className="card">
                          <div className="card-body">
                          </div>
                      </div>
                  </div>
                </Container>
      </div>
      </NavBar>  
    </>
  )
}

export default Rapprochement