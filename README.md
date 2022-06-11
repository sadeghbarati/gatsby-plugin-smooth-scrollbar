# Gatsby smooth-scrollbar


## Gatsby Custom HTML

[html.js]([HTML.js](https://www.gatsbyjs.com/docs/custom-html/))


## Ways to use `smooth-scrollbar` in gatsby

1. use `custom html.js` in gatsby
1.2 init scrollbar in `gatsby-browser` api, before client rendered you can access `html.js` custom wrapper element you created
1.3 `onClientEntry`
1.4 when you using gatsby `onClientEntry` api, dont init scrollbar on `#___gatsby` element gatsby will update smooth-scrollbar nodes (`scroll-content`) in another wrapper 
2. when you using gatsby `onInitialClientRender` api, you can init scrollbar on `#___gatsby` element
3. init scrollbar in your gatsby site without gatsby-(browser|node|ssr)
4. use a react wrapper for smooth-scrollbar maybe in v9 :smile:


## Gatsby api run order except gatsby site

1. `wrapRootElement` gatsby api
2. `onClientEntry` gatsby api
3. `wrapPageElement` gatsby api
4. **gatsby site**
5. `onInitialClientRender` gatsby api (every thing rendered)

## Todos

* [ ] window.navigator is not defined in server-side, check navigator gatsby-browser
* [x] add gsap scrollTrigger
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
* [ ] Cuberto github smooth-scrollbar plugins


