import './notification.css'

const NotificationBox = ({ type, message, desc }) => {
    const types = {
      success: "circle-check",
      failed: "circle-xmark",
      warning: "triangle-exclamation",
    };
  
    if (!type) return null;
  
    return (
      <div className={`notification-wrapper ${type}`}>
        <div className="notification-title">
          <i className={`fa-solid fa-${types[type] || "circle-info"}`}></i>
          <span>{message}</span>
        </div>
        <div className="notification-desc">
          <p>{desc}</p>
        </div>
      </div>
    );
  };
  

export default NotificationBox