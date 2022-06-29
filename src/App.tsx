import React, { Suspense } from "react";
import "./App.css";
import Layout from "./layout";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
  // Redirect,
} from "react-router-dom";
import { Consumer } from "./contexts/Provider";
class App extends React.Component {
  ProductListingPage = React.lazy(() => import("./pages/ProductListingPage"));
  ProductDescriptionPage = React.lazy(
    () => import("./pages/ProductDescriptionPage")
  );
  CartPage = React.lazy(() => import("./pages/CartPage"));
  render() {
    return (
      <Suspense fallback={<>Wait</>}>
        <Consumer>
          {(provider) => (
            <Router>
              <Layout>
                {/* <ProductListingPage /> */}
                {/* <ProductDescriptionPage /> */}
                {/* <CartPage /> */}
                {/* <Cart /> */}
                <Routes>
                  <Route path="/" element={<Navigate to={"/all"} replace />} />
                  <Route
                    path="/:category"
                    element={<this.ProductListingPage />}
                  />
                  <Route
                    path="/product/:id"
                    element={<this.ProductDescriptionPage />}
                  />
                  <Route path="/cart" element={<this.CartPage />} />
                  {/* <Redirect to="/all" /> */}
                </Routes>
              </Layout>
            </Router>
          )}
        </Consumer>
      </Suspense>
    );
  }
}

export default App;
