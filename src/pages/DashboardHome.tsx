import React from "react";
import "../css/dashboard.css";
import { CgPerformance } from "react-icons/cg";

const DashboardHome: React.FC = () => {
  return (
    <>
      <main>
        <h1>Dashboard</h1>

        <div className="date">
          <input type="date" />
        </div>

        <div className="insights">
          {/* Start Selling */}
          <div className="sales">
            <span className="material-symbols-sharp"><CgPerformance size={5} /></span>
            <div className="middle">
              <div className="left">
                <h3>Total Sales</h3>
                <h1>$25,024</h1>
              </div>
              <div className="progress">
                <svg>
                  <circle r="30" cy="40" cx="40"></circle>
                </svg>
                <div className="number">
                  <p>80%</p>
                </div>
              </div>
            </div>
            <small>Last 24 Hours</small>
          </div>

          <div className="expenses">
            <span className="material-symbols-sharp">local_mall</span>
            <div className="middle">
              <div className="left">
                <h3>Total Expenses</h3>
                <h1>$10,500</h1>
              </div>
              <div className="progress">
                <svg>
                  <circle r="30" cy="40" cx="40"></circle>
                </svg>
                <div className="number">
                  <p>50%</p>
                </div>
              </div>
            </div>
            <small>Last 24 Hours</small>
          </div>

          <div className="income">
            <span className="material-symbols-sharp">stacked_line_chart</span>
            <div className="middle">
              <div className="left">
                <h3>Total Income</h3>
                <h1>$15,000</h1>
              </div>
              <div className="progress">
                <svg>
                  <circle r="30" cy="40" cx="40"></circle>
                </svg>
                <div className="number">
                  <p>60%</p>
                </div>
              </div>
            </div>
            <small>Last 24 Hours</small>
          </div>
        </div>
        {/* End Insights */}

        <div className="recent_order">
          <h2>Recent Orders</h2>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Number</th>
                <th>Payments</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((_, index) => (
                <tr key={index}>
                  <td>Mini USB</td>
                  <td>4563</td>
                  <td>Due</td>
                  <td className="warning">Pending</td>
                  <td className="primary">Details</td>
                </tr>
              ))}
            </tbody>
          </table>
          <a href="#">Show All</a>
        </div>
      </main>
    </>
  );
};

export default DashboardHome;
