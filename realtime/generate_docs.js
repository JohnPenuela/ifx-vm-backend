const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  Table, TableRow, TableCell, WidthType, BorderStyle,
  AlignmentType, UnderlineType, ShadingType
} = require('docx');

async function createDocumentation() {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Calibri',
            size: 22, // 11pt
            color: '1E293B',
          },
        },
      },
      paragraphStyles: [
        {
          id: 'Heading1',
          name: 'Heading 1',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: {
            font: 'Calibri',
            size: 32, // 16pt
            bold: true,
            color: '0052CC',
          },
          paragraph: {
            spacing: { before: 280, after: 140 },
          },
        },
        {
          id: 'Heading2',
          name: 'Heading 2',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: {
            font: 'Calibri',
            size: 26, // 13pt
            bold: true,
            color: '0F172A',
          },
          paragraph: {
            spacing: { before: 200, after: 100 },
          },
        },
        {
          id: 'Heading3',
          name: 'Heading 3',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: {
            font: 'Calibri',
            size: 24, // 12pt
            bold: true,
            color: '2563EB',
          },
          paragraph: {
            spacing: { before: 160, after: 80 },
          },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }, // 1 pulgada
          },
        },
        children: [
          // PORTADA
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 800, after: 200 },
            children: [
              new TextRun({
                text: "IFX NETWORKS COLOMBIA S.A.S",
                bold: true,
                size: 36,
                color: "0052CC",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: "Inteligencia | Futuro | Experiencia",
                italics: true,
                size: 22,
                color: "64748B",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 600, after: 200 },
            children: [
              new TextRun({
                text: "PRUEBA TÉCNICA FULL STACK – ENFOCADO EN FRONTEND",
                bold: true,
                size: 28,
                color: "0F172A",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 600 },
            children: [
              new TextRun({
                text: "Plataforma de Gestión de Máquinas Virtuales (VMs) con Optimistic UI, WebSockets y Autenticación Segura HttpOnly",
                size: 22,
                color: "334155",
              }),
            ],
          }),

          // Tabla informativa de portada
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: "Frontend Framework:", bold: true })],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: "Angular 21 (Standalone Components, Signals, SCSS, Chart.js)" })],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: "Backend API:", bold: true })],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: "Laravel 12 / PHP 8.2 (RESTful API, JWT HttpOnly Cookies, CORS)" })],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: "Real-Time Engine:", bold: true })],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: "WebSocket Hub (Node.js Relay bidireccional en puerto 6001)" })],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: "Ubicación en Servidor:", bold: true })],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: "C:\\wamp64\\www\\ (ifx_vm_frontend & ifx_vm_backend)" })],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: "Fecha de Entrega:", bold: true })],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: "Octubre 2026" })],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { before: 500 }, children: [] }),

          // SECCIÓN 1: INTRODUCCIÓN Y ALCANCE
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun("1. Resumen Ejecutivo y Alcance del Proyecto")],
          }),
          new Paragraph({
            children: [
              new TextRun(
                "El presente documento detalla la arquitectura, decisiones de diseño, despliegue y funcionamiento de la Single Page Application (SPA) y la API RESTful de soporte diseñadas para la gestión y monitoreo en tiempo real de Máquinas Virtuales (VMs) de IFX Networks. El desarrollo fue estructurado atendiendo rigurosamente a cada uno de los lineamientos de la prueba técnica:"
              ),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: "Estética Moderna y Premium: ", bold: true }),
              new TextRun("Implementación de un Dark Mode nativo con toggle dinámico, paleta de colores corporativa de centro de datos (azul IFX, cian y pizarra oscuro), tarjetas con micro-interacciones, tipografía moderna (Inter y JetBrains Mono) y diseño 100% responsivo."),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: "Gestión de Estado y Optimistic UI con Rollback: ", bold: true }),
              new TextRun("La interfaz reacciona instantáneamente ante la creación, actualización, cambio de estado y eliminación de máquinas virtuales, revirtiendo el estado de manera atómica (rollback) y notificando al usuario si el servidor rechaza la transacción."),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: "Visualización de Datos (Data Visualization): ", bold: true }),
              new TextRun("Panel interactivo con Chart.js que computa en vivo el uso total de recursos asignados (Suma exacta de Cores, Memoria RAM y Disco de todas las VMs en estado 'Activa'), complementado con un gráfico de dona para la distribución de sistemas operativos."),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: "Feedback Visual Completo: ", bold: true }),
              new TextRun("Efectos Skeleton Shimmer durante la carga inicial, sistema de notificaciones Toast contextuales (éxito, error, advertencia) y vistas de estado vacío (Empty States)."),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: "Control de Acceso Basado en Roles (RBAC): ", bold: true }),
              new TextRun("Separación tajante de roles ('Administrador' y 'Cliente'). Si el usuario autenticado es 'Cliente', la interfaz oculta de raíz en el DOM los botones de aprovisionar, editar, cambiar estado y eliminar."),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: "Sincronización en Tiempo Real (WebSockets): ", bold: true }),
              new TextRun("Canal de WebSockets que sincroniza instantáneamente el estado de las máquinas virtuales entre todas las sesiones conectadas, activando una animación de pulso y resplandor luminiscente en la tarjeta modificada."),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: "Autenticación Segura (JWT en Cookie HttpOnly): ", bold: true }),
              new TextRun("Cumplimiento estricto del requisito de seguridad: el token JWT NUNCA se expone en el cuerpo de la respuesta ni se almacena en el localStorage. Viaja cifrado en una cookie HttpOnly con SameSite=Lax."),
            ],
          }),

          // SECCIÓN 2: GUÍA DE DESPLIEGUE LOCAL
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun("2. Guía de Despliegue Local Paso a Paso")],
          }),
          new Paragraph({
            children: [
              new TextRun(
                "Ambos proyectos se encuentran alojados en el directorio raíz de WAMP (C:\\wamp64\\www\\). Para comodidad del revisor, se han preparado ejecutables automatizados (.bat) y las instrucciones manuales correspondientes."
              ),
            ],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("2.1. Despliegue Automatizado en 1 Clic")],
          }),
          new Paragraph({
            children: [
              new TextRun(
                "Abra el Explorador de Windows en C:\\wamp64\\www\\ y haga doble clic en el archivo:"
              ),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "   C:\\wamp64\\www\\iniciar_todo.bat",
                bold: true,
                color: "0052CC",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun(
                "Este script levantará en terminales independientes el Backend API en el puerto 8000, el WebSocket Hub en el puerto 6001 y el Frontend Angular en el puerto 4200, abriendo automáticamente la aplicación en su navegador predeterminado."
              ),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("2.2. Despliegue Manual por Consola")],
          }),
          new Paragraph({
            children: [new TextRun({ text: "Paso 1: Iniciar el Backend (Laravel)", bold: true })],
          }),
          new Paragraph({
            children: [
              new TextRun("   cd C:\\wamp64\\www\\ifx_vm_backend\n   php artisan migrate:fresh --seed\n   php artisan serve --port=8000"),
            ],
          }),
          new Paragraph({
            children: [new TextRun({ text: "Paso 2: Iniciar el Servicio de WebSockets (Node.js)", bold: true })],
          }),
          new Paragraph({
            children: [
              new TextRun("   cd C:\\wamp64\\www\\ifx_vm_backend\\realtime\n   node server.js"),
            ],
          }),
          new Paragraph({
            children: [new TextRun({ text: "Paso 3: Iniciar el Frontend (Angular SPA)", bold: true })],
          }),
          new Paragraph({
            children: [
              new TextRun("   cd C:\\wamp64\\www\\ifx_vm_frontend\n   npm start   (o ng serve --port 4200)\n   Acceder en navegador a: http://localhost:4200"),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("2.3. Credenciales de Prueba Preconfiguradas")],
          }),
          new Paragraph({
            children: [
              new TextRun(
                "La base de datos incluye un seeder que crea de forma determinista dos cuentas con roles diferenciados. Además, en la pantalla de Login existen dos botones de acceso rápido para autocompletar credenciales en 1 clic:"
              ),
            ],
          }),

          // Tabla de credenciales
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: "0F172A", type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: "Rol", bold: true, color: "FFFFFF" })] })],
                  }),
                  new TableCell({
                    shading: { fill: "0F172A", type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: "Correo Electrónico", bold: true, color: "FFFFFF" })] })],
                  }),
                  new TableCell({
                    shading: { fill: "0F172A", type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: "Contraseña", bold: true, color: "FFFFFF" })] })],
                  }),
                  new TableCell({
                    shading: { fill: "0F172A", type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: "Privilegios en la Plataforma", bold: true, color: "FFFFFF" })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: "Administrador", bold: true, color: "0284C7" })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun("admin@ifxcorp.com")] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun("Admin2026*!")] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun("Acceso total: Crear VMs, editar especificaciones, encender/apagar, poner en mantenimiento y eliminar.")] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: "Cliente", bold: true, color: "10B981" })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun("cliente@ifxcorp.com")] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun("Cliente2026*!")] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun("Solo lectura: Visualiza el dashboard, inventario, gráficos y sincronización en tiempo real. Los botones de mutación están completamente ocultos.")] })],
                  }),
                ],
              }),
            ],
          }),

          // SECCIÓN 3: ARQUITECTURA TÉCNICA
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400 },
            children: [new TextRun("3. Arquitectura Técnica y Seguridad")],
          }),
          new Paragraph({
            children: [
              new TextRun(
                "La solución adopta una arquitectura desacoplada de alto rendimiento basada en tres capas independientes:"
              ),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun(
                "1. Capa de Presentación (Frontend SPA):\n   - Implementada en Angular 21 utilizando Componentes Standalone y el modelo reactivo de Signals.\n   - No utiliza librerías de estilos pesadas ni TailwindCSS por defecto; implementa un sistema de diseño propio en SCSS modular con variables CSS para el cambio dinámico entre Dark Mode y Light Mode.\n   - Conexión al backend con interceptor HTTP que inyecta 'withCredentials: true' para permitir el transporte automático de cookies seguras entre puertos locales (localhost:4200 <-> localhost:8000).\n\n" +
                "2. Capa de Servicios y Lógica de Negocio (Backend API):\n   - Desarrollada sobre Laravel 12 / PHP 8.2 con controladores RESTful especializados y Form Requests para validación exhaustiva.\n   - Servicio 'JwtService' basado en firebase/php-jwt con algoritmo HMAC-SHA256 y expiración de 24 horas.\n   - Middleware 'JwtAuthenticate' que inspecciona la cookie 'access_token' y resuelve al usuario autenticado.\n   - Middleware 'EnsureRole' que protege las operaciones destructivas o de mutación, devolviendo 403 Forbidden a usuarios con rol 'Cliente'.\n\n" +
                "3. Capa de Mensajería en Tiempo Real (WebSocket Relay Hub):\n   - Microservicio ligero en Node.js (ws + express) que corre en el puerto 6001.\n   - Cuando un Administrador crea, edita, borra o conmuta el estado de una VM, Laravel emite un evento vía POST HTTP a /broadcast.\n   - El hub distribuye instantáneamente el payload a todos los navegadores conectados, permitiendo que la interfaz de un Cliente se actualice en milisegundos sin recargar la página."
              ),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("3.1. Justificación de Seguridad: JWT en Cookie HttpOnly vs localStorage")],
          }),
          new Paragraph({
            children: [
              new TextRun(
                "La prueba técnica estipula de forma explícita que guardar el token en localStorage es una práctica insegura. La justificación técnica de esta decisión es la siguiente:\n\n" +
                "• Vulnerabilidad ante XSS (Cross-Site Scripting): Si un atacante logra inyectar código JavaScript malicioso en una aplicación que guarda tokens en localStorage, puede ejecutar 'window.localStorage.getItem('token')' y exfiltrar la credencial de forma inmediata.\n" +
                "• Mitigación HttpOnly: Al marcar la cookie como HttpOnly desde el backend (Set-Cookie: access_token=...; HttpOnly; SameSite=Lax; Path=/), el navegador prohíbe de forma tajante el acceso a dicha cookie mediante cualquier script cliente (document.cookie devuelve vacío o la omite). El token viaja de forma transparente y segura en cada petición de red sin estar al alcance de scripts de terceros."
              ),
            ],
          }),

          // SECCIÓN 4: GESTIÓN DE ESTADO Y OPTIMISTIC UI
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400 },
            children: [new TextRun("4. Gestión de Estado, Optimistic UI y Rollback")],
          }),
          new Paragraph({
            children: [
              new TextRun(
                "Uno de los requerimientos de mayor peso técnico en la evaluación es la reacción inmediata de la interfaz ante cambios, acompañada de la capacidad de reversión si el servidor responde con error. En este proyecto se implementó un Store reactivo centralizado en 'VmStateService' mediante Angular Signals:\n\n" +
                "1. Captura de Snapshot Previo: Antes de alterar el estado, el servicio clona el array inmutable actual de máquinas virtuales: const snapshot = [...this.vms()].\n" +
                "2. Mutación Optimista: Se genera un identificador negativo temporal (ej. -Date.now()) o se actualiza el objeto en el Signal 'vms'. La interfaz se redibuja en 0ms; las tarjetas reflejan el nuevo estado y las métricas computadas (Cores, RAM y Disco) se recalculan automáticamente gracias a los computed() de Signals.\n" +
                "3. Despacho Asíncrono: Se envía la petición HTTP a la API de Laravel.\n" +
                "4. Confirmación (Camino Feliz): Al recibir el HTTP 200/201, se reemplaza la entidad temporal con los datos definitivos asignados por el backend (id real de base de datos, IP generada, etc.) y se muestra un toast verde de confirmación.\n" +
                "5. Rollback Transaccional (Fallo): Si la petición retorna un error (código 422, 403, 500 o pérdida de conexión), el bloque error() del Observable ejecuta: this.vms.set(snapshot). De este modo, la tarjeta rechazada desaparece o retorna a su estado previo, y se emite un Toast de error advirtiendo el motivo exacto del fallo y que el estado local ha sido restaurado."
              ),
            ],
          }),

          // SECCIÓN 5: BITÁCORA DE IA (OBLIGATORIA)
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400 },
            children: [new TextRun("5. Bitácora de Uso de IA (Meta-Documentación)")],
          }),
          new Paragraph({
            children: [
              new TextRun(
                "En conformidad con los requisitos de la página 4 de la prueba técnica, a continuación se documenta con total transparencia el uso de asistentes de IA durante el ciclo de desarrollo:"
              ),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("Pregunta 1: ¿Qué herramientas de IA utilizaste?")],
          }),
          new Paragraph({
            children: [
              new TextRun(
                "Se utilizó Google Antigravity IDE con el modelo Gemini 3.6 Flash / Advanced Agentic Assistant como acelerador de desarrollo. La herramienta fue empleada como copiloto técnico para tareas de andamiaje (scaffolding), estructuración de modelos de datos iniciales y generación de esqueletos de interfaz."
              ),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("Pregunta 2: ¿Para qué partes delegaste el trabajo pesado y dónde tuviste que intervenir?")],
          }),
          new Paragraph({
            children: [
              new TextRun(
                "• Trabajo Pesado Delegado a la IA:\n" +
                "  - Generación de migraciones iniciales de Laravel y factories de prueba.\n" +
                "  - Maquetación de la cuadrícula SCSS para el panel de tarjetas y la estructura base de los formularios reactivos en Angular.\n" +
                "  - Configuración inicial de Chart.js y los tipos de datos en TypeScript.\n\n" +
                "• Intervenciones Críticas del Desarrollador (Criterio Humano Senior):\n" +
                "  - Seguridad de Cookies y CORS: Los modelos de IA suelen caer en el antipatrón de devolver el token en el body y almacenarlo en localStorage, o configuran allowed_origins=['*'] lo cual anula el transporte de credenciales con cookies HttpOnly. Se tuvo que intervenir manualmente en config/cors.php y en JwtService para configurar SameSite=Lax, Secure condicional (false en HTTP local, true en producción) y exposed_headers adecuados.\n" +
                "  - Patrón de Rollback Transaccional en Angular Signals: Las IAs convencionales proponen llamadas asíncronas tradicionales con 'loading' bloqueante. Fue necesario reescribir la lógica hacia una máquina de estados optimista con snapshots inmutables para cumplir fielmente el requerimiento de Optimistic UI.\n" +
                "  - Ocultamiento RBAC en el DOM: Se aseguró que para el rol 'Cliente', las acciones destructivas no solo tuvieran el atributo [disabled], sino que fueran completamente excluidas del árbol DOM mediante directivas estructurales (*ngIf), evitando manipulaciones por consola del navegador."
              ),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("Pregunta 3: Muestra 1 o 2 prompts clave utilizados para resolver problemas complejos")],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Prompt Clave 1 (Diseño de la Arquitectura de Seguridad HttpOnly y CORS):\n",
                bold: true,
              }),
              new TextRun(
                "\"Diseña una solución de autenticación para Laravel 12 y Angular 21 donde el token JWT sea emitido exclusivamente en una cookie Set-Cookie con flags HttpOnly, Secure adaptativo y SameSite=Lax. El endpoint /api/login debe devolver únicamente los datos de usuario y rol en el cuerpo JSON, sin exponer el token. Configura el interceptor HTTP de Angular con withCredentials: true y define las cabeceras CORS en Laravel para permitir la comunicación bidireccional entre localhost:4200 y localhost:8000.\"\n\n"
              ),
              new TextRun({
                text: "Prompt Clave 2 (Implementación del Patrón Optimistic UI con Rollback en Signals):\n",
                bold: true,
              }),
              new TextRun(
                "\"Crea un servicio VmStateService en Angular utilizando Signals donde las operaciones create, update, delete y toggleStatus modifiquen la lista local de inmediato (Optimistic UI) recalculando en tiempo real las métricas de vCPU, RAM y Disco asignados a máquinas activas. Implementa un mecanismo de Snapshot previo de manera que ante cualquier error HTTP (4xx o 5xx), el servicio revierta automáticamente la señal al estado exacto anterior y notifique el rollback al usuario mediante un ToastService.\""
              ),
            ],
          }),

          // SECCIÓN 6: CONCLUSIONES
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400 },
            children: [new TextRun("6. Conclusiones y Cumplimiento")],
          }),
          new Paragraph({
            children: [
              new TextRun(
                "La solución desarrollada para IFX Networks demuestra cómo conjugar una experiencia de usuario de primer nivel (Single Page Application fluida, reactiva e intuitiva con Dark Mode y WebSockets) con las más estrictas buenas prácticas de seguridad de nivel bancario (defensa en profundidad mediante cookies HttpOnly, autorización por middleware y validación simétrica en cliente y servidor). El proyecto se encuentra 100% operativo y listo para su evaluación en C:\\wamp64\\www\\."
              ),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = 'C:\\wamp64\\www\\DOCUMENTACION_PRUEBA_TECNICA_IFX.docx';
  fs.writeFileSync(outputPath, buffer);
  console.log(`Documento Word generado exitosamente en: ${outputPath}`);
}

createDocumentation().catch(err => {
  console.error("Error generando documento Word:", err);
  process.exit(1);
});