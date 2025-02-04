import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "./db";
import { User } from "./db/schema";

export const JWT_SECRET = "SUPER_SECRET_KEY";

export interface Context {
  req: Request;
  res: Response;
  user?: User;
}

export const createContext = async ({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<Context> => {
  const context: Context = { req, res };

  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
      const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, decoded.userId),
      });
      if (user) {
        context.user = user;
      }
    } catch (error) {
      // Invalid token - user will remain undefined
    }
  }

  return context;
};

export const requireAuth = (context: Context) => {
  if (!context.user) {
    throw new Error("Authentication required");
  }
  return context.user;
};

export const requireAdmin = (context: Context) => {
  const user = requireAuth(context);
  if (user.role !== "ADMIN") {
    throw new Error("Admin access required");
  }
  return user;
};
