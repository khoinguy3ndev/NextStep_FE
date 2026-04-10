# Color Token Replacement Map

## Semantic Mapping Rules

### Backgrounds

| Hardcoded                                                       | Replace with Tailwind token class |
| --------------------------------------------------------------- | --------------------------------- |
| #f9fafb, #f8fafc, #f5f6fa, #f0f1f5                              | `bg-background`                   |
| #ffffff, white                                                  | `bg-card` or `bg-background`      |
| #f0f4ff, #f0f6ff, #eef2f8, #eef3fb, #f8f9ff, #f0f3ff            | `bg-muted`                        |
| #e6f9f0, bg-emerald-50                                          | `bg-muted`                        |
| bg-red-50, bg-red-50/70, #fff5f5                                | `bg-destructive/10`               |
| bg-yellow-50, bg-yellow-100, #fffbeb, #fff7ed, #ffedd5, #fde68a | `bg-muted`                        |

### Text Colors

| Hardcoded                                   | Replace with               |
| ------------------------------------------- | -------------------------- |
| #0f172a, #1a1a2e, #1c1b1b, #0d0d0d          | `text-foreground`          |
| #374151, #2d3748, #334155, #1a1d2e          | `text-foreground`          |
| #4a5068, #434656, #64748b                   | `text-muted-foreground`    |
| #6b7280, #737688, #7f8796, #8892a4, #94a3b8 | `text-muted-foreground`    |
| #b0b8cc, #c3c5d9, #c0c8e0                   | `text-muted-foreground/60` |
| text-emerald-500/600/700/800                | `text-foreground`          |
| text-red-500/600/700, text-rose-500         | `text-destructive`         |
| text-amber-400/500/700                      | `text-muted-foreground`    |
| #b42318                                     | `text-destructive`         |
| #15803d                                     | `text-foreground`          |

### Blue/Brand colors → Primary (monochromatic = foreground)

| Hardcoded                          | Replace with                     |
| ---------------------------------- | -------------------------------- |
| #0055ff, #0041c8, #0038ab, #002d8a | `text-foreground` / `bg-primary` |
| #0066ff, #1f6fcf, #3366d6, #2b4a7f | `text-foreground` / `bg-primary` |
| #0a66c2, #0a67d9, #22a6f2          | `text-foreground`                |
| #0077b5 (LinkedIn color)           | `text-foreground`                |
| bg-amber-500, bg-green-500         | `bg-foreground`                  |

### Borders

| Hardcoded                          | Replace with            |
| ---------------------------------- | ----------------------- |
| #e5e7eb, #eceef2, #e8eaf0, #dfe4ec | `border-border`         |
| #e0e4ee, #edf0f5, #eef1f6, #d0d8f0 | `border-border`         |
| #dce5f5, #dde3f5, #c7d4f8, #cfd8ea | `border-border`         |
| border-red-100/200                 | `border-destructive/30` |
| border-emerald-200                 | `border-border`         |
| border-yellow-300                  | `border-border`         |
| rgba(0,0,0,0.08)                   | `border-border`         |

### Neutrals (keep as-is or map to border/muted)

| Hardcoded                                   | Replace with    |
| ------------------------------------------- | --------------- |
| #d1d1d1, #e5e5e5                            | `border-border` |
| #e8eaef, #ebedf2                            | `border-border` |
| #f6f3f2, #fcf9f8, #f0edec, #ebe7e7, #f0f3ff | `bg-muted`      |

## Inline style={{ }} conversion rule

- style={{ color: '#xxx' }} → className="text-foreground" (or muted-foreground)
- style={{ backgroundColor: '#xxx' }} → className="bg-muted" (or bg-card)
- style={{ borderColor: '#xxx' }} → className="border-border"
- style={{ stroke: '#xxx' }} → keep as stroke="currentColor" + add color class on parent
- style={{ fill: '#xxx' }} → keep as fill="currentColor" + add color class on parent

## Special cases

- Match Rate SVG circle:
  score >= 80 → stroke color class: text-foreground, stroke="currentColor"
  score 60-79 → stroke color class: text-foreground/60, stroke="currentColor"  
  score < 60 → stroke color class: text-destructive, stroke="currentColor"
  track circle → text-border, stroke="currentColor"

- LinkedIn icon (#0077b5, #0a66c2) → text-foreground
- Google icon colors → keep as-is ONLY inside google-callback.page.tsx (brand requirement)
