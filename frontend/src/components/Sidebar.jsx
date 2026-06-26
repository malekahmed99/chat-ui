import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Sidebar({
  sessions,
  currentSessionId,
  onSelect,
  onNewChat,
  onDelete,
  onRename,
  isOpen,
}) {
  const { user, signOut } = useAuth();
  // Local state: which session (if any) is currently being renamed.
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  function startEditing(session) {
    setEditingId(session.id);
    setEditValue(session.title);
  }

  function commitEdit() {
    if (editValue.trim()) {
      onRename(editingId, editValue.trim());
    }
    setEditingId(null);
  }

  return (
    <aside className={"sidebar" + (isOpen ? " open" : "")}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-mark">φ</span>
          <span className="logo-text">AI Chat</span>
        </div>
        <button className="new-chat-btn" onClick={onNewChat}>
          + New chat
        </button>
      </div>

      <nav className="session-list">
        {sessions.length === 0 && (
          <p className="empty-hint">No chats yet - start one above.</p>
        )}
        {sessions.map((session) => (
          <div
            key={session.id}
            className={
              "session-item" + (session.id === currentSessionId ? " active" : "")
            }
          >
            {editingId === session.id ? (
              <input
                className="session-edit-input"
                value={editValue}
                autoFocus
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={commitEdit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") commitEdit();
                  if (e.key === "Escape") setEditingId(null);
                }}
              />
            ) : (
              <button className="session-main" onClick={() => onSelect(session.id)}>
                <span className="session-title">{session.title}</span>
              </button>
            )}

            <div className="session-actions">
              <button
                className="icon-btn"
                title="Rename"
                onClick={() => startEditing(session)}
              >
                ✎
              </button>
              <button
                className="icon-btn"
                title="Delete"
                onClick={() => onDelete(session.id)}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <span className="user-identifier">{user?.identifier || "User"}</span>
        </div>
        <button className="logout-btn" onClick={signOut}>Logout</button>
      </div>
    </aside>
  );
}
