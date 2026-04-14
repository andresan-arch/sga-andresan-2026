 = "https://pmfrdrihzdhhjxokabjm.supabase.co"
 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtZnJkcmloemRoaGp4b2thYmptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4NTA5OTIsImV4cCI6MjA5MTQyNjk5Mn0.FnQWmxg0p4oUgAQBVhoy6wqIMOk3qk4pifI2voeQvV0"

 = @{
    "apikey" = 
    "Authorization" = "Bearer "
}

 = Invoke-RestMethod -Uri "/rest/v1/eval_resultados?select=grado,periodo,quiz_name" -Headers  -Method Get
 | Group-Object periodo, grado | Select-Object Name, Count
