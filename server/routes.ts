import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import fetch from "node-fetch"; // Import node-fetch for API calls

// Replace these with environment variables for security in production
const TELEGRAM_BOT_TOKEN = "8040926975:AAGykd2mfNLTeKsl8xmlJmUDX2qQh37dcGc";
const TELEGRAM_CHAT_ID = "5627376552";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = contactFormSchema.parse(req.body);
      
      // Store the message in storage
      const message = await storage.createMessage({
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message
      });

      // Construct the Telegram message
      const telegramMessage = `
📬 *New Contact Message*

*Name:* ${validatedData.name}
*Email:* ${validatedData.email}
*Subject:* ${validatedData.subject}
*Message:*
${validatedData.message}
      `;

      // Send the message to Telegram
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: "Markdown"
        })
      });

      // Respond with success
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