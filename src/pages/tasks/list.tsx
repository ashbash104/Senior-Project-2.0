import { useTable, List, ShowButton, EditButton, DateField, FilterDropdown } from "@refinedev/antd";
import { Table, Tag, Input, Select, Space } from "antd";
import type { Task } from "../../types";
import "./task-list.css";  // <-- Import the CSS here

const getStatusColor = (status: string) => {
  switch (status) {
    case "TODO":
      return "default";
    case "IN_PROGRESS":
      return "processing";
    case "COMPLETED":
      return "success";
    default:
      return "default";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "LOW":
      return "success";
    case "MEDIUM":
      return "warning";
    case "HIGH":
      return "error";
    default:
      return "default";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "PICKUP":
      return "blue";
    case "DROPOFF":
      return "green";
    case "MAINTENANCE":
      return "orange";
    case "OTHER":
      return "default";
    default:
      return "default";
  }
};

export const TaskList = () => {
  const { tableProps } = useTable<Task>({
    syncWithLocation: true,
  });

  return (
    <List
      createButtonProps={{
        children: "Create Task",
        style: {
          backgroundColor: "#1e3a8a",
          borderColor: "#1e3a8a",
          fontWeight: 600,
        },
      }}
      style={{ background: "#fff", padding: 24, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
      headerProps={{
        style: {
          fontWeight: 600,
          fontSize: "18px",
          color: "#1e3a8a",
        },
      }}
    >
      <Table
        {...tableProps}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
        bordered
        className="refine-table"
        style={{ backgroundColor: "#fff" }}
      >
        <Table.Column<Task> dataIndex="id" title="ID" sorter />
        <Table.Column<Task> dataIndex="title" title="Title" sorter />
        <Table.Column<Task>
          dataIndex="status"
          title="Status"
          sorter
          render={(value) => (
            <Tag style={{ fontWeight: 600, borderRadius: 8 }} color={getStatusColor(value)}>
              {value.replace(/_/g, " ")}
            </Tag>
          )}
          filterDropdown={({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <FilterDropdown setSelectedKeys={setSelectedKeys} selectedKeys={selectedKeys} confirm={confirm} clearFilters={clearFilters}>
              <Select
                placeholder="Filter by status"
                allowClear
                style={{ width: 200 }}
                value={selectedKeys[0]}
                onChange={(value) => {
                  setSelectedKeys(value ? [value] : []);
                  confirm();
                }}
                options={[
                  { label: "TODO", value: "TODO" },
                  { label: "IN_PROGRESS", value: "IN_PROGRESS" },
                  { label: "COMPLETED", value: "COMPLETED" },
                ]}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column<Task>
          dataIndex="type"
          title="Type"
          sorter
          render={(value) => (
            <Tag style={{ fontWeight: 600, borderRadius: 8 }} color={getTypeColor(value)}>
              {value.replace(/_/g, " ")}
            </Tag>
          )}
          filterDropdown={({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <FilterDropdown setSelectedKeys={setSelectedKeys} selectedKeys={selectedKeys} confirm={confirm} clearFilters={clearFilters}>
              <Select
                placeholder="Filter by type"
                allowClear
                style={{ width: 200 }}
                value={selectedKeys[0]}
                onChange={(value) => {
                  setSelectedKeys(value ? [value] : []);
                  confirm();
                }}
                options={[
                  { label: "PICKUP", value: "PICKUP" },
                  { label: "DROPOFF", value: "DROPOFF" },
                  { label: "MAINTENANCE", value: "MAINTENANCE" },
                  { label: "OTHER", value: "OTHER" },
                ]}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column<Task>
          dataIndex="priority"
          title="Priority"
          sorter
          render={(value) => (
            <Tag style={{ fontWeight: 600, borderRadius: 8 }} color={getPriorityColor(value)}>
              {value.replace(/_/g, " ")}
            </Tag>
          )}
          filterDropdown={({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <FilterDropdown setSelectedKeys={setSelectedKeys} selectedKeys={selectedKeys} confirm={confirm} clearFilters={clearFilters}>
              <Select
                placeholder="Filter by priority"
                allowClear
                style={{ width: 200 }}
                value={selectedKeys[0]}
                onChange={(value) => {
                  setSelectedKeys(value ? [value] : []);
                  confirm();
                }}
                options={[
                  { label: "LOW", value: "LOW" },
                  { label: "MEDIUM", value: "MEDIUM" },
                  { label: "HIGH", value: "HIGH" },
                ]}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column<Task>
          dataIndex="dueDate"
          title="Due Date"
          render={(value) => <DateField value={value} format="YYYY-MM-DD" />}
          sorter
        />
        <Table.Column<Task>
          title="Actions"
          dataIndex="actions"
          fixed="right"
          render={(_, record) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
