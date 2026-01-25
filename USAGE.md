# Thugwangel Website - User Instructions

> **URGENT: IMAGE UPDATE**
> To fix the missing images, I have temporarily filled the gallery with copies of your `artist.png`.
> The website should now show images everywhere.
> **ACTION REQUIRED:** You must replace these duplicate files (`gallery_01.png` to `gallery_12.png`) with your real photos by overwriting them in the `public/images/` folder and pushing to GitHub.

## Adding Your Media

Since your previous upload might have failed due to file size limits (or because you are working in a different environment), please follow these instructions to manually add your files.

### 1. Music (11 Tracks)
Go to the `public/music/` folder. You need to add 11 MP3 files.
Rename them exactly as follows so the player can find them:

- `track_01.mp3`
- `track_02.mp3`
- `track_03.mp3`
- `track_04.mp3`
- `track_05.mp3`
- `track_06.mp3`
- `track_07.mp3`
- `track_08.mp3`
- `track_09.mp3`
- `track_10.mp3`
- `track_11.mp3`

**Note on File Size:** Git has a limit on file sizes (usually around 100MB). MP3s are usually safe (3-10MB), but if you have WAV files, convert them to MP3 first.

### 2. Gallery Images (12 Images)
Go to the `public/images/` folder. You need to add 12 images.
Rename them exactly as follows:

- `gallery_01.png`
- `gallery_02.png`
- ...
- `gallery_12.png`

(Note: The gallery component specifically looks for `.png` extensions. If you use `.jpg`, you will need to update `components/Gallery.tsx`).

### 3. Artist Bio Image
The Bio section now uses one of the gallery images:
- `gallery_11.png`

(Note: The file `artist.png` is no longer used by the website code, but you can keep it as a backup).

---

## How to Run & Deploy / Comment Lancer et Déployer

You asked: *"Where do I run `npm run dev`? I use GitHub and Vercel."*

### Scenario A: You are working on your own computer (Local)
If you have downloaded the code to your computer to make changes:
1.  Open your **Terminal** (Mac/Linux) or **Command Prompt/PowerShell** (Windows).
2.  Navigate to the project folder (`cd path/to/folder`).
3.  Type `npm install` (only the first time).
4.  Type `npm run dev`.
5.  Open your browser to `http://localhost:3000`.

### Scenario B: You are using GitHub & Vercel (Cloud)
**You do NOT need to type `npm run dev`.**
1.  Make your changes to the files (e.g., uploading the music/images).
2.  **Commit and Push** these changes to your GitHub repository.
3.  **Vercel** is connected to your GitHub. It will see the new code, automatically run the build command, and update the website.
4.  Just wait a minute or two, then check your website URL.

---

## Updates Made
- **Videos:** Updated the Videos section with the 4 YouTube links you provided.
- **Gallery:** Added a new "Gallery" section to the homepage and navigation.
- **Music:** Configured the player to look for 11 songs.

---

## Troubleshooting 404 Errors

### 1. "404 Not Found" on the Domain
If your domain `thug-angel.ch` shows a 404 error:
- **Vercel:** Ensure you have added the domain in the Vercel Dashboard (Settings > Domains).
- **GitHub Pages:** If you are using GitHub Pages, you must create a file named `CNAME` in the `public/` folder containing just `thug-angel.ch`.

### 2. Missing Images (404 on specific files)
If you see errors like `Failed to load resource... gallery_06.png`:
- You must **upload the actual image files** to the `public/images/` folder.
- They must be `.png` files.
- You must **commit and push** them to GitHub.
- See `public/images/MISSING_IMAGES.txt` for the full list.
