export type User = {
  id: number;
  email: string;
  password: string;
  role: "admin" | "user";
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  status:
    | "NEEDS_EMPTY_TOTES_DROPOFF"
    | "IN_STORAGE"
    | "NEEDS_FULL_TOTES_PICKUP"
    | "NEEDS_FILLED_TOTES_DROPOFF"
    | "NEEDS_EMPTY_TOTES_PICKUP"
    | "PAST_DUE";
  paymentStatus: "CURRENT" | "PAST_DUE" | "PAID";
  storageStatus: "ACTIVE" | "INACTIVE" | "PENDING";
  toteStatus: "HAS_EMPTY_TOTES" | "HAS_FULL_TOTES" | "NO_TOTES";
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type Task = {
  id: number;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  assignedToId: number;
  customerId: number;
  dueDate: Date;
  type: "PICKUP" | "DROPOFF" | "MAINTENANCE" | "OTHER";
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  createdAt: Date;
  updatedAt: Date;
};
