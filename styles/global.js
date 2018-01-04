const FONTS = require('./fonts')
const { black, lightGray, color1 } = require('./colors')

module.exports = `
  * {
    appearance: none;
    backface-visibility: hidden;
    border: none;
    box-sizing: border-box;
    color: ${black};
    font-family: ${FONTS.default}, sans-serif;
    list-style-type: none;
    margin: 0;
    outline: none;
    padding: 0;
    position: relative;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
  }

  ::selection {
    background-color: ${color1};
    color: white;
  }

  html {
    font-size: 62.5%;
  }
`
