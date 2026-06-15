import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Dashboard.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BarChartComponent from "../../Components/Charts/BarChartComponent";
import AskAIChat from "../../Components/AskAIChat/AskAIChat";
import DonutChart from "../../Components/Charts/DonutChart";
import Loading from "../../Components/Loading/Loading";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const name = user.name || "User";
  const [users, setUsers] = useState([]);
  const nav = useNavigate();
  const [curr, allcurr] = useState([]);
  const backend = import.meta.env.VITE_BACKEND_URL;
  const python = import.meta.env.VITE_PYTHON_URL;
  const [bar, setbar] = useState({});
  const [donut, Setdonut] = useState({ completed: 0, total: 0 });
  const [classificationMsg, setClassificationMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const abortRef = useRef(null);

  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.id;
  };

  // Classification — loaded separately, non-blocking
  const classifyUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.post(python + "classify", {
        user_id: getUserId()
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (resp.data.success) {
        setClassificationMsg(resp.data.data || "");
      }
    } catch (e) {
      console.error("Classification error:", e);
      setClassificationMsg("");
    }
  };

  const calculateDonut = (dataList) => {
    let total = 0;
    dataList.forEach(item => {
      const day = 1 + Math.floor((new Date() - new Date(item.startdate)) / (1000 * 60 * 60 * 24));
      if (item.curriculum[`Day ${day}`]) {
        total += item.curriculum[`Day ${day}`].Subtopics.length;
      }
    });
    Setdonut({ total, completed: 0 });
  };

  const getCurriculum = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const email = user.email;
      const user_id = user.id;
      const token = localStorage.getItem("token");

      const resp = await axios.post(
        backend + "api/curriculum/getcurriculum",
        { email: email, userId: user_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!resp.data.success) {
        toast.error("Unable to get Curriculum!");
      } else {
        allcurr(resp.data.data);
        setbar(resp.data.bar);
        setUsers(resp.data.leaderboard);
        calculateDonut(resp.data.data);
        Setdonut(prev => ({
          ...prev,
          completed: resp.data.donut
        }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Only wait for curriculum data — the critical path
      await getCurriculum();
      setLoading(false);
      // Fire classification in background — non-blocking
      classifyUser();
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="dashboard-layout">
          <Sidebar />
          <div className="dashboard-content">
            <div className="dashboard-loading">
              <Loading />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar />
        <div className="dashboard-content">
          <div className="dashboard-main">
            <h1 className="dashboard-title">Welcome, {name}!</h1>

            {classificationMsg && classificationMsg.length > 0 && (
              <div className="classification-message">
                {classificationMsg}
              </div>
            )}

            {/* Active Curriculums */}
            {curr.length > 0 && (
              <div className="curriculums">
                {curr
                  .filter(item => {
                    const now = new Date();
                    const start = new Date(item.startdate);
                    const end = new Date(start.getTime() + item.duration * 24 * 60 * 60 * 1000);
                    return start <= now && now <= end;
                  })
                  .map((item, index) => (
                    <div key={index} className="day-card" onClick={() => nav(`/study-curriculum/${item.id}`)}>
                      <div className="day-card-icon">📚</div>
                      <div className="day-card-content">
                        <h4>Day {1 + Math.floor((new Date() - new Date(item.startdate)) / (1000 * 60 * 60 * 24))} of {item.topic}</h4>
                        <p className="day-card-subtitle">Continue learning</p>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="day-card-arrow">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </div>
                  ))}
              </div>
            )}

            {/* Charts Row */}
            {(donut.total > 0 || (bar && bar.length > 0)) && (
              <div className="dashboard-charts-row">
                {donut.total > 0 && (
                  <div className="dashboard-chart-card">
                    <DonutChart completed={donut.completed > donut.total ? donut.total : donut.completed} total={donut.total} title={"Today Progress"} ct={"Completed"} rt={"Remaining"} />
                  </div>
                )}
                {bar && bar.length > 0 && (
                  <div className="dashboard-chart-card">
                    <BarChartComponent data={bar} title={"Last 7 Days Progress"} col={"date"} row={"count_of_completed"} rowname={"Completed"} />
                  </div>
                )}
              </div>
            )}

            {/* Leaderboard */}
            {users && users.length > 0 && (
              <div className="leaderboard-container">
                <h2 className="leaderboard-title">🏆 Leaderboard — Top 20 by XP</h2>
                <div className="leaderboard-table-container">
                  <table className="leaderboard-table">
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>XP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={index}>
                          <td className="leaderboard-rank">{index + 1}</td>
                          <td>{user.name}</td>
                          <td className="leaderboard-xp">{user.XP}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Daily Tasks */}
            <div className="daily-tasks">
              <h3 className="tasks-heading">🎯 Daily XP Tasks</h3>
              <div className="task-item">
                <span className="task-title">✅ Read your first topic of the day</span>
                <span className="task-reward">+10 XP</span>
              </div>
              <div className="task-item">
                <span className="task-title">📊 Score more than 60% in quiz</span>
                <span className="task-reward">+20 XP</span>
              </div>
              <div className="task-item">
                <span className="task-title">🏆 Score 100% in quiz</span>
                <span className="task-reward">+30 XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AskAIChat />
    </div>
  );
};

export default Dashboard;