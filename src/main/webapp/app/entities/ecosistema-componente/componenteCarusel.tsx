import React, { useEffect, useState } from 'react';
import './carusel.css';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntitiesCarrusel } from 'app/entities/ecosistema/ecosistema.reducer';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createEntity, getEntities, reset, updateEntity, getComponentesbyEcosistema, deleteEntity } from './ecosistema-componente.reducer';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Dialog } from 'primereact/dialog';
import { getEntities as getComponentes } from 'app/entities/componentes/componentes.reducer';
import { Translate, openFile } from 'react-jhipster';
import { Row } from 'reactstrap';
import { getArchivo } from 'app/entities/Files/files.reducer';

const ComponenteCarusel = props => {
  const dispatch = useAppDispatch();

  const [componenteDialogNew, setComponenteDialogNew] = useState(false);
  const [isNew, setNew] = useState(false);

  const componenteList = useAppSelector(state => state.ecosistemaComponente.entities);
  const loading = useAppSelector(state => state.ecosistemaComponente.loading);
  const componentes = useAppSelector(state => state.componentes.entities);

  const [selectedComponente, setSelectedComponente] = useState(null);

  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '600px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '480px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
  const emptyComponente = {
    id: null,
    link: null,
    documentoUrlContentType: null,
    descripcion: null,
    componentehijo: null,
    documentoUrl: '',
    componente: null,
    ecosistema: null,
  };

  useEffect(() => {
    dispatch(getComponentesbyEcosistema(props.id));
    dispatch(getComponentes({}));
  }, []);

  const productTemplate = selectedComponente1 => {
    return (
      <div className="col-12 border-round-xl relative h-10rem mb-2 card">
        <div className="flex flex-column xl:flex-row xl:align-items-center justify-content-center p-2 gap-4">
          <div className="flex flex-column sm:flex-row  align-items-center  flex-1 gap-4">
            <div className="flex flex-column  gap-3">
              <div className="text-base font-bold ">
                {selectedComponente1?.componente?.componente} : {selectedComponente1?.componentehijo}{' '}
              </div>

              <div className="surface-overlay w-full  mb-2  overflow-hidden text-overflow-ellipsis">{selectedComponente1?.descripcion}</div>

              <div className="flex justify-content-end absolute top-0 right-0 mt-3 mr-2">
                <div onClick={() => verReto(selectedComponente1)} className="flex justify-content-start manito">
                  <FontAwesomeIcon icon="eye" size="lg" />
                  <span className="d-none d-md-inline sm"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const verReto = componente1 => {
    setComponenteDialogNew(true);
    setSelectedComponente(componente1);
  };
  const hideDialogNuevo = () => {
    setComponenteDialogNew(false);
    setSelectedComponente(null);
  };
  const handleFileDownload = (base64Data, fileName) => {
    const linkk = document.createElement('a');
    linkk.setAttribute('href', 'data:aplication/pdf;base64,' + base64Data);
    linkk.setAttribute('download', fileName);
    document.body.appendChild(linkk);
    linkk.click();
  };

  const descargarDocumento = row => {
    const retosFiltrar = getArchivo(row.documentoUrlContentType);
    retosFiltrar.then(response => {
      handleFileDownload(response.data, row.documentoUrlContentType);
    });
  };

  return (
    <div className="card border-round-3xl ">
      <Carousel
        value={componenteList}
        numVisible={1}
        numScroll={1}
        className="custom-carousel m-0 p-0"
        responsiveOptions={responsiveOptions}
        autoplayInterval={4000}
        itemTemplate={productTemplate}
        header={
          <div className="flex mb-2">
            <div className="text-900 text-2xl text-blue-600 font-medium ">Componentes del Ecosistema</div>
            {props.logueado?.authorities?.find(rol => rol === 'ROLE_ADMINECOSISTEMA') &&
              props.ecosistemaEntity1.user?.id === props.logueado?.id && (
                <Link to={`/entidad/ecosistema-componente/crud/${props.id}/${props.index}`}>
                  <div className="flex justify-content-start flex-wrap  absolute top-0 right-0 mt-2 mr-4">
                    <FontAwesomeIcon icon="pencil" size="lg" /> <span className="d-none d-md-inline sm"></span>
                  </div>
                </Link>
              )}
          </div>
        }
      />

      <Dialog
        visible={componenteDialogNew}
        style={{ width: '500px' }}
        header="Componente"
        modal
        className="p-fluid  "
        onHide={hideDialogNuevo}
      >
        <Row className="justify-content-center">
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <div className="col-12 border-round-xl  mb-2">
              <div className="flex flex-column xl:flex-row xl:align-items-center p-2 gap-4">
                <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                  <div className="flex flex-column align-content-end align-items-center sm:align-items-start gap-3">
                    <div className="text-base font-bold ">Tipo de Componente: {selectedComponente?.componente?.componente} </div>
                    <div className="text-base font-bold ">Componente: {selectedComponente?.componentehijo} </div>

                    <div className="surface-overlay w-full  mb-2  overflow-hidden text-overflow-ellipsis">
                      {selectedComponente?.descripcion}
                    </div>

                    {selectedComponente?.documentoUrlContentType ? (
                      <div className="text-base font-bold ">
                        Documento:
                        <Button
                          label="Descargar"
                          className="p-button-secondary p-button-text ml-3"
                          onClick={() => descargarDocumento(selectedComponente)}
                        />
                      </div>
                    ) : null}

                    {selectedComponente?.link ? (
                      <div className="text-base font-bold ">
                        Link: &nbsp; &nbsp;
                        <a href={selectedComponente?.link} target="_blank" rel="noopener noreferrer">
                          {selectedComponente?.link}
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Row>
      </Dialog>
    </div>
  );
};

export default ComponenteCarusel;
