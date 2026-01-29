import { Routes, Route } from "react-router-dom";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardOverview from "./DashboardOverview";
import InvoicesPage from "./InvoicesPage";
import ClientsPage from "./ClientsPage";
import AnalyticsPage from "./AnalyticsPage";
import SettingsPage from "./SettingsPage";

const DashboardContent = () => {
  return (
    <SidebarInset className="flex-1">
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border bg-background/80 backdrop-blur-xl px-6">
        <SidebarTrigger className="md:hidden" />
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">JD</span>
          </div>
        </div>
      </header>
      
      <main className="flex-1 p-6">
        <Routes>
          <Route index element={<DashboardOverview />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </SidebarInset>
  );
};

export default DashboardContent;
