import './aceptada.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { size } from 'lodash';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import React, { useEffect, useState } from 'react';
import { TextFormat, Translate, ValidatedBlobField, ValidatedField, ValidatedForm, isNumber, translate } from 'react-jhipster';
import { Link } from 'react-router-dom';
import { ILikeIdea } from 'app/shared/model/like-idea.model';
import { getEntitiesByIdea, createEntity as createLike, deleteEntity as deletelike, reset } from 'app/entities/like-idea/like-idea.reducer';

import {
  createEntitySinMensaje1 as crearNotificacion,
  deleteEntitySinMensaje as deleteNotificacion,
} from '../../entities/notificacion/notificacion.reducer';

import { updateEntity as actualizarIdea } from '../../entities/idea/idea.reducer';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntitiesbyReto, getEntity } from './idea.reducer';
import { Dialog } from 'primereact/dialog';
import { Row } from 'reactstrap';
import { Skeleton } from 'primereact/skeleton';
import dayjs from 'dayjs';

const ComponenteIdea = props => {
  const dispatch = useAppDispatch();
  const idea = props.idea;
  const idea1 = props.idea;
  const [gusta, setGusta] = useState(false);
  const [isNewIdea, setNewIdea] = useState(true);
  const [ideaDialog, setIdeaDialog] = useState(false);

  const emptyLike = {};

  const [likeMio, setLikeMio] = useState(null);

  const [Ngusta, setNGusta] = useState(0);

  const [insertar_Borrar, setIB] = useState(true);

  const likeIdeaEntity = useAppSelector(state => state.likeIdea.entity);

  const [likeIdeaEntityCopia, setLICopia] = useState(null);

  const [texto, setTexto] = useState('');

  const updating = useAppSelector(state => state.likeIdea.updating);

  const updateSuccess = useAppSelector(state => state.likeIdea.updateSuccess);

  const ideasEntity = useAppSelector(state => state.idea.entity);
  const ideasEntities = useAppSelector(state => state.idea.entities);
  const loading = useAppSelector(state => state.idea.loading);

  const loadingIdea = useAppSelector(state => state.idea.loading);
  const updatingIdea = useAppSelector(state => state.idea.updating);
  const updateSuccessIdea = useAppSelector(state => state.idea.updateSuccess);

  const [respuestaNotificacion, setRespuestaNotificacion] = useState(null);

  const [open, setOpen] = useState(false);

  const [id, setID] = useState(0);

  useEffect(() => {
    const numero = idea.likes?.length;

    idea.likes?.length && setNGusta(idea.likes.length);
    idea.likes?.length === 1 && setTexto('1 persona');
    idea.likes?.length === 0 && setTexto('0 persona');
    idea.likes?.length >= 2 && setTexto(idea.likes.length + ' personas');

    const likes = idea.likes?.find(it => it.user?.id === props.usuarioo?.id);

    if (likes) {
      idea.likes?.length === 1 && setTexto('Tu gusta solo a ti');
      idea.likes?.length === 2 && setTexto('Tu y ' + (idea.likes.length - 1) + ' personas');
      idea.likes?.length > 2 && setTexto('Tu y ' + (idea.likes.length - 1) + ' personas');

      setGusta(true);
      setLikeMio(likes);
    } else {
      setGusta(false);
      setLikeMio(null);
    }
  }, []);

  useEffect(() => {
    if (updateSuccess)
      if (idea.id === id) {
        dispatch(getEntitiesbyReto(props.idReto));
        setGusta(!gusta);
      }
  }, [updateSuccess]);

  useEffect(() => {
    if (updateSuccessIdea)
      if (idea.id === id) {
        dispatch(getEntitiesbyReto(props.idReto));
        setIdeaDialog(false);
      }
  }, [updateSuccessIdea]);

  useEffect(() => {
    if (!loading) {
      const likes = idea.likes?.find(it => it.user?.id === props.usuarioo?.id);
      setLikeMio(likes);

      if (likes) {
        idea.likes?.length === 1 && setTexto('Te gusta solo a ti');
        idea.likes?.length === 2 && setTexto('Tú y ' + (idea.likes?.length - 1) + ' persona');
        idea.likes?.length > 2 && setTexto('Tú y ' + (idea.likes?.length - 1) + ' personas');
      } else {
        idea.likes?.length === 1 && setTexto('1 persona');
        idea.likes?.length === 0 && setTexto('0 persona');
        idea.likes?.length >= 2 && setTexto(idea.likes?.length + ' personas');
      }
    }

    setID(0);
  }, [loading]);

  const defaultValuesIdeas = () =>
    !isNewIdea
      ? {}
      : {
          ...idea,
          user: props.usuarioo,
          reto: props.reto,
          tipoIdea: idea?.tipoIdea?.id,
          entidad: idea?.entidad?.id,
        };

  const hideIdeaDialog = () => {
    setIdeaDialog(false);
  };

  const saveIdea = values => {
    const entity = {
      ...values,
      user: props.usuarioo,
      reto: props.reto,
      tipoIdea: props.tipoIdeass.find(it => it.id.toString() === values.tipoIdea.toString()),
      entidad: props.entidades.find(it => it.id.toString() === values.entidad.toString()),
    };

    dispatch(actualizarIdea(entity));
    setID(idea.id);
  };

  const getSeverity = reto => {
    switch (reto.publica) {
      case true:
        return 'success';

      case false:
        return 'danger';

      default:
        return null;
    }
  };

  const getActivo = reto => {
    switch (reto.publica) {
      case true:
        return 'Publica';

      case false:
        return 'No Publica';

      default:
        return null;
    }
  };

  const actualizarTexto = () => {
    setTexto('Holaaaaaa');
  };
  const emptyNotificacion = {
    id: null,
    descripcion: '',
    visto: null,
    fecha: '',
    user: null,
    usercreada: null,
    tipoNotificacion: null,
  };

  const actualizarIdeas = () => {
    setIdeaDialog(true);
  };

  const saveEntity = () => {
    const entityNotificacion = {
      ...emptyNotificacion,
      descripcion: 'Ha ' + props.usuarioo.firstName + ' ' + props.usuarioo.lastName + ' le gusta tu Idea con el título ' + idea1.titulo,
      visto: 0,
      fecha: dayjs().toDate(),
      user: idea1.user,
      usercreada: props.usuarioo,
      tipoNotificacion: props.tipoNotificacion.find(it => it.tipoNotificacion === 'Me Gusta'),
    };

    const likeIdea = {
      ...likeMio,
      like: 0,
      fechaInscripcion: new Date(),
      user: props.usuarioo,
      idea: idea1,
    };

    if (likeMio) {
      dispatch(deletelike(likeMio.id));
      if (respuestaNotificacion) dispatch(deleteNotificacion(respuestaNotificacion.id));
      setRespuestaNotificacion(null);
    } else {
      dispatch(createLike(likeIdea));

      const retos = crearNotificacion(entityNotificacion);
      retos.then(response => {
        setRespuestaNotificacion(response.data);
      });
    }
  };

  const megusta = () => {
    saveEntity();
    setID(idea.id);
  };

  const hacerPublicaIdea = () => {
    const entity = {
      ...idea,
      publica: !idea.publica,
    };

    if (props.reto.publico) {
      dispatch(actualizarIdea(entity));
      setID(idea.id);
    }
  };
  const renderDevRibbon = () => (props.idea.aceptada === true ? <div className="curso1"></div> : null);

  return (
    <div key={idea.id} className="p-2 relative">
      <div className=" h-30rem w-24rem max-h-30rem  p-4 border-round-xl shadow-4 mb-2">
        <div className="flex flex-column align-items-center gap-3 py-5">
          {renderDevRibbon()}

          <img
            className="w-16rem h-10rem  shadow-2 block xl:block  border-round"
            src={`data:${idea.fotoContentType};base64,${idea.foto}`}
            alt={idea.titulo}
          />
        </div>
        <div className="text-xl font-bold text-900">{idea.titulo}</div>
        <div className="text-1xl  text-600 ">Autor: {idea.autor}</div>
        <div className="text-1xl  text-600 ">Tipo Idea: {idea.tipoIdea?.tipoIdea}</div>

        <div className="flex flex-column align-content-end align-items-center sm:align-items-start gap-3">
          <div className="flex align-items-center gap-3">
            <span className="flex align-items-center text-sm gap-2 mt-2">
              <i className="pi pi-calendar"></i>
              {idea.fechaInscripcion ? <TextFormat type="date" value={idea.fechaInscripcion} format={APP_LOCAL_DATE_FORMAT} /> : null}
            </span>
          </div>
        </div>
        <div className="flex absolute bottom-0 left-0 mb-8 ml-5">
          <Tag className="manito" onClick={hacerPublicaIdea} value={getActivo(idea)} severity={getSeverity(idea)}></Tag>
        </div>
        {idea.user?.id === props.usuarioo?.id && (
          <div className="flex justify-content-start flex-wrap  absolute top-0 right-0 mt-2 mr-4">
            <Button onClick={actualizarIdeas} label="Editar" className="p-button-link" icon="pi pi-pencil" />
          </div>
        )}

        <div
          onMouseLeave={() => {
            setOpen(!open);
          }}
          onMouseEnter={() => {
            setOpen(!open);
          }}
          className="flex justify-content-start flex-wrap  absolute bottom-0 mb-4"
        >
          <div className="flex align-items-start mt-2 gap-3">
            <span className="flex align-items-center gap-2 text-sm text-blue-500">
              <i className="pi pi-thumbs-up-fill"></i>
              {texto}
            </span>
          </div>
          <div className={`dropdown-menu111  ${open ? 'active' : 'inactive'}`}>
            {idea.likes && idea.likes?.length > 0 ? (
              <div className="flex flex-column  justify-content-center  mt-2">
                {idea.likes.map((likeIdea, i) => (
                  <span key={likeIdea.id} className="flex align-items-center gap-2 text-sm text-white">
                    {likeIdea.user.firstName + ' ' + likeIdea.user.lastName}
                  </span>
                ))}
              </div>
            ) : (
              <span className="flex align-items-center gap-2 text-sm text-white">No hay Likes.</span>
            )}
          </div>
        </div>

        <div className="flex justify-content-end absolute bottom-0 right-0 mb-4 mr-4">
          <div className="flex align-items-center">
            <Button
              icon="pi  pi-thumbs-up-fill"
              onClick={megusta}
              className={!gusta ? 'p-button-sm p-button-rounded p-button-secondary ' : 'p-button-sm p-button-rounded p-button-info '}
              aria-label="Bookmark"
              disabled={!props.reto.publico}
            />
          </div>
        </div>
        <div className="flex justify-content-end absolute bottom-0 right-0 mb-8 mr-5">
          <Link
            hidden={idea.publica || idea.user?.id === props.usuarioo?.id || props.usuarioo?.id === props.reto.user?.id ? false : true}
            to={`/entidad/idea/ver_Idea/${idea.id}/${props.idReto}/${props.index}`}
          >
            <div className="flex justify-content-start">
              <FontAwesomeIcon icon="eye" size="lg" /> <span className="d-none d-md-inline sm"></span>
            </div>
          </Link>
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
                {props.tipoIdeass
                  ? props.tipoIdeass.map(otherEntity => (
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
                {props.entidades
                  ? props.entidades.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.entidad}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updatingIdea}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Row>
      </Dialog>
    </div>
  );
};

export default ComponenteIdea;
