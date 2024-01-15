import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITipoContacto } from 'app/shared/model/tipo-contacto.model';
import { getEntities as getTipoContactos } from 'app/entities/tipo-contacto/tipo-contacto.reducer';
import { IContacto } from 'app/shared/model/contacto.model';
import { getEntity, updateEntity, createEntity, reset } from './contacto.reducer';
import { isDate } from 'lodash';

export const ContactoUpdatePrincipal = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const tipoContactos = useAppSelector(state => state.tipoContacto.entities);
  const contactoEntity = useAppSelector(state => state.contacto.entity);
  const loading = useAppSelector(state => state.contacto.loading);
  const updating = useAppSelector(state => state.contacto.updating);
  const updateSuccess = useAppSelector(state => state.contacto.updateSuccess);

  const handleClose = () => {
    props.history.push('/');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getTipoContactos({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...contactoEntity,
      ...values,
      tipoContacto: tipoContactos.find(it => it.id.toString() === values.tipoContacto.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...contactoEntity,

          tipoContacto: contactoEntity?.tipoContacto?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhipsterApp.contacto.home.createOrEditLabel" data-cy="ContactoCreateUpdateHeading">
            <Translate contentKey="jhipsterApp.contacto.home.createOrEditLabel">Create or edit a Contacto</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="contacto-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('jhipsterApp.contacto.nombre')}
                id="contacto-nombre"
                name="nombre"
                data-cy="nombre"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('jhipsterApp.contacto.telefono')}
                id="contacto-telefono"
                name="telefono"
                placeholder="##-######"
                data-cy="telefono"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  pattern: {
                    value: /^[0-9]{2}?[-]?[0-9]{6}$/,
                    message: 'El numero debe contener este formato 52-999999',
                  },
                }}
              />
              <ValidatedField
                label={translate('jhipsterApp.contacto.correo')}
                id="contacto-correo"
                name="correo"
                data-cy="correo"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isEmail(v) || translate('global.messages.validate.email.invalid'),
                }}
              />
              <ValidatedField
                label={translate('jhipsterApp.contacto.mensaje')}
                id="contacto-mensaje"
                name="mensaje"
                data-cy="mensaje"
                type="textarea"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                id="contacto-tipoContacto"
                name="tipoContacto"
                data-cy="tipoContacto"
                label={translate('jhipsterApp.contacto.tipoContacto')}
                type="select"
              >
                <option value="" key="0" />
                {tipoContactos
                  ? tipoContactos.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.tipoContacto}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ContactoUpdatePrincipal;
