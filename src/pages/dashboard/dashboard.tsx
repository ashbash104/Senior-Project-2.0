import { FC, useEffect, useState } from "react";
import {
  Layout,
  Typography,
  Card,
  Row,
  Col,
  theme,
  Space,
  Divider,
  Spin,
  Drawer,
  Button,
  Avatar,
  Form,
  Input,
  Progress,
} from "antd";
import {
  CheckCircleTwoTone,
  ClockCircleTwoTone,
  UserOutlined,
  DropboxOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useList } from "@refinedev/core";
import { CustomAvatar } from "components/custom-avatar";

const { Title, Text } = Typography;
const { Header, Content } = Layout;

/**
 * Demo user object for editable profile
 */
const demoUser = {
  id: "1",
  name: "Michael Scott",
  email: "demo@refine.dev",
  phone: "123-456-7890",
  jobTitle: "Regional Manager",
  timezone: "America/New_York",
  avatarUrl: "https://example.com/avatar.jpg",
};

export const Dashboard: FC = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  // User state & drawer visibility
  const [user, setUser] = useState(demoUser);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Form instance for profile editing
  const [form] = Form.useForm();

  // Open drawer and set form fields
  const openDrawer = () => {
    form.setFieldsValue(user);
    setDrawerVisible(true);
  };

  // Save handler updates user state & closes drawer
  const onSaveUser = () => {
    form
      .validateFields()
      .then((values) => {
        setUser((prev) => ({ ...prev, ...values }));
        setDrawerVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const [taskStatusCounts, setTaskStatusCounts] = useState<Record<string, number>>({});
  const { data: taskData, isLoading: tasksLoading } = useList({ resource: "tasks" });
  const { data: customerData, isLoading: customersLoading } = useList({ resource: "customers" });

  useEffect(() => {
    if (taskData?.data) {
      const counts: Record<string, number> = {};
      taskData.data.forEach((task: any) => {
        const status = task.status || "UNKNOWN";
        counts[status] = (counts[status] || 0) + 1;
      });
      setTaskStatusCounts(counts);
    }
  }, [taskData]);

  const totalTasks = Object.values(taskStatusCounts).reduce((sum, count) => sum + count, 0);

  // Example storage capacity numbers for demonstration:
  // Ideally you'd get this from an API/resource
  const totalStorageUnits = 1000;
  const usedStorageUnits = customerData?.data?.length || 0; // assuming 1 tote per customer for example

  const storageUsagePercent = Math.min(
    100,
    Math.round((usedStorageUnits / totalStorageUnits) * 100)
  );

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Header
        style={{
          backgroundColor: "#1e3a8a",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          borderRadius: "0 0 16px 16px",
          height: 64,
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Title
          level={3}
          style={{
            color: "white",
            margin: 0,
            fontWeight: 700,
            fontSize: "26px",
            letterSpacing: "0.5px",
            userSelect: "none",
          }}
        >
          OffTrack Storage Dashboard
        </Title>

        {/* User Button */}
        <Button
        type="text"
        onClick={openDrawer}
        style={{ color: "white", fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}
        >
        <CustomAvatar name={user.name} src={user.avatarUrl} />
        {user.name}
        </Button>
      </Header>

      <Content style={{ padding: "32px" }}>
        <Row gutter={[24, 24]}>
          {/* Tasks Overview */}
          <Col xs={24} sm={12} md={8}>
            <Card bordered={false}>
              <Space direction="vertical">
                <Title level={4}>Tasks Overview</Title>
                {tasksLoading ? (
                  <Spin />
                ) : (
                  <>
                    {Object.entries(taskStatusCounts).map(([status, count]) => (
                      <Text key={status}>
                        {status.includes("COMPLETE") ? (
                          <CheckCircleTwoTone twoToneColor="#52c41a" />
                        ) : (
                          <ClockCircleTwoTone twoToneColor="#faad14" />
                        )}{" "}
                        {status.replace(/_/g, " ")}: {count}
                      </Text>
                    ))}
                    <Divider style={{ margin: "8px 0" }} />
                    <Text strong>Total Tasks: {totalTasks}</Text>
                  </>
                )}
              </Space>
            </Card>
          </Col>

          {/* Quick Stats */}
          <Col xs={24} sm={12} md={8}>
            <Card bordered={false}>
              <Space direction="vertical">
                <Title level={4}>Quick Stats</Title>
                {customersLoading ? (
                  <Spin />
                ) : (
                  <>
                    <Text>
                      <DropboxOutlined /> Needs Empty Tote Dropoff:{" "}
                      {customerData?.data?.filter(
                        (c: any) => c.status === "NEEDS_EMPTY_TOTES_DROPOFF"
                      ).length || 0}
                    </Text>
                    <Text>
                      <DropboxOutlined /> Needs Full Tote Pickup:{" "}
                      {customerData?.data?.filter(
                        (c: any) => c.status === "NEEDS_FULL_TOTES_PICKUP"
                      ).length || 0}
                    </Text>
                    <Text>
                      <DropboxOutlined /> Needs Filled Tote Dropoff:{" "}
                      {customerData?.data?.filter(
                        (c: any) => c.status === "NEEDS_FILLED_TOTES_DROPOFF"
                      ).length || 0}
                    </Text>
                    <Text>
                      <DropboxOutlined /> Needs Empty Tote Pickup:{" "}
                      {customerData?.data?.filter(
                        (c: any) => c.status === "NEEDS_EMPTY_TOTES_PICKUP"
                      ).length || 0}
                    </Text>
                  </>
                )}
              </Space>
            </Card>
          </Col>

          {/* Storage Utilization */}
          <Col xs={24} sm={24} md={8}>
            <Card bordered={false}>
              <Title level={4}>Storage Utilization</Title>
              <Text>
                Currently using {usedStorageUnits} out of {totalStorageUnits} totes.
              </Text>
              <Progress percent={storageUsagePercent} status={storageUsagePercent > 90 ? "exception" : "active"} />
              {storageUsagePercent > 90 && (
                <Text type="danger" strong>
                  Storage nearly full! Consider expanding capacity.
                </Text>
              )}
            </Card>
          </Col>
        </Row>

        {/* New Features Coming Soon */}
        <Row gutter={[24, 24]} style={{ marginTop: 32 }}>
          <Col span={24}>
            <Card bordered={false}>
              <Title level={4}>New Features Coming Soon</Title>
              <Space direction="vertical">
                <Text>
                  <EnvironmentOutlined /> <strong>Route Mapping:</strong> Optimize delivery and pickup routes with integrated maps.
                </Text>
                <Text>
                  Enhanced calendar sync for better scheduling.
                </Text>
                <Text>
                  Kanban board for task management and workflow visualization.
                </Text>
              </Space>
            </Card>
          </Col>
        </Row>
      </Content>

      {/* User profile drawer */}
      <Drawer
        title="Your Profile"
        placement="right"
        width={360}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        footer={
          <Space style={{ float: "right" }}>
            <Button onClick={() => setDrawerVisible(false)}>Cancel</Button>
            <Button type="primary" onClick={onSaveUser}>
              Save
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical" initialValues={user} scrollToFirstError>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
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
