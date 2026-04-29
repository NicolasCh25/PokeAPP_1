````md
# 📱 PokeApp - Consumo de API con Ionic

## 📌 Descripción
Esta aplicación desarrollada con Ionic consume la API pública de Pokémon (PokéAPI) para mostrar una lista de Pokémon, permitir búsquedas y visualizar detalles de cada uno.

---

## 🚀 Instalación del proyecto

1. Clonar el repositorio:
```bash
git clone https://github.com/jzaldumbide/pokeapp.git
````

2. Ingresar al proyecto:

```bash
cd pokeapp
```

3. Instalar dependencias:

```bash
npm install
```

4. Ejecutar la aplicación:

```bash
ionic serve
```

---

## 🧩 Estructura del proyecto

El consumo de la API sigue este flujo:

1. Servicio (`pokemon.service.ts`) → realiza las peticiones HTTP
2. Componente (`pokemon-list.page.ts`) → maneja la lógica
3. Vista (`pokemon-list.page.html`) → muestra los datos
4. Routing (`app-routing.module.ts`) → navegación
5. Vista detalle (`pokemon-detail.page.html`) → muestra información completa

---

## 🔌 1. Servicio (Consumo de la API)

📸 *Espacio para captura del código del servicio*

El servicio se encarga de comunicarse con la API.

### URL base

```ts
private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
```

---

### Obtener lista de Pokémon

```ts
getPokemons(limit: number): Observable<any> {
  return this.http.get(`${this.apiUrl}?limit=${limit}&offset=0`);
}
```

🔎 Este método:

* Solicita una lista de Pokémon
* Devuelve nombre y URL de cada uno

---

### Obtener detalle de un Pokémon

```ts
getPokemonDetail(name: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/${name}`);
}
```

🔎 Este método:

* Consulta un Pokémon específico
* Devuelve datos completos:

  * Imagen
  * Tipos
  * Stats
  * Altura y peso

---

## 📄 2. Lista de Pokémon (`pokemon-list.page.ts`)

📸 *Espacio para captura del código*

### Código principal

```ts
import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
})
export class PokemonListPage implements OnInit {

  pokemons: any[] = [];
  loading = false;
  searchTerm: string = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.fetchPokemons();
  }

  fetchPokemons() {
    this.loading = true;
    this.pokemons = [];

    this.pokemonService.getPokemons(20).subscribe({
      next: (response: any) => {
        const results = response.results;

        let loaded = 0;
        const total = results.length;

        results.forEach((pokemon: any) => {
          this.pokemonService.getPokemonDetail(pokemon.name)
            .subscribe({
              next: (detail: any) => {
                this.pokemons = [...this.pokemons, detail];
                loaded++;

                if (loaded === total) {
                  this.loading = false;
                }
              },
              error: () => {
                loaded++;
                if (loaded === total) {
                  this.loading = false;
                }
              }
            });
        });
      },
      error: (error) => {
        console.error('Error al cargar Pokémon:', error);
        this.loading = false;
      }
    });
  }

  searchPokemon() {
    const name = this.searchTerm.toLowerCase().trim();

    if (name === '') {
      this.fetchPokemons();
      return;
    }

    this.loading = true;
    this.pokemons = [];

    this.pokemonService.getPokemonDetail(name).subscribe({
      next: (pokemon: any) => {
        this.pokemons = [pokemon];
        this.loading = false;
      },
      error: () => {
        console.error('Pokémon no encontrado');
        this.loading = false;
      }
    });
  }
}
```

---

### Proceso de consumo

1. Se activa el loading
2. Se llama al servicio:

```ts
this.pokemonService.getPokemons(20)
```

3. Se recorren los resultados
4. Por cada Pokémon se obtiene el detalle:

```ts
this.pokemonService.getPokemonDetail(pokemon.name)
```

5. Se guardan en un array
6. Se desactiva el loading al finalizar

---

### Buscador

* Si está vacío → recarga la lista
* Si tiene texto → busca un Pokémon específico

---

## 🎨 3. Vista de lista (`pokemon-list.page.html`)

📸 *Espacio para captura del código*

### Código

```html
<ion-header>
  <ion-toolbar>
    <ion-title>Pokémon List</ion-title>
  </ion-toolbar>

  <ion-toolbar>
    <ion-searchbar
      [(ngModel)]="searchTerm"
      (ionInput)="searchPokemon()"
      placeholder="Buscar Pokémon">
    </ion-searchbar>
  </ion-toolbar>
</ion-header>

<ion-content>

  <ion-list>
    <ion-item *ngFor="let pokemon of pokemons"
              [routerLink]="['/pokemon', pokemon.name]">

      <ion-thumbnail slot="start">
        <img [src]="pokemon.sprites.front_default">
      </ion-thumbnail>

      <ion-label>
        <h2>{{ pokemon.name | titlecase }}</h2>
        <p>Altura: {{ pokemon.height }}</p>
        <p>Peso: {{ pokemon.weight }}</p>
      </ion-label>

    </ion-item>
  </ion-list>

  <ion-spinner *ngIf="loading"></ion-spinner>

</ion-content>
```

---

## 🔀 4. Routing (`app-routing.module.ts`)

📸 *Espacio para captura del código*

### Código

```ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'pokemon',
    pathMatch: 'full'
  },

  {
    path: 'pokemon',
    loadChildren: () =>
      import('./pages/pokemon-list/pokemon-list.module')
        .then(m => m.PokemonListPageModule)
  },

  {
    path: 'pokemon/:name',
    loadChildren: () =>
      import('./pages/pokemon-detail/pokemon-detail.module')
        .then(m => m.PokemonDetailPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

---

## 📊 5. Vista de detalle (`pokemon-detail.page.html`)

📸 *Espacio para captura del código*

### Código

```html
<ion-header>
  <ion-toolbar>

    <ion-buttons slot="start">
      <ion-back-button defaultHref="/"></ion-back-button>
    </ion-buttons>

    <ion-title>{{ pokemon?.name | titlecase }}</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content *ngIf="pokemon">

  <ion-card>

    <img [src]="pokemon.sprites.front_default">

    <ion-card-content>

      <h2>{{ pokemon.name | titlecase }}</h2>

      <p><strong>Altura:</strong> {{ pokemon.height }}</p>
      <p><strong>Peso:</strong> {{ pokemon.weight }}</p>

      <p><strong>Tipos:</strong></p>
      <ul>
        <li *ngFor="let type of pokemon.types">
          {{ type.type.name }}
        </li>
      </ul>

      <p><strong>Stats:</strong></p>
      <ul>
        <li *ngFor="let stat of pokemon.stats">
          {{ stat.stat.name }}: {{ stat.base_stat }}
        </li>
      </ul>

    </ion-card-content>

  </ion-card>

  <ion-spinner *ngIf="loading"></ion-spinner>

</ion-content>
```

---

## 🔄 Flujo completo del consumo

1. La app inicia
2. Se carga la lista
3. Se llama al servicio
4. Se obtiene la lista básica
5. Se hacen múltiples peticiones para detalles
6. Se muestran los datos
7. Se puede buscar un Pokémon
8. Se puede ver el detalle

---

## 🧠 Explicación del consumo

El consumo de la API se realiza en dos pasos:

1. Obtener lista básica de Pokémon
2. Obtener detalles individuales

Esto genera múltiples peticiones HTTP.

---

## 🎨 6. Agregar logo a la aplicación

### Paso 1: Guardar imagen

Colocar el logo en:

```
src/assets/
```

📸 *Espacio para captura de assets*

---



📸 *Espacio para captura del resultado*

---

## 📸 Resultados

📸 *Espacio para captura de la lista funcionando*

📸 *Espacio para captura del detalle*

📸 *Espacio para captura del buscador*

---

## ⚠️ Observaciones

* Se realizan múltiples llamadas HTTP
* Puede afectar el rendimiento

---

## 🚀 Mejoras posibles

* Uso de `forkJoin` (RxJS)
* Cache de datos
* Paginación

---

## 👨‍💻 Autor

Proyecto basado en:
[https://github.com/jzaldumbide/pokeapp.git](https://github.com/jzaldumbide/pokeapp.git)

```
```
