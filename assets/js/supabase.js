
import { createClient } from
  "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL =
  "https://uvagqlxafykckxkncuza.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_VtJKuw2v7tunGTznuNWp_w_5cKW3pAR";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);
