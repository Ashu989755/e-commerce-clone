import React from "react";
import Navigation from "./Routes/Navigation";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import  { store,persister } from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import Tracking_Layout from "./components/Tracking_Layout";



const App = () => {
// const { store, persister } = createStore();
  
 return (
    <Provider store={store}>
    
      <PersistGate loading={<div>Loading...</div>} persistor={persister}>
        <>
        <Tracking_Layout>
          <Helmet>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="true"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
              rel="stylesheet"
            />
           
          </Helmet>
          {/* <Dropdown_lang /> */}
          <Navigation />
          <ToastContainer />
          </Tracking_Layout>
        </>
      </PersistGate>
    </Provider>
  );
};

export default App;
