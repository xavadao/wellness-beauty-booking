import { getPractitionerById, getPractitionersForService, practitioners } from './practitioners';
import { getServiceById } from './services';

export interface BookingSelection {
  serviceId: string;
  practitionerId: string;
}

export function getAvailablePractitioners(serviceId: string) {
  const specialists = getPractitionersForService(serviceId);
  return specialists.length ? specialists : practitioners;
}

export function getBookingSelection(serviceId: string, practitionerId: string): BookingSelection {
  const practitioner = getPractitionerById(practitionerId);
  const service = getServiceById(serviceId);
  const validService = service && service.duration > 0 && (
    !practitioner || getAvailablePractitioners(service.id).some(({ id }) => id === practitioner.id)
  );
  return {
    serviceId: validService ? service.id : '',
    practitionerId: practitioner?.id ?? '',
  };
}

export function selectBookingService(selection: BookingSelection, serviceId: string): BookingSelection {
  const compatible = selection.practitionerId === 'any' ||
    getAvailablePractitioners(serviceId).some(({ id }) => id === selection.practitionerId);
  return { serviceId, practitionerId: compatible ? selection.practitionerId : '' };
}
