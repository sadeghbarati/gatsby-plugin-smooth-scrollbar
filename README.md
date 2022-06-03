# Gatsby smooth-scrollbar

## Todos

[ ] window.navigator is not defined in server-side, check navigator gatsby-browser
[ ] add gsap scrollTrigger
```js
{
  resolve: require.resolve('../plugin'),
  options: {
    gsap: true, // ScrollTrigger
    scrollbarOptions: {
      plugins: {
        overscroll: {
          enable: true,
          effect: 'bounce',
          damping: 0.2,
          maxOverscroll: 150,
          glowColor: '#222a2d',
        },
      }
    }
  }
},
```
[ ] Cuberto github smooth-scrollbar plugins
