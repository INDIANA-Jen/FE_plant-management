import "../style/Profil.scss";
import React, { useState, useEffect } from "react";
//import { Link } from "react-scroll";
import { NavLink } from 'react-router-dom';

import { CgProfile, CgList } from "react-icons/cg";
import {
    RiPlantLine,
    RiAddCircleLine,
    RiLogoutCircleLine,
} from "react-icons/ri";
import { AiTwotoneTool } from 'react-icons/ai'
import { FaHands } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { LiaMapSolid } from "react-icons/lia";
import { SiHandshake, } from "react-icons/si";
import { HiOutlineX } from "react-icons/hi";
import { PiPlusFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import GeocodeCoordinates from './convertirGPS';
import MapContainer from "./Map";
const SectionProfil = () => {

    const navigate = useNavigate();
    // pour stocké la photo
    const [photoPreview, setPhotoPreview] = useState();

    //Modifier Profil
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        nom_utilisateur: "",
        email: "",
        adresse: "",
        telephone: "",
        photo: photoPreview,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    //fonction pour charger une image depuis le PC et la sauvegarder dans une variable
    const modifierPhotoProfil = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Charger la photo depuis le pc
            const reader = new FileReader();

            reader.onloadend = () => {
                // Sauvegarder la photo dans une variable
                setPhotoPreview(reader.result);
            };
            // Convertir la photo en base64 pour pourvoir le stocker dans la base de données
            reader.readAsDataURL(file);
        }
    };

    const modifierProfil = async (id_utilisateur) => {

        const donnees = { ...formData };
        //Cette instruction if vérifie si toutes les entrées sont vides. Si tel est le cas, affichez une erreur.
        if (Object.values(donnees).every((value) => !value)) {
            alert('Erreur! Au moins une entrée doit être renseignée');
        } else {
            if (formData.nom.trim() === '') {
                donnees.nom = profilData.nom;
            }
            if (formData.prenom.trim() === '') {
                donnees.prenom = profilData.prenom;
            }
            if (formData.nom_utilisateur.trim() === '') {
                donnees.nom_utilisateur = profilData.nom_utilisateur;
            }
            if (formData.email.trim() === '') {
                donnees.email = profilData.email;
            }
            if (formData.adresse.trim() === '') {
                donnees.adresse = profilData.adresse;
            }
            if (formData.telephone.trim() === '') {
                donnees.telephone = profilData.telephone;
            }
            if (formData.photo === undefined || formData.photo.trim() !== '') {
                donnees.photo = profilData.photo
            }

            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/mise-a-jour-profil/${id_utilisateur}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': localStorage.getItem("token")
                        },
                        body: JSON.stringify(donnees),
                    }
                );

                const responseData = await response.json();

                if (response.status === 200) {
                    alert(responseData.message);
                } else if (response.status === 500) {
                    alert(responseData.erreur);
                } else if (response.status === 400) {
                    alert(responseData.erreur);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };
    // fin modifier Profil

    //Effacer compte
    const deleteAccount = async (id_utilisateur) => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/supprimer-Compte/${id_utilisateur}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem("token")
                    },
                }
            );

            const responseData = await response.json();

            if (response.status === 200) {
                alert(responseData.message);
                localStorage.removeItem("id_utilisateur");
                window.history.replaceState(null, null, "/");
                navigate("/");
            } else if (response.status === 500) {
                alert(responseData.erreur);
            } else if (response.status === 400) {
                alert(responseData.erreur);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    //fin effacer compte

    //Recuperer données profil
    const [profilData, setProfilData] = useState(null);

    const getProfil = async (id_utilisateur) => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/profil/${id_utilisateur}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem("token"),
                    },
                }
            );

            const responseData = await response.json();

            if (response.status === 200) {
                setProfilData(responseData.donnees);
            } else if (response.status === 404) {
                alert(responseData.erreur);
            } else if (response.status === 400) {
                alert(responseData.erreur);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    // fin Recuperer données profil

    //Ajouter une plante

    const handlePLantInputChange = (e) => {
        const { name, value } = e.target;
        setplantData({ ...planteData, [name]: value });
    };

    const [planteData, setplantData] = useState({
        nom_plante: "",
        type_de_plante: "",
        description: "",
        photo: photoPreview,
    });
    const ajouterPlante = async (id_utilisateur) => {
        const donnees = {

            nom_plante: planteData.nom_plante,
            type_de_plante: planteData.type_de_plante,
            description: planteData.description,
            photo: photoPreview
        };

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/ajouter-plante/${id_utilisateur}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem("token")
                    },
                    body: JSON.stringify(donnees)
                }
            );

            const responseData = await response.json();

            if (response.status === 200) {
                setProfilData(responseData.donnees);
            } else if (response.status === 404) {
                alert(responseData.erreur);
            } else if (response.status === 400) {
                alert(responseData.erreur);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    //fin Ajouter une plante

    //Supprimer une plante
    const deletePlant = async (id_plante) => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/supprimer-une-plante/${id_plante}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem("token")
                    },
                }
            );

            const responseData = await response.json();

            if (response.status === 200) {
                alert(responseData.message);
                window.location.reload();
            } else if (response.status === 500) {
                alert(responseData.erreur);
            } else if (response.status === 400) {
                alert(responseData.erreur);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    //Fin Supprimer une plante

    //Recuperer liste de plante de l'utilisateur

    const ListePlantes = ({ plants }) => {
        return (
            <div className="plant-list">
                {plants.map((plant, index) => (
                    <PlanteSimple key={index} plant={plant} />
                ))}
            </div>
        );
    };

    const PlanteSimple = ({ plant }) => {
        return (

            <div className="plantitem-center">
                <div className="plant-item">
                    <div className="imgmesplant">
                         <img src={plant.photo} alt={plant.name} height={200} width={200}/>

                    </div>
                    <div className="mesplantnom">
                        <p>Nom : {plant.nom_plante}</p>

                    </div>
                    <div className="mesplanttype">
                        <p>Type : {plant.type_de_plante}</p>

                    </div>
                    <div className="mesplantedescription">
                        <p style={{ /*overflowWrap: 'break-word', */
                                    wordBreak : "break-all",
                                    width:"300px", /*backgroundColor: "red", */
                                    margin:'auto',
                                    display: 'flex',
                                   
                                    
                                    }}>Description : {plant.description}</p>
                    </div>
                   
                    
                   

                    <div className="deuxmodsup">
                        <div className="modifbutton">
                                <button className="submit-button">Modifier</button>

                        </div>
                        <div className="supbutton">
                            <button className="delete-button">Supprimer</button>

                        </div>
                    </div>
                        
                    
                </div>
            </div>
        );
    };

    const [donneesPlantesUtilisateur, setDonneesPlantesUtilisateur] = useState();
    const [loading, setLoading] = useState(true);

    const recupererPlantesUtilisateur = async (id_utilisateur) => {
        try {
            setLoading(true);
            const response = await fetch(
                `http://127.0.0.1:8000/recuperer-plante/${id_utilisateur}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem("token")
                    },
                }
            );

            const responseData = await response.json();

            if (response.status === 200) {
                setDonneesPlantesUtilisateur(responseData.donnees);
            } else if (response.status === 404) {
                alert(responseData.erreur);
            } else if (response.status === 400) {
                alert(responseData.erreur);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };
    //fin Recuperer liste de plante de l'utilisateur

    //Modification données plante
    const handlePLantModificationChange = (e) => {
        const { name, value } = e.target;
        setPlanteModification({ ...planteModification, [name]: value });
    };

    //savegarde temporaire des informations de la plante selectionner par l'utilisateur quand il va faire les modifications
    const [planteSelectionner, setPlanteSelectionner] = useState({
        id_plante: "",
        nom_plante: "",
        type_de_plante: "",
        description: "",
        photo: "",
    });

    //sauvegarde des nouveau informations sur la plante selectionner par l'utilisateur
    const [planteModification, setPlanteModification] = useState({
        nom_plante: "",
        type_de_plante: "",
        description: "",
        photo: photoPreview,
    });

    const modifierPlante = async () => {
        const donnees = { ...planteModification };

        if (Object.values(donnees).every((value) => !value)) {
            alert('Erreur! Au moins une entrée doit être renseignée');
        } else {
            if (planteModification.nom_plante.trim() === '') {
                donnees.nom_plante = planteSelectionner.nom_plante;
            }
            if (planteModification.type_de_plante.trim() === '') {
                donnees.type_de_plante = planteSelectionner.type_de_plante;
            }
            if (planteModification.description.trim() === '') {
                donnees.description = planteSelectionner.description;
            }
            if (planteModification.photo === undefined || planteModification.photo.trim() !== '') {
                donnees.photo = planteSelectionner.photo
            }

            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/mise-a-jour-plante/${planteSelectionner.id_plante}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': localStorage.getItem("token")
                        },
                        body: JSON.stringify(donnees),
                    }
                );

                const responseData = await response.json();

                if (response.status === 200) {
                    alert(responseData.message);
                } else if (response.status === 404) {
                    alert(responseData.erreur);
                } else if (response.status === 400) {
                    alert(responseData.erreur);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };
    //Fin Modification données plante

    //Ajouter une plante a faire garder
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [erreur, setErreur] = useState(null);

    useEffect(() => {
        // Verifie si la geolocalisation est disponible dans le navigateur
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    setErreur(null);
                },
                (err) => {
                    setErreur(err.message);
                }
            );
        } else {
            setErreur("Geolocalisation indisponible.");
        }
    }, [latitude, longitude]);
    const [nomPlante, setNomPlante] = useState([]);
    const [idPlanteSelectionner, setIdPlanteSelectionner] = useState('');
    const handlePlanteSelect = (event) => {
        setIdPlanteSelectionner(event.target.value);
    };

    const handlePlanteGarder = (e) => {
        const { name, value } = e.target;
        setplanteGarderData({ ...planteGarderData, [name]: value });
    };

    const [planteGarderData, setplanteGarderData] = useState({
        id_proprietaire: localStorage.getItem("id_utilisateur"),
        id_plante: idPlanteSelectionner,
        message_proprietaire: '',
        longitude_plante: longitude,
        latitude_plante: latitude,
        date_debut: '',
        date_fin: ''
    });

    const recupererNomPlantes = async (id_utilisateur) => {
        try {
            setLoading(true);
            const response = await fetch(
                `http://127.0.0.1:8000/nom-plante/${id_utilisateur}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem("token")
                    },
                }
            );

            const responseData = await response.json();

            if (response.status === 200) {
                setNomPlante(responseData.donnees);
            } else if (response.status === 500) {
                alert(responseData.erreur);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const ajouterPlanteAFaireGarder = async (event, id_utilisateur) => {
        event.preventDefault();
        const donnees = {
            id_proprietaire: id_utilisateur,
            id_plante: idPlanteSelectionner,
            message_proprietaire: planteGarderData.message_proprietaire,
            longitude_plante: longitude,
            latitude_plante: latitude,
            date_debut: planteGarderData.date_debut,
            date_fin: planteGarderData.date_fin,
            photo: photoPreview
        };
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/plante-a-faire-garder`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem("token")
                    },
                    body: JSON.stringify(donnees)
                }
            );

            const responseData = await response.json();

            if (response.status === 201) {
                alert(responseData.message);
            } else if (response.status === 500) {
                alert(responseData.erreur);
            }
        } catch (error) {
            console.error("Error:", error);
        }

    };
    //fin Ajouter une plante a faire garder

    //Deconnexion
    const deconnexion = () => {
        localStorage.removeItem('id_utilisateur');
        localStorage.removeItem('token');
        localStorage.removeItem('type_user');
        window.history.replaceState(null, '', window.location.href = '/');
    };
    //fin Deconnexion


    //Recuperation des plante disponible a faire garder
    const ListePlantesAGarder = ({ plants }) => {
        return (
            <div className="plant-liste-garde">
                {plants.map((plant, index) => (
                    <PlanteSimpleAgarder key={index} plant={plant} />
                ))}
            </div>
        );
    };

    const PlanteSimpleAgarder = ({ plant }) => {
        return (
            <div className="planteListegarde">

                <div className="listrecplant">

                    {/* <img src={plant.photo} alt={plant.name} height={200} width={200} /> */}
                    <div className="listnom">
                        <p>Nom : {plant.nom_plante}</p>
                    </div>
                    <div className="listprenom">
                        <p>Type : {plant.type_de_plante}</p>
                    </div>
                    <div className="listmessage">
                        <p>Message : {plant.message_proprietaire}</p>
                    </div>
                
                    {/* <p>Adresse: {GeocodeCoordinates(plant.latitude_plante, plant.longitude_plante)}</p> */}
                    <div className="listdatedebut">
                        <p>Date Début : {plant.date_debut}</p>
                    </div>
                    <div className="listdatefin">
                        <p>Date fin : {plant.date_fin}</p>

                    </div>
                </div>

                <div className="gardenBtnplnate">
               
                    <button className="gardenBtn" onClick={() => garderCettePlante(localStorage.getItem("id_utilisateur"), plant.id_garderie_plante)}>Garder cette plante</button>
                     
                </div>
            </div>
        );
    };

    const garderCettePlante = async (id_utilisateur, id_garderie_plante) => {
        const donnees = {
            id_garderie_plante: id_garderie_plante,
            id_gardien: id_utilisateur
        };
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/ajouter-gardien`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem("token")
                    },
                    body: JSON.stringify(donnees),
                }
            );

            const responseData = await response.json();

            if (response.status === 200) {
                alert(responseData.message);
                window.location.reload();
            } else if (response.status === 500) {
                alert(responseData.erreur);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    const [listePlanteDisponibleAFaireGarder, setListePlanteDisponibleAFaireGarder] = useState();
    const [loadingListPlante, setLoadingListPlante] = useState(true);
    const recupererPlanteDisponibleAFaireGarder = async (id_utilisateur) => {
        try {
            setLoadingListPlante(true);
            const response = await fetch(
                `http://127.0.0.1:8000/recuperer-liste-plante-disponible-a-faire-garder/${id_utilisateur}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem("token")
                    },
                }
            );

            const responseData = await response.json();

            if (response.status === 200) {
                setListePlanteDisponibleAFaireGarder(responseData.donnees);
            } else if (response.status === 500) {
                alert(responseData.erreur);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoadingListPlante(false);
        }
    };
    //fin Recuperation des plante disponible a faire garder

    //Plante que je garde
    const ListePlantesQueJeGarde = ({ plants }) => {
        return (
            <div className="plantlistQgarde">
                {plants.map((plant, index) => (
                    <PlanteSimpleQueJeGarde key={index} plant={plant} />
                ))}
            </div>
        );
    };

    const PlanteSimpleQueJeGarde = ({ plant }) => {
        return (
            <div className="plantQgarde">
                <img src={plant.photo} alt={plant.name} height={200} width={200} />
                
                <div className="contentplantQG">
                    <p>Nom : {plant.nom_plante}</p>
                    <p>Type : {plant.type_de_plante}</p>
                    <p>Message : {plant.message_proprietaire}</p>
                    {plant.conseil_botaniste ? (
                        <p>Conseil Botaniste : {plant.conseil_botaniste}</p>
                    ) : (
                        <p>Conseil Botaniste : Aucun</p>
                    )
                    }
                    <p>Date Début : {plant.date_debut}</p>
                    <p>Date fin : {plant.date_fin}</p>
                </div>
                <div className="btnentretien">
                  <button className="Btnsubentre" onClick={() => garderCettePlante(localStorage.getItem("id_utilisateur"), plant.id_garderie_plante)}>Ajouter un entretien</button>
                </div>
            </div>
        );
    };

    const [loadingPlanteQueJeGarde, setLoadingPlanteQueJeGarde] = useState(true);
    const [planteQueJegarde, setPlanteQueJeGarde] = useState();
    const recupererPlanteQueJeGarde = async (id_utilisateur) => {
        try {
            setLoadingPlanteQueJeGarde(true);
            const response = await fetch(
                `http://127.0.0.1:8000/recuperer-liste-plante-que-je-garde/${id_utilisateur}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem("token")
                    },
                }
            );

            const responseData = await response.json();

            if (response.status === 200) {
                setPlanteQueJeGarde(responseData.donnees);
            } else if (response.status === 500) {
                alert(responseData.erreur);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoadingPlanteQueJeGarde(false);
        }
    };
    //fin Plante que je garde

    //Conseil Botaniste
    const ConseilBotaniste = ({ plants }) => {
        return (
            <div className="plant-listConseil">
                {plants.map((plant, index) => (
                    <SimpleConseilBotaniste key={index} plant={plant} />
                ))}
            </div>
        );
    };
    const [idGarderiePlante, setIdGarderiePlante] = useState();
    const SimpleConseilBotaniste = ({ plant }) => {
        return (
            <div className="contenerConsBotan">
                <div className="conseilBotan">
                    <div className="imgconsbotans">
                        <img  src={plant.photo} alt={plant.name} height={200} width={200} />

                    </div>
                    <div className="consnom">
                        <p>Nom : {plant.nom_plante}</p>

                    </div>
                    <div className="constype">

                        <p>Type : {plant.type_de_plante}</p>
                        
                    </div>
                    
                    <div className="consmessage">
                        <p style={{ /*overflowWrap: 'break-word', */
                                    wordBreak : "break-all",
                                    width:"300px", /*backgroundColor: "red", */
                                    margin:'auto',
                                    display: 'flex',
                                   
                                    
                                    }}>Message : {plant.message_proprietaire}</p>

                    </div>
                   
                   <div className="consbot">
                 
                            {plant.conseil_botaniste ? (
                                    <p style={{ /*overflowWrap: 'break-word', */
                                    wordBreak : "break-all",
                                    width:"300px", /*backgroundColor: "red", */
                                    margin:'auto',
                                    display: 'flex',
                                   
                                    
                                    }}>Conseil Botaniste : {plant.conseil_botaniste}</p>
                            ) : (
                              <p>Conseil Botaniste : Aucun</p>
                            )}

                    </div>
                    <div className="consdateD">
                        <p>Date Début : {plant.date_debut}</p>
                        
                    </div>
                    <div className="consdateF">
                         <p>Date fin : {plant.date_fin}</p>

                    </div>
                    
                   
                    
                </div>
                <div className="conseilbotanBTN">
                    <button className="submiCons" onClick={(event) => { toggleConseilBotaniste(event); setIdGarderiePlante(plant.id_garderie_plante); }}>Ajouter un conseil</button>

                </div>
                    
            </div>
        );
    };

    const [loadingBotaniste, setLoadingBotaniste] = useState(true);
    const [planteActive, setPlanteActive] = useState();

    const recupererPlanteActivePourBotaniste = async () => {
        try {
            setLoadingBotaniste(true);
            const response = await fetch(
                `http://127.0.0.1:8000/garderie-plantes-actives`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem("token")
                    },
                }
            );

            const responseData = await response.json();

            if (response.status === 200) {
                setPlanteActive(responseData.donnees);
            } else if (response.status === 500) {
                alert(responseData.erreur);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoadingBotaniste(false);
        }
    };

    const handleConseilInput = (e) => {
        const { name, value } = e.target;
        setConseilData({ ...conseilData, [name]: value });
    };

    const [conseilData, setConseilData] = useState({
        conseil_botaniste: ''
    });
    const ajouterConseilBotaniste = async () => {
        const donnees = {
            conseil_botaniste: conseilData.conseil_botaniste,
            id_garderie_plante: idGarderiePlante
        };
        try {
            setLoadingBotaniste(true);
            const response = await fetch(
                `http://127.0.0.1:8000/conseil-botaniste`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem("token")
                    },
                    body: JSON.stringify(donnees),
                }
            );

            const responseData = await response.json();

            if (response.status === 200) {
                setPlanteActive(responseData.donnees);
            } else if (response.status === 500) {
                alert(responseData.erreur);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    //Fin Conseil Botaniste


    const [activeComponent, setActiveComponent] = useState("profil"); // Initial active component

    useEffect(() => {
        const id_utilisateur = localStorage.getItem("id_utilisateur");
        if (activeComponent === "profil") {
            getProfil(id_utilisateur);
        }
        else if (activeComponent === "mesPlantes") {
            recupererPlantesUtilisateur(id_utilisateur);
        }
        else if (activeComponent === "ajoutplante") {
            recupererNomPlantes(id_utilisateur);
        }
        else if (activeComponent === "listplante") {
            recupererPlanteDisponibleAFaireGarder(id_utilisateur);
        }
        else if (activeComponent === 'plantesGarde') {
            recupererPlanteQueJeGarde(id_utilisateur);
        }
        else if (activeComponent === 'botanistecons') {
            recupererPlanteActivePourBotaniste();
        }
    }, [activeComponent]);

    //popup
    //eto

    const [modal, setModal] = useState(false);
    const [supprimerModal, setSupprimerModal] = useState(false);
    const [modifierProfilModal, setModifierProfilModal] = useState(false);
    const [ConseilBotanisteModal, setConseilBotanisteModal] = useState(false);
    const [modifierPlanteModal, setModifierClassModal] = useState(false);

    const toggleModifierPlante = (event) => {
        event.preventDefault();
        setModifierClassModal(!modifierPlanteModal);
    };

    const toggleConseilBotaniste = (event) => {
        event.preventDefault();
        setConseilBotanisteModal(!ConseilBotanisteModal);
    };

    const toggleModifierProfil = (event) => {
        event.preventDefault();
        setModifierProfilModal(!modifierProfilModal);
    };
    const toggleSupprimerModal = (event) => {
        event.preventDefault();
        setSupprimerModal(!supprimerModal);
    };
    const toggleModal = (event) => {
        event.preventDefault();
        setModal(!modal);
    };
    if (modal) {
        document.body.classList.add("active-modal");
    } else {
        document.body.classList.remove("active-modal");
    }
    //atreto
    //fin popup

    // const [file, setFile] = useState();

    // function handleChange(e) {
    //     console.log(e.target.files);
    //     setFile(URL.createObjectURL(e.target.files[0]));

    //     const selectedFile = e.target.files[0];
    //     const fileName = selectedFile ? selectedFile.name : "";
    //     document.getElementById("file-name").textContent = fileName;
    // }

    const renderComponent = () => {
        switch (activeComponent) {
            case "profil":
                return (
                    <div className="casprofil">
                        <p className="titleprofil"> Profil</p>
                        
                        <div className="contenuchangeP">
                            {profilData ? (
                                <>
                                    <div className="photochange">

                                        {profilData.photo ? (
                                            
                                            <img className="imgChangephoto" src={`${profilData.photo}`} alt="User's Photo" />
                                        ) : (
                                            <img src="logo.png" alt="Default Logo" />
                                        )}

                                    </div>
                                   
                                    <div className="contenentpropchange">

                                        <span>Nom : {profilData.nom}</span>
                                        <span>Prénom : {profilData.prenom}</span>
                                        <span>Pseudo : {profilData.nom_utilisateur}</span>
                                        <span>Email : {profilData.email}</span>
                                        <span>Adresse : {profilData.adresse}</span>
                                        <span>Telephone : {profilData.telephone}</span>
                                        <span>Type utilisateur : {profilData.type_utilisateur}</span>

                                    </div>
                                   
                                </>
                            ) : (
                                <div className="parent-container">
                                    <img src="/arosaje-spin.png" className="image-spinner" />
                                </div>
                            )}
                            <div className="modifierProfile">
                                {modifierProfilModal && (
                                    <div className="modal-overlay">
                                        <div className="modal-center">
                                            <div className="modal-content">
                                                <h2>Modifier votre profil</h2>
                                                <div className="scrollable-content">
                                                    <form
                                                        onSubmit={() =>
                                                            modifierProfil(
                                                                localStorage.getItem("id_utilisateur")
                                                            )
                                                        }
                                                    >
                                                        <div className="form-group">
                                                            <label htmlFor="nom">Nom:</label>
                                                            <input
                                                                type="text"
                                                                id="nom"
                                                                name="nom"
                                                                defaultValue={profilData.nom}
                                                                value={formData.nom}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="prenom">Prénom:</label>
                                                            <input
                                                                type="text"
                                                                id="prenom"
                                                                name="prenom"
                                                                defaultValue={profilData.prenom}
                                                                value={formData.prenom}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="nom_utilisateur">
                                                                Nom d'utilisateur:
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="nom_utilisateur"
                                                                name="nom_utilisateur"
                                                                defaultValue={profilData.nom_utilisateur}
                                                                value={formData.nom_utilisateur}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="email">Mail:</label>
                                                            <input
                                                                type="text"
                                                                id="email"
                                                                name="email"
                                                                defaultValue={profilData.email}
                                                                value={formData.email}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="adresse">Adresse:</label>
                                                            <input
                                                                type="text"
                                                                id="adresse"
                                                                name="adresse"
                                                                defaultValue={profilData.adresse}
                                                                value={formData.adresse}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="telephone">Téléphone:</label>
                                                            <input
                                                                type="number"
                                                                id="telephone"
                                                                name="telephone"
                                                                defaultValue={profilData.telephone}
                                                                value={formData.telephone}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="photo">Photo de profil:</label>
                                                            <input
                                                                type="file"
                                                                id="photo"
                                                                name="photo"
                                                                accept="image/*"
                                                                onChange={modifierPhotoProfil}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            {photoPreview && (
                                                                <img
                                                                    src={photoPreview}
                                                                    alt="Preview"
                                                                    className="photo-preview"
                                                                />
                                                            )}
                                                        </div>
                                                        <div className="modal-buttons">
                                                            <button className="submit-button" type="submit">
                                                                Enregistrer
                                                            </button>
                                                            <button
                                                                className="cancel-button"
                                                                onClick={toggleModifierProfil}
                                                            >
                                                                Annuler
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {supprimerModal && (
                            <div className="modal-overlay">
                                <div className="modal-center">
                                    <div className="modal-content">
                                        <h2>Voulez-vous supprimer votre compte ?</h2>
                                        <p>Cette action est définitive.</p>
                                        <div className="modal-buttons">
                                            <button
                                                className="delete-button"
                                                onClick={() =>
                                                    deleteAccount(localStorage.getItem("id_utilisateur"))
                                                }
                                            >
                                                Supprimer
                                            </button>
                                            <button
                                                className="cancel-button"
                                                onClick={toggleSupprimerModal}
                                            >
                                                Annuler
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="contenerBtn">
                            <div className="Btnp">
                                <div className="btnp">
                                    <button onClick={toggleModifierProfil}>
                                        Modifier profil
                                    </button>
                                </div>
                            </div>

                            <div className="Btnpl">
                                <div className="btnpl">
                                    <button onClick={toggleSupprimerModal}>
                                        Supprimer Compte
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "ajouterUnePlante":
                return (
                    <div className="caseajoutplante">
                        <p className="titlejoutpante" >Ajouter une plante</p>

                        <div className="contecaseplante">
                            <div className="ajouterplante">
                                <form className="fomrcontenerplant" onSubmit={() => ajouterPlante(localStorage.getItem("id_utilisateur"))}>
                                    {/* image*/}

                                    <div className="contpicture">
                                        <div className="inputnameimg">
                                            <input
                                                type="file"
                                                id="firstimg"
                                                className="imginput"
                                                name="photo"
                                                accept="image/*"
                                                onChange={modifierPhotoProfil}
                                            />
                                            <p id="file-name" color="#B1B1B1"></p>
                                            <img src={photoPreview} />
                                        </div>
                                        <div className="imgiconlable">
                                            <label for="firstimg" className="labelimg">
                                                <PiPlusFill color="#B1B1B1" fontSize={40} />
                                            </label>
                                            Ajouter une photo
                                        </div>
                                    </div>

                                    {/*nOM*/}

                                    <div className="nomFirsta">
                                        <label className="labplant">Nom : </label>
                                        <input
                                            className="contplant"
                                            type="text"
                                            id="name"
                                            name="nom_plante"
                                            value={planteData.nom_plante}
                                            onChange={handlePLantInputChange}
                                            required="required"
                                        />
                                    </div>
                                    {/*Prenom*/}

                                    <div className="nomFirsta">
                                        <label className="labplant">Type Plante : </label>
                                        <input
                                            className="contplant"
                                            type="text"
                                            id="typePlante"
                                            name="type_de_plante"
                                            value={planteData.type_de_plante}
                                            onChange={handlePLantInputChange}
                                            required="required"
                                        />
                                    </div>

                                    <div className="nomFirsta">
                                        <label className="labplant">Description : </label>
                                        <input
                                            className="contplant"
                                            type="text"
                                            id="description"
                                            name="description"
                                            value={planteData.description}
                                            onChange={handlePLantInputChange}
                                            required="required"
                                        />
                                    </div>
                                    <div className="btnajouplant">
                                        <div className="btnjoutpla">
                                            <button type="submit" >Envoyer</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                );
            case "mesPlantes":
                return (
                    <div className="casemesplantes">
                        <p className="titlemesplantes">Mes plantes</p>
                        {loading ? (
                            <div className="parent-container">
                                <img src="/arosaje-spin.png" className="image-spinner" />
                            </div>
                        ) : (
                            <ListePlantes plants={donneesPlantesUtilisateur} />
                        )
                        }
                        <div className="modifierPlante">
                            {modifierPlanteModal && (
                                <div className="modal-overlay">
                                    <div className="modal-center">
                                        <div className="modal-content">
                                            <h2>Modifier les informations de la plante</h2>
                                            <div className="scrollable-content">
                                                <form
                                                    onSubmit={() =>
                                                        modifierPlante()
                                                    }
                                                >
                                                    <div className="form-group">
                                                        <label htmlFor="nom_plante">Nom:</label>
                                                        <input
                                                            type="text"
                                                            id="nom_plante"
                                                            name="nom_plante"
                                                            defaultValue={profilData.nom}
                                                            value={planteModification.nom_plante}
                                                            onChange={handlePLantModificationChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="type_de_plante">Type de plante:</label>
                                                        <input
                                                            type="text"
                                                            id="type_de_plante"
                                                            name="type_de_plante"
                                                            defaultValue={profilData.prenom}
                                                            value={planteModification.type_de_plante}
                                                            onChange={handlePLantModificationChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="description">
                                                            Description:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="description"
                                                            name="description"
                                                            defaultValue={profilData.nom_utilisateur}
                                                            value={planteModification.description}
                                                            onChange={handlePLantModificationChange}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="photo">Photo de profil:</label>
                                                        <input
                                                            type="file"
                                                            id="photo"
                                                            name="photo"
                                                            accept="image/*"
                                                            onChange={modifierPhotoProfil}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        {photoPreview && (
                                                            <img
                                                                src={photoPreview}
                                                                alt="Preview"
                                                                className="photo-preview"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="modal-buttons">
                                                        <button className="submit-button" type="submit">
                                                            Enregistrer
                                                        </button>
                                                        <button
                                                            className="cancel-button"
                                                            onClick={toggleModifierPlante}
                                                        >
                                                            Annuler
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case "plantesGarde":
                return (
                    <div className="caseajoutplante">
                        <p className="titlejoutpante">Plante que je garde</p>
                        {loadingPlanteQueJeGarde ? (
                            <div className="planteQjegardere">
                                <img src="/arosaje-spin.png" className="image-spinner" />
                            </div>
                        ) : (
                            <ListePlantesQueJeGarde plants={planteQueJegarde} />
                        )
                        }
                    </div>
                );
            case "ajoutplante":
                return (
                    <div className="caseajoutplante">
                        <p className="titlejoutpante">Ajouter une plante à faire garder</p>
                        {loading ? (
                            <div className="parent-container">
                                <img src="/arosaje-spin.png" className="image-spinner" />
                            </div>
                        ) : (

                            <div className="contecaseplante">
                                <div className="ajouterplante">
                                    <form className="fomrcontenerplant" onSubmit={(e) => ajouterPlanteAFaireGarder(e, localStorage.getItem("id_utilisateur"))}>
                                        {/* image*/}

                                        <div className="contpicture">
                                            <div className="inputnameimg">
                                                <input
                                                    type="file"
                                                    id="firstimg"
                                                    name="photo"
                                                    accept="image/*"
                                                    onChange={modifierPhotoProfil}
                                                    className="imginput"
                                                />
                                                <p id="file-name" color="#B1B1B1"></p>
                                                <img src={photoPreview} />
                                            </div>
                                            <div className="imgiconlable">
                                                <label for="firstimg" className="labelimg">
                                                    <PiPlusFill color="#B1B1B1" fontSize={40} />
                                                </label>
                                                Ajouter une photo
                                            </div>
                                        </div>

                                        {/*nOM*/}

                                        <div className="nomFirsta">
                                            <label for="plantes" className="selectplant">
                                                Nom de plante :{" "}
                                            </label>
                                            <select name="plantes" id="plantes" value={idPlanteSelectionner} onChange={handlePlanteSelect} className="selectconent">
                                                {nomPlante.map((plante) => (
                                                    <option value={plante.id_plante}>{plante.nom_plante}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {/*Prenom*/}

                                        <div className="nomFirsta">
                                            <label className="labplant">Message: </label>
                                            <input
                                                className="contplant"
                                                type="text"
                                                id="message_proprietaire"
                                                name="message_proprietaire"
                                                value={planteGarderData.message_proprietaire}
                                                onChange={handlePlanteGarder}
                                            />
                                        </div>
                                        {/*Date de début*/}
                                        <div className="datedebf">
                                            <label className="labdatedf">Date début : </label>
                                            <div className="contdate">
                                                <input className="typedate" type="date" id="date_debut" name="date_debut" value={planteGarderData.date_debut}
                                                    onChange={handlePlanteGarder} />
                                            </div>
                                        </div>

                                        {/*Date de fin*/}
                                        <div className="datedebf">
                                            <label className="labdatedf">Date de fin : </label>
                                            <div className="contdate">
                                                <input className="typedate" type="date" id="date_fin" name="date_fin" value={planteGarderData.date_fin}
                                                    onChange={handlePlanteGarder} />
                                            </div>
                                        </div>
                                        <div className="btnajouplant">
                                            <div className="btnjoutpla">
                                                <button type="submit">Envoyer</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )
                        }
                    </div>
                );

            case "listplante":
                return (
                    <div className="caselistplante">
                        <p className="titlecaselist">Liste de plante disponible à conserver </p>
                        {loadingListPlante ? (
                            <div className="parent-container">
                                <img src="/arosaje-spin.png" className="image-spinner" />
                            </div>
                        ) : (
                            <ListePlantesAGarder plants={listePlanteDisponibleAFaireGarder} />
                        )
                        }
                    </div>
                );

            case "mapsclient":
                return (
                    <div className="casemapsclient">
                        <p>maps</p>
                        <div style={{ height: '400px', width: '100%' }}>
                            {/* <MapContainer /> */}
                        </div>
                    </div>
                );

            case "botanistecons":
                return (
                    <div className="casebotanistecons">
                        <p className="titlebota">Conseil Botaniste</p>
                        {loadingBotaniste ? (
                            <div className="parent-container">
                                <img src="/arosaje-spin.png" className="image-spinner" />
                            </div>
                        ) : (
                            <ConseilBotaniste plants={planteActive} />
                        )
                        }
                        <div className="modifierProfile">
                            {ConseilBotanisteModal && (
                                <div className="modal-overlay">
                                    <div className="modal-center">
                                        <div className="modal-content">
                                            <h2>Ajouter votre conseil</h2>
                                            <div className="scrollable-content">
                                                <form
                                                    onSubmit={() =>
                                                        ajouterConseilBotaniste()
                                                    }
                                                >
                                                    <div className="form-group">
                                                        <label htmlFor="conseil_botaniste">Conseil:</label>
                                                        <input
                                                            type="text"
                                                            id="conseil_botaniste"
                                                            name="conseil_botaniste"
                                                            value={conseilData.conseil_botaniste}
                                                            onChange={handleConseilInput}
                                                        />
                                                    </div>
                                                    <div className="modal-buttons">
                                                        <button className="submit-button" type="submit">
                                                            Enregistrer
                                                        </button>
                                                        <button
                                                            className="cancel-button"
                                                            onClick={toggleConseilBotaniste}
                                                        >
                                                            Annuler
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                );

            // ... Add cases for other components
            default:
                return null;
        }
    };

    return (
        <div className="profil">
            <div className="contenuProfil">
                <p>ACCUEIL</p>

                <div className="ContP">
                    <ul className="profilcont">
                        <li className="nav-item">
                            <div className="icon-link">
                                <CgProfile color=" white" size={30} />
                                <NavLink
                                    className="itemsP"
                                    /*activeClass="actives"*/
                                    activeClass="actives"
                                    onClick={() => setActiveComponent("profil")}
                                >
                                    {" "}
                                    Profil
                                </NavLink>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="icon-link">
                                <RiPlantLine color="white" size={30} />
                                <NavLink
                                    className="itemsP"
                                    //activeClass="actives"
                                    activeClass="actives"
                                    onClick={() => setActiveComponent("ajouterUnePlante")}
                                >
                                    Ajouter une plante
                                </NavLink>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="icon-link">
                                <RiPlantLine color="white" size={30} />
                                <NavLink
                                    className="itemsP"
                                    /*activeClass="actives"*/
                                    activeClass="actives"
                                    onClick={() => setActiveComponent("mesPlantes")}
                                >
                                    Mes plantes
                                </NavLink>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="icon-link">
                                <FaHands color="white" size={30} />
                                <NavLink
                                    className="itemsP"
                                    /*activeClass="actives"*/
                                    activeClass="actives"
                                    onClick={() => setActiveComponent("plantesGarde")}
                                >
                                    Plantes que je garde
                                </NavLink>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="icon-link">
                                <RiAddCircleLine color="white" size={30} />
                                <NavLink
                                    className="itemsP"
                                    /*activeClass="actives"*/
                                    activeClass="actives"
                                    onClick={() => setActiveComponent("ajoutplante")}
                                >
                                    Ajouter une plante à faire garder
                                </NavLink>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="icon-link">
                                <CgList color="white" size={30} />
                                <NavLink
                                    className="itemsP"
                                    /*activeClass="actives"*/
                                    activeClass="actives"
                                    onClick={() => setActiveComponent("listplante")}
                                >
                                    Liste de plantes disponible à conserver
                                </NavLink>
                            </div>
                        </li>

                         {/* <div className="mentions">
                            <div className="messagecontpop">
                                <TiMessages color="white" size={30} />

                                <div onClick={toggleModal} className="openFonctions">
                                    {" "}
                                    Message
                                </div>
                            </div>

                            <div>
                                {modal && (
                                    <div className="modalments">
                                        <div onClick={toggleModal} className="overlays"></div>
                                        <div className="PopUps">
                                            <h1 className="titles">
                                                <img className="logoMents" src="/logo.png" /> Les
                                                mentions légales
                                            </h1>

                                            <p className="lightTitles">
                                                1. Définition des mentions légales
                                            </p>
                                            <div className="mentionContets">
                                                <p className="lightTitle">
                                                    2. Quelles sont les différentes mentions légales à
                                                    faire figurer sur mon site ?
                                                </p>
                                            </div>
                                            <button className="close-modals" onClick={toggleModal}>
                                                <HiOutlineX />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>  

                          <li className="nav-item">
                            <div className="icon-link">
                                <LiaMapSolid color="white" size={30} />
                                <NavLink
                                    className="itemsP"
                                    activeClass="actives" en commentaire
                                    activeClass="actives"
                                    onClick={() => setActiveComponent("mapsclient")}
                                >
                                    Maps
                                </NavLink>
                            </div>
                        </li> */}
                        {localStorage.getItem("type_utilisateur") === "Botaniste" ? (
                            <li className="nav-item">
                                <div className="icon-link">
                                    <SiHandshake color="white" size={30} />
                                    <NavLink
                                        className="itemsP"
                                        activeClass="actives"
                                        onClick={() => setActiveComponent("botanistecons")}
                                    >
                                        Conseil Botaniste
                                    </NavLink>
                                </div>
                            </li>
                        ) : null}
                        <li className="nav-item">
                            <div className="icon-link">
                                <RiLogoutCircleLine color="white" size={30} />
                                <NavLink 
                                    className="itemsP" 
                                    onClick={deconnexion}
                                    activeClass="actives"
                                >
                                    Déconnecter
                                </NavLink>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="component-container">{renderComponent()}</div>
            </div>
        </div>
    );
};

export default SectionProfil;
