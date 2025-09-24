# Plan de Desarrollo MVP - Editor de Estilo Periodístico

## Resumen Ejecutivo

**Objetivo:** Crear una webapp que analice textos periodísticos y sugiera mejoras de estilo basadas en literatura autorizada de periodismo.

**Duración MVP:** 8-10 semanas
**Equipo:** 1 desarrollador full-stack
**Presupuesto estimado:** $5,000-8,000

---

## Fase 1: Investigación y Base de Conocimiento (2-3 semanas)

### Objetivos
- Recopilar y digitalizar fuentes autoritativas
- Extraer reglas de estilo específicas del periodismo
- Crear base de datos de patrones y mejores prácticas

### Tareas específicas

#### Semana 1: Recopilación de fuentes
- [ ] **Manuales de estilo:**
  - Manual de estilo de El País
  - AP Stylebook (versión digital)
  - Manual de la Fundación del Español Urgente (Fundéu)
  - Libro de estilo de El Universal (México)

- [ ] **Literatura especializada:**
  - "El mejor oficio del mundo" - Gabriel García Márquez
  - "Manual de periodismo" - Vicente Leñero y Carlos Marín
  - "Los elementos del estilo periodístico" - James W. Carey
  - Papers sobre escritura clara y concisa

#### Semana 2-3: Procesamiento y extracción
- [ ] Digitalizar PDFs con OCR si es necesario
- [ ] Crear base de datos estructurada con:
  - Reglas de estilo (ej: "evitar párrafos >50 palabras")
  - Ejemplos de good/bad writing
  - Justificaciones con citas de autoridad
  - Categorías (claridad, concisión, estructura, etc.)

### Entregables
- Base de datos SQLite con 100+ reglas categorizadas
- Documentación de patrones identificados
- Lista priorizada de reglas para MVP

---

## Fase 2: Arquitectura y Setup Técnico (1 semana)

### Stack tecnológico

#### Frontend
- **Framework:** React 18 con TypeScript
- **Editor:** Monaco Editor (VS Code editor)
- **UI:** Tailwind CSS + shadcn/ui
- **Estado:** Zustand

#### Backend
- **API:** Node.js con Express/Fastify
- **Base de datos:** PostgreSQL + Redis (cache)
- **IA/NLP:** 
  - OpenAI GPT-4 API para análisis complejo
  - natural.js para análisis básico (longitud, complejidad)
  - readability-score para métricas de legibilidad

#### Infraestructura
- **Frontend:** Vercel
- **Backend:** Railway, Render o Heroku
- **Monitoreo:** Sentry

### Arquitectura del sistema

```
[Frontend React] ←→ [API Node.js] ←→ [PostgreSQL]
                        ↓
                   [OpenAI API]
                        ↓
                   [natural.js/NLP]
```

### Tareas
- [ ] Setup repositorio con estructura monorepo
- [ ] Configurar CI/CD pipeline
- [ ] Setup base de datos y migraciones
- [ ] Configurar variables de entorno
- [ ] Documentar API con OpenAPI/Swagger

---

## Fase 3: Desarrollo del Core MVP (4-5 semanas)

### Semana 1: Backend básico
- [ ] **API endpoints fundamentales:**
  ```
  POST /api/analyze - Analizar texto
  GET /api/rules - Obtener reglas disponibles
  POST /api/suggestions - Generar sugerencias
  ```

- [ ] **Modelos de datos:**
  ```sql
  -- Tabla de reglas
  rules (id, category, description, example, source)
  
  -- Tabla de análisis
  analyses (id, text, suggestions, created_at)
  
  -- Tabla de sugerencias
  suggestions (id, analysis_id, rule_id, position, original, suggested, reason)
  ```

- [ ] **Librerías Node.js necesarias:**
  ```javascript
  // package.json dependencies
  express: "^4.18.0"
  cors: "^2.8.5"
  helmet: "^7.0.0"
  morgan: "^1.10.0"
  pg: "^8.11.0"
  redis: "^4.6.0"
  openai: "^4.0.0"
  natural: "^6.5.0"
  readability-score: "^1.0.0"
  compromise: "^14.10.0"
  ```

- [ ] **Analizadores básicos con Node.js:**
  - Longitud de párrafos (split por \n\n)
  - Complejidad de oraciones (natural.js)
  - Uso de voz pasiva (compromise.js)
  - Palabras redundantes (natural.js stemmer)

### Semana 2: Integración con IA
- [ ] **Prompt engineering para OpenAI:**
  ```
  Actúa como editor de periodismo experto. 
  Analiza este texto y sugiere mejoras basándote en:
  - Principios de García Márquez sobre narrativa periodística
  - Manual de estilo de AP
  - Reglas de claridad y concisión
  
  Formato de respuesta: JSON con posición, sugerencia y justificación
  ```

- [ ] **Ejemplo de analizador básico en Node.js:**
  ```javascript
  // analyzers/basicAnalyzer.js
  const natural = require('natural');
  const readability = require('readability-score');
  
  function analyzeBasicMetrics(text) {
    const sentences = text.split(/[.!?]+/);
    const paragraphs = text.split(/\n\s*\n/);
    
    return {
      avgWordsPerSentence: calculateAverage(sentences),
      paragraphCount: paragraphs.length,
      passiveVoicePercentage: detectPassiveVoice(text),
      readabilityScore: readability(text).flesch
    };
  }
  ```

- [ ] **Setup inicial del servidor:**
  ```javascript
  // server.js
  const express = require('express');
  const cors = require('cors');
  const helmet = require('helmet');
  
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  ```

### Semana 3: Frontend core
- [ ] **Componentes principales:**
  - Editor de texto con Monaco
  - Panel lateral de sugerencias
  - Highlighting de problemas detectados
  - Modal con explicación detallada

