import projectEcommerce from "@/assets/project-ecommerce.jpg";
import projectPortfolio from "@/assets/project-portfolio.jpg";
import projectBlog from "@/assets/project-blog.jpg";
import projectTaskapp from "@/assets/project-taskapp.jpg";
import projectRestaurant from "@/assets/project-restaurant.jpg";
import projectDashboard from "@/assets/project-dashboard.jpg";
import projectWeather from "@/assets/project-weather.jpg";
import projectLms from "@/assets/project-lms.jpg";
import projectRealestate from "@/assets/project-realestate.jpg";
import projectFitness from "@/assets/project-fitness.jpg";
import projectChat from "@/assets/project-chat.jpg";

import blogReact from "@/assets/blog-react.jpg";
import blogNextjs from "@/assets/blog-nextjs.jpg";
import blogMongodb from "@/assets/blog-mongodb.jpg";
import blogTailwind from "@/assets/blog-tailwind.jpg";
import blogFirebase from "@/assets/blog-firebase.jpg";
import blogPerformance from "@/assets/blog-performance.jpg";

// Map project titles to local images (fallback when no DB image URL)
const projectImages: Record<string, string> = {
  "E-Commerce Platform": projectEcommerce,
  "Portfolio Website": projectPortfolio,
  "Blog Platform": projectBlog,
  "Task Management App": projectTaskapp,
  "Restaurant Website": projectRestaurant,
  "Social Media Dashboard": projectDashboard,
  "Weather Application": projectWeather,
  "Learning Management System": projectLms,
  "Real Estate Listing": projectRealestate,
  "Fitness Tracker": projectFitness,
  "Chat Application": projectChat,
  "Invoice Generator": projectDashboard,
  "News Aggregator": projectBlog,
  "WordPress Theme": projectPortfolio,
  "Job Board Portal": projectEcommerce,
};

const blogImages: Record<string, string> = {
  "Mastering React Hooks: A Complete Guide": blogReact,
  "What's New in Next.js 14: Features & Migration": blogNextjs,
  "MongoDB Best Practices for Modern Apps": blogMongodb,
  "Building Beautiful UIs with Tailwind CSS": blogTailwind,
  "Firebase Authentication: Complete Implementation": blogFirebase,
  "Web Performance Optimization Techniques": blogPerformance,
};

export const getProjectImage = (title: string, dbImage?: string | null): string => {
  if (dbImage && dbImage.startsWith("http")) return dbImage;
  return projectImages[title] || projectEcommerce;
};

export const getBlogImage = (title: string, dbImage?: string | null): string => {
  if (dbImage && dbImage.startsWith("http")) return dbImage;
  return blogImages[title] || blogReact;
};
