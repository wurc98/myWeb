// import { Route, Redirect } from 'dva';

// const AuthRouter = (props) => {
//     console.log(111)
//   const { route } = props;
//   const { component:Component } = route;
//   return (
//     //true ? <Route {...route} /> : <Redirect to="/login" />
//     //这个也可以，跟下边的二选一，否则会报错 

//     <Route render={ props => {
//       console.log(props);
//       return false ? <Component { ...props } /> : <Redirect to="/login" />
//     }} />
//   )
// }

// export default AuthRouter;