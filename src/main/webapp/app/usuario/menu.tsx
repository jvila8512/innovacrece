import './menu.css';

import React, { useState, useEffect, useRef } from 'react';
import { getArchivo } from 'app/entities/Files/files.reducer';

import { Link } from 'react-router-dom';

import { Avatar } from 'primereact/avatar';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, isEmail, translate } from 'react-jhipster';

import { getSession } from 'app/shared/reducers/authentication';
import { saveAccountSettings, reset } from 'app/modules/account/settings/settings.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import account from 'app/modules/account';
import { toast } from 'react-toastify';
import { createEntity as createFile, reset as resetFile, deletefile } from 'app/entities/Files/files.reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MenuUsuario = props => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const [perfilDialog, setPerfilDialog] = useState(false);

  const [fileupload, setFileupload] = useState(null);

  const accountAutenticado = useAppSelector(state => state.authentication.account);

  const successMessage = useAppSelector(state => state.settings.successMessage);

  const file = useAppSelector(state => state.files.entity);
  const updatingFile = useAppSelector(state => state.files.updating);
  const updateSuccessFile = useAppSelector(state => state.files.updateSuccess);
  const loadingFile = useAppSelector(state => state.files.loading);

  const [imagenUser, setImagenUser] = useState(null);

  useEffect(() => {
    const handler = e => {
      setOpen(false);
    };

    dispatch(getSession());

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
      dispatch(reset());
    };
  }, []);

  const borrar = icono => {
    const consulta = deletefile(icono);
    consulta.then(response => {
      dispatch(
        saveAccountSettings({
          ...accountAutenticado,
          imageUrl: fileupload.name,
        })
      );
    });
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(translate(successMessage));

      if (fileupload !== null && accountAutenticado.imageUrl !== 'userDesconocido.png') {
        borrar(accountAutenticado.imageUrl);
        setFileupload(null);
      } else setPerfilDialog(false);
    }
  }, [successMessage]);

  useEffect(() => {
    if (updateSuccessFile) {
      dispatch(
        saveAccountSettings({
          ...accountAutenticado,
          imageUrl: fileupload.name,
        })
      );
    }
  }, [updateSuccessFile]);

  const hidePerfilDialog = () => {
    setPerfilDialog(false);
  };
  const verPerfilDialog = () => {
    setPerfilDialog(true);
  };

  const handleValidSubmit = values => {
    dispatch(
      saveAccountSettings({
        ...accountAutenticado,
        ...values,
      })
    );
  };
  const handleFileUpload = event => {
    setFileupload(event.files[0]);
    const f = event.files[0];
    const formData = new FormData();
    formData.append('files', f);
    dispatch(createFile(formData));
  };

  const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
  const uploadOptions = {
    icon: 'pi pi-fw pi-cloud-upload',
    iconOnly: true,
    className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined',
  };
  const cancelOptions = {
    icon: 'pi pi-fw pi-times',
    iconOnly: true,
    className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined',
  };

  const onBasicUploadAuto = () => {
    toast.success('Subido');
  };

  return (
    <div className=" App ">
      <div className="flex" ref={menuRef}>
        <div
          className="menu-trigger  "
          onClick={() => {
            setOpen(true);
          }}
          onMouseEnter={() => {
            setOpen(true);
          }}
        >
          <Button icon="pi pi-align-justify" className="p-button-outlined p-button-help" />

          <p className="text-900 text-2xl text-blue-600 font-medium ml-10">{accountAutenticado.login}</p>
        </div>

        <div className={`pt-2 dropdown-menu1  ${open ? 'active' : 'inactive'} card `}>
          <div className="bg-white">
            <div className="relative">
              <Avatar image={`content/uploads/${accountAutenticado.imageUrl}`} shape="circle" className="" size="large"></Avatar>
              <div className="flex justify-content-start flex-wrap  absolute top-0 right-0  mr-2 ">
                <Button
                  icon="pi pi-pencil"
                  className="p-button-rounded p-button-text p-button-sm "
                  aria-label="Submit"
                  onClick={verPerfilDialog}
                />
              </div>
            </div>

            <h5 className="text-sm  text-blue-600 font-medium mt-1">{accountAutenticado.firstName + ' ' + accountAutenticado.lastName}</h5>
            <div className="linea"></div>

            {props.account1?.authorities?.find(rol => rol === 'ROLE_ADMIN') && (
              <div className="flex flex-column">
                <Link
                  to={`admin/user-management`}
                  className="  flex w-full  align-items-center justify-content-center font-medium menuOver "
                  id="jh-tre1"
                  data-cy="menu1"
                >
                  <span className="p-2   ">Usuarios</span>
                </Link>
                <Link
                  to={`/entidad/ecosistema/crud`}
                  className="flex w-full  align-items-center justify-content-center font-medium menuOver "
                  id="jh-tre1"
                  data-cy="menu1"
                >
                  <span className="p-2">Ecosistemas</span>
                </Link>
                <Link
                  to={`/entidad/noticias/noticias-admin`}
                  className=" flex w-full  align-items-center justify-content-center font-medium menuOver"
                  id="jh-tre1"
                  data-cy="menu1"
                >
                  <span className="p-2">Noticias</span>
                </Link>
                <Link
                  to={`entidad/proyectos/proyectos_admin/${props.account1.id}`}
                  className=" flex w-full  align-items-center justify-content-center font-medium menuOver "
                  id="jh-tre1"
                  data-cy="menu1"
                >
                  <span className="p-2">Proyectos</span>
                </Link>

                <Link
                  to={`/entidad/servicios`}
                  className="  flex w-full  align-items-center justify-content-center font-medium menuOver"
                  id="jh-tre1"
                  data-cy="menu1"
                >
                  <span className="p-2">Servicios</span>
                </Link>
                <Link
                  to={`/entidad/change-macker`}
                  className=" border-0 flex w-full  align-items-center justify-content-center  font-medium menuOver"
                  id="jh-tre1"
                  data-cy="menu1"
                >
                  <span className="p-2"> Change-macker</span>
                </Link>
              </div>
            )}
            <div className="flex flex-column ">
              <Link
                to={`/entidad/ecosistema/card`}
                className=" border-0 flex w-full  align-items-center justify-content-center  font-medium menuOver"
                id="jh-tre3"
                data-cy="menu3"
              >
                <span className="p-2">Unirse a un Ecosistema</span>
              </Link>
              <Link
                to={`/entidad/innovacion-racionalizacion/crud`}
                className=" border-0 flex w-full  align-items-center justify-content-center  font-medium menuOver"
                id="jh-tre2"
                data-cy="menu2"
              >
                <span className="p-2">Innovaciones</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Dialog visible={perfilDialog} style={{ width: '500px' }} header="Perfil" modal onHide={hidePerfilDialog}>
        <div className="grid">
          <div className="col-3">
            <div className="grig">
              <div className="col-12">
                <Avatar image={`content/uploads/${props.account1.imageUrl}`} shape="circle" className="" size="xlarge"></Avatar>
              </div>
              <div className="col-6">
                <FileUpload
                  name="demo"
                  url="./upload"
                  mode="basic"
                  auto
                  onUpload={onBasicUploadAuto}
                  customUpload
                  uploadHandler={handleFileUpload}
                  chooseOptions={chooseOptions}
                />
              </div>
            </div>
          </div>
          <div className="col-9 ">
            <ValidatedForm id="settings-form" onSubmit={handleValidSubmit} defaultValues={accountAutenticado}>
              <ValidatedField
                name="firstName"
                label={translate('settings.form.firstname')}
                id="firstName"
                placeholder={translate('settings.form.firstname.placeholder')}
                validate={{
                  required: { value: true, message: translate('settings.messages.validate.firstname.required') },
                  minLength: { value: 1, message: translate('settings.messages.validate.firstname.minlength') },
                  maxLength: { value: 50, message: translate('settings.messages.validate.firstname.maxlength') },
                }}
                data-cy="firstname"
              />
              <ValidatedField
                name="lastName"
                label={translate('settings.form.lastname')}
                id="lastName"
                placeholder={translate('settings.form.lastname.placeholder')}
                validate={{
                  required: { value: true, message: translate('settings.messages.validate.lastname.required') },
                  minLength: { value: 1, message: translate('settings.messages.validate.lastname.minlength') },
                  maxLength: { value: 50, message: translate('settings.messages.validate.lastname.maxlength') },
                }}
                data-cy="lastname"
              />
              <ValidatedField
                name="email"
                label={translate('global.form.email.label')}
                placeholder={translate('global.form.email.placeholder')}
                type="email"
                validate={{
                  required: { value: true, message: translate('global.messages.validate.email.required') },
                  minLength: { value: 5, message: translate('global.messages.validate.email.minlength') },
                  maxLength: { value: 254, message: translate('global.messages.validate.email.maxlength') },
                  validate: v => isEmail(v) || translate('global.messages.validate.email.invalid'),
                }}
                data-cy="email"
              />

              <Button
                className="w-full"
                color="primary"
                id="save-entity"
                data-cy="entityCreateSaveButton"
                type="submit"
                disabled={updatingFile}
              >
                <span className="m-auto">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </span>
              </Button>
            </ValidatedForm>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default MenuUsuario;
