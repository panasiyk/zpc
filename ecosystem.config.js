module.exports = {
  apps: [
    {
      name: 'zpc-admin',
      exec_mode: 'cluster',
      instances: 1,
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}
