# Despliegue de Proyecto Backend con Docker Compose y Kubernetes

[cite_start]Este repositorio contiene la configuración e implementación para desplegar una aplicación backend utilizando contenedores y herramientas de orquestación local[cite: 2, 33, 88].

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

---

## 🛠️ Stack Tecnológico
* [cite_start]**Entorno de Ejecución:** Node.js[cite: 5].
* [cite_start]**Contenedorización:** Docker y Docker Compose[cite: 7, 33].
* [cite_start]**Orquestación:** Kubernetes, `kubectl` y Minikube[cite: 10, 88].
* [cite_start]**Base de Datos:** PostgreSQL (mediante cliente `psql`)[cite: 44, 45].
* [cite_start]**Pruebas de Carga:** Apache JMeter y `curl`[cite: 14, 61, 68].

## 📋 Prerrequisitos e Instalación
Antes de iniciar, verifica que todas las herramientas estén instaladas y listas en tu entorno:
* [cite_start]Node.js: `node -v`[cite: 18].
* [cite_start]Docker: `docker --version` y `docker-compose --version`[cite: 22, 23].
* [cite_start]Kubernetes: `kubectl version --client-short` y `minikube version`[cite: 13, 24, 25].
* [cite_start]JMeter: `jmeter -v`[cite: 26].

## 🚀 Escenario 1: Despliegue con Docker Compose

1.  [cite_start]Configura las variables de entorno (credenciales, puertos) en el archivo `.env` ubicado en la raíz del proyecto[cite: 35].
2.  [cite_start]Levanta los contenedores en segundo plano ejecutando `docker-compose up -d`[cite: 38, 39].
3.  [cite_start]Verifica el estado y los puertos expuestos de los servicios con `docker-compose ps`[cite: 42].
4.  [cite_start]Inicializa la base de datos accediendo al contenedor: `docker-compose exec db psql -U <tu_usuario> -d <tu_basedatos>`[cite: 53].
5.  [cite_start]Comprueba que la API responde correctamente a través del puerto configurado (ej. 3000): `curl http://localhost:3000/health`[cite: 62, 63].
6.  [cite_start]Para detener y limpiar el entorno de contenedores, ejecuta `docker-compose down`[cite: 87, 254].

## 🏗️ Escenario 2: Despliegue con Kubernetes (Minikube)

1.  [cite_start]Inicia el clúster local ejecutando `minikube start`[cite: 90].
2.  [cite_start]Aplica todos los manifiestos YAML (Deployments, Services, etc.) contenidos en el directorio `k8s/` mediante: `kubectl apply -f k8s/`[cite: 92, 94].
3.  [cite_start]Espera a que los Pods alcancen el estado *Running* verificándolos con `kubectl get pods`[cite: 97, 98].
4.  [cite_start]Expón el servicio de la API para acceso local utilizando NodePort con `minikube service <nombre-servicio> --url`, o mediante reenvío de puertos con `kubectl port-forward service/<nombre-servicio> 8080:3000`[cite: 101, 105, 109, 110].
5.  [cite_start]Para inicializar la base de datos, ejecuta comandos SQL dentro del Pod de Postgres: `kubectl exec -it <nombre-pod-db> -- psql -U <usuario> -d <basedatos>`[cite: 123, 125, 126].
6.  [cite_start]Para escalar dinámicamente la aplicación bajo carga, ejecuta: `kubectl scale deployment backend-deployment --replicas=2`[cite: 144, 145].
7.  [cite_start]Una vez finalizadas las pruebas, elimina los recursos con `kubectl delete -f k8s/` y detén el clúster con `minikube stop`[cite: 162, 163].

## 📈 Pruebas de Carga con JMeter

[cite_start]El proyecto incluye la verificación del rendimiento mediante Apache JMeter[cite: 68, 164].
* [cite_start]Configura los samplers HTTP apuntando al entorno correspondiente: `localhost:3000` para Docker Compose, o la IP/puerto entregados por Minikube para Kubernetes[cite: 72, 73, 167, 168].
* [cite_start]Agrega un `HTTP Header Manager` para incluir obligatoriamente las cabeceras `Content-Type: application/json` y `Accept: application/json`[cite: 75, 77, 172, 173].

## 📧 Contacto

**David**
* LinkedIn: [Tu perfil]
* Correo: [Tu correo]
* GitHub: [@tuusuario]
