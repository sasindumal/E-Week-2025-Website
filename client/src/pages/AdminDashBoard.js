import Sidebar from "./sidebar"; // Adjust path if needed

const AdminDashBoard = ({ adminData = { stats: { activeEvents: 0 } } }) => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Sidebar />
      <main
        style={{
          marginLeft: "240px", // <-- IMPORTANT if sidebar fixed width 240px & fixed position
          padding: "2rem",
          color: "red",
          backgroundColor: "#121212",
        }}
      >
        <h1>Admin Dashboard</h1>
        <p style={{ color: "white" }}>
          Welcome to the admin dashboard. Here you can manage events, users, and other administrative tasks.
        </p>
      </main>
    </div>
  );
};

export default AdminDashBoard;
