import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { deleteUsuarioAPI } from '../../actions/usuario';
import { useAuth } from '../../contexts/AuthContext';

function confirmarExclusao(): Promise<boolean> {
  return new Promise((resolve) => {
    Alert.alert(
      'Excluir conta?',
      'Esta ação não poderá ser desfeita. Todos os seus dados serão removidos.',
      [
        { text: 'Cancelar', style: 'cancel', onPress: () => resolve(false) },
        { text: 'Sim, excluir', style: 'destructive', onPress: () => resolve(true) },
      ],
      { cancelable: true, onDismiss: () => resolve(false) },
    );
  });
}

export function useDeleteUsuario() {
  const [loading, setLoading] = useState(false);
  const { token, logout } = useAuth();

  const execute = useCallback(async () => {
    const confirmado = await confirmarExclusao();
    if (!confirmado) return { success: false };

    setLoading(true);
    try {
      if (!token) throw new Error('Você deve fazer login para excluir sua conta');
      const data = await deleteUsuarioAPI(token);
      if (!data.success) throw new Error(data.error);

      await logout();
      return { success: true };
    } catch (error) {
      Alert.alert('Erro ao excluir conta', (error as Error).message || 'Não foi possível excluir a conta');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token, logout]);

  return { execute, loading };
}
