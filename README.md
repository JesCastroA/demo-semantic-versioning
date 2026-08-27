# Guía Práctica: Acciones Clave en Repositorios de Código y Semantic Versioning
### AUY1102 — Ciclo de Vida del Software | EA1 | IL2.1 | Modalidad Individual | ~1 hora

Esta guía complementa la guía oficial de la Fundación Duoc UC, agregando comandos exactos, un mini-proyecto concreto para practicar Semantic Versioning, checkpoints de verificación y errores comunes con su solución.

---

## 0. Antes de empezar — Checklist de preparación (5 min)

Verifica en la terminal que tienes lo necesario:
```bash
git --version
node --version
npm --version
```
Si falta algo, instala Git desde **git-scm.com** y Node.js LTS desde **nodejs.org**.

Configura tu identidad en git (una sola vez por computador):
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-correo@duocuc.cl"
```

> **Tip para trabajo grupal:** definan antes de empezar quién hace el fork (esa persona será la "dueña" del repo forkeado) y si el resto del grupo clonará ese mismo fork o trabajará cada uno con su propio fork. Para esta actividad, lo más simple es que **cada integrante haga su propio fork**, así todos practican el flujo completo.

---

## 1. Fork del repositorio (5 min)

1. Entra a: `https://github.com/nancyB3a`
2. Busca el repositorio de la actividad `demo-semantic-versioning` .
3. Clic en **"Fork"** (esquina superior derecha).
4. Confirma la creación bajo tu propia cuenta de GitHub.

**Checkpoint:** en tu perfil de GitHub debería aparecer el repo con la etiqueta `forked from nancyB3a/...`.

---

## 2. Clonar el repositorio a tu computador (5 min)

En tu fork, clic en **"Code"** → copiar la URL HTTPS.

```bash
git clone https://github.com/<tu-usuario>/<nombre-repo>.git
cd <nombre-repo>
```

**Checkpoint:**
```bash
git remote -v
```
Debe mostrar tu fork como `origin` (no el repo original de Duoc).

---

## 3. Crear una rama de trabajo (5 min)

**Nunca se trabaja directamente sobre `main`.** Cada cambio va en su propia rama.

```bash
git checkout -b feature/mi-cambio
```

Ejemplos de nombres de rama según el tipo de cambio (buena práctica de la industria):
- `feature/agregar-boton-login` → una funcionalidad nueva
- `fix/corregir-typo-readme` → una corrección
- `docs/actualizar-instrucciones` → solo documentación

**Checkpoint:**
```bash
git branch
```
Debe mostrar `* feature/mi-cambio` con el asterisco indicando la rama activa.

---

## 4. Mini-proyecto práctico: hacer cambios reales para versionar (15 min)

La guía oficial pide "incrementar la versión en `package.json`", pero para que la actividad tenga sentido, **el cambio de versión debe reflejar un cambio de código real**. Aquí tienen un mini-proyecto concreto de 10-15 minutos para no perder tiempo pensando qué modificar.

### 4.1 Crear la base del proyecto (el repo sólo tiene un HTML)

El repositorio forkeado trae un contenido, cada estudiante crea esta estructura mínima:

`package.json`:
```json
{
  "name": "demo-semantic-versioning",
  "version": "1.0.0",
  "description": "Práctica de Semantic Versioning - AUY1102",
  "scripts": {
    "start": "node index.js"
  }
}
```

`index.js`:
```javascript
function saludar(nombre) {
  return `Hola, ${nombre}!`;
}

console.log(saludar("estudiante"));
```

```bash
git add .
git commit -m "chore: estructura inicial del proyecto v1.0.0"
git push origin feature/mi-cambio
```

### 4.2 Ronda de cambios — practicar los 3 tipos de SemVer

Cada estudiante hace **tres cambios distintos, uno por uno**, para vivenciar la diferencia entre PATCH, MINOR y MAJOR. Después de cada cambio: commit, push, y anotar en una tabla qué tipo de versión correspondería.

| Cambio a realizar | Tipo SemVer | Ejemplo de versión resultante |
|---|---|---|
| **PATCH** — corregir un error sin romper nada | Arreglar que `saludar()` no maneje nombres vacíos: `if (!nombre) return "Hola, desconocido!";` | `1.0.0` → `1.0.1` |
| **MINOR** — agregar una funcionalidad nueva y compatible | Agregar una función nueva `despedir(nombre)` sin tocar `saludar()` | `1.0.1` → `1.1.0` |
| **MAJOR** — cambio que rompe compatibilidad | Cambiar `saludar(nombre)` para que ahora reciba un objeto `saludar({nombre, idioma})` en vez de un string — quien use la función a la antigua se rompe | `1.1.0` → `2.0.0` |

