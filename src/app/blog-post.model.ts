export interface BlogPost {
  Id?: number; // Make id optional for new posts
  Text: string;
  Created: string;
  CreatedDate?: Date; // Optional if created at is not provided by the client
}