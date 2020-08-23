export default {
  items: [
    {
      id: "navigation",
      title: "Home",
      type: "group",
      icon: "fa fa-home",
      children: [
        {
          id: "dashboard",
          title: "Recent",
          type: "item",
          url: "/dashboard/default",
          icon: "fa fa-history",
        },
      ],
    },
    {
      id: "pages",
      title: "Collections",
      type: "group",
      icon: "fa fa-folder-open",
      
    },
    {
        id: 'ui-element',
        title: 'Content Types',
        type: 'group',
        icon: 'icon-ui',
       
    },
    // {
    //     id: 'ui-forms',
    //     title: 'Forms & Tables',
    //     type: 'group',
    //     icon: 'icon-group',
    //     children: [
    //         {
    //             id: 'form-basic',
    //             title: 'Form Elements',
    //             type: 'item',
    //             url: '/forms/form-basic',
    //             icon: 'fa fa-file'
    //         },
    //         {
    //             id: 'bootstrap',
    //             title: 'Table',
    //             type: 'item',
    //             icon: 'feather icon-server',
    //             url: '/tables/bootstrap'
    //         }
    //     ]
    // },
    // {
    //     id: 'chart-maps',
    //     title: 'Chart & Maps',
    //     type: 'group',
    //     icon: 'fa fa-charts',
    //     children: [
    //         {
    //             id: 'charts',
    //             title: 'Charts',
    //             type: 'item',
    //             icon: 'feather icon-pie-chart',
    //             url: '/charts/nvd3'
    //         },
    //         {
    //             id: 'maps',
    //             title: 'Map',
    //             type: 'item',
    //             icon: 'feather icon-map',
    //             url: '/maps/google-map'
    //         }
    //     ]
    // },
    // {
    //     id: 'pages',
    //     title: 'Pages',
    //     type: 'group',
    //     icon: 'fa fa-pages',
    //     children: [
    //         {
    //             id: 'auth',
    //             title: 'Authentication',
    //             type: 'collapse',
    //             icon: 'fa fa-lock',
    //             badge: {
    //                 title: 'New',
    //                 type: 'label-danger'
    //             },
    //             children: [
    //                 {
    //                     id: 'signup-1',
    //                     title: 'Sign up',
    //                     type: 'item',
    //                     url: '/auth/signup-1',
    //                     target: true,
    //                     breadcrumbs: false
    //                 },
    //                 {
    //                     id: 'signin-1',
    //                     title: 'Sign in',
    //                     type: 'item',
    //                     url: '/auth/signin-1',
    //                     target: true,
    //                     breadcrumbs: false
    //                 }
    //             ]
    //         },

    //         {
    //             id: 'docs',
    //             title: 'Documentation',
    //             type: 'item',
    //             url: '/docs',
    //             classes: 'nav-item',
    //             icon: 'fa fa-help'
    //         },
    //         {
    //             id: 'menu-level',
    //             title: 'Menu Levels',
    //             type: 'collapse',
    //             icon: 'fa fa-menu',
    //             children: [
    //                 {
    //                     id: 'menu-level-1.1',
    //                     title: 'Menu Level 1.1',
    //                     type: 'item',
    //                     url: '#!',
    //                 },
    //                 {
    //                     id: 'menu-level-1.2',
    //                     title: 'Menu Level 2.2',
    //                     type: 'collapse',
    //                     url: '#!',
    //                 }
    //             ]
    //         },
    //         {
    //             id: 'disabled-menu',
    //             title: 'Disabled Menu',
    //             type: 'item',
    //             url: '#',
    //             classes: 'nav-item disabled',
    //             icon: 'fa fa-power'
    //         },
    //         /*{
    //             id: 'buy-now',
    //             title: 'Buy Now',
    //             type: 'item',
    //             icon: 'feather icon-user',
    //             classes: 'nav-item',
    //             url: 'https://codedthemes.com',
    //             target: true,
    //             external: true,
    //             badge: {
    //                 title: 'v1.0',
    //                 type: 'label-primary'
    //             }
    //         }*/
    //     ]
    // }
  ],
};
