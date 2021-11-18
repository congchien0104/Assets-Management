import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import SideBar from "./components/Sidebar";
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Assets from './pages/ManageAssets/Assets';
import Users from './pages/ManageUsers/Users';

axios.interceptors.request.use((config) => {
  return config;
});
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (401 === error.response.status) {
      window.location.href =
        "/Identity/Account/Login?returnUrl=" + window.location.pathname;
    } else {
      return Promise.reject(error);
    }
  }
);

axios.get("/api/users").then((response) => console.table(response.data));

function App() {
  return (
    <div className="container-fluid" style={{ padding: 0 }}>
      <Header />
      <div className="row">
        <div class="col-sm-2" style={{ padding: '0 30px' }}>
          <SideBar />
        </div>
        <div class="col-sm-10">
          <Switch>
            <Route exact path='/' component={() => <Home />} />
            <Route exact path='/assets' component={() => <Assets />} />
            <Route exact path='/users' component={() => <Users />} />
            <Route path='*' component={() => <div>404 Not Found!</div>}/>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
