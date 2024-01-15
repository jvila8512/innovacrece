import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useState } from 'react';
import { isNumber, TextFormat, Translate, translate, ValidatedBlobField, ValidatedField, ValidatedForm } from 'react-jhipster';
import { RouteComponentProps } from 'react-router-dom';
import VistaIdeasReto from '../idea/vistaIdeasReto';
import { getEntity, updateEntity, createEntity, reset, updateEntitysinRespuesta } from './reto.reducer';
import { IReto } from 'app/shared/model/reto.model';
import { getEntitiesbyReto } from 'app/entities/idea/idea.reducer';
import { Dialog } from 'primereact/dialog';
import { Row } from 'reactstrap';
import { createEntity as nuevaIdea, reset as resetearIdea } from '../idea/idea.reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getEntities as getTipoIdeas } from '../tipo-idea/tipo-idea.reducer';
import { getEntities as getEntidades } from '../entidad/entidad.reducer';
import { Skeleton } from 'primereact/skeleton';

const VistaReto = (props: RouteComponentProps<{ id: string; index: string }>) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const retoEntity = useAppSelector(state => state.reto.entity);
  const ideasList = useAppSelector(state => state.idea.entities);
  const updateSuccess = useAppSelector(state => state.reto.updateSuccess);
  const loading = useAppSelector(state => state.reto.loading);

  const [isNewIdea, setNewIdea] = useState(true);
  const [ideaDialog, setIdeaDialog] = useState(false);
  const tipoIdeas = useAppSelector(state => state.tipoIdea.entities);
  const entidads = useAppSelector(state => state.entidad.entities);
  const ideaEntity = useAppSelector(state => state.idea.entity);
  const loadingIdea = useAppSelector(state => state.idea.loading);
  const updatingIdea = useAppSelector(state => state.idea.updating);
  const updateSuccessIdea = useAppSelector(state => state.idea.updateSuccess);
  const [actualizarVistossoloUnavez, setVistos] = useState(parseInt(localStorage.getItem('vistos'), 10) || 0);
  const atras = () => {
    props.history.push(`/usuario-panel/${props.match.params.index}`);
  };
  useEffect(() => {
    if (actualizarVistossoloUnavez === 0) dispatch(updateEntitysinRespuesta(props.match.params.id));
    else dispatch(getEntity(props.match.params.id));

    dispatch(getTipoIdeas({}));
    dispatch(getEntidades({}));
    setVistos(parseInt(localStorage.getItem('vistos'), 10));
    return () => {
      localStorage.setItem('vistos', '0');
    };
  }, []);

  useEffect(() => {
    if (updateSuccessIdea) {
      setIdeaDialog(false);
      dispatch(getEntitiesbyReto(props.match.params.id));
    }
  }, [updateSuccessIdea]);
  useEffect(() => {
    if (updateSuccess) {
      localStorage.setItem('vistos', '1');
      setVistos(parseInt(localStorage.getItem('vistos'), 10));
    }
  }, [updateSuccess]);

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button label="Atrás" icon="pi pi-arrow-left" className="p-button-secondary mr-2" onClick={atras} />
        </div>
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button label="Nueva Idea" icon="pi pi-plus" className="p-button-info" onClick={nuevaIdeas} />
      </React.Fragment>
    );
  };

  const defaultValuesIdeas = () =>
    !isNewIdea
      ? {}
      : {
          user: account,
          reto: retoEntity,
        };
  const hideIdeaDialog = () => {
    setIdeaDialog(false);
  };

  const saveIdea = values => {
    const entity = {
      ...values,
      user: account,
      reto: retoEntity,
      visto: 0,
      tipoIdea: tipoIdeas.find(it => it.id.toString() === values.tipoIdea.toString()),
      entidad: entidads.find(it => it.id.toString() === values.entidad.toString()),
    };

    dispatch(nuevaIdea(entity));
  };

  const nuevaIdeas = () => {
    setIdeaDialog(true);
  };
  const nuevaIdeasMod = id => {
    setIdeaDialog(true);
  };

  return (
    <div className="grid mt-3 mb-4">
      <div className="col-12 card">
        <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
        <div className="grid  grid-nogutter surface-0 text-800">
          <div className="col-12 lg:col-6">
            <div className="flex align-items-start flex-column lg:justify-content-between lg:flex-row">
              <div className="text-900 text-2xl mb-3 pl-4">{retoEntity.reto}</div>
            </div>

            <div className="flex flex-column sm:flex-row  gap-3 pl-4">
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-eye"></i>
                  {retoEntity.visto}
                </span>
              </div>
              <span className="flex align-items-center gap-2">
                <i className="pi pi-tag"></i>
                <span className="font-semibold">{ideasList?.length} Ideas </span>
              </span>

              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-calendar"></i>
                  {retoEntity.fechaInicio ? <TextFormat type="date" value={retoEntity.fechaInicio} format={APP_LOCAL_DATE_FORMAT} /> : null}
                </span>
              </div>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-calendar-times"></i>
                  {retoEntity.fechaFin ? <TextFormat type="date" value={retoEntity.fechaFin} format={APP_LOCAL_DATE_FORMAT} /> : null}
                </span>
              </div>
            </div>
            <div className="flex align-items-center gap-3 mt-6">
              <span className="flex align-items-center gap-2 ">
                {retoEntity.motivacion && <div className="text-1xl  text-600 pl-4 ">Motivación: {retoEntity.motivacion}</div>}
              </span>
            </div>
          </div>

          <div className="col-12 lg:col-6">
            <div className="flex  sm:justify-content-center justify-content-end overflow-hidden">
              {loading ? (
                <Skeleton width="35rem" height="30rem"></Skeleton>
              ) : (
                <img
                  className=" flex w-9 sm:w-8 sm:justify-content-center md:w-10 xl:w-10 shadow-2 block xl:block mt-4 border-round"
                  src={`data:${retoEntity.urlFotoContentType};base64,${retoEntity.urlFoto}`}
                  alt={retoEntity.reto}
                />
              )}
            </div>
          </div>

          <div className="col-12">
            <Accordion expandIcon="pi pi-chevron-down" collapseIcon="pi pi-chevron-up" className="mt-3">
              <AccordionTab className="text-100 " header="Descripción">
                <div className="m-auto">
                  <div className="flex flex-wrap  align-items-center justify-content-center card-container">
                    <div className="flex surface-overlay  w-full my-3 p-3">
                      <p className="text-xl" style={{ whiteSpace: 'pre-line' }}>
                        {retoEntity.descripcion}
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionTab>
            </Accordion>
          </div>
        </div>

        <div className="xl:col-12 sm:col-12 md:col-12">
          <div className="card mt-4 border-round-3xl shadow-6 sm:h-auto ">
            <div className="flex justify-content-start ml-2">
              <div className="text-900 text-2xl text-blue-600 font-medium ">Ideas </div>
            </div>
            <div className="flex align-items-center justify-content-center grid">
              {retoEntity && (
                <VistaIdeasReto
                  entidad={entidads}
                  tipoIdea={tipoIdeas}
                  reto={retoEntity}
                  usuario={account}
                  retoid={props.match.params.id}
                  index={props.match.params.index}
                  layout="grid"
                />
              )}
            </div>
          </div>
        </div>

        <Dialog visible={ideaDialog} style={{ width: '450px' }} header="Idea" modal onHide={hideIdeaDialog}>
          <Row className="justify-content-center">
            {loadingIdea ? (
              <p>Cargando...</p>
            ) : (
              <ValidatedForm defaultValues={defaultValuesIdeas()} onSubmit={saveIdea}>
                <ValidatedField
                  label={translate('jhipsterApp.idea.numeroRegistro')}
                  id="idea-numeroRegistro"
                  name="numeroRegistro"
                  data-cy="numeroRegistro"
                  type="text"
                  validate={{
                    required: { value: true, message: translate('entity.validation.required') },
                    validate: v => isNumber(v) || translate('entity.validation.number'),
                  }}
                />
                <ValidatedField
                  label={translate('jhipsterApp.idea.titulo')}
                  id="idea-titulo"
                  name="titulo"
                  data-cy="titulo"
                  type="text"
                  validate={{
                    required: { value: true, message: translate('entity.validation.required') },
                  }}
                />
                <ValidatedField
                  label={translate('jhipsterApp.idea.descripcion')}
                  id="idea-descripcion"
                  name="descripcion"
                  data-cy="descripcion"
                  type="textarea"
                  validate={{
                    required: { value: true, message: translate('entity.validation.required') },
                  }}
                />
                <ValidatedField
                  label={translate('jhipsterApp.idea.autor')}
                  id="idea-autor"
                  name="autor"
                  data-cy="autor"
                  type="text"
                  validate={{
                    required: { value: true, message: translate('entity.validation.required') },
                  }}
                />
                <ValidatedField
                  label={translate('jhipsterApp.idea.fechaInscripcion')}
                  id="idea-fechaInscripcion"
                  name="fechaInscripcion"
                  data-cy="fechaInscripcion"
                  type="date"
                  validate={{
                    required: { value: true, message: translate('entity.validation.required') },
                  }}
                />
                <ValidatedBlobField
                  label={translate('jhipsterApp.idea.foto')}
                  id="idea-foto"
                  name="foto"
                  data-cy="foto"
                  isImage
                  accept="image/*"
                />
                <ValidatedField
                  label={translate('jhipsterApp.idea.publica')}
                  id="idea-publica"
                  name="publica"
                  data-cy="publica"
                  check
                  type="checkbox"
                />
                <ValidatedField
                  id="idea-tipoIdea"
                  name="tipoIdea"
                  data-cy="tipoIdea"
                  label={translate('jhipsterApp.idea.tipoIdea')}
                  type="select"
                >
                  <option value="" key="0" />
                  {tipoIdeas
                    ? tipoIdeas.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.tipoIdea}
                        </option>
                      ))
                    : null}
                </ValidatedField>
                <ValidatedField
                  id="idea-entidad"
                  name="entidad"
                  data-cy="entidad"
                  label={translate('jhipsterApp.idea.entidad')}
                  type="select"
                >
                  <option value="" key="0" />
                  {entidads
                    ? entidads.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.entidad}
                        </option>
                      ))
                    : null}
                </ValidatedField>
                &nbsp;
                <Button
                  className="w-full"
                  color="primary"
                  id="save-entity"
                  data-cy="entityCreateSaveButton"
                  type="submit"
                  disabled={updatingIdea}
                >
                  <span className="m-auto">
                    <FontAwesomeIcon icon="save" />
                    &nbsp;
                    <Translate contentKey="entity.action.save">Save</Translate>
                  </span>
                </Button>
              </ValidatedForm>
            )}
          </Row>
        </Dialog>
      </div>
    </div>
  );
};

export default VistaReto;
