import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select, DatePicker } from "antd";
import { type Task } from "../../types";

export const TaskCreate = () => {
  const { formProps, saveButtonProps } = useForm<Task>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
            },
          ]}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
            },
          ]}>
          <Select
            options={[
              {
                label: "To Do",
                value: "TODO",
              },
              {
                label: "In Progress",
                value: "IN_PROGRESS",
              },
              {
                label: "Completed",
                value: "COMPLETED",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Type"
          name="type"
          rules={[
            {
              required: true,
            },
          ]}>
          <Select
            options={[
              {
                label: "Pickup",
                value: "PICKUP",
              },
              {
                label: "Dropoff",
                value: "DROPOFF",
              },
              {
                label: "Maintenance",
                value: "MAINTENANCE",
              },
              {
                label: "Other",
                value: "OTHER",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Priority"
          name="priority"
          rules={[
            {
              required: true,
            },
          ]}>
          <Select
            options={[
              {
                label: "Low",
                value: "LOW",
              },
              {
                label: "Medium",
                value: "MEDIUM",
              },
              {
                label: "High",
                value: "HIGH",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Due Date"
          name="dueDate"
          rules={[
            {
              required: true,
            },
          ]}>
          <DatePicker showTime />
        </Form.Item>

        <Form.Item
          label="Assigned To ID"
          name="assignedToId"
          rules={[
            {
              required: true,
            },
          ]}>
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Customer ID"
          name="customerId"
          rules={[
            {
              required: true,
            },
          ]}>
          <Input type="number" />
        </Form.Item>
      </Form>
    </Create>
  );
};
