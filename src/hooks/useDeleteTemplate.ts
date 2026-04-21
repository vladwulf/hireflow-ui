import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../config/env';

async function deleteTemplate(uuid: string): Promise<void> {
  const res = await fetch(`${API_URL}/templates/${uuid}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete template');
}

export function useDeleteTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTemplate,
    onSuccess: (_, uuid) => {
      queryClient.removeQueries({ queryKey: ['templates', uuid] });
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
  });
}
