import React from 'react';
import { FormData, SunExposure, RoomType } from '../types';
import {
  WidthIcon,
  LengthIcon,
  HeightIcon,
  PeopleIcon,
  ElectronicsIcon,
  WindowIcon,
  SunIcon,
  RoomIcon
} from './icons';

interface CalculatorFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: (e: React.FormEvent) => void;
}

interface InputGroupProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const InputGroup: React.FC<InputGroupProps> = ({ id, label, icon, children }) => (
  <div>
    <label htmlFor={id} className="text-sm font-medium text-white mb-2 flex items-center">
      <div className="w-8 h-8 mr-3 flex-shrink-0 bg-white/10 rounded-lg flex items-center justify-center form-icon-container">
        {icon}
      </div>
      {label}
    </label>
    {children}
  </div>
);

const NumberInput: React.FC<{id: string; value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; unit: string;}> = ({ id, value, onChange, unit }) => (
  <div className="relative">
    <input
      type="number"
      id={id}
      name={id}
      value={value === 0 ? '' : value}
      onChange={onChange}
      min="0"
      className="w-full pl-4 pr-16 py-2 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-shadow bg-white/10 text-white placeholder:text-blue-100"
      placeholder="0"
    />
    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-200 text-sm">{unit}</span>
  </div>
);

const SelectInput: React.FC<{id: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; children: React.ReactNode}> = ({ id, value, onChange, children }) => (
    <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-shadow bg-white/10 text-white"
    >
        {children}
    </select>
);


export const CalculatorForm: React.FC<CalculatorFormProps> = ({ formData, setFormData, onSubmit }) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name in ['width', 'length', 'height', 'people', 'electronics', 'windows'] ? Number(value) : value }));
  };

  return (
    <form onSubmit={onSubmit} className="bg-black/20 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-white/20">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InputGroup id="width" label="Largura do Ambiente" icon={<WidthIcon />}>
          <NumberInput id="width" value={formData.width} onChange={handleInputChange} unit="m" />
        </InputGroup>
        <InputGroup id="length" label="Comprimento" icon={<LengthIcon />}>
          <NumberInput id="length" value={formData.length} onChange={handleInputChange} unit="m" />
        </InputGroup>
        <InputGroup id="height" label="Altura (Pé Direito)" icon={<HeightIcon />}>
          <NumberInput id="height" value={formData.height} onChange={handleInputChange} unit="m" />
        </InputGroup>
        <InputGroup id="people" label="Pessoas no Local" icon={<PeopleIcon />}>
          <NumberInput id="people" value={formData.people} onChange={handleInputChange} unit="pessoas" />
        </InputGroup>
        <InputGroup id="electronics" label="Eletrônicos" icon={<ElectronicsIcon />}>
          <NumberInput id="electronics" value={formData.electronics} onChange={handleInputChange} unit="aparelhos" />
        </InputGroup>
        <InputGroup id="windows" label="Janelas" icon={<WindowIcon />}>
          <NumberInput id="windows" value={formData.windows} onChange={handleInputChange} unit="janelas" />
        </InputGroup>
        <InputGroup id="sunExposure" label="Incidência de Sol" icon={<SunIcon />}>
          <SelectInput id="sunExposure" value={formData.sunExposure} onChange={handleInputChange}>
            <option className="text-black" value={SunExposure.NONE}>Não recebe sol direto</option>
            <option className="text-black" value={SunExposure.MORNING}>Sol da manhã</option>
            <option className="text-black" value={SunExposure.AFTERNOON}>Sol da tarde</option>
          </SelectInput>
        </InputGroup>
        <InputGroup id="roomType" label="Tipo de Ambiente" icon={<RoomIcon />}>
          <SelectInput id="roomType" value={formData.roomType} onChange={handleInputChange}>
            <option className="text-black" value={RoomType.BEDROOM}>Quarto</option>
            <option className="text-black" value={RoomType.LIVING_ROOM}>Sala</option>
            <option className="text-black" value={RoomType.OFFICE}>Escritório</option>
            <option className="text-black" value={RoomType.KITCHEN}>Cozinha</option>
            <option className="text-black" value={RoomType.COMMERCIAL}>Comercial</option>
          </SelectInput>
        </InputGroup>
      </div>
      <button type="submit" className="mt-8 w-full bg-blue-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105 shadow-lg">
        Calcular BTUs
      </button>
    </form>
  );
};