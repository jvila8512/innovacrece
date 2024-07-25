import { useAppDispatch, useAppSelector } from 'app/config/store';
import { Button } from 'primereact/button';

import { SplitButton } from 'primereact/splitbutton';
import { TabPanel, TabView } from 'primereact/tabview';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getTodasInnovaciones } from 'app/entities/innovacion-racionalizacion/innovacion-racionalizacion.reducer';
import { getEntities as getTipoIdeas } from 'app/entities/tipo-idea/tipo-idea.reducer';
import { FilterMatchMode } from 'primereact/api';
import { Row } from 'reactstrap';
import { Tag } from 'primereact/tag';
import { Calendar } from 'primereact/calendar';
import { isNumber, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

const BusquedaGeneral = (props: RouteComponentProps<{ orden: string; texto: string }>) => {
  const dispatch = useAppDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const [texto, setTexto] = useState('');

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
    user: null,
  };

  const [globalFilterValueInno, setGlobalFilterValueInno] = useState('');
  const [innovacionDialog, setInnovacionDialog] = useState(false);
  const loading = useAppSelector(state => state.innovacionRacionalizacion.loading);
  const [innovacion, setInnovacion] = useState(emptyInnovacion);
  const [selectedCustomers, setSelectedCustomers] = useState(null);

  const ListInno = useAppSelector(state => state.innovacionRacionalizacion.entities);
  const tipoIdeas = useAppSelector(state => state.tipoIdea.entities);

  useEffect(() => {
    setTexto(props.match.params.texto);
    dispatch(getTodasInnovaciones());
    buscar(props.match.params.texto);
    dispatch(getTipoIdeas({}));
  }, []);

  const [filtersInno, setFiltersInno] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    'tipoIdea.tipoIdea': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    tematica: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    titulo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    sindicato: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    fecha: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    fechaPractica: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    aprobada: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const customFilterMatchModes = {
    startsWith: 'Comienza con',
    contains: 'Contiene',
    endsWith: 'Termina con',
    equals: 'Igual a',
    notEquals: 'No igual a',
    in: 'En',
    lt: 'Menor que',
    lte: 'Menor o igual que',
    gt: 'Mayor que',
    gte: 'Mayor o igual que',
    custom: 'Personalizado',
  };

  const onGlobalFilterChangeInno = e => {
    const value = e.target.value;
    const _filters = { ...filtersInno };
    _filters['global'].value = value;

    setFiltersInno(_filters);
    setGlobalFilterValueInno(value);
  };

  const buscar = e => {
    const value = e;
    const _filters = { ...filtersInno };
    _filters['global'].value = value;

    setFiltersInno(_filters);
    setGlobalFilterValueInno(value);
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
        <div className="flex justify-content-start ">
          <div className="text-900 text-2xl text-blue-600 font-medium ">Búsqueda de Innovaciones</div>
        </div>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValueInno} onChange={onGlobalFilterChangeInno} placeholder="Buscar por palabra Clave" />
        </span>
      </div>
    );
  };
  const [tipoIdeasArray, setNamesArray] = useState([]);

  useEffect(() => {
    dispatch(getTodasInnovaciones());
    buscar(props.match.params.texto);
    dispatch(getTipoIdeas({}));
  }, []);

  const editProduct = innovacion1 => {
    setInnovacion({ ...innovacion1 });
    setInnovacionDialog(true);
    setNew(false);
  };

  const actionBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <Button icon="pi pi-eye" className="p-button-rounded p-button-info mr-2" onClick={() => editProduct(rowData)} />
      </React.Fragment>
    );
  };
  const tematicaBodyTemplate = rowData => {
    return (
      <>
        <span className="pl-5">{rowData.tematica}</span>
      </>
    );
  };
  const estadoTemplate = rowData => {
    return <>{rowData.aprobada ? <Tag value="Aprobada" severity="success"></Tag> : <Tag value="No Aprobada" severity="danger"></Tag>}</>;
  };

  const saveEntity = values => {};
  const [isNew, setNew] = useState(true);

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...innovacion,
          tipoIdea: innovacion?.tipoIdea?.id,
        };

  const header = renderHeader();
  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [selectedValueDate, setSelectedValueDate] = useState(null);
  const dateFilterTemplate = options => {
    return (
      <Calendar
        value={options.value}
        onChange={e => {
          const formattedDate = formatDate(e.value);
          setSelectedValueDate(e.value);
          options.filterCallback(e.value);
          // eslint-disable-next-line no-console
          console.log(selectedValueDate) + ' ';
        }}
        dateFormat="yy-mm-dd"
        placeholder="Fecha"
      />
    );
  };
  const [selectedValue, setSelectedValue] = useState(null);

  const statuses = ['Aprobada', 'No Aprobada'];

  const statusItemTemplate = option => {
    return (
      <>{option === 'Aprobada' ? <Tag value="Aprobada" severity="success"></Tag> : <Tag value="No Aprobada" severity="danger"></Tag>}</>
    );
  };

  const statusRowFilterTemplate = options => {
    return (
      <Dropdown
        value={selectedValue}
        options={statuses}
        onChange={e => {
          setSelectedValue(e.value);
          options.filterApplyCallback(e.value === 'Aprobada' ? true : false);
          // eslint-disable-next-line no-console
          console.log(selectedValue) + ' ';
        }}
        itemTemplate={statusItemTemplate}
        placeholder="Seleccione"
        className="p-column-filter"
        showClear
      />
    );
  };
  const representativesItemTemplate = option => {
    return (
      <div className="p-multiselect-representative-option">
        <span className="image-text">{option.tipoIdea}</span>
      </div>
    );
  };

  const [selectedValueTipoIdea, setSelectedValueTipoIdea] = useState(null);

  const representativeRowFilterTemplate = options => {
    return (
      <Dropdown
        value={selectedValueTipoIdea}
        options={tipoIdeas}
        itemTemplate={representativesItemTemplate}
        onChange={e => {
          setSelectedValueTipoIdea(e.value);
          options.filterApplyCallback(e.value.tipoIdea);
        }}
        optionLabel="tipoIdea"
        placeholder="Buscar.."
        className="p-column-filter"
      />
    );
  };

  const formatDate1 = value => {
    return value.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };
  const dateBodyTemplate = rowData => {
    return formatDate(rowData.date);
  };

  // fin Innovaciones

  const tabHeaderITemplate = (options, i) => {
    return (
      <div
        className="flex align-items-center border-round-2xl shadow-4 pt-2"
        style={{ cursor: 'pointer' }}
        onClick={e => setActiveIndex(i)}
      >
        <h5 className="text-700 text-xs  sm:text-md text-blue-600 font-medium  p-2 "> {options}</h5>
      </div>
    );
  };
  const atras = () => {
    props.history.push(`/usuario-panel`);
  };
  const items = [
    {
      label: 'Prioridad',
      icon: 'pi pi-search',
      // eslint-disable-next-line object-shorthand
      command: () => {
        const value = texto;
        const _filters = { ...filtersInno };
        _filters['fecha'].value = value;

        setFiltersInno(_filters);
        setGlobalFilterValueInno(value);
      },
    },
    {
      label: 'ODS',
      icon: 'pi pi-search',
    },
    {
      label: 'Sector',
      icon: 'pi pi-search',
    },
  ];
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button label="Atrás" icon="pi pi-arrow-left" className="p-button-secondary mr-2" onClick={atras} />
        </div>
        <div className="my-2">
          <h5 className="text-900 text-2xl text-blue-600 font-medium mt-2 mb-2 ml-4">Buscar Innovaciones o Proyectos</h5>
        </div>
      </React.Fragment>
    );
  };
  const rightToolbarTemplate = () => {
    return (
      <div className="flex justify-content-end ml-auto">
        <div className=" p-inputgroup  ">
          <InputText value={texto} placeholder="Sector, ODS, Prioridad" onChange={e => setTexto(e.target.value)} />
          {texto ? (
            <SplitButton label="" icon="pi pi-search" model={items}></SplitButton>
          ) : (
            <SplitButton label="" disabled icon="pi pi-search" model={items}></SplitButton>
          )}
        </div>
      </div>
    );
  };
  return (
    <div className="grid p-0 mt-5">
      <div className="col-12  mb-4 p-0">
        <div className="card">
          <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
          <TabView className="p-0" activeIndex={activeIndex} onTabChange={e => setActiveIndex(e.index)}>
            <TabPanel
              key={`card-0}`}
              header="Innovaciones"
              headerTemplate={tabHeaderITemplate('Innovaciones', 0)}
              headerClassName="flex align-items-center p-2"
              className="p-0"
            >
              <div className="card mt-5">
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
                  selection={selectedCustomers}
                  onSelectionChange={e => setSelectedCustomers(e.value)}
                  filters={filtersInno}
                  filterDisplay="row"
                  loading={loading}
                  responsiveLayout="stack"
                  emptyMessage="No existen Innovaciones en el sistema."
                  currentPageReportTemplate="Mostrar {first} al {last} de {totalRecords} Innovaciones"
                >
                  <Column
                    field="fecha"
                    header="Fecha"
                    filter
                    filterPlaceholder="Buscar.."
                    showFilterMenu={false}
                    filterMenuStyle={{ width: '12rem' }}
                    sortable
                    style={{ minWidth: '12rem' }}
                  />

                  <Column
                    field="tipoIdea.tipoIdea"
                    header="Tipo Idea"
                    sortable
                    style={{ minWidth: '12rem' }}
                    filterField="tipoIdea.tipoIdea"
                    showFilterMenu={false}
                    filterMenuStyle={{ width: '12rem' }}
                    filter
                    filterElement={representativeRowFilterTemplate}
                  />

                  <Column
                    filterField="titulo"
                    field="titulo"
                    filter
                    filterPlaceholder="Buscar.."
                    filterMenuStyle={{ width: '14rem' }}
                    header="Título"
                    sortable
                    showFilterMenu={false}
                    style={{ minWidth: '14rem' }}
                  />

                  <Column
                    field="tematica"
                    filter
                    header="Tematica"
                    body={tematicaBodyTemplate}
                    sortable
                    style={{ minWidth: '14rem' }}
                    showFilterMenu={false}
                    filterMatchMode="startsWith"
                    filterMatchModeOptions={[
                      { value: 'startsWith', label: 'Comienza con' },
                      { value: 'contains', label: 'Contiene' },
                      { value: 'equals', label: 'Igual a' },
                    ]}
                    filterPlaceholder="Buscar.."
                  />
                  <Column
                    field="sindicato"
                    header="Sindicato"
                    sortable
                    style={{ minWidth: '12rem' }}
                    filter
                    showFilterMenu={false}
                    filterPlaceholder="Buscar.."
                  />
                  <Column
                    field="aprobada"
                    filter
                    showFilterMenu={false}
                    filterElement={statusRowFilterTemplate}
                    filterMenuStyle={{ width: '8rem' }}
                    header="Escalable"
                    sortable
                    body={estadoTemplate}
                    headerStyle={{ minWidth: '7rem' }}
                  ></Column>
                  <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
              </div>
              <Dialog
                visible={innovacionDialog}
                style={{ width: '600px' }}
                header="Detalles Innovación"
                modal
                className="p-fluid"
                footer={productDialogFooter}
                onHide={hideDialog}
              >
                <Row className="justify-content-center">
                  {loading ? (
                    <p>Cargando...</p>
                  ) : (
                    <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
                      <ValidatedField
                        id="innovacion-racionalizacion-tipoIdea"
                        name="tipoIdea"
                        data-cy="tipoIdea"
                        disabled
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
                      <ValidatedField
                        label={translate('jhipsterApp.innovacionRacionalizacion.titulo')}
                        id="innovacion-racionalizacion-titulo"
                        name="titulo"
                        data-cy="titulo"
                        readOnly
                        type="text"
                        validate={{
                          required: { value: true, message: translate('entity.validation.required') },
                        }}
                      />
                      <ValidatedField
                        label={translate('jhipsterApp.innovacionRacionalizacion.tematica')}
                        id="innovacion-racionalizacion-tematica"
                        name="tematica"
                        data-cy="tematica"
                        type="text"
                        readOnly
                        validate={{
                          required: { value: true, message: translate('entity.validation.required') },
                        }}
                      />
                      <ValidatedField
                        label={translate('jhipsterApp.innovacionRacionalizacion.sindicato')}
                        id="innovacion-racionalizacion-sindicato"
                        name="sindicato"
                        data-cy="sindicato"
                        type="text"
                        readOnly
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
                        readOnly
                        validate={{
                          required: { value: true, message: translate('entity.validation.required') },
                        }}
                      />
                      <ValidatedField
                        label={translate('jhipsterApp.innovacionRacionalizacion.fechaPractica')}
                        id="innovacion-racionalizacion-fechaPractica"
                        name="fechaPractica"
                        data-cy="fechaPractica"
                        type="date"
                        readOnly
                        validate={{
                          required: { value: true, message: translate('entity.validation.required') },
                        }}
                      />

                      <ValidatedField
                        label={translate('jhipsterApp.innovacionRacionalizacion.autores')}
                        id="innovacion-racionalizacion-autores"
                        name="autores"
                        data-cy="autores"
                        type="text"
                        readOnly
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
                        readOnly
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
                        readOnly
                      />
                      <ValidatedField
                        label={translate('jhipsterApp.innovacionRacionalizacion.aprobada')}
                        id="innovacion-racionalizacion-aprobada"
                        name="aprobada"
                        data-cy="aprobada"
                        check
                        type="checkbox"
                        readOnly
                      />
                      <ValidatedField
                        label={translate('jhipsterApp.innovacionRacionalizacion.publico')}
                        id="innovacion-racionalizacion-publico"
                        name="publico"
                        data-cy="publico"
                        check
                        type="checkbox"
                        readOnly
                      />
                    </ValidatedForm>
                  )}
                </Row>
              </Dialog>
            </TabPanel>

            <TabPanel
              key={`card-0}`}
              header="Proyectos"
              headerTemplate={tabHeaderITemplate('Proyectos', 1)}
              headerClassName="flex align-items-center p-2"
              className="p-0"
            >
              <h1>Proyectos</h1>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  );
};

export default BusquedaGeneral;
