import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound404 from "../pages/not_found_404";

const Router: FC<any> = ({ children, basename }) => {
    return (
        <BrowserRouter basename={basename}>
            <Switch>
                {children}
                <Route component={NotFound404} />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