**Comandos para cada ronda** (repetir 3 veces, ajustando el mensaje y el archivo `package.json`):
```bash
# 1. Editar index.js con el cambio correspondiente
# 2. Editar package.json actualizando manualmente el campo "version"
git add .
git commit -m "fix: saludar maneja nombres vacíos"   # o feat: / BREAKING CHANGE:
git push origin feature/mi-cambio
```

> **Sobre los mensajes de commit:** usar prefijos como `fix:`, `feat:` y `BREAKING CHANGE:` no es obligatorio en Git, pero es el estándar llamado **Conventional Commits**, que además es lo que usan herramientas automáticas para calcular la versión SemVer sola. Vale la pena que el curso lo conozca aunque en esta actividad se suba la versión a mano.

**Checkpoint:** al final de esta sección, `git log --oneline` debería mostrar 4 commits (el inicial + los 3 cambios), y `package.json` debería estar en `2.0.0`.

---

## 5. Crear el Pull Request (10 min)

1. Ve a tu repositorio forkeado en GitHub (ya con el push hecho).
2. GitHub muestra un banner: **"feature/mi-cambio had recent pushes"** con botón **"Compare & pull request"** → clic ahí.
3. Verifica que la comparación sea: `base: main` del **repo original de Duoc** ← `compare: feature/mi-cambio` de tu fork.
4. Completa:
   - **Título:** resumen corto, ej: `Implementa saludo/despedida con SemVer v2.0.0`
   - **Descripción:** qué cambios hiciste y por qué, mencionando explícitamente los 3 tipos de cambio (patch/minor/major) que aplicaste.
5. Clic en **"Create pull request"**.

**Checkpoint:** el PR debe aparecer en la pestaña "Pull requests" del repositorio original de la docente (no solo en tu fork).

> **Nota para la clase:** en un flujo real de código abierto, aquí el PR queda esperando revisión de un mantenedor. Para esta actividad académica, la docente puede revisar y aprobar los PRs del curso, o —si el objetivo es solo practicar el flujo— cada estudiante puede hacer el merge en su **propio fork** sin necesidad de esperar aprobación externa, ya que ahí sí son administradores.

---

## 6. Merge (5 min)

Si tienes permisos de administrador sobre el repositorio destino (tu propio fork, o el repo del curso si la docente los agregó como colaboradores):

1. En el Pull Request, clic en **"Merge pull request"**.
2. Confirma con **"Confirm merge"**.
3. Opcional: clic en **"Delete branch"** para limpiar la rama ya integrada.

Sincroniza tu copia local con el resultado del merge:
```bash
git checkout main
git pull origin main
```

**Checkpoint:** `cat package.json` (o abrir el archivo) en la rama `main` local debe mostrar ya la versión `2.0.0` y las funciones `saludar()` y `despedir()`.

---

## 7. Cierre — Tabla resumen para entregar (5 min)

Cada estudiante completa esta tabla como evidencia de la actividad (se puede pegar en el README o entregar aparte):

| Paso Git | Comando usado | Resultado |
|---|---|---|
| Fork | (vía interfaz web) | URL de mi fork: `_______` |
| Clone | `git clone ...` | Carpeta local creada |
| Branch | `git checkout -b feature/mi-cambio` | Rama creada |
| Commit x3 | `git commit -m "..."` | 3 commits (patch/minor/major) |
| Push | `git push origin feature/mi-cambio` | Rama subida a GitHub |
| Pull Request | (vía interfaz web) | Link del PR: `_______` |
| Merge | (vía interfaz web) | Estado: fusionado ✅ |
| Versión final | — | `1.0.0` → `2.0.0` |

---

## 8. Errores comunes y solución rápida

| Síntoma | Causa probable | Solución |
|---|---|---|
| `fatal: not a git repository` | Estás en la carpeta equivocada | `cd <nombre-repo>` antes de correr comandos git |
| `git push` pide usuario/contraseña y falla | GitHub ya no acepta contraseña por HTTPS | Generar un **Personal Access Token** en Settings → Developer settings, y usarlo como contraseña |
| El botón "Compare & pull request" no aparece | El push no llegó a GitHub, o se hizo a la rama equivocada | Verificar con `git branch` (rama activa) y `git log` (si el commit existe localmente) |
| `Merge pull request` aparece deshabilitado | No tienes permisos de administrador en ese repo, o hay conflictos sin resolver | Revisar el mensaje de GitHub bajo el botón: indica si son permisos o conflictos |
| Conflicto de merge (`CONFLICT (content)`) | Dos ramas modificaron las mismas líneas | Abrir el archivo marcado, elegir qué contenido dejar entre `<<<<<<<` y `>>>>>>>`, luego `git add .` y `git commit` |

---


- **Conectar con la clase anterior de CI/CD:** si el estudiante ya hizo la actividad de integración continua, pueden agregar aquí el mismo `pipeline.yml` para que cada `git push` corra tests automáticamente antes de aceptar el PR — así ven cómo SemVer, branches y CI/CD funcionan juntos en un flujo de trabajo real.
