import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import OrderForm from "./order/OrderForm";
import { Nav } from "./nav";
import "../tailwind.css";
import { FetchProvider } from "./context/fetchContext";

const Routes = () => {
    return (
        <FetchProvider>
                <div className="bg-white">
                    <Nav />
                    <div className="container justify-center mt-20">
                        <BrowserRouter>
                            <Switch>
                                <Route exact path="/" component={OrderForm} />
                            </Switch>
                        </BrowserRouter>
                    </div>
                </div>
        </FetchProvider>
    );
};

export default Routes;

if (document.getElementById("app")) {
    ReactDOM.render(<Routes />, document.getElementById("app"));
}
