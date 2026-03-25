# GitQuest

Videojuego educativo de navegador donde aprendes 
Git escribiendo comandos reales en un terminal 
integrado. Cada comando tiene un efecto visual 
inmediato en el juego.

🎮 [Jugar ahora](https://diegochavezmtz.github.io/DevQuest/)

---

## El problema que resuelve

Enseño Git a estudiantes de 4to y 5to semestre 
que lo usan por primera vez de forma real y no solo
para clonar repos.

El obstáculo más común no es la sintaxis — es 
abstraer las tres áreas de trabajo. Los estudiantes 
memorizan comandos sin entender qué está pasando 
ni por qué. Los diagramas no eran suficientes. Necesitaba 
algo tangible.

---

## La solución: Git como mecánica de RPG

Cada concepto de Git se convierte en algo físico 
que puedes ver y manipular:

| Git real | GitQuest |
|----------|----------|
| Working directory | Bolsa del jugador |
| Staging area | Crafting Table |
| Repositorio | Item forjado en la rama |
| `git add` | Mover items al Crafting Table |
| `git commit` | Forjar items según receta |
| `git reset` | Devolver items a la bolsa |
| Ramas (branches) | Líneas paralelas del dungeon |
| `git merge` | Fusionar items de dos ramas |
| Comandos git | Hechizos del grimorio |

Cuando un estudiante escribe `git merge` y ve 
dos items de ramas distintas fusionarse en uno 
más poderoso — o convertirse en burntCarbon si 
son incompatibles — entiende branching de una 
forma que ningún diagrama logra.

---

## Sistema de juego

### 7 tiers de items con progresión real

| Tier | Rareza | Cómo se obtiene |
|------|--------|-----------------|
| T0 | Fracaso | Merge de ramas incompatibles |
| T1 | Común | Recolectados en el dungeon |
| T2 | Inusual | `git commit` con 2 items |
| T3 | Raro | `git commit` con 3 items |
| T4 | Épico | `git commit` con 4 items |
| T5 | Legendario | `git merge` entre ramas T3/T4 |
| T6 | Mítico | `git merge` entre ramas T5 |
| T7 | Superior | `git merge` entre ramas T6 |

6 items base: manaStone, fireGem, iceGem, 
thunderShard, shadowEssence, lightEssence.

**50 recetas de craft. 32 recetas de merge.**

### Comandos implementados con lógica real
```bash
# Setup
git init
git config --global user.name "Nombre"
git config --global user.email "email"

# Flujo de trabajo
git add .
git reset
git commit -m "mensaje"

# Gestión de ramas
git branch
git branch <nombre>
git checkout -b <nombre>
git checkout <nombre>
git switch <nombre>
git merge <nombre>
```

### Mecánicas especiales

**Preview de merge** — antes de confirmar un 
merge, un modal muestra las dos ramas, sus items 
y el resultado esperado. Si son incompatibles, 
advierte antes de ejecutar.

**Dungeon aleatorio** — los items aparecen en 
posiciones aleatorias cada sesión (Fisher-Yates 
shuffle). El botón "Ir a otra sala" regenera 
el layout.

**Herencia de ramas** — una rama nueva parte 
con el mismo item que tenía la rama padre en 
ese momento, igual que en Git real.

**Persistencia total** — todo el estado 
sobrevive recargas de página via localStorage.

**Soporte móvil** — funciona en celular sin 
instalación. El em-dash de iOS se convierte 
automáticamente a `--` para no romper los 
comandos.

---

## Por qué funciona en el navegador

Diseñado para usarse en clase sin requisitos: 
sin instalación, sin cuenta, sin laptop 
obligatoria. Un estudiante puede jugarlo desde 
su celular mientras el profesor explica el 
concepto en paralelo.

---

## Decisiones técnicas

- **React + Context API** para estado global 
  del juego — permite agregar niveles sin 
  reescribir la lógica existente
- **Hooks personalizados** para separar lógica 
  de comandos, inventario y ramas
- **CSS puro con variables** — tema oscuro de 
  mazmorra con fuentes Cinzel y Crimson Pro
- **Sin backend** — todo corre en el cliente, 
  cero infraestructura necesaria

---

## Cómo correrlo localmente
```bash
git clone https://github.com/DiegoChavezMtz/DevQuest
cd devquest
npm install
npm run dev
```

---

## Estado del proyecto

Funcional y usado en clases con 
estudiantes de ingeniería. En desarrollo activo 
basado en feedback de usuarios reales.

Próximo: sprites con fondo transparente, 
nuevos dungeons y sistema de progresión 
entre sesiones.

---

## Por qué lo construí

Creo que la mejor forma de entender algo a fondo 
es tener que enseñárselo a alguien más. Y construir
herramientas para potenciar la enseñanza.
