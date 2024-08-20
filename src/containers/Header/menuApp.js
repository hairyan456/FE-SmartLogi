export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'Quản lí đơn hàng', link: '/system/manage-order'
            },
        ]
    },


];

export const driverMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            { //quản lý đơn hàng của tài xế
                name: 'Quản lí đơn hàng', link: '/driver/manage-driver-order'
            },
        ]
    }
];