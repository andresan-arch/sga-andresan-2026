window.GradesService = {
    /**
     * Inserta o actualiza una nota en la base de datos
     */
    upsertNota: async function(estId, actId, asigId, valor, periodo, anio) {
        const { data: existente } = await window.sb.from('notas').select('id')
            .eq('estudiante_id', estId).eq('actividad_id', actId).maybeSingle();

        if (existente) {
            return await window.sb.from('notas').update({ valor }).eq('id', existente.id);
        } else {
            return await window.sb.from('notas').insert({
                estudiante_id: estId, actividad_id: actId,
                asignatura_id: asigId,
                valor, periodo, año: anio
            });
        }
    },

    /**
     * Elimina una nota existente
     */
    deleteNota: async function(estId, actId) {
        const { data: existente } = await window.sb.from('notas').select('id')
            .eq('estudiante_id', estId).eq('actividad_id', actId).maybeSingle();
            
        if (existente) {
            return await window.sb.from('notas').delete().eq('id', existente.id);
        }
        return { error: null };
    },

    /**
     * Inserta múltiples notas (ej. para Evaluándonos sincronizado)
     */
    insertNotasBulk: async function(notasArray) {
        return await window.sb.from('notas').insert(notasArray);
    }
};
