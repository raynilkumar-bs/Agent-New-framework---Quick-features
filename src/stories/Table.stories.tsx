import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table>;

const invoices = [
  { id: "INV-001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { id: "INV-002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { id: "INV-003", status: "Paid", method: "Bank Transfer", amount: "$350.00" },
  { id: "INV-004", status: "Failed", method: "Credit Card", amount: "$450.00" },
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Recent invoices</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((inv) => (
          <TableRow key={inv.id}>
            <TableCell className="font-medium">{inv.id}</TableCell>
            <TableCell>
              <Badge variant={inv.status === "Paid" ? "default" : inv.status === "Failed" ? "destructive" : "outline"}>
                {inv.status}
              </Badge>
            </TableCell>
            <TableCell>{inv.method}</TableCell>
            <TableCell className="text-right">{inv.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

const contacts = [
  { name: "Alice Johnson", email: "alice@example.com", role: "Admin", reviews: 42 },
  { name: "Bob Smith", email: "bob@example.com", role: "Editor", reviews: 18 },
  { name: "Carol White", email: "carol@example.com", role: "Viewer", reviews: 7 },
];

export const ContactsTable: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Reviews</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {contacts.map((c) => (
          <TableRow key={c.email}>
            <TableCell>{c.name}</TableCell>
            <TableCell className="text-muted-foreground">{c.email}</TableCell>
            <TableCell><Badge variant="secondary">{c.role}</Badge></TableCell>
            <TableCell className="text-right">{c.reviews}</TableCell>
            <TableCell>
              <Button variant="ghost" size="sm">Edit</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
