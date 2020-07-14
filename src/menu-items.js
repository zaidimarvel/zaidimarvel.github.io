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
          title: "Dashboard",
          type: "item",
          url: "/dashboard/default",
          icon: "fa fa-home",
        },
      ],
    },
    {
      id: "pages",
      title: "Collections",
      type: "group",
      icon: "fa fa-folder-open",
      children: [
        {
          id: "workflows",
          title: "PANDA",
          type: "collapse",
          icon: "fa fa-folder-open",
          // badge: {
          //     title: 'New',
          //     type: 'label-danger'
          // },
          children: [
            {
              id: "signup-1",
              title: "pandas_workflow.fly",
              type: "item",
              icon: "fa fa-code-branch",
              url: "/workflow/93232fb5-7fd7-4952-8fff-ec1c051e2997",
            },
            {
              id: "signin-1",
              title: "login_workflow.fly",
              type: "item",
              icon: "fa fa-code-branch",
              url: "/workflow/f4efd382-f164-43fc-9875-5406283f8ea8",
            },
          ],
        },
        {
          id: "pos",
          title: "ZAIDI POS Products",
          type: "collapse",
          icon: "fa fa-folder-open",
          // badge: {
          //     title: 'New',
          //     type: 'label-danger'
          // },
          children: [
            {
              id: "signup-1",
              title: "Sign up",
              type: "item",
              url: "/auth/signup-1",
              target: true,
              icon: "fa fa-code-branch",
              breadcrumbs: false,
            },
            {
              id: "signin-1",
              title: "Sign in",
              type: "item",
              url: "/auth/signin-1",
              icon: "fa fa-code-branch",
              target: true,
              breadcrumbs: false,
            },
          ],
        },
      ],
    },
    {
        id: 'ui-element',
        title: 'MODELS',
        type: 'group',
        icon: 'icon-ui',
        children: [
            {
                id: 'basic',
                title: 'Component',
                type: 'collapse',
                icon: 'fa fa-box',
                children: [
                    {
                        id: 'button',
                        title: 'Button',
                        type: 'item',
                        url: '/basic/button'
                    },
                    {
                        id: 'badges',
                        title: 'Badges',
                        type: 'item',
                        url: '/basic/badges'
                    },
                    {
                        id: 'breadcrumb-pagination',
                        title: 'Breadcrumb & Pagination',
                        type: 'item',
                        url: '/basic/breadcrumb-paging'
                    },
                    {
                        id: 'collapse',
                        title: 'Collapse',
                        type: 'item',
                        url: '/basic/collapse'
                    },
                    {
                        id: 'tabs-pills',
                        title: 'Tabs & Pills',
                        type: 'item',
                        url: '/basic/tabs-pills'
                    },
                    {
                        id: 'typography',
                        title: 'Typography',
                        type: 'item',
                        url: '/basic/typography'
                    }
                ]
            }
        ]
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
