module.exports = {
    env: {
        customKey: 'my-value',
      },
    basePath: '/build',
    generateBuildId: async () => {
        // You can, for example, get the latest git commit hash here
        return '6pvB7dQ_TDoL-wY_jenGC'
      },
  }