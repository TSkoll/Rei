module.exports = {
  apps: [
    {
      name: "Rei",
      script: "./bin/index.js",
      error_file: "err.log",
      out_file: "out.log",
      log_file: "all.log",
      time: false, // Rei log output already has date and time included
      listen_timeout: 5000,
      exp_backoff_restart_delay: 500,
    },
  ],

  deploy: {
    production: {
      user: process.env.user,
      host: process.env.host,
      key: "./server.key",
      ref: "origin/senpai",
      repo: "https://github.com/TSkoll/rei-ts.git",
      path: "/home/ubuntu/rei-ts",
      "pre-deploy": "node -v && npm -v",
      "post-deploy":
        "mkdir -p ./data && cp /home/ubuntu/config.json ./data/config.json && npm run clean && npm run build && pm2 reload ecosystem.config.js --env production",
      env: {
        GOOGLE_APPLICATION_CREDENTIALS: "/home/ubuntu/hentsu-gcloud-sa.json",
      },
    },
  },
};
