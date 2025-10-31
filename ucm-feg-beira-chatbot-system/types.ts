export enum Role {
  STUDENT = 'student',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export enum MessageAuthor {
  USER = 'user',
  BOT = 'bot',
}

export interface Message {
  author: MessageAuthor;
  text: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Faq {
  id: string;
  categoryId: string;
  question: string;
  answer: string;
  views: number;
}
