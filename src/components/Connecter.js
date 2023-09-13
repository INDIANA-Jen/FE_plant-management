import {useState, useEffect} from 'react';
import '../style/Connecter.scss';
import { useNavigate } from 'react-router-dom'


function Inscrire (){

    const navigate = useNavigate();
    const [formVal, setFormVal] = useState({
        mail:'',
        mot_de_passe:''
      });

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormVal((prevFormData) => ({ ...prevFormData, [name]: value }));
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/verification-Utilisateur', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formVal)
            });

            const responseData = await response.json()

            if(response.status === 200){
                const bearerToken = "Bearer " + responseData.access_token;
                localStorage.setItem("id_utilisateur", responseData.id_utilisateur);
                localStorage.setItem("token", bearerToken);
                localStorage.setItem("type_utilisateur", responseData.type_utilisateur);
                console.log(bearerToken);
                navigate('/profils');
            }
            else if (response.status === 404){
                alert(responseData.erreur);
            }
            else if (response.status === 400){
                alert(responseData.erreur)
            }

        }
        catch (error){
            console.error('Error:', error);
        }
      };
     
        
    return (
        <div className='SectionCon' id='Connexion'>

            <div className='InsFormaC'>
            
                <h1 className='titleCon'>
                <img className="footerLogo2" src="logo.png" alt="gds group"></img>

                    Se connecter

                </h1>

                <p>
                        Vous possédez un compte ? Si vous souhaitez vous connecter, veuillez insérer les informations ci-dessous.
                </p>

                <div className='FormCon'>
                    <form className='ConContainer' onSubmit={handleSubmit}>

                                    <div className='pageS'>

                                        {/* email */}
                                        <div className='formules'>
                                            <label htmlFor="email" className='labs' >Adresse email : </label>
                                            <input className='conts'

                                                type="email" 
                                                id="email" 
                                                name="mail"
                                            // value= "Email"
                                                defaultValue={formVal.mail} 
                                                onChange= {handleChange} 
                                                // required="required"
                                            
                                            />

                                    
                                        
                                        </div>

                                        {/* Mot de passe */}
                                        <div className='formules'>
                                            <label for="pwd" className='labs'>Mot de passe : </label>
                                                <input className='conts'
                                                    type="password" 
                                                    id="pwd" 
                                                    name="mot_de_passe" 
                                                    defaultValue={formVal.mot_de_passe}
                                                    onChange={handleChange}
                                                    // required="required"
                                                    // minlength="8"
                                                
                                                />
                                            
                                        </div>
                                </div>   
                                        
                                
                                <div className='Btns'>

                                    <div className='btnss'>

                                            <button type="submit">

                                                SE CONNECTER

                                            </button>

                                    </div>
                                    <div className='InsP'>

                                            Vous ne possédez pas de compte ? S'inscrire

                                    </div>  
                                            
                                </div>  

                              
                               
                            
                    </form>

                
                </div>

            </div>




        
        </div>

    )

}

export default Inscrire;