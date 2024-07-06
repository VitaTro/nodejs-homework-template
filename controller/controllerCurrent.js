export const current = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.json({
    code: 200,
    data: {
      email: email,
      subscription: subscription,
    },
  });
};
