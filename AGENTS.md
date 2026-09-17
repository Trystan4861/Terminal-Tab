# Instrucciones para agentes

## Publicación de releases

- Al crear o actualizar notas de GitHub Releases, usar saltos de línea reales.
- No pasar cadenas con `\\n` escapados como texto literal a `gh release create` o `gh release edit`.
- Para notas multilínea, usar un heredoc y sustitución de comandos:

```bash
gh release create vX.Y.Z --title "vX.Y.Z" --notes "$(cat <<'EOF'
### Changes

- First change.
- Second change.
EOF
)"
```

- Verificar el resultado con:

```bash
gh release view vX.Y.Z --json body
```

- Confirmar que la salida contiene saltos de línea reales y no la secuencia literal `\\n`.
- Mantener las notas concisas y organizadas en listas Markdown.
