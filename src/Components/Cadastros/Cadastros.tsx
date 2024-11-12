import React from 'react';
import './Cadastros.scss';

interface CadastroData {
    nome: string;
    cnpj: string;
    empresa: string;
}

interface CadastrosProps {
    onAddCargo: () => void;
    cadastroData: CadastroData;
    setCadastroData: (data: CadastroData) => void;
}

const Cadastros: React.FC<CadastrosProps> = ({ onAddCargo, cadastroData, setCadastroData }) => {
    if (!cadastroData) {
        console.error("cadastroData is undefined");
        return null; // Ou um fallback, se preferir
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCadastroData({ ...cadastroData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <div className="cadastrosContainer">
                {['nome', 'cnpj', 'empresa'].map(field => (
                    <input
                        key={field}
                        type="text"
                        name={field}
                        placeholder={field[0].toUpperCase() + field.slice(1)}
                        value={cadastroData[field as keyof CadastroData]}
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
