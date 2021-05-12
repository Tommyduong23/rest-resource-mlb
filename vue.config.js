module.exports = {
  publicPath: '/rest-resource-mlb/',
  transpileDependencies: ['vuetify'],
  chainWebpack: config => {
    config.plugin('VuetifyLoaderPlugin').tap(args => [{
      match (originalTag, { kebabTag, camelTag, path, component }) {
        if (kebabTag.startsWith('mlb-')) {
          return [camelTag, `import ${camelTag} from '@/components/${camelTag.substring(3)}.vue'`]
        }
      }
    }])
  },
}
