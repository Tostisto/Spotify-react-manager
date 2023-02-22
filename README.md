# Spotipy React App

This is a simple React app that uses the Spotipy Flask API backend to interact with the Spotify Web API. It provides a user interface for searching for tracks, albums, and artists, as well as managing playlists.

## Getting Started

To get started, you'll need to set up a few things:

## Prerequisites
- Node.js
- npm
- The Spotipy Flask API backend app running on http://127.0.0.1:8000

## Setup
1. Clone this repository:
```bash
git clone https://github.com/tostisto/spotipy-react-app.git
cd spotipy-react-app
```

2. Install the required packages:
```bash
npm install
```

3. Start the app:
```bash
npm start
```

The app should now be running at http://localhost:3000.

## Usage
The app provides the following features:

## Search
The search page allows you to search for tracks, albums, and artists. You can enter a search query and select the type of item you want to search for.

## Album Details
Clicking on an album in the search results will take you to the album details page. Here you can see more information about the album, including its tracks and cover art.

## Playlist Management
The playlist page allows you to manage your Spotify playlists. You can view your playlists, remove it and remove tracks from a playlist.

## Todo
- Improve the user interface to make it more responsive and visually appealing.
- Add the ability to add tracks to a playlist from the album details page.
- Show related tracks on the album details page based on the current track or album.
- Display more information about the currently playing track, such as the track duration and progress.
- Show the currently active Spotify device and allow the user to change it if desired.

## License
This project is licensed under the MIT License - see the LICENSE file for details.