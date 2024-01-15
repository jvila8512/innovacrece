import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Entidad from './entidad';
import EntidadDetail from './entidad-detail';
import EntidadUpdate from './entidad-update';
import EntidadDeleteDialog from './entidad-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EntidadUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EntidadUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EntidadDetail} />
      <ErrorBoundaryRoute path={match.url} component={Entidad} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EntidadDeleteDialog} />
  </>
);

export default Routes;
