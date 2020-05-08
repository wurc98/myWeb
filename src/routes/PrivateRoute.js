import { Route, Redirect } from 'dva/router';

const AuthRouter = (props) => {
    console.log(111)
  const { route } = props;
  const { component:Component } = route;
  return (
    <Route render={ () => {
      console.log(props);
      if(!props.location.pathname.indexOf("/userSpace")){
        return localStorage.info ? <Component { ...props } /> : <Redirect to="/login" />
      }else if(!props.location.pathname.indexOf("/backStage")){
        return localStorage.AdministratorInfo ? <Component { ...props } /> : <Redirect to="/AdministratorLogin" />
      }
      return <Component { ...props } />
    }} />
  )
}

export default AuthRouter;