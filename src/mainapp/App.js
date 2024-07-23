import React, { Suspense, lazy } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./../../store";
import ErrorBoundary from "./ErrorBoundary";
const LandingLazy = lazy(() => import("./components/Layout/Landing/Landing"));
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "./redux_services/actions/types";
import setJWTToken from "./SecurityUtils/setJWTToken";
import { logout } from "./redux_services/actions/login/loginSecurity";
import Progress from "./components/Layout/Progress/Progress";
const jwtToken = sessionStorage.jwtToken;
if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  console.log(decoded_jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken,
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}
const generateClassName = createGenerateClassName({
  productionPrefix: "con",
});

const App = () => {
  React.useEffect(() => {
    // const onbeforeunloadFn = () => {
    //   window.localStorage.clear();
    // }

    return () => {
      // window.addEventListener('beforeunload', onbeforeunloadFn);
    };
  }, []);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <div data-test="appComponent">
        <Provider store={store}>
          <Suspense fallback={<Progress />}>
            <ErrorBoundary>
              <LandingLazy />
            </ErrorBoundary>
          </Suspense>
        </Provider>
      </div>
    </StylesProvider>
  );
};
export default App;
