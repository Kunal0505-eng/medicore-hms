import { createActor } from "@/backend";
import type {
  NotificationId,
  NotificationPriority,
  NotificationType,
  UserId,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useUserNotifications(userId: UserId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["notifications", userId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNotifications(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
    refetchInterval: 30000,
  });
}

export function useCreateNotification() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      userId: UserId;
      notificationType: NotificationType;
      title: string;
      message: string;
      priority: NotificationPriority;
      relatedId: string | null;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createNotification(
        args.userId,
        args.notificationType,
        args.title,
        args.message,
        args.priority,
        args.relatedId,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });
}

export function useMarkRead() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: NotificationId) => {
      if (!actor) throw new Error("No actor");
      return actor.markNotificationRead(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });
}
