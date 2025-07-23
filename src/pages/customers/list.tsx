import { useTable, List, DateField, FilterDropdown } from "@refinedev/antd";
import { Table, Input, Select, Space, Tag, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import type { Customer } from "../../types";
import "./styles.css";

export const CustomerList = () => {
  const { tableProps } = useTable<Customer>({
    syncWithLocation: true,
  });

  const downloadCSV = (data: Customer[], filename = "customers.csv") => {
    if (!data.length) return;

    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((field) => {
            const val = row[field as keyof Customer];
            return `"${String(val ?? "").replace(/"/g, '""')}"`;
          })
          .join(",")
      ),
    ];
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  };

  const nameSorter = (a: Customer, b: Customer) => {
    const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
    const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
    return nameA.localeCompare(nameB);
  };

  const statusOrder = [
    "NEEDS_EMPTY_TOTES_DROPOFF",
    "NEEDS_FULL_TOTES_PICKUP",
    "NEEDS_FILLED_TOTES_DROPOFF",
    "NEEDS_EMPTY_TOTES_PICKUP",
    "IN_STORAGE",
    "PAST_DUE",
  ];

  const paymentStatusOrder = ["CURRENT", "PAID", "PAST_DUE"];

  const statusSorter = (a: Customer, b: Customer, dataIndex: keyof Customer) => {
    const valA = a[dataIndex] as string;
    const valB = b[dataIndex] as string;

    const indexA = statusOrder.indexOf(valA);
    const indexB = statusOrder.indexOf(valB);

    return indexA - indexB;
  };

  const paymentSorter = (a: Customer, b: Customer) => {
    const indexA = paymentStatusOrder.indexOf(a.paymentStatus);
    const indexB = paymentStatusOrder.indexOf(b.paymentStatus);
    return indexA - indexB;
  };

  return (
    <List
      createButtonProps={{
        children: "Create Customer",
        type: "primary",
        style: {
          backgroundColor: "#1e3a8a",
          borderColor: "#1e3a8a",
        },
      }}
      wrapperProps={{ className: "refine-list-container" }}
    >
      <Table
        {...tableProps}
        rowKey="id"
        size="middle"
        bordered
        className="refine-table"
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
        style={{ backgroundColor: "#fff" }}
      >
        <Table.Column dataIndex="id" title="ID" sorter />
        <Table.Column
          dataIndex={["firstName", "lastName"]}
          title="Name"
          sorter={nameSorter}
          render={(_, record) => (
            <Link
              to={`/customers/${record.id}`}
              style={{ textDecoration: "underline", color: "#1e3a8a", fontWeight: 600 }}
            >
              {record.firstName} {record.lastName}
            </Link>
          )}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search name" />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="email"
          title="Email"
          sorter={(a, b) => a.email.localeCompare(b.email)}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search email" />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="phone"
          title="Phone"
          sorter={(a, b) => (a.phone || "").localeCompare(b.phone || "")}
        />
        <Table.Column
          dataIndex="status"
          title="Status"
          sorter={(a, b) => statusSorter(a, b, "status")}
          render={(value: string) => {
            const colors: Record<string, { bg: string; color: string }> = {
              IN_STORAGE: { bg: "#e6ffed", color: "#237804" },
              PAST_DUE: { bg: "#ffe5e5", color: "#cf1322" },
              NEEDS_EMPTY_TOTES_DROPOFF: { bg: "#e0e7ff", color: "#1e3a8a" },
              NEEDS_FULL_TOTES_PICKUP: { bg: "#e0e7ff", color: "#1e3a8a" },
              NEEDS_FILLED_TOTES_DROPOFF: { bg: "#e0e7ff", color: "#1e3a8a" },
              NEEDS_EMPTY_TOTES_PICKUP: { bg: "#e0e7ff", color: "#1e3a8a" },
            };
            const { bg, color } = colors[value] ?? { bg: "#f0f0f0", color: "#595959" };
            return (
              <Tag style={{ backgroundColor: bg, color, fontWeight: 600, borderRadius: 8 }}>
                {value.replace(/_/g, " ")}
              </Tag>
            );
          }}
          filterDropdown={({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <FilterDropdown
              setSelectedKeys={setSelectedKeys}
              selectedKeys={selectedKeys}
              confirm={confirm}
              clearFilters={clearFilters}
            >
              <Select
                value={selectedKeys[0]}
                onChange={(value) => {
                  setSelectedKeys(value ? [value] : []);
                  confirm();
                }}
                allowClear
                placeholder="Filter by status"
                style={{ width: 200 }}
                options={statusOrder.map((s) => ({
                  label: s.replace(/_/g, " "),
                  value: s,
                }))}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="paymentStatus"
          title="Payment"
          sorter={paymentSorter}
          render={(value: string) => {
            const colors: Record<string, { bg: string; color: string }> = {
              CURRENT: { bg: "#e6ffed", color: "#237804" },
              PAST_DUE: { bg: "#ffe5e5", color: "#cf1322" },
              PAID: { bg: "#e0e7ff", color: "#1e3a8a" },
            };
            const { bg, color } = colors[value] ?? { bg: "#f0f0f0", color: "#595959" };
            return (
              <Tag style={{ backgroundColor: bg, color, fontWeight: 600, borderRadius: 8 }}>
                {value.replace(/_/g, " ")}
              </Tag>
            );
          }}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ width: "200px" }}
                options={paymentStatusOrder.map((p) => ({
                  label: p.replace(/_/g, " "),
                  value: p,
                }))}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="dueDate"
          title="Due Date"
          render={(value) => <DateField value={value} />}
          sorter={(a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()}
        />
        <Table.Column
          dataIndex="createdAt"
          title="Created"
          render={(value) => <DateField value={value} />}
          sorter={(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <Link to={`/customers/${record.id}/edit`}>Edit</Link>
            </Space>
          )}
          fixed="right"
        />
      </Table>

      {/* Export CSV button below the table */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
        <Button
          icon={<DownloadOutlined />}
          type="primary"
          onClick={() => downloadCSV(tableProps?.dataSource || [])}
        >
          Export CSV
        </Button>
      </div>
    </List>
  );
};
