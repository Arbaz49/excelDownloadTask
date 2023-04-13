import Login from "../components/Login";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import Test from "../components/TestTable";
import TestingTable from "../components/Testing";

const routes = [
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        {/* <Table /> */}
        {/* <Test/> */}
        <TestingTable/>
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
