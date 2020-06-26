module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack', 'svg-inline-loader'],
  })
  
  return config
}