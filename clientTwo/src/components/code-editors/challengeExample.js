let challenge = {
  title: "Add Different Padding to Each Side of an Element",
  description:
    '<section id="description">\nSometimes you will want to customize an element so that it has different amounts of <code>padding</code> on each of its sides.\nCSS allows you to control the <code>padding</code> of all four individual sides of an element with the <code>padding-top</code>, <code>padding-right</code>, <code>padding-bottom</code>, and <code>padding-left</code> properties.\n</section>',
  instructions:
    '<section id="instructions">\nGive the blue box a <code>padding</code> of <code>40px</code> on its top and left side, but only <code>20px</code> on its bottom and right side.\n</section>',
  challengeType: 0,
  videoUrl: "https://scrimba.com/c/cB7mwUw",
  fields: {
    slug:
      "/learn/responsive-web-design/basic-css/add-different-padding-to-each-side-of-an-element",
    blockName: "Basic CSS",
    tests: [
      {
        text:
          "Your <code>blue-box</code> class should give the top of the elements <code>40px</code> of <code>padding</code>.",
        testString:
          'assert($(".blue-box").css("padding-top") === "40px", \'Your <code>blue-box</code> class should give the top of the elements <code>40px</code> of <code>padding</code>.\');',
      },
      {
        text:
          "Your <code>blue-box</code> class should give the right of the elements <code>20px</code> of <code>padding</code>.",
        testString:
          'assert($(".blue-box").css("padding-right") === "20px", \'Your <code>blue-box</code> class should give the right of the elements <code>20px</code> of <code>padding</code>.\');',
      },
      {
        text:
          "Your <code>blue-box</code> class should give the bottom of the elements <code>20px</code> of <code>padding</code>.",
        testString:
          'assert($(".blue-box").css("padding-bottom") === "20px", \'Your <code>blue-box</code> class should give the bottom of the elements <code>20px</code> of <code>padding</code>.\');',
      },
      {
        text:
          "Your <code>blue-box</code> class should give the left of the elements <code>40px</code> of <code>padding</code>.",
        testString:
          'assert($(".blue-box").css("padding-left") === "40px", \'Your <code>blue-box</code> class should give the left of the elements <code>40px</code> of <code>padding</code>.\');',
      },
    ],
  },
  required: [],
  files: {
    indexhtml: {
      key: "indexhtml",
      ext: "html",
      name: "index",
      contents:
        '<style>\n  .injected-text {\n    margin-bottom: -25px;\n    text-align: center;\n  }\n\n  .box {\n    border-style: solid;\n    border-color: black;\n    border-width: 5px;\n    text-align: center;\n  }\n\n  .yellow-box {\n    background-color: yellow;\n    padding: 10px;\n  }\n\n  .red-box {\n    background-color: crimson;\n    color: #fff;\n    padding-top: 40px;\n    padding-right: 20px;\n    padding-bottom: 20px;\n    padding-left: 40px;\n  }\n\n  .blue-box {\n    background-color: blue;\n    color: #fff;\n  }\n</style>\n<h5 class="injected-text">margin</h5>\n\n<div class="box yellow-box">\n  <h5 class="box red-box">padding</h5>\n  <h5 class="box blue-box">padding</h5>\n</div>\n',
      head: "",
      tail: "",
    },
    indexjs: null,
    indexjsx: null,
  },
};
