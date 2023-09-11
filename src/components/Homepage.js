import React, {useState, useEffect} from 'react';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";
import '../style/Commun.scss';
import '../style/Homepage.scss';
import '../style/Carousel.scss';
import { v4 as uuidv4 } from "uuid";
import {ParallaxProvider, Parallax} from 'react-scroll-parallax'; 
import {AiTwotoneHome} from 'react-icons/ai';
import {GiRotaryPhone, GiScales, GiSmartphone, GiPlantRoots, GiHearts } from 'react-icons/gi';
import {MdEmail} from 'react-icons/md';
import {FaGlobe, FaInstagram, FaYoutubeSquare, FaHands} from 'react-icons/fa';
import { HiOutlineX } from "react-icons/hi";
import {RiFacebookBoxFill} from "react-icons/ri";
import {BsCamera} from 'react-icons/bs';
import {GoDiscussionClosed, GoLocation} from 'react-icons/go';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

import '../style/Navbar.scss'

const SectionText = (props) => {

    const [formVal, setFormVal] = useState({
        name:'',
        email:'',
        object:'',
        message:''
      });

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormVal((prevFormData) => ({ ...prevFormData, [name]: value }));
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Name: ${formVal.name}, Email: ${formVal.email}, Sujet : ${formVal.object},Message: ${formVal.message}`
        );

      };

        //popup
        //eto
        const [modal, setModal] = useState(false);
        const toggleModal = (event) => {
            event.preventDefault();
            setModal(!modal);
        };
        if(modal) {
        document.body.classList.add('active-modal')
        } else {
        document.body.classList.remove('active-modal')
        }
        //atreto
        //fin popup

        //mois actuel
            const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
            const currentMonthNum = new Date().getMonth();
            const currentMonth = MONTHS[currentMonthNum];

        //année actuelle 
            const currentYear =  new Date().getUTCFullYear();

    const sliderData = [
        {
            id: uuidv4(), /*Cela génère un identifiant unique pour chaque diapositive en utilisant la fonction uuidv4() de la bibliothèque uuid. */
            image : '/imgC1.jpeg', /* Cette propriété image contient le chemin vers l'image de la diapositive. */
        },
        {
            id: uuidv4(),
            image : '/imc2.jpeg',    
        },
    
        {
            id: uuidv4(),
            image : '/cm3.jpg',
        }
    ]

    {/* pour la creation de carousel : pour le diaporama d'images*/ }

    {/*Variables d'état*/ }
    const [currentSlide, setCurrentSlide] = useState(0); /* "useState" : déclare un état local dans le composant en utilisant le hook et "currentSlide" : la variable qui stocke l'index de la diapositive affichée dans le carrousel, et setCurrentSlideest la fonction utilisée pour mettre à jour cet état. La valeur initiale est définie sur 0, ce qui signifie que la première diapositive sera affichée au début. */

    {/*Variables et paramètres de configuration :*/ }
    const slideLength = sliderData.length; /* Stocke la longueur totale du tableau sliderData contenant les données des diapositives.*/
    const autoScroll = true; /* qui dit que le carrousel est configuré, Indique si le défilement automatique est activé (true) ou désactivé (false). */
    let slideInterval; /* une variable pour stocker la référence à l'intervalle de temps pour défiler automatique les diapositives dans carousel */
    let intervalTime = 5000; /* variable représente la durée en millisecondes entre chaque transistion automatique de diaspositive dans le carousel, donc tout le 5 secondes une nouvelle diapositive serait affiché */

    {/* fonctions pour la navigation :  */ }
    {/* une fonction "nextSlide" pour passer à la diapositive suivante et "le prevSlide" le contraire, pour mettre a jours l'etat "currentSlide",   */ }
    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1); /*Si la diapositive actuelle (currentSlide) est égale à l'index de la dernière diapositive (slideLength - 1), cela signifie que nous sommes sur la dernière diapositive du carrousel. Dans ce cas, la fonction met à jour currentSlide en la réinitialisant à 0, ce qui signifie qu'elle revient à la première diapositive.
    Sinon, si nous ne sommes pas sur la dernière diapositive, la fonction incrémente simplement currentSlide de 1 pour passer à la diapositive suivante. */
    };

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1); /* Si la diapositive actuelle (currentSlide) est égale à 0, cela signifie que nous sommes sur la première diapositive du carrousel. Dans ce cas, la fonction met à jour currentSlide en la réglant sur l'index de la dernière diapositive (slideLength - 1), ce qui permet de passer à la dernière diapositive.
    Sinon, si nous ne sommes pas sur la première diapositive, la fonction décrémente simplement currentSlide de 1 pour revenir à la diapositive précédente.*/
    };

    {/* Fonction pour le défilement automatique : */ }
    function auto() {
        slideInterval = setInterval(nextSlide, intervalTime)
    } /* fonction "auto" pour activer le défilement automatique des diapositives, fonction "setInterval" pour appeler la fonction nextSlide (qui fait passer à la diapositive suivantes)à intervalles réguliers (intervalTime). Cela crée une boucle où les diapositives changent automatiquement toutes les intervalTime millisecondes.*/

    {/* Effets React (useEffect) :  */ }
    useEffect(() => {
        setCurrentSlide(0) /* ce bloc de code utilise le hook"useEffect", Lorsque ce composant est monté (c'est-à-dire lorsqu'il est ajouté à l'interface utilisateur), cette fonction sera exécutée. Elle initialise simplement currentSlide à 0, ce qui garantit que la première diapositive sera affichée  */
    }, [])

    useEffect(() => {
        if (autoScroll) {
            auto();
        }  /* configuré pour s'éxecuter chaque fois que "currentSlide" change, Il vérifie d'abord si autoScroll est activé. Si oui, il appelle la fonction auto() pour activer le défilement automatique des diapositives. Ensuite, il retourne une fonction de nettoyage qui utilise clearInterval(slideInterval) pour arrêter l'intervalle de défilement lorsque le composant est démonté ou lorsque currentSlide change. */

        return () => clearInterval(slideInterval);
    }, [currentSlide]);

    {/* Fonction pour le déplacement des points de navigation :  */ }

    const moveDot = index => {
        setCurrentSlide(index) /* fonction "moveDot" prend argument "index" de la diapositive associée à un point de navigation, quand cette fonction est appelée avec un index, elle met simplement à jour currentSlide avec cet index, ce qui a pour effet de faire passer le carrousel à la diapositive correspondante.
    En combinant ces éléments, le code crée un carrousel d'images avec des fonctionnalités de défilement manuel et automatique, ainsi que des points de navigation pour sélectionner une diapositive spécifique.
    */
        /* moveDot : Met à jour la diapositive actuelle en fonction de l'index passé en argument, ce qui permet de changer la diapositive affichée en cliquant sur les points de navigation. */
    }



    return (

        <>
        <div className='header' id="header">
                <div className="nav-content">
                    <nav className="nav">
                            {/*logo*/}
                        <div className="logo">
                            {/*permet de rafrechir la page par logo*/}
                            <ScrollLink  to="/#" onClick={() => window.location.reload()}> <img src="/logo.png" className="aroseje" alt="logo"></img></ScrollLink >
                        </div>
                        <ul className="navcont">
                            <li>
                                <ScrollLink  className='items' activeClass='active' to="home" spy={true} smooth={true} duration={1000} offset={-85}>ACCUEIL</ScrollLink >
                            </li>
                            <li>
                                <ScrollLink  className='items' activeClass='active' to="about" spy={true} smooth={true} duration={1000} offset={-85}>À PROPOS</ScrollLink >
                            </li>
                            <li>
                                <ScrollLink  className='items' activeClass='active' to="fonctions" spy={true}  smooth={true} duration={1000} offset={-85}>FONCTIONS</ScrollLink >
                            </li>
                            <li>
                                <ScrollLink  className='items' activeClass='active' to="demo" spy={true}  smooth={true} duration={1000} offset={-85}>DÉMO</ScrollLink >
                            </li>
                            <li>
                                <ScrollLink  className='items' activeClass='active' to="contact" spy={true}  smooth={true} duration={1000} offset={-85}>CONTACT</ScrollLink >
                            </li>
                            <li>
                                <RouterLink  className='items' to="/inscrires">S'INSCRIRE</RouterLink >
                            </li>
                            <li>
                                <RouterLink  className='items' to="connecters">SE CONNECTER</RouterLink >
                            </li>

                        </ul>

                    </nav>



                </div>

            </div>

            {/* SECTION ACCEUIL */}
            <div id="home">
                <div className='slider'>

                    {/* les deux flèches prev et next de carousel */}

                    <AiOutlineArrowLeft className="arrow prev"
                        onClick={prevSlide}
                    />
                    <AiOutlineArrowRight className="arrow next"
                        onClick={nextSlide}
                    />

                    {/* concerne le rendu des diapositives dans le carrousel : */}
                    {/*la méthode map() pour itérer à travers le tableau sliderData, qui contient les données de chaque diapositive dans le carrousel */}
                    {sliderData.map((slide, index) => {

                        {/* 
                                    - <div className={index === currentSlide ? "slide current" : "slide"} key={index}> : La classe SCSS de cet élément varie en fonction de si l'index de la diapositive correspond à currentSlide. Si oui, la classe est définie comme "slide current", sinon elle est définie simplement comme "slide". Cela permet de styliser la diapositive actuelle différemment des autres. 
                                    - {index === currentSlide && (...)} : qui vérifie si l'index de la diapositive correspond à l'index de la diapositive actuelle (currentSlide). Si c'est le cas, le contenu à l'intérieur du bloc (...) sera rendu. Cela signifie que seulement la diapositive actuelle affichera l'image, le titre (heading) et la description (desc).
                                    - <img src={slide.image} alt="slide"/> Ici, nous utilisons la balise img pour afficher l'image de la diapositive. La source de l'image provient de la propriété image de l'objet slide.
                                    - <h2>{slide.heading}</h2> : Cette balise h2 affiche le titre de la diapositive, qui est extrait de la propriété heading de l'objet slide.
                                    - <p>{slide.desc}</p> : Cette balise p affiche la description de la diapositive, qui est extraite de la propriété desc de l'objet slide.
                                */}
                        return (

                            <div className={index === currentSlide ?
                                "slide current" : "slide"} key={index}>
                                {index === currentSlide && (
                                    <>
                                        <img src={slide.image} alt="slide" />
                                        <div className='contenue'>
                                            <h2>{slide.heading}</h2>
                                            <p>{slide.desc}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        )
                    })}

                    {/* le gros titre dans le slide d'image carousel*/}

                    <div className='textslide'>
                        <p>UNE PLANTE</p>
                        <p>UNE PHOTO</p>
                        <p>UNE ESPÈCE</p>
                    </div>

                    {/* le point dans le carousel (point de slide) */}

                    <div className='container-dots' /*point Carousel*/>

                        {/*
                                    - Array.from() pour générer un tableau de longueur 3 (en d'autres termes, un tableau avec trois éléments). Cela crée un tableau temporaire utilisé uniquement pour itérer trois fois dans la méthode map(). index représente l'index de chaque élément du tableau généré.
                                    - key={index} : Cet attribut est utilisé pour aider React à suivre les éléments lors de leur rendu. Il doit être unique pour chaque élément rendu dans une liste.
                                    - onClick={() => moveDot(index)} : Cet attribut déclenche la fonction moveDot lorsque le point de navigation est cliqué. La fonction est appelée avec l'index de ce point, ce qui signifie que lorsque le point est cliqué, la diapositive correspondante sera affichée.

                              */}

                        {Array.from({ length: 3 }).map((item, index,) => (
                            <div key={index}
                                onClick={() => moveDot(index + 0)}
                                className={currentSlide === index + 0 ? "dot active" : "dot"}></div>
                        ))}
                    </div>
                </div>
                <div className="sectionContainer">
                    {/* Image avec Parallax */}
                    <div className="sectionImage">
                        <ParallaxProvider >
                            <Parallax translateX={['-200px', '40px']}>
                                <img className="iMac" src="pot.avif" alt="iMac" />
                            </Parallax>
                        </ParallaxProvider>
                    </div>
                    {/* la partie de texte à côté de parallax */}
                    <div className="sectionText">
                        <h1 className="title" >
                            {props.title}
                        </h1>
                        <p className="paragraph">
                            La compagnie A'rosa-je, est une solution pour
                            aider les personnes à prendre soin de leurs plantes.
                            Fondée en 1984 elle a tout d'abord été composée d'une petite équipe de botanistes dans une seule ville et
                            est maintenant composée de plus de 1500 botanistes répartis sur toute la France qui rendent service aux
                            propriétaires de plantes des plantes de deux façons :
                            en allant garder leurs plantes lorsque les propriétaires sont
                            absents et en prodiguant des conseils d'entretien afin
                            que les propriétaires s'occupent de mieux en mieux de leurs.

                        </p>
                        <p className="paragraph">
                            La solution a été élaborée en fonction de certaines notions fondamentales : <b>Permettre aux utilisateurs de conserver leurs
                                plantes en partageant des photos et des conseils de botanistes.

                            </b>

                            {/* La solution a été développée autour de quelques
                                concept fondamentaux : <b>une version pour les
                                gestionnaire pour PC et une version mobile pour
                                toutes les interventions terrain.</b> */}

                        </p>
                        <p className="paragraph">
                            L'application permettre à un utilisateur de faire garder ses plantes
                            par une autres et de prendre en photo les plantes qu'il souhaite faure garder.
                        </p>
                        <p className="paragraph">
                            Elle permet également à des botanistes, de fournir les conseils les
                            plus appropriées à l'utilisateur qui gardera les plantes.
                        </p>
                    </div>
                </div>
            </div>

            {/* SECTION A PROPOS */}
            <div className="sectionContainer" id="about">
            <div className="sectionText">
                <h1 className="title" >
                    Comment ça marche?
                </h1>
                <p className="paragraph">
                    Comme nous venons de le voir, l'application permet 
                    aux utilisateurs de demander à quelqu'un d'autre de 
                    conserver leurs plantes et aux botanistes de donner 
                    des conseils. Donc, l'application dispose d'un appareil 
                    photo enfin que les utilisateurs prendre des photos des plantes qu'ils souhaitent garder.
                </p>
                <p className="paragraph">
                    Les photos permettent aux botanistes de donner les 
                    conseils les plus appropriés à l'utilisateur qui 
                    conservera les plants. Afin de s'assurer que les 
                    plantes conservées sont en bon état lorsqu'elles 
                    sont manipulées par un autre utilisateur, ce dernier 
                    devra prendre des photos après chaque séance de maintenance.
                    Les utilisateurs (propriétaires et gardiens) pourront 
                    communiquer entre eux pour coordonner le soin des 
                    plantes. 
                </p>
                
                <p className="paragraph">
                    L'application permet aussi aux utilisateurs de visionner leurs 
                    profils contenant des photos de plantes qu'ils ont 
                    conservées ou qu'ils avaient conservées et cela permet 
                    aux botanistes de chercher des plantes d'intérêt afin 
                    de rédiger des conseils d'entrevue pour les plantes.
                </p>
                
            </div>

            <div className="sectionImage">
                <ParallaxProvider>
                    <Parallax translateX={['200px', '-40px']}> 
                        <img src="/pot2.avif" alt="Tablette avec carte"/>
                    </Parallax>

                </ParallaxProvider>             
            </div>
        </div>

        {/* SECTION FONCTION */}

        <div className="fonc" id="fonctions">

             <h1 className="titlefon">
                
                Fonctionnalités

            </h1>

            <div className="SectionContFonc">

            

                   

                    <div className="fonction">

                        <GiSmartphone color="#87C954" size={50} />
                        <BsCamera color="#87C954" size={50}/>
                        <GiPlantRoots color="#87C954" size={50}/>
                      
                        <div className="titreIcon">
                            <p>
                                Prendre de photo et partage
                            </p>
                        </div>

                    </div>

                    <div className="fonction">
                
                        <FaHands color="#87C954" size={50}/> 
                        <GiPlantRoots color="#87C954" size={50}/>
                        <GoLocation color="#87C954" size={50}/>

                      
                        <div className="titreIcon">
                            <p>
                                Garder les plantes et localisation

                            </p>
                            
                        </div>
                    </div>

                    <div className="fonction">
                        
                        <GoDiscussionClosed color="#87C954" size={50}/>
                        <GiHearts color="#87C954" size={50}/>
                        <GiPlantRoots color="#87C954" size={50}/>
                        <div className="titreIcon">
                            <p>
                                Conseil d'entretien et santé des plantes
                            </p>
                            
                        </div>
                    </div>
            </div>

        </div>

        {/* SECTION DEMO */}
        <div className='sectiondemo' id="demo">       
                <h1 className="titleDemo">
                    Démo
                </h1>
                {/* Video demonstration */}
                <div className="video-container" id="videodemo">
                     {/* Si la vidéo est enregistrée localement */}
                    <video className="videoDemo" width="640" height="264" controls
                        src="/videoPlant.mp4" type="video/mp4">
                    </video>
                            {/* Si la vidéo est en ligne 
                            <iframe 
                            src= "https://www.youtube.com/watch?v=9TfFyHI-GXc"
                            className="videoDemo"
                            title="Geroba demonstration"
                            /> */}
                </div>
        </div>

        {/* SECTION PARTENAIRE */}

        <div className='Partenaire'>

            <h1 className='titlePartenaire'>
                Nos partenaires
                
            </h1>

            <div className='ContenerPart'>

                <div className='ToutPartenaire'>

                    <a href='https://www.tela-botanica.org/'>
                        <img src='/parte1.png' className='perte'></img>

                    </a>
                     
                </div>
                <div className='ToutPartenaire'>
                    <a href='https://www.tec.ac.cr/'>
                        <img src='/parte2.png' className='perte'></img>

                    </a>
                   
                </div>
                <div className='ToutPartenaire'>
                    <a href='https://www.guadeloupe-parcnational.fr/fr'>
                        <img src='/parte3.png' className='perte'></img>

                    </a>
                    
                </div>
                <div className='ToutPartenaire'>
                    <a href='https://www.imageclef.org/lifeclef/2017'>
                        <img src='/parte4.png' className='perte'></img>

                    </a>
                    
                </div>
                <div className='ToutPartenaire'>
                    <a href='https://www.cjbg.ch/'>
                        <img src='/parte5.png' className='perte'></img>

                    </a>
                    
                </div>
                <div className='ToutPartenaire'>
                    <a href='https://tropicalstudies.org/'>
                        <img src='/parte6.png' className='perte'></img>

                    </a>
                    
                </div>
                <div className='ToutPartenaire'>
                    <a href='https://www.lewa.org/'>
                        <img src='/parte7.png' className='perte'></img>

                    </a>
                   
                </div>
                <div className='ToutPartenaire'>
                    <a href='https://endemia.nc/'>
                        <img src='/parte8.png' className='perte'></img>

                    </a>
                   
                </div>
                <div className='ToutPartenaire'>
                    <a href='https://eol.org/'>
                        <img src='/parte10.png' className='perte'></img>

                    </a>
                     
                </div>


            </div>

            

        </div>

        {/* SECTION CONTACT */}
        <div className='FooterContact'>

                <div className='SectionContact' id='contact'>

                    <h1 className='titleContact'>
                        Contactez-nous

                    </h1>

                    <div className='FormContact'>

                        <form className='ContactContainer' onSubmit={handleSubmit}>
                            {/* Nom */}
                            <div>
                                <label htmlFor='name'>VOTRE NOM (OBLIGATOIRE)</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    defaultValue={formVal.name}
                                    onChange={handleChange}
                                    required="required"

                                />
                            
                                
                            </div>

                            {/* email */}
                            <div>
                                <label htmlFor="email">VOTRE EMAIL (OBLIGATOIRE)</label>
                                <input

                                    type="email" 
                                    id="email" 
                                    name="email"
                                    defaultValue={formVal.email} 
                                    onChange= {handleChange} 
                                    required="required"
                                
                                />

                            </div>
                            {/*Sujet*/}
                            <div>
                                <label htmlFor="email">SUJET OBLIGATOIRE</label>
                                <input 
                                    type="text" 
                                    id="object" 
                                    name="object" 
                                    defaultValue={formVal.name}
                                    onChange={handleChange}
                                    required="required"
                                />
                                
                            </div>
                            {/* message */}
                            <div>
                                <label htmlFor="message">VOTRE MESSAGE (OBLIGATOIRE) </label>
                                <textarea
                                    name='message' 
                                    placeholder=" " 
                                    onChange={handleChange} 
                                    required="required"
                                />
                            </div>                            
                            <div>
                                <button type="submit">
                                    ENVOYER
                                </button>
                            </div>                           
                        </form>
                        <div className='TextContact'>
                            <div className='titreContact'>
                                <p>
                                    Envie de démarrer un projet ou microprojet avec A'Rosa-je?
                                </p>
                                <p>
                                    Une idée de partenariat ?
                                </p>
                                <p>
                                    Ou tout simplement, une question ?
                                </p>
                            </div>
                            
                            <div className="contact-info">
                                    <p><AiTwotoneHome color="#87C954" /> : 81 rue du Moulin, 46140 SAUZET, France.</p>
                                    <p><GiRotaryPhone color="#87C954"/> : +33 (0) 6 31 89 80 34</p>
                                    <p><MdEmail color="#87C954"/> : contact@gerobamaster.fr</p>
                                    <p><FaGlobe color="#87C954"/> : www.geroba.fr</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='reseau'>
                    <div className='titreReseau'>
                        <p>
                            RETROUVEZ-NOUS SUR
                        </p>
                    </div>                  
                    <div className='iconResau'>
                        <RiFacebookBoxFill color='#fff' size={34} />
                        <FaInstagram color='#fff' size={34} />
                        <FaYoutubeSquare color='#fff' size={34} />

                    </div>
                 
                </div>
                    <div className='mention'>
                    <p onClick={toggleModal} className="openFonction"><GiScales />  
                    <i>Les mentions légales-Politique de Sécurisation des Données</i></p>
                    <div>
                    {modal && (
                        
                    
                        <div className='modalment'>
                            <div onClick={toggleModal} className="overlay"></div>
                                <div className='PopUp'>
                                <h1 className="title">
                                <img className='logoMent' src="/logo.png" /> Les mentions légales</h1>
                                
                                <p className="lightTitle">1. Définition des mentions légales</p>
                                <div className="mentionContet">
                                            <p className='mentcont'>
                                            Les mentions légales désignent un ensemble d’informations que tout éditeur 
                                            de site internet est tenu de faire apparaitre à la connaissance des internautes. 
                                            C’est la loi n°2004-575 du 21 juin 2004 qui impose aux éditeurs cette obligation.
                                            </p>
                                            <p className='mentcont'>
                                            Les mentions légales regroupent des informations variées.
                                            Certaines sont relatives à l’identité de l’éditeur du site, d’autres à ses coordonnées et les 
                                            moyens d’entrer en contact avec le créateur du site, ou encore des informations relatives aux conditions 
                                            générales de vente ou aux conditions dans lesquelles les données personnelles de l’internaute peuvent être collectées.
                                            </p>
                                            <p className='mentcont'>
                                            Le but est d’assurer une transparence pour l’usager du site internet, afin qu’il sache quelle est la personne 
                                            responsable de la page web sur laquelle il navigue, et éventuellement auprès de qui il pourra s’adresser s’il
                                            a une demande spécifique (signaler un contenu illicite, demander le retrait d’une information jugée attentatoire à la vie privée…).

                                            </p>
                                <p className="lightTitle">2. Quelles sont les différentes mentions légales à faire figurer sur mon site ?</p>
                                            <p className='mentcont'>
                                            Pour déterminer quelles informations l’éditeur est tenu de faire paraitre sur son site, il faut 
                                            distinguer selon qu’il agit à titre professionnel ou non-professionnel. De même, les informations varient si l’éditeur est 
                                            une personne physique ou une personne morale.
                                            </p>
                                            <p className='mentcont'>
                                            Voici des listes non exhaustives des principales informations à faire figurer sur un site internet :
                                            </p >
                                            <p className='sousTitre'>
                                            Les mentions obligatoires pour l’éditeur professionnel personne physique
                                            </p>
                                            <p className='mentcont'>
                                                Noms et prénoms ;
                                                </p>
                                            <p className='mentcont'>
                                            Adresse d’établissement ;
                                            
                                            </p>
                                            <p className='mentcont'>
                                            Courrier électronique et coordonnées téléphoniques 
                                            </p>
                                            <p className='mentcont'>
                                            Si elle est assujettie aux formalités d’inscription au registre du commerce et des sociétés ou au répertoire des métiers, le numéro de son inscription, son capital social et l’adresse de son siège social ;
                                            </p>
                                            <p className='mentcont'>
                                            Les coordonnées, le nom, la dénomination sociale ou raison sociale de l’hébergeur du site internet ;

                                            </p>
                                            <p className='mentcont'>
                                            Le nom du directeur ou codirecteur de la publication et éventuellement le nom du responsable de la rédaction ;
                                            </p>
                                            <p className='mentcont'>
                                            Les Conditions Générales de Vente (informations relatives aux modalités de vente, paiement, délai de rétractation) ;
                                            </p>
                                            
                                            <p className='mentcont'>
                                            Les mentions légales concernant les cookies (utilité des cookies, consentement à leur utilisation)…

                                            </p>

                                            <p className='sousTitre'>
                                            Les mentions obligatoires pour l’éditeur professionnel personne morale
                                            </p>
                                            <p className='mentcont'>
                                            Raison sociale ;
                                            </p>
                                            <p className='mentcont'>
                                            Adresse du siège social ;
                                            </p>
                                            <p className='mentcont'>
                                            Numéro de téléphone du standard ;
                                            </p>
                                            <p className='mentcont'>
                                            Capital social ;
                                            </p>
                                            <p className='mentcont'>
                                            Le numéro d’inscription au registre du commerce et des sociétés ;

                                            </p>
                                            <p className='mentcont'>
                                            Les coordonnées, le nom, la dénomination sociale ou raison sociale de l’hébergeur du site internet ;
                                            </p>
                                            <p className='mentcont'>
                                            Les Conditions Générales de Vente (informations relatives aux modalités de vente, paiement ou encore délai de rétractation) ;

                                            </p>
                                            <p className='mentcont'>
                                            Les mentions légales concernant les cookies (utilité des cookies, consentement à leur utilisation)…

                                            </p>
                                            <p className='sousTitre'>
                                            Les mentions obligatoires pour l’éditeur non professionnel
                                            </p>
                                            <p className='mentcont'>
                                            L’éditeur d’un site web n’agissant pas à titre professionnel n’est pas tenu de dévoiler des informations sur son identité. 
                                            S’il souhaite garder l’anonymat, il doit tout de même indiquer :
                                            </p>

                                            <p className='mentcont'>
                                            Nom de l’hébergeur ;
                                            </p>
                                            <p className='mentcont'>
                                            Coordonnées de l’hébergeur (adresse mail, numéro de téléphone).
                                            </p>
                                            <p className='sousTitre'>
                                            Les mentions légales conformément au RGPD
                                            </p>
                                            <p className='mentcont'>
                                            Le Règlement Général sur la Protection des Données, entré en vigueur le 25 mai 2018, a renforcé les obligations d’informations des éditeurs de sites internet collectant les informations personnelles des internautes.
                                            Ils sont tenus au titre de l’article 13 du RGPD de faire entre autres apparaitre sur leur site les informations suivantes :
                                            </p>
                                            <p className='mentcont'>
                                            L’identité et les coordonnées du responsable du traitement des données ;

                                            </p>
                                            <p className='mentcont'>
                                            Les finalités du traitement auquel sont destinées les données à caractère personnel ;

                                            </p>
                                            <p className='mentcont'>
                                            La durée de conservation des données à caractère personnel ;

                                            </p>
                                            <p className='mentcont'>
                                            L’existence d’un droit à demander la modification ou l’effacement de ces données à caractère personnel.

                                            </p>

                                            <p  className="lightTitle">
                                            3. Quelles sanctions en cas de non-conformité de mes mentions légales ?
                                            </p>
                                            <p  className='mentcont'>
                                            La sanction en cas de défaut de mentions légales ou de mentions légales inexactes peut être lourde : 
                                            un an d’emprisonnement et 75 000€ d’amende pour une personne physique,
                                            375 000€ d’amende et l’interdiction d’exercer l’activité professionnelle pour une personne morale.
                                            </p>
                                            <p className='mentcont'>
                                            Autre sanction relative à l’utilisation non consentie de données recueillies auprès internautes : 
                                            cinq ans d’emprisonnement et 300 000€ d’amende.
                                            </p>
                                        </div>
                                        <button className="close-modal" onClick={toggleModal}>
                                        <HiOutlineX />
                                        </button>   
                            </div>
                    </div>)}
                    </div> 
                </div>

                <div className="footerRow2">
                        <p><i>Conçu et développé par  &nbsp;&nbsp; <img className="footerLogo" src="logo.png" alt="gds group"></img> &nbsp;&nbsp; Tous droits réservés &copy; {} {currentMonth} {currentYear}</i></p>

                </div>
       </div>
        </>
    )

}

export default SectionText;