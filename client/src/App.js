import React from "react";
import { SocketProvider } from "./context/SocketProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import IOScreen from "./pages/IOScreen";
import { Sidebar } from "./components/Admin/Sidebar";
import { Table } from "./components/Admin/Table";
import LoginPage from "./components/Admin/Login";
import AddUser from "./components/Admin/AddUser";
import PrivateRoute from "./hoc/PrivateRoute";
const Session = () => <Sidebar Child={Table} title="Manange User" />;
const AddPage = () => <Sidebar Child={AddUser} title="Add User" />;

const App = () => {
  return (
    <SocketProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Session} />
          <Route path="/login" exact component={LoginPage} />
          <PrivateRoute path="/session">
            <IOScreen />
          </PrivateRoute>
          <PrivateRoute path="/add">
            <AddPage />
          </PrivateRoute>
        </Switch>
      </Router>
    </SocketProvider>
  );
};

export default App;
