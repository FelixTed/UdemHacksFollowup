import Accordion from 'react-bootstrap/Accordion';
import {User} from '../classes/User.js' 
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './listemeds.css'
import { Medicine } from '../classes/Medecine.js';


function BasicExample() {
  const location = useLocation();
  const {user}: {user: User} = location.state || {};
  const [medications, setMedications] = useState<Medicine[]>([]);
  
  useEffect(() => {
    const fetchMedications = async () => {
      try {
        // Effectuer les requêtes pour récupérer les détails des médicaments
        const meds = await Promise.all(
          user.prescriptionList.map(async (medId) => {
            const response = await fetch(`http://localhost:3000/api/medicines/${medId}`); // Remplacer par l'URL de ton API
            if (!response.ok) {
              throw new Error('Erreur lors de la récupération des données');
            }
            const data = await response.json(); // Transformer la réponse en JSON
            return data; // Retourner les données du médicament
          })
        );
        setMedications(meds); // Mettre à jour l'état avec les médicaments récupérés
      } catch (error) {
        console.error('Erreur lors de la récupération des médicaments:', error);
      }
    };

    if (user && user.prescriptionList.length > 0) {
      fetchMedications(); // Appeler la fonction de récupération des médicaments
    }
  }, [user]); // Réexécuter si `us
  
    return (
      <>
        <h1 className='title'>Bonjour, {user.name}</h1>
        <Accordion defaultActiveKey="0">
          {medications.map((med, index) => ( // changer liste par celle qui aura été  générée par Félix.
            <Accordion.Item eventKey={String(index)} key={index}>
              <Accordion.Header>{med.medicineName}</Accordion.Header>
              <Accordion.Body>
                {med.description}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </>
      );
    }
    
    export default BasicExample;

