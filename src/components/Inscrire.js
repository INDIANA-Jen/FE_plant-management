import {useState, useEffect} from 'react';
import '../style/Inscrire.scss';
import { useNavigate } from 'react-router-dom'
//import { Link as RouterLink } from 'react-router-dom';
//import { Link } from 'react-router-dom';

//import { useHistory } from 'react-router-dom';




function Inscrire (){

    const navigate = useNavigate();
    const [formVal, setFormVal] = useState({
        nom:'',
        prenom:'',
        nom_utilisateur:'',
        telephone:'',
        email:'',
        mot_de_passe:'',
        type_utilisateur: 'normal'
      });
      

      const handleChange = (event) => {
        const { name, value, type } = event.target;
        if (type === 'radio') {
            
            setFormVal((prevFormData) => ({ ...prevFormData, type_utilisateur: value }));
          } else {
            
            setFormVal((prevFormData) => ({ ...prevFormData, [name]: value }));
          }
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/creation-profil', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formVal)
            });

            const responseData = await response.json()

            if(response.status === 200){
                alert(responseData.message)
                navigate('/connecters')
            }
            else if (response.status === 404){
                alert(responseData.erreur);
            }
            else if (response.status === 500){
                alert(responseData.erreur)
            }

        }
        catch (error){
            console.error('Error:', error);
        }
      };

      //navgation pour connection

    

        function redirectToConnecters() {
        navigate('/connecters');
         }


    //fin 

    
        
    return (
        <div className='SectionIns' id='inscri'>

            <div className='InsForma'>
            
                <h1 className='titleIns'>

                     <img className="footerLogo1" src="logo.png" alt="gds group"></img>
                     
                        Inscrire   

                </h1>
               

                <p>
                    Veuillez entrer les renseignements suivants :
                </p>

                <div className='FormIns'>
                    <form className='InsContainer' onSubmit={handleSubmit}>

                                {/* Nom */}
                                <div className='formule'>
                                    <label htmlFor='name' className='lab' >Nom : </label>
                                    <input className='cont'
                                        type="text" 
                                        id="name" 
                                        name="nom" 
                                        //value="name"
                                        defaultValue={formVal.nom}
                                        onChange={handleChange}
                                        required="required"

                                    />
                                
                                </div>
                                {/* Prénom */}
                                <div className='formule'>
                                    <label htmlFor='firstname' className='lab' >Prénom : </label>
                                    <input className='cont'
                                        type="text" 
                                        id="firstname" 
                                        name="prenom" 
                                        //value="firstname"
                                        defaultValue={formVal.prenom}
                                        onChange={handleChange}
                                        required="required"

                                    />
                                
                                </div>

                                {/*Nom d'utilisateur*/}
                                <div className='formule'>
                                    <label htmlFor='pseudo' className='lab' >Nom d'utilisateur : </label>
                                    <input className='cont'
                                        type="text" 
                                        id="pseudo" 
                                        name="nom_utilisateur" 
                                        //value= "Pseudo"
                                        defaultValue={formVal.nom_utilisateur}
                                        onChange={handleChange}
                                        required="required"

                                    />
                                
                                    
                                </div>
                                {/* Adress */}
                                <div className='formule'>
                                    <label htmlFor='address' className='lab' >Adresse : </label>
                                    <input className='cont'
                                        type="text" 
                                        id="address" 
                                        name="adresse" 
                                        //value="Address"
                                        defaultValue={formVal.adresse}
                                        onChange={handleChange}
                                        required="required"

                                    />
                                    
                                </div>
                                {/*tel */}
                                <div className='formule'>
                                    <label htmlFor='numberPho' className='lab' >Numéro de téléphone :</label>
                                    <input className='cont'
                                        type="number" 
                                        id="numberPho" 
                                        name="telephone" 
                                        //value="NumberPho"
                                        defaultValue={formVal.telephone}
                                        onChange={handleChange}
                                        required="required"

                                    />
                                
                                    
                                </div>

                                {/* email */}
                                <div className='formule'>
                                    <label htmlFor="email" className='lab' >Adresse email : </label>
                                    <input className='cont'

                                        type="email" 
                                        id="email" 
                                        name="email"
                                    // value= "Email"
                                        defaultValue={formVal.email} 
                                        onChange= {handleChange} 
                                        required="required"
                                    
                                    />

                            
                                
                                </div>

                                {/* Mot de passe */}
                                <div className='formule'>
                                    <label for="pwd" className='lab'>Mot de passe : </label>
                                        <input className='cont'
                                            type="password" 
                                            id="pwd" 
                                            name="mot_de_passe" 
                                            defaultValue={formVal.mot_de_passe}
                                            onChange={handleChange}
                                            required="required"
                                            minlength="8"
                                        
                                        />
                                    
                                </div>
                                
                                {/* Radio bouton */}
                                <div>
                                    <form className='contRadio'>

                                        <div className="radio">

                                            
                                                <input className='rad'
                                                    type="radio"
                                                    name= "topping"
                                                    value="normal"
                                                    id="option1"
                                                    checked={formVal.type_utilisateur === "normal"}
                                                    onChange={handleChange} 
                                                />

                                                <label htmlFor="option1" className='lab'> Utilisateur normal </label>
                                        
                                                
                                            
                                        </div>
                                        <div className="radio">
                                               
                                            
                                                <input className='rad'
                                                    type="radio"
                                                    name= "topping"
                                                    value="Botaniste"
                                                    id="option2"
                                                    checked={formVal.type_utilisateur === "Botaniste"}
                                                    onChange={handleChange} 
                                                />
                                                <label htmlFor="option2" className='lab'>  Botaniste </label>
                                            
                                            
                                        </div>
                                    </form>
                                    {/*Condition : refus et acceptation */}

                                    <form className='contRadioAR'>

                                        <div className="radioAR">

                                            
                                                <input className='radAR'
                                                    type="radio"
                                                    name= "toppingg"
                                                    value="accepte"
                                                    id="optionA"
                                                    //checked={formVal.type_utilisateur === "normal"}
                                                    //onChange={handleChange} 
                                                />

                                                <label htmlFor="optionA" className='labAR'> J'ai lu et j'accepte les conditions générales ainsi que le traitement et l'utilisation de mes données personnelles.</label>
                                        
                                                
                                            
                                        </div>
                                        <div className="radioAR">
                                               
                                            
                                                <input className='radAR'
                                                    type="radio"
                                                    name= "toppingg"
                                                    value="refuse"
                                                    id="optionR"
                                                    //checked={formVal.type_utilisateur === "Botaniste"}
                                                   // onChange={handleChange} 
                                                />
                                                <label htmlFor="optionR" className='labAR'>J'ai lu et je refuse l'utilisation de mes données personnelle.</label>
                                            
                                            
                                        </div>
                                    </form>


                                <div className='Btn'>
                                    <div className='btns'>

                                           <button type="submit"  >
                                                ENREGISTRER
                                            </button>

                                    </div>
                                    <div className='SconandConnect'>
                                            <div className='Scon'>
                                                Vous possédez un compte ?  
                                            </div>  
                                            <div className='Sconconnect'>
                                                <button className='nodecoration' onClick={redirectToConnecters}>Se connecter</button>
                                            
                                            </div>

                                            {/*<Link  className='items' to="connecters" activeClass='active' >SE CONNECTER</Link >*/}
                                            

                                    </div>
                                           
                                                 
                                </div> 

                                
                        </div>
                            
                    </form>

                
                </div>

            </div>




        
        </div>

    )

}

export default Inscrire;