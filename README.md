# asif190.github.io

Academic website of Mohammad Asif Hasan, built with Jekyll and served by GitHub Pages.
GitHub builds the site for you on every push — you do not need to install anything to publish.

## Publish it (about 5 minutes)

1. On GitHub, create a **new public repository** named exactly `Asif190.github.io`
   (your username followed by `.github.io`). Leave "Add a README" unticked.
2. Upload the contents of this folder (not the folder itself) to the repository:
   - easiest: on the empty repo page click **uploading an existing file**, drag every file and
     folder from here in, and click **Commit changes**; or
   - with git:
     ```bash
     cd asif190.github.io
     git init && git add . && git commit -m "Initial site"
     git branch -M main
     git remote add origin https://github.com/Asif190/Asif190.github.io.git
     git push -u origin main
     ```
3. In the repository go to **Settings → Pages**. Under *Build and deployment* choose
   **Deploy from a branch**, branch **main**, folder **/ (root)**, and save.
4. Wait 1–2 minutes (progress is under the **Actions** tab). The site is live at
   **https://asif190.github.io**.

Uploading through the browser: GitHub hides folders whose names start with `_` from some
file pickers — drag and drop the folders instead of selecting files one by one, and check
that `_config.yml`, `_data`, `_includes`, `_layouts` and `_posts` all appear in the repo.

## Before you share the link — checklist

- [x] **Photo:** `assets/img/profile.jpg` (hero) and `assets/img/profile-square.jpg` (link previews).
- [x] **CV PDF:** `assets/files/CV_Mohammad_Asif_Hasan.pdf` is built from
      `Important Resources/Academic CV/cv_academic_web.tex` (kept out of git). It deliberately has no
      phone number, street address or CGPA. Rebuild with `pdflatex` twice and copy the PDF over.
- [x] **Paper and code links** in `_data/publications.yml` and `_data/projects.yml`.
- [ ] **Google Scholar / ORCID:** create profiles and add their IDs in `_config.yml`.
- [ ] **Project years** still blank for HIVE-R, the quantum classifier and the vending machine (`_data/projects.yml`).
- [ ] **Photography** is hidden (`published: false` in `photography.html`). Add real photos, then re-enable it.
- [ ] **Blog** is hidden from the menu automatically until the first post exists in `_posts/`.
- [ ] Update the manuscript entries in `_data/publications.yml` when they are submitted or accepted.

## Where to edit things

| To change… | Edit |
|---|---|
| Name, links, email, "seeking Ph.D." line | `_config.yml` |
| Home page text and research interests | `index.html` |
| News items on the home page | `_data/news.yml` (newest first) |
| Publications (and BibTeX) | `_data/publications.yml` |
| Research page | `research.md` |
| Projects | `_data/projects.yml` |
| CV page (education, awards, service, skills) | `_data/cv.yml` |
| Photography | `_data/photos.yml` + images in `assets/photos/` |
| Menu | `_data/navigation.yml` |
| Colours and fonts | top of `assets/css/main.css` |
| Thesis diagram on the home and research pages | `_includes/thesis-diagram.html` |
| Research-interest cards | `index.html` (icons: `_includes/glyph.html`) |

Most edits can be made directly on github.com: open the file, click the pencil icon, edit, and
**Commit changes**. The site updates a minute later.

### Add a publication

Copy an existing entry in `_data/publications.yml`. `type` is one of `review`
(in preparation / under review), `journal`, `conference` or `preprint`. Set `selected: true`
to show it on the home page. Your name is bolded wherever `M. A. Hasan` appears in `authors`.
When a manuscript is accepted, change its `type` and `venue`.

### Write a blog post

Create a file in `_posts/` named `YYYY-MM-DD-short-title.md`:

```markdown
---
title: "Reading notes: TransUNet"
description: "One sentence shown in the blog list."
tags: [segmentation, reading notes]
math: true        # only if the post uses LaTeX ($...$ or $$...$$)
---

First paragraph — shown as the preview if there is no description.

<!--more-->

The rest of the post. Markdown, code blocks, images
(![alt text](/assets/img/posts/figure.png)) and equations all work.
```

Put post images in `assets/img/posts/`. Delete `_posts/2026-10-25-hello.md` once you have a real post.

### Add photographs

1. Resize to about 1800 px on the long side and export as JPEG under ~500 KB
   (Squoosh.app or Lightroom export both work).
2. Put them in `assets/photos/`.
3. Add one entry per photo to `_data/photos.yml`:
   ```yaml
   - file: sunset-karnaphuli.jpg
     title: "Evening on the Karnaphuli"
     place: "Chattogram"
     year: 2026
     alt: "Boats silhouetted against an orange sky on a wide river"
   ```

## Preview on your own computer (optional)

Requires Ruby. Then:

```bash
bundle install
bundle exec jekyll serve
```

and open http://localhost:4000.
