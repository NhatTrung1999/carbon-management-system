import { Navigate, Route, Routes } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import PurchasedGoodsService from "../pages/Category/PurchasedGoodsService";
import UpstreamTransportationAndDistribution from "../pages/Category/UpstreamTransportationAndDistribution";
import WasteGeneratedInOperations from "../pages/Category/WasteGeneratedInOperations";
import BusinessTravel from "../pages/Category/BusinessTravel";
import EmployeeCommuting from "../pages/Category/EmployeeCommuting";
import DownstreamTransportationAndDistribution from "../pages/Category/DownstreamTransportationAndDistribution";
import EndOfLifeTreatmentOfSoldProducts from "../pages/Category/EndOfLifeTreatmentOfSoldProducts";
import UserManagement from "../pages/SystemSettings/UserManagement";
import FileManagement from "../pages/SystemSettings/FileManagement";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route index path="/" element={<Home />} />
      <Route path="/dashboard" element={<MainLayout />}>
        <Route
          index
          element={
            <Navigate to={"/dashboard/purchased-goods-service"} replace />
          }
        />
        <Route
          path="/dashboard/purchased-goods-service"
          element={<PurchasedGoodsService />}
        />
        <Route
          path="/dashboard/upstream-transportation-and-distribution"
          element={<UpstreamTransportationAndDistribution />}
        />
        <Route
          path="/dashboard/waste-generated-in-operations"
          element={<WasteGeneratedInOperations />}
        />
        <Route path="/dashboard/business-travel" element={<BusinessTravel />} />
        <Route
          path="/dashboard/employee-commuting"
          element={<EmployeeCommuting />}
        />
        <Route
          path="/dashboard/downstream-transportation-and-distribution"
          element={<DownstreamTransportationAndDistribution />}
        />
        <Route
          path="/dashboard/end‑of‑life-treatment-of-sold-products"
          element={<EndOfLifeTreatmentOfSoldProducts />}
        />
        <Route path="/dashboard/user-management" element={<UserManagement />} />
        <Route path="/dashboard/file-management" element={<FileManagement />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
