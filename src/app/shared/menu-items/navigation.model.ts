export class NavigationModel {
    public model: any[];

    constructor() {
        /*this.model = [
            {
                'id': 'idMenuVentas',
                'title': 'VENTAS',
                'type': 'collapse',
                'icon': 'shopping_cart',
                'children': [
                    {
                        'id': 'idCliente',
                        'title': 'CLIENTE',
                        'type': 'item',
                        'icon': 'group_add',
                        'url': '/ventas/cliente',
                    },
                    {
                        'id': 'idVenta',
                        'title': 'VENTA',
                        'type': 'item',
                        'icon': 'add_shopping_cart',
                        'url': '/ventas/venta'
                    },
                    {
                        'id': 'idVentaDirecta',
                        'title': 'VENTA DIRECTA',
                        'type': 'item',
                        'icon': 'add_shopping_cart',
                        'url': '/ventas/ventadirecta'
                    },
                    {
                        'id': 'idProforma',
                        'title': 'PROFORMA',
                        'type': 'item',
                        'icon': 'add_shopping_cart',
                        'url': '/ventas/proforma'
                    },
                    {
                        'id': 'idGuiaRemision',
                        'title': 'GRE REMITENTE',
                        'type': 'item',
                        'icon': 'add_shopping_cart',
                        'url': '/ventas/guia'
                    }
                ]
            },
            {
                'id': 'idMenuCompra',//el nombre del grupo o menu donde van estar
                'title': 'COMPRAS',
                'type': 'collapse',
                'icon': 'local_shipping',
                'children': [
                    {
                        'id': 'idProveedor',
                        'title': 'PROVEEDOR',
                        'type': 'item',
                        'icon': 'people',
                        'url': '/ventas/proveedor'
                    },
                    {
                        'id': 'idCompra',
                        'title': 'COMPRA',
                        'type': 'item',
                        'icon': 'store',//NOMBRE DEL ICONO
                        'url': '/ventas/compra'// RUTA DEL MODULO por ahora no existe
                    }
                ]
            },
            {
                'id': 'idMenuCaja',
                'title': 'CAJA',
                'type': 'collapse',
                'icon': 'phonelink_lock',
                'children': [
                    {
                        'id': 'IdEgreso',
                        'title': 'EGRESO',
                        'type': 'item',
                        'icon': 'trending_down',
                        'url': '/ventas/admincaja/egreso'
                    },
                    {
                        'id': 'IdCerrarCaja',
                        'title': 'CERRAR CAJA',
                        'type': 'item',
                        'icon': 'lock',
                        'url': '/ventas/admincaja/cerrarcaja'
                    },
                    {
                        'id': 'IdCerrarCajafuerte',
                        'title': 'CERRAR CAJA FUERTE',
                        'type': 'item',
                        'icon': 'phonelink_lock',
                        'url': '/ventas/admincaja/cerrarcajafuerte'
                    }
                ]
            },
            {
                'id': 'idMenuTipo',//el nombre del grupo o menu donde van estar
                'title': 'TIPOS GENERICOS',
                'type': 'collapse',
                'icon': 'important_devices',
                'children':[
                    /*{
                        'id': 'idTipoproducto',
                        'title': 'Tipo Producto',
                        'type': 'item',
                        'icon': 'store',//NOMBRE DEL ICONO
                        'url': '/ventas/tipo/t-produto'// RUTA DEL MODULO por ahora no existe
                    },
                    {
                        'id': 'idTipodocumento',
                        'title': 'Tipo Documento',
                        'type': 'item',
                        'icon': 'store',//NOMBRE DEL ICONO
                        'url': '/ventas/tipo/t-documento'// RUTA DEL MODULO por ahora no existe 
                    }
                ]
            },
            {
                'id': 'idMenuProducto',
                'title': 'ALMACEN',
                'type': 'collapse', 
                'icon': 'store',
                'children':[
                    {
                        'id': 'idTipoproducto',
                        'title': 'Tipo Producto',
                        'type': 'item',
                        'icon': 'store',//NOMBRE DEL ICONO
                        'url': '/ventas/rproducto/t-produto'// RUTA DEL MODULO por ahora no existe
                    },
                    {
                        'id': 'idColorProducto',
                        'title': 'Color de Producto',
                        'type': 'item',
                        'icon': 'category',
                        'url': '/ventas/rproducto/r-categoria'
                    },
                    {
                        'id': 'idUnidadMedida',
                        'title': 'Unidad Medida',
                        'type': 'item',
                        'icon': 'note_add',
                        'url': '/ventas/rproducto/r-unidadmedida'
                    },
                    {
                        'id': 'idProducto',
                        'title': 'Registrar Producto',
                        'type': 'item',
                        'icon': 'note_add',
                        'url': '/ventas/rproducto/r-producto'
                    }
                ]
            },
            {
                'id': 'idMenuOrganizacion',
                'title': 'ORGANIZACION',
                'type': 'collapse', 
                'icon': 'domain',
                'children':[
                    {
                        'id': 'idOrganizacion',
                        'title': 'Empresa',
                        'type': 'item',
                        'icon': 'location_city',
                        'url': '/ventas/organizacion/empresa'
                    },
                    {
                        'id': 'idSucursal',
                        'title': 'Sucursal',
                        'type': 'item',
                        'icon': 'domain',
                        'url': '/ventas/organizacion/sucursal'
                    }
                ]
            },
            {
                'id': 'idMenuAdminPersonal',
                'title': 'ADMIN PERSONAL',
                'type': 'collapse',
                'icon': 'group',
                'children': [
                    {
                        'id': 'idPersonal',
                        'title': 'PERSONAL',
                        'type': 'item',
                        'icon': 'group_add',
                        'url': '/ventas/personal',
                    }
                ]
            },
            {
                'id': 'idMenuAdminUsuario',
                'title': 'ADMIN USUARIO',
                'type': 'collapse', 
                'icon': 'laptop',
                'children':[
                    {
                        'id': 'idUsuario',
                        'title': 'Usuario',
                        'type': 'item',
                        'icon': 'category',
                        'url': '/ventas/usuario/listUsuario'
                    },
                    {
                        'id': 'idRol',
                        'title': 'Rol',
                        'type': 'item',
                        'icon': 'folder',
                        'url': '/ventas/usuario/ListRol'
                    }
                ]
            },
            {
                'id': 'idMenuConsultas',
                'title': 'CONSULTAS',
                'type': 'collapse', 
                'icon': 'local_library',
                'children':[
                    {
                        'id': 'idUstilidadpordia',
                        'title': 'Utilidad por Dia',
                        'type': 'item',
                        'icon': 'trending_up',
                        'url': '/ventas/consulta/listUtilidad'
                    },
                    {
                        'id': 'idUstilidadpormes',
                        'title': 'Utilidad por Mes',
                        'type': 'item',
                        'icon': 'trending_up',
                        'url': '/ventas/consulta/listUtilidadMes'
                    },
                    {
                        'id': 'idPrecioProductoAlmacen',
                        'title': 'Producto en Almacen',
                        'type': 'item',
                        'icon': 'folder',
                        'url': '/ventas/consulta/listProductoAlmacen'
                    },
                    {
                        'id': 'idVentausuario',
                        'title': 'Ventas por Usuario',
                        'type': 'item',
                        'icon': 'folder',
                        'url': '/ventas/consulta/listVentaUsuario'
                    },
                    {
                        'id': 'idAnularComprobante',
                        'title': 'Anular Comprobante',
                        'type': 'item',
                        'icon': 'file_copy',
                        'url': '/ventas/consulta/listVentaPorAnular'
                    },
                    {
                        'id': 'idVentaPorMes',
                        'title': 'Ventas por Mes',
                        'type': 'item',
                        'icon': 'file_copy',
                        'url': '/ventas/consulta/listVentaPorMes'
                    },
                    {
                        'id': 'idComprapormes',
                        'title': 'Compras de producto por Mes',
                        'type': 'item',
                        'icon': 'trending_up',
                        'url': '/ventas/consulta/listCompraPorMes'
                    },
                ]
            },
            {
                'id': 'idMenuReportes',
                'title': 'REPORTES',
                'type': 'collapse',
                'icon': 'picture_as_pdf',
                'children': [
                    {
                        'id': 'IdReporteVentaDia',
                        'title': 'Reporte de Ventas por dia',
                        'type': 'item',
                        'icon': 'people',
                        'url': '/ventas/reportes/reportVentaDia'
                    },
                    {
                        'id': 'IdReporteVentaMes',
                        'title': 'Reporte de Ventas por Mes',
                        'type': 'item',
                        'icon': 'people',
                        'url': '/ventas/reportes/reportVentaMes'
                    },
                    {
                        'id': 'IdReporteProdMasVendido',
                        'title': 'Reporte de Salida Producto',
                        'type': 'item',
                        'icon': 'people',
                        'url': '/ventas/reportes/reportProductoMasVenta'
                    }
                ]
            },
            {
                'id': 'idMenuAdminMenu',
                'title': 'ADMIN MENU',
                'type': 'collapse', 
                'icon': 'laptop',
                'children':[
                    {
                        'id': 'idMenu',
                        'title': 'Menu',
                        'type': 'item',
                        'icon': 'category',
                        'url': '/ventas/menu/listMenu'
                    },
                    {
                        'id': 'idSubMenu',
                        'title': 'Sub Menu',
                        'type': 'item',
                        'icon': 'folder',
                        'url': '/ventas/menu/ListSubMenu'
                    }
                ]
            },
            {
                'id': 'idMenuAdminUsuarioAdmin',
                'title': 'ADMIN USUARIOADMIN',
                'type': 'collapse', 
                'icon': 'laptop',
                'children':[
                    {
                        'id': 'idUsuarioAdmin',
                        'title': 'Usuario Admin',
                        'type': 'item',
                        'icon': 'category',
                        'url': '/ventas/listUsuarioAdmin'
                        'url': '/ventas/personal',
                    }
                ]
            },
            {
                'id': 'idMenuAdminPersonalDBA',
                'title': 'ADMIN PERSONAL DBA',
                'type': 'collapse',
                'icon': 'group',
                'children': [
                    {
                        'id': 'idPersonalBDA',
                        'title': 'PERSONAL DBA',
                        'type': 'item',
                        'icon': 'group_add',
                        'url': '/ventas/listpersonaladmin',
                    }
                ]
            }
        ];*/
    }
}
