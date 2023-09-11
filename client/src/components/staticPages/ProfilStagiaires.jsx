import React from "react";
import "./css/ProfilStagiaires.css";

function ProfilStagiaires(props) {
  return (
    <div className="ProfilStagiaires">
      <div className="Profil-title">
        <h1 className="Profil-title-text">Nos étudiants en Gestion de réseaux et sécurité</h1>
      </div>

      
      <div className="Profil-flex-container">
        <div className="Profil-flex-card">
          <div className="Profil-flex-title">
            Planification, implémentation et gestion de réseaux
          </div>
          <div className="Profil-flex-card-content">
            <ul>
              <li>Monter un serveur</li>
              <li>Planifier et implanter un réseau</li>
              <li>
                Implanter les technologies et les services propres au réseau
                Internet
              </li>
              <li>Assurer la gestion du réseau</li>
              <li>Planifier et déployer des environnements virtuels</li>
              <li>Déployer les nouvelles technologies des réseaux</li>
              <li>Automatiser les tâches d’administration réseaux</li>
              <li>Superviser les réseaux</li>
            </ul>
          </div>
        </div>


        <div className="Profil-flex-card">
          <div className="Profil-flex-title">Sécurité et support technique</div>
          <div className="Profil-flex-card-content">
            <ul>
              <li>
                Planifier et mettre en place la sécurité des systèmes
                informatiques
              </li>
              <li>Assurer le soutien technique aux utilisateurs</li>
              <li>
                Utilisation des techniques pour tester et sécuriser les
                équipements informatiques
              </li>
              <li>
                Résolution de problèmes de réseaux sur les équipements
                informatiques
              </li>
            </ul>
          </div>
        </div>
        <div className="Profil-flex-card">
          <div className="Profil-flex-title">
            Connaissance des logiciels, systèmes et certifications
          </div>
          <div className="Profil-flex-card-content">
            <ul>
              <li>Découvrir des nouvelles technologies</li>
              <li>
                Connaître de façon approfondie le traitement de l’information,
                les logiciels et les composants de l’ordinateur et des
                périphériques
              </li>
              <li>
                Installation et gestion des serveurs et des clients Microsoft et
                Linux
              </li>
              <li>
                Configuration, installation et gestion d'un serveur Web ou de
                courrier
              </li>
              <li>Déploiement d'un système et d'une application client</li>
              <li>Mise en place de la sécurité des systèmes informatiques</li>
              <li>
                Déploiement des environnements virtuels et de l'infonuagique
              </li>
              <li>
                Préparation à la certification CEH (Certified Ethical Hacker)
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/*DEV PART */}
      <div className="Profil-title dev">
        <h1>Nos étudiant en Développement d'applications informatiques</h1>
      </div>
      <div className="Profil-flex-container">
        <div className="Profil-flex-card">
          <div className="Profil-flex-title dev">
          Analyse, développement et gestion de systèmes
          </div>
          <div className="Profil-flex-card-content">
            <ul>
              <li>Participer à l'analyse des systèmes à implanter</li>
              <li>Détecter les problèmes, en dégager la structure et trouver les solutions logiques</li>
              <li>
              Effectuer les jeux d'essai et la mise au point des programmes et des systèmes
              </li>
              <li>Élaborer des systèmes et participer à leur implantation ou à leur modification dans les entreprises</li>
              <li>Gérer les versions des fichiers sources des applications informatiques</li>
              <li>Bases de données</li>
              <li>Programmation structurée et orientée objet et Web dynamique</li>
            </ul>
          </div>
        </div>
        <div className="Profil-flex-card">
          <div className="Profil-flex-title dev">Sécurité, virtualisation et déploiement</div>
          <div className="Profil-flex-card-content">
            <ul>
              <li>
              Programmer des objets connectés
              </li>
              <li>Sécuriser les applications informatiques</li>
              <li>
              Virtualiser des postes de travail
              </li>
              <li>
              Comprendre les notions fondamentales des réseaux
              </li>
              <li>Déployer des applications infonuagiques</li>
            </ul>
          </div>
        </div>
        <div className="Profil-flex-card">
          <div className="Profil-flex-title dev">
          Connaissance approfondie des logiciels, technologies et méthodologies
          </div>
          <div className="Profil-flex-card-content">
            <ul>
              <li>Découvrir des nouvelles technologies</li>
              <li>
                Connaître de façon approfondie le traitement de l’information,
                les logiciels et les composants de l’ordinateur et des
                périphériques
              </li>
              <li>
              Installation et configuration de logiciels
              </li>
              <li>
                Configuration, installation et gestion d'un serveur Web ou de
                courrier
              </li>
              <li>Composantes matérielles de l'ordinateur, leur installation et leur configuration</li>
              <li>Systèmes d'exploitation (Windows et Linux)</li>
              <li>
              Méthodologies Agile telles que SCRUM
              </li>
              <li>
              Développement pour plateforme mobile
              </li>
              <li>Assurance qualité logiciel</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfilStagiaires;
