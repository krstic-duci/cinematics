# Cinematics

## Data and images are coming from the TMDB, all credits goes to them

## Setup
### Since this is a CRA template, please install dependencies via
```js
npm install
```
and start localhost via
```js
npm start
``` 

### Demo: https://cinematics-tmdb.netlify.app/

#### Possible improvements:
- Better color pallete and overall UX/UI
- Better accessibility
- ErrorBoundary Component
- In order not to lose state when switching between routes consider redux for movies
- Setting api key for every request or use axios (also would fix the custom fetch() call in Movies.tsx)
- Make HOC for `<Provider />` for `*.test.tsx` files
- Add movie trailers
- e2e tests if needed
