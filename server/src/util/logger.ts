import * as Winston from "winston";

export default Winston.createLogger({
  level: "debug",
  transports: [new Winston.transports.Console()],
});
