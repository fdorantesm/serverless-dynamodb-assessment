export function getEnvConfig() {
  return {
    env: process.env.NODE_ENV || 'local',
  };
}
