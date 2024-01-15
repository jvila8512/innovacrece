import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntiAdmin = ({ on }) => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/nomencladores/tipo-idea" on={on}>
        <Translate contentKey="global.menu.entities.tipoIdea" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/nomencladores/ecosistema-rol" on={on}>
        <Translate contentKey="global.menu.entities.ecosistemaRol" />
      </MenuItem>

      <MenuItem icon="asterisk" to="/nomencladores/ecosistema-peticiones" on={on}>
        <Translate contentKey="global.menu.entities.ecosistemaPeticiones" />
      </MenuItem>

      <MenuItem icon="asterisk" to="/nomencladores/tipo-noticia" on={on}>
        <Translate contentKey="global.menu.entities.tipoNoticia" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/nomencladores/tipo-notificacion" on={on}>
        <Translate contentKey="global.menu.entities.tipoNotificacion" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/nomencladores/contacto" on={on}>
        <Translate contentKey="global.menu.entities.contacto" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/nomencladores/tipo-contacto" on={on}>
        <Translate contentKey="global.menu.entities.tipoContacto" />
      </MenuItem>

      <MenuItem icon="asterisk" to="/nomencladores/entidad" on={on}>
        <Translate contentKey="global.menu.entities.entidad" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/nomencladores/tipo-proyecto" on={on}>
        <Translate contentKey="global.menu.entities.tipoProyecto" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/nomencladores/sector" on={on}>
        <Translate contentKey="global.menu.entities.sector" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/nomencladores/linea-investigacion" on={on}>
        <Translate contentKey="global.menu.entities.lineaInvestigacion" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/nomencladores/ods" on={on}>
        <Translate contentKey="global.menu.entities.ods" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/nomencladores/redes-sociales" on={on}>
        <Translate contentKey="global.menu.entities.redesSociales" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/nomencladores/categoria-user" on={on}>
        <Translate contentKey="global.menu.entities.categoriaUser" />
      </MenuItem>

      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntiAdmin as React.ComponentType<any>;
