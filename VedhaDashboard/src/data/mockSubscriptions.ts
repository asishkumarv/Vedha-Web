export interface Subscription {
  id: string;
  userName: string;
  email: string;
  plan: "Basic" | "Premium" | "Custom";
  status: "Active" | "Expired";
  startDate: string;
  endDate: string;
}

export const mockSubscriptions: Subscription[] = [
  { id: "sub1", userName: "Arjun Sharma", email: "arjun@example.com", plan: "Premium", status: "Active", startDate: "2026-01-15", endDate: "2027-01-15" },
  { id: "sub2", userName: "Priya Patel", email: "priya@example.com", plan: "Basic", status: "Active", startDate: "2026-02-01", endDate: "2026-08-01" },
  { id: "sub3", userName: "Rahul Verma", email: "rahul@example.com", plan: "Custom", status: "Expired", startDate: "2025-03-10", endDate: "2026-03-10" },
  { id: "sub4", userName: "Meera Iyer", email: "meera@example.com", plan: "Premium", status: "Active", startDate: "2026-03-01", endDate: "2027-03-01" },
  { id: "sub5", userName: "Vikram Singh", email: "vikram@example.com", plan: "Basic", status: "Expired", startDate: "2025-06-20", endDate: "2025-12-20" },
  { id: "sub6", userName: "Anita Desai", email: "anita@example.com", plan: "Premium", status: "Active", startDate: "2026-04-01", endDate: "2027-04-01" },
  { id: "sub7", userName: "Karthik Nair", email: "karthik@example.com", plan: "Custom", status: "Active", startDate: "2026-01-01", endDate: "2026-12-31" },
  { id: "sub8", userName: "Sonia Gupta", email: "sonia@example.com", plan: "Basic", status: "Expired", startDate: "2025-09-01", endDate: "2026-03-01" },
];
