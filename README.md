# GitQuest

Un juego de rol educativo donde aprendes Git 
crafteando items mágicos en un dungeon.

## El problema que resuelve

Enseño Git a estudiantes de 4to y 5to semestre 
que lo usan por primera vez de forma real — no 
solo para clonar repos.

El obstáculo más común no es la sintaxis. Es 
abstraer las tres áreas de trabajo: working 
directory, staging area y repositorio. Los 
estudiantes memorizan los comandos pero no 
entienden qué está pasando ni por qué.

Los simuladores de terminal no ayudan — siguen 
siendo abstractos. Necesitaba algo tangible.

## La solución

Cada área de Git se convierte en un lugar físico 
con objetos que puedes ver y mover:

| Git | GitQuest |
|-----|----------|
| Working directory | Mapa del dungeon |
| git add | Mover items a la Crafting Table |
| Staging area | Crafting Table |
| git commit | Fusionar items al Repositorio |
| git reset | Devolver items al inventario |

La metáfora no es decorativa — es funcional. 
Cuando un estudiante escribe `git add .` y ve 
sus items moverse físicamente a la Crafting 
Table, entiende qué hace staging de una forma 
que ningún diagrama logra.

La inspiración fue D&D y el crafting de items: 
si juntas ingredientes en una mesa de trabajo 
y los confirmas, obtienes un artefacto más 
poderoso. Eso es exactamente lo que hace un 
commit.

## Decisiones de diseño

**Sin instalación, sin requisitos.**
Corre completamente en el navegador para que 
funcione en cualquier dispositivo — incluyendo 
el celular de un estudiante que no tiene laptop 
en clase. El único requisito es una URL.

**Sesiones cortas e independientes.**
No es una campaña larga. Está diseñado para 
usarse en 15-20 minutos dentro de una clase, 
enfocado en un concepto específico. El 
localStorage mantiene el progreso sin necesitar 
cuenta ni backend.

**React para escalar niveles.**
La arquitectura en componentes permite agregar 
nuevos niveles y comandos sin reescribir la 
lógica existente. Cada nivel es independiente 
y reutiliza los mismos componentes de consola, 
inventario y mapa.

## Flujo actual
```
git init → git config → explorar dungeon 
→ recolectar items → git add → git commit 
→ artefacto forjado
```

Cada comando tiene un efecto visual inmediato 
en el juego. El jugador aprende Git haciendo, 
no leyendo.

## Stack

- React + Vite
- React Router para la navegación entre niveles
- localStorage para persistencia de sesión
- GitHub Pages para deploy

## Estado del proyecto

El juego cubre el flujo core de Git: 
init → config → add → commit → reset.

En desarrollo activo basado en feedback de 
estudiantes reales. Los comandos avanzados 
(branch, merge, push) están planeados como 
niveles futuros.

## Cómo correrlo localmente
```bash
git clone https://github.com/DiegoChavezMtz/DevQuest
cd devquest
npm install
npm run dev
```

## Por qué lo construí

Porque la mejor forma de entender algo a fondo 
es tener que enseñárselo a alguien más — y la 
mejor forma de enseñarlo es hacerlo imposible 
de malinterpretar.
