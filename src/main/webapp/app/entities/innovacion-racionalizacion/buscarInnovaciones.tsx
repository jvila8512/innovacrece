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
import { getTodasInnovaciones } from './innovacion-racionalizacion.reducer';

import { Dialog } from 'primereact/dialog';

import { RouteComponentProps } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSortState } from 'react-jhipster';

const BuscarInnovaciones = (props: RouteComponentProps<{ texto: string }>) => {
  const dispatch = useAppDispatch();
  const emptyInnovacion = {
    tematica: '',
    fecha: '',
    autores: '',
    numeroIdentidad: '',
    observacion: '',
  };
  const ListInno = useAppSelector(state => state.innovacionRacionalizacion.entities);

  const [selectedCustomers, setSelectedCustomers] = useState(null);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    tematica: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    autores: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    fecha: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    numeroIdentidad: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    vp: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [innovacionDialog, setInnovacionDialog] = useState(false);
  const loading = useAppSelector(state => state.innovacionRacionalizacion.loading);
  const [innovacion, setInnovacion] = useState(emptyInnovacion);

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
    buscar(props.match.params.texto);
  }, []);

  const editProduct = innovacion1 => {
    setInnovacion({ ...innovacion1 });
    setInnovacionDialog(true);
  };

  const actionBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <Button icon="pi pi-eye" className="p-button-rounded p-button-info mr-2" onClick={() => editProduct(rowData)} />
      </React.Fragment>
    );
  };

  const header = renderHeader();

  return (
    <div className="datatable-doc-demo">
      <div className="card">
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
          filters={filters}
          filterDisplay="menu"
          loading={loading}
          responsiveLayout="stack"
          globalFilterFields={['tematica', 'fecha', 'numeroIdentidad', 'autores', 'vp']}
          emptyMessage="No existen Innovaciones en el sistema."
          currentPageReportTemplate="Mostrar {first} al {last} de {totalRecords} Innovaciones"
        >
          <Column field="tematica" header="Tematica" sortable style={{ minWidth: '14rem' }} />

          <Column field="fecha" header="Fecha" sortable style={{ minWidth: '14rem' }} />
          <Column field="autores" header="Autores" sortable style={{ minWidth: '14rem' }} />
          <Column field="numeroIdentidad" header="Número Identidad" sortable style={{ minWidth: '14rem' }} />
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
        <div className="field">
          <label htmlFor="name">Temática</label>
          <InputText id="name" value={innovacion.tematica} />
        </div>
        <div className="field">
          <label htmlFor="description">Autores</label>
          <InputText id="description" value={innovacion.autores} />
        </div>
        <div className="field">
          <label htmlFor="fecha">Fecha</label>
          <InputText id="fecha" value={innovacion.fecha} />
          <div className="field">
            <label htmlFor="ob">Observación</label>
            <InputTextarea id="ob" value={innovacion.observacion} rows={3} cols={20} />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default BuscarInnovaciones;
