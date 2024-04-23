import React, { useState } from 'react';
import Menu from "./Menu";

function NavBar({ title, children }) {
    const [isCompact, setIsCompact] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isCompactSwitchClicked, setIsCompactSwitchClicked] = useState(false);

    const toggleCompactMode = () => {
        setIsCompact(isCompact);
        setIsCompactSwitchClicked(!isCompactSwitchClicked);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (isCompactSwitchClicked) {
            setIsCompact(false); // Ouvrir la barre de navigation si le bouton n'a pas été cliqué
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (isCompactSwitchClicked) {
            setIsCompact(true); // Fermer la barre de navigation si le bouton n'a pas été cliqué
        }
    };

    return (
        <div className={`app-admin-wrap layout-sidebar-vertical ${isCompact ? 'sidebar-compact' : 'sidebar-full'} ${isHovered && !isCompact ? 'sidebar-full' : ''}`}>
            <div className={`sidebar-panel bg-white ${isHovered && 'sidebar-compact-onhover'} ${isCompact && 'sidebar-closed'}`} 
               onMouseEnter={handleMouseEnter} 
               onMouseLeave={handleMouseLeave}
            >
                <div className="gull-brand pr-3 text-center mt-4 mb-2 d-flex justify-content-center align-items-center">
                    <img className="pl-3" src="APP_LOGO.png" alt="starter-logo" />
                    <span className="item-name text-20 text-success font-weight-700">{title}</span>
                    <div className={`sidebar-compact-switch ml-auto ${isCompactSwitchClicked ? 'active' : ''}`} onClick={toggleCompactMode}><span></span></div>
                </div>
                <div className="scroll-nav ps ps--active-y" data-perfect-scrollbar="data-perfect-scrollbar" data-suppress-scroll-x="true">
                    <div className="side-nav">
                        <div className="main-menu">
                            <Menu />
                        </div>
                    </div>
                    <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                        <div className="ps__thumb-x" tabIndex="0" style={{ left: 0, width: 0 }}></div>
                    </div>
                    <div className="ps__rail-y" style={{ top: 0, height: 404, right: 0 }}>
                        <div className="ps__thumb-y" tabIndex="0" style={{ top: 0, height: 325 }}></div>
                    </div>
                    <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                        <div className="ps__thumb-x" tabIndex="0" style={{ left: 0, width: 0 }}></div>
                    </div>
                    <div className="ps__rail-y" style={{ top: 0, height: 404, right: 0 }}>
                        <div className="ps__thumb-y" tabIndex="0" style={{ top: 0, height: 325 }}></div>
                    </div>
                </div>
            </div>
            <div className={`content-wrap ${isCompact ? 'content-full' : ''}`}>
                {children}
            </div>
        </div>
    );
}

export default NavBar;
