Go to [basilwong.github.io](https://basilwong.github.io) to visit my website.

## Development

```bash
npm install
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

Built with [Astro](https://astro.build/) + [Tailwind CSS](https://tailwindcss.com/).

### Adding a new portfolio project

Create a new `.md` file in `src/content/portfolio/` with front matter:

```yaml
---
title: "Project Name"
description: "Short description"
thumbnail: "/files/logos/image.png"
order: 10
tags: ["tag1", "tag2"]
repoUrl: "https://github.com/..."
---
```

### Adding a new CV entry

Edit `src/data/cv.ts` and add a new object to the `technicalExperience` or `otherExperience` array.
