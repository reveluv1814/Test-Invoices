# Guía de Instalación

Esta guía cubre el proceso completo de instalación, configuración y ejecución del proyecto.

## Requisitos del Sistema

### Software necesario

- **Node.js**: Versión 20.x o superior
- **npm**: Versión 10.x o superior (incluido con Node.js)
- **Git**: Para clonar el repositorio (opcional)

### Verificar versiones instaladas

```bash
node --version
npm --version
```

Si no tienes Node.js instalado, descárgalo desde [nodejs.org](https://nodejs.org/)

## Instalación

### 1. Obtener el proyecto

**Opción A: Clonar repositorio**
```bash
git clone <url-del-repositorio>
cd prueba
```

**Opción B: Descomprimir archivo**
```bash
unzip prueba.zip
cd prueba
```

### 2. Configuración de variables de entorno
```bash
cp .env.sample .env
```

### 3. Instalar dependencias

```bash
npm ci
```

Este comando instalará todas las dependencias listadas en `package.json`, incluyendo:
- React 19
- TypeScript
- Vite
- React Router DOM
- React Hook Form
- Zod
- React PDF
- Mock Service Worker (MSW)
- RemixIcon

### 4. Verificar instalación

```bash
npm list --depth=0
```

Deberías ver todas las dependencias instaladas sin errores.

## Configuración

### Variables de entorno

El proyecto incluye un archivo `.env` con la siguiente configuración:

```env
# .env
VITE_BASE_URL="http://localhost:5173"
```

Esta variable define la URL base de la aplicación. 

El proyecto utiliza Mock Service Worker para simular la API, por lo que no requiere configuración adicional de backend.

### Configuración de MSW

Mock Service Worker está preconfigurado y se inicializa automáticamente en modo desarrollo. El archivo `public/mockServiceWorker.js` es generado por MSW y no debe modificarse manualmente.

## Ejecución

### Modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

El servidor de desarrollo se recargará automáticamente cuando hagas cambios en el código.

### Modo producción

**Compilar el proyecto y ejecutar el proyecto:**
```bash
npm run start
```


La vista previa estará disponible en: `http://localhost:5173`

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con hot reload |
| `npm run build` | Compila el proyecto para producción |
| `npm run preview` | Previsualiza el build de producción localmente |
| `npm run start` | Compila y ejecuta en modo producción |
| `npm run lint` | Ejecuta ESLint para verificar el código |
| `npm run format` | Formatea el código con Prettier |
| `npm run format-check` | Verifica el formato del código sin modificar archivos |
| `npm run test:e2e` | Ejecuta tests E2E con Playwright |
| `npm run test:mobile` | Ejecuta tests solo en navegadores móviles |
| `npm run test:codegen` | Genera tests manuales con Playwright Codegen |
| `npm run test:codegen:mobile` | Genera tests manuales en modo móvil |

## Testing

### Configuración de Playwright

El proyecto incluye tests End-to-End (E2E) con Playwright que validan los flujos principales de la aplicación.

**Navegadores instalados:**
- Chromium (configurado por defecto)
- Firefox (comentado)
- WebKit (comentado)

### Ejecutar tests

**Ejecutar todos los tests:**
```bash
npm run test:e2e
```

**Ejecutar solo en móviles:**
```bash
npm run test:mobile
```
### Estructura de tests

```
tests/
└── e2e/
    ├── search.spec.ts     # Tests de búsqueda de clientes
    └── invoices.spec.ts   # Tests de tabla y flujo de pago
```

### Configuración

La configuración de Playwright está en `playwright.config.ts`:
- Puerto base: `http://localhost:5173`
- Servidor automático: Se inicia automáticamente al ejecutar tests
- Screenshots: Solo en fallos
- Traces: Solo en retry

## Solución de Problemas

### El Service Worker de MSW no se activa

**Problema**: La primera vez que ejecutas la aplicación, MSW puede tardar unos segundos en activarse.

**Solución**: Espera unos segundos y recarga la página. Si el problema persiste, verifica que el archivo `public/mockServiceWorker.js` existe.



## Próximos Pasos

Una vez instalado y ejecutando:

1. Abre `http://localhost:5173` en tu navegador
2. Usa los IDs de prueba: `CUST001`, `CUST002`, `CUST003`
3. Consulta [README.md](README.md) para más información sobre el uso
4. Revisa [src/docs/documentation.md](src/docs/documentation.md) para detalles de diseño

