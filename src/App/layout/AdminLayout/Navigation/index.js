import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
// import windowSize from 'react-window-size';

import NavLogo from './NavLogo';
import NavContent from './NavContent';
import OutsideClick from './OutsideClick';
import Aux from './../../../../hoc/_Aux'
import * as actionTypes from './../../../../store/actions';
// import navigation from '../../../../menu-items';

class Navigation extends Component {

    // resize = () => {
    //     const contentWidth = document.getElementById('root').clientWidth;

    //     if (this.props.layout === 'horizontal' && contentWidth < 992) {
    //         this.props.onChangeLayout('vertical');
    //     }
    // };

    componentWillMount() {
        // this.resize();
        // window.addEventListener('resize', this.resize)
           // TODO
        //Fetch menu items - Collections and models
        let items =  {
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
                  title: 'Content Types',
                  type: 'group',
                  icon: 'icon-ui',
                  children: [
                    {
                      id: "user",
                      title: "Users",
                      type: "item",
                      url: "/models/user",
                      icon: "fa fa-user",
                    },
                    {
                        id: "customer",
                        title: "Customer",
                        type: "item",
                        url: "/models/customer",
                        icon: "fa fa-user",
                      },
                  ]
              },
            
            ],
          };

          console.log("AM HERE YAAL");
          
          this.props.onGetNavigatorItems(items);

          this.forceUpdate()

    }

    componentWillUnmount() {
        // window.removeEventListener('resize', this.resize)
    }

    render() {
        let navClass = [
            'pcoded-navbar',
        ];

        if (this.props.preLayout !== null && this.props.preLayout !== '' && this.props.preLayout !== 'layout-6' && this.props.preLayout !== 'layout-8') {
            navClass = [...navClass, this.props.preLayout];
        } else {
            navClass = [
                ...navClass,
                this.props.layoutType,
                this.props.navBackColor,
                this.props.navBrandColor,
                'drp-icon-'+this.props.navDropdownIcon,
                'menu-item-icon-'+this.props.navListIcon,
                this.props.navActiveListColor,
                this.props.navListTitleColor,
            ];

            if (this.props.layout === 'horizontal') {
                navClass = [...navClass, 'theme-horizontal'];
            }

            if (this.props.navBackImage) {
                navClass = [...navClass, this.props.navBackImage];
            }

            if (this.props.navIconColor) {
                navClass = [...navClass, 'icon-colored'];
            }

            if (!this.props.navFixedLayout) {
                navClass = [...navClass, 'menupos-static'];
            }

            if (this.props.navListTitleHide) {
                navClass = [...navClass, 'caption-hide'];
            }
        }

        if (this.props.windowWidth < 992 && this.props.collapseMenu) {
            navClass = [...navClass, 'mob-open'];
        } else if (this.props.collapseMenu) {
            navClass = [...navClass, 'navbar-collapsed'];
        }

        if (this.props.preLayout === 'layout-6') {
            document.body.classList.add('layout-6');
            document.body.style.backgroundImage = this.props.layout6Background;
            document.body.style.backgroundSize = this.props.layout6BackSize;
        }

        if (this.props.preLayout === 'layout-8') {
            document.body.classList.add('layout-8');
        }

        if (this.props.layoutType === 'dark') {
            document.body.classList.add('datta-dark');
        } else {
            document.body.classList.remove('datta-dark');
        }

        if (this.props.rtlLayout) {
            document.body.classList.add('datta-rtl');
        } else {
            document.body.classList.remove('datta-rtl');
        }

        if (this.props.boxLayout) {
            document.body.classList.add('container');
            document.body.classList.add('box-layout');
        } else {
            document.body.classList.remove('container');
            document.body.classList.remove('box-layout');
        }

        let navContent = (
            <div className="navbar-wrapper">
                <NavLogo collapseMenu={this.props.collapseMenu} windowWidth={this.props.windowWidth} onToggleNavigation={this.props.onToggleNavigation} />
            </div>
        );
        console.log("NAV RIGHT");
        console.log(this.props.menuitems );
        if (this.props.menuitems !== null){

            navContent = (
                <div className="navbar-wrapper">
                    <NavLogo collapseMenu={this.props.collapseMenu} windowWidth={this.props.windowWidth} onToggleNavigation={this.props.onToggleNavigation} />
                    <NavContent navigation={this.props.menuitems.items} />
                </div>
            );
            if (this.props.windowWidth < 992) {
                navContent = (
                    <OutsideClick>
                        <div className="navbar-wrapper">
                            <NavLogo collapseMenu={this.props.collapseMenu} windowWidth={this.props.windowWidth} onToggleNavigation={this.props.onToggleNavigation} />
                            <NavContent navigation={this.props.menuitems.items} />
                        </div>
                    </OutsideClick>
                );
            }
        }
       

        return (
            <Aux>
                <nav className={navClass.join(' ')}>
                    {navContent}
                </nav>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        layout: state.layout,
        preLayout: state.preLayout,
        collapseMenu: state.collapseMenu,
        layoutType: state.layoutType,
        navBackColor: state.navBackColor,
        navBackImage: state.navBackImage,
        navIconColor: state.navIconColor,
        navBrandColor: state.navBrandColor,
        layout6Background: state.layout6Background,
        layout6BackSize: state.layout6BackSize,
        rtlLayout: state.rtlLayout,
        navFixedLayout: state.navFixedLayout,
        boxLayout: state.boxLayout,
        navDropdownIcon: state.navDropdownIcon,
        navListIcon: state.navListIcon,
        navActiveListColor: state.navActiveListColor,
        navListTitleColor: state.navListTitleColor,
        navListTitleHide: state.navListTitleHide,
        menuitems: state.menuitems
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleNavigation: () => dispatch({type: actionTypes.COLLAPSE_MENU}),
        onChangeLayout: (layout) => dispatch({type: actionTypes.CHANGE_LAYOUT, layout: layout}),
        onGetNavigatorItems: (items) => dispatch({type: actionTypes.GET_MENU_ITEMS, items: items})
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));
