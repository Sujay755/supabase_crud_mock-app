import { createClient } from "@supabase/supabase-js";
import { supabaseUrl, supabaseKey } from "../constants/supaConstants";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;