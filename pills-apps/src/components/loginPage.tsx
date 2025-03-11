import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./loginPage.css"
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";


function LoginPage() {
  const [emailAddress, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  // Fonction pour gérer l'envoi du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Crée un objet avec les données du formulaire
    const loginData = { emailAddress, password };
    try {
      // Envoie la requête de login au backend
      const response = await fetch("http://localhost:3000/api/clients/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        // Si la réponse est OK, on peut récupérer les données de l'utilisateur ou rediriger
        const currentUser = await response.json();
        // Rediriger l'utilisateur vers une autre page, si nécessaire
        navigate("/profile", {
          state: {user:currentUser},
        });
      } else {
        console.log(response)
        console.error("Erreur de login");
        // Gérer l'erreur (par exemple afficher un message d'erreur)
      }
    } catch (error) {
      console.error("Erreur de connexion", error);
    }
  };

  return (
      <MDBContainer className="my-5 gradient-form">
        <MDBRow>
          <MDBCol col='6' className="mb-5">
            <div className="d-flex flex-column ms-5">
              <div className="text-center">
                <img src="https://images.pexels.com/photos/4989135/pexels-photo-4989135.jpeg"
                  style={{ width: '185px' }} alt="logo" />
                <h4 className="mt-1 mb-5 pb-1">MedzTracker</h4>
              </div>

              <p>Connection</p>
              <form onSubmit={handleSubmit}>
                <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' value={emailAddress} onChange={(e) => setEmail(e.target.value)} />
                <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />


                <div className="text-center pt-1 mb-5 pb-1">
                  <MDBBtn className="mb-4 w-100 gradient-custom-2" type="submit">Sign in</MDBBtn>
                </div>
              </form>

              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <p className="mb-0">Vous n'avez pas de compte?</p>
                <MDBBtn outline className='mx-2' >
                  Créez votre compte
                </MDBBtn>
              </div>

            </div>

          </MDBCol>
        </MDBRow>

      </MDBContainer>
    );
  }


  export default LoginPage;