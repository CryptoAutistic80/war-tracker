# Web Design System

The web app uses a lightweight token + primitive layer.

## Tokens

Global tokens live in `app/globals.css` and include:

- Color semantics (`--color-bg`, `--color-surface`, `--color-text`, `--color-accent`, status colors).
- Typography scale (`--font-size-*`, line heights, sans font stack).
- Spacing, radius, shadows, and z-index values.

Use these tokens instead of hard-coded values when styling app surfaces.

## Primitives

Reusable base components are in `components/ui/`:

- `Button`, `Card`/`CardBody`, `Input`, `Select`, `Badge`, `Tabs`/`Tab`, `Table` helpers, `Skeleton`.

Compose feature-level components from these primitives to avoid duplicated ad-hoc styles.

## Usage notes

- Global styles are loaded in `app/layout.tsx`.
- Page-level layout structure should use semantic regions (`main`, `section`, `aside`, `header`) and the shared container utility class `.app-shell`.
