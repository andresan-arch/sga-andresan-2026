# AGENTS_NOTAS.md

Guía operativa para agentes y desarrolladores en el proyecto SGA AndréSán (Aplicación de Notas).

Objetivo principal: evolucionar la arquitectura hacia clean architecture sin romper la funcionalidad actual de la gestión y registro de notas.

## 1. Principios Rectores

1. No regresión funcional (especialmente en el cálculo, guardado y visualización de notas).
2. Cambios pequeños, aislados y verificables.
3. Arquitectura por capas con dependencias controladas.
4. Trazabilidad de toda modificación.
5. Seguridad, integridad de datos y estabilidad por encima de velocidad de cambio.

## 2. Regla de Oro de Cambios

Toda modificación debe preservar el comportamiento existente del sistema.

Si un cambio impacta módulos no relacionados o altera un flujo estable (como el ingreso de calificaciones en la tabla), se considera no conforme y debe revertirse o rediseñarse.

## 3. Arquitectura Limpia Objetivo

Estructura de referencia:

- presentation: UI, eventos, render de tablas, estado de interfaz.
- domain: reglas de negocio (cálculo de promedios, validaciones de notas), casos de uso, entidades.
- data: acceso a datos (Supabase), clientes, repositorios, mapeos.
- shared: utilidades y constantes transversales.

### 3.1 Regla de dependencia

- presentation puede depender de domain.
- domain no debe depender de presentation ni de detalles de infraestructura.
- data implementa contratos requeridos por domain.
- shared no debe contener reglas de negocio acopladas a UI.

## 4. Directrices Obligatorias de Implementación

1. No aplicar cambios big-bang.
2. Migrar con estrategia incremental (strangler pattern).
3. Mantener la interfaz actual como shell hasta paridad funcional.
4. Extraer primero piezas de bajo riesgo (constants, utils puras).
5. Cada PR/cambio debe tener alcance acotado y reversible.

## 5. Regla sobre Legado y Eliminación

En esta etapa:

- No eliminar activos legacy por defecto.
- Marcar como deprecated cuando aplique.
- Documentar evidencia de no uso antes de proponer eliminación.
- Cualquier eliminación requiere aprobación explícita.

## 6. Política de No Afectación del Resto del Código

Para cada cambio, es obligatorio validar:

1. Flujos críticos siguen operativos (ej. edición inline de notas, guardado automático).
2. No se rompen contratos de datos esperados por UI.
3. No se alteran rutas, PWA ni autenticación existente.
4. No se introducen side-effects en módulos no tocados.

Checklist mínimo por cambio:

- [ ] Alcance definido y acotado
- [ ] Impacto colateral evaluado
- [ ] Smoke test de flujos críticos ejecutado (verificar CRUD de notas)
- [ ] Plan de rollback listo
- [ ] Documentación actualizada

## 7. Convenciones de Desarrollo

1. Un cambio = una intención clara.
2. Nombres explícitos y consistentes (ej. `guardarNotaDesdeTabla`).
3. Funciones pequeñas con responsabilidad única.
4. Evitar estado global cuando exista alternativa controlada.
5. Preferir composición sobre lógica duplicada.

## 8. Pruebas y Verificación

Mínimo esperado por iteración:

1. Smoke tests manuales de flujos clave (ingreso en la pestaña notas).
2. Validación de pantalla principal y vistas críticas (boletines, reportes).
3. Validación de integración con Supabase en escenarios principales.
4. Confirmación de despliegue estable en Vercel.

## 9. Seguridad y Configuración

1. Evitar secretos hardcodeados en frontend.
2. Configuración por entorno y manejo seguro de credenciales.
3. Verificar políticas de acceso a datos (RLS) antes de publicar cambios, para asegurar que los docentes solo modifiquen sus propias notas.

## 10. Estrategia de Migración Recomendada

Orden técnico recomendado:

1. shared/constants
2. shared/utils
3. data/datasources + repositories
4. domain/use-cases
5. presentation/controllers + views

Regla de avance:

No pasar a la siguiente etapa sin paridad funcional validada en la etapa actual.

## 11. Estándar de Documentación

Cada cambio relevante debe actualizar:

1. estado técnico o documento equivalente
2. decisiones de arquitectura (si aplica)
3. runbook operativo si cambia procedimiento

## 12. Criterio de Aceptación para Nivel Mid-Level

Se considera que la migración avanza al nivel objetivo cuando:

1. Existen capas separadas y respetadas.
2. Los cambios son predecibles y de bajo impacto colateral.
3. Hay checklists de validación usados de forma rutinaria.
4. El equipo puede iterar sin depender de una sola persona.

## 13. Regla de Escalamiento

Si un cambio implica riesgo alto de ruptura:

1. detener implementación directa
2. proponer alternativa incremental
3. ejecutar en feature branch con validación reforzada
4. publicar resultado con evidencia comparativa
