import styles from "./Project.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import ServiceForm from "../service/ServiceForm";
import Message from "../layout/Message";

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application.json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
        })
        .catch((err) => console.log(err));
    }, 1000);
  }, [id]);

  function editPost(project) {
    setMessage("");
    console.log(message);
    // budget validation
    if (project.budget < project.cost) {
      setMessage(
        "O orçamento do projeto não pode ser menor do que o custo dos serviços!"
      );
      setType("error");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      return false;
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application-json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        setMessage("Projeto Atualizado!");
        setType("success");
      })
      .catch((err) => console.log(err));
  }

  function createService() {
    
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {/* MESSAGE */}
            {message && <Message type={type} msg={message} />}

            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button onClick={toggleProjectForm} className={styles.btn}>
                {!showProjectForm ? "Editar Projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                // DETALHES DO PROJETO
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total do Orçamento:</span> {project.budget}
                  </p>
                  <p>
                    <span>Total Utilizado:</span> R${project.cost}
                  </p>
                </div>
              ) : (
                // FORMULARIO DE EDIÇAO
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir Edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <button onClick={toggleServiceForm} className={styles.btn}>
                {!showServiceForm ? "Adicionar serviço" : "Fechar"}
              </button>
              <div className={styles.project_info}>
                {/* FORMULARIO DE SERVIÇOS */}
                {showServiceForm && (
                  <ServiceForm handleSubmit={createService} 
                  btnText="Adicionar Serviço"
                  projectData={project}
                  />
                ) }
              </div>
            </div>
              {/* Area de Serviços */}
            <h2>Serviços</h2>
            <Container customClass="start">
              <p>Serviços</p>
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
