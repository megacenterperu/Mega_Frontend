export class NavigationModel {
    public model: any[];

    constructor() {
        this.model = [
            {
                'id': 'ventas',
                'title': 'VENTAS',
                'type': 'collapse',
                'icon': 'shopping_cart',
                'children': [
                    /*{
                        'id': 'persona',
                        'title': 'PERSONA',
                        'type': 'item',
                        'icon': 'email',
                        'url': '/ventas/persona',
                        'badge': {
                            'title': 25,
                            'bg': '#F44336',
                            'fg': '#FFFFFF'
                        }
                    },*/
                    {
                        'id': 'persona',
                        'title': 'CLIENTE',
                        'type': 'item',
                        'icon': 'group_add',
                        'url': '/ventas/cliente',
                    },
                    {
                        'id': 'venta',
                        'title': 'VENTA',
                        'type': 'item',
                        'icon': 'add_shopping_cart',
                        'url': '/ventas/venta'
                    },
                    {
                        'id': 'proforma',
                        'title': 'PROFORMA',
                        'type': 'item',
                        'icon': 'add_shopping_cart',
                        'url': '/ventas/proforma'
                    }
                ]
            },
            {
                'id': 'persona',//el nombre del grupo o menu donde van estar
                'title': 'COMPRAS',
                'type': 'collapse',
                'icon': 'local_shipping',
                'children': [
                    {
                        'id': 'proveedor',
                        'title': 'PROVEEDOR',
                        'type': 'item',
                        'icon': 'people',
                        'url': '/ventas/proveedor'
                    },
                    {
                        'id': 'compra',
                        'title': 'COMPRA',
                        'type': 'item',
                        'icon': 'store',//NOMBRE DEL ICONO
                        'url': '/ventas/compra'// RUTA DEL MODULO por ahora no existe
                    }
                ]
            },
            {
                'id': 'idmenuCaja',
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
                        'id': 'IdCerrarCaja',
                        'title': 'CERRAR CAJA FUERTE',
                        'type': 'item',
                        'icon': 'phonelink_lock',
                        'url': '/ventas/admincaja/cerrarcajafuerte'
                    }
                ]
            },
            {
                'id': 'idmenuT',//el nombre del grupo o menu donde van estar
                'title': 'TIPOS GENERICOS',
                'type': 'collapse',
                'icon': 'important_devices',
                'children':[
                    /*{
                        'id': 'tipoproducto',
                        'title': 'Tipo Producto',
                        'type': 'item',
                        'icon': 'store',//NOMBRE DEL ICONO
                        'url': '/ventas/tipo/t-produto'// RUTA DEL MODULO por ahora no existe
                    },*/
                    {
                        'id': 'tipodocumento',
                        'title': 'Tipo Documento',
                        'type': 'item',
                        'icon': 'store',//NOMBRE DEL ICONO
                        'url': '/ventas/tipo/t-documento'// RUTA DEL MODULO por ahora no existe 
                    }
                ]
            },
            {
                'id': 'idmenuProducto',
                'title': 'ALMACEN',
                'type': 'collapse', 
                'icon': 'store',
                'children':[
                    {
                        'id': 'tipoproducto',
                        'title': 'Tipo Producto',
                        'type': 'item',
                        'icon': 'store',//NOMBRE DEL ICONO
                        'url': '/ventas/rproducto/t-produto'// RUTA DEL MODULO por ahora no existe
                    },
                    /*{
                        'id': 'categoria',
                        'title': 'Categoria',
                        'type': 'item',
                        'icon': 'category',
                        'url': '/ventas/rproducto/r-categoria'
                    },*/
                    {
                        'id': 'unidadmedida',
                        'title': 'Unidad Medida',
                        'type': 'item',
                        'icon': 'note_add',
                        'url': '/ventas/rproducto/r-unidadmedida'
                    },
                    {
                        'id': 'producto',
                        'title': 'Registrar Producto',
                        'type': 'item',
                        'icon': 'note_add',
                        'url': '/ventas/rproducto/r-producto'
                    }
                ]
            },
            {
                'id': 'idmenuOrganizacion',
                'title': 'ORGANIZACION',
                'type': 'collapse', 
                'icon': 'domain',
                'children':[
                    {
                        'id': 'organizacion',
                        'title': 'Empresa',
                        'type': 'item',
                        'icon': 'location_city',
                        'url': '/ventas/organizacion/empresa'
                    },
                    {
                        'id': 'sucursal',
                        'title': 'Sucursal',
                        'type': 'item',
                        'icon': 'domain',
                        'url': '/ventas/organizacion/sucursal'
                    }
                ]
            },
            {
                'id': 'admintrarpersonal',
                'title': 'ADMIN PERSONAL',
                'type': 'collapse',
                'icon': 'group',
                'children': [
                    {
                        'id': 'personal',
                        'title': 'PERSONAL',
                        'type': 'item',
                        'icon': 'group_add',
                        'url': '/ventas/personal',
                    }
                ]
            },
            {
                'id': 'idAdminUsuario',
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
                'id': 'idConsultas',
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
                    }
                ]
            },
            {
                'id': 'idReportes',
                'title': 'REPORTES',
                'type': 'collapse',
                'icon': 'picture_as_pdf',
                'children': [
                    {
                        'id': 'reporteproforma',
                        'title': 'REPORTE PROFORMA',
                        'type': 'item',
                        'icon': 'people',
                        'url': '/ventas/reportes'
                    }
                ]
            }
        ];
    }
}
