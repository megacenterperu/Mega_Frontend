export class NavigationModel {
    public model: any[];

    constructor() {
        this.model = [
            {
                'id': 'ventas',
                'title': 'VENTAS',
                'type': 'group',
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
                        'id': 'sample2',
                        'title': 'SAMPLE 2',
                        'type': 'item',
                        'icon': 'email',
                        'url': '/sample2'
                    }
                ]
            },
            {
                'id': 'persona',//el nombre del grupo o menu donde van estar
                'title': 'COMPRAS',
                'type': 'group',
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
                'id': 'idmenuProducto',//el nombre del grupo o menu donde van estar
                'title': 'PRODUCTO',
                'type': 'collapse', 
                'icon': 'laptop',
                'children':[
                    {
                        'id': 'categoria',
                        'title': 'Categoria',
                        'type': 'item',
                        'icon': 'category',//NOMBRE DEL ICONO
                        'url': '/mega/ventas/rproducto/r-categoria'// RUTA DEL MODULO por ahora no existe
                    },
                    {
                        'id': 'unidadmedida',
                        'title': 'Unidad Medida',
                        'type': 'item',
                        'icon': 'note_add',//NOMBRE DEL ICONO
                        'url': '/mega/ventas/rproducto/r-unidadmedida'// RUTA DEL MODULO por ahora no existe
                    },
                    {
                        'id': 'producto',
                        'title': 'Registrar Producto',
                        'type': 'item',
                        'icon': 'note_add',//NOMBRE DEL ICONO
                        'url': '/mega/ventas/rproducto/r-producto'// RUTA DEL MODULO por ahora no existe
                    }
                ]
            }
        ];
    }
}
