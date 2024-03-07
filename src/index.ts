import { config } from "./api/config/dev";
import logger from "./api/core/log";
import app from "./app";

app.listen(config.port, () => {
  logger.info(`App is running on ${config.port}`);
});
