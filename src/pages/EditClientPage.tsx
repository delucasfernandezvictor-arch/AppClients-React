import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { Client } from '../interfaces/Client';
import { ClientsService } from '../services/ClientsService';

export default function EditClientPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [client, setClient] = useState<Client>({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const loadClient = async () => {
      const data = await ClientsService.getClient(Number(id));

      setClient(data);
    };

    loadClient();
  }, [id]);

  const save = async () => {
    const { name, email, phone } = client;

    await ClientsService.updateClient(Number(id), { name, email, phone });

    navigate('/clients');
  };

  return (
    <div className="container mt-4">
      <h2>Editar Cliente</h2>

      <input
        className="form-control mb-2"
        placeholder="Nombre"
        value={client.name}
        onChange={(e) => setClient({ ...client, name: e.target.value })}
      />

      <input
        className="form-control mb-2"
        placeholder="Email"
        value={client.email}
        onChange={(e) => setClient({ ...client, email: e.target.value })}
      />

      <input
        className="form-control mb-2"
        placeholder="Teléfono"
        value={client.phone}
        onChange={(e) => setClient({ ...client, phone: e.target.value })}
      />

      <button className="btn btn-success" onClick={save}>
        Guardar
      </button>
    </div>
  );
}
