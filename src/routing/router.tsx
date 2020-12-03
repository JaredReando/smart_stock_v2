import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound404Page from '../pages/not_found_404_page';

const Router: FC<any> = ({ children, basename }) => {
    return (
        <BrowserRouter basename={basename}>
            <Switch>
                {children}
                <Route component={NotFound404Page} />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
