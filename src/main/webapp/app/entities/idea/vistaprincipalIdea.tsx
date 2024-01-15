import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Fieldset } from 'primereact/fieldset';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IReto } from 'app/shared/model/reto.model';
import { getEntities as getRetos } from 'app/entities/reto/reto.reducer';
import { ITipoIdea } from 'app/shared/model/tipo-idea.model';
import { getEntities as getTipoIdeas } from 'app/entities/tipo-idea/tipo-idea.reducer';
import { IEntidad } from 'app/shared/model/entidad.model';
import { getEntities as getEntidads } from 'app/entities/entidad/entidad.reducer';
import { IIdea } from 'app/shared/model/idea.model';
import { getEntity, updateEntity, createEntity, reset } from './idea.reducer';
import { Col, Row } from 'reactstrap';
import { Button } from 'primereact/button';
import { TextFormat, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  ComenetariosIdeaSlice,
  getEntitiesByIdIdea,
  getEntities as getIdeasComentarios,
  createEntity as nuevoComentario,
  reset as resetIdeaComentario,
} from 'app/entities/comenetarios-idea/comenetarios-idea.reducer';
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';

const VistaprincipalIdea = (props: RouteComponentProps<{ id: string; idreto: string; idecosistema: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const users = useAppSelector(state => state.userManagement.users);
  const retos = useAppSelector(state => state.reto.entities);
  const tipoIdeas = useAppSelector(state => state.tipoIdea.entities);
  const entidads = useAppSelector(state => state.entidad.entities);
  const ideaEntity = useAppSelector(state => state.idea.entity);
  const loading = useAppSelector(state => state.idea.loading);
  const updating = useAppSelector(state => state.idea.updating);
  const updateSuccess = useAppSelector(state => state.idea.updateSuccess);

  const comenetariosIdeaEntities = useAppSelector(state => state.comenetariosIdea.entities);
  const loadingCOmentario = useAppSelector(state => state.comenetariosIdea.loading);
  const updatingComentario = useAppSelector(state => state.comenetariosIdea.updating);
  const updateSuccessComentario = useAppSelector(state => state.comenetariosIdea.updateSuccess);

  const account = useAppSelector(state => state.authentication.account);
  const [isNewIdeaComentario] = useState(true);

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getUsers({}));
    dispatch(getRetos({}));
    dispatch(getTipoIdeas({}));
    dispatch(getEntidads({}));

    dispatch(getEntitiesByIdIdea(props.match.params.id));
  }, []);

  useEffect(() => {
    dispatch(getEntitiesByIdIdea(props.match.params.id));
  }, [updateSuccessComentario]);

  const saveEntityComentariosIdea = values => {
    const entity = {
      ...values,
      user: account,
      fechaInscripcion: new Date(),
      idea: ideaEntity,
    };

    dispatch(nuevoComentario(entity));
    defaultValuesIdeaComentarios();
  };
  const atras = () => {
    props.history.push('/entidad/idea/ideasbyretos/' + props.match.params.idreto + '/' + props.match.params.idecosistema);
  };
  const defaultValuesIdeaComentarios = () => (isNewIdeaComentario ? {} : { user: account, idea: ideaEntity });
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="mt-2 my-2">
          <Button label="Atrás" icon="pi pi-arrow-left" className="p-button-secondary mr-2" onClick={atras} />
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className=" mt-3 mb-4 m-auto">
      <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : (
        <Row>
          <Row>
            <div className="grid grid-nogutter surface-0 text-800">
              <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
                <section>
                  <h1 className="text-6xl font-bold text-gray-900 line-height-2">
                    <span className="font-light block">{ideaEntity.titulo}</span>
                  </h1>
                  <p className="font-normal text-2xl line-height-3 md:mt-3 text-gray-700">Autor: {ideaEntity.autor}</p>
                  <p className="font-normal text-2xl line-height-3 md:mt-3 text-gray-700">
                    Fecha Inscripción:{' '}
                    {ideaEntity.fechaInscripcion ? (
                      <TextFormat type="date" value={ideaEntity.fechaInscripcion} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </p>
                  <p className="font-normal text-2xl line-height-3 md:mt-3 text-gray-700">Entidad: {ideaEntity?.entidad?.entidad}</p>

                  <span className="text-green-500 font-medium">{ideaEntity.visto}</span>
                  <span className="text-500"> Visitas</span>
                  <br></br>
                  <span className="text-green-500 font-medium">{comenetariosIdeaEntities.length}</span>
                  <span className="text-500"> Comentarios</span>
                </section>
              </div>
              <div className="col-12 md:col-6 overflow-hidden">
                {ideaEntity.foto && (
                  <img
                    src={`data:${ideaEntity.fotoContentType};base64,${ideaEntity.foto}`}
                    style={{ maxHeight: '500px' }}
                    className="md:ml-auto block md:h-full pt-4"
                  />
                )}
              </div>
            </div>
          </Row>

          <Row>
            <div className="flex flex-wrap align-items-center justify-content-center ">
              <div className="flex surface-overlay  w-full my-3 p-3">
                <p className="text-xl" style={{ whiteSpace: 'pre-line' }}>
                  {ideaEntity.descripcion}
                </p>
              </div>
            </div>
          </Row>

          <div>
            <Row className="justify-content-start">
              <Col md="11" className="card m-auto">
                {loadingCOmentario ? (
                  <p>Cargando...</p>
                ) : (
                  <ValidatedForm defaultValues={defaultValuesIdeaComentarios()} onSubmit={saveEntityComentariosIdea}>
                    <div className="flex align-items-center mb-3">
                      <i className="pi pi-check-circle text-aling-justify   text-green-500 mr-2"></i>
                      <span>
                        Este sitio se reserva el derecho de la publicación de los comentarios. No se harán visibles aquellos que sean
                        denigrantes, ofensivos, difamatorios, que estén fuera de contexto o atenten contra la dignidad de una persona o
                        grupo social. Recomendamos brevedad en sus planteamientos.
                      </span>
                    </div>

                    <ValidatedField
                      id="comenetarios-idea-comentario"
                      name="comentario"
                      placeholder="Haga su comentario"
                      data-cy="comentario"
                      type="textarea"
                      validate={{
                        required: { value: true, message: translate('entity.validation.required') },
                      }}
                    />
                    <Button
                      className="mb-2"
                      color="primary"
                      id="save-entity"
                      data-cy="entityCreateSaveButton"
                      type="submit"
                      disabled={updatingComentario}
                    >
                      Enviar Comentario
                    </Button>
                  </ValidatedForm>
                )}
              </Col>
            </Row>
          </div>

          <Col md="11" className="card m-auto">
            {comenetariosIdeaEntities && comenetariosIdeaEntities.length > 0
              ? comenetariosIdeaEntities.map((comenetariosIdea, i) => (
                  <Card key={comenetariosIdea.id} className=" shadow-6 mt-2">
                    <div className="text-900 font-medium text-xl mb-2">
                      {comenetariosIdea.user.firstName + ' ' + comenetariosIdea.user.lastName}
                    </div>
                    <p className="m-0">{comenetariosIdea.comentario}</p>
                    <div className="flex align-items-center mt-3">
                      <i className="pi pi-clock mr-2"></i>
                      {comenetariosIdea.fechaInscripcion ? (
                        <TextFormat type="date" value={comenetariosIdea.fechaInscripcion} format={APP_LOCAL_DATE_FORMAT} />
                      ) : null}
                    </div>
                  </Card>
                ))
              : !loadingCOmentario && <div className="alert alert-warning">No hay Comentarios...</div>}
          </Col>
        </Row>
      )}
    </div>
  );
};

export default VistaprincipalIdea;
