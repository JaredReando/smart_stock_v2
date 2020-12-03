import React from 'react';
import { Route } from 'react-router';
import Router from './router';

const buildRouter = (basename: string, routes: { [key: string]: (...args: any[]) => any }) => {
    let routeComponents = [];
    for (let route in routes) {
        const baseRoute = route === '/';
        const isRouter = route.endsWith('/*');
        const path = route.replace('/*', '');
        const routeComponent = (
            <Route
                key={route}
                exact={baseRoute || !isRouter}
                path={path}
                component={routes[route]}
            />
        );
        routeComponents.push(routeComponent);
    }

    return <Router basename={basename}>{routeComponents}</Router>;
};

export default buildRouter;
