import axios from "axios";

import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import SideBar from "./components/Sidebar";

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
    <div className="container-fluid">
      <Header />
      <div className="row">
        <div class="col-sm-2">
          <SideBar />
        </div>
        <div class="col-sm-10">Hello World.</div>
      </div>
    </div>
  );
}

export default App;
