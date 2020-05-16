import isAuthorized from "./isAuthorized";

const AuthCheckMiddleware = (req: any, res: any, next: () => void) => {
  if (typeof req.headers.authorization !== "undefined") {
    const token = req.headers.authorization;
    new Promise<any>((resolve: any, reject: any) => {
      isAuthorized(token, req.clientId, resolve, reject);
    })
      .then((user: any) => {
        req.role = user.role;
        req.userId = user.id;
        return next();
        next();
      })
      .catch(() => {
        res.status(500).json({ error: "Not Authorized" });
      });
  } else {
    res.status(500).json({ error: "Not Authorized" });
  }
};

export default AuthCheckMiddleware;
