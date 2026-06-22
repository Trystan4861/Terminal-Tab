# 🚀 Terminal Tab Launcher

![Logo](icon.png)

Abre un **Terminal integrado dentro del área del editor de VS Code** con un solo atajo — y ejecuta *el comando que tú quieras* al instante.

Convierte tu editor en un auténtico centro de control.

---

## ✨ ¿Por qué Terminal Tab Launcher?

Terminal Tab Launcher está pensado para desarrolladores que viven en su editor y trabajan constantemente con:

- CLIs de Inteligencia Artificial 🤖  
- Herramientas de build ⚙️  
- Servidores de desarrollo 🌐  
- Comandos Git 🔀  
- Scripts personalizados 🧩  

En lugar de cambiar de panel o dividir la pantalla, simplemente pulsa tu atajo y lanza tu flujo de trabajo directamente dentro del editor.

---

## 🤖 Ideal para Claude y otros CLIs de LLMs

Terminal Tab Launcher brilla especialmente cuando lo usas con herramientas modernas de IA en línea de comandos.

Puedes configurarlo para lanzar al instante:

- `claude`
- `openai`
- `chatgpt`
- `ollama`
- `llama`
- `gemini`
- `aider`
- `cursor`
- Cualquier wrapper personalizado de LLM
- O tu propio CLI de IA

Ejemplos de configuración:

```bash
claude
```

O:

```bash
claude --model sonnet
```

O incluso:

```bash
ollama run llama3
```

Ahora, al pulsar `Cmd+F1` / `Ctrl+F1`, se abre una terminal con tu asistente de IA listo para trabajar.

Tu copiloto de código, a un solo atajo.

---

## 🧠 Características

- ✅ Abre una terminal como pestaña en el área del editor
- ✅ Ejecuta automáticamente el comando configurado
- ✅ Comando totalmente configurable (por defecto: `whoami`)
- ✅ Acción en la paleta de comandos para cambiar el comando
- ✅ Acción en la paleta de comandos para abrir directamente la configuración
- ✅ Tooltip dinámico en la barra de estado mostrando el comando actual
- ✅ Reutiliza la terminal existente si ya está abierta
- ✅ Flujo de trabajo limpio y sin distracciones
- ✅ Perfecto para desarrollo AI‑first

---

## ⚡ Uso

Pulsa:

```txt
Cmd+F1 (macOS)
Ctrl+F1 (Windows/Linux)
```

O ejecuta:

```txt
Terminal Tab Launcher: Open Terminal
```

desde la paleta de comandos.

---

## ⚙ Configuración

Puedes configurar el comando de tres formas:

1. **Paleta → Terminal Tab Launcher: Set command**
2. **Paleta → Terminal Tab Launcher: Open command setting**
3. Desde la configuración de VS Code:

```txt
terminal-tab.command
```

Valor por defecto:

```txt
whoami
```

---

## 👨‍💻 Autor

**Manuel Palanco Correa**  
GitHub: [https://github.com/Trystan4861](https://github.com/Trystan4861)

Repositorio oficial:  
[https://github.com/Trystan4861/Terminal-Tab.git](https://github.com/Trystan4861/Terminal-Tab.git)

Documentación en inglés: [README.md](README.md)

---

## 🔥 Pensado para el desarrollo moderno

Terminal Tab Launcher nace en un contexto donde:

- La IA forma parte del flujo diario
- Muchas herramientas viven en la terminal
- Queremos menos fricción y menos cambios de contexto
- El editor es el centro del universo

Si tu flujo empieza en la terminal… trae la terminal a tu editor.

---

### ⭐ Si te resulta útil, dale una estrella al repositorio
