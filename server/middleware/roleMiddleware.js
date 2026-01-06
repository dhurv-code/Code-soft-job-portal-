export const employerOnly = (req, res, next) => {
  if (req.user.role !== "employer") {
    return res.status(403).json({ message: "Employer access only" });
  }
  next();
};
