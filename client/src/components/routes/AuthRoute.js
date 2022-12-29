import React, { useContext } from "react";
import { Route, useNavigate,} from "react-router-dom";
import { UserContext } from "../../context";

const AuthRoute = ({ ...rest }) => {
  const navigate = useNavigate();
  const [state, setState] = useContext(UserContext);

  if (!state) {
    return navigate("/login");
  }

  return state && state.token ? <Route {...rest} /> : "";
};

export default AuthRoute;
{/* <Redirect to="/login" /> */}