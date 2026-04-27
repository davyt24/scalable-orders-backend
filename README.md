# Despliegue de Proyecto Backend con Docker Compose y Kubernetes
Este repositorio contiene la configuración e implementación para desplegar una aplicación backend utilizando contenedores y herramientas de orquestación local.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

---

## 🛠️ Stack Tecnológico
* **Entorno de Ejecución:** Node.js.
* **Contenedorización:** Docker y Docker Compose.
* **Orquestación:** Kubernetes, `kubectl` y Minikube.
* **Base de Datos:** PostgreSQL (mediante cliente `psql`).
* **Pruebas de Carga:** Apache JMeter y `curl`.

## 📋 Prerrequisitos e Instalación
Antes de iniciar, verifica que todas las herramientas estén instaladas y listas en tu entorno:
* Node.js: `node -v`.
* Docker: `docker --version` y `docker-compose --version`.
* Kubernetes: `kubectl version --client-short` y `minikube version`.
* JMeter: `jmeter -v`.

## 🚀 Escenario 1: Despliegue con Docker Compose

1.  Configura las variables de entorno (credenciales, puertos) en el archivo `.env` ubicado en la raíz del proyecto.
2.  Levanta los contenedores en segundo plano ejecutando `docker-compose up -d`.
3.  Verifica el estado y los puertos expuestos de los servicios con `docker-compose ps`.
4.  Inicializa la base de datos accediendo al contenedor: `docker-compose exec db psql -U <tu_usuario> -d <tu_basedatos>`.
5.  Comprueba que la API responde correctamente a través del puerto configurado (ej. 3000): `curl http://localhost:3000/health`
6.  Para detener y limpiar el entorno de contenedores, ejecuta `docker-compose down`.

## 🏗️ Escenario 2: Despliegue con Kubernetes (Minikube)

1.  Inicia el clúster local ejecutando `minikube start`[cite: 90].
2.  Aplica todos los manifiestos YAML (Deployments, Services, etc.) contenidos en el directorio `k8s/` mediante: `kubectl apply -f k8s/`.
3.  Espera a que los Pods alcancen el estado *Running* verificándolos con `kubectl get pods`.
4.  Expón el servicio de la API para acceso local utilizando NodePort con `minikube service <nombre-servicio> --url`, o mediante reenvío de puertos con `kubectl port-forward service/<nombre-servicio> 8080:3000`.
5.  Para inicializar la base de datos, ejecuta comandos SQL dentro del Pod de Postgres: `kubectl exec -it <nombre-pod-db> -- psql -U <usuario> -d <basedatos>`.
6.  Para escalar dinámicamente la aplicación bajo carga, ejecuta: `kubectl scale deployment backend-deployment --replicas=2`.
7.  Una vez finalizadas las pruebas, elimina los recursos con `kubectl delete -f k8s/` y detén el clúster con `minikube stop`.

## 📈 Pruebas de Carga con JMeter

* El proyecto incluye la verificación del rendimiento mediante Apache JMeter
* Configura los samplers HTTP apuntando al entorno correspondiente: `localhost:3000` para Docker Compose, o la IP/puerto entregados por Minikube para Kubernetes.
* Agrega un `HTTP Header Manager` para incluir obligatoriamente las cabeceras `Content-Type: application/json` y `Accept: application/json`.

## 📧 Contacto

**David**
* LinkedIn: David Dueñas Torres
* Correo: davyt2003@gmail.com
* GitHub: davyt24
