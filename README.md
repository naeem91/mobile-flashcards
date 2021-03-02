# Mobile Flashcards

Mobile Flashcards is a React Native/Expo application that lets the users create collections of flashcards. The flashcards are created into different categories called "decks", the users then take quiz on them.

This application is designed for and tested with Android.

## Installation

Install all project dependencies with:
```bash
yarn Install
```
Start the development server with:
```bash
yarn web
```

This will also open the Expo developer Tool in the browser. Scan the QR code from the terminal or from the  the Expo developer Tool using your Android Expo client app to run the application in your device.  

## Notification Settings

The app shows a notification message when a user has not completed any quiz for a configured duration of time.

Notification settings are configurable using `app.json`

```javascript
  ...
  "notificationSettings": {
    "hour": 12,     // At what hour and minute of the day to trigger notification. Hour is in 24hrs format.
    "minute": 0,  
    "duration": 24  /*  gap in hours since the last completed quiz.
                        If that duration is passed without study than notification
                        is displayed to the user otherwise not.
                   */
  }
```
