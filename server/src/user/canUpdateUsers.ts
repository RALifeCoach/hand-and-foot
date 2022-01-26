function canUpdateUsers(req: any, res: any, next: () => void) {
  if (req.role === 'general') {
    res.status(500).json({error: "Not Authorized"});
    throw new Error("Not Authorized");
  }

  next();
}

export default canUpdateUsers;
