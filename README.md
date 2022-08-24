# HeroesApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.4.

# Secciones
Sección 12 HeroesApp - Rutas hijas y Lazyload
Subido: https://zen-dijkstra-03fc19.netlify.app

Sección 13 HeroesApp - Angular Material & Angular Flex-Layout
Sección 14 HeroesApp - CRUD
Sección 15 HeroesApp - Protección de rutas

# Uso de Angular [Flex-Layout](https://www.npmjs.com/package/@angular/flex-layout)
Instalación
```
npm i -s @angular/flex-layout @angular/cdk
```

# Íconos para Angular Material
Ir a esta dirección [fonts.google](https://fonts.google.com/icons?selected=Material+Icons:bookmark)

# Backend - JSON Server  
Se trabajó en el lado de desarrollo para el backend con JSON Server: 
```
https://www.npmjs.com/package/json-server  

```

INSTALACIÓN. Abrir un cmd en modo administrador. Se instalará de manera global (-g)
```
npm install -g json-server
```

Datos a usar como BD [db.json](https://gist.github.com/Klerith/403c91e61d3c87284beb0dd138619958)


Iniciar servidor json-server, abrimos un cd y nos dirigimos al directorio donde está el db.json y ejecutamos:
```
json-server --watch db.json
```

# Diferencia entre canLoad y canActivate 
[Tomado de StackOverflow](https://stackoverflow.com/questions/42026045/difference-between-angulars-canload-and-canactivate)
El CanLoad Guard evita la carga del módulo lazy Loaded. 
Generalmente usamos este guardia cuando no queremos que el usuario no autorizado 
navegue a ninguna de las rutas del módulo y también se detenga entonces incluso a 
ver el código fuente del módulo.

El Angular proporciona canActivate Guard, que evita que un usuario no autorizado acceda a la ruta. 
Pero no impide que el módulo se descargue. El usuario puede usar la consola de desarrollador de Chrome 
para ver el código fuente. CanLoad Guard impide que se descargue el módulo.

En realidad, CanLoad protege un módulo para ser cargado, pero una vez que el módulo está cargado, 
el guardia CanLoad no hará nada. Supongamos que hemos protegido la carga de un módulo utilizando canLoad guard 
para usuarios no autenticados. Cuando el usuario esté conectado, ese módulo será aplicable para ser cargado y 
podremos navegar por las rutas secundarias configuradas por ese módulo. Pero cuando el usuario está desconectado, 
el usuario aún podrá navegar por esas rutas secundarias porque el módulo ya está cargado. En este caso, 
si queremos proteger las rutas hijas de usuarios no autorizados, también necesitamos usar canActivate guard.

Utilice CanLoad antes de cargar AdminModule:
```
{
  path: 'admin',
  loadChildren: 'app/admin/admin.module#AdminModule',
  canLoad: [ AuthGuardService ]
},
```
Después de cargar AdminModule, en el módulo AdminRouting podemos usar CanActivate para 
proteger a las rutas hijas de usuarios no autorizados como el siguiente:
```
{ 
  path: '',
  component: AdminComponent,
  children: [ 
    {
      path: 'person-list',
      component: PersonListComponent,
      canActivate: [ AuthGuardService ]
    }
  ]
} 
```