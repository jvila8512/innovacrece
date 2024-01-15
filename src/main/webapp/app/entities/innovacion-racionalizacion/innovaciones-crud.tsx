import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { getTodasInnovaciones, getEntity, updateEntity, createEntity, reset, deleteEntity } from './innovacion-racionalizacion.reducer';

import { Dialog } from 'primereact/dialog';

import { RouteComponentProps } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { Translate, ValidatedBlobField, ValidatedField, ValidatedForm, getSortState, isNumber, translate } from 'react-jhipster';
import { Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITipoIdea } from 'app/shared/model/tipo-idea.model';
import { getEntities as getTipoIdeas } from 'app/entities/tipo-idea/tipo-idea.reducer';
import { IInnovacionRacionalizacion } from 'app/shared/model/innovacion-racionalizacion.model';
import { Toolbar } from 'primereact/toolbar';

const InnovacionesCrud = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const emptyInnovacion = {
    id: null,
    tematica: '',
    fecha: '',
    autores: '',
    numeroIdentidad: '',
    observacion: '',
    aprobada: '',
    publico: null,
    tipoIdea: null,
  };

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    tematica: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    autores: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    fecha: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    numeroIdentidad: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [innovacionDialog, setInnovacionDialog] = useState(false);

  const ListInno = useAppSelector(state => state.innovacionRacionalizacion.entities);
  const tipoIdeas = useAppSelector(state => state.tipoIdea.entities);
  const innovacionRacionalizacionEntity = useAppSelector(state => state.innovacionRacionalizacion.entity);
  const loading = useAppSelector(state => state.innovacionRacionalizacion.loading);
  const updating = useAppSelector(state => state.innovacionRacionalizacion.updating);
  const updateSuccess = useAppSelector(state => state.innovacionRacionalizacion.updateSuccess);

  const [isNew, setNew] = useState(true);
  const [selectedinnovacion, setselectedInnovacion] = useState(emptyInnovacion);

  const [innoDialogNew, setInnoDialogNew] = useState(false);
  const [deleteInnoDialog, setDeleteInnoDialog] = useState(false);

  const onGlobalFilterChange = e => {
    const value = e.target.value;
    const _filters = { ...filters };
    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const buscar = e => {
    const value = e;
    const _filters = { ...filters };
    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const hideDialog = () => {
    setInnovacionDialog(false);
  };

  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cerrar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
    </React.Fragment>
  );

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center">
        <h5 className="m-0">Innovaciones</h5>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar.." />
        </span>
      </div>
    );
  };

  useEffect(() => {
    dispatch(getTodasInnovaciones());
    dispatch(getTipoIdeas({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      setInnoDialogNew(false);
      setNew(true);
      dispatch(reset());
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...innovacionRacionalizacionEntity,
      ...values,
      tipoIdea: tipoIdeas.find(it => it.id.toString() === values.tipoIdea.toString()),
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
          ...selectedinnovacion,
          tipoIdea: selectedinnovacion?.tipoIdea?.id,
        };

  const editProduct = innovacion1 => {
    setselectedInnovacion({ ...innovacion1 });
    setInnovacionDialog(true);
  };
  const confirmDeleteSelected = rowEcosistema => {
    setDeleteInnoDialog(true);
    setselectedInnovacion(rowEcosistema);
  };
  const actualizarInno = noticiasact => {
    setselectedInnovacion(noticiasact);
    setInnoDialogNew(true);
    setNew(false);
  };
  const actionBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <Button icon="pi pi-eye" className="p-button-rounded p-button-info ml-2 mb-1" onClick={() => editProduct(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger ml-2 mb-1" onClick={() => confirmDeleteSelected(rowData)} />
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning ml-2 mb-1" onClick={() => actualizarInno(rowData)} />
      </React.Fragment>
    );
  };

  const hideDialogNuevo = () => {
    setInnoDialogNew(false);
    setNew(true);
  };
  const atras = () => {
    props.history.push(`/usuario-panel`);
  };
  const header = renderHeader();
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button label="Atrás" icon="pi pi-arrow-left" className="p-button-secondary mr-2" onClick={atras} />
        </div>
      </React.Fragment>
    );
  };
  const verDialogNuevo = () => {
    setInnoDialogNew(true);
    setNew(true);
  };
  const atrasvista = () => {
    props.history.push(`/entidad/noticias/grid-noticias/${props.match.params.id}`);
  };
  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button label="Nueva Innovación" icon="pi pi-plus" className="p-button-info" onClick={verDialogNuevo} />
      </React.Fragment>
    );
  };
  const hideDeleteInnoDialog = () => {
    setDeleteInnoDialog(false);
  };
  const deleteInno = () => {
    dispatch(deleteEntity(selectedinnovacion.id));
    setDeleteInnoDialog(false);
    setselectedInnovacion(null);
  };
  const deleteInnoDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteInnoDialog} />

      <Button label="Sí" icon="pi pi-check" className="p-button-text" onClick={deleteInno} />
    </>
  );
  return (
    <div className="grid crud-demo mt-3 mb-4">
      <div className="col-12">
        <div className="card">
          <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
          <DataTable
            value={ListInno}
            paginator
            className="p-datatable-customers"
            header={header}
            rows={10}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            rowsPerPageOptions={[10, 25, 50]}
            dataKey="id"
            rowHover
            selection={selectedinnovacion}
            onSelectionChange={e => setselectedInnovacion(e.value)}
            filters={filters}
            filterDisplay="menu"
            loading={loading}
            responsiveLayout="stack"
            globalFilterFields={['tematica', 'fecha', 'numeroIdentidad', 'autores', 'vp']}
            emptyMessage="No existen Innovaciones en el sistema."
            currentPageReportTemplate="Mostrar {first} al {last} de {totalRecords} Innovaciones"
          >
            <Column field="fecha" header="Fecha" sortable style={{ minWidth: '14rem' }} />
            <Column field="tematica" header="Tematica" sortable style={{ minWidth: '14rem' }} />
            <Column field="autores" header="Autores" sortable style={{ minWidth: '14rem' }} />
            <Column field="numeroIdentidad" header="Número Identidad" sortable style={{ minWidth: '14rem' }} />

            <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
          </DataTable>
        </div>

        <Dialog visible={innoDialogNew} style={{ width: '600px' }} header="Innovación" modal className="p-fluid  " onHide={hideDialogNuevo}>
          <Row className="justify-content-center">
            {loading ? (
              <p>Cargando...</p>
            ) : (
              <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
                {!isNew ? (
                  <ValidatedField
                    name="id"
                    required
                    readOnly
                    hidden
                    id="innovacion-racionalizacion-id"
                    label={translate('global.field.id')}
                    validate={{ required: true }}
                  />
                ) : null}
                <ValidatedField
                  label={translate('jhipsterApp.innovacionRacionalizacion.tematica')}
                  id="innovacion-racionalizacion-tematica"
                  name="tematica"
                  data-cy="tematica"
                  type="text"
                  validate={{
                    required: { value: true, message: translate('entity.validation.required') },
                  }}
                />
                <ValidatedField
                  label={translate('jhipsterApp.innovacionRacionalizacion.fecha')}
                  id="innovacion-racionalizacion-fecha"
                  name="fecha"
                  data-cy="fecha"
                  type="date"
                  validate={{
                    required: { value: true, message: translate('entity.validation.required') },
                  }}
                />
                <ValidatedField
                  label={translate('jhipsterApp.innovacionRacionalizacion.vp')}
                  id="innovacion-racionalizacion-vp"
                  name="vp"
                  data-cy="vp"
                  type="text"
                  validate={{
                    required: { value: true, message: translate('entity.validation.required') },
                    validate: v => isNumber(v) || translate('entity.validation.number'),
                  }}
                />
                <ValidatedField
                  label={translate('jhipsterApp.innovacionRacionalizacion.autores')}
                  id="innovacion-racionalizacion-autores"
                  name="autores"
                  data-cy="autores"
                  type="text"
                  validate={{
                    required: { value: true, message: translate('entity.validation.required') },
                  }}
                />
                <ValidatedField
                  label={translate('jhipsterApp.innovacionRacionalizacion.numeroIdentidad')}
                  id="innovacion-racionalizacion-numeroIdentidad"
                  name="numeroIdentidad"
                  data-cy="numeroIdentidad"
                  type="text"
                  validate={{
                    required: { value: true, message: translate('entity.validation.required') },
                    validate: v => isNumber(v) || translate('entity.validation.number'),
                  }}
                />
                <ValidatedField
                  label={translate('jhipsterApp.innovacionRacionalizacion.observacion')}
                  id="innovacion-racionalizacion-observacion"
                  name="observacion"
                  data-cy="observacion"
                  type="textarea"
                />
                <ValidatedField
                  label={translate('jhipsterApp.innovacionRacionalizacion.aprobada')}
                  id="innovacion-racionalizacion-aprobada"
                  name="aprobada"
                  data-cy="aprobada"
                  check
                  type="checkbox"
                />
                <ValidatedField
                  label={translate('jhipsterApp.innovacionRacionalizacion.publico')}
                  id="innovacion-racionalizacion-publico"
                  name="publico"
                  data-cy="publico"
                  check
                  type="checkbox"
                />
                <ValidatedField
                  id="innovacion-racionalizacion-tipoIdea"
                  name="tipoIdea"
                  data-cy="tipoIdea"
                  label={translate('jhipsterApp.innovacionRacionalizacion.tipoIdea')}
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
                &nbsp;
                <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                  <span className="m-auto pl-2">
                    <FontAwesomeIcon icon="save" />
                    &nbsp;
                    <Translate contentKey="entity.action.save">Save</Translate>
                  </span>
                </Button>
              </ValidatedForm>
            )}
          </Row>
        </Dialog>
        <Dialog
          visible={deleteInnoDialog}
          style={{ width: '450px' }}
          header="Confirmar"
          modal
          footer={deleteInnoDialogFooter}
          onHide={hideDeleteInnoDialog}
        >
          <div className="flex align-items-center justify-content-center">
            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
            {selectedinnovacion && (
              <span>
                ¿Seguro que quiere eliminar la Noticia: <b>{selectedinnovacion.tematica}</b>?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default InnovacionesCrud;
