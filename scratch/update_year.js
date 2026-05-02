
const SB_URL = "https://pmfrdrihzdhhjxokabjm.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtZnJkcmloemRoaGp4b2thYmptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4NTA5OTIsImV4cCI6MjA5MTQyNjk5Mn0.FnQWmxg0p4oUgAQBVhoy6wqIMOk3qk4pifI2voeQvV0";

async function updateYear() {
    console.log("🚀 Iniciando actualización masiva de año...");
    
    const response = await fetch(`${SB_URL}/rest/v1/estudiantes`, {
        method: "PATCH",
        headers: {
            "apikey": SB_KEY,
            "Authorization": `Bearer ${SB_KEY}`,
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
        },
        body: JSON.stringify({ año: 2026 })
    });
    
    if (response.ok) {
        console.log("✅ ¡Éxito! Todos los estudiantes han sido actualizados al año 2026.");
    } else {
        const err = await response.text();
        console.error("❌ Error:", err);
        if (err.includes("column \"año\" of relation \"estudiantes\" does not exist")) {
            console.log("💡 Parece que la columna 'año' no existe en la tabla 'estudiantes'.");
        }
    }
}

updateYear();
