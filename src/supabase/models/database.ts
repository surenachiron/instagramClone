export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          caption: string | null;
          created_at: string;
          id: number;
          media_url: string | null;
          user_id: string | null;
        };
        Insert: {
          caption?: string | null;
          created_at?: string;
          id?: number;
          media_url?: string | null;
          user_id?: string | null;
        };
        Update: {
          caption?: string | null;
          created_at?: string;
          id?: number;
          media_url?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'posts_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'posts_user_id_fkey1';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['user_id'];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          email: string | null;
          full_name: string | null;
          gender: string | null;
          id: number;
          isAuthenticated: boolean | null;
          user_id: string;
          user_name: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          email?: string | null;
          full_name?: string | null;
          gender?: string | null;
          id?: number;
          isAuthenticated?: boolean | null;
          user_id: string;
          user_name?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          email?: string | null;
          full_name?: string | null;
          gender?: string | null;
          id?: number;
          isAuthenticated?: boolean | null;
          user_id?: string;
          user_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type ProfileTable = {
  avatar_url: string | null;
  bio: string | null;
  email: string | null;
  full_name: string | null;
  gender: string | null;
  id: number;
  isAuthenticated: boolean | null;
  user_id: string;
  user_name: string | null;
};
