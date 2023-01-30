import React, { Fragment, useContext } from 'react';
import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom';


import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Users from '../pages/Users';

import { Context } from '../Context/AuthContext';



function CustomRoute({ isPrivate, ...rest }) {
  const { loading, authenticated } = useContext(Context);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isPrivate && !authenticated) {
    return redirect("/login")
  }

  return <Route {...rest} />;
}

const RoutesApp = () => {
  return (
    <BrowserRouter>
        <Fragment>
            <Routes>
                <CustomRoute exact path="/login" component={Signin}/>
                <CustomRoute path="/" element={<Signin />} />
                <CustomRoute exact path="/signup" element={<Signup />} />
                <CustomRoute path="*" element={<Signin />} />
                <CustomRoute path="/users" element={<Users />} />
            </Routes>
        </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;