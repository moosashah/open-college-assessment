import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../../db";
import { users } from "../../db/schema";
import type { Credentials } from "../types";
import { JWT_SECRET } from "../../context";

export const register = async ({ username, password, role }: Credentials) => {
  const existingUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  });

  if (existingUser) {
    throw new Error("Username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const [newUser] = await db
    .insert(users)
    .values({
      username,
      password: hashedPassword,
      role: role ? role : "USER",
    })
    .$returningId();

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, newUser.id),
  });

  const token = jwt.sign({ userId: user!.id }, JWT_SECRET);

  return {
    token,
    user,
  };
};

export const login = async ({ username, password }: Credentials) => {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET);

  return {
    token,
    user,
  };
};
