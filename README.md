# For Eniola, with love

A static birthday website made with HTML, CSS, and vanilla JavaScript.

## Deploy

This is a static site: there is no build step, npm install, or server configuration required.

Upload the **entire contents** of this folder to the hosting provider's publish/root directory. Keep the files and folders together in this structure:

```text
index.html
styles.css
script.js
photos/
  eniola-01-favorite.jpeg
  eniola-02-black-white.jpeg
  eniola-03-selfie.jpeg
  eniola-04-pout.jpeg
  eniola-05-peace.jpeg
  eniola-06-smile.jpeg
  eniola-07-smile.jpeg
  eniola-08-selfie.jpeg
music/
  fola-treat-u-right.mp3
```

For Netlify, you can drag this project folder into Netlify Drop. For GitHub Pages, push these files to a repository and enable Pages for the branch and folder containing `index.html`. Other static hosts work too. Do not upload only `index.html`; the stylesheet, JavaScript, and media folders are required.

## Personalize

Edit the `birthday` object near the top of `script.js` to change the name, date, message, photos, memories, compliments, letter, and soundtrack. The eight photos currently used by the page are in `photos/`, and the soundtrack is in `music/`.

- Keep the `photos/` and `music/` folders beside these files when deploying; the page references their files using relative paths.
- Replace a photo by adding the new file to `photos/` and updating the matching `src` entry in `script.js`.
- The current soundtrack is `music/fola-treat-u-right.mp3`. Replace it by updating `musicSrc` in `script.js`.
- Replace the example memories with your own dates and stories.
- Music starts after the visitor presses the music button because browsers generally block autoplay.
