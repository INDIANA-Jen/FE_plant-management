import "../style/Profil.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { CgProfile, CgList } from "react-icons/cg";
import {
    RiPlantLine,
    RiAddCircleLine,
    RiLogoutCircleLine,
} from "react-icons/ri";
import { FaHands } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { LiaMapSolid } from "react-icons/lia";
import { SiHandshake } from "react-icons/si";
import { HiOutlineX } from "react-icons/hi";
import { PiPlusFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import GeocodeCoordinates from './convertirGPS';

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

    const modifierPhotoProfil = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Use FileReader to read the selected file
            const reader = new FileReader();

            reader.onloadend = () => {
                // Set the file data to a state variable for preview
                setPhotoPreview(reader.result);
            };
            // Read the file as a data URL (base64 encoding)
            reader.readAsDataURL(file);
        }
    };

    const modifierProfil = async (id_utilisateur) => {
        const donnees = {
            nom: formData.nom,
            prenom: formData.prenom,
            nom_utilisateur: formData.nom_utilisateur,
            email: formData.email,
            adresse: formData.adresse,
            telephone: formData.telephone,
            photo: photoPreview,
        };

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/mise-a-jour-profil/${id_utilisateur}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
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
    };
    // fin modifier Profil

    const deleteAccount = async (id_utilisateur) => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/supprimer-Compte/${id_utilisateur}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
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
            <div className="plant-item">
                <img src={plant.photo} alt={plant.name} height={200} width={200} />
                <p>Nom: {plant.nom_plante}</p>
                <p>Type: {plant.type_de_plante}</p>
                <p>Description: {plant.description}</p>
                <button className="submit-button">Edit</button>
                <button className="submit-button">Delete</button>
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
    const deconnexion = () =>{
        window.history.replaceState(null, '',  window.location.href = '/');
    };
    //fin Deconnexion


    //Recuperation des plante disponible a faire garder
    const ListePlantesAGarder = ({ plants }) => {
        return (
            <div className="plant-list">
                {plants.map((plant, index) => (
                    <PlanteSimpleAgarder key={index} plant={plant} />
                ))}
            </div>
        );
    };

    const PlanteSimpleAgarder = ({ plant }) => {
        return (
            <div className="plant-item">
                <img src={plant.photo} alt={plant.name} height={200} width={200} />
                <p>Nom: {plant.nom_plante}</p>
                <p>Type: {plant.type_de_plante}</p>
                <p>Message: {plant.message_proprietaire}</p>
                <p>Date Début: {plant.date_debut}</p>
                <p>Date fin: {plant.date_fin}</p>
                <button className="submit-button">Garder cette plante</button>
            </div>
        );
    };


    const [listePlanteDisponibleAFaireGarder, setListePlanteDisponibleAFaireGarder] = useState();
    const recupererPlanteDisponibleAFaireGarder = async(id_utilisateur) => {
        try {
            setLoading(true);
            const response = await fetch(
                `http://127.0.0.1:8000/recuperer-liste-plante-disponible-a-faire-garder/${id_utilisateur}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
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
            setLoading(false);
        }
    };
    //fin Recuperation des plante disponible a faire garder

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
        else if (activeComponent === "listplante"){
            recupererPlanteDisponibleAFaireGarder(id_utilisateur);
        }
    }, [activeComponent]);

    //popup
    //eto

    const [modal, setModal] = useState(false);
    const [supprimerModal, setSupprimerModal] = useState(false);
    const [modifierProfilModal, setModifierProfilModal] = useState(false);
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

    const [file, setFile] = useState();

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));

        const selectedFile = e.target.files[0];
        const fileName = selectedFile ? selectedFile.name : "";
        document.getElementById("file-name").textContent = fileName;
    }

    const renderComponent = () => {
        switch (activeComponent) {
            case "profil":
                return (
                    <div className="casprofil">
                        <p className="titleprofil"> Profil</p>
                        <div>
                            {profilData ? (
                                <>
                                    {profilData.photo ? (
                                        <img src={`${profilData.photo}`} alt="User's Photo" />
                                    ) : (
                                        <img src="logo.png" alt="Default Logo" />
                                    )}
                                    <span>Nom: {profilData.nom}</span>
                                    <span>Prénom: {profilData.prenom}</span>
                                    <span>Psudo: {profilData.nom_utilisateur}</span>
                                    <span>email: {profilData.email}</span>
                                    <span>adresse: {profilData.adresse}</span>
                                    <span>telephone: {profilData.telephone}</span>
                                    <span>Type Utilisateur: {profilData.type_utilisateur}</span>
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
                        <p className="titlejoutpante">Ajouter ma plante</p>

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
                                        <label className="labplant">Type Plante: </label>
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
                                        <label className="labplant">Description: </label>
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
                        <p className="titlemesplantes">Mes Plantes Component Content</p>
                        {loading ? (
                            <div className="parent-container">
                                <img src="/arosaje-spin.png" className="image-spinner" />
                            </div>
                        ) : (
                            <ListePlantes plants={donneesPlantesUtilisateur} />
                        )
                        }
                    </div>
                );
            case "plantesGarde":
                return (
                    <div className="caseajoutplante">
                        <p className="titlejoutpante">Ajouter plante a faire garder</p>

                        <div className="contecaseplante">
                            <div className="ajouterplante">
                                <form className="fomrcontenerplant">
                                    {/* image*/}

                                    <div className="contpicture">
                                        <div className="inputnameimg">
                                            <input
                                                type="file"
                                                id="firstimg"
                                                onChange={handleChange}
                                                className="imginput"
                                            />
                                            <p id="file-name" color="#B1B1B1"></p>
                                            <img src={file} />
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
                                        />
                                    </div>
                                    {/*Prenom*/}

                                    <div className="nomFirsta">
                                        <label className="labplant">Type Plante: </label>
                                        <input
                                            className="contplant"
                                            type="text"
                                            id="typePlante"
                                            name="type_de_plante"
                                        />
                                    </div>

                                    <div className="nomFirsta">
                                        <label className="labplant">Description: </label>
                                        <input
                                            className="contplant"
                                            type="text"
                                            id="description"
                                            name="description"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="btnajouplant">
                                <div className="btnjoutpla">
                                    <button /*type="submit" */>Envoyer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "ajoutplante":
                return (
                    <div className="caseajoutplante">
                        <p className="titlejoutpante">Ajouter plante a faire garder</p>
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
                        <p>liste des plante</p>
                        {loading ? (
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
                    </div>
                );

            case "botanistecons":
                return (
                    <div className="casebotanistecons">
                        <p className="titlebota">Botanise</p>
                        <div className="contebotaniste">
                            <div className="ajoutconseilBota">
                                <form className="messagebotaniste">
                                    {/* photo */}

                                    <div className="picturebota">
                                        <div className="inputmagbota">
                                            <input
                                                type="file"
                                                id="firstimg"
                                                onChange={handleChange}
                                                className="imginputb"
                                            />
                                            <p id="file-name" color="#B1B1B1"></p>
                                            <img src={file} />
                                        </div>
                                        <div className="imgiconb">
                                            <label for="firstimg" className="labelimg">
                                                <PiPlusFill color="#B1B1B1" fontSize={40} />
                                            </label>
                                            Ajouter une photo
                                        </div>
                                    </div>

                                    {/*fin photo */}

                                    <div className="selctcontent">
                                        <label for="cars" className="selectplant">
                                            Nom de plante :{" "}
                                        </label>
                                        <select name="cars" id="cars" className="selectconent">
                                            <option value="volvo">Volvo</option>
                                            <option value="saab">Saab</option>
                                            <option value="opel">Opel</option>
                                            <option value="audi">Audi</option>
                                        </select>
                                    </div>

                                    <div className="messbot">
                                        {/* message */}

                                        <label className="labelbota" htmlFor="messagebota">
                                            Message :{" "}
                                        </label>
                                        <textarea
                                            name="messageBotniste"
                                            placeholder=" "
                                            onChange={handleChange}
                                            required="required"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="botajotm">
                            <div className="butenmes">
                                <button /*type="submit" */>Envoyer</button>
                            </div>
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
                                <Link
                                    className="itemsP"
                                    activeClass="actives"
                                    onClick={() => setActiveComponent("profil")}
                                >
                                    {" "}
                                    Profil
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="icon-link">
                                <RiPlantLine color="white" size={30} />
                                <Link
                                    className="itemsP"
                                    activeClass="actives"
                                    onClick={() => setActiveComponent("ajouterUnePlante")}
                                >
                                    Ajouter une plante
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="icon-link">
                                <RiPlantLine color="white" size={30} />
                                <Link
                                    className="itemsP"
                                    activeClass="actives"
                                    onClick={() => setActiveComponent("mesPlantes")}
                                >
                                    Mes plantes
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="icon-link">
                                <FaHands color="white" size={30} />
                                <Link
                                    className="itemsP"
                                    activeClass="actives"
                                    onClick={() => setActiveComponent("plantesGarde")}
                                >
                                    Plantes que je garde
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="icon-link">
                                <RiAddCircleLine color="white" size={30} />
                                <Link
                                    className="itemsP"
                                    activeClass="actives"
                                    onClick={() => setActiveComponent("ajoutplante")}
                                >
                                    Ajouter une plante à faire garder
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="icon-link">
                                <CgList color="white" size={30} />
                                <Link
                                    className="itemsP"
                                    activeClass="actives"
                                    onClick={() => setActiveComponent("listplante")}
                                >
                                    liste de plantes disponible à conserver
                                </Link>
                            </div>
                        </li>

                        <div className="mentions">
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
                                <Link
                                    className="itemsP"
                                    activeClass="actives"
                                    onClick={() => setActiveComponent("mapsclient")}
                                >
                                    Maps
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="icon-link">
                                <SiHandshake color="white" size={30} />
                                <Link
                                    className="itemsP"
                                    activeClass="actives"
                                    onClick={() => setActiveComponent("botanistecons")}
                                >
                                    Conseil Botaniste
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="icon-link">
                                <RiLogoutCircleLine color="white" size={30} />
                                <Link className="itemsP" onClick={deconnexion}>Déconnecter</Link>
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
