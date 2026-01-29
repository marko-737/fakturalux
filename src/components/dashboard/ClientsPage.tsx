import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, MoreHorizontal, Mail, Phone, MapPin, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalSpent: number;
  invoiceCount: number;
  status: "active" | "inactive";
}

const initialClients: Client[] = [
  { id: "1", name: "Acme Corp", email: "billing@acme.com", phone: "+1 234 567 890", address: "123 Business Ave, NY", totalSpent: 45000, invoiceCount: 24, status: "active" },
  { id: "2", name: "Globex Inc", email: "finance@globex.com", phone: "+1 345 678 901", address: "456 Tech Park, CA", totalSpent: 32000, invoiceCount: 18, status: "active" },
  { id: "3", name: "Initech", email: "accounts@initech.com", phone: "+1 456 789 012", address: "789 Corporate Blvd, TX", totalSpent: 28500, invoiceCount: 15, status: "active" },
  { id: "4", name: "Hooli", email: "billing@hooli.com", phone: "+1 567 890 123", address: "321 Innovation Way, CA", totalSpent: 18000, invoiceCount: 12, status: "inactive" },
  { id: "5", name: "Pied Piper", email: "finance@piedpiper.com", phone: "+1 678 901 234", address: "654 Startup Lane, CA", totalSpent: 52000, invoiceCount: 28, status: "active" },
  { id: "6", name: "Stark Industries", email: "ap@stark.com", phone: "+1 789 012 345", address: "999 Tower Rd, NY", totalSpent: 125000, invoiceCount: 45, status: "active" },
];

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateClient = () => {
    const client: Client = {
      id: String(clients.length + 1),
      name: newClient.name,
      email: newClient.email,
      phone: newClient.phone,
      address: newClient.address,
      totalSpent: 0,
      invoiceCount: 0,
      status: "active",
    };
    setClients([client, ...clients]);
    setNewClient({ name: "", email: "", phone: "", address: "" });
    setIsCreateOpen(false);
  };

  const handleDeleteClient = (id: string) => {
    setClients(clients.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clients</h1>
          <p className="text-muted-foreground mt-1">Manage your client relationships</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Add New Client</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label className="text-foreground">Company Name</Label>
                <Input
                  placeholder="Enter company name"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Email</Label>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Phone</Label>
                <Input
                  placeholder="Enter phone number"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Address</Label>
                <Input
                  placeholder="Enter address"
                  value={newClient.address}
                  onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
              <Button onClick={handleCreateClient} className="w-full btn-primary">
                Add Client
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search clients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-background border-border"
        />
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="glass-card border-border/50 hover:border-primary/30 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{client.name}</h3>
                    <Badge 
                      variant="outline" 
                      className={client.status === "active" 
                        ? "bg-accent/20 text-accent border-accent/30 mt-1" 
                        : "bg-muted text-muted-foreground border-muted mt-1"
                      }
                    >
                      {client.status}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card border-border">
                      <DropdownMenuItem className="cursor-pointer">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer text-destructive"
                        onClick={() => handleDeleteClient(client.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{client.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm truncate">{client.address}</span>
                </div>
                <div className="pt-3 border-t border-border flex justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Spent</p>
                    <p className="font-semibold text-foreground">${client.totalSpent.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Invoices</p>
                    <p className="font-semibold text-foreground">{client.invoiceCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ClientsPage;
