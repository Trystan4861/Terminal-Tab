# Changelog

Todos los cambios relevantes del proyecto **Terminal Tab Launcher** serán
documentados en este archivo.

El formato está basado en [Keep a Changelog][keepachangelog] y este
proyecto sigue versionado semántico.

[keepachangelog]: https://keepachangelog.com/es-ES/1.0.0/

---

## [1.0.6] - 2026-09-17

### Cambios de identificación

- Renombrada la terminal administrada a `TTL` para facilitar su
  identificación.
- Conservado el nombre `TTL` aunque se ejecuten comandos dentro de la
  terminal.

## [1.0.5] - 2026-09-17

### Fixed

- Minor bug fixes.
- Restaurada la reutilización de la terminal activa al abrir la extensión.
- Evitado el relanzamiento accidental del comando al mostrar una terminal
  existente.

## [1.0.4] - 2026-09-17

### Cambios de funcionalidad

- Añadido menú desplegable al pasar el cursor sobre el icono del status bar.
- Añadida acción **Configurar** para definir el comando que se ejecuta al
  abrir la pestaña de terminal.
- Añadidas acciones para mostrar la terminal y relanzar el comando
  configurado.
- Actualizado el tooltip para mostrar el comando actual y sus acciones
  disponibles.
- Consolidada la versión final del día en una única entrada del changelog.

## [1.0.0] - 2026-06-22

### Versión inicial

Primera versión estable de la extensión **Terminal Tab Launcher** para
Visual Studio Code.

### Características principales

- ✅ Integración con el terminal integrado de Visual Studio Code.
- ✅ Gestión mejorada de pestañas de terminal.
- ✅ Apertura rápida de nuevas sesiones de terminal.
- ✅ Organización visual de terminales abiertos.
- ✅ Compatibilidad con múltiples instancias de terminal.
- ✅ Soporte para configuración desde `package.json`.
- ✅ Internacionalización básica, incluido el soporte en español mediante
  `package.nls.es.json`.
- ✅ Iconos personalizados para la extensión (`icon.png`, `icon_big.png`).
- ✅ Documentación incluida en inglés y español (`README.md`, `README_ES.md`).

### Aspectos técnicos

- Extensión desarrollada en JavaScript (Node.js).
- Punto de entrada principal: `extension.js`.
- Configuración y definición de comandos en `package.json`.
- Compatible con versiones modernas de Visual Studio Code.
- Estructura preparada para futuras ampliaciones y mejoras funcionales.

### Distribución

- Proyecto preparado para publicación como extensión de VS Code.
- Incluye licencia (`LICENSE.md`).
- Workspace de desarrollo incluido (`Terminal_Tab.code-workspace`).

---

Este archivo será actualizado en futuras versiones para reflejar mejoras,
nuevas funcionalidades y correcciones de errores.
