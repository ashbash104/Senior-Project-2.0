import { Refine, Authenticated } from "@refinedev/core";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import {
  ThemedLayoutV2,
  ErrorComponent,
  RefineThemes,
  useNotificationProvider,
} from "@refinedev/antd";
import { App as AntdApp, ConfigProvider } from "antd";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";
import "@refinedev/antd/dist/reset.css";

import { createDataProvider } from "./providers/data";
import { authProvider } from "./providers/auth";

import { CustomerList } from "./pages/customers/list";
import { CustomerCreate } from "./pages/customers/create";
import { CustomerEdit } from "./pages/customers/edit";
import { CustomerShow } from "./pages/customers/show";
import { Dashboard } from "./pages/dashboard/dashboard";
import { TaskList } from "./pages/tasks/list";
import { TaskCreate } from "./pages/tasks/create";
import { TaskEdit } from "./pages/tasks/edit";
import { Signup } from "./pages/register/signup";
import { Login } from "./pages/login/login";
import { CustomLayout } from "components/CustomLayout";


const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <Refine
            routerProvider={routerProvider}
            dataProvider={createDataProvider()}
            authProvider={authProvider}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "dashboard",
                list: "/dashboard",
                create: "/dashboard/create",
              },
              {
                name: "customers",
                list: "/customers",
                create: "/customers/create",
                edit: "/customers/:id/edit",
                show: "/customers/:id",
              },
              {
                name: "tasks",
                list: "/tasks",
                create: "/tasks/create",
                edit: "/tasks/:id/edit",
                show: "/tasks/:id",
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected routes */}
              <Route
                element={
                <Authenticated
                  key="auth-wrapper"
                  fallback={<Navigate to="/login" replace />}
                  v3LegacyAuthProviderCompatible={true}
                >
                <CustomLayout />
                </Authenticated>
                }
              >
                {/* Redirect root to dashboard */}
                <Route path="/" element={<NavigateToResource resource="dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/customers">
                  <Route index element={<CustomerList />} />
                  <Route path="create" element={<CustomerCreate />} />
                  <Route path=":id/edit" element={<CustomerEdit />} />
                  <Route path=":id" element={<CustomerShow />} />
                </Route>
                <Route path="/tasks">
                  <Route index element={<TaskList />} />
                  <Route path="create" element={<TaskCreate />} />
                  <Route path=":id/edit" element={<TaskEdit />} />
                </Route>
              </Route>

              {/* Catch all for unknown routes */}
              <Route path="*" element={<ErrorComponent />} />
            </Routes>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
