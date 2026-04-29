# 🎓 Escuela Politécnica Nacional  
## 📱 Aplicaciones Móviles  
### 👨‍💻 Autor: Nicolás Chiguano  

---

# 📱 PokeApp - Consumo de API con Ionic

## 📌 Descripción
Esta aplicación móvil desarrollada con **Ionic Framework** consume la API pública **PokéAPI** para mostrar una lista de Pokémon, realizar búsquedas dinámicas y visualizar información detallada de cada uno.

El proyecto demuestra el uso de **peticiones HTTP, manejo de estados y navegación en aplicaciones móviles híbridas**.

---

## 🚀 Instalación del proyecto

1. Clonar el repositorio:
    git clone https://github.com/jzaldumbide/pokeapp.git

2. Ingresar al proyecto:
    cd pokeapp

3. Instalar dependencias:
    npm install

4. Ejecutar la aplicación:
    ionic serve

---

## 🧩 Arquitectura del proyecto

El consumo de la API sigue una arquitectura basada en separación de responsabilidades:

- 🔌 Servicio → Maneja las peticiones HTTP  
- ⚙️ Componente → Controla la lógica  
- 🎨 Vista → Muestra los datos  
- 🔀 Routing → Navegación entre páginas  

---

## 🔌 1. Servicio (Consumo de API)

### URL base
private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

### Obtener lista de Pokémon
getPokemons(limit: number): Observable<any> {
  return this.http.get(`${this.apiUrl}?limit=${limit}&offset=0`);
}

### Obtener detalle de un Pokémon
getPokemonDetail(name: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/${name}`);
}

---

## 📄 2. Lista de Pokémon

Funcionalidades principales:
- Carga inicial de Pokémon
- Múltiples peticiones para obtener detalles
- Buscador dinámico
- Manejo de estado de carga (loading)

---

## 🔄 Proceso de consumo

1. Se activa el estado de carga  
2. Se obtiene la lista básica de Pokémon  
3. Se recorren los resultados  
4. Se realiza una petición por cada Pokémon  
5. Se almacenan los datos en un array  
6. Se renderiza la información en la vista  

---

## 🔍 Buscador

- Si el campo está vacío → recarga la lista  
- Si tiene texto → busca un Pokémon específico  

---

## 🎨 3. Vista de lista

Se utilizan componentes de Ionic:

- ion-list  
- ion-item  
- ion-thumbnail  
- ion-searchbar  

Permite:
- Visualizar Pokémon  
- Navegar al detalle  
- Buscar en tiempo real  

---

## 🔀 4. Routing

{
  path: 'pokemon/:name',
  loadChildren: () =>
    import('./pages/pokemon-detail/pokemon-detail.module')
      .then(m => m.PokemonDetailPageModule)
}

---

## 📊 5. Vista de detalle

Muestra:
- Imagen  
- Nombre  
- Altura y peso  
- Tipos  
- Estadísticas  

---

## 🔄 Flujo completo de la aplicación

1. Inicio de la app  
2. Carga de lista  
3. Consumo de API  
4. Renderizado de datos  
5. Búsqueda de Pokémon  
6. Navegación al detalle  

---

## 🧠 Conceptos aplicados

- Consumo de APIs REST  
- Programación asíncrona (Observables)  
- Arquitectura modular  
- Manejo de estados  
- Navegación en Ionic  

---

## 🎨 Personalización

Puedes agregar tu logo en:
src/assets/

---

## 📸 Resultados

📸 Lista de Pokémon  
📸 Detalle de Pokémon  
📸 Buscador funcionando  

---

## 👨‍💻 Autor

**Nicolás Chiguano**  
Escuela Politécnica Nacional  
Aplicaciones Móviles  

Proyecto basado en:  
https://github.com/jzaldumbide/pokeapp.git
