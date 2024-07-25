import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = ({ on }) => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/entidad/comunidad/comunidades" on={on}>
        Comunidades
      </MenuItem>
      <MenuItem icon="asterisk" to="/entidad/idea" on={on}>
        <Translate contentKey="global.menu.entities.idea" />
      </MenuItem>

      <MenuItem icon="asterisk" to="/entidad/reto" on={on}>
        <Translate contentKey="global.menu.entities.reto" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/entidad/ecosistema/crud" on={on}>
        <Translate contentKey="global.menu.entities.ecosistema" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/entidad/usuario-ecosistema" on={on}>
        <Translate contentKey="global.menu.entities.usuarioEcosistema" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/entidad/componentes" on={on}>
        <Translate contentKey="global.menu.entities.componentes" />
      </MenuItem>

      <MenuItem icon="asterisk" to="/entidad/proyectos" on={on}>
        <Translate contentKey="global.menu.entities.proyectos" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/entidad/contacto" on={on}>
        <Translate contentKey="global.menu.entities.contacto" />
      </MenuItem>

      <MenuItem icon="asterisk" to="/entidad/innovacion-racionalizacion/crud" on={on}>
        <Translate contentKey="global.menu.entities.innovacionRacionalizacion" />
      </MenuItem>

      <MenuItem icon="asterisk" to="/entidad/noticias" on={on}>
        <Translate contentKey="global.menu.entities.noticias" />
      </MenuItem>

      <MenuItem icon="asterisk" to="/entidad/servicios" on={on}>
        <Translate contentKey="global.menu.entities.servicios" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/entidad/contacto-servicio" on={on}>
        <Translate contentKey="global.menu.entities.contactoServicio" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/entidad/change-macker" on={on}>
        <Translate contentKey="global.menu.entities.changeMacker" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/entidad/contacto-change-macker" on={on}>
        <Translate contentKey="global.menu.entities.contactoChangeMacker" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/entidad/anirista" on={on}>
        <Translate contentKey="global.menu.entities.anirista" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/entidad/ecosistema-componente" on={on}>
        <Translate contentKey="global.menu.entities.ecosistemaComponente" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu as React.ComponentType<any>;
