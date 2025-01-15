import { useQuery } from '@tanstack/react-query';
import { getAttendanceDetails } from '@/service/absensi';

export const useAttendanceDetails = (userId) => {
    return useQuery({
      queryKey: ['attendance', userId],
      queryFn: () => getAttendanceDetails(userId),
      enabled: !!userId,
      retry: 1,
      staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
      select: (data) => {
        if (!data) return [];
        return data;
      },
      onError: (error) => {
        console.error('Error fetching attendance:', error);
      }
    });
  };