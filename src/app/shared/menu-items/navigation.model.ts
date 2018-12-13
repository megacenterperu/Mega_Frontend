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
                    {
                        'id': 'persona',
                        'title': 'PERSONA',
                        'type': 'item',
                        'icon': 'email',
                        'url': '/mega/ventas/persona',
                        'badge': {
                            'title': 25,
                            'bg': '#F44336',
                            'fg': '#FFFFFF'
                        }
                    },
                    {
                        'id': 'persona',
                        'title': 'CLIENTE',
                        'type': 'item',
                        'icon': 'group_add',
                        'url': '/mega/ventas/cliente',
                    },
                    {
                        'id': 'venta',
                        'title': 'VENTA',
                        'type': 'item',
                        'icon': 'add_shopping_cart',
                        'url': '/mega/ventas/venta'
                    },
                    {
                        'id': 'proforma',
                        'title': 'PROFORMA',
                        'type': 'item',
                        'icon': 'add_shopping_cart',
                        'url': '/mega/ventas/proforma'
                    }
                ]
            },
            {
                'id': 'persona',//el nombre del grupo o menu donde van estar
                'title': 'COMPRAS',
                'type': 'collapse',
                'children': [
                    {
                        'id': 'proveedor',
                        'title': 'PROVEEDOR',
                        'type': 'item',
                        'icon': 'people',
                        'url': '/mega/ventas/proveedor'
                    },
                    {
                        'id': 'compra',
                        'title': 'COMPRA',
                        'type': 'item',
                        'icon': 'store',//NOMBRE DEL ICONO
                        'url': '/mega/ventas/compra'// RUTA DEL MODULO por ahora no existe
                    }
                ]
            },
            {
                'id': 'idmenuT',//el nombre del grupo o menu donde van estar
                'title': 'TIPOS GENERICOS',
                'type': 'collapse',
                'children':[
                    {
                        'id': 'tipoproducto',
                        'title': 'Tipo Producto',
                        'type': 'item',
                        'icon': 'store',//NOMBRE DEL ICONO
                        'url': '/mega/ventas/tipo/t-produto'// RUTA DEL MODULO por ahora no existe
                    },
                    {
                        'id': 'tipodocumento',
                        'title': 'Tipo Documento',
                        'type': 'item',
                        'icon': 'store',//NOMBRE DEL ICONO
                        'url': '/mega/ventas/tipo/t-documento'// RUTA DEL MODULO por ahora no existe 
                    }
                ]
            },
            {
                'id': 'idmenuProducto',
                'title': 'PRODUCTO',
                'type': 'collapse', 
                'icon': 'laptop',
                'children':[
                    {
                        'id': 'categoria',
                        'title': 'Categoria',
                        'type': 'item',
                        'icon': 'category',
                        'url': '/mega/ventas/rproducto/r-categoria'
                    },
                    {
                        'id': 'unidadmedida',
                        'title': 'Unidad Medida',
                        'type': 'item',
                        'icon': 'note_add',
                        'url': '/mega/ventas/rproducto/r-unidadmedida'
                    },
                    {
                        'id': 'producto',
                        'title': 'Registrar Producto',
                        'type': 'item',
                        'icon': 'note_add',
                        'url': '/mega/ventas/rproducto/r-producto'
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
                        'url': '/mega/ventas/organizacion/empresa'
                    },
                    {
                        'id': 'sucursal',
                        'title': 'Sucursal',
                        'type': 'item',
                        'icon': 'domain',
                        'url': '/mega/ventas/organizacion/sucursal'
                    }
                ]
            },
            {
                'id': 'admintrarpersonal',
                'title': 'ADMINISTRAR PERSONAL',
                'type': 'collapse',
                'icon': 'person',
                'children': [
                    {
                        'id': 'personal',
                        'title': 'PERSONAL',
                        'type': 'item',
                        'icon': 'person_add',
                        'url': '/mega/ventas/personal',
                    }
                ]
            },
            {
                'id': 'reportes',//el nombre del grupo o menu donde van estar
                'title': 'REPORTES',
                'type': 'collapse',
                'children': [
                    {
                        'id': 'reporteproforma',
                        'title': 'REPORTE PROFORMA',
                        'type': 'item',
                        'icon': 'people',
                        'url': '/mega/ventas/reportes'
                    }
                ]
            }
        ];
    }
}
