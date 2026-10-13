docker run --name gym-database `
    -v "acá va la ruta donde quieren guardar el server(puede ser donde quieran)":/var/lib/mysql `
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

luego de hacer esto queda inciciado para apagarlo es: docker stop gym-database

y para volver a iniciarlo: docker start gym-database