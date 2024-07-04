export interface Video {
  id: string;
  title: string;
  description: string;
  video_file:  { id: string };
  thumbnail: { id: string };
  tags: string[];
  duration: number;
  views: number;
  upload_date: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role?: string;
}