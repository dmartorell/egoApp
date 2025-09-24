# Plan de Desarrollo MVP - Editor Ego

## Resumen Ejecutivo
- **Objetivo**: Crear una webapp que analice textos periodísticos y sugiera mejoras de estilo basadas en literatura autorizada de periodismo.  
- **Duración MVP**: 8-10 semanas  
- **Equipo**: 1 desarrollador full-stack  

## Fase 1: Investigación y Base de Conocimiento (2-3 semanas)

### Objetivos
- Recopilar fuentes autoritativas y extraer reglas de estilo fundamentales.  
- Enfocarse en un conjunto reducido y de alto impacto (~20 reglas) para el MVP.  
- Crear una base de datos de patrones y mejores prácticas.  

### Tareas específicas
**Semana 1: Recopilación y curación**
- [ ] Manuales de estilo: *El País*, *AP Stylebook*, *Fundéu*, *El Universal (México)*.  
- [ ] Literatura especializada: *El mejor oficio del mundo* (García Márquez), *Manual de periodismo* (Leñero y Marín), *Los elementos del estilo periodístico* (James W. Carey).  
- [ ] Ejemplos de textos periodísticos (bien y mal escritos):  

**Ejemplo 1 (Bien escrito - Crónica):**
> "El calor de la tarde en Macondo se cortaba con un cuchillo. La lluvia había dejado las calles con un olor a tierra mojada, un aroma que García Márquez supo describir como la memoria del mundo. Frente al portal de una casa de adobe, un anciano con sombrero de paja se mecía lentamente en una mecedora, con los ojos cerrados, escuchando el silencio. No había prisa en su gesto, solo la cadencia de la espera."

**Ejemplo 2 (Mal escrito - Noticia):**
> "El vehículo, que se trataba de un sedán de color rojo, impactó con un poste de luz, lo cual provocó una interrupción en el servicio eléctrico para una gran cantidad de personas en el área. El incidente fue un acontecimiento que fue reportado por varios testigos y las autoridades competentes están llevando a cabo una investigación en este momento."

**Ejemplo 3 (Bien escrito - Noticia):**
> "Un sedán rojo chocó contra un poste de luz este martes en la calle 5, dejando a tres colonias sin electricidad. El conductor, de 25 años, resultó ileso. La policía investiga si el accidente se debió a exceso de velocidad."

**Semana 2-3: Procesamiento y extracción**
- [ ] Digitalizar PDFs con OCR si es necesario.  
- [ ] Crear un prompt base para la IA que sirva como "editor de periodismo experto".  
- [ ] Identificar y documentar ~20 reglas clave y de alta prioridad.  
- [ ] Crear una base de datos estructurada con reglas, ejemplos y justificaciones.  

### Entregables
- Base de datos SQLite con las 20+ reglas priorizadas.  
- Documentación de prompts (prompt engineering) y patrones identificados.  
- Lista final y priorizada de reglas para el MVP.  

---

## Fase 2: Arquitectura y Setup Técnico (1 semana)

### Stack tecnológico
- **Frontend**: React 18 con TypeScript, Monaco Editor, Tailwind CSS + shadcn/ui, Zustand.  
- **Backend**: Node.js con Express/Fastify.  
- **Base de datos**: PostgreSQL.  
- **IA/NLP**: Claude SDK, natural.js, compromise.js.  
- **Infraestructura**: Vercel (Frontend), Railway/Render/Heroku (Backend).  

### Arquitectura del sistema
```
[Frontend React] ←→ [API Node.js] ←→ [PostgreSQL]
↓
[Claude SDK]
```

### Tareas
- [ ] Setup de repositorio y CI/CD pipeline.  
- [ ] Configuración inicial de la base de datos y migraciones.  
- [ ] Configuración de variables de entorno y documentación de la API con OpenAPI/Swagger.  

## Fase 3: Desarrollo del Core MVP (4-5 semanas)

### Semana 1: Backend básico
- [ ] Endpoints de API: `POST /api/analyze`, `GET /api/rules`.  
- [ ] Modelos de datos: `rules (id, category, description, example, source)` y `analyses (id, text, suggestions, created_at)`.  
- [ ] Librerías Node.js necesarias: `express`, `cors`, `helmet`, `morgan`, `pg`, `@anthropic-ai/sdk`, `natural`, `compromise`.  
- [ ] Desarrollo de analizadores básicos que calculen métricas simples para complementar el análisis de la IA o servir como fallback.  

### Semana 2: Refinamiento de Prompts e integración con IA
- [ ] Prompt engineering avanzado para Claude: crear un system prompt robusto que defina a Claude como un editor de periodismo experto.  
- **Ejemplo de prompt para Claude**:  

System prompt:
> "You are an expert journalism editor. Your task is to analyze a given text and provide actionable suggestions for improvement based on journalistic style guides (e.g., AP, Fundéu) and principles (clarity, conciseness, narrative rhythm)."

