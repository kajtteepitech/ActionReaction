import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://ctdrtthmzqlqqqnxhxcf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0ZHJ0dGhtenFscXFxbnhoeGNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ1NzI3MTIsImV4cCI6MTk5MDE0ODcxMn0.Y2jNRuAy5Z-JLqbENSbwfn1Cis6a6vrcLna77oyTgzY')

export {
  supabase
}