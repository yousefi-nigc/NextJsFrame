export interface Project {
  id: string;
  name: string;
  address: string;
  description: string;
  createdAt: string;
}

export interface Floor {
  id?: string;
  name: string;
  level: number;
  description: string;
  projectId?: string;
  createdAt?: string;
  updatedAt?: string;
}