User prompt:
> "Please analyze the following news text and provide suggestions in a JSON format. Focus on passive voice, paragraph length, and redundant phrases.  
> Text to analyze: 'El vehículo, que se trataba de un sedán de color rojo, impactó con un poste de luz...'"

- [ ] Implementar lógica para procesar textos por chunks para optimizar costos y rendimiento.  
- [ ] Configurar un sistema de caching agresivo para las llamadas a la API de Claude.  

### Semana 3: Frontend core
- [ ] Componentes principales: Editor de texto con Monaco, panel lateral de sugerencias, highlighting de problemas.  
- [ ] Manejo de estados de la aplicación, incluyendo loading y error.  

### Semana 4: Integración y refinamiento
- [ ] Conectar frontend y backend.  
- [ ] Implementar debouncing para el análisis en tiempo real y highlighting de problemas.  
- [ ] Implementar un sistema para aplicar/rechazar sugerencias.  

### Semana 5: Funcionalidades específicas
- [ ] Categorización de textos periodísticos (Noticia, Reportaje, Crónica).  
- [ ] Métricas específicas para periodismo: Índice de legibilidad Flesch-Kincaid, densidad de información, ritmo narrativo.  

## Fase 4: Testing y Optimización (1-2 semanas)

### Testing
- [ ] Pruebas unitarias para analizadores y prompts.  
- [ ] Pruebas de integración para el flujo completo (frontend ↔ backend ↔ IA).  
- [ ] Pruebas E2E y de rendimiento con textos largos (≥ 5.000 palabras).  

### Optimización
- [ ] Implementar lazy loading de componentes y virtual scrolling en el editor.  
- [ ] Optimización de queries en base de datos.  
- [ ] Batch processing para múltiples sugerencias en una sola petición.  

### Validación con usuarios
- [ ] Pruebas con 3-5 periodistas reales utilizando la aplicación con sus propios textos.  
- [ ] Recopilar feedback sobre precisión de las sugerencias y usabilidad general.  
- [ ] Iterar sobre la sensibilidad de las detecciones y la experiencia de usuario (UX).  

## Cronograma detallado

| Semana | Fase           | Tareas principales                          | Entregables                       |
|--------|----------------|---------------------------------------------|-----------------------------------|
| 1-2    | Investigación  | Recopilar fuentes, extraer reglas clave     | Base de datos de reglas, prompts iniciales |
| 3      | Setup          | Arquitectura, infraestructura               | Repositorio configurado           |
| 4      | Backend        | API, modelos, analizadores básicos          | API funcional                     |
| 5      | IA Integration | Claude, prompts avanzados, sistema de cache | Análisis inteligente optimizado   |
| 6      | Frontend       | Editor, componentes principales             | UI básica                         |
| 7      | Integración    | Conectar frontend y backend, highlighting   | App funcional                     |
| 8      | Features       | Categorización, métricas específicas        | MVP completo                      |
| 9-10   | Testing        | Pruebas, optimización, feedback de usuarios | Producto listo                    |


## Métricas de éxito del MVP

### Técnicas
- Analizar un texto de 5.000 palabras en **menos de 5 segundos**.  
- **95% uptime** garantizado.  
- **<3% de falsos positivos** en las sugerencias.  

### Usuario
- **8/10 periodistas** consideran las sugerencias útiles.  
- El feedback refleja que la herramienta se percibe como un **asistente valioso**, no como un reemplazo.  

### Negocio
- **100 usuarios registrados** en el primer mes.  
- **20% de usuarios** regresan en un plazo de 7 días.  

## Riesgos y mitigaciones

### Costes de la API de Claude
- **Riesgo**: Los costes de uso pueden escalar rápidamente con textos largos o múltiples usuarios.  
- **Mitigación**: Implementar cache agresivo, procesamiento por chunks y limitar el uso para usuarios no registrados.  

### Rendimiento con textos largos
- **Riesgo**: Procesar textos extensos puede ralentizar la aplicación.  
- **Mitigación**: Procesamiento en chunks, debouncing en el análisis en tiempo real y optimizaciones en frontend.  

### Falsos positivos
- **Riesgo**: Detección de problemas inexistentes que afecten la confianza del usuario.  
- **Mitigación**: Validación constante con expertos, ajuste iterativo de prompts y métricas.  

### Calidad de sugerencias
- **Riesgo**: Sugerencias poco útiles o inconsistentes que reduzcan la percepción de valor.  
- **Mitigación**: Iteración constante basada en feedback real de periodistas y pruebas piloto.  

## Próximos pasos después del MVP

### Funcionalidades avanzadas
- Análisis de **estructura narrativa** (inicio, desarrollo, cierre).  
- Evaluación y optimización de **titulares**.  
- Recomendaciones de estilo específicas por género periodístico.  

### Escalabilidad
- Implementar un **modelo de suscripción** con planes gratuitos y premium.  
- Ofrecer una **API para terceros** (integración con CMS y herramientas de redacción).  

### Soporte multiidioma
- Extender la base de reglas y prompts para otros idiomas (inglés, portugués, francés).  
- Adaptar las métricas de estilo y legibilidad según estándares locales.  