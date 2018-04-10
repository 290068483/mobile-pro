import Home from 'component/spa/ssr/components/home';
import Help from 'component/spa/ssr/components/help';
import Detail from 'component/spa/ssr/components/detail';
const NotFound = () => {
  return (
    <Route render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = 404;
      }
      return (
        <div>
          <h1>404 : Not Found</h1>
        </div>
      );
    }}/>
  );
};
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/help',
    component: Help
  },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '*',
    component: NotFound
  }
];

export default routes;
