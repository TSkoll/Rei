module.exports = {
  apps: [
    {
      name: "Emi",
      script: "./bin/index.js",
      watch: "./src/",
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
      "post-deploy":
        "mkdir ./data && cp /home/ubuntu/config.json ./data/config.json && npm run build && pm2 reload ecosystem.config.js --env production",
    },
  },
};
