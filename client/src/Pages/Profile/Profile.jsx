import React, { useState, useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './Profile.css'
import axios from 'axios'

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {}
  const [badges, setBadge] = useState([])
  const backend = import.meta.env.VITE_BACKEND_URL
  const [xp, setXp] = useState(0)

  // Local profile data
  const storageKey = `profile_${user.id || 'default'}`
  const getStoredProfile = () => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || { projects: [], experience: [], education: [] }
    } catch { return { projects: [], experience: [], education: [] } }
  }

  const [profileData, setProfileData] = useState(getStoredProfile())
  const [addingSection, setAddingSection] = useState(null)
  const [formData, setFormData] = useState({ title: '', description: '', date: '' })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(profileData))
  }, [profileData])

  useEffect(() => {
    const fetchXP = async () => {
      try {
        const response = await axios.post(backend + "api/user/getXP", { id: user.id })
        if (response.data.success) {
          setXp(response.data.XP)
          setBadge(response.data.badges)
        }
      } catch (error) {
        console.error("Failed to fetch XP:", error)
      }
    }
    if (user.id) fetchXP()
  }, [user.id])

  const level = 1 + Math.floor(xp / 100)
  const progress = xp % 100

  const addItem = (section) => {
    if (!formData.title.trim()) return
    setProfileData(prev => ({
      ...prev,
      [section]: [...prev[section], { ...formData, id: Date.now() }]
    }))
    setFormData({ title: '', description: '', date: '' })
    setAddingSection(null)
  }

  const removeItem = (section, id) => {
    setProfileData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }))
  }

  const renderSection = (title, key, description, icon) => (
    <div className="profile-section-card">
      <div className="profile-section-header">
        <div>
          <h3 className="profile-section-title">{icon} {title}</h3>
          <p className="profile-section-desc">{description}</p>
        </div>
        <button
          className="profile-add-btn"
          onClick={() => setAddingSection(addingSection === key ? null : key)}
        >
          {addingSection === key ? '✕' : '+ Add'}
        </button>
      </div>

      {addingSection === key && (
        <div className="profile-add-form">
          <input
            type="text"
            placeholder={`${title} title`}
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            className="profile-input"
          />
          <textarea
            placeholder="Description (optional)"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className="profile-textarea"
            rows={3}
          />
          <input
            type="text"
            placeholder="Date / Duration (optional)"
            value={formData.date}
            onChange={e => setFormData({ ...formData, date: e.target.value })}
            className="profile-input"
          />
          <button className="profile-save-btn" onClick={() => addItem(key)}>Save</button>
        </div>
      )}

      {profileData[key] && profileData[key].length > 0 && (
        <div className="profile-items-list">
          {profileData[key].map(item => (
            <div key={item.id} className="profile-item">
              <div className="profile-item-content">
                <h4>{item.title}</h4>
                {item.description && <p>{item.description}</p>}
                {item.date && <span className="profile-item-date">{item.date}</span>}
              </div>
              <button className="profile-remove-btn" onClick={() => removeItem(key, item.id)} title="Remove">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <>
      <Navbar />
      <div className="profile-layout">
        <Sidebar />
        <div className="profile-content">
          <div className="profile-main">
            {/* Profile Header Card */}
            <div className="profile-card">
              <div className="profile-avatar-glow">
                <img src={user.avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=neura1"} alt="avatar" />
              </div>
              <h2 className="profile-name">{user.name || "User"}</h2>
              <p className="profile-email">{user.email || "user@email.com"}</p>

              <div className="profile-xp-section">
                <div className="profile-xp-row">
                  <span>Level {level}</span>
                  <span className="profile-xp-value">{xp} XP</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="profile-xp-next">{100 - progress} XP to next level</p>
              </div>

              {badges && badges.length > 0 && (
                <div className="profile-badges-section">
                  <h3>Badges</h3>
                  <div className="badges-container">
                    {badges.map((badge, index) => (
                      <div key={index} className="badge">
                        <span className="badge-name">{badge}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Sections */}
            {renderSection('Experience', 'experience',
              'Add your professional experience, internships, or volunteer work.',
              '💼'
            )}

            {renderSection('Projects', 'projects',
              'Showcase your skills to recruiters with job-relevant projects. Add projects here to demonstrate your technical expertise and ability to solve real-world problems.',
              '🚀'
            )}

            {renderSection('Work History', 'experience',
              'Add your past work experience here. If you\'re just starting out, you can add internships or volunteer experience instead.',
              '📋'
            )}

            {renderSection('Education & Credentials', 'education',
              'Add your educational background here to let employers know where you studied or are currently studying.',
              '🎓'
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
