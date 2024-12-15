import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

function ListarUsuarios() {
    const [allUsers, setAllUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadUsers() {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const { data: { users } } = await api.get("/listar-usuarios", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAllUsers(users);
            } catch (error) {
                console.error("Erro ao carregar usuários:", error);
                localStorage.removeItem("token");
                navigate("/login");
            }
        }
        loadUsers();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token"); 
        navigate("/login");
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Lista de Usuários</h2>
            <ul className="space-y-2">
                {allUsers && allUsers.length > 0 ? (
                    allUsers.map((user) => (
                        <li key={user.id} className="bg-gray-100 p-4 rounded-md">
                            <p className="font-semibold">ID: {user.id}</p>
                            <p className="font-semibold">Nome: {user.name}</p>
                            <p className="font-semibold">Email: {user.email}</p>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-gray-600">Nenhum usuário encontrado.</p>
                )}
            </ul>
            <button
                onClick={handleLogout}
                className="text-center w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400"
            >
                Sair
            </button>
        </div>
    );
}

export default ListarUsuarios;
