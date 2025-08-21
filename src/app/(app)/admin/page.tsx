import AdminDashboard from "@/components/admin/AdminDashboard";

export default function AdminPage() {
    return (
        <div>
            <h1 className="font-headline text-4xl font-bold text-accent mb-2">Admin Sanctum</h1>
            <p className="font-body text-muted-foreground mb-8">Oversee the coven's activities and manage its members.</p>
            <AdminDashboard />
        </div>
    );
}
