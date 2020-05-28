module.exports = {
  apps: [
    {
      name: "Emi",
      script: "./bin/index.js",
      watch: "./src/",
      listen_timeout: 5000,
    },
  ],

  deploy: {
    production: {
      user: process.env.user,
      host: process.env.host,
      key: "./server.key",
      ref: "origin/master",
      repo: "https://github.com/TSkoll/rei-ts.git",
      path: "/home/ubuntu/rei-ts",
      "pre-deploy": "node -v && npm -v",
      "post-deploy":
        "mkdir -p ./data && cp /home/ubuntu/config.json ./data/config.json && npm run clean && npm run build && pm2 reload ecosystem.config.js --env production",
    },
  },
};
