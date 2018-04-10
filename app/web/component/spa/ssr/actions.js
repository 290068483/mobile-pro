import {
  TYPELISTADD,
  TYPELISTCLEAR,
  TYPELISTPAGEINDEXUPDATE,
  TYPETOTALCOUNTUPDATE,
  TYPELISTSCROLLTOPUPDATE,
  HELPLISTADD,
  HELPLISTCLEAR,
  HELPLISTPAGEINDEXUPDATE,
  HELPTOTALCOUNTUPDATE,
  HELPLISTSCROLLTOPUPDATE,
  CURRTYPENAMEUPDATE,
  CURRHELPTITLEUPDATE
} from './constant';

export const typeListAdd = item => {
  console.log('typeList', item);
  return {
    type: TYPELISTADD,
    item
  };
};

export const typeListClear = () => {
  return {
    type: TYPELISTCLEAR
  };
};

export const typeListPageIndexUpdate = index => {
  console.log('typeListPageIndex', index);
  return {
    type: TYPELISTPAGEINDEXUPDATE,
    index
  };
};

export const typeTotalCountUpdate = count => {
  console.log('typeTotalCount', count);
  return {
    type: TYPETOTALCOUNTUPDATE,
    count
  };
};

export const typeListScrollTopUpdate = scrollTop => {
  console.log('typeListScrollTop', scrollTop);
  return {
    type: TYPELISTSCROLLTOPUPDATE,
    scrollTop
  };
};

export const helpListAdd = item => {
  console.log('helpList', item);
  return {
    type: HELPLISTADD,
    item
  };
};

export const helpListClear = () => {
  return {
    type: HELPLISTCLEAR
  };
};

export const helpListPageIndexUpdate = index => {
  console.log('helpListPageIndex', index);
  return {
    type: HELPLISTPAGEINDEXUPDATE,
    index
  };
};

export const helpTotalCountUpdate = count => {
  console.log('helpTotalCount', count);
  return {
    type: HELPTOTALCOUNTUPDATE,
    count
  };
};

export const helpListScrollTopUpdate = scrollTop => {
  console.log('helpListScrollTop', scrollTop);
  return {
    type: HELPLISTSCROLLTOPUPDATE,
    scrollTop
  };
};

export const currTypeNameUpdate = name => {
  console.log('typeName', name);
  return {
    type: CURRTYPENAMEUPDATE,
    name
  };
};

export const currHelpTitleUpdate = title => {
  console.log('helpTitle', title);
  return {
    type: CURRHELPTITLEUPDATE,
    title
  };
};
