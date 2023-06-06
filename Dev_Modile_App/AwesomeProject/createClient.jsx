import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = "https://ctdrtthmzqlqqqnxhxcf.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0ZHJ0dGhtenFscXFxbnhoeGNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ1NzI3MTIsImV4cCI6MTk5MDE0ODcxMn0.Y2jNRuAy5Z-JLqbENSbwfn1Cis6a6vrcLna77oyTgzY"

const ip = Platform.OS === 'ios' ? 'localhost' : 'localhost';

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    localStorage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
});

export default supabase;
