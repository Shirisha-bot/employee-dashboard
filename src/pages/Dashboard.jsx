import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {

  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  const rosterData = [
    { name: "John", email: "john@gmail.com", shift: "Morning (9-5)" },
    { name: "David", email: "david@gmail.com", shift: "Evening (2-10)" },
    { name: "Sam", email: "sam@gmail.com", shift: "Night (10-6)" }
  ];

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("currentUser"));

    if (!data) {
      navigate("/");
    } else {
      setEmployee(data);
    }
  }, [navigate]);

  const userShift = rosterData.find(
    (emp) => emp.email === employee?.email
  );

  const handleLogout = () => {

    let employees =
      JSON.parse(localStorage.getItem("employees")) || [];

    let currentUser =
      JSON.parse(localStorage.getItem("currentUser"));

    const logoutTime = new Date().toLocaleString();

    employees = employees.map((emp) => {
      if (emp.id === currentUser.id) {
        return { ...emp, logoutTime };
      }
      return emp;
    });

    localStorage.setItem("employees", JSON.stringify(employees));

    const updatedUser = {
      ...currentUser,
      logoutTime
    };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    setEmployee(updatedUser);

    setTimeout(() => {
      localStorage.removeItem("currentUser");
      navigate("/");
    }, 1500);
  };

  return (
    <div className="container mt-5">
      <h2>Employee Dashboard</h2>

      {employee && (
        <>
          <p><b>Name:</b> {employee.name}</p>
          <p><b>Email:</b> {employee.email}</p>
          <p><b>Login Time:</b> {employee.loginTime}</p>
          <p><b>Logout Time:</b> {employee.logoutTime || "Not logged out"}</p>
          <p><b>Shift:</b> {userShift?.shift}</p>
        </>
      )}

      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;