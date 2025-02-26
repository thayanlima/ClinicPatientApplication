Documentação da Aplicação

Visão Geral

A aplicação é uma solução fullstack para gerenciar pacientes, clínicas e o relacionamento entre eles. O backend foi desenvolvido em NestJS com banco de dados PostgreSQL, enquanto o frontend foi desenvolvido em React com Vite. A aplicação está conteinerizada usando Docker e Docker Compose, permitindo fácil execução local.

Funcionalidades
Backend
CRUD de Pacientes:

Criação, leitura, atualização e exclusão de pacientes.

Endpoints:

POST /patient: Cria um novo paciente.

GET /patient: Lista todos os pacientes.

GET /patient/:id: Retorna um paciente específico pelo ID.

PATCH /patient/:id: Atualiza um paciente existente.

DELETE /patient/:id: Remove um paciente.

CRUD de Clínicas:

Criação, leitura, atualização e exclusão de clínicas.

Endpoints:

POST /clinic: Cria uma nova clínica.

GET /clinic: Lista todas as clínicas.

GET /clinic/:id: Retorna uma clínica específica pelo ID.

PATCH /clinic/:id: Atualiza uma clínica existente.

DELETE /clinic/:id: Remove uma clínica.

Relacionamento entre Pacientes e Clínicas:

Um paciente pode estar associado a várias clínicas, e uma clínica pode ter vários pacientes.

Endpoints:

POST /patient-clinic: Cria um relacionamento entre um paciente e uma clínica.

GET /patient-clinic: Lista todos os relacionamentos.

PATCH /patient-clinic/:id: Atualiza um relacionamento existente.

DELETE /patient-clinic/:id: Remove um relacionamento.

Documentação da API:

A API está documentada usando Swagger, que pode ser acessada em http://localhost:3001/api após iniciar o backend.

Frontend
Tela de Pacientes:

Lista todos os pacientes cadastrados.

Permite adicionar, editar e excluir pacientes.

Tela de Clínicas:

Lista todas as clínicas cadastradas.

Permite adicionar, editar e excluir clínicas.

Tela de Relacionamentos:

Lista os relacionamentos entre pacientes e clínicas.

Permite adicionar, editar e excluir relacionamentos.

Tecnologias Utilizadas
Backend
Linguagem: TypeScript

Framework: NestJS

Banco de Dados: PostgreSQL

ORM: TypeORM

Documentação: Swagger

Frontend
Linguagem: TypeScript

Framework: React + Vite

Estilização: CSS ou biblioteca de componentes (ex.: Material-UI)

Containerização
Docker: Para criar containers da aplicação.

Docker Compose: Para orquestrar os serviços (backend, frontend e banco de dados).

Estrutura do Projeto
O projeto está dividido em duas pastas principais:

backend: Contém o código do backend em NestJS.

frontend: Contém o código do frontend em React.

Além disso, o projeto utiliza Docker Compose para gerenciar os containers dos serviços.

Como Executar o Projeto Localmente
Pré-requisitos
Docker e Docker Compose instalados na máquina.

Passos para Execução
Clone o repositório:

git clone <URL_DO_REPOSITÓRIO>
cd <NOME_DO_REPOSITÓRIO>

Inicie os containers usando Docker Compose:

docker-compose up --build

Acesse a aplicação:

Frontend: Abra o navegador e acesse http://localhost:80.

Backend (API): Acesse http://localhost:3001.

Documentação da API (Swagger): Acesse http://localhost:3001/api.

Para parar a aplicação, execute:

docker-compose down

Banco de Dados
O banco de dados PostgreSQL é configurado automaticamente pelo Docker Compose. As tabelas são criadas usando as entidades definidas no backend:

Paciente: Patient (id, name, age)

Clínica: Clinic (id, name, address)

Relacionamento: PatientClinic (id, patientId, clinicId)

Considerações Finais
A aplicação foi desenvolvida seguindo boas práticas de desenvolvimento, como organização do código, uso de TypeScript e containerização.

O frontend foi projetado para ser simples, funcional e responsivo.

Nome do autor: Thayan Lima
GitHub: thayanlima

Application Documentation

Overview

The application is a full-stack solution for managing patients, clinics, and their relationships. The backend was developed using NestJS with a PostgreSQL database, while the frontend was built with React and Vite. The application is containerized using Docker and Docker Compose, enabling easy local execution.

Backend Features
CRUD for Patients
Create, read, update, and delete patient records.

Endpoints:

POST /patient: Creates a new patient.
GET /patient: Lists all patients.
GET /patient/:id: Retrieves a specific patient by ID.
PATCH /patient/:id: Updates an existing patient.
DELETE /patient/:id: Deletes a patient.
CRUD for Clinics
Create, read, update, and delete clinic records.

Endpoints:

POST /clinic: Creates a new clinic.
GET /clinic: Lists all clinics.
GET /clinic/:id: Retrieves a specific clinic by ID.
PATCH /clinic/:id: Updates an existing clinic.
DELETE /clinic/:id: Deletes a clinic.
Patient-Clinic Relationship
A patient can be associated with multiple clinics, and a clinic can have multiple patients.

Endpoints:

POST /patient-clinic: Creates a relationship between a patient and a clinic.
GET /patient-clinic: Lists all relationships.
PATCH /patient-clinic/:id: Updates an existing relationship.
DELETE /patient-clinic/:id: Removes a relationship.
API Documentation
The API is documented using Swagger, accessible at http://localhost:3001/api after starting the backend.

Frontend
Patients Page
Displays a list of all registered patients.
Allows adding, editing, and deleting patients.
Clinics Page
Displays a list of all registered clinics.
Allows adding, editing, and deleting clinics.
Relationships Page
Displays relationships between patients and clinics.
Allows adding, editing, and deleting relationships.
Technologies Used
Backend
Language: TypeScript
Framework: NestJS
Database: PostgreSQL
ORM: TypeORM
Documentation: Swagger
Frontend
Language: TypeScript
Framework: React + Vite
Styling: CSS or component library (e.g., Material-UI)
Containerization
Docker: Used to create application containers.
Docker Compose: Used to orchestrate services (backend, frontend, and database).
Project Structure
The project is divided into two main folders:

backend: Contains the NestJS backend code.
frontend: Contains the React frontend code.
Additionally, Docker Compose is used to manage the service containers.

How to Run the Project Locally
Prerequisites
Ensure Docker and Docker Compose are installed on your machine.

Execution Steps
Clone the repository:
git clone <REPOSITORY_URL>  
cd <REPOSITORY_NAME>

Start the containers using Docker Compose:
docker-compose up --build  

Access the application:

Frontend: Open your browser and go to http://localhost:80.
Backend (API): Access http://localhost:3001.
API Documentation (Swagger): Access http://localhost:3001/api.
To stop the application, run:
docker-compose down  

Database
The PostgreSQL database is automatically configured by Docker Compose. The tables are created based on the backend entities:

Patient: Patient (id, name, age)
Clinic: Clinic (id, name, address)
Relationship: PatientClinic (id, patientId, clinicId)
Final Considerations
The application was developed following best practices, such as code organization, the use of TypeScript, and containerization.

The frontend is designed to be simple, functional, and responsive.

Author: Thayan Lima
GitHub: thayanlima
