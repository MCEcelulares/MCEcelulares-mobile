import { useEffect } from 'react';
import { useGetMarcas } from '../../hooks/marca/useGetMarcas';
import { SelectDropdown } from '../layout/SelectDropdown';

type MarcaDropdownProps = {
  value: string;
  onChange: (value: string) => void;
  id_categoria?: string;
  ativo?: boolean;
};

export const MarcaDropdown = ({ value, onChange, id_categoria, ativo }: MarcaDropdownProps) => {
  const { execute, marcas, loading, error } = useGetMarcas();

  useEffect(() => {
    execute(id_categoria ? Number(id_categoria) : undefined, ativo);
  }, [id_categoria, ativo, execute]);

  if (error) return null;

  return (
    <SelectDropdown
      value={value}
      onChange={onChange}
      loading={loading}
      placeholder="Todas as marcas"
      options={marcas.map((m) => ({ label: m.nome, value: String(m.id_marca) }))}
    />
  );
};
