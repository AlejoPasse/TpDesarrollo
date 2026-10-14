docker run --name gym-database `
    -v "(ruta de la carpeta local para alamcenar la data base):/var/lib/mysql" `
    -e MYSQL_ROOT_HOST='%' `
    -e MYSQL_ALLOW_EMPTY_PASSWORD="yes" `
    -e MYSQL_PASSWORD="dsw" `
    -e MYSQL_USER="dsw" `
    -e MYSQL_DATABASE='gymdb' `
    -p 3306:3306 `
    -d percona/percona-server

### El comando de arriba inicializa el un servidor mysql con docker, necesitan instalar docker desktop para que funcione


### el separador (`) es en powershell, en cmd es (^) y en gitbash o wsl es (\) cuando abren una terminal arriba a la derecha de la misma les dice cual es
 
### necesitan las extensiones de "mysql shel for vscode" y una para ver los containers de docker.

para iniciarlo: docker start gym-database

para apagarlo es: docker stop gym-database

LUEGO en mysql.commands.sql esta todo el comando, compian pegan en mysql workbench y con shift intro crean la base de datos y las tablas,
### Aclaracion: las tablas estan vacias (salvo por 1 dato en usuarios)