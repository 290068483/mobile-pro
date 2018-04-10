import {
  TYPELIST,
  TYPELISTADD,
  TYPELISTCLEAR,
  TYPELISTPAGEINDEX,
  TYPELISTPAGEINDEXUPDATE,
  TYPETOTALCOUNT,
  TYPETOTALCOUNTUPDATE,
  TYPELISTSCROLLTOP,
  TYPELISTSCROLLTOPUPDATE,
  HELPLIST,
  HELPLISTADD,
  HELPLISTCLEAR,
  HELPLISTPAGEINDEX,
  HELPLISTPAGEINDEXUPDATE,
  HELPTOTALCOUNT,
  HELPTOTALCOUNTUPDATE,
  HELPLISTSCROLLTOP,
  HELPLISTSCROLLTOPUPDATE,
  CURRTYPENAME,
  CURRTYPENAMEUPDATE,
  CURRHELPTITLE,
  CURRHELPTITLEUPDATE
} from './constant';

export default function update(state, action) {
  const newState = Object.assign({}, state);
  if (action.type === TYPELISTADD) {
    const list = Array.isArray(action.item) ? action.item : [action.item];
    newState.typeList = [...newState.typeList, ...list];
    console.log('-----', newState.typeList);
  } else if (action.type === TYPELISTCLEAR) {
    newState.typeList = [];
    console.log('-----', newState.typeList);
  } else if (action.type === TYPELIST) {
    newState.typeList = action.typeList;
  } else if (action.type === TYPELISTPAGEINDEXUPDATE) {
    newState.typeListPageIndex = action.index;
    console.log('-----', newState.typeListPageIndex);
  } else if (action.type === TYPELISTPAGEINDEX) {
    newState.typeListPageIndex = action.typeListPageIndex;
  } else if (action.type === TYPETOTALCOUNTUPDATE) {
    newState.typeTotalCount = action.count;
    console.log('-----', newState.typeTotalCount);
  } else if (action.type === TYPETOTALCOUNT) {
    newState.typeTotalCount = action.typeTotalCount;
  } else if (action.type === TYPELISTSCROLLTOPUPDATE) {
    newState.typeListScrollTop = action.scrollTop;
    console.log('-----', newState.typeListScrollTop);
  } else if (action.type === TYPELISTSCROLLTOP) {
    newState.typeListScrollTop = action.typeListScrollTop;
  } else if (action.type === HELPLISTADD) {
    const list = Array.isArray(action.item) ? action.item : [action.item];
    newState.helpList = [...newState.helpList, ...list];
    console.log('-----', newState.helpList);
  } else if (action.type === HELPLISTCLEAR) {
    newState.helpList = [];
    console.log('-----', newState.helpList);
  } else if (action.type === HELPLIST) {
    newState.helpList = action.helpList;
  } else if (action.type === HELPLISTPAGEINDEXUPDATE) {
    newState.helpListPageIndex = action.index;
    console.log('-----', newState.helpListPageIndex);
  } else if (action.type === HELPLISTPAGEINDEX) {
    newState.helpListPageIndex = action.helpListPageIndex;
  } else if (action.type === HELPTOTALCOUNTUPDATE) {
    newState.helpTotalCount = action.count;
    console.log('-----', newState.helpTotalCount);
  } else if (action.type === HELPTOTALCOUNT) {
    newState.helpTotalCount = action.helpTotalCount;
  } else if (action.type === HELPLISTSCROLLTOPUPDATE) {
    newState.helpListScrollTop = action.scrollTop;
    console.log('-----', newState.helpListScrollTop);
  } else if (action.type === HELPLISTSCROLLTOP) {
    newState.helpListScrollTop = action.helpListScrollTop;
  } else if (action.type === CURRTYPENAMEUPDATE) {
    newState.currTypeName = action.name;
    console.log('-----', newState.currTypeName);
  } else if (action.type === CURRTYPENAME) {
    newState.currTypeName = action.currTypeName;
  } else if (action.type === CURRHELPTITLEUPDATE) {
    newState.currHelpTitle = action.title;
    console.log('-----', newState.currHelpTitle);
  } else if (action.type === CURRHELPTITLE) {
    newState.currHelpTitle = action.currHelpTitle;
  }
  return newState;
}
