import React from 'react';
import { Tooltip } from 'react-tooltip';
import { BASEROOT } from '../services/serveur';

function Submenu({ submenuList }) {
    return (
        <ul className="mm-collapse">
            {submenuList.map((submenuItem, key) => (
                <li className="item-name" key={"Submenu" + key}>
                    <a data-tooltip-id="mySubmenu" data-tooltip-content={submenuItem.name} href={BASEROOT === "/" ? submenuItem?.link : "/convergence" + submenuItem?.link}>
                        <i className="i-Circular-Point mr-2 text-muted"></i><span className="text-muted">{submenuItem?.name.length > 15 ? submenuItem?.name.substring(0, 15) + "..." : submenuItem?.name}</span>
                    </a>
                    <Tooltip id="mySubmenu"/>
                </li>
            ))}
        </ul>
    );
}

export default Submenu;
