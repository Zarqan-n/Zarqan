import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Contact form submission endpoint
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = contactFormSchema.parse(req.body);
      
      // Store the message
      const message = await storage.createMessage({
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message
      });
      
      return res.status(200).json({ 
        success: true, 
        message: "Message sent successfully", 
        data: message 
      });
    } catch (error) {
      // Check if it's a validation error and format it nicely
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: validationError.details 
        });
      }
      
      // Generic error handling
      return res.status(500).json({ 
        success: false, 
        message: "Failed to send message" 
      });
    }
  });

  // Fetch all messages (for testing/admin purposes)
  app.get('/api/messages', async (req: Request, res: Response) => {
    try {
      const messages = await storage.getMessages();
      return res.status(200).json({ 
        success: true,
        data: messages 
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch messages" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
