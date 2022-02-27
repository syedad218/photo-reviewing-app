# Photo Reviewing App

- Install Node >= 12.x
- Install dependencies using `npm install`
- Run `npm start` to start the application
- Visit http://localhost:3000 to see the application in action

## Application Structure

- The app has three sections:

  - The first section is the liked photos slider section.
  - The second section is the random photo preview section.
  - The third section is the photo actions section.

- Top section is populated by the photos that have been liked by the user ordered by the liked time(most recent first). For first time users the list will be empty.
- Center section is populated by a random photo fetched using the Unsplash API. [Get Random Photo using Unsplash API](https://unsplash.com/documentation/#get-a-random-photo)
- Bottom section is populated by actions that can be performed on the random photo. namely, like or dislike the photo.
- The user can like or dislike the photo by clicking on the like/dislike button.
- Once the user likes the photo, the photo is inserted at first position to the top section.
- If the user dislikes the photo, user is presented with a new random photo.
- All actions are persisted in the firestore database.
- Upon reloading the app, the liked photos slider section will be populated with the photos that have been already liked by the user and the random photo section will be populated with where the user left.

  <img src="./docs/app_screen_info.jpeg" width="420" height="670">

- The liked photo slider fetches more previously liked photos from the firestore database as the user scrolls past the existing list of photos. (photos are fetched 30 at a time to optimise read query).

- disliked photos are persisted in the firebase database to be used for filtering random images fetched from external Unsplash API to avoid displaying previously disliked photos.
- If the user disliked an already liked photo, the photo is removed from the liked photos for the user.
- If the user liked an already liked photo, the photo is moved to the top of the liked photos slider section with updated liked time.

## Database Structure

> Collection and Document structure for the app in firestore.

    .
    ├── Users                            # Collection
    │   ├── user_id                      # String
    │   │   liked_photos                 # Subcollection
    │   │   │   ├── photo_id             # String
    │   │   │   ├── liked_time           # Timestamp
    │   │   │   └── photo_url            # String
    │   │   disliked_photos              # Subcollection
    │   │   │   ├── photo_id             # String
    │   │   │   └── photo_url            # String
    │   │   random_photos                # Array [30]
    │   │   currentRandomImageIndex      # Number

> Random photos is an Array of object with same schema as liked photos/ disliked photos. Random photos are stored 30 at a time in the firestore database. when currentRandomImageIndex is equal to 30, the next 30 photos are fetched from the unsplash API and stored in the db (to optimise API calls).

## Technologies Used :fire:

- React.js [https://reactjs.org/](https://reactjs.org/)
- TypeScript [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
- Redux [https://redux.js.org/](https://redux.js.org/)
- Firebase [https://firebase.google.com/](https://firebase.google.com/)
- Unsplash API [https://unsplash.com/documentation](https://unsplash.com/documentation)
- Firestore [https://firebase.google.com/docs/firestore/](https://firebase.google.com/docs/firestore/)
- Styled Components [https://www.styled-components.com/](https://www.styled-components.com/)
- Redux-saga [https://redux-saga.js.org/](https://redux-saga.js.org/)
- Immer [https://immerjs.github.io/immer/](https://immerjs.github.io/immer/)
- Lodash [https://lodash.com/](https://lodash.com/)
- Axios [https://axios-http.com/docs/intro](https://axios-http.com/docs/intro)

### App Link:- [https://syedad218.github.io/photo-reviewing-app/](https://syedad218.github.io/photo-reviewing-app/)
