import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker } from "antd";
import type { Task } from "../../types";
import dayjs from "dayjs";

export const TaskEdit: React.FC = () => {
  const { formProps, saveButtonProps, queryResult } = useForm<Task>();

  const { selectProps: userSelectProps } = useSelect({
    resource: "users",
    optionLabel: "email",
    optionValue: "id",
  });

  const { selectProps: customerSelectProps } = useSelect({
    resource: "customers",
    optionLabel: "email",
    optionValue: "id",
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Title" name="title" rules={[{ required: true, message: "Title is required" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Status" name="status" rules={[{ required: true, message: "Status is required" }]}>
          <Select
            options={[
              { label: "Todo", value: "TODO" },
              { label: "In Progress", value: "IN_PROGRESS" },
              { label: "Completed", value: "COMPLETED" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Assigned To"
          name="assignedToId"
          rules={[{ required: true, message: "Assignee is required" }]}>
          <Select {...userSelectProps} />
        </Form.Item>

        <Form.Item label="Customer" name="customerId" rules={[{ required: true, message: "Customer is required" }]}>
          <Select {...customerSelectProps} />
        </Form.Item>

        <Form.Item
          label="Due Date"
          name="dueDate"
          rules={[{ required: true, message: "Due date is required" }]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}>
          <DatePicker showTime />
        </Form.Item>

        <Form.Item label="Type" name="type" rules={[{ required: true, message: "Type is required" }]}>
          <Select
            options={[
              { label: "Pickup", value: "PICKUP" },
              { label: "Dropoff", value: "DROPOFF" },
              { label: "Maintenance", value: "MAINTENANCE" },
              { label: "Other", value: "OTHER" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Description is required" }]}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Priority" name="priority" rules={[{ required: true, message: "Priority is required" }]}>
          <Select
            options={[
              { label: "Low", value: "LOW" },
              { label: "Medium", value: "MEDIUM" },
              { label: "High", value: "HIGH" },
            ]}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
