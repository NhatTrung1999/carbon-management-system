import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  background: 'rgba(17, 33, 29, 0.92)',
  color: 'rgba(255, 255, 255, 0.90)',
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
    toast.style.backdropFilter = 'blur(32px)';
    toast.style.border = '1px solid rgba(255,255,255,0.12)';
    toast.style.borderRadius = '14px';
    toast.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)';
  },
});
