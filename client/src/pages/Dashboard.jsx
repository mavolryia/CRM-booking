import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const NAV_ITEMS = [
  { label: 'Дашборд', active: true },
  { label: 'Клиенты', active: false },
  { label: 'Календарь', active: false },
  { label: 'Брони', active: false },
];

export default function Dashboard() {
  const { user, logout } = useAuth();

  const navItems = user?.role === 'admin'
    ? [...NAV_ITEMS, { label: 'Админ-панель', active: false }]
    : NAV_ITEMS;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-title">CRM Бронирование</div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <span key={item.label} className={`sidebar-link ${item.active ? 'active' : ''}`}>
              {item.label}
            </span>
          ))}
        </nav>
      </aside>

      <div className="main-content">
        <div className="page-header">
          <h1>Дашборд</h1>
          <div className="user-badge">
            <span>{user?.email}</span>
            <span className="role-tag">{user?.role === 'admin' ? 'Админ' : 'Менеджер'}</span>
            <button type="button" className="logout-button" onClick={logout}>
              Выйти
            </button>
          </div>
        </div>

        <div className="placeholder-card">
          Вы вошли в систему как {user?.role === 'admin' ? 'администратор' : 'менеджер'}.
          Разделы «Клиенты», «Календарь», «Брони»{user?.role === 'admin' ? ' и «Админ-панель»' : ''} будут добавлены
          в следующих итерациях.
        </div>
      </div>
    </div>
  );
}
