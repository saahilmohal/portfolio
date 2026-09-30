# How to update saahilmohal.com

Everything you'll normally change lives in `src/content/` and `src/photos/`.
Save a change on GitHub (or push from your computer) and Cloudflare rebuilds the site in about a minute.
Both themes (`/s` Sonar and `/r` Rolling Hills) update together.

| I want to…                         | Do this |
|------------------------------------|---------|
| Change my headline, stats, "at a glance", about, links, music | Edit `src/content/site.yaml` |
| Change which theme saahilmohal.com opens | In `site.yaml`, set `defaultTheme: "s"` or `"r"` |
| Add a job                          | Copy a file in `src/content/experience/`, rename it (e.g. `zipline.md`), change the text. The file name becomes the page address. |
| Add a project                      | Same, in `src/content/projects/` |
| Add drone photos                   | Drop .jpg files into `src/photos/` (name like `2026-05-madrid-palace.jpg`; the words become the caption) |
| Change the short blurb on the homepage/list | Edit the `summary:` line at the top of that job or project file |
| Reorder projects / hide a job from the homepage | Projects: change `order:` (1 shows first). Jobs: add `home: false` |
| Write more about a job or project  | Open its file and write below the `---` lines. That text appears on its own page. |
| Add pictures to a job/project page | Put the image in `public/images/`, then write `![caption](/images/name.jpg)` in the file |
| Update my resume                   | Update the Google Doc. The site links to saahilmohal.com/resume-redirect, a Cloudflare page rule |
| Use my own music file              | Put an .mp3 in `public/music/`, then set `music.file: "/music/name.mp3"` in `site.yaml` |

Easiest way to edit on GitHub: open the file, press the pencil icon, edit, then "Commit changes".
To upload photos: open `src/photos/` on GitHub → "Add file" → "Upload files".

Or just ask Claude: "add this project to my portfolio" with the details and photos.
