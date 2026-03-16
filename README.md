# 📖 Digital Lookbook — Manifiesto de Diseño 2026

> Exploración de HTML5 semántico y CSS Grid para crear una experiencia visual **asimétrica, accesible y elegante**.

---

## 🔗 Enlaces del Proyecto

[![GitHub](https://github.com/leiderdiazcarrillo/lookbook-digital.m)
[![Live](https://img.shields.io/badge/Web-Ver%20Proyecto-007bff?style=for-the-badge&logo=googlechrome&logoColor=white)](https://tusitio.com)

---

## 📐 Características del Proyecto

### 1. 🏗️ Arquitectura Semántica y Accesible

Estructura construida con etiquetas HTML5 nativas para optimizar la accesibilidad **(A11y)** y el **SEO**:

| Etiqueta | Propósito |
|----------|-----------|
| `<header>` | Título principal y descripción del proyecto |
| `<main>` | Contenido más importante de la página |
| `<section>` / `<article>` | Bloques temáticos y unidades independientes |
| `<aside>` | Información complementaria |
| `<footer>` | Contacto, créditos y enlaces adicionales |

> ✨ Se añadieron comentarios en `index.html` y `style.css` para explicar el propósito de cada sección. Se incluyó imagen del autor en el pie de página.

---

### 2. 🎨 Diseño Asimétrico con CSS Grid

El layout rompe con la estructura tradicional mediante:

- **Grid responsive** con `grid-template-columns` variable (2, 3 y 5 columnas según pantalla)
- **Overlapping** (superposiciones) usando `grid-column`, `grid-row` y `z-index`, creando profundidad tipo revista
- **Adaptación móvil**: la grilla compleja se transforma en una columna fluida en pantallas pequeñas

```css
.challenges-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
}

@media (max-width: 480px) {
    .challenges-grid { grid-template-columns: 1fr !important; }
    .challenge-card  { padding: 24px 16px; }
    .challenge-num   { font-size: 2.5rem; }
}
```

---

### 3. 🎨 Estilo con Variables CSS (Custom Properties)

Se usan variables CSS para controlar el diseño de forma centralizada y mantenible:

```css
:root {
  --ink:  #0d0d0d;   /* Color base oscuro */
  --gold: #c9a84c;   /* Acento dorado     */
}
```

**Tipografías combinadas:**
- `Bebas Neue` → Titulares impactantes
- `DM Serif Display` → Títulos de sección
- `DM Sans` → Texto de cuerpo

---

### 4. 💬 Comentarios en el Código

El proyecto incluye comentarios claros en **español** para que cualquier persona entienda:

- ✅ Qué hace cada sección (`<header>`, `<main>`, `<footer>`, etc.)
- ✅ Por qué se usa cada regla CSS (grillas, colores, animaciones)
- ✅ La finalidad de cada elemento visual

---

### 5. 🖼️ Imagen del Autor

La foto del autor se encuentra en `css/author-photo.jpeg` y se muestra en el pie de página con estilo circular:

```css
.author-avatar img {
    width: 50px;
    height: 50px;
    border-radius: 50%;      /* Hace la imagen circular  */
    object-fit: cover;       /* Ajusta sin distorsionar  */
}
```

---

### 6. 📦 Estructura del Repositorio

```
lookbook-digital/
├── index.html          ← Estructura semántica con comentarios
├── css/
│   ├── style.css       ← Estilos, variables y Grid layout
│   └── author-photo.jpeg
└── README.md
```

---

### 🎯 Jerarquía Visual Elegida

| Principio | Descripción |
|-----------|-------------|
| 📝 Encabezados prominentes | Tipografía grande y llamativa para captar la atención |
| 🎨 Contraste de colores | Fondos oscuros + acentos brillantes para legibilidad |
| 📊 Grilla de 6 columnas | Distribución clara y estructurada del contenido |
| ✨ Elementos visuales | Imágenes y animaciones para enriquecer la experiencia |

---

### 🔗 Navegación rápida

```html
<!-- Enlace básico -->
<a href="https://github.com/tuusuario" target="_blank">Mi GitHub</a>

<!-- Enlace con estilo de botón -->
<a href="https://tusitio.com" target="_blank" class="btn">Visitar mi página</a>
```

```css
.btn {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}
```

---

## 👤 Autor

<table>
  <tr>
    <td align="center">
      <b>Leider Díaz Carrillo</b><br/>
      📚 Análisis y Desarrollo de Software (ADSO)<br/>
      📅 1 de marzo de 2026
    </td>
  </tr>
</table>

---

<p align="center">
  Hecho con ❤️ y mucho CSS Grid
</p>
