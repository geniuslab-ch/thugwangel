# Thugwangel Website - User Instructions

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

- `gallery_01.jpeg`
- `gallery_02.jpeg`
- ...
- `gallery_12.jpeg`

(Note: If you use `.jpg` or `.png`, you will need to update `components/Gallery.tsx` to look for those extensions instead of `.jpeg`).

### 3. Artist Bio Image
Place your main artist photo in `public/images/` and name it:
- `artist.png`

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
