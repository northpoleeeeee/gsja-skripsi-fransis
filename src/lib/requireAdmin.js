// lib/requireAdmin.js
import { getSession } from 'next-auth/react';

export async function requireAdmin(handler) {
  return async (req, res) => {
    const session = await getSession({ req });

    console.log('Session in requireAdmin:', session); // Logging for debugging
    if (!session || session.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Continue to the API route handler if authorized
    return handler(req, res);
  };
}
