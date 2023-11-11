function getEnv() {
  let targetEnv = process.env.NODE_ENV || 'development'
  // Prefer `--env test` and `--env=test` command line arguments if provided
  process.argv.forEach((val, i) => {
    if (val === '--env' && process.argv[i + 1]) {
      targetEnv = process.argv[i + 1]
    } else if (val.startsWith('--env=') && val.length > 6) {
      targetEnv = val.slice(6)
    }
  })
  return targetEnv
}

module.exports = {
  getEnv
}
