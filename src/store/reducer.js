import * as actionTypes from "./actions";
import config from "./../config";

const initialState = {
  isOpen: [], //for active default menu
  isTrigger: [], //for active default menu, set blank for horizontal
  ...config,
  isFullScreen: false, // static can't change
  workflow: {},
  nodes: [],
  display_results: [],
  connections: [],
  selected_node: null,
  isFetchingWorkflow: false,
  workflow_id: 'test'
};

const reducer = (state = initialState, action) => {
  let trigger = [];
  let open = [];

  switch (action.type) {
    case actionTypes.COLLAPSE_MENU:
      return {
        ...state,
        collapseMenu: !state.collapseMenu,
      };
    case actionTypes.COLLAPSE_TOGGLE:
      if (action.menu.type === "sub") {
        open = state.isOpen;
        trigger = state.isTrigger;

        const triggerIndex = trigger.indexOf(action.menu.id);
        if (triggerIndex > -1) {
          open = open.filter((item) => item !== action.menu.id);
          trigger = trigger.filter((item) => item !== action.menu.id);
        }

        if (triggerIndex === -1) {
          open = [...open, action.menu.id];
          trigger = [...trigger, action.menu.id];
        }
      } else {
        open = state.isOpen;
        const triggerIndex = state.isTrigger.indexOf(action.menu.id);
        trigger = triggerIndex === -1 ? [action.menu.id] : [];
        open = triggerIndex === -1 ? [action.menu.id] : [];
      }

      return {
        ...state,
        isOpen: open,
        isTrigger: trigger,
      };
    case actionTypes.NAV_CONTENT_LEAVE:
      return {
        ...state,
        isOpen: open,
        isTrigger: trigger,
      };
    case actionTypes.NAV_COLLAPSE_LEAVE:
      if (action.menu.type === "sub") {
        open = state.isOpen;
        trigger = state.isTrigger;

        const triggerIndex = trigger.indexOf(action.menu.id);
        if (triggerIndex > -1) {
          open = open.filter((item) => item !== action.menu.id);
          trigger = trigger.filter((item) => item !== action.menu.id);
        }
        return {
          ...state,
          isOpen: open,
          isTrigger: trigger,
        };
      }
      return { ...state };
    case actionTypes.FULL_SCREEN:
      return {
        ...state,
        isFullScreen: !state.isFullScreen,
      };
    case actionTypes.FULL_SCREEN_EXIT:
      return {
        ...state,
        isFullScreen: false,
      };
    case actionTypes.CHANGE_LAYOUT:
      return {
        ...state,
        layout: action.layout,
      };
    case actionTypes.SAVE_NODE:
    //   console.log("Saving Node");
      return {
        ...state,
        nodes: [...state.nodes, action.node],
      };
      case actionTypes.SAVE_WORKFLOW:
    //   console.log("Saving Workflow");
      return {
        ...state,
        workflow_id: action.id,
      };

    case actionTypes.CHANGE_RESULTS:
    //   console.log("Saving Results");
      return {
        ...state,
        display_results: action.results,
      };

    case actionTypes.CHANGE_SELECTED:
    //   console.log("Saving Results");
      return {
        ...state,
        selected_node: action.selected_node,
      };

    case actionTypes.ADD_NODES:
    //   console.log("Saving Results");
      return {
        ...state,
        nodes: action.nodes,
      };
    case actionTypes.ADD_LINKS:
    //   console.log("Saving Results");
      return {
        ...state,
        connections: action.links,
      };
    default:
      return state;
  }
};

export default reducer;
