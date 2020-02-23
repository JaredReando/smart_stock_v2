import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound404 from "../pages/not_found_404";
import AdminPage from "../pages/Admin/admin_page";
import RestockReport from "../pages/Admin/restock_report_page";


const TestHello = () => {
    return <h1>Test Hello</h1>
};

const TestAdminRouter = () => {
    return (
        <BrowserRouter basename="/admin">
            <Switch>
                <Route
                    exact={true}
                    path="/home"
                    component={AdminPage}
                />
                <Route
                    exact={false}
                    path="/settings"
                    component={RestockReport}
                />
                <Route
                    exact={false}
                    path="/hello"
                    component={TestHello}
                />
                <Route component={NotFound404} />
            </Switch>
        </BrowserRouter>
    )
};

export default TestAdminRouter;