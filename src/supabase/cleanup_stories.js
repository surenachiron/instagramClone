const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanupExpiredStories() {
  const { data, error } = await supabase.rpc('delete_expired_stories');
  if (error) {
    console.error('Error deleting expired stories:', error);
  } else {
    console.log('Expired stories deleted successfully');
  }
}

cleanupExpiredStories();
