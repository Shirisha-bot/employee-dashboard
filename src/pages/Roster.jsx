import { useState } from "react";

function Roster() {
  const [rosterData] = useState([
    { name: "John", shift: "Morning (9-5)" },
    { name: "David", shift: "Evening (2-10)" },
    { name: "Sam", shift: "Night (10-6)" }
  ]);

  return (
    <div className="container mt-5">
      <h2>Employee Roster</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Shift</th>
          </tr>
        </thead>

        <tbody>
          {rosterData.map((emp, index) => (
            <tr key={index}>
              <td>{emp.name}</td>
              <td>{emp.shift}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Roster;