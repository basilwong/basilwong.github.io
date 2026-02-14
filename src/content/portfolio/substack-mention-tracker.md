---
title: "Substack Mention Tracker"
description: "Python tool to track how often specific terms appear in Substack articles over time"
thumbnail: "/files/logos/substack-tracker-logo.png"
order: 1
tags: ["python", "data-analysis", "api", "open-source"]
repoUrl: "https://github.com/basilwong/substack-mention-tracker"
liveUrl: "https://colab.research.google.com/github/basilwong/substack-mention-tracker/blob/main/Substack_Mention_Tracker-2.ipynb"
---

A Python script that tracks how often specific terms (e.g., "Claude Code", "AI coding") appear in Substack articles over time, grouped by month. Try it out instantly in the [Google Colab notebook](https://colab.research.google.com/github/basilwong/substack-mention-tracker/blob/main/Substack_Mention_Tracker-2.ipynb).

## How It Works

The script uses **Substack's undocumented search API** (discovered through reverse engineering) to fetch article metadata, extract publication dates, and aggregate mention counts by month. It produces:

- A formatted console table
- A CSV file with monthly counts
- A line chart visualization
- An optional detailed JSON export with full post metadata

### API Details

The tool queries `GET https://substack.com/api/v1/post/search`, which requires no authentication and returns up to ~2,000 results per query (100 pages × 20 results). Each result includes the post title, publication date (ISO-8601), canonical URL, reaction count, comment count, word count, and author information.

Rate limiting is handled automatically with exponential backoff retry.

## Usage

### Basic usage (default queries: "Claude Code" and "AI coding")

```bash
python3 substack_mention_tracker.py
```

### Custom queries

```bash
python3 substack_mention_tracker.py --queries "Claude Code" "AI coding" "vibe coding" "Cursor AI"
```

### Control pagination and output

```bash
python3 substack_mention_tracker.py \
  --max-pages 50 \
  --delay 2.0 \
  --output results.csv \
  --chart trend_chart.png \
  --json detailed_results.json
```

## Limitations

- **Undocumented API** — The endpoint is not part of Substack's official API and could change at any time. Best suited for periodic research, not production monitoring.
- **~2,000 result cap per query** — For very popular terms, older results may be truncated. Consider running monthly and accumulating data over time.
- **Relevance-based search** — The API performs relevance-based search, not strict substring matching. A search for "AI coding" may return articles that mention "AI" and "coding" separately.

## Extending the Script

- Add more queries via `--queries`
- Schedule monthly runs with `cron` and append to a cumulative CSV
- Post-filter for exact phrase matches in titles or body text
- Analyze engagement metrics (reaction count, comment count, word count) from the detailed JSON output
