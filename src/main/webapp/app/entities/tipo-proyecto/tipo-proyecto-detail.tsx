import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './tipo-proyecto.reducer';

export const TipoProyectoDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const tipoProyectoEntity = useAppSelector(state => state.tipoProyecto.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="tipoProyectoDetailsHeading">
          <Translate contentKey="jhipsterApp.tipoProyecto.detail.title">TipoProyecto</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{tipoProyectoEntity.id}</dd>
          <dt>
            <span id="tipoProyecto">
              <Translate contentKey="jhipsterApp.tipoProyecto.tipoProyecto">Tipo Proyecto</Translate>
            </span>
          </dt>
          <dd>{tipoProyectoEntity.tipoProyecto}</dd>
        </dl>
        <Button tag={Link} to="/nomencladores/tipo-proyecto" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/nomencladores/tipo-proyecto/${tipoProyectoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TipoProyectoDetail;
