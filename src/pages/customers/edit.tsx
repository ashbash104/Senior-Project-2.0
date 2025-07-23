import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import { type Customer } from "../../types";

export const CustomerEdit = () => {
  const { formProps, saveButtonProps } = useForm<Customer>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true }, { type: "email", message: "Please enter a valid email" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Address" name="address" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Status" name="status" rules={[{ required: true }]}>
          <Select
            options={[
              { label: "Needs Empty Totes Dropoff", value: "NEEDS_EMPTY_TOTES_DROPOFF" },
              { label: "In Storage", value: "IN_STORAGE" },
              { label: "Needs Full Totes Pickup", value: "NEEDS_FULL_TOTES_PICKUP" },
              { label: "Needs Filled Totes Dropoff", value: "NEEDS_FILLED_TOTES_DROPOFF" },
              { label: "Needs Empty Totes Pickup", value: "NEEDS_EMPTY_TOTES_PICKUP" },
              { label: "Past Due", value: "PAST_DUE" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Payment Status" name="paymentStatus" rules={[{ required: true }]}>
          <Select
            options={[
              { label: "Current", value: "CURRENT" },
              { label: "Past Due", value: "PAST_DUE" },
              { label: "Paid", value: "PAID" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Storage Status" name="storageStatus" rules={[{ required: true }]}>
          <Select
            options={[
              { label: "Active", value: "ACTIVE" },
              { label: "Inactive", value: "INACTIVE" },
              { label: "Pending", value: "PENDING" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Tote Status" name="toteStatus" rules={[{ required: true }]}>
          <Select
            options={[
              { label: "Has Empty Totes", value: "HAS_EMPTY_TOTES" },
              { label: "Has Full Totes", value: "HAS_FULL_TOTES" },
              { label: "No Totes", value: "NO_TOTES" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Due Date"
          name="dueDate"
          rules={[{ required: true }]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
