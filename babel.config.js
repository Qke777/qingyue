module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ["import", {
      "libraryName": "wot-design",
      "style": true
    }],
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    },"vant"]
  ]
}
