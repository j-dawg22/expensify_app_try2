import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

export const PublicRouter = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={props =>
      isAuthenticated ? <Redirect to="/dashboard" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRouter);
