import { useEffect } from 'react';
import { useGetCategorias } from '../../hooks/categoria/useGetCategorias';
import { SelectDropdown } from '../layout/SelectDropdown';

type CategoriaDropdownProps = {
  value: string;
  onChange: (value: string) => void;
  ativo?: boolean;
};

export const CategoriaDropdown = ({ value, onChange, ativo }: CategoriaDropdownProps) => {
  const { execute, categorias, loading, error } = useGetCategorias();

  useEffect(() => {
    execute(ativo);
  }, [execute, ativo]);

  if (error) return null;

  return (
    <SelectDropdown
      value={value}
      onChange={onChange}
      loading={loading}
      placeholder="Todas as categorias"
      options={categorias.map((c) => ({ label: c.nome, value: String(c.id_categoria) }))}
    />
  );
};
