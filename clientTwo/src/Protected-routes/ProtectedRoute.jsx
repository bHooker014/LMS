import { Redirect, Route } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  if (localStorage.getItem("token")) {
    return (
      <Route {...rest} render={(props) => <Component {...props} {...rest} />} />
    );
  } else {
    return (
      <Route
        {...rest}
        render={(props) => (
          <Redirect
            to={{
              pathname: "/",
              state: props.location,
            }}
          />
        )}
      />
    );
  }
};

export default ProtectedRoute;
