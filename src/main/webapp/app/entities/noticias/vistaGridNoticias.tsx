import React, { useEffect, useState } from 'react';

import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Skeleton } from 'primereact/skeleton';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { Link, RouteComponentProps } from 'react-router-dom';
import { TextFormat, Translate } from 'react-jhipster';
import { getNoticiasByEcosistemaId } from './noticias.reducer';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from 'reactstrap';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';

import { getEntity } from '../../entities/ecosistema/ecosistema.reducer';

const VistaGridNoticias = (props: RouteComponentProps<{ id: string; index: string }>) => {
  const dispatch = useAppDispatch();
  const [forma, setLayout] = useState(null);

  const noticiasList = useAppSelector(state => state.noticias.entities);
  const loading = useAppSelector(state => state.noticias.loading);
  const account = useAppSelector(state => state.authentication.account);
  const ecosistemaUserEntity = useAppSelector(state => state.ecosistema.entity);

  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    dispatch(getNoticiasByEcosistemaId(props.match.params.id));
    setLayout('grid');
    dispatch(getEntity(props.match.params.id));
    setNoticias(noticiasList);
  }, []);

  useEffect(() => {
    if (!loading) setNoticias(noticiasList);
  }, [loading]);

  const getSeverity = reto => {
    switch (reto.activo) {
      case true:
        return 'success';

      case false:
        return 'danger';

      default:
        return null;
    }
  };

  const getActivo = reto => {
    switch (reto.activo) {
      case true:
        return 'Activo';

      case false:
        return 'Activo';

      default:
        return null;
    }
  };
  const verReto = id => {
    props.history.push('/usuario-panel');
  };

  const listItem = reto => {
    return (
      <div className="col-12 border-round-xl shadow-4 mb-2">
        <div className="flex flex-column  justify-content-center align-items-center">
          <img
            className="w-9 sm:w-10rem xl:w-8rem shadow-2 block xl:block mx-auto border-round"
            src={`data:${reto.urlFotoContentType};base64,${reto.urlFoto}`}
            alt={reto.titulo}
          />
        </div>
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-content-end align-items-center sm:align-items-start gap-3">
              <div className="text-base font-bold ">{reto.titulo}</div>

              <div className=" surface-overlay w-full h-3rem mb-2  overflow-hidden text-overflow-ellipsis">{reto.descripcion}</div>

              <div className="flex flex-column sm:flex-row justify-content-between align-items-center gap-3">
                <div className="flex align-items-center gap-3">
                  <span className="flex align-items-center gap-2">
                    <i className="pi pi-calendar"></i>
                    {reto.fechaCreada ? <TextFormat type="date" value={reto.fechaCreada} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"></div>
          </div>
        </div>
      </div>
    );
  };

  const gridItem = reto => {
    return (
      <div className="flex md:justify-content-center sm:justify-content-center col-12 sm:col-12 md:col-6 lg:col-6 xl:col-3 ">
        <div className="h-30rem w-24rem max-w-30rem max-h-30rem p-4 border-round-xl shadow-4 mb-2 relative ">
          <div className="flex flex-column justify-content-center align-items-center ">
            <Link to={`/entidad/noticias/ver-noticias`} id="jh-tre" data-cy="noticia">
              <img
                className="w-9 h-9 md:w-12rem xl:w-14rem lg:w-14rem md:w-12rem sm:h-12rem xl:h-10rem lg:h-14rem md:h-12rem shadow-2  border-round"
                src={`content/uploads/${reto.urlFotoContentType}`}
                alt={reto.titulo}
              />
            </Link>
          </div>

          <div className="text-sm font-bold text-900 mt-2">{reto.titulo}</div>

          <div className="surface-overlay w-full h-6rem mb-2  overflow-hidden text-overflow-ellipsis">{reto.descripcion}</div>

          <div className="flex flex-column sm:flex-row justify-content-between align-items-center gap-8 mb-2 absolute bottom-0 left-3">
            <span className="flex align-items-center gap-2">
              <i className="pi pi-calendar"></i>
              {reto.fechaCreada ? <TextFormat type="date" value={reto.fechaCreada} format={APP_LOCAL_DATE_FORMAT} /> : null}
            </span>
            <Link to={`/entidad/noticias/noticias/${reto.id}/${props.match.params.id}/${props.match.params.index}`}>
              <div className="flex justify-content-start">
                <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline"></span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (reto, layout1) => {
    if (!reto) {
      return;
    }

    if (layout1 === 'list') return listItem(reto);
    else if (layout1 === 'grid') return gridItem(reto);
  };

  const header = () => {
    return <></>;
  };
  const atras = () => {
    props.history.push(`/usuario-panel/${props.match.params.index}`);
  };
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button label="Atrás" icon="pi pi-arrow-left" className="p-button-secondary mr-2" onClick={atras} />
        </div>
        <div className="text-2xl font-bold text-900 mb-2 text-blue-600">Noticias </div>
      </React.Fragment>
    );
  };
  const atrasvista = () => {
    props.history.push(`/entidad/noticias/noticias-crud/${props.match.params.id}/${props.match.params.index}`);
  };
  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          {ecosistemaUserEntity.user?.login === account.login && account?.authorities?.find(rol => rol === 'ROLE_ADMINECOSISTEMA') && (
            <Button label="Cambiar Vista" icon="pi pi-arrow-up" className="p-button-primary mr-2" onClick={atrasvista} />
          )}
        </div>
      </React.Fragment>
    );
  };

  return (
    <>
      <div className="card mt-4 mb-4">
        <Toolbar className="mt-1" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
        {noticiasList && noticiasList.length > 0 ? (
          <div className="flex flex-column align-items-center ">
            <DataView value={noticias} layout={forma} itemTemplate={itemTemplate} emptyMessage="No hay Noticias" lazy />
          </div>
        ) : (
          !loading && <div className="alert alert-warning mt-4">No hay Noticias.</div>
        )}
      </div>
    </>
  );
};

export default VistaGridNoticias;
