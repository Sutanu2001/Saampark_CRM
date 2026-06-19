export type LeadStatus = "New" | "Negotiation" | "Discussion" | "Qualified" | "Won" | "Lost";

export type Lead = {
  id: string;
  name: string;
  contact: string;
  phone: string;
  owner: string;
  createdAt: string;
  status: LeadStatus;
  label: string;
};

export type DashboardGraphType = "donut" | "bar" | "area";

export type DashboardConfig = {
  id: string;
  label: string;
  openTasks: number;
  events: number;
  due: string;
  graphType: DashboardGraphType;
  ticketColor: string;
};

export type Project = {
  id: string;
  title: string;
  client: string;
  price: string;
  startDate: string;
  deadline: string;
  progress: number;
  status: "Open" | "Completed";
  tag?: { label: string; className: string };
};
export type User = {
  id: string;
  email: string;
  password: string; // Plain text for local testing, can be hashed later
  username: string;
  role: "ADMIN" | "USER";
};

export type AppDb = {
  leads: Lead[];
  dashboards: DashboardConfig[];
  projects: Project[];
  users: User[];
};
