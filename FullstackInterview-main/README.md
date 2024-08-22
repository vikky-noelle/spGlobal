# Cappitech Fullstack Test: React

## Objectives

The screencast will show you a working app which fetches and displays images from the Flickr api feed along with some functionality.  
You are given a React typescript project (create-react-app) with every element ready inside a single App.tsx component.

### Frontend

- Implement the features from the screencast
- Split the main component into smaller components
- Use functions and hooks for components, reducers for data
- Add relevant styling, which does not necessarily have to match the screencast, but has to provide a proper UX
- Extra: make the app responsive down to mobile

### Backend

- Create a web api fetching the right images and providing relevant data to the UI
- Although dotnet is preferred, you can use any language of your preference

## Screencast

See the [screencast.mp4](https://gitlab.ihsmarkit.com/grrs/teams/fullstack/fullstack-test/-/blob/2d2cf3137e1eba1ffe2dc07bff58f5c07a7f9588/fs-test-react/screencast.mp4) video in the source code.

## Feature List

Here are the features of the demo app:

- Fetch images using tags from the user input
- Select whether to append or replace existing images
- Clear the currently loaded images
- Filter the currently loaded images by title
- Sort the images by title

## Flickr API

- Endpoint URL: `https://api.flickr.com/services/feeds/photos_public.gne?nojsoncallback=1`
- Note the _nojsoncallback=1_ parameter, it tells the endpoint return json directly
- Doc: [https://www.flickr.com/services/feeds/docs/photos_public](https://www.flickr.com/services/feeds/docs/photos_public)

## Comments

- Focus on producing quality code.
- We would prefer a well-coded half project over a badly-coded full project.
