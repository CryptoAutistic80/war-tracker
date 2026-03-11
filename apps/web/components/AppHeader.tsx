import { Input } from './ui';

interface AppHeaderProps {
  brand: string;
  navItems: string[];
  searchPlaceholder: string;
}

export function AppHeader({ brand, navItems, searchPlaceholder }: AppHeaderProps) {
  return (
    <header
      style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface)' }}
    >
      <div
        className="app-shell"
        style={{
          alignItems: 'center',
          display: 'flex',
          gap: 'var(--space-4)',
          justifyContent: 'space-between',
          paddingBlock: 'var(--space-4)',
        }}
      >
        <strong>{brand}</strong>
        <nav aria-label="Primary">
          <ul
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {navItems.map((item) => (
              <li
                key={item}
                style={{ color: 'var(--color-text-muted)', textTransform: 'capitalize' }}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>
        <div style={{ minWidth: 240 }}>
          <Input aria-label="Search" placeholder={searchPlaceholder} />
        </div>
      </div>
    </header>
  );
}
