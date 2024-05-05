# Transfers lambdas cluster

## Description

Este cluster de lambdas permite la administración de transfers así como la restauración de respaldos.

### Requirements

* AWS CLI

### Intructions

* Instalar dependencias
* Ejecutar el comando start:dev command
* Copia el archivo `.env.example` y guárdalo como `.env.local` para poder consumir dynamodb y s3 en local.

```bash
yarn 
```

#### Scripts

##### Ejecutar el comando para arrancar serverless en local

```sh
yarn start:dev
```

##### Compilar

```sh
yarn build
```

##### Desplegar funciones

```sh
yarn deploy --stage dev
```

##### Desplegar función

```sh
yarn deploy:fn $function --stage dev
```

##### Ejecutar tests unitarios

```sh
yarn test
```

##### Subir un archivo de respaldo al bucket en s3

```sh
yarn backup ./private/transfers_back_test.json test-etpay-transfers-backup
```

#### Client

Existe una colección de [bruno](https://usebruno.com) en el directorio `.bruno` que se puede utilizar para consumir los servicios.
