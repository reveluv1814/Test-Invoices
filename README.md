# Prueba Técnica - Sistema de Pago de Facturas

Aplicación web para consultar y gestionar el pago de facturas de servicios. Parte de la prueba técnica para la posición de Frontend Developer.

## Stack Tecnológico

- React 19 con TypeScript
- Vite como build tool
- React Router DOM para navegación
- React Hook Form + Zod para validación de formularios
- React PDF para generación de documentos
- Mock Service Worker (MSW) para simular API
- CSS con variables y diseño responsivo
- RemixIcon para iconografía

## Funcionalidades

La aplicación permite buscar facturas por ID de cliente, visualizarlas en una tabla con opciones de filtrado y paginación, procesar pagos con confirmación doble mediante modales, y generar PDFs de las facturas pagadas. Incluye un sistema de notificaciones tipo toast para feedback al usuario y manejo de diferentes estados como carga, error y datos vacíos.

Todas las búsquedas y acciones se validan con Zod antes de procesarse, y la interfaz se actualiza en tiempo real sin necesidad de recargar la página.

## Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── BannerCustom/     # Banner de notificaciones
│   ├── Breadcrumb/       # Navegación breadcrumb
│   ├── ConfirmModal/     # Modal de confirmación
│   ├── ErrorMessage/     # Mensajes de error
│   ├── FilterForm/       # Filtros de facturas
│   ├── InvoiceTable/     # Tabla de facturas y paginación
│   ├── PaymentModal/     # Modal de pago
│   ├── PdfComponents/    # Generación de PDF
│   ├── SearchForm/       # Búsqueda por cliente
│   └── Toast/            # Sistema de notificaciones
├── pages/                # Vistas principales
│   ├── SearchPage.tsx    # Búsqueda de cliente
│   └── InvoicesPage.tsx  # Gestión de facturas
├── routes/               # Configuración de rutas
│   └── index.tsx         # Definición de React Router
├── services/             # Capa de servicios
│   ├── httpWrapper.ts    # Cliente HTTP
│   └── invoiceService.ts # API de facturas
├── hooks/                # Custom hooks
│   ├── useInvoices.ts    # Lógica de facturas
│   └── useBodyScrollLock.ts # Control de scroll en modales
├── context/              # Context API
│   ├── ToastContext.tsx  
│   └── ToastProvider.tsx 
├── types/                # Tipos TypeScript
│   └── index.ts          # Interfaces y enums
├── utils/                # Utilidades
│   └── formatters.ts     # Formato de moneda y fechas
├── styles/               # Estilos globales
│   └── variables.css     # Variables CSS del sistema de diseño
├── mocks/                # Mock Service Worker
│   ├── data.ts           # Datos de prueba
│   ├── handlers.ts       # Handlers de MSW
│   └── browser.ts        # Configuración de MSW
├── docs/                 # Documentación
│   └── documentation.md  # Documentación de diseño
├── config/               # Configuración
│   └── config.ts         # Constantes de la aplicación
└── assets/               # Recursos estáticos
```

## Inicio Rápido
Todos los pasos para poner en marcha el proyecto están detallados en la sección [📦 Instalación](INSTALL.md).

Luego de seguir esos pasos, abre en tu navegador en:  `http://localhost:5173`


## Uso de la Aplicación

### Datos de prueba

La aplicación incluye tres clientes de prueba con facturas mock:

- **CUST001** - Juan Pérez (3 facturas)
- **CUST002** - María García (2 facturas)  
- **CUST003** - Carlos López (2 facturas)

### Flujo básico

1. Ingresa un ID de cliente (por ejemplo: `CUST001`) en la página inicial
2. La tabla mostrará todas las facturas asociadas al cliente
3. Usa los filtros superiores para buscar por estado (Pendiente/Pagado) o tipo de servicio
4. Para pagar una factura pendiente, haz clic en el botón "Pagar"
5. Revisa los detalles en el modal y confirma dos veces para procesar el pago
6. La factura cambiará automáticamente a estado "Pagado"
7. Las facturas pagadas tienen un botón "Ver PDF" que genera el documento

## Detalles Técnicos

### Sobre la implementación

Aunque el proyecto pueda parecer simple a primera vista, se implementaron numerosas buenas prácticas y consideraciones técnicas que van más allá de los requisitos básicos. Desde el diseño de la interfaz en Figma, el desarrollo de la aplicación hasta los test.

En cuanto al código,se implementó patrones como separación de responsabilidades, custom hooks para lógica reutilizable y buenas prácticas.

### Arquitectura

El proyecto sigue una arquitectura en capas con separación clara de responsabilidades. Los componentes están organizados por funcionalidad, cada uno con su propio archivo CSS y tipos TypeScript. La lógica de negocio está extraída en custom hooks que pueden reutilizarse.

### Mock Service Worker

MSW intercepta las peticiones HTTP en el navegador y responde con datos simulados. Incluye delays para simular latencia de red.

Los endpoints simulados son:
- `GET /api/customers/:id` - Verificar cliente
- `GET /api/invoices?customerId=XXX` - Listar facturas con filtros y paginación
- `POST /api/invoices/:id/pay` - Procesar pago

### Validación y formularios

`React Hook Form` maneja el estado de los formularios mientras `Zod` define los esquemas de validación. Esto permite validar datos tanto en el cliente como preparar la estructura para validaciones del servidor.

El ID de cliente debe ser alfanumérico en mayúsculas. Los pagos verifican que la factura no esté ya pagada antes de procesarse.

## Testing

El proyecto incluye pruebas End-to-End (E2E) implementadas con `Playwright` para asegurar que los flujos principales funcionan correctamente.

### Cobertura de tests

- **Search Page**: Validación de formulario, búsqueda de clientes, navegación
- **Invoices Page**: Visualización de tabla, filtros por estado y servicio
- **Payment Flow**: Proceso completo de pago con doble confirmación

### Ejecutar tests

```bash
# Ejecutar todos los tests
npm run test:e2e
```

Para más información sobre configuración de tests, consulta [INSTALL.md](INSTALL.md#testing)

## Diseño

El diseño de la aplicación fue prototipado en Figma antes de la implementación. Incluye las dos vistas principales (búsqueda y gestión de facturas) y define la paleta de colores completa que se utiliza en el proyecto.

Ver documentación completa del diseño en [src/docs/documentation.md](src/docs/documentation.md)

## Notas

- Los datos se almacenan en memoria y se reinician al recargar la página
- El Service Worker de MSW puede tardar un momento en inicializarse en la primera carga
- Las fechas se muestran en formato español

---

## Contacto
Para más información, contacta a: **neilgraneros11@gmail.com**
