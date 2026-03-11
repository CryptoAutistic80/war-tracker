interface AppHeaderProps {
  brand: string;
  navItems: string[];
  searchPlaceholder: string;
}

export function AppHeader({ brand, navItems, searchPlaceholder }: AppHeaderProps) {
  return (
    <header style={{ borderBottom: '1px solid #e5e7eb', padding: '1rem 0' }}>
      <div
        style={{
          margin: '0 auto',
          maxWidth: 1200,
          padding: '0 1rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <strong>{brand}</strong>
        <nav aria-label="Primary">
          <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem', margin: 0, padding: 0 }}>
            {navItems.map((item) => (
              <li key={item} style={{ textTransform: 'capitalize' }}>
                {item}
              </li>
            ))}
          </ul>
        </nav>
        <input
          aria-label="Search"
          placeholder={searchPlaceholder}
          style={{ minWidth: 240, padding: '0.4rem 0.6rem' }}
        />
      </div>
    </header>
  );
}
