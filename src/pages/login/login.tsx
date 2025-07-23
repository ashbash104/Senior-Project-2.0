import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, Typography, message } from "antd";
import { authProvider } from "providers/auth"; // Adjust path if needed

const { Title } = Typography;

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const { email, password } = values;

    const result = await authProvider.login?.({ email, password });

    if (result?.success) {
      message.success("Login successful!");
      navigate("/dashboard");
    } else {
      message.error(result?.error?.message || "Login failed.");
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "auto",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Title level={2} style={{ textAlign: "center" }}>
        Login
      </Title>
      <Form name="login" layout="vertical" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
          hasFeedback
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
      <p style={{ textAlign: "center" }}>
        Don't have an account? <Link to="/signup">Create one</Link>
      </p>
    </div>
  );
};
