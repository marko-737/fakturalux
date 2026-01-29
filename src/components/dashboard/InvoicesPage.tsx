import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Invoice {
  id: string;
  client: string;
  email: string;
  amount: number;
  status: "paid" | "pending" | "overdue" | "draft";
  date: string;
  dueDate: string;
}

const initialInvoices: Invoice[] = [
  { id: "INV-001", client: "Acme Corp", email: "billing@acme.com", amount: 2500, status: "paid", date: "2024-01-15", dueDate: "2024-02-15" },
  { id: "INV-002", client: "Globex Inc", email: "finance@globex.com", amount: 1200, status: "pending", date: "2024-01-18", dueDate: "2024-02-18" },
  { id: "INV-003", client: "Initech", email: "accounts@initech.com", amount: 3800, status: "paid", date: "2024-01-20", dueDate: "2024-02-20" },
  { id: "INV-004", client: "Hooli", email: "billing@hooli.com", amount: 950, status: "overdue", date: "2024-01-10", dueDate: "2024-01-25" },
  { id: "INV-005", client: "Pied Piper", email: "finance@piedpiper.com", amount: 4200, status: "pending", date: "2024-01-22", dueDate: "2024-02-22" },
  { id: "INV-006", client: "Stark Industries", email: "ap@stark.com", amount: 8500, status: "draft", date: "2024-01-25", dueDate: "2024-02-25" },
];

const statusColors = {
  paid: "bg-accent/20 text-accent border-accent/30",
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  overdue: "bg-destructive/20 text-destructive border-destructive/30",
  draft: "bg-muted text-muted-foreground border-muted",
};

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    client: "",
    email: "",
    amount: "",
    dueDate: "",
  });

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateInvoice = () => {
    const invoice: Invoice = {
      id: `INV-${String(invoices.length + 1).padStart(3, "0")}`,
      client: newInvoice.client,
      email: newInvoice.email,
      amount: parseFloat(newInvoice.amount),
      status: "draft",
      date: new Date().toISOString().split("T")[0],
      dueDate: newInvoice.dueDate,
    };
    setInvoices([invoice, ...invoices]);
    setNewInvoice({ client: "", email: "", amount: "", dueDate: "" });
    setIsCreateOpen(false);
  };

  const handleDeleteInvoice = (id: string) => {
    setInvoices(invoices.filter((inv) => inv.id !== id));
  };

  const handleSendInvoice = (id: string) => {
    setInvoices(
      invoices.map((inv) =>
        inv.id === id ? { ...inv, status: "pending" as const } : inv
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Invoices</h1>
          <p className="text-muted-foreground mt-1">Manage and track all your invoices</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Create New Invoice</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label className="text-foreground">Client Name</Label>
                <Input
                  placeholder="Enter client name"
                  value={newInvoice.client}
                  onChange={(e) => setNewInvoice({ ...newInvoice, client: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Client Email</Label>
                <Input
                  type="email"
                  placeholder="Enter client email"
                  value={newInvoice.email}
                  onChange={(e) => setNewInvoice({ ...newInvoice, email: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Amount</Label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={newInvoice.amount}
                  onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Due Date</Label>
                <Input
                  type="date"
                  value={newInvoice.dueDate}
                  onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
              <Button onClick={handleCreateInvoice} className="w-full btn-primary">
                Create Invoice
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="glass-card border-border/50">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
              <Button variant="outline" className="border-border">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-muted-foreground">Invoice</TableHead>
                    <TableHead className="text-muted-foreground">Client</TableHead>
                    <TableHead className="text-muted-foreground">Amount</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-muted-foreground">Date</TableHead>
                    <TableHead className="text-muted-foreground">Due Date</TableHead>
                    <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id} className="border-border hover:bg-background/50">
                      <TableCell className="font-medium text-foreground">{invoice.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-foreground">{invoice.client}</p>
                          <p className="text-sm text-muted-foreground">{invoice.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground font-semibold">
                        ${invoice.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusColors[invoice.status]}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{invoice.date}</TableCell>
                      <TableCell className="text-muted-foreground">{invoice.dueDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-card border-border">
                            <DropdownMenuItem className="cursor-pointer">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            {invoice.status === "draft" && (
                              <DropdownMenuItem 
                                className="cursor-pointer"
                                onClick={() => handleSendInvoice(invoice.id)}
                              >
                                <Send className="w-4 h-4 mr-2" />
                                Send
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem 
                              className="cursor-pointer text-destructive"
                              onClick={() => handleDeleteInvoice(invoice.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default InvoicesPage;
