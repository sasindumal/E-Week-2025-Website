import Sidebar from "./sidebar"; // Adjust the path as needed

const AdminDashBoard = ({ adminData = { stats: { activeEvents: 0 } } }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar activeEvents={adminData.stats.activeEvents} />

      <main style={{ flexGrow: 1, padding: "2rem", color: "red" }}>
        <h1>Admin Dashboard</h1>
        <p style={{ color: "white" }}>
          Welcome to the admin dashboard. Here you can manage events, users, and other administrative tasks.
        </p>
      </main>
    </div>
  );
};

export default AdminDashBoard;
