# Panini FIFA World Cup 2026 — Sticker Tracker

A personal web app to track your Panini sticker album. Mark stickers as owned, track duplicates, and compare lists with friends.

This is an unofficial fan-made tracker. It is not affiliated with, endorsed by, or sponsored by Panini, FIFA, or the FIFA World Cup.

---

## Preview

### Album Tracker

![Album tracker screen showing sticker progress, owned stickers, and extras](docs/album-view.png)

### Compare Lists

![Compare screen showing trade matches from another collector's sticker list](docs/compare-view.png)

---

## Features

- Track owned, missing, and duplicate stickers.
- Filter the album by all stickers, missing stickers, owned stickers, or extras.
- Export the current filtered view as a `.txt` list.
- Compare a friend's extras or missing list against your own collection.
- Save all progress locally in plain JSON files.

---

## Requirements

You need **Node.js 18 or newer** installed on your computer. If you're not sure whether you have it:

1. Open a terminal (on Mac: press `Cmd + Space`, type `Terminal`, press Enter)
2. Type this and press Enter:
   ```sh
   node --version
   ```
3. If you see version 18 or newer (like `v20.0.0`), you're good. If not, download Node.js from [nodejs.org](https://nodejs.org) and install it (choose the **LTS** version).

---

## Installation

1. Download or copy this project folder to your computer.

2. Open a terminal and navigate to the project folder:
   ```sh
   cd path/to/fwcAlbumApp
   ```
   *(Replace `path/to/fwcAlbumApp` with the actual path, e.g. `cd Documents/fwcAlbumApp`)*

3. Install dependencies:
   ```sh
   npm install
   ```
   You only need to do this once.

---

## Running the App

Start the server:
```sh
npm start
```

You should see:
```text
FWC 2026 Album running at http://localhost:3000
```

Open your browser and go to:
```text
http://localhost:3000
```

To stop the server, go back to the terminal and press `Ctrl + C`.

### Running in the background

If you want the server to keep running after you close the terminal, install **pm2**:
```sh
npm install -g pm2
```

Then manage the app with:
```sh
pm2 start server.js --name fwcAlbumApp    # start
pm2 stop fwcAlbumApp                      # stop
pm2 restart fwcAlbumApp                   # restart
pm2 startup                               # auto-start when your computer boots
```

---

## Usage

### Album tab

- **Click a sticker once** → turns green (you own it)
- **Click again** → a red badge appears showing `+1` (one duplicate)
- **Each additional click** → badge count increases (`+2`, `+3`, …)
- **Right-click a sticker** → removes one count (undo)

Use the filter buttons to view:
- **All** — every sticker
- **Missing** — stickers you don't have yet
- **Owned** — stickers you have
- **Extras** — stickers you have duplicates of

Use the **Export** button to download the current view as a `.txt` file. The filter you have active determines what gets exported — for example, switch to *Extras* before exporting to share your duplicate list with a friend.

### Compare tab

Use this to match lists with a friend — find out what you can trade.

1. Enter their **name** (optional, just for labeling)
2. Choose the mode:
   - **Their Extras → my missing** — paste their extras list to see which ones you still need
   - **Their Missing → my extras** — paste their missing list to see which ones you can give them
3. Paste their exported list into the text area
4. Click **Compare**

Results are saved and will still be there when you reload the page. Click **Remove** on any card to delete it.

---

## Your Data

All your progress is saved in a file called `data.json` in the app folder. Compare history is saved in `compare.json`. These are plain text files — you can open them, back them up, or copy them to another computer.

Your data is **not** stored in the cloud. It lives entirely on your machine.

### Importing an existing list

If you already have your sticker list written down somewhere (paper, spreadsheet, photos, etc.), you can use an AI tool like ChatGPT, Claude, or Gemini to convert it into the right format. Use this prompt:

---

> I have a Panini FIFA World Cup 2026 sticker album tracker app. I need you to convert my sticker list into a specific JSON format.
>
> **Target format:**
> ```json
> { "ARG1": 1, "ARG5": 1, "MEX3": 2, "FRA7": 3 }
> ```
>
> Rules:
> - Key = sticker ID (country code prefix + number, e.g. `ARG1`, `MEX3`, `FWC5`, `CC2`, `00`)
> - Value = total count: `1` means I own it, `2` means I own it and have 1 extra, `3` means 2 extras, and so on
> - Only include stickers I own (value ≥ 1). Omit everything I'm missing
> - Valid prefixes: `00` (Panini logo), `FWC1`–`FWC19` (special), `CC1`–`CC14` (Coca-Cola), and these team codes: ALG ARG AUS AUT BEL BIH BRA CAN CPV COL CRO CUW CZE COD ECU EGY ENG FRA GER GHA HAI IRN IRQ JPN JOR MAR MEX NED NZL NOR PAN PAR POR QAT KSA SCO SEN RSA KOR ESP SWE SUI TUN TUR USA URU UZB (each 1–20)
>
> **My list:**
> [paste your list here in whatever format you have it]
>
> Return only the raw JSON object, no explanation.

---

Once you get the JSON back, save it as `data.json` in the app folder (replacing the existing file if there is one), then reload the app in your browser.
