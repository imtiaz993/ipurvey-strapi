module.exports = {
  apps: [
    {
      name: "ipurvey-cms-stg-latest",
      script: "yarn",
      interpreter: "bash",
      env_production: {
        NODE_ENV: "production",
      },
      args: "production",
    },
  ],
};
