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
            }
        ];
    }
}
