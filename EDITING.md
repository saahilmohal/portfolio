# How to update saahilmohal.com

Everything you'll normally change lives in `src/content/` and `src/photos/`.
Save a change on GitHub (or push from your computer) and Cloudflare rebuilds the site in about a minute.
Both themes (`/s` Sonar and `/r` Rolling Hills) update together.

| I want to…                         | Do this |
|------------------------------------|---------|
| Change my headline, stats, "at a glance", about, links, music | Edit `src/content/site.yaml` |
| Change which theme saahilmohal.com opens | In `site.yaml`, set `defaultTheme: "s"` or `"r"` |
| Add a job                          | Copy a file in `src/content/experience/`, rename it (e.g. `2027-zipline.md`), change the text |
| Add a project                      | Same, in `src/content/projects/` |
| Add drone photos                   | Drop .jpg files into `src/photos/` (name like `2026-05-madrid-palace.jpg`; the words become the caption) |
| Update my resume                   | Replace `public/resume.pdf` (keep the same name) |
| Use my own music file              | Put an .mp3 in `public/music/`, then set `music.file: "/music/name.mp3"` in `site.yaml` |

Easiest way to edit on GitHub: open the file, press the pencil icon, edit, then "Commit changes".
To upload photos: open `src/photos/` on GitHub → "Add file" → "Upload files".

Or just ask Claude: "add this project to my portfolio" with the details and photos.
