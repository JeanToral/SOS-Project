import React from 'react';
import './Cadastros.scss';

interface cadastroData {
    nome: string;
    cnpj: string;
    empresa: string;
}

interface cadastrosProps {
    onAddCargo: () => void;
    cadastroData: cadastroData;
    setCadastroData: (data: cadastroData) => void;
}

const Cadastros: React.FC<cadastrosProps> = ({ onAddCargo, cadastroData, setCadastroData }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCadastroData({ ...cadastroData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <div className="cadastrosContainer">
                {['nome', 'cnpj', 'Nome da empresa'].map(field => (
                    <input
                        key={field}
                        type="text"
                        name={field}
                        placeholder={field[0].toUpperCase() + field.slice(1)}
                        value={cadastroData[field as keyof cadastroData]}
                        onChange={handleChange}
                    />
                ))}

            </div>
            <div className="addButtonContainer">
                <button className="addButton" onClick={onAddCargo}>Adicionar cargo</button>
            </div>
        </div>
    );
};

export default Cadastros;