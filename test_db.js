const SB_URL = "https://pmfrdrihzdhhjxokabjm.supabase.co/rest/v1/eval_resultados?select=grado,periodo,quiz_name";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtZnJkcmloemRoaGp4b2thYmptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4NTA5OTIsImV4cCI6MjA5MTQyNjk5Mn0.FnQWmxg0p4oUgAQBVhoy6wqIMOk3qk4pifI2voeQvV0";
fetch(SB_URL, { headers: { 'apikey': SB_KEY, 'Authorization': 'Bearer ' + SB_KEY } })
.then(r => r.json())
.then(data => console.log("DB DATA:", JSON.stringify(data.slice(0, 5), null, 2), "Total Count:", data.length))
.catch(e => console.error(e));
