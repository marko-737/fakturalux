import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const invoices = [
  { id: "INV-001", client: "Acme Corp", amount: "$2,500.00", status: "paid" },
  { id: "INV-002", client: "Globex Inc", amount: "$1,200.00", status: "pending" },
  { id: "INV-003", client: "Initech", amount: "$3,800.00", status: "paid" },
  { id: "INV-004", client: "Hooli", amount: "$950.00", status: "overdue" },
  { id: "INV-005", client: "Pied Piper", amount: "$4,200.00", status: "pending" },
];

const statusColors = {
  paid: "bg-accent/20 text-accent border-accent/30",
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  overdue: "bg-destructive/20 text-destructive border-destructive/30",
};

const RecentInvoices = () => {
  return (
    <Card className="glass-card border-border/50 h-full">
      <CardHeader>
        <CardTitle className="text-foreground">Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
          >
            <div>
              <p className="font-medium text-foreground">{invoice.client}</p>
              <p className="text-sm text-muted-foreground">{invoice.id}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground">{invoice.amount}</p>
              <Badge variant="outline" className={statusColors[invoice.status as keyof typeof statusColors]}>
                {invoice.status}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentInvoices;
