import { useState } from "react";
import {
  Layout,
  Typography,
  Button,
  Avatar,
  Drawer,
  Form,
  Input,
  Space,
  Menu,
} from "antd";
import {
  UserOutlined,
  HomeOutlined,
  TeamOutlined,
  LogoutOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const demoUser = {
  id: "1",
  name: "Michael Scott",
  email: "demo@refine.dev",
  phone: "123-456-7890",
  jobTitle: "Regional Manager",
  timezone: "America/New_York",
  avatarUrl: "https://example.com/avatar.jpg",
};

export const CustomLayout: React.FC = () => {
  const [user, setUser] = useState(demoUser);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const location = useLocation();

  const openDrawer = () => {
    form.setFieldsValue(user);
    setDrawerVisible(true);
  };

  const onSaveUser = () => {
    form.validateFields()
      .then(values => {
        setUser(prev => ({ ...prev, ...values }));
        setDrawerVisible(false);
      })
      .catch(console.log);
  };

  const handleLogout = () => {
    // Add logout logic here (e.g., clearing tokens)
    navigate("/login");
  };

  const menuItems = [
    {
      key: "/dashboard",
      icon: <HomeOutlined />,
      label: "Dashboard",
    },
    {
      key: "/customers",
      icon: <TeamOutlined />,
      label: "Customers",
    },
    {
      key: "/tasks",
      icon: <FolderOpenOutlined />,
      label: "Tasks",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div
        style={{
            height: 64,
            margin: 16,
            background: "radial-gradient(circle, rgba(200,220,255,0.2) 0%, rgba(180,200,240,0.1) 50%, rgba(150,170,220,0.05) 80%, transparent 100%)",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 18,
            color: "white",
            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
        }}
        >
        {!collapsed ? "OffTrack" : "O"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => {
            if (key === "logout") {
              handleLogout();
            } else {
              navigate(key);
            }
          }}
          items={menuItems}
        />
      </Sider>

      <Layout>


        {/* Content */}
        <Content style={{ padding: 32, background: "#f5f5f5" }}>
          <Outlet />
        </Content>
      </Layout>

      {/* Profile Drawer */}
      <Drawer
        title="Your Profile"
        placement="right"
        width={360}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        footer={
          <Space style={{ float: "right" }}>
            <Button onClick={() => setDrawerVisible(false)}>Cancel</Button>
            <Button type="primary" onClick={onSaveUser}>Save</Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical" initialValues={user} scrollToFirstError>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ type: "email", required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Job Title" name="jobTitle">
            <Input />
          </Form.Item>
          <Form.Item label="Timezone" name="timezone">
            <Input />
          </Form.Item>
        </Form>
      </Drawer>
    </Layout>
  );
};
