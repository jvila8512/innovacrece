import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Proyectos from './proyectos';
import ProyectosDetail from './proyectos-detail';
import ProyectosUpdate from './proyectos-update';
import ProyectosDeleteDialog from './proyectos-delete-dialog';
import ProyectosEcosistemas from './proyectosEcosistema';
import ProyectosBuscar from './proyectosBuscar';
import ProyectosAdmin from './proyectosAdmin';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProyectosUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/proyectos_buscar/:texto`} component={ProyectosBuscar} />
      <ErrorBoundaryRoute exact path={`${match.url}/proyectos_admin/:id`} component={ProyectosAdmin} />
      <ErrorBoundaryRoute exact path={`${match.url}/proyectos_ecosistema/:id`} component={ProyectosEcosistemas} />

      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProyectosUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProyectosDetail} />
      <ErrorBoundaryRoute path={match.url} component={Proyectos} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProyectosDeleteDialog} />
  </>
);

export default Routes;