- [ ] **Estados de la aplicación:**
  - Texto original
  - Análisis en progreso
  - Sugerencias recibidas
  - Sugerencias aplicadas/rechazadas

### Semana 4: Integración y refinamiento
- [ ] Conectar frontend con backend
- [ ] Implementar highlighting en tiempo real
- [ ] Sistema de aplicar/rechazar sugerencias
- [ ] Manejo de errores y loading states

### Semana 5: Funcionalidades específicas
- [ ] **Categorización de textos periodísticos:**
  - Noticia (estructura de pirámide invertida)
  - Reportaje (narrativa más libre)
  - Crónica (elementos literarios permitidos)

- [ ] **Métricas específicas:**
  - Índice de legibilidad Flesch-Kincaid
  - Densidad de información
  - Ritmo narrativo (variación en longitud de oraciones)

---

## Fase 4: Testing y Optimización (1-2 semanas)

### Testing
- [ ] **Unit tests** para analizadores
- [ ] **Integration tests** para flujo completo
- [ ] **E2E tests** con Playwright
- [ ] **Performance tests** con textos largos

### Optimización
- [ ] **Frontend:**
  - Lazy loading de componentes
  - Debouncing para análisis en tiempo real
  - Virtual scrolling para textos largos

- [ ] **Backend:**
  - Caching inteligente
  - Batch processing para múltiples sugerencias
  - Optimización de queries

### Validación con usuarios
- [ ] Pruebas con 3-5 periodistas reales
- [ ] Recopilar feedback sobre precisión
- [ ] Ajustar sensibilidad de detecciones
- [ ] Iterar sobre UX

---

## Funcionalidades del MVP

### Core Features ✅
1. **Editor de texto** con highlighting en tiempo real
2. **Panel de sugerencias** categorizadas por tipo
3. **Explicaciones contextuales** con citas de autoridad
4. **Métricas de legibilidad** específicas para periodismo
5. **Tipos de texto** (noticia, reportaje, crónica)

### Reglas implementadas (mínimo 20)
- ✅ Párrafos excesivamente largos (>4 oraciones)
- ✅ Oraciones complejas (>25 palabras)
- ✅ Uso excesivo de voz pasiva
- ✅ Redundancias y muletillas
- ✅ Lead poco efectivo (primeras 2 oraciones)
- ✅ Falta de variación en estructura de oraciones
- ✅ Jerga innecesaria o tecnicismos sin explicar
- ✅ Adjetivos valorativos inapropiados
- ✅ Estructura de pirámide invertida (para noticias)
- ✅ Transiciones débiles entre párrafos

### Métricas mostradas
- Índice de legibilidad
- Promedio de palabras por oración
- Porcentaje de voz pasiva
- Densidad de adjetivos
- Score general de estilo periodístico

---

## Cronograma detallado

| Semana | Fase | Tareas principales | Entregables |
|--------|------|-------------------|-------------|
| 1-2 | Investigación | Recopilar fuentes, extraer reglas | BD de reglas |
| 3 | Setup | Arquitectura, infraestructura | Repo configurado |
| 4 | Backend | API, modelos, analizadores básicos | API funcional |
| 5 | IA Integration | OpenAI, prompts, cache | Análisis inteligente |
| 6 | Frontend | Editor, componentes principales | UI básica |
| 7 | Integración | Conectar F+B, highlighting | App funcional |
| 8 | Features | Categorización, métricas específicas | MVP completo |
| 9-10 | Testing | Tests, optimización, feedback | Producto listo |

---

## Presupuesto estimado

### Desarrollo (8-10 semanas)
- Tiempo desarrollador: $4,000-6,000
- Servicios cloud (Vercel, Railway/Heroku): $50-150/mes
- OpenAI API: $200-500 (para testing y desarrollo)
- Herramientas y licencias: $200-300

### Total MVP: $5,000-8,000

---

## Métricas de éxito del MVP

### Técnicas
- [ ] Analizar texto de 5,000 palabras en <5 segundos
- [ ] 95% uptime
- [ ] <3% false positives en detecciones básicas

### Usuario
- [ ] 8/10 periodistas consideran sugerencias útiles
- [ ] 70% de sugerencias son aplicadas
- [ ] Tiempo promedio de uso >10 minutos por sesión

### Negocio
- [ ] 100 usuarios registrados en primer mes
- [ ] 20% de usuarios regresan en 7 días
- [ ] 5 testimonios positivos de periodistas

---

## Riesgos y mitigaciones

### Riesgos técnicos
- **OpenAI API costs:** Implementar cache agresivo y límites de uso
- **Performance con textos largos:** Procesamiento en chunks
- **False positives:** Validación constante con expertos

### Riesgos de producto
- **Resistencia al cambio:** Focus en ser asistente, no reemplazo
- **Competencia:** Diferenciación en especialización periodística
- **Calidad de sugerencias:** Iteración constante con feedback real

---

## Próximos pasos después del MVP

### Funcionalidades avanzadas
- Análisis de estructura narrativa
- Sugerencias de titulares
- Detección de sesgo
- Verificación básica de datos
- Integración con CMS periodísticos

### Escalabilidad
- Modelo de suscripción
- API para terceros
- Versión enterprise para redacciones
- Soporte multiidioma

---

## Contacto y recursos

**Repositorio:** [Crear en GitHub]
**Documentación técnica:** [Confluence o Notion]
**Design system:** [Figma]
**Project management:** [Linear o GitHub Projects]

---

*Documento creado: [Fecha actual]*
*Versión: 1.0*
*Próxima revisión: Al finalizar cada fase*