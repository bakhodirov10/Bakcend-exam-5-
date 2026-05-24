const { z } = require("zod");

const userSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

module.exports = userSchema;
