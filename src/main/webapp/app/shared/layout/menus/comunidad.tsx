import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const Comunidad = props => (
  <NavDropdown name="Comunidad" id="comunidad-menu" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <MenuItem icon="asterisk" to="/comunidad/expertos" on={props.on}>
      Expertos
    </MenuItem>

    <MenuItem icon="asterisk" to="/entidad/anirista/" on={props.on}>
      Innovadores(ANIR)
    </MenuItem>
  </NavDropdown>
);
export default Comunidad;
