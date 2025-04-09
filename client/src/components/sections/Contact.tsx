import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import type { ContactFormData } from "@/types";

export default function Contact() {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const entry = useIntersectionObserver(sectionRef, {});
  const isVisible = !!entry?.isIntersecting;
  
  // Form handling
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });
  
  // Contact form mutation
  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
        variant: "default"
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive"
      });
    }
  });
  
  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 md:py-32 contact-section relative"
    >
      <motion.div 
        className="absolute inset-0 bg-primary-600/5 dark:bg-secondary-400/5 -skew-y-3 z-0"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <div className="inline-block mb-6">
            <span className="text-sm font-medium text-white py-1 px-4 bg-white/20 backdrop-blur-sm rounded-full border border-white/20">GET IN TOUCH</span>
          </div>
          
          <h2 className="text-4xl font-montserrat font-bold mb-4 text-white">
            Let's Start a <span className="gradient-text">Conversation</span>
          </h2>
          
          <p className="text-white/80 max-w-2xl mx-auto">
            Have a project in mind or want to explore possibilities? I'm always open to discussing new opportunities and challenges.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            className="bg-white/20 backdrop-blur-sm p-8 rounded-xl shadow-md border border-white/30"
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
          >
            <h3 className="text-2xl font-montserrat font-bold mb-6 text-white">Send Me a Message</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                    Your Name
                  </label>
                  <input
                    {...form.register("name")}
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-white/50 transition"
                    placeholder="John Doe"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-300 text-sm mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                    Email Address
                  </label>
                  <input
                    {...form.register("email")}
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-white/50 transition"
                    placeholder="john@example.com"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-300 text-sm mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-white mb-1">
                    Subject
                  </label>
                  <input
                    {...form.register("subject")}
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-white/50 transition"
                    placeholder="Project Inquiry"
                  />
                  {form.formState.errors.subject && (
                    <p className="text-red-300 text-sm mt-1">
                      {form.formState.errors.subject.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-1">
                    Your Message
                  </label>
                  <textarea
                    {...form.register("message")}
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-white/50 transition resize-none"
                    placeholder="Hello, I'd like to discuss a project..."
                  />
                  {form.formState.errors.message && (
                    <p className="text-red-300 text-sm mt-1">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>
                
                <motion.button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-500 disabled:opacity-70 border border-white/20"
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-center">
                    {mutation.isPending ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <i className="fas fa-paper-plane ml-2"></i>
                      </>
                    )}
                  </div>
                </motion.button>
              </form>
            </Form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.4 }}
          >
            <h3 className="text-2xl font-montserrat font-bold mb-6 text-white">Let's Connect</h3>
            
            <p className="text-white/80 mb-8">
              Feel free to reach out through any of these channels. I'm always eager to collaborate on exciting projects or just have a chat about technology and design.
            </p>
            
            <div className="space-y-6">
              <motion.div 
                className="flex items-start"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="bg-white/30 w-12 h-12 rounded-full flex items-center justify-center mr-4 shrink-0">
                  <i className="fas fa-envelope text-white"></i>
                </div>
                <div>
                  <h4 className="font-montserrat font-bold text-white mb-1">Email</h4>
                  <a href="mailto:hello@zarqan.dev" className="text-purple-300 hover:underline">
                    hello@zarqan.dev
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="bg-white/30 w-12 h-12 rounded-full flex items-center justify-center mr-4 shrink-0">
                  <i className="fas fa-map-marker-alt text-white"></i>
                </div>
                <div>
                  <h4 className="font-montserrat font-bold text-white mb-1">Location</h4>
                  <p className="text-white/80">San Francisco, California</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="bg-white/30 w-12 h-12 rounded-full flex items-center justify-center mr-4 shrink-0">
                  <i className="fas fa-share-alt text-white"></i>
                </div>
                <div>
                  <h4 className="font-montserrat font-bold text-white mb-1">Social Media</h4>
                  <div className="flex space-x-4 mt-2">
                    {[
                      { icon: "github", url: "https://github.com" },
                      { icon: "linkedin", url: "https://linkedin.com" },
                      { icon: "twitter", url: "https://twitter.com" },
                      { icon: "dribbble", url: "https://dribbble.com" }
                    ].map((social, index) => (
                      <motion.a 
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/80 hover:text-purple-300 transition-colors"
                        whileHover={{ y: -5 }}
                        whileTap={{ y: 0 }}
                      >
                        <i className={`fab fa-${social.icon} text-xl`}></i>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="mt-10 p-6 bg-white/30 backdrop-blur-sm rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 }}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <h4 className="font-montserrat font-bold text-white mb-3">Availability</h4>
              <p className="text-white/80 mb-3">
                Currently open to new projects and collaborations starting:
              </p>
              <p className="text-purple-300 font-medium">November 2023</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
