import Login from "../components/Login";
import Navbar from "../components/Navbar";
import Table from "../components/Table";


const routes = [
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        {/* <Table /> */}
        {/* <Test/> */}
        <Table/>
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
];

export default routes;
