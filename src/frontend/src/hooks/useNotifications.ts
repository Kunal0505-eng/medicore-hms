import { createActor } from "@/backend";
import { useAuth } from "@/context/AuthContext";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useNotifications() {
  const { actor, isFetching } = useActor(createActor);
  const { user } = useAuth();
  const userId = user?.userId ?? BigInt(1);

  return useQuery({
    queryKey: ["notifications", userId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNotifications(userId);
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000,
  });
}

export function useMarkNotificationRead() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.markNotificationRead(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });
}

export function useMarkAllRead() {
  const { actor } = useActor(createActor);
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor || !user) throw new Error("No actor");
      return actor.markAllNotificationsRead(user.userId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });
}
