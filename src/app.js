import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import "react-dates/lib/css/_datepicker.css";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

import AppRouter, { history } from "./router/AppRouter";
import { store } from "./store/configureStore";
import { startSetExpenses } from "./actions/expenses";
import { firebase } from "./firebase/firebase";
import { login, logout } from "./actions/auth";

const JSX = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(JSX, document.getElementById("app"));
    hasRendered = true;
  }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById("app"));

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === "/") {
        history.push("/dashboard");
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});
