import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AccountView,
  AuthResult,
  BookingRequest,
  BusinessInfo,
  CatalogueNote,
  GalleryImage,
  OwnerAuthResult,
  Service,
  TeamMember,
  Testimonial,
} from "../backend";
import { createActor } from "../backend";

export function useGetBusinessInfo() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<BusinessInfo>({
    queryKey: ["businessInfo"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getBusinessInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetServices() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCatalogueNote() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<CatalogueNote>({
    queryKey: ["catalogueNote"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCatalogueNote();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTeam() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<TeamMember[]>({
    queryKey: ["team"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTeam();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTestimonials() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetGallery() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<GalleryImage[]>({
    queryKey: ["gallery"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGallery();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor(createActor);
  const { identity } = useInternetIdentity();

  return useQuery<boolean>({
    queryKey: ["isCallerAdmin", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useSubmitBookingRequest() {
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async (params: {
      name: string;
      contact: string;
      service: string;
      preferredTime: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitBookingRequest(
        params.name,
        params.contact,
        params.service,
        params.preferredTime,
        params.message,
      );
    },
  });
}

export function useListBookingRequests(enabled: boolean) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<BookingRequest[]>({
    queryKey: ["bookingRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listBookingRequests();
    },
    enabled: !!actor && !isFetching && enabled,
  });
}

export function useSetBookingRequestHandled() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { id: bigint; handled: boolean }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setBookingRequestHandled(params.id, params.handled);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["bookingRequests"] });
    },
  });
}

export function useDeleteBookingRequest() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteBookingRequest(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["bookingRequests"] });
    },
  });
}

export function useIsOwnerPasswordSet() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<boolean>({
    queryKey: ["isOwnerPasswordSet"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isOwnerPasswordSet();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetOwnerPassword() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (password: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setOwnerPassword(password);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["isOwnerPasswordSet"] });
    },
  });
}

export function useChangeOwnerPassword() {
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async (params: {
      currentPassword: string;
      newPassword: string;
    }): Promise<OwnerAuthResult> => {
      if (!actor) throw new Error("Actor not available");
      return actor.changeOwnerPassword(
        params.currentPassword,
        params.newPassword,
      );
    },
  });
}

export function useOwnerSignIn() {
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async (password: string): Promise<OwnerAuthResult> => {
      if (!actor) throw new Error("Actor not available");
      return actor.ownerSignIn(password);
    },
  });
}

export function useCreateAccount() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      email: string;
      password: string;
      displayName: string;
    }): Promise<AccountView> => {
      if (!actor) throw new Error("Actor not available");
      return actor.createAccount(
        params.email,
        params.password,
        params.displayName,
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
}

export function useListAccounts(enabled: boolean) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<AccountView[]>({
    queryKey: ["accounts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAccounts();
    },
    enabled: !!actor && !isFetching && enabled,
  });
}

export function useSetAccountActive() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { id: bigint; active: boolean }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setAccountActive(params.id, params.active);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
}

export function useDeleteAccount() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteAccount(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
}

export function useSignIn() {
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async (params: {
      email: string;
      password: string;
    }): Promise<AuthResult> => {
      if (!actor) throw new Error("Actor not available");
      return actor.signIn(params.email, params.password);
    },
  });
}

export function useSignOut() {
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async (token: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.signOut(token);
    },
  });
}

export function useGetSessionAccount(token: string | null) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<AccountView | null>({
    queryKey: ["sessionAccount", token],
    queryFn: async () => {
      if (!actor || !token) return null;
      return actor.getSessionAccount(token);
    },
    enabled: !!actor && !isFetching && !!token,
  });
}
