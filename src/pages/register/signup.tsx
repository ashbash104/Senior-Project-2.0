import * as React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { authProvider } from "providers/auth"; // Adjust the import path as necessary

const { Title } = Typography;

export const Signup: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const { name, email, password } = values;
    const result = await authProvider.register?.({ name, email, password });

    if (result?.success) {
      message.success("Account created! Please log in.");
      navigate("/login");
    } else {
      message.error(result?.error?.message || "Registration failed.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Create Account
      </Title>
      <Form
        name="signup"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Full Name"
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

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Sign Up
          </Button>
          Or <Link to="/login">Log in</Link>
        </Form.Item>
      </Form>
    </div>
  );
};
