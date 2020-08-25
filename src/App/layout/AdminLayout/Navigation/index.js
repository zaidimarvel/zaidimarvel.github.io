import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import windowSize from 'react-window-size';

import * as _ from "lodash";
import Axios from "axios";
import NavLogo from "./NavLogo";
import NavContent from "./NavContent";
import OutsideClick from "./OutsideClick";
import Aux from "./../../../../hoc/_Aux";
import * as actionTypes from "./../../../../store/actions";
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
    let items = {
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
          ],
        },
        {
          id: "ui-element",
          title: "Entities",
          type: "group",
          icon: "icon-ui",
          children: [
            {
              id: "entities",
              title: "Entity Models",
              type: "collapse",
              icon: "fa fa-database",
              children: [],
            },
            {
              id: "manage",
              title: "Manage Entities",
              type: "item",
              url: "/models/entities",
              icon: "fa fa-cog",
            },
          ],
        },
      ],
    };

    let company_id = 1;
    let project_id = 1;

    let that = this;

    Axios.get("http://localhost:5000/get-entities")
      .then((response) => {
        console.log("====================");
        console.log(response.data);
        console.log("====================");

        let entities = response.data;
        if (entities.length > 0) {
          entities.forEach((entity) => {
            items.items[2].children[0].children.push({
              id: entity._id,
              title: entity.title,
              type: "item",
              url: "/models/" + entity._id,
              icon: "fa fa-table",
            });
          });
        }

        Axios.get("http://localhost:5000/get-workflows")
          .then((resp) => {
            let grouped = _.mapValues(
              _.groupBy(resp.data, "collection_name"),
              (clist) => clist.map((car) => _.omit(car, "collection_name"))
            );

            console.log("=======Workflows 22=============");
            console.log(grouped);

            console.log("====================");

            for (var key in grouped) {
              if (grouped.hasOwnProperty(key)) {
                console.log(grouped[key]);
                let collection = {
                  id: key.replace(" ","_"),
                  title: key,
                  type: "collapse",
                  icon: "fa fa-folder-open",
                  // badge: {
                  //     title: 'New',
                  //     type: 'label-danger'
                  // },
                  children: grouped[key].map((wrkf) => {
                      return {
                        id: wrkf._id,
                        title: wrkf.name,
                        type: "item",
                        icon: "fa fa-code-branch",
                        url: "/workflow/"+wrkf._id,
                      }
                  })
                    
                  
                };

                items.items[1].children.push(collection);
              }
            }

            // let collections = resp.data;
            // if(collections.length > 0){

            //         collections.forEach(col => {
            //             let collection = {
            //                 id: col.col_id,
            //                 title: col.collection_name,
            //                 type: "collapse",
            //                 icon: "fa fa-folder-open",
            //                 // badge: {
            //                 //     title: 'New',
            //                 //     type: 'label-danger'
            //                 // },
            //                 children: [
            //                   {
            //                     id: "signup-1",
            //                     title: "pandas_workflow.fly",
            //                     type: "item",
            //                     icon: "fa fa-code-branch",
            //                     url: "/workflow/93232fb5-7fd7-4952-8fff-ec1c051e2997",
            //                 },
            //             ]
            //             }

            //             items.items[1].children.push(collection);
            //         });

            // }

            that.props.onGetNavigatorItems(items);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });

    this.forceUpdate();
  }

  componentWillUnmount() {
    // window.removeEventListener('resize', this.resize)
  }

  render() {
    let navClass = ["pcoded-navbar"];

    if (
      this.props.preLayout !== null &&
      this.props.preLayout !== "" &&
      this.props.preLayout !== "layout-6" &&
      this.props.preLayout !== "layout-8"
    ) {
      navClass = [...navClass, this.props.preLayout];
    } else {
      navClass = [
        ...navClass,
        this.props.layoutType,
        this.props.navBackColor,
        this.props.navBrandColor,
        "drp-icon-" + this.props.navDropdownIcon,
        "menu-item-icon-" + this.props.navListIcon,
        this.props.navActiveListColor,
        this.props.navListTitleColor,
      ];

      if (this.props.layout === "horizontal") {
        navClass = [...navClass, "theme-horizontal"];
      }

      if (this.props.navBackImage) {
        navClass = [...navClass, this.props.navBackImage];
      }

      if (this.props.navIconColor) {
        navClass = [...navClass, "icon-colored"];
      }

      if (!this.props.navFixedLayout) {
        navClass = [...navClass, "menupos-static"];
      }

      if (this.props.navListTitleHide) {
        navClass = [...navClass, "caption-hide"];
      }
    }

    if (this.props.windowWidth < 992 && this.props.collapseMenu) {
      navClass = [...navClass, "mob-open"];
    } else if (this.props.collapseMenu) {
      navClass = [...navClass, "navbar-collapsed"];
    }

    if (this.props.preLayout === "layout-6") {
      document.body.classList.add("layout-6");
      document.body.style.backgroundImage = this.props.layout6Background;
      document.body.style.backgroundSize = this.props.layout6BackSize;
    }

    if (this.props.preLayout === "layout-8") {
      document.body.classList.add("layout-8");
    }

    if (this.props.layoutType === "dark") {
      document.body.classList.add("datta-dark");
    } else {
      document.body.classList.remove("datta-dark");
    }

    if (this.props.rtlLayout) {
      document.body.classList.add("datta-rtl");
    } else {
      document.body.classList.remove("datta-rtl");
    }

    if (this.props.boxLayout) {
      document.body.classList.add("container");
      document.body.classList.add("box-layout");
    } else {
      document.body.classList.remove("container");
      document.body.classList.remove("box-layout");
    }

    let navContent = (
      <div className="navbar-wrapper">
        <NavLogo
          collapseMenu={this.props.collapseMenu}
          windowWidth={this.props.windowWidth}
          onToggleNavigation={this.props.onToggleNavigation}
        />
      </div>
    );
    console.log("NAV RIGHT");
    console.log(this.props.menuitems);
    if (this.props.menuitems !== null) {
      navContent = (
        <div className="navbar-wrapper">
          <NavLogo
            collapseMenu={this.props.collapseMenu}
            windowWidth={this.props.windowWidth}
            onToggleNavigation={this.props.onToggleNavigation}
          />
          <NavContent navigation={this.props.menuitems.items} />
        </div>
      );
      if (this.props.windowWidth < 992) {
        navContent = (
          <OutsideClick>
            <div className="navbar-wrapper">
              <NavLogo
                collapseMenu={this.props.collapseMenu}
                windowWidth={this.props.windowWidth}
                onToggleNavigation={this.props.onToggleNavigation}
              />
              <NavContent navigation={this.props.menuitems.items} />
            </div>
          </OutsideClick>
        );
      }
    }

    return (
      <Aux>
        <nav className={navClass.join(" ")}>{navContent}</nav>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
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
    menuitems: state.menuitems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleNavigation: () => dispatch({ type: actionTypes.COLLAPSE_MENU }),
    onChangeLayout: (layout) =>
      dispatch({ type: actionTypes.CHANGE_LAYOUT, layout: layout }),
    onGetNavigatorItems: (items) =>
      dispatch({ type: actionTypes.GET_MENU_ITEMS, items: items }),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Navigation)
);
