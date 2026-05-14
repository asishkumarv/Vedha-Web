import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { mockSubscriptions, Subscription } from "@/data/mockSubscriptions";
import { api } from "@/lib/api";
import { Loader2, Plus, Pencil, Trash2, Eye } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type FilterType = "All" | "Active" | "Expired";
const emptyForm: Omit<Subscription, "id"> = { userName: "", email: "", plan: "Basic", status: "Active", startDate: "", endDate: "" };

export const Route = createFileRoute("/subscriptions")({
  component: SubscriptionsPage,
});

function SubscriptionsPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!isAuthenticated) { if (typeof window !== "undefined") navigate({ to: "/login", replace: true }); return null; }
  return <AdminLayout><SubscriptionsContent /></AdminLayout>;
}

function SubscriptionsContent() {
  const [subs, setSubs] = useState<Subscription[]>(mockSubscriptions);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("All");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialog, setViewDialog] = useState<Subscription | null>(null);
  const [editingSub, setEditingSub] = useState<Subscription | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    api.getSubscriptions<Subscription[]>()
      .then(setSubs)
      .catch((error) => {
        console.error("Failed to load subscriptions", error);
        toast.error("Using local subscription fallback");
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "All" ? subs : subs.filter(s => s.status === filter);
  const openAdd = () => { setEditingSub(null); setForm(emptyForm); setDialogOpen(true); };
  const openEdit = (sub: Subscription) => { setEditingSub(sub); setForm(sub); setDialogOpen(true); };
  const handleSave = async () => {
    if (!form.userName || !form.email || !form.startDate || !form.endDate) { toast.error("Please fill all fields"); return; }
    try {
      if (editingSub) {
        const updated = await api.updateSubscription<Subscription>({ ...editingSub, ...form });
        setSubs(prev => prev.map(s => s.id === editingSub.id ? updated : s));
        toast.success("Subscription updated");
      } else {
        const created = await api.createSubscription<Subscription>(form as Subscription);
        setSubs(prev => [created, ...prev]);
        toast.success("Subscription added");
      }
      setDialogOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save subscription");
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await api.deleteSubscription(id);
      setSubs(prev => prev.filter(s => s.id !== id));
      toast.success("Subscription deleted");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to delete subscription");
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Subscriptions</h2>
          <p className="text-muted-foreground mt-1 text-sm">Manage user subscriptions and plans.</p>
        </div>
        <Button onClick={openAdd} className="bg-primary hover:bg-primary/90 w-full sm:w-auto"><Plus className="h-4 w-4 mr-1" /> Add Subscription</Button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {(["All", "Active", "Expired"] as FilterType[]).map(f => (
          <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)} className={filter === f ? "bg-primary hover:bg-primary/90" : ""}>{f}</Button>
        ))}
      </div>
      {loading && <p className="text-sm text-muted-foreground">Loading subscriptions...</p>}
      {/* Mobile cards */}
      <div className="block md:hidden space-y-3">
        {filtered.map(sub => (
          <Card key={sub.id}><CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between"><span className="font-medium text-sm">{sub.userName}</span><Badge className={sub.status === "Active" ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"}>{sub.status}</Badge></div>
            <p className="text-xs text-muted-foreground">{sub.email}</p>
            <div className="flex items-center justify-between"><Badge variant="outline" className="border-primary/30 text-primary text-xs">{sub.plan}</Badge><span className="text-xs text-muted-foreground">{sub.startDate} — {sub.endDate}</span></div>
            <div className="flex gap-1 pt-1">
              <Button size="sm" variant="ghost" onClick={() => setViewDialog(sub)}><Eye className="h-3.5 w-3.5" /></Button>
              <Button size="sm" variant="ghost" onClick={() => openEdit(sub)}><Pencil className="h-3.5 w-3.5" /></Button>
              <Button size="sm" variant="ghost" onClick={() => handleDelete(sub.id)} className="text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
            </div>
          </CardContent></Card>
        ))}
      </div>
      {/* Desktop table */}
      <Card className="hidden md:block"><CardContent className="p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b">
            <th className="text-left p-3 font-medium text-muted-foreground">Name</th><th className="text-left p-3 font-medium text-muted-foreground">Email</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Plan</th><th className="text-left p-3 font-medium text-muted-foreground">Status</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Start</th><th className="text-left p-3 font-medium text-muted-foreground">End</th>
            <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
          </tr></thead>
          <tbody>{filtered.map(sub => (
            <tr key={sub.id} className="border-b last:border-0 hover:bg-muted/30">
              <td className="p-3 font-medium">{sub.userName}</td><td className="p-3">{sub.email}</td>
              <td className="p-3"><Badge variant="outline" className="border-primary/30 text-primary">{sub.plan}</Badge></td>
              <td className="p-3"><Badge className={sub.status === "Active" ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"}>{sub.status}</Badge></td>
              <td className="p-3">{sub.startDate}</td><td className="p-3">{sub.endDate}</td>
              <td className="p-3 text-right"><div className="flex justify-end gap-1">
                <Button size="icon" variant="ghost" onClick={() => setViewDialog(sub)} className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => openEdit(sub)} className="h-8 w-8"><Pencil className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => handleDelete(sub.id)} className="text-destructive h-8 w-8"><Trash2 className="h-4 w-4" /></Button>
              </div></td>
            </tr>
          ))}</tbody>
        </table>
      </CardContent></Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogContent className="max-w-[95vw] sm:max-w-lg">
        <DialogHeader><DialogTitle>{editingSub ? "Edit Subscription" : "Add Subscription"}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><Label>Name</Label><Input value={form.userName} onChange={e => setForm(p => ({ ...p, userName: e.target.value }))} className="mt-1" /></div>
          <div><Label>Email</Label><Input value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="mt-1" /></div>
          <div><Label>Plan</Label><Select value={form.plan} onValueChange={v => setForm(p => ({ ...p, plan: v as Subscription["plan"] }))}><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Basic">Basic</SelectItem><SelectItem value="Premium">Premium</SelectItem><SelectItem value="Custom">Custom</SelectItem></SelectContent></Select></div>
          <div><Label>Status</Label><Select value={form.status} onValueChange={v => setForm(p => ({ ...p, status: v as Subscription["status"] }))}><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Active">Active</SelectItem><SelectItem value="Expired">Expired</SelectItem></SelectContent></Select></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><Label>Start Date</Label><Input type="date" value={form.startDate} onChange={e => setForm(p => ({ ...p, startDate: e.target.value }))} className="mt-1" /></div>
            <div><Label>End Date</Label><Input type="date" value={form.endDate} onChange={e => setForm(p => ({ ...p, endDate: e.target.value }))} className="mt-1" /></div>
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2"><Button variant="outline" onClick={() => setDialogOpen(false)} className="w-full sm:w-auto">Cancel</Button><Button onClick={handleSave} className="bg-primary hover:bg-primary/90 w-full sm:w-auto">Save</Button></DialogFooter>
      </DialogContent></Dialog>

      <Dialog open={!!viewDialog} onOpenChange={() => setViewDialog(null)}><DialogContent>
        <DialogHeader><DialogTitle>Subscription Details</DialogTitle></DialogHeader>
        {viewDialog && <div className="space-y-2 text-sm">
          <p><strong>Name:</strong> {viewDialog.userName}</p><p><strong>Email:</strong> {viewDialog.email}</p>
          <p><strong>Plan:</strong> {viewDialog.plan}</p><p><strong>Status:</strong> {viewDialog.status}</p>
          <p><strong>Period:</strong> {viewDialog.startDate} — {viewDialog.endDate}</p>
        </div>}
      </DialogContent></Dialog>
    </div>
  );
}
