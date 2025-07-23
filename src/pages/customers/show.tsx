import { DateField, Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography } from "antd";
import * as React from "react";
import { type Customer } from "../../types";

const { Title } = Typography;

export const CustomerShow = () => {
  const { queryResult } = useShow<Customer>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>First Name</Title>
      <TextField value={record?.firstName} />

      <Title level={5}>Last Name</Title>
      <TextField value={record?.lastName} />

      <Title level={5}>Email</Title>
      <TextField value={record?.email} />

      <Title level={5}>Phone</Title>
      <TextField value={record?.phone} />

      <Title level={5}>Address</Title>
      <TextField value={record?.address} />

      <Title level={5}>Status</Title>
      <TextField value={record?.status} />

      <Title level={5}>Payment Status</Title>
      <TextField value={record?.paymentStatus} />

      <Title level={5}>Storage Status</Title>
      <TextField value={record?.storageStatus} />

      <Title level={5}>Tote Status</Title>
      <TextField value={record?.toteStatus} />

      <Title level={5}>Due Date</Title>
      <DateField value={record?.dueDate} format="LLL" />

      <Title level={5}>Created At</Title>
      <DateField value={record?.createdAt} format="LLL" />

      <Title level={5}>Updated At</Title>
      <DateField value={record?.updatedAt} format="LLL" />
    </Show>
  );
};
