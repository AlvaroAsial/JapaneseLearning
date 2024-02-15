# Japanese Learning App

App that provides a clean and fast interface to learn Japanese characters, with “game-like” elements to keep users engaged. If possible, add features such as optical kanji recognition and drawn kanji recognition. Japanese learning apps tend to be complex and require subscriptions/ads. By focusing just on characters and not on grammar, this app could be a useful and easy-to-use resource for beginner Japanese learners.

## Technologies Used:

- ReactJS: Basis for app development, with JSX.
- Ionic CSS components: for styling and animations.
- Capacitor: for building the app.
- react-swipeable: for allowing swiping between screens on mobile platforms.
- @capacitor-community/sqlite: for offline storage of user quiz progress and character unlocks.
- @capacitor-community/native-audio: for playing the pronunciation files of each characters.
- Monaca (optional): as an environment setup alternative.

## Running the app

For a more detailed view of app setup and running the app, see the below linked blogpost.

### Running on browser:

- `npm install yarn -g`
- `yarn install`
- `yarn dev`

or, if using Monaca:

- `npm i -g monaca`
- `monaca login`
- `monaca preview`

### Running on mobile:

If using yarn:

- `npm install yarn -g`
- `yarn add @capacitor/core @capacitor/ios @capacitor/android`
- `yarn cap add ios`
- `yarn cap add android`
- `yarn cap sync`
- `yarn cap open android`

or, if using Monaca, use Monaca cloud.

## Blogpost

Read a blogpost about this application [here]().

## App structure and additional information

3 main “Sections”:

Hiragana
Katakana
Kanji

Each section allows the user to freely study Japanese characters (through a grid) or take quizzes. Quizzes “unlock” new characters with progression.
For Hiragana/Katakana, the grid/quizzes would match the characters to their english corresponding “sound” translation (i.e.、 こ -> ko). If available, play audio of correct pronunciation.
For the kanji section, clicking on a specific kanji will open a new screen, with info on the kanji and common words that use it. The kanji data will be stored either offline in the app itself (json) or obtained through an API (jisho public API for example). Also, allow users to search kanji.

Other possible features that need more research: 

Optical Kanji Recognition (camera plugin) => Use off-the-shelf tensorflow.js model or train a lightweight one (most likely CNN). Alternatively, look for an API. Keep a list of kanji detected by the user.

Drawn kanji recognition => Similar to above. Use off-the-shelf tensorflow.js model or train one. Alternatively, look for an API. Stroke order would most likely be ignored.

Separate hiragana/katakana/kanji by JLPT levels => To aid in official exam studying. Users would progress in the app by unlocking new characters.

Thank you for reading :)!
