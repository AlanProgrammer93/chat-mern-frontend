import React, { useContext, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { AuthContext } from '../auth/AuthContext';

import { ChatPage } from '../pages/ChatPage';
import { AuthRouter } from './AuthRouter';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

    const { auth, verificaToken } = useContext(AuthContext);

    useEffect(() => {
        verificaToken();
    }, [verificaToken])

    if ( auth.checking ) {
        return <h1>Espere...</h1>
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute isAuthenticated={ auth.logged } path="/auth" component={ AuthRouter } />
                    <PrivateRoute isAuthenticated={ auth.logged } exact path="/" component={ ChatPage } />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
