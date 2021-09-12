module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/assets/scss/variables.scss";
          @import "@/assets/scss/style.scss";
        `
      }
    }
  },
  devServer: {
    port: 3001
  },
}
